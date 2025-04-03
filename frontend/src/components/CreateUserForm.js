import React, { useState } from 'react';

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setUser(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Error creating user.');
            } else {
                setUser(data);
            }
        } catch (err) {
            setError('An error occurred while creating the user.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
            <h2>Create User</h2>
            {user && (
                <div style={{ marginBottom: '1rem' }}>
                    <h3>User Created: {user.username}</h3>
                    <p>Email: {user.email}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem' }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem' }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem' }}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUserForm;
