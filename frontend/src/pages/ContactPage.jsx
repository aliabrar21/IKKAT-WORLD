import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../api';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/utils/messages', formData);
            
            // Redirect to WhatsApp
            const adminWhatsApp = '919346591460';
            const text = `Hello Ikat World,\nI would like to get in touch.\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.content}`;
            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/${adminWhatsApp}?text=${encodedText}`, '_blank');

            setTimeout(() => {
                setFormData({ name: '', email: '', content: '' });
            }, 500);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Contact Us</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>

                {/* Contact Info & Map */}
                <div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Get In Touch</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-maroon)' }}>
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Address</h4>
                                <p style={{ margin: 0, color: '#555' }}>IKKAT WORLD, Shop No.1&2, ground floor, handloom market, AKLB, Bhoodan Pochampally, Hyderabad, Telangana 508284</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-maroon)' }}>
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Phone</h4>
                                <p style={{ margin: 0, color: '#555' }}>+91 9346591460</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-maroon)' }}>
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Email</h4>
                                <p style={{ margin: 0, color: '#555' }}>info@ikkatworld.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-maroon)' }}>
                                <FaWhatsapp size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Business Hours</h4>
                                <p style={{ margin: 0, color: '#555' }}>Mon - Sat: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '300px', backgroundColor: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                        <iframe
                            title="IKKAT WORLD Location"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src="https://maps.google.com/maps?q=IKKAT+WORLD,+Shop+No.1%262,+ground+floor,+handloom+market,+AKLB,+Bhoodan+Pochampally,+Hyderabad,+Telangana+508284&t=&z=15&ie=UTF8&iwloc=&output=embed">
                        </iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Send a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name *</label>
                            <input type="text" required className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" required className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Message *</label>
                            <textarea required rows="6" className="form-control" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <p style={{ color: '#888' }}>Or connect directly via WhatsApp</p>
                        <a href="https://wa.me/919346591460" target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ width: '100%', marginTop: '10px' }}>
                            <FaWhatsapp size={18} style={{ marginRight: '8px' }} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
