import db from '../database/index.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 12 } = req.query;

        let query = db('products').select('*');
        if (search) {
            query = query.where('name', 'ilike', `%${search}%`);
        }
        if (category) {
            query = query.where({ category_id: parseInt(category) });
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get Total count
        let countQuery = db('products').count('id as count');
        if (search) countQuery = countQuery.where('name', 'ilike', `%${search}%`);
        if (category) countQuery = countQuery.where({ category_id: parseInt(category) });
        const [{ count }] = await countQuery;
        const total = parseInt(count);

        const products = await query
            .orderBy('created_at', 'desc')
            .offset(skip)
            .limit(parseInt(limit));

        // Fetch variants for products with group_id
        const groupIds = [...new Set(products.map(p => p.group_id).filter(Boolean))];
        let allVariants = [];
        if (groupIds.length > 0) {
            allVariants = await db('products')
                .whereIn('group_id', groupIds)
                .select('id', 'group_id', 'color_name', 'color_code', 'imageUrl', 'availability');
        }

        const enrichedProducts = products.map(p => {
            if (p.group_id) {
                return {
                    ...p,
                    variants: allVariants.filter(v => v.group_id === p.group_id)
                };
            }
            return { ...p, variants: [] };
        });

        console.log(`[DB LOG] Fetched ${enrichedProducts.length} products successfully.`);

        res.json({
            products: enrichedProducts,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await db('products').where({ id: parseInt(req.params.id) }).first();

        if (product) {
            if (product.group_id) {
                const variants = await db('products')
                    .where('group_id', product.group_id)
                    .select('id', 'name', 'color_name', 'color_code', 'imageUrl', 'availability');
                product.variants = variants;
            } else {
                product.variants = [];
            }
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const {
            name, sku, price, categoryId, availability, fabricDetails,
            length, blousePieceInfo, deliveryTime, careInstructions, imageUrl, images,
            groupId, colorName, colorCode
        } = req.body;

        const existing = await db('products').where({ sku }).first();
        if (existing) {
            return res.status(400).json({ message: 'Product with this SKU already exists' });
        }

        const [product] = await db('products').insert({
            name,
            sku,
            price: parseFloat(price),
            category_id: parseInt(categoryId),
            availability: availability || "Available",
            fabricDetails,
            length,
            blousePieceInfo,
            deliveryTime,
            careInstructions,
            imageUrl,
            images: images || [],
            group_id: groupId || null,
            color_name: colorName || null,
            color_code: colorCode || null
        }).returning('*');

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.categoryId) {
            updateData.category_id = parseInt(updateData.categoryId);
            delete updateData.categoryId;
        }
        if (updateData.groupId !== undefined) {
            updateData.group_id = updateData.groupId || null;
            delete updateData.groupId;
        }
        if (updateData.colorName !== undefined) {
            updateData.color_name = updateData.colorName || null;
            delete updateData.colorName;
        }
        if (updateData.colorCode !== undefined) {
            updateData.color_code = updateData.colorCode || null;
            delete updateData.colorCode;
        }

        const [product] = await db('products')
            .where({ id: parseInt(id) })
            .update(updateData)
            .returning('*');

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await db('products').where({ id: parseInt(id) }).del();

        if (!deleted) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
