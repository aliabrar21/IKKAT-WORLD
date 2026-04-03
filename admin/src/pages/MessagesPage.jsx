import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaReply, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';

const MessagesPage = () => {
    const [messages, setMessages] = useState([
        { id: 'MSG-101', type: 'Custom Order', name: 'Priya Reddy', email: 'priya@example.com', date: '2026-03-14', subject: 'Royal Blue Silk Ikkat Saree', content: 'I am looking to get a royal blue silk ikkat saree woven with a wide gold zari border. The timeline is about 45 days. Is this possible?', isRead: false, isStarred: true },
        { id: 'MSG-102', type: 'Contact inquiry', name: 'Arun Kumar', email: 'arun.k@example.com', date: '2026-03-12', subject: 'Shipping to USA', content: 'Do you offer international shipping for your cotton ikkat collection? I want to order 5 pieces to New York.', isRead: true, isStarred: false },
        { id: 'MSG-103', type: 'Custom Order', name: 'Sneha Patel', email: 'sneha@example.com', date: '2026-03-10', subject: 'Custom Lehenga Design', content: 'Can I send you a reference image for an ikkat lehenga I want made?', isRead: true, isStarred: false },
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleViewMessage = (id) => {
        setMessages(messages.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
        const message = messages.find(m => m.id === id);
        setSelectedMessage({ ...message, isRead: true });
        setIsModalOpen(true);
    };

    const toggleStar = (id, e) => {
        e.stopPropagation();
        setMessages(messages.map(msg => msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg));
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (window.confirm('Delete this message permanently?')) {
            setMessages(messages.filter(msg => msg.id !== id));
        }
    };

    const handleSendReply = () => {
        console.log(`Sending reply to ${selectedMessage.email}: ${replyText}`);
        alert('Reply sent successfully!');
        setReplyText('');
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Inquiries & Messages</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <select style={{ padding: '8px 15px', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }}>
                        <option value="all">All Messages</option>
                        <option value="unread">Unread</option>
                        <option value="custom_order">Custom Orders</option>
                        <option value="starred">Starred</option>
                    </select>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {messages.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No messages found.</div>
                    ) : (
                        messages.map(msg => (
                            <div
                                key={msg.id}
                                onClick={() => handleViewMessage(msg.id)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '40px 180px 150px 1fr 100px 80px',
                                    gap: '15px',
                                    padding: '15px 20px',
                                    borderBottom: '1px solid #f0f0f0',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: msg.isRead ? '#ffffff' : '#f4f8fb',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = msg.isRead ? '#fafafa' : '#eaf2f8'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = msg.isRead ? '#ffffff' : '#f4f8fb'}
                            >
                                <div onClick={(e) => toggleStar(msg.id, e)} style={{ color: msg.isStarred ? '#ffc700' : '#d8d8ea', cursor: 'pointer' }}>
                                    {msg.isStarred ? <FaStar size={18} /> : <FaRegStar size={18} />}
                                </div>
                                <div style={{ fontWeight: msg.isRead ? 400 : 600, color: '#333' }}>{msg.name}</div>
                                <div>
                                    <span style={{
                                        backgroundColor: msg.type === 'Custom Order' ? '#e8fff3' : '#fff8dd',
                                        color: msg.type === 'Custom Order' ? '#50cd89' : '#ffc700',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 500
                                    }}>
                                        {msg.type}
                                    </span>
                                </div>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: msg.isRead ? '#666' : '#333',
                                    fontWeight: msg.isRead ? 400 : 500
                                }}>
                                    <span style={{ marginRight: '10px' }}>{msg.subject}</span>
                                    <span style={{ color: '#999', fontWeight: 400 }}>- {msg.content}</span>
                                </div>
                                <div style={{ color: '#888', fontSize: '0.85rem', textAlign: 'right' }}>{msg.date}</div>
                                <div style={{ textAlign: 'right' }}>
                                    <button onClick={(e) => handleDelete(msg.id, e)} style={{ background: 'transparent', border: 'none', color: '#d8d8ea', cursor: 'pointer', padding: '5px' }} title="Delete">
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isModalOpen && selectedMessage && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '650px', backgroundColor: '#fff', padding: '0', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', overflow: 'hidden' }}>

                        <div style={{ backgroundColor: '#f9fafb', padding: '20px 25px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500, color: '#333' }}>{selectedMessage.subject}</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{ backgroundColor: selectedMessage.type === 'Custom Order' ? '#e8fff3' : '#fff8dd', color: selectedMessage.type === 'Custom Order' ? '#50cd89' : '#ffc700', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>{selectedMessage.type}</span>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999', lineHeight: 1 }}>&times;</button>
                            </div>
                        </div>

                        <div style={{ padding: '25px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '45px', height: '45px', backgroundColor: '#e1e5ea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7e8299', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {selectedMessage.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500, fontSize: '1.05rem', color: '#333' }}>{selectedMessage.name}</div>
                                        <div style={{ color: '#009ef7', fontSize: '0.9rem' }}>&lt;{selectedMessage.email}&gt;</div>
                                    </div>
                                </div>
                                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                                    {selectedMessage.date}
                                </div>
                            </div>

                            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', color: '#444', lineHeight: '1.6', marginBottom: '25px', borderLeft: '3px solid #009ef7' }}>
                                {selectedMessage.content}
                            </div>

                            <div style={{ borderTop: '1px dashed #ddd', paddingTop: '20px' }}>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}><FaReply color="#009ef7" /> Reply Configuration</h4>
                                <textarea
                                    rows="5"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write your response here..."
                                    style={{ width: '100%', padding: '15px', borderRadius: '6px', border: '1px solid #ddd', resize: 'vertical', fontFamily: 'inherit', marginBottom: '15px' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <button onClick={() => setIsModalOpen(false)} className="btn" style={{ background: '#f5f8fa', color: '#5e6278' }}>Close</button>
                                    <button onClick={handleSendReply} className="btn btn-primary" disabled={!replyText.trim()}>Send Reply</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
