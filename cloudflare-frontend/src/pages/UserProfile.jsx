import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api-client/api';
import axiosInstance from '../utils/authorizedApi';

// Note: Axios Instance needs to be updated for authorized calls
const userApi = api.DefaultApiFactory(undefined, undefined, axiosInstance);

const UserProfile = () => {
    // Get the user id from the URL parameters
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to fetch user data from the API
        const fetchUser = async () => {
            try {
                if (!id) throw new Error("Missing user ID from URL");

                const response = await userApi.getUserById(id);

                const data = response.data;
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, [id]);

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
