import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const SupportTicketForm = () => {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('low');
    const [type, setType] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!topic || !description || !type) {
            setError('All fields are required');
            return false;
        }

        if (!['low', 'medium', 'high'].includes(severity)) {
            setError('Invalid severity level');
            return false;
        }

        setError('');
        return true;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3001/api/support-tickets', {
                    topic,
                    description,
                    severity,
                    type,
                });

                console.log('Support Ticket Created:', response.data);
                window.location.reload();
            } catch (error) {
                console.error('Error creating Support Ticket:', error);
            }
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Create Support Ticket</h1>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Topic<span style={{ color: 'red' }}>*</span>
                        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                    </label>
                    <label>
                        Description<span style={{ color: 'red' }}>*</span>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Severity<span style={{ color: 'red' }}>*</span>
                        <select value={severity} onChange={(e) => setSeverity(e.target.value)} style={{ fontSize: '16px' }}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                    <label>
                        Type<span style={{ color: 'red' }}>*</span>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                    </label>
                    {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Create Support Ticket</button>
                </form>
            </div>
        </div>
    );
};

export default SupportTicketForm;
