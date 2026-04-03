import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaYoutube, FaSearch, FaFacebook } from 'react-icons/fa';

const Layout = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/collection?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            try { setUserInfo(JSON.parse(storedUser)); } catch (e) { }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        navigate('/login');
    };

    return (
        <>
            <header className="header" style={{ padding: '15px 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '20px' }}>
                    <div className="logo-container" style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to="/" className="logo" style={{ lineHeight: 1.1 }}>Pochampally Ikkat</Link>
                        <span style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '2px', marginTop: '2px' }}>AUTHENTIC HANDLOOM</span>
                    </div>

                    <nav className="nav-links" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/" style={{ color: location.pathname === '/' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Home</Link>
                        <Link to="/collection" style={{ color: location.pathname === '/collection' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/collection' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Collection</Link>
                        <Link to="/weaving-process" style={{ color: location.pathname === '/weaving-process' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/weaving-process' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Our Process</Link>
                        <Link to="/custom-order" style={{ color: location.pathname === '/custom-order' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/custom-order' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Custom Order</Link>
                        <Link to="/contact" style={{ color: location.pathname === '/contact' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/contact' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Contact</Link>
                    </nav>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '20px', padding: '5px 15px' }}>
                            <input 
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ border: 'none', background: 'transparent', outline: 'none', width: '120px', fontSize: '0.9rem' }}
                            />
                            <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center', padding: 0 }}>
                                <FaSearch size={14} />
                            </button>
                        </form>

                        {userInfo ? (
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        color: '#555',
                                        padding: 0,
                                        fontFamily: 'var(--font-sans)',
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--color-maroon)'}
                                    onMouseOut={(e) => e.target.style.color = '#555'}
                                >
                                    {userInfo.name || userInfo.email.split('@')[0]} ▼
                                </button>
                                {showDropdown && (
                                    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '10px', background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '4px', padding: '10px', minWidth: '120px', zIndex: 100 }}>
                                        <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', padding: '6px 12px', color: '#f1416c', borderColor: '#f1416c' }}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" style={{ fontSize: '0.9rem', color: '#666' }}>Login</Link>
                        )}
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://wa.me/919346591460" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <FaWhatsapp size={24} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <FaYoutube size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div>
                            <h3>Pochampally Ikkat</h3>
                            <p>Authentic handwoven sarees direct from the weavers. Preserving heritage since 1950.</p>
                        </div>
                        <div>
                            <h3>Quick Links</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Link to="/collection">Shop Collection</Link>
                                <Link to="/weaving-process">The Weaving Process</Link>
                                <Link to="/custom-order">Custom Orders</Link>
                                <Link to="/contact">Contact Us</Link>
                            </div>
                        </div>
                        <div>
                            <h3>Contact Info</h3>
                            <p>Email: info@ikkatworld.com</p>
                            <p>Phone: +91 9346591460</p>
                            <p>Location: Pochampally, Telangana</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Pochampally Ikkat World. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Layout;
