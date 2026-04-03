import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaYoutube, FaSearch, FaFacebook, FaBars, FaTimes } from 'react-icons/fa';

const Layout = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
                <div className="container">
                    <div className="logo-container" style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to="/" className="logo" style={{ lineHeight: 1.1 }}>Pochampally Ikkat</Link>
                        <span style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '2px', marginTop: '2px' }}>AUTHENTIC HANDLOOM</span>
                    </div>

                    <nav className="nav-links">
                        <Link to="/" style={{ color: location.pathname === '/' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Home</Link>
                        <Link to="/collection" style={{ color: location.pathname === '/collection' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/collection' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Collection</Link>
                        <Link to="/weaving-process" style={{ color: location.pathname === '/weaving-process' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/weaving-process' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Our Process</Link>
                        <Link to="/custom-order" style={{ color: location.pathname === '/custom-order' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/custom-order' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Custom Order</Link>
                        <Link to="/contact" style={{ color: location.pathname === '/contact' ? 'var(--color-maroon)' : '#555', borderBottom: location.pathname === '/contact' ? '2px solid var(--color-maroon)' : 'none', paddingBottom: '3px', whiteSpace: 'nowrap' }}>Contact</Link>
                    </nav>

                    <div className="header-actions" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
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
                                        fontWeight: 600,
                                        color: 'var(--color-maroon)',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        backgroundColor: '#fff',
                                        border: '1px solid #eee',
                                        fontFamily: 'var(--font-sans)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {userInfo.name || userInfo.email.split('@')[0]}
                                    </span>
                                    <span style={{ fontSize: '0.7rem' }}>▼</span>
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
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C', display: 'flex', alignItems: 'center' }}>
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://wa.me/919346591460" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', display: 'flex', alignItems: 'center' }}>
                                <FaWhatsapp size={24} />
                            </a>
                        </div>
                    </div>

                    <button className="hamburger-btn" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                    <nav className="mobile-nav-links">
                        <Link to="/" onClick={toggleMenu}>Home</Link>
                        <Link to="/collection" onClick={toggleMenu}>Collection</Link>
                        <Link to="/weaving-process" onClick={toggleMenu}>Our Process</Link>
                        <Link to="/custom-order" onClick={toggleMenu}>Custom Order</Link>
                        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                        
                        <div style={{ marginTop: '20px', width: '100%', padding: '0 40px' }}>
                            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '25px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <input 
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem', color: 'white' }}
                                />
                                <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: 0 }}>
                                    <FaSearch size={18} />
                                </button>
                            </form>
                        </div>

                        {userInfo ? (
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <p style={{ color: 'white', opacity: 0.8, marginBottom: '10px' }}>Welcome, {userInfo.name || userInfo.email.split('@')[0]}</p>
                                <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #f1416c', color: '#f1416c', padding: '10px 30px', borderRadius: '4px', fontSize: '1.2rem', fontWeight: 'bold' }}>Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={toggleMenu} style={{ fontSize: '1.8rem', marginTop: '20px' }}>Login</Link>
                        )}

                        <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
                             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                <FaInstagram size={32} />
                            </a>
                            <a href="https://wa.me/919346591460" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>
                                <FaWhatsapp size={32} />
                            </a>
                        </div>
                    </nav>
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
