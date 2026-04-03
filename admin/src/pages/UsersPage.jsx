import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import api from '../api';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Edit Modal State
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', email: '', role: '' });
    const [isSaving, setIsSaving] = useState(false);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/auth/users');
            setUsers(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            await api.delete(`/auth/users/${id}`);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user.');
        }
    };

    const handleEditClick = (user) => {
        setEditFormData({ name: user.name || '', email: user.email, role: user.role });
        setEditingUser(user);
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { data } = await api.put(`/auth/users/${editingUser.id}`, editFormData);
            setUsers(users.map(u => (u.id === editingUser.id ? { ...u, ...data } : u)));
            setEditingUser(null);
        } catch (err) {
            console.error('Error updating user:', err);
            alert(err.response?.data?.message || 'Failed to update user');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>Registered Users ({users.length})</h1>
            </div>

            <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>ID</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Name</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Email</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Role</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Joined Date</th>
                            <th style={{ padding: '15px', textAlign: 'right', fontWeight: '600', color: '#555' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee', transition: 'background-color 0.2s' }}>
                                <td style={{ padding: '15px', color: '#666' }}>#{user.id}</td>
                                <td style={{ padding: '15px', fontWeight: '500' }}>{user.name || 'N/A'}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{user.email}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        backgroundColor: user.role === 'ADMIN' ? '#e8fff3' : '#eaf4ff',
                                        color: user.role === 'ADMIN' ? '#50cd89' : '#009ef7',
                                        fontWeight: '500'
                                    }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', color: '#666' }}>
                                    {new Date(user.created_at).toLocaleDateString('en-IN', {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    })}
                                </td>
                                <td style={{ padding: '15px', textAlign: 'right' }}>
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#009ef7', marginRight: '15px' }}
                                        title="Edit"
                                        aria-label="Edit User"
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f1416c' }}
                                        title="Delete"
                                        aria-label="Delete User"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                                    No users found in the system.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit User Modal */}
            {editingUser && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Edit User</h2>
                            <button onClick={() => setEditingUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}><FaTimes size={20} /></button>
                        </div>
                        <form onSubmit={handleSaveUser}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#333' }}>Name</label>
                                <input
                                    type="text"
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#333' }}>Email</label>
                                <input
                                    type="email"
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                />
                            </div>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#333' }}>Role</label>
                                <select
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={editFormData.role}
                                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button type="button" onClick={() => setEditingUser(null)} className="btn btn-outline" style={{ padding: '10px 15px' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '10px 15px' }} disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
