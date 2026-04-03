import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaShoppingCart, FaUsers, FaTags, FaEnvelope, FaSignOutAlt, FaBookOpen, FaLayerGroup } from 'react-icons/fa';

const Layout = () => {
    const navigate = useNavigate();
    const adminInfoStr = localStorage.getItem('adminInfo');
    let adminName = 'Admin';
    if (adminInfoStr) {
        try {
            const p = JSON.parse(adminInfoStr);
            adminName = p.name || p.email.split('@')[0];
        } catch (e) { }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-brand">
                    Pochampally Admin
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} end>
                        <FaHome size={18} /> Dashboard
                    </NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaBoxOpen size={18} /> Products
                    </NavLink>
                    <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaTags size={18} /> Categories
                    </NavLink>
                    <NavLink to="/orders" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaShoppingCart size={18} /> Orders
                    </NavLink>
                    <NavLink to="/customers" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaUsers size={18} /> Customers
                    </NavLink>
                    <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaUsers size={18} /> Users
                    </NavLink>
                    <NavLink to="/messages" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaEnvelope size={18} /> Messages
                    </NavLink>
                    <NavLink to="/heritage" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaBookOpen size={18} /> Our Heritage
                    </NavLink>
                    <NavLink to="/home-settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaHome size={18} /> Home Page
                    </NavLink>
                    <NavLink to="/process-settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <FaLayerGroup size={18} /> Our Process
                    </NavLink>
                </nav>
            </aside>

            {/* Main Wrapper */}
            <div className="main-wrapper">
                <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Dashboard Overview</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontWeight: 600, color: '#333' }}>Hello, {adminName}</span>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            {adminName.charAt(0).toUpperCase()}
                        </div>
                        <button onClick={handleLogout} className="btn" style={{ background: 'transparent', color: '#f1416c', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </header>

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
