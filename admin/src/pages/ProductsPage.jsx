import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import api from '../api';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const initialProductState = {
        name: '', sku: '', categoryId: '', price: '', availability: '', imageUrl: '', images: [],
        groupId: '', colorName: '', colorCode: ''
    };
    const [newProduct, setNewProduct] = useState(initialProductState);
    const [imageFiles, setImageFiles] = useState([]);

    const fetchProducts = async () => {
        try {
            // Fetch all products (simulate large limit or pagination later)
            const { data } = await api.get('/products?limit=100');
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        try {
            let uploadedImageUrls = [];

            // Upload multiple files if present
            if (imageFiles && imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach(file => formData.append('images', file));
                const uploadRes = await api.post('/upload/multiple', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedImageUrls = uploadRes.data.urls || [];
            }

            // Combine existing valid images with newly uploaded ones
            const currentImages = Array.isArray(newProduct.images) ? newProduct.images : [];
            const finalImages = [...currentImages, ...uploadedImageUrls];
            const finalImageUrl = finalImages.length > 0 ? finalImages[0] : newProduct.imageUrl;

            const payload = { 
                ...newProduct, 
                imageUrl: finalImageUrl, 
                images: finalImages, 
                price: Number(newProduct.price), 
                categoryId: Number(newProduct.categoryId) 
            };

            if (isEditMode) {
                await api.put(`/products/${newProduct.id}`, payload);
            } else {
                await api.post('/products', payload);
            }

            fetchProducts();
            setIsModalOpen(false);
            setIsEditMode(false);
            setNewProduct(initialProductState);
            setImageFiles([]);
        } catch (error) {
            console.error('Error saving product', error);
            alert(error.response?.data?.message || 'Failed to save product');
        }
    };

    const handleEditProduct = (product) => {
        setNewProduct({
            id: product.id,
            name: product.name,
            sku: product.sku,
            categoryId: product.category_id || '',
            price: product.price,
            availability: product.availability,
            imageUrl: product.imageUrl || '',
            images: product.images || [],
            groupId: product.group_id || '',
            colorName: product.color_name || '',
            colorCode: product.color_code || ''
        });
        setImageFiles([]);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product', error);
                alert('Failed to delete product');
            }
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Products Management</h2>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => {
                    setNewProduct(initialProductState);
                    setImageFiles([]);
                    setIsEditMode(false);
                    setIsModalOpen(true);
                }}>
                    <FaPlus /> Add Product
                </button>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Product Name</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>SKU</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Category</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Price</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Stock</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                                <td style={{ padding: '15px 10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: '#f5f8fa', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            {product.imageUrl ? <img src={product.imageUrl} alt="prod" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FaImage color="#b5b5c3" />}
                                        </div>
                                        {product.name}
                                    </div>
                                </td>
                                <td style={{ padding: '15px 10px' }}>{product.sku}</td>
                                <td style={{ padding: '15px 10px' }}>{categories.find(c => c.id === product.category_id)?.name || 'Unknown'}</td>
                                <td style={{ padding: '15px 10px' }}>₹{Number(product.price).toLocaleString('en-IN')}</td>
                                <td style={{ padding: '15px 10px' }}>
                                    <span style={{ backgroundColor: product.availability?.includes('1 Piece') || product.availability === 'Out of Stock' ? '#fff5f8' : '#e8fff3', color: product.availability?.includes('1 Piece') || product.availability === 'Out of Stock' ? '#f1416c' : '#50cd89', padding: '5px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                        {product.availability || 'Available'}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                                    <button onClick={() => handleEditProduct(product)} style={{ background: 'transparent', border: 'none', color: '#009ef7', cursor: 'pointer', padding: '5px' }} title="Edit"><FaEdit size={16} /></button>
                                    <button onClick={() => handleDeleteProduct(product.id)} style={{ background: 'transparent', border: 'none', color: '#f1416c', cursor: 'pointer', padding: '5px', marginLeft: '10px' }} title="Delete"><FaTrash size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div className="flex-between" style={{ marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500 }}>{isEditMode ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
                        </div>
                        <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Product Name</label>
                                <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>SKU</label>
                                <input type="text" value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Category</label>
                                    <select value={newProduct.categoryId} onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Price (₹)</label>
                                    <input type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Availability</label>
                                <input type="text" value={newProduct.availability} onChange={e => setNewProduct({ ...newProduct, availability: e.target.value })} placeholder="e.g., In Stock, Only 1 Piece, Out of Stock" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                            </div>

                            <div style={{ padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '6px' }}>
                                <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', color: 'var(--color-maroon)' }}>Color Variants & Grouping</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#666' }}>Variant Group ID (Leave empty if no variants)</label>
                                        <input type="text" value={newProduct.groupId} onChange={e => setNewProduct({ ...newProduct, groupId: e.target.value })} placeholder="e.g. ikat_saree_001" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#666' }}>Color Name</label>
                                        <input type="text" value={newProduct.colorName} onChange={e => setNewProduct({ ...newProduct, colorName: e.target.value })} placeholder="e.g. Crimson Red" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#666' }}>Color Code (HEX)</label>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input type="color" value={newProduct.colorCode || '#ffffff'} onChange={e => setNewProduct({ ...newProduct, colorCode: e.target.value })} style={{ width: '40px', height: '35px', padding: '0', border: 'none', cursor: 'pointer' }} />
                                            <input type="text" value={newProduct.colorCode} onChange={e => setNewProduct({ ...newProduct, colorCode: e.target.value })} placeholder="#8B0000" style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Product Images</label>
                                <input type="file" multiple onChange={e => {
                                    const filesArray = Array.from(e.target.files);
                                    if (filesArray.length > 0) {
                                        setImageFiles(prev => [...prev, ...filesArray]);
                                    }
                                    e.target.value = ''; // Reset input to allow adding the same file again if needed
                                }} accept="image/*" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                                
                                {/* Image Preview & Management */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
                                    {/* Existing Images */}
                                    {newProduct.images && newProduct.images.map((img, index) => (
                                        <div key={`existing-${index}`} style={{ display: 'inline-block', position: 'relative', border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }}>
                                            <img src={img} width="60" height="60" style={{ objectFit: 'cover', display: 'block' }} alt="Existing" />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                                <button type="button" onClick={() => {
                                                    if (index > 0) {
                                                        const newArr = [...newProduct.images];
                                                        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
                                                        setNewProduct({ ...newProduct, images: newArr });
                                                    }
                                                }} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '10px' }}>◀</button>
                                                <button type="button" onClick={() => {
                                                    const newArr = newProduct.images.filter((_, i) => i !== index);
                                                    setNewProduct({ ...newProduct, images: newArr });
                                                }} style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none', fontSize: '12px' }}>&times;</button>
                                                <button type="button" onClick={() => {
                                                    if (index < newProduct.images.length - 1) {
                                                        const newArr = [...newProduct.images];
                                                        [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
                                                        setNewProduct({ ...newProduct, images: newArr });
                                                    }
                                                }} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '10px' }}>▶</button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Pending uploads preview */}
                                    {imageFiles.map((file, index) => (
                                        <div key={`pending-${index}`} style={{ display: 'inline-block', position: 'relative', border: '1px solid #b2f5ea', padding: '5px', borderRadius: '4px' }}>
                                            <img src={URL.createObjectURL(file)} width="60" height="60" style={{ objectFit: 'cover', display: 'block', opacity: 0.7 }} alt="Pending" />
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                                <button type="button" onClick={() => {
                                                    setImageFiles(imageFiles.filter((_, i) => i !== index));
                                                }} style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none', fontSize: '12px' }}>&times; Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#f5f8fa', color: '#5e6278' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
