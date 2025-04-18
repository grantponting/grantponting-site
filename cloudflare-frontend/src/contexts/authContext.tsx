import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as api from '../api-client/api';
import axiosInstance from '../utils/authorizedApi';


interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    checkLoggedIn: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const tokenApi = api.DefaultApiFactory();
const userApi = api.DefaultApiFactory(undefined, undefined, axiosInstance);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const body: api.PostLoginRequest = {
                email: credentials.email,
                password: credentials.password
            }
            const response = await tokenApi.postLogin(body);

            if (response.status !== 200) {
                throw new Error('Invalid credentials');
            }

            const data = JSON.parse(response.request.response);
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            setUser({ id: data.user.id, email: data.user.email });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const checkLoggedIn = async (): Promise<boolean> => {
        let isLoggedIn = false;
        try {
            const response = await userApi.getProfile();
            let data = JSON.parse(response.request.response);
            setUser({ id: data.id, email: data.email });
            isLoggedIn = true;
        } catch (error) {
            console.error('There was an error fetching the items!', error);
        }
        return isLoggedIn;
    }

    const logout = () => {
        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
        setUser(null);
    };

    useEffect(() => {
        checkLoggedIn().finally(() => setIsLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, checkLoggedIn }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
