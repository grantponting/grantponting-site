import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    // Get the user id from the URL parameters
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to fetch user data from the API
        const fetchUser = async () => {
            try {
                // Update with your API URL as needed
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, [id]);

    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Loading user data...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{user.username}'s Profile</h1>
            <p>Email: {user.email}</p>
            {/* Display additional user information as needed */}
        </div>
    );
};

export default UserProfile;
