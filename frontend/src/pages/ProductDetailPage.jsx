import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';
import api from '../api';
import { getImageUrl } from '../utils/imageUtils';

const adminWhatsApp = '+919346591460';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const [loading, setLoading] = useState(true);
    const [allImages, setAllImages] = useState([]);
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

    // Initial state setup based on login
    const userInfoMap = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

    // Order Modal State
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('WhatsApp');
    const [orderForm, setOrderForm] = useState({
        customer_name: userInfoMap.name || '',
        customer_email: userInfoMap.email || '',
        customer_phone: userInfoMap.phone || '',
        shipping_address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePlaceOrderClick = (method) => {
        if (!localStorage.getItem('userInfo')) {
            alert('Please login to place an order.');
            navigate('/login');
            return;
        }
        setPaymentMethod(method);
        setShowModal(true);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                const uniqueImages = Array.from(new Set([data.imageUrl, ...(data.images || [])])).filter(Boolean).map(getImageUrl);
                if (uniqueImages.length === 0) uniqueImages.push('https://via.placeholder.com/800x800?text=No+Image');
                setAllImages(uniqueImages);
                setMainImg(uniqueImages[0]);

                // Preload variant images for smooth transitions
                if (data.variants && data.variants.length > 0) {
                    data.variants.forEach(v => {
                        if (v.imageUrl) {
                            const img = new Image();
                            img.src = getImageUrl(v.imageUrl);
                        }
                    });
                }

                // Fetch recommended products from same category
                try {
                    const recRes = await api.get(`/products?category=${data.category_id}&limit=5`);
                    // filter out the current product
                    const filterRecs = (recRes.data.products || []).filter(p => p.id !== data.id).slice(0, 4);
                    setRecommendedProducts(filterRecs);
                } catch (recErr) {
                    console.error('Error fetching recommendations:', recErr);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // 1. Submit order to backend
            const orderData = {
                customerName: orderForm.customer_name,
                customerEmail: orderForm.customer_email,
                customerPhone: orderForm.customer_phone,
                totalAmount: product.price,
                orderItems: [{ productId: product.id, quantity: 1, price: product.price }]
            };
            await api.post('/orders', orderData);

            // 2. Redirect to WhatsApp
            let rawText = `Hi, I just placed an order!\n*Product:* ${product.name}\n*SKU:* ${product.sku}\n*Name:* ${orderForm.customer_name}\n*Phone:* ${orderForm.customer_phone}`;
            if (orderForm.shipping_address) {
                rawText += `\n*Address:* ${orderForm.shipping_address}`;
            }
            let productLink = window.location.href;
            if (productLink.includes('localhost')) {
                // If accessing via localhost on PC, links on mobile won't work.
                // Best practice is to access the frontend via your PC's local IP (e.g., 192.168.0.105)
                console.warn('Accessing via localhost. WhatsApp links may not work on mobile. Please access via your local IP.');
            }
            rawText += `\n*Product Link:* ${productLink}`;
            
            let imageLink = mainImg;
            if (imageLink && imageLink.includes('localhost')) {
                // Replace hardcoded localhost from db with the network IP the user is currently using
                imageLink = imageLink.replace('localhost', window.location.hostname);
            }
            if (imageLink && !imageLink.includes('via.placeholder.com')) {
                rawText += `\n*Image Preview:* ${imageLink}`;
            }
            if (paymentMethod === 'UPI') {
                rawText += `\n*Payment Preference:* UPI`;
            }
            const encodedText = encodeURIComponent(rawText);
            window.open(`https://wa.me/${adminWhatsApp}?text=${encodedText}`, '_blank');

            // 3. Close modal & reset
            setShowModal(false);
            if (paymentMethod === 'UPI') {
                alert('Order placed! Redirecting to WhatsApp for UPI payment details...');
            } else {
                alert('Order placed successfully! Redirecting to WhatsApp...');
            }
            setOrderForm({ customer_name: '', customer_email: '', customer_phone: '', shipping_address: '' });
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>Loading product...</div>;
    if (!product) return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>Product not found</div>;

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/collection" style={{ color: '#888' }}>&larr; Back to Collection</Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
                {/* Images */}
                <div style={{ flex: '1 1 400px' }}>
                    <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', backgroundColor: '#f5f5f5', cursor: 'zoom-in' }} onClick={() => setIsZoomModalOpen(true)}>
                        <img src={mainImg} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} loading="lazy" />
                    </div>
                    <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {allImages.map((img, idx) => (
                            <div key={idx} onClick={() => setMainImg(img)} style={{ flexShrink: 0, width: '80px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: mainImg === img ? '2px solid var(--color-maroon)' : '1px solid #ddd', cursor: 'pointer', opacity: mainImg === img ? 1 : 0.6, transition: 'all 0.2s ease' }}>
                                <img src={img} alt={`thumbnail-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div style={{ flex: '1 1 400px', paddingTop: '10px' }}>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#1a202c', marginBottom: '15px', lineHeight: 1.2 }}>{product.name}</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#6a6a6a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '30px' }}>
                        IKKAT COLLECTION
                    </p>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-maroon)', fontWeight: 700, marginBottom: '40px' }}>
                        ₹{Number(product.price).toLocaleString('en-IN')}
                    </div>

                    {/* Color Variants */}
                    {((product.variants && product.variants.length > 0) || product.color_code) && (
                        <div style={{ marginBottom: '30px' }}>
                            <h4 style={{ fontSize: '1rem', color: '#1a202c', marginBottom: '15px', fontWeight: 600 }}>
                                Color: <span style={{ color: '#6a6a6a', fontWeight: 'normal' }}>{product.color_name || 'Selected'}</span>
                            </h4>
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                {product.color_code && (!product.variants || product.variants.length === 0) && (
                                    <div
                                        title={product.color_name}
                                        style={{
                                            position: 'relative',
                                            display: 'block',
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '50%',
                                            backgroundColor: product.color_code,
                                            border: '2px solid var(--color-maroon)',
                                            boxShadow: '0 0 0 3px #fff inset',
                                            cursor: 'default'
                                        }}
                                    />
                                )}
                                {product.variants && product.variants.map((variant) => {
                                    const isOutOfStock = variant.availability === 'Out of Stock';
                                    return (
                                        <Link
                                            key={variant.id}
                                            to={isOutOfStock ? '#' : `/product/${variant.id}`}
                                            title={isOutOfStock ? `${variant.color_name} - Out of Stock` : variant.color_name}
                                            style={{
                                                position: 'relative',
                                                display: 'block',
                                                width: '45px',
                                                height: '45px',
                                                borderRadius: '50%',
                                                backgroundColor: variant.color_code || '#fff',
                                                border: variant.id === product.id ? '2px solid var(--color-maroon)' : '1px solid #ddd',
                                                boxShadow: variant.id === product.id ? '0 0 0 3px #fff inset' : 'none',
                                                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                                transition: 'transform 0.2s',
                                                textDecoration: 'none',
                                                opacity: isOutOfStock ? 0.4 : 1
                                            }}
                                            onClick={(e) => {
                                                if (isOutOfStock) e.preventDefault();
                                            }}
                                            onMouseOver={e => {
                                                if (!isOutOfStock) e.currentTarget.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseOut={e => {
                                                if (!isOutOfStock) e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            {!variant.color_code && variant.imageUrl && (
                                                /* Fallback if no color code but has imageUrl */
                                                <img src={getImageUrl(variant.imageUrl)} alt={variant.color_name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                            )}
                                            {isOutOfStock && (
                                                <div style={{
                                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%',
                                                    background: 'linear-gradient(to top left, transparent 46%, #d32f2f 46%, #d32f2f 54%, transparent 54%)'
                                                }} />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div style={{ backgroundColor: '#f4f1ea', padding: '25px', borderRadius: '8px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}><span style={{ color: 'var(--color-maroon)', marginRight: '10px' }}>⚲</span> <span style={{ fontWeight: 600, marginRight: '8px' }}>Fabric:</span> Pure Cotton</div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}><span style={{ color: 'var(--color-maroon)', marginRight: '10px' }}>⚲</span> <span style={{ fontWeight: 600, marginRight: '8px' }}>Length:</span> 2.5 meters</div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}><span style={{ color: 'var(--color-maroon)', marginRight: '10px' }}>⚲</span> <span style={{ fontWeight: 600, marginRight: '8px' }}>Blouse Piece:</span> N/A</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: 'var(--color-maroon)', marginRight: '10px' }}>⚲</span> <span style={{ fontWeight: 600, marginRight: '8px' }}>Delivery Time:</span> Ready to Ship</div>
                    </div>

                    <div style={{ backgroundColor: '#faf8f5', padding: '25px', borderRadius: '8px', borderLeft: '4px solid var(--color-maroon)', marginBottom: '40px' }}>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a202c', marginBottom: '10px' }}>Care Instructions</h4>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#555' }}>Hand wash with mild detergent. Dry in shade.</p>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => handlePlaceOrderClick('WhatsApp')}
                            className="btn btn-primary"
                            style={{ flex: 1, padding: '15px' }}
                        >
                            <FaWhatsapp size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Place Order via WhatsApp
                        </button>
                        <button
                            onClick={() => handlePlaceOrderClick('UPI')}
                            className="btn btn-upi"
                            style={{ flex: 1, padding: '15px' }}
                        >
                            <SiGooglepay size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Pay via UPI
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: 'var(--font-serif)', color: '#1a202c' }}>Customer Reviews</h2>
                
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    {/* Review Summary */}
                    <div style={{ flex: '1 1 300px', backgroundColor: '#faf8f5', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#1a202c', lineHeight: 1 }}>4.8</div>
                        <div style={{ color: '#D3A745', fontSize: '1.5rem', margin: '10px 0' }}>★★★★★</div>
                        <p style={{ color: '#6a6a6a' }}>Based on 24 reviews</p>
                        <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }} onClick={() => alert('Review submission is coming soon!')}>Write a Review</button>
                    </div>

                    {/* Review List */}
                    <div style={{ flex: '2 1 500px' }}>
                        {[
                            { name: 'Priya S.', rating: 5, date: 'October 15, 2025', comment: 'Absolutely stunning! The quality of the Ikkat weaving is exceptional. Colors are exactly as shown.' },
                            { name: 'Anita Reddy', rating: 5, date: 'September 28, 2025', comment: 'Beautiful fabric and very prompt delivery. I loved the texture and it drapes perfectly.' },
                            { name: 'Kavita M.', rating: 4, date: 'September 10, 2025', comment: 'Great product, but I wish there were more color options available in this specific pattern.' }
                        ].map((review, idx) => (
                            <div key={idx} style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: idx === 2 ? 'none' : '1px solid #eee' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap' }}>
                                    <div style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#1a202c', marginRight: '10px' }}>{review.name}</span>
                                        <span style={{ color: '#D3A745', fontSize: '1.1rem' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                                    </div>
                                    <span style={{ color: '#888', fontSize: '0.9rem' }}>{review.date}</span>
                                </div>
                                <p style={{ color: '#555', lineHeight: 1.6, margin: 0 }}>"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
                <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>Recommended For You</h2>
                        <p style={{ color: '#666', fontSize: '1.05rem' }}>Related items you might love</p>
                    </div>
                    <div className="grid-cards">
                        {recommendedProducts.map(product => (
                            <div key={product.id} className="product-card" style={{ borderRadius: '0', boxShadow: 'none', cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
                                <div className="card-image-wrap">
                                    <span className={`badge ${product.availability === 'Out of Stock' ? 'out-of-stock' : 'gold'}`} style={{ backgroundColor: product.availability === 'Out of Stock' ? '#555' : '#D3A745', color: product.availability === 'Out of Stock' ? '#fff' : '#2C2C2C' }}>
                                        {product.availability === 'Out of Stock' ? 'Out of Stock' : (product.availability || 'In Stock')}
                                    </span>
                                    <img src={product.imageUrl ? getImageUrl(product.imageUrl) : 'https://via.placeholder.com/400x400?text=No+Image'} alt={product.name} />
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
                                                        backgroundImage: !variant.color_code && variant.imageUrl ? `url(${getImageUrl(variant.imageUrl)})` : 'none',
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
                                            {product.variants && product.variants.length > 4 && (
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
            )}

            {/* Order Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '90%', maxWidth: '500px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', position: 'relative' }}>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}
                        >
                            &times;
                        </button>
                        <h2 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>Confirm Your Order</h2>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            {paymentMethod === 'UPI' 
                                ? 'Please provide your details. We will confirm your order and provide UPI payment details via WhatsApp.' 
                                : 'Please provide your details. We will confirm availability and payment via WhatsApp.'}
                        </p>

                        <form onSubmit={handleOrderSubmit}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Full Name *</label>
                                <input type="text" className="form-control" required style={{ width: '100%' }} value={orderForm.customer_name} onChange={e => setOrderForm({ ...orderForm, customer_name: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number (WhatsApp) *</label>
                                <input type="tel" className="form-control" required style={{ width: '100%' }} value={orderForm.customer_phone} onChange={e => setOrderForm({ ...orderForm, customer_phone: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Email Address</label>
                                <input type="email" className="form-control" style={{ width: '100%' }} value={orderForm.customer_email} onChange={e => setOrderForm({ ...orderForm, customer_email: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Shipping Address</label>
                                <textarea className="form-control" rows="3" style={{ width: '100%' }} value={orderForm.shipping_address} onChange={e => setOrderForm({ ...orderForm, shipping_address: e.target.value })}></textarea>
                            </div>

                            <button type="submit" className={paymentMethod === 'UPI' ? "btn btn-upi" : "btn btn-whatsapp"} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : (
                                    <>
                                        {paymentMethod === 'UPI' ? <SiGooglepay size={20} style={{ marginRight: '8px' }} /> : <FaWhatsapp size={20} style={{ marginRight: '8px' }} />}
                                        {paymentMethod === 'UPI' ? 'Confirm & Get UPI Details' : 'Confirm & Go to WhatsApp'}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Zoom Modal */}
            {isZoomModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsZoomModalOpen(false)}>
                    <img src={mainImg} style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }} alt="Full screen preview" />
                    <button style={{ position: 'absolute', top: '20px', right: '30px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }} onClick={() => setIsZoomModalOpen(false)}>&times;</button>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
