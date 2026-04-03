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
            <header className="header">
                <div className="container">
                    <div className="logo-container">
                        <Link to="/" className="logo">Pochampally Ikkat</Link>
                        <span className="logo-subtext">AUTHENTIC HANDLOOM</span>
                    </div>

                    <nav className="nav-links">
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/collection" className={location.pathname === '/collection' ? 'active' : ''}>Collection</Link>
                        <Link to="/weaving-process" className={location.pathname === '/weaving-process' ? 'active' : ''}>Our Process</Link>
                        <Link to="/custom-order" className={location.pathname === '/custom-order' ? 'active' : ''}>Custom Order</Link>
                        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                    </nav>

                    <div className="header-actions">
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <input 
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit">
                                <FaSearch size={14} />
                            </button>
                        </form>

                        {userInfo ? (
                            <div className="user-dropdown-container">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="user-btn"
                                >
                                    <span className="user-name">
                                        {userInfo.name || userInfo.email.split('@')[0]}
                                    </span>
                                    <span className="arrow-down">▼</span>
                                </button>
                                {showDropdown && (
                                    <div className="user-dropdown">
                                        <button onClick={handleLogout} className="logout-link">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="login-link">Login</Link>
                        )}
                        <div className="social-links-minimal">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon insta">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon fb">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://wa.me/919346591460" target="_blank" rel="noopener noreferrer" className="social-icon wa">
                                <FaWhatsapp size={20} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon yt">
                                <FaYoutube size={20} />
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

                        <div style={{ display: 'flex', gap: '20px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C' }}>
                                <FaInstagram size={30} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2' }}>
                                <FaFacebook size={30} />
                            </a>
                            <a href="https://wa.me/919346591460" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>
                                <FaWhatsapp size={30} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000' }}>
                                <FaYoutube size={30} />
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
