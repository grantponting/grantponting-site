import React from 'react';
import { useState } from 'react';
import DynamicForm from './DynamicForm';
import ErrorPopUp from './ErrorPopUp';
import * as api from '../api-client/api';
import { useAuth } from '../contexts/authContext';

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const userApi = api.DefaultApiFactory();
    const { user, login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const body: api.PostUserRequest = {
                username: username,
                password: password,
                email: email
            }

            const response = await userApi.postUser(body);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }

            try {
                await login({ email: email, password: password })
            } catch {
                setError('Failed to login');
            }
        } catch(err) {
            console.error(err);
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
