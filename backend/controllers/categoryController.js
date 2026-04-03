import db from '../database/index.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = await db('categories').select('*');
        // For simplicity, we get product counts in a separate query or join
        // But since the frontend expects `_count.products` 
        // we'll emulate it:
        const catsWithCounts = await Promise.all(categories.map(async (cat) => {
            const [{ count }] = await db('products').where({ category_id: cat.id }).count('id as count');
            return {
                ...cat,
                _count: { products: parseInt(count) }
            };
        }));

        res.json(catsWithCounts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const existing = await db('categories').where({ name }).first();
        if (existing) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const [category] = await db('categories').insert({ name }).returning('*');
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const [category] = await db('categories')
            .where({ id: parseInt(id) })
            .update({ name })
            .returning('*');

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if products exist
        const [{ count }] = await db('products').where({ category_id: parseInt(id) }).count('id as count');
        if (parseInt(count) > 0) {
            return res.status(400).json({ message: 'Cannot delete category with associated products. Delete products first.' });
        }

        const deleted = await db('categories').where({ id: parseInt(id) }).del();

        if (!deleted) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
