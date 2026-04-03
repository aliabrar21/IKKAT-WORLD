import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
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
                role: 'USER'
            };

            await api.post('/auth/register', payload);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register account');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const { data } = await api.post('/auth/verify-signup', { email: formData.email, otp });
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('Account verified successfully!');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setError('');
            await api.post('/auth/resend-otp', { email: formData.email, type: 'SIGNUP' });
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
                        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Create Account</h1>
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Join us to track orders and save favorites</p>

                        {error && <div style={{ background: '#fff0f4', color: '#f1416c', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

                        <form onSubmit={handleSignupSubmit}>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
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
                            <div className="form-group" style={{ marginBottom: '20px' }}>
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
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={isSubmitting}>
                                {isSubmitting ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>Sign in</Link>
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
                                {isSubmitting ? 'Verifying...' : 'Verify & Setup Account'}
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

export default SignupPage;
