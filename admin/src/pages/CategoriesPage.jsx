import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTags } from 'react-icons/fa';
import api from '../api';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSaveCategory = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await api.put(`/categories/${newCategory.id}`, newCategory);
            } else {
                await api.post('/categories', newCategory);
            }
            fetchCategories();
            setIsModalOpen(false);
            setIsEditMode(false);
            setNewCategory({ name: '', description: '' });
        } catch (error) {
            console.error('Error saving category', error);
            alert('Failed to save category');
        }
    };

    const handleEditCategory = (category) => {
        setNewCategory(category);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category', error);
                alert(error.response?.data?.message || 'Failed to delete category');
            }
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Categories Management</h2>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => {
                    setNewCategory({ name: '', description: '' });
                    setIsEditMode(false);
                    setIsModalOpen(true);
                }}>
                    <FaPlus /> Add Category
                </button>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Category Name</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Description</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                                <td style={{ padding: '15px 10px', fontWeight: 500 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f5fa', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FaTags color="#6b90bc" />
                                        </div>
                                        {category.name}
                                    </div>
                                </td>
                                <td style={{ padding: '15px 10px', color: '#555' }}>{category.description}</td>
                                <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                                    <button onClick={() => handleEditCategory(category)} style={{ background: 'transparent', border: 'none', color: '#009ef7', cursor: 'pointer', padding: '5px' }} title="Edit"><FaEdit size={16} /></button>
                                    <button onClick={() => handleDeleteCategory(category.id)} style={{ background: 'transparent', border: 'none', color: '#f1416c', cursor: 'pointer', padding: '5px', marginLeft: '10px' }} title="Delete"><FaTrash size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '500px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div className="flex-between" style={{ marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500 }}>{isEditMode ? 'Edit Category' : 'Add New Category'}</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
                        </div>
                        <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Category Name</label>
                                <input type="text" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Description (Optional)</label>
                                <textarea value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} rows="4" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#f5f8fa', color: '#5e6278' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
