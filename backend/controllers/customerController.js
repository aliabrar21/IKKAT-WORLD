import db from '../database/index.js';

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private/Admin
export const getCustomers = async (req, res) => {
    try {
        const customers = await db('customers').select('*').orderBy('created_at', 'desc');
        const orders = await db('orders').select('*');

        const customersWithOrders = customers.map(customer => {
            const customerOrders = orders.filter(order => order.customer_id === customer.id);
            const totalOrders = customerOrders.length;
            const totalSpent = customerOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

            return {
                ...customer,
                totalOrders,
                totalSpent,
                orders: customerOrders.map(order => ({
                    id: order.id,
                    date: new Date(order.created_at).toLocaleDateString(),
                    amount: order.totalAmount,
                    status: order.status || 'Pending'
                }))
            };
        });

        res.json(customersWithOrders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
