import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const SupportAgentForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!name || !email || !phone || !description) {
            setError('All fields are required');
            return false;
        }

        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return false;
        }

        if (!phoneRegex.test(phone)) {
            setError('Invalid phone number (10 digits only)');
            return false;
        }

        return true;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3001/api/support-agents', {
                    name,
                    email,
                    phone,
                    description,
                });

                setSuccessMessage('Support Agent created successfully');
                setError('');
                console.log('Support Agent Created:', response.data);
                // You may want to handle the success message display duration or reset it after a certain time

                window.location.reload();
            } catch (error) {
                setError('Error creating Support Agent');
                setSuccessMessage('');
                console.error('Error creating Support Agent:', error);
            }
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Create Support Agent</h1>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Name<span style={{ color: 'red' }}>*</span>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Email<span style={{ color: 'red' }}>*</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Phone<span style={{ color: 'red' }}>*</span>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </label>
                    <label>
                        Description<span style={{ color: 'red' }}>*</span>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <button type="submit">Create Support Agent</button>
                </form>
            </div>
        </div>
    );
};

export default SupportAgentForm;
