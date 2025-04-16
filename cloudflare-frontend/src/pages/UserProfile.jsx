import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api-client/api';
import axiosInstance from '../utils/authorizedApi';


const UserProfile = () => {
    // Note: Axios Instance needs to be updated for authorized calls
    const userApi = api.DefaultApiFactory(undefined, undefined, axiosInstance);

    // Get the user id from the URL parameters
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to fetch user data from the API
        const fetchUser = async () => {
            try {
                // Update with your API URL as needed
                const response = await userApi.getUserById(id);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, [id, userApi]);

    if (error) return <div>Error: {error}</div>;
    if (!userData) return <div>Loading user data...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{userData.username}s Profile</h1>
            <p>Email: {userData.email}</p>
            {/* Display additional user information as needed */}
        </div>
    );
};

export default UserProfile;
