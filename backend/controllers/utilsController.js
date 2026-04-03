import db from '../database/index.js';

// @desc    Submit a contact message
// @route   POST /api/utils/messages
// @access  Public
export const submitMessage = async (req, res) => {
    try {
        const { name, email, phone, content } = req.body;
        const [message] = await db('messages').insert({ name, email, phone, content }).returning('*');
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all messages
// @route   GET /api/utils/messages
// @access  Private/Admin
export const getMessages = async (req, res) => {
    try {
        const messages = await db('messages').select('*').orderBy('created_at', 'desc');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Submit a custom order request
// @route   POST /api/utils/custom-orders
// @access  Public
export const submitCustomOrder = async (req, res) => {
    try {
        const { name, phone, email, sareeType, colorPreference, message } = req.body;
        const [customOrder] = await db('custom_orders').insert({
            name, phone, email, sareeType, colorPreference, message
        }).returning('*');
        res.status(201).json(customOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all custom orders
// @route   GET /api/utils/custom-orders
// @access  Private/Admin
export const getCustomOrders = async (req, res) => {
    try {
        const customOrders = await db('custom_orders').select('*').orderBy('created_at', 'desc');
        res.json(customOrders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update custom order status
// @route   PUT /api/utils/custom-orders/:id/status
// @access  Private/Admin
export const updateCustomOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const [customOrder] = await db('custom_orders')
            .where({ id: parseInt(req.params.id) })
            .update({ status })
            .returning('*');

        if (!customOrder) return res.status(404).json({ message: 'Custom order not found' });

        res.json(customOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/utils/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const [{ count: productsCount }] = await db('products').count('id as count');
        const [{ count: ordersCount }] = await db('orders').count('id as count');
        const [{ count: customersCount }] = await db('customers').count('id as count');
        const [{ sum: totalRevenue }] = await db('orders').whereNot('status', 'Cancelled').sum('totalAmount as sum');

        res.json({
            totalProducts: parseInt(productsCount),
            totalOrders: parseInt(ordersCount),
            totalCustomers: parseInt(customersCount),
            totalRevenue: totalRevenue ? parseFloat(totalRevenue) : 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
