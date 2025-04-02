import React from 'react';
import LoginForm from '../components/LoginForm';
import CreateUserForm from '../components/CreateUserForm';
import NavigateToProfile from '../components/NavigateToProfile';

function Login() {
    return (
        <div>
            <h1>My Auth App</h1>
            <CreateUserForm />
            <LoginForm />
            <NavigateToProfile />
        </div>
    );
}

export default Login;