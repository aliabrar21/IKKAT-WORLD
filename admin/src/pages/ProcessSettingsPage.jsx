import React, { useState, useEffect } from 'react';
import api from '../api';

const ProcessSettingsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        intro: { p1: '', p2: '', p3: '' },
        steps: Array(6).fill({ title: '', desc: '' }),
        timeline: Array(4).fill({ year: '', title: '', desc: '' }),
        artisans: { p1: '', p2: '', quote: '', quoteAuthor: '', image: '' }
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/settings/process_page');
                if (response.data) {
                    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                    setFormData({
                        intro: data.intro || { p1: '', p2: '', p3: '' },
                        steps: data.steps && data.steps.length === 6 ? data.steps : Array(6).fill({ title: '', desc: '' }),
                        timeline: data.timeline && data.timeline.length === 4 ? data.timeline : Array(4).fill({ year: '', title: '', desc: '' }),
                        // Handle transition from old data (images array) to single image string
                        artisans: { 
                            ...data.artisans, 
                            image: data.artisans?.image || (data.artisans?.images && data.artisans.images[0]) || '' 
                        } || { p1: '', p2: '', quote: '', quoteAuthor: '', image: '' }
                    });
                }
            } catch (err) {
                console.error("Error fetching process settings", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (section, index, field, value) => {
        setFormData(prev => {
            const newData = { ...prev };
            if (section === 'intro') {
                newData.intro[field] = value;
            } else if (section === 'steps') {
                newData.steps[index] = { ...newData.steps[index], [field]: value };
            } else if (section === 'timeline') {
                newData.timeline[index] = { ...newData.timeline[index], [field]: value };
            } else if (section === 'artisans') {
                newData.artisans[field] = value;
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            let finalImage = formData.artisans.image;
            
            // Upload changed image
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);
                const uploadRes = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                finalImage = uploadRes.data.url;
            }

            const dataToSave = {
                ...formData,
                artisans: { ...formData.artisans, image: finalImage }
            };

            await api.put('/settings/process_page', dataToSave);
            setMessage('Settings saved successfully!');
            setFormData(dataToSave); 
            setImageFile(null);
        } catch (error) {
            console.error(error);
            setMessage('Failed to save settings.');
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '15px' };
    const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };
    const sectionStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' };

    return (
        <div className="main-content">
            <h1 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>Our Process Page Settings</h1>
            
            {message && (
                <div style={{ padding: '15px', marginBottom: '20px', backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da', color: message.includes('success') ? '#155724' : '#721c24', borderRadius: '4px' }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Intro Section */}
                <div style={sectionStyle}>
                    <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>1. Introduction (A Timeless Tradition)</h2>
                    <label style={labelStyle}>Paragraph 1</label>
                    <textarea style={{...inputStyle, height: '80px'}} value={formData.intro.p1} onChange={(e) => handleChange('intro', null, 'p1', e.target.value)} />
                    <label style={labelStyle}>Paragraph 2</label>
                    <textarea style={{...inputStyle, height: '80px'}} value={formData.intro.p2} onChange={(e) => handleChange('intro', null, 'p2', e.target.value)} />
                    <label style={labelStyle}>Paragraph 3</label>
                    <textarea style={{...inputStyle, height: '80px'}} value={formData.intro.p3} onChange={(e) => handleChange('intro', null, 'p3', e.target.value)} />
                </div>

                {/* Steps Section */}
                <div style={sectionStyle}>
                    <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>2. Process Steps</h2>
                    {formData.steps.map((step, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Step {index + 1}</h3>
                            <label style={labelStyle}>Title</label>
                            <input type="text" style={inputStyle} value={step.title} onChange={(e) => handleChange('steps', index, 'title', e.target.value)} />
                            <label style={labelStyle}>Description</label>
                            <textarea style={{...inputStyle, height: '60px'}} value={step.desc} onChange={(e) => handleChange('steps', index, 'desc', e.target.value)} />
                        </div>
                    ))}
                </div>

                {/* Timeline Section */}
                <div style={sectionStyle}>
                    <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>3. History Timeline (Our Heritage)</h2>
                    {formData.timeline.map((item, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Milestone {index + 1}</h3>
                            <label style={labelStyle}>Year</label>
                            <input type="text" style={inputStyle} value={item.year} onChange={(e) => handleChange('timeline', index, 'year', e.target.value)} />
                            <label style={labelStyle}>Title</label>
                            <input type="text" style={inputStyle} value={item.title} onChange={(e) => handleChange('timeline', index, 'title', e.target.value)} />
                            <label style={labelStyle}>Description</label>
                            <input type="text" style={inputStyle} value={item.desc} onChange={(e) => handleChange('timeline', index, 'desc', e.target.value)} />
                        </div>
                    ))}
                </div>

                {/* Artisans Section */}
                <div style={sectionStyle}>
                    <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>4. Meet Our Artisans</h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ padding: '15px', border: '1px dashed #ccc', borderRadius: '4px', maxWidth: '400px' }}>
                            <label style={labelStyle}>Artisan Image</label>
                            {formData.artisans.image && (
                                <img src={formData.artisans.image} alt="Artisan" style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px', borderRadius: '4px' }} />
                            )}
                            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                        </div>
                    </div>

                    <label style={labelStyle}>Paragraph 1</label>
                    <textarea style={{...inputStyle, height: '80px'}} value={formData.artisans.p1} onChange={(e) => handleChange('artisans', null, 'p1', e.target.value)} />
                    <label style={labelStyle}>Paragraph 2</label>
                    <textarea style={{...inputStyle, height: '80px'}} value={formData.artisans.p2} onChange={(e) => handleChange('artisans', null, 'p2', e.target.value)} />
                    <label style={labelStyle}>Quote Text</label>
                    <textarea style={{...inputStyle, height: '60px'}} value={formData.artisans.quote} onChange={(e) => handleChange('artisans', null, 'quote', e.target.value)} />
                    <label style={labelStyle}>Quote Author</label>
                    <input type="text" style={inputStyle} value={formData.artisans.quoteAuthor} onChange={(e) => handleChange('artisans', null, 'quoteAuthor', e.target.value)} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '50px' }}>
                    <button type="submit" disabled={isSaving} style={{ padding: '15px 30px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {isSaving ? 'Saving...' : 'Save All Process Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProcessSettingsPage;
