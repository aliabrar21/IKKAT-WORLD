import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';
import api from '../api';

const adminWhatsApp = '+919346591460';

const CollectionPage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);
    const [filter, setFilter] = useState('All');
    const location = useLocation();
    
    // Initialize search state from URL query parameters
    const [search, setSearch] = useState(() => {
        return new URLSearchParams(location.search).get('search') || '';
    });
    const navigate = useNavigate();

    // Sync search state if URL changes
    useEffect(() => {
        const querySearch = new URLSearchParams(location.search).get('search') || '';
        setSearch(querySearch);
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get('/products?limit=100'),
                    api.get('/categories')
                ]);
                setAllProducts(prodRes.data.products || []);
                setCategories([{ id: 'all', name: 'All' }, ...catRes.data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = allProducts.filter(p => {
        const catName = categories.find(c => c.id === p.category_id)?.name || 'Unknown';
        const matchCat = filter === 'All' || catName === filter;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem' }}>Our Collection</h1>
            <p style={{ textAlign: 'center', marginBottom: '40px', color: '#666' }}>Discover the finest authentic Pochampally Ikkat creations</p>

            {/* Filters and Search */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control"
                    style={{ maxWidth: '400px' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`btn ${filter === cat.name ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilter(cat.name)}
                            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid-cards">
                {filteredProducts.map(product => (
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
                            <p className="new-product-category">{categories.find(c => c.id === product.category_id)?.name || 'Product Category'}</p>
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
        </div>
    );
};

export default CollectionPage;
