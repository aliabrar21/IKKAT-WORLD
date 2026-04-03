import React, { useState, useEffect } from 'react';
import api from '../api';
import { getImageUrl } from '../utils/imageUtils';

const HeritageSettingsPage = () => {
    const [formData, setFormData] = useState({
        description1: '',
        description2: '',
        description3: '',
        estYear: '',
        estText: '',
        imageUrl: ''
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
            const { data } = await api.get('/settings/heritage_section');
            if (data) {
                setFormData(data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            let finalImageUrl = formData.imageUrl;

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);
                const uploadRes = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                finalImageUrl = uploadRes.data.url;
            }

            const dataToSave = { ...formData, imageUrl: finalImageUrl };

            await api.put('/settings/heritage_section', dataToSave);
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
            <h2>Our Heritage Section Settings</h2>
            {message && <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: message.includes('Failed') ? '#f8d7da' : '#d4edda', color: message.includes('Failed') ? '#721c24' : '#155724', borderRadius: '4px' }}>{message}</div>}
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Paragraph 1</label>
                    <textarea 
                        name="description1" 
                        value={formData.description1 || ''} 
                        onChange={handleChange} 
                        rows="4" 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                        placeholder="Preserving the timeless art of..."
                    />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Paragraph 2</label>
                    <textarea 
                        name="description2" 
                        value={formData.description2 || ''} 
                        onChange={handleChange} 
                        rows="4" 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Paragraph 3</label>
                    <textarea 
                        name="description3" 
                        value={formData.description3 || ''} 
                        onChange={handleChange} 
                        rows="4" 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Establishment Title (e.g. Est. 1995)</label>
                        <input 
                            type="text" 
                            name="estYear" 
                            value={formData.estYear || ''} 
                            onChange={handleChange} 
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Establishment Subtitle</label>
                        <input 
                            type="text" 
                            name="estText" 
                            value={formData.estText || ''} 
                            onChange={handleChange} 
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Side Image</label>
                    {formData.imageUrl && (
                        <div style={{ marginBottom: '10px' }}>
                            <img src={getImageUrl(formData.imageUrl)} alt="Current" style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <button type="submit" disabled={isSaving} style={{ padding: '12px 24px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '20px', alignSelf: 'flex-start', fontWeight: 'bold' }}>
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </div>
    );
};

export default HeritageSettingsPage;
