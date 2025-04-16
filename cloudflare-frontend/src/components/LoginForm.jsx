import { useState } from 'react';
import DynamicForm from './DynamicForm';
import ErrorPopUp from './ErrorPopUp';
import { useAuth } from '../contexts/authContext';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email: email, password: password })
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
        >
            {user &&
                <ErrorPopUp errorMessage={user.email} errorTitle="Logged in Successfully" variant='info' />
            }
        </DynamicForm>
    );
};

export default LoginForm;