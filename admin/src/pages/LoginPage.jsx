import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const { data } = await api.post('/auth/login', formData);

            if (data.role !== 'ADMIN') {
                setError('Access denied: Admin privileges required');
                return;
            }

            localStorage.setItem('adminInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f8fa' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '1.8rem', color: '#181c32', marginBottom: '10px' }}>Admin Login</h1>
                    <p style={{ color: '#a1a5b7' }}>Sign in to manage Pochampally Ikkat World</p>
                </div>

                {error && <div style={{ background: '#fff5f8', color: '#f1416c', padding: '15px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', border: '1px dashed #f1416c' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#3f4254', fontWeight: 500 }}>Email Address</label>
                        <input
                            type="email"
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #e4e6ef', borderRadius: '6px', backgroundColor: '#f5f8fa', color: '#5e6278', outline: 'none' }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ color: '#3f4254', fontWeight: 500 }}>Password</label>
                        </div>
                        <input
                            type="password"
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #e4e6ef', borderRadius: '6px', backgroundColor: '#f5f8fa', color: '#5e6278', outline: 'none' }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Verifying...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
