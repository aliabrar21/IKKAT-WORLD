import React, { useState, useEffect } from 'react';
import api from '../api';

const HomeSettingsPage = () => {
    const [formData, setFormData] = useState({
        heroImageUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await api.get('/settings/home_page');
            if (data) {
                setFormData(data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            let finalImageUrl = formData.heroImageUrl;

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);
                const uploadRes = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                finalImageUrl = uploadRes.data.url;
            }

            const dataToSave = { ...formData, heroImageUrl: finalImageUrl };

            await api.put('/settings/home_page', dataToSave);
            setMessage('Settings saved successfully!');
            setFormData(dataToSave);
            setImageFile(null);
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage('Failed to save settings.');
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (isLoading) return <div>Loading settings...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
            <h2>Home Page Settings</h2>
            {message && <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: message.includes('Failed') ? '#f8d7da' : '#d4edda', color: message.includes('Failed') ? '#721c24' : '#155724', borderRadius: '4px' }}>{message}</div>}
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hero Background Image</label>
                    {formData.heroImageUrl && (
                        <div style={{ marginBottom: '10px' }}>
                            <img src={formData.heroImageUrl} alt="Current Background" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <button type="submit" disabled={isSaving} style={{ padding: '12px 24px', backgroundColor: 'var(--primary-color, #1a1a1a)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '20px', alignSelf: 'flex-start', fontWeight: 'bold' }}>
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </div>
    );
};

export default HomeSettingsPage;
