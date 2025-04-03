import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateToProfile = () => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId.trim()) {
            // Navigate to the profile page for the given user id.
            navigate(`/profile/${userId}`);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
            <h2>Go to Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    View Profile
                </button>
            </form>
        </div>
    );
};

export default NavigateToProfile;
