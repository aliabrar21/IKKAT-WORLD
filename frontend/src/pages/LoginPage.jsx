import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await api.post('/auth/login', formData);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const { data } = await api.post('/auth/verify-login', { email: formData.email, otp });
            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.role === 'ADMIN') {
                // Admin dashboard typically runs on 5173 in dev
                window.location.href = 'http://localhost:5173';
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setError('');
            await api.post('/auth/resend-otp', { email: formData.email, type: 'LOGIN' });
            alert('A new OTP has been sent to your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP');
        }
    };

    return (
        <div className="container" style={{ padding: '80px 20px', maxWidth: '450px' }}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                {step === 1 ? (
                    <>
                        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Welcome Back</h1>
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Login to your account to continue</p>

                        {error && <div style={{ background: '#fff0f4', color: '#f1416c', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={isSubmitting}>
                                {isSubmitting ? 'Verifying...' : 'Sign In'}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                            Don't have an account? <Link to="/signup" style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>Sign up</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Verify OTP</h1>
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                            We have sent a 6-digit verification code to <strong>{formData.email}</strong>
                        </p>

                        {error && <div style={{ background: '#fff0f4', color: '#f1416c', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

                        <form onSubmit={handleOtpSubmit}>
                            <div className="form-group" style={{ marginBottom: '20px', textAlign: 'center' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    maxLength="6"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    style={{ width: '60%', padding: '15px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '5px' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginBottom: '15px' }} disabled={isSubmitting || otp.length !== 6}>
                                {isSubmitting ? 'Verifying...' : 'Verify & Login'}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', color: '#666', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                                Didn't receive code?{' '}
                                <button onClick={handleResendOtp} style={{ background: 'none', border: 'none', color: 'var(--color-maroon)', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                                    Resend OTP
                                </button>
                            </div>
                            <div>
                                <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#888', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
