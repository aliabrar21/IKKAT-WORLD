import React, { useState, useEffect } from 'react';
import api from '../api';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Orders Management</h2>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Order ID</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Customer</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Contact</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Items Ordered</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Date</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Amount</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: '15px 10px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                                <td style={{ padding: '15px 10px', fontWeight: 500 }}>#{order.id}</td>
                                <td style={{ padding: '15px 10px' }}>{order.customer_name}</td>
                                <td style={{ padding: '15px 10px' }}>{order.customer_phone}</td>
                                <td style={{ padding: '15px 10px' }}>
                                    {order.items && order.items.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            {order.items.map((item, idx) => (
                                                <div key={idx} style={{ fontSize: '0.85rem', color: '#555' }}>
                                                    {item.quantity}x {item.name || 'Unknown'}
                                                </div>
                                            ))}
                                        </div>
                                    ) : '-'}
                                </td>
                                <td style={{ padding: '15px 10px' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td style={{ padding: '15px 10px' }}>₹{Number(order.totalAmount).toLocaleString('en-IN')}</td>
                                <td style={{ padding: '15px 10px' }}>
                                    <select
                                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid var(--border-color)', background: order.status === 'Pending' ? '#fff8dd' : '#e8fff3', color: order.status === 'Pending' ? '#ffc700' : '#50cd89' }}
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                                    <button onClick={() => handleViewOrder(order)} className="btn" style={{ background: '#f5f8fa', color: '#009ef7', cursor: 'pointer' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedOrder && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '600px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500 }}>Order Details: #{selectedOrder.id}</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--text-dark)' }}>Customer Information</h4>
                                <p style={{ margin: '5px 0', color: '#555' }}><strong>Name:</strong> {selectedOrder.customer_name}</p>
                                <p style={{ margin: '5px 0', color: '#555' }}><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                                <p style={{ margin: '5px 0', color: '#555' }}><strong>Email:</strong> {selectedOrder.customer_email}</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--text-dark)' }}>Order Information</h4>
                                <p style={{ margin: '5px 0', color: '#555' }}><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                                <p style={{ margin: '5px 0', color: '#555' }}><strong>Status:</strong> {selectedOrder.status}</p>
                                <p style={{ margin: '5px 0', color: '#555' }}><strong>Total Amount:</strong> ₹{Number(selectedOrder.totalAmount).toLocaleString('en-IN')}</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--text-dark)' }}>Shipping Address</h4>
                            <p style={{ color: '#555', background: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #eee' }}>{selectedOrder.address}</p>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--text-dark)' }}>Order Items</h4>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f5f8fa', color: '#5e6278', textAlign: 'left' }}>
                                        <th style={{ padding: '10px', fontWeight: 500 }}>Item</th>
                                        <th style={{ padding: '10px', fontWeight: 500, textAlign: 'center' }}>Qty</th>
                                        <th style={{ padding: '10px', fontWeight: 500, textAlign: 'right' }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.items?.map((item, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '10px', color: '#333' }}>{item.name}</td>
                                            <td style={{ padding: '10px', textAlign: 'center', color: '#555' }}>{item.quantity}</td>
                                            <td style={{ padding: '10px', textAlign: 'right', color: '#555' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
