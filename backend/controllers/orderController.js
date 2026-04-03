import db from '../database/index.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const addOrderItems = async (req, res) => {
    try {
        const { orderItems, customerName, customerEmail, customerPhone, totalAmount } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const emailToUse = customerEmail || `${(customerPhone || '').replace(/\D/g, '')}@noemail.com`;

        // Upsert customer
        let customer;
        if (customerEmail) {
            customer = await db('customers').where({ email: customerEmail }).first();
        }
        if (!customer && customerPhone) {
            customer = await db('customers').where({ phone: customerPhone }).first();
        }

        if (customer) {
            await db('customers')
                .where({ id: customer.id })
                .update({ 
                    name: customerName, 
                    phone: customerPhone, 
                    ...(customerEmail && { email: customerEmail }) 
                });
        } else {
            [customer] = await db('customers')
                .insert({ name: customerName, email: emailToUse, phone: customerPhone })
                .returning('*');
        }

        // Create Order with Items using transaction
        const orderData = await db.transaction(async (trx) => {
            const [order] = await trx('orders').insert({
                customer_id: customer.id,
                totalAmount: parseFloat(totalAmount)
            }).returning('*');

            const itemsToInsert = orderItems.map(item => ({
                order_id: order.id,
                product_id: item.productId,
                quantity: item.quantity,
                price: parseFloat(item.price)
            }));

            await trx('order_items').insert(itemsToInsert);

            return order;
        });

        res.status(201).json(orderData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
    try {
        const orders = await db('orders')
            .join('customers', 'orders.customer_id', 'customers.id')
            .select('orders.*', 'customers.name as customer_name', 'customers.email as customer_email', 'customers.phone as customer_phone')
            .orderBy('orders.created_at', 'desc');

        const orderIds = orders.map(o => o.id);
        
        let allItems = [];
        if (orderIds.length > 0) {
            allItems = await db('order_items')
                .join('products', 'order_items.product_id', 'products.id')
                .whereIn('order_items.order_id', orderIds)
                .select(
                    'order_items.*',
                    'products.name',
                    'products.imageUrl',
                    'products.sku'
                );
        }

        const ordersWithItems = orders.map(order => ({
            ...order,
            items: allItems.filter(item => item.order_id === order.id)
        }));

        res.json(ordersWithItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const [order] = await db('orders')
            .where({ id: parseInt(req.params.id) })
            .update({ status })
            .returning('*');

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
