import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import api from '../api';

const CustomOrderPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        sareeType: '',
        colorPreference: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.sareeType || !formData.colorPreference) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Save to database via API first
            await api.post('/utils/custom-orders', formData).catch(err => {
                console.warn("Could not save to database, continuing to WhatsApp", err);
            });

            // Prepare WhatsApp message
            let text = `*New Custom Order Request*\n\n`;
            text += `*Name:* ${formData.name}\n`;
            text += `*Phone:* ${formData.phone}\n`;
            text += `*Type:* ${formData.sareeType}\n`;
            text += `*Colors:* ${formData.colorPreference}\n`;
            if (formData.message) {
                text += `*Details:* ${formData.message}\n`;
            }

            // Redirect to WhatsApp
            const adminWhatsApp = '919346591460'; // Use fallback
            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/${adminWhatsApp}?text=${encodedText}`, '_blank');

            // Clear form
            setTimeout(() => {
                setFormData({ name: '', phone: '', sareeType: '', colorPreference: '', message: '' });
                setIsSubmitting(false);
            }, 1000);

        } catch (error) {
            console.error("Error submitting custom order:", error);
            setIsSubmitting(false);
            alert("Something went wrong. Please try again.");
        }
    };

    const features = [
        "Choose your preferred colors and patterns",
        "Work directly with master weavers",
        "Delivery in 30 days",
        "100% authentic handloom"
    ];

    return (
        <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{ backgroundColor: 'var(--color-maroon)', padding: '80px 20px', textAlign: 'center', color: '#fff' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontWeight: 'normal', color: '#fff' }}>Custom Order</h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Create Your Unique Piece</p>
            </section>

            {/* Main Content */}
            <section style={{ padding: '60px 20px' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>

                    {/* Left Column */}
                    <div>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-maroon)', marginBottom: '20px', fontFamily: 'var(--font-serif)', fontWeight: 'normal', lineHeight: '1.2' }}>
                            Want a Custom Color or<br />Design?
                        </h2>
                        <hr style={{ width: '50px', borderTop: '2px solid var(--color-gold)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', margin: '0 0 25px 0' }} />

                        <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '40px' }}>
                            We understand that every saree tells a story, and sometimes you want to create your own. Our custom order service allows you to work directly with our master weavers to bring your vision to life.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                            {features.map((text, i) => (
                                <div key={i} style={{ backgroundColor: '#fff', padding: '15px 20px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                                    <FaCheck style={{ color: 'var(--color-maroon)' }} />
                                    <span style={{ color: '#444', fontSize: '0.95rem' }}>{text}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ backgroundColor: '#F3EFE6', borderLeft: '4px solid var(--color-maroon)', padding: '25px', borderRadius: '4px' }}>
                            <h4 style={{ color: '#333', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Delivery Information</h4>
                            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                Custom orders typically take 30 days from order confirmation. We'll keep you updated throughout the process and share progress photos of your piece being woven.
                            </p>
                        </div>
                    </div>

                    {/* Right Column (Form) */}
                    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '8px', display: 'block' }}>Name *</label>
                                <input type="text" name="name" required placeholder="Your full name" className="form-control" value={formData.name} onChange={handleChange} style={{ backgroundColor: '#fff', border: '1px solid #EBE5D9' }} />
                            </div>

                            <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '8px', display: 'block' }}>Phone Number *</label>
                                <input type="tel" name="phone" required placeholder="+91 98765 43210" className="form-control" value={formData.phone} onChange={handleChange} style={{ backgroundColor: '#fff', border: '1px solid #EBE5D9' }} />
                            </div>

                            <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '8px', display: 'block' }}>Saree Type *</label>
                                <select name="sareeType" required className="form-control" value={formData.sareeType} onChange={handleChange} style={{ backgroundColor: '#fff', border: '1px solid #EBE5D9' }}>
                                    <option value="">Select type</option>
                                    <option value="Silk Ikat Saree">Silk Ikat Saree</option>
                                    <option value="Cotton Ikat Saree">Cotton Ikat Saree</option>
                                    <option value="Sico Ikat Saree">Sico Ikat Saree</option>
                                    <option value="Ikat Dupatta">Ikat Dupatta</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '8px', display: 'block' }}>Color Preference *</label>
                                <input type="text" name="colorPreference" required placeholder="e.g., Maroon and Gold, Cream and Beige" className="form-control" value={formData.colorPreference} onChange={handleChange} style={{ backgroundColor: '#fff', border: '1px solid #EBE5D9' }} />
                            </div>

                            <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '8px', display: 'block' }}>Additional Details</label>
                                <textarea name="message" rows="4" placeholder="Any specific design preferences, occasions, or special requirements..." className="form-control" value={formData.message} onChange={handleChange} style={{ backgroundColor: '#fff', border: '1px solid #EBE5D9', resize: 'vertical' }}></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting} style={{ backgroundColor: 'var(--color-maroon)', color: '#fff', padding: '16px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem', letterSpacing: '0.5px', marginTop: '10px', transition: 'all 0.3s', opacity: isSubmitting ? 0.7 : 1 }}>
                                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT CUSTOM ORDER REQUEST'}
                            </button>

                            <p style={{ fontSize: '0.8rem', color: '#777', textAlign: 'center', margin: '5px 0 0 0' }}>
                                * After submitting, you'll be redirected to WhatsApp to confirm your order details with our team.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomOrderPage;
