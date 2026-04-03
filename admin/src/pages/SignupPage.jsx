import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setIsSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'ADMIN' // Admin registrations force ADMIN role via the backend tweaks
            };

            const { data } = await api.post('/auth/register', payload);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register admin account');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f8fa', padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '1.8rem', color: '#181c32', marginBottom: '10px' }}>Create Admin Account</h1>
                    <p style={{ color: '#a1a5b7' }}>Register as a new manager</p>
                </div>

                {error && <div style={{ background: '#fff5f8', color: '#f1416c', padding: '15px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', border: '1px dashed #f1416c' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#3f4254', fontWeight: 500 }}>Full Name</label>
                        <input
                            type="text"
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #e4e6ef', borderRadius: '6px', backgroundColor: '#f5f8fa', color: '#5e6278', outline: 'none' }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
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
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#3f4254', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #e4e6ef', borderRadius: '6px', backgroundColor: '#f5f8fa', color: '#5e6278', outline: 'none' }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#3f4254', fontWeight: 500 }}>Confirm Password</label>
                        <input
                            type="password"
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #e4e6ef', borderRadius: '6px', backgroundColor: '#f5f8fa', color: '#5e6278', outline: 'none' }}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Account'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link to="/login" style={{ color: '#009ef7', fontWeight: 500, textDecoration: 'none' }}>Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
