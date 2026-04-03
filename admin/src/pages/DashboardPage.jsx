import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { FaShoppingCart, FaRupeeSign, FaBox, FaUsers } from 'react-icons/fa';
import api from '../api';

const salesData = [
    { name: 'Jan', sales: 40000 },
    { name: 'Feb', sales: 30000 },
    { name: 'Mar', sales: 50000 },
    { name: 'Apr', sales: 80000 },
    { name: 'May', sales: 60000 },
    { name: 'Jun', sales: 90000 },
    { name: 'Jul', sales: 110000 },
];

const categoryData = [
    { name: 'Silk Ikkat', value: 400 },
    { name: 'Cotton Ikkat', value: 300 },
    { name: 'Dupattas', value: 300 },
    { name: 'Lehengas', value: 200 },
];

const StatCard = ({ title, value, icon, color }) => (
    <div className="card flex-between" style={{ borderLeft: `4px solid ${color}` }}>
        <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px' }}>{title}</h4>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)' }}>{value}</h2>
        </div>
        <div style={{ backgroundColor: `${color}15`, padding: '15px', borderRadius: '50%', color: color }}>
            {icon}
        </div>
    </div>
);

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/utils/dashboard');
                setStats(data);
                
                // Fetch recent orders
                const { data: ordersData } = await api.get('/orders');
                setRecentOrders(ordersData.slice(0, 5));
            } catch (error) {
                console.error('Error fetching dashboard stats', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`} icon={<FaRupeeSign size={24} />} color="#009ef7" />
                <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaShoppingCart size={24} />} color="#50cd89" />
                <StatCard title="Total Products" value={stats.totalProducts} icon={<FaBox size={24} />} color="#f1416c" />
                <StatCard title="Total Customers" value={stats.totalCustomers} icon={<FaUsers size={24} />} color="#ffc700" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Sales Overview</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="sales" stroke="#009ef7" strokeWidth={3} dot={{ r: 4 }} />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#b5b5c3' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#b5b5c3' }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Sales by Category</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#b5b5c3', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#50cd89" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Recent Orders</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '12px 0', fontWeight: 500 }}>Order ID</th>
                                <th style={{ padding: '12px 0', fontWeight: 500 }}>Customer</th>
                                <th style={{ padding: '12px 0', fontWeight: 500 }}>Items Ordered</th>
                                <th style={{ padding: '12px 0', fontWeight: 500 }}>Amount</th>
                                <th style={{ padding: '12px 0', fontWeight: 500 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length > 0 ? recentOrders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                                    <td style={{ padding: '15px 0' }}>#ORD-{order.id.toString().padStart(3, '0')}</td>
                                    <td style={{ padding: '15px 0' }}>
                                        <div>{order.customer_name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.customer_phone}</div>
                                    </td>
                                    <td style={{ padding: '15px 0' }}>
                                        {order.items && order.items.length > 0 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} style={{ fontSize: '0.9rem', color: '#333' }}>
                                                        {item.quantity}x {item.name || 'Unknown Product'}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)' }}>No items</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '15px 0' }}>₹{Number(order.totalAmount).toLocaleString('en-IN')}</td>
                                    <td style={{ padding: '15px 0' }}>
                                         <span style={{ 
                                            backgroundColor: order.status === 'Pending' ? '#fff8dd' : 
                                                             order.status === 'Cancelled' ? '#ffe2e5' : '#e8fff3', 
                                            color: order.status === 'Pending' ? '#ffc700' : 
                                                   order.status === 'Cancelled' ? '#f1416c' : '#50cd89', 
                                            padding: '5px 10px', 
                                            borderRadius: '4px', 
                                            fontSize: '0.85rem' 
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)' }}>No recent orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
