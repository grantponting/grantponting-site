import { useState } from 'react';
import DynamicForm from './DynamicForm';
import ErrorPopUp from './ErrorPopUp';

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
        } catch {
            setError('An error occurred while creating the user.');
        }
    };

    const inputs = [
        {
            label: 'Username:',
            type: 'text',
            placeholder: 'Enter username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true,
            controlId: 'formUsername'
        },
        {
            label: 'Email:',
            type: 'email',
            placeholder: 'Enter email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            controlId: 'formEmail'
        },
        {
            label: 'Password:',
            type: 'password',
            placeholder: 'Enter password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            controlId: 'formPassword'
        }
    ];

    return (
        <>
            <DynamicForm
                title="Create User"
                inputs={inputs}
                buttonText="Create User"
                onSubmit={handleSubmit}
                error={error}
            >
                {user &&
                    <ErrorPopUp errorMessage={user.email} errorTitle="User Created" variant='info' />
                }
            </DynamicForm>
        </>
    );
}

export default CreateUserForm;
