import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBan, FaCheck, FaEye } from 'react-icons/fa';
import api from '../api';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingOrderHistory, setViewingOrderHistory] = useState(false);

    const fetchCustomers = async () => {
        try {
            const { data } = await api.get('/customers');
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleViewCustomer = (customer) => {
        setSelectedCustomer(customer);
        setViewingOrderHistory(false);
        setIsModalOpen(true);
    };
    console.log(customers);

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Customers Directory</h2>
                <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Search customers..." style={{ padding: '10px 15px', borderRadius: '4px', border: '1px solid var(--border-color)', width: '300px' }} />
                </div>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Customer Name</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Contact Info</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Orders</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Total Spent</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                                <td style={{ padding: '15px 10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: '#eef2f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FaUser color="#7e8299" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, color: '#3f4254' }}>{customer.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#a1a5b7' }}>Joined: {new Date(customer.created_at).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '15px 10px' }}>
                                    <div style={{ color: '#3f4254' }}>{customer.email}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#a1a5b7' }}>{customer.phone}</div>
                                </td>
                                <td style={{ padding: '15px 10px', color: '#3f4254' }}>
                                    <span style={{ background: '#f5f8fa', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>N/A</span>
                                </td>
                                <td style={{ padding: '15px 10px', color: '#3f4254', fontWeight: 500 }}>-</td>
                                <td style={{ padding: '15px 10px' }}>
                                    <span style={{ backgroundColor: '#e8fff3', color: '#50cd89', padding: '5px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                        Active
                                    </span>
                                </td>
                                <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                                    <button onClick={() => handleViewCustomer(customer)} style={{ background: 'transparent', border: 'none', color: '#009ef7', cursor: 'pointer', padding: '5px' }} title="View Details"><FaEye size={16} /></button>
                                    <a href={`mailto:${customer.email}`} style={{ color: '#009ef7', padding: '5px', marginLeft: '10px' }} title="Send Email"><FaEnvelope size={16} /></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedCustomer && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: viewingOrderHistory ? '650px' : '500px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500 }}>
                                {viewingOrderHistory ? `Order History: ${selectedCustomer.name}` : `Customer Profile: ${selectedCustomer.name}`}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
                        </div>

                        {viewingOrderHistory ? (
                            <div>
                                {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '20px' }}>
                                        <thead>
                                            <tr style={{ background: '#f5f8fa', color: '#5e6278', borderBottom: '1px solid #eee' }}>
                                                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Order ID</th>
                                                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Date</th>
                                                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Amount</th>
                                                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCustomer.orders.map(order => (
                                                <tr key={order.id} style={{ borderBottom: '1px dashed #eee' }}>
                                                    <td style={{ padding: '12px 10px', color: '#009ef7', fontWeight: 500 }}>#{order.id}</td>
                                                    <td style={{ padding: '12px 10px', color: '#555' }}>{order.date}</td>
                                                    <td style={{ padding: '12px 10px', color: '#333' }}>₹{(order.amount || 0).toLocaleString('en-IN')}</td>
                                                    <td style={{ padding: '12px 10px' }}>
                                                        <span style={{
                                                            backgroundColor: order.status === 'Delivered' ? '#e8fff3' : order.status === 'Pending' ? '#fff8dd' : '#f5f8fa',
                                                            color: order.status === 'Delivered' ? '#50cd89' : order.status === 'Pending' ? '#ffc700' : '#5e6278',
                                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem'
                                                        }}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div style={{ padding: '40px', textAlign: 'center', color: '#888', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                        This customer hasn't placed any orders yet.
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                    <button onClick={() => setViewingOrderHistory(false)} className="btn" style={{ background: '#f5f8fa', color: '#5e6278' }}>← Back to Profile</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                    <div style={{ width: '60px', height: '60px', backgroundColor: '#e1e5ea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaUser size={24} color="#7e8299" />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{selectedCustomer.name}</h4>
                                        <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}><FaEnvelope size={12} /> {selectedCustomer.email}</div>
                                        <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '3px' }}>{selectedCustomer.phone}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                                    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                                        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>Total Orders</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 500, color: '#009ef7' }}>{selectedCustomer.totalOrders || 0}</div>
                                    </div>
                                    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                                        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>Total Spent</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 500, color: '#50cd89' }}>₹{(selectedCustomer.totalSpent || 0).toLocaleString('en-IN')}</div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '10px' }}>Account Information</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: '#666' }}>Customer ID:</span>
                                        <span>{selectedCustomer.id}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: '#666' }}>Registered On:</span>
                                        <span>{selectedCustomer.joined}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#666' }}>Account Status:</span>
                                        <span style={{ color: selectedCustomer.status === 'Active' ? '#50cd89' : '#f1416c', fontWeight: 500 }}>{selectedCustomer.status}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                    {selectedCustomer.status === 'Active' ? (
                                        <button className="btn" style={{ background: '#fff0f4', color: '#f1416c', display: 'flex', alignItems: 'center', gap: '8px' }}><FaBan /> Suspend Account</button>
                                    ) : (
                                        <button className="btn" style={{ background: '#e8fff3', color: '#50cd89', display: 'flex', alignItems: 'center', gap: '8px' }}><FaCheck /> Activate Account</button>
                                    )}
                                    <button onClick={() => setViewingOrderHistory(true)} className="btn btn-primary">View order history</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersPage;
