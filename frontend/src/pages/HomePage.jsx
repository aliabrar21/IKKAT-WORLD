import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';
import api from '../api';

const adminWhatsApp = '+919346591460';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [heritage, setHeritage] = useState(null);
    const [homeSettings, setHomeSettings] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const { data } = await api.get('/products?limit=3');
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching featured products:", error);
            }
        };
        const fetchHeritageSettings = async () => {
            try {
                const { data } = await api.get('/settings/heritage_section');
                if (data) setHeritage(data);
            } catch (error) {
                console.error("Error fetching heritage settings:", error);
            }
        };
        const fetchHomeSettings = async () => {
            try {
                const { data } = await api.get('/settings/home_page');
                if (data) setHomeSettings(data);
            } catch (error) {
                console.error("Error fetching home settings:", error);
            }
        };
        fetchFeaturedProducts();
        fetchHeritageSettings();
        fetchHomeSettings();
    }, []);
    return (
        <div>
            {/* Hero Section */}
            <section className="hero" style={homeSettings?.heroImageUrl ? { backgroundImage: `url(${homeSettings.heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backgroundBlendMode: 'overlay' } : {}}>
                <div className="hero-content container">
                    <h1 className="hero-title">Authentic Pochampally Ikkat</h1>
                    <p className="hero-subtitle">Direct From Weavers</p>
                    <p className="hero-desc">
                        Preserving the timeless art of handloom weaving. Each piece is a masterpiece of<br />tradition and craftsmanship.
                    </p>
                    <div className="hero-actions">
                        <Link to="/collection" className="hero-btn-solid">View Collection</Link>
                        <Link to="/contact" className="hero-btn-outline">Enquire Now</Link>
                    </div>
                </div>
            </section>

            {/* Our Heritage */}
            <section className="heritage-section container" style={{ padding: '80px 20px', display: 'flex', gap: '50px', alignItems: 'stretch' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Our Heritage</h2>
                    <hr style={{ width: '50px', borderTop: '2px solid var(--color-gold)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', margin: '0 0 30px 0' }} />

                    <p style={{ color: '#555', marginBottom: '25px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                        {heritage?.description1 || 'Preserving the timeless art of Pochampally Ikkat weaving. Each saree is handcrafted with precision and tradition, carrying forward centuries of heritage in every thread.'}
                    </p>
                    <p style={{ color: '#555', marginBottom: '25px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                        {heritage?.description2 || 'Every piece we create reflects the dedication of skilled artisans who have inherited this craft through generations. From the intricate tying and dyeing of yarns to the final weaving on traditional looms, every stage is carried out with care, patience, and uncompromising attention to detail.'}
                    </p>
                    <p style={{ color: '#555', marginBottom: '40px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                        {heritage?.description3 || 'Since 1995, we have been working directly with master weavers, ensuring authenticity and supporting the artisan community that keeps this beautiful craft alive.'}
                    </p>

                    <div style={{ borderLeft: '4px solid var(--color-maroon)', backgroundColor: '#f9f6f0', padding: '20px 30px' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{heritage?.estYear || 'Est. 1995'}</h3>
                        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '0.95rem', margin: 0 }}>{heritage?.estText || 'Three Decades of Excellence'}</p>
                    </div>
                </div>

                <div style={{ flex: 1, position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    <img src={heritage?.imageUrl || "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop"} alt="Master Weaver working on a handloom" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />

                    {/* Top gradient for title */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)', zIndex: 2 }}></div>

                    {/* Bottom gradient for text */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)', zIndex: 2 }}></div>

                    <div style={{ position: 'relative', zIndex: 3, padding: '40px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#fff', fontWeight: 500, fontFamily: 'var(--font-serif)' }}>Our Heritage</h3>
                        <hr style={{ width: '60px', borderTop: '2px solid var(--color-gold)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', margin: '0 auto' }} />
                    </div>

                    <div style={{ position: 'relative', zIndex: 3, padding: '40px', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)' }}>
                            {heritage?.description1 || 'Preserving the timeless art of Pochampally Ikkat weaving. Each saree is handcrafted with precision and tradition, carrying forward centuries of heritage in every thread. Since 1995, we have been working directly with master weavers, ensuring authenticity and supporting the artisan community that keeps this beautiful craft alive. Our commitment goes beyond fabric — it is about preserving culture, empowering weavers, and delivering authenticity in its purest form.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="featured-section" style={{ backgroundColor: 'transparent', padding: '80px 0' }}>
                <div className="container" style={{ position: 'relative' }}>

                    {/* Decorative gold dash aligned to left container edge */}
                    <div style={{ position: 'absolute', left: '20px', top: '25px', width: '50px', height: '2px', backgroundColor: 'var(--color-gold)' }}></div>

                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.8rem', marginBottom: '15px' }}>Featured Collection</h2>
                        <p style={{ color: '#666', fontSize: '1.05rem' }}>Handpicked pieces from our exclusive collection</p>
                    </div>
                    <div className="grid-cards">
                        {products.map(product => (
                            <div key={product.id} className="product-card" style={{ borderRadius: '0', boxShadow: 'none', cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
                                <div className="card-image-wrap">
                                    <span className={`badge ${product.availability === 'Out of Stock' ? 'out-of-stock' : 'gold'}`} style={{ backgroundColor: product.availability === 'Out of Stock' ? '#555' : '#D3A745', color: product.availability === 'Out of Stock' ? '#fff' : '#2C2C2C' }}>
                                        {product.availability === 'Out of Stock' ? 'Out of Stock' : (product.availability || 'In Stock')}
                                    </span>
                                    <img src={product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'} alt={product.name} />
                                    <div className="image-title-overlay">
                                        <h4>{product.name}</h4>
                                        <div className="image-overlay-divider">
                                            <span>♦</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body new-style">
                                    <h3 className="new-product-title">{product.name}</h3>
                                    <p className="new-product-category">IKKAT COLLECTION</p>
                                    <div className="new-product-price">
                                        ₹{Number(product.price).toLocaleString('en-IN')}
                                    </div>
                                    {((product.variants && product.variants.length > 0) || product.color_code) && (
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '15px', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
                                            {product.color_code && (!product.variants || product.variants.length === 0) && (
                                                <div
                                                    title={product.color_name}
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: product.color_code,
                                                        border: '2px solid var(--color-maroon)',
                                                        boxShadow: '0 0 0 2px #fff inset',
                                                        cursor: 'default'
                                                    }}
                                                />
                                            )}
                                            {product.variants && product.variants.slice(0, 4).map(variant => (
                                                <div
                                                    key={variant.id}
                                                    title={variant.color_name}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/product/${variant.id}`);
                                                    }}
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: variant.color_code || '#fff',
                                                        border: variant.id === product.id ? '2px solid var(--color-maroon)' : '1px solid #ddd',
                                                        boxShadow: variant.id === product.id ? '0 0 0 2px #fff inset' : 'none',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        backgroundImage: !variant.color_code && variant.imageUrl ? `url(${variant.imageUrl})` : 'none',
                                                        backgroundSize: 'cover'
                                                    }}
                                                    onMouseOver={e => {
                                                        e.currentTarget.style.transform = 'scale(1.2)';
                                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                                                    }}
                                                    onMouseOut={e => {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                        e.currentTarget.style.boxShadow = variant.id === product.id ? '0 0 0 2px #fff inset' : 'none';
                                                    }}
                                                />
                                            ))}
                                            {product.variants.length > 4 && (
                                                <div style={{ fontSize: '11px', color: '#666', display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                                                    +{product.variants.length - 4} more
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Link to="/collection" className="btn btn-primary">View All Sarees</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
