import React from 'react';
import { useState } from 'react';
import DynamicForm from './DynamicForm';
import ErrorPopUp from './ErrorPopUp';
import * as api from '../api-client/api';
import axiosInstance from '../utils/authorizedApi';

const UpdateUserForm = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const userApi = api.DefaultApiFactory(undefined, undefined, axiosInstance);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userSearchBody: api.PostUsersSearchRequest = {
                email: email
            }

            const usersRes = await userApi.postUsersSearch(userSearchBody);
            const users = usersRes.data;

            if (users.length === 0) {
                throw new Error(`No user found for "${email}"`);
            }
            const user = users[0];


            const putUserBody: api.PutUserByIdRequest = {
                username: username
            }
            await userApi.putUserById(user.id, putUserBody);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }


    };

    const inputs = [
        {
            label: 'Email of User to Update:',
            type: 'email',
            placeholder: 'Enter email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            controlId: 'formGroupEmail'
        },
        {
            label: 'New Username:',
            type: 'text',
            placeholder: 'Enter username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true,
            controlId: 'formUsername'
        },
    ];

    return (
        <DynamicForm
            title="Update User"
            inputs={inputs}
            buttonText="Update"
            onSubmit={handleSubmit}
            error={error}
        >
            {loading &&
                <ErrorPopUp errorMessage='' errorTitle="Updating..." variant='info' />
            }

        </DynamicForm>
    );
};

export default UpdateUserForm;