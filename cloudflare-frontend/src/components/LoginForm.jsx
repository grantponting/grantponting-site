import { useState } from 'react';
import DynamicForm from './DynamicForm';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const [setUser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // setUser(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
            } else {
                // setUser(data.user || data);
            }
        } catch {
            setError('Failed to login');
        }
    };

    const inputs = [
        {
            label: 'Email Address:',
            type: 'email',
            placeholder: 'Enter email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            controlId: 'formGroupEmail'
        },
        {
            label: 'Password:',
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            controlId: 'formGroupPassword'
        }
    ];

    return (
        <DynamicForm
            title="Login"
            inputs={inputs}
            buttonText="Login"
            onSubmit={handleSubmit}
            error={error}
        />
    );
};

export default LoginForm;