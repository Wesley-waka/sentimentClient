'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Define interfaces for better type safety
interface Credentials {
    name: string;
    password: string;
}

interface SignUpCredentials {
    name: string;
    password: string;
    role: string;
}

// interface UserInfo {
//     id: string;
//     email: string;
//     // Add other user info fields as needed
// }

interface LoginResponse {
    isAdmin: boolean;
    token: string;
    username: string;
    msg?: string;
}

interface AuthContextType {
    login: (token: string, user: string, isAdmin: boolean) => void;
    isAuthenticated: false,
    username: string,
    token: null,
    loading: false,
    isAdmin: false,
}

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { login: contextLogin } = useContext(AuthContext) as AuthContextType;

    const login = async (credentials: Credentials): Promise<boolean> => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const responseData: LoginResponse = await response.json();
            console.log('Login Response:', responseData);

            if (!response.ok) {
                throw new Error(responseData.msg || 'Login failed');
            }

            if (responseData?.token) {
                contextLogin(responseData.token, responseData.username, responseData.isAdmin);
                if (!responseData.isAdmin) {
                    router.push('/user');
                } else {
                    router.push('/admin');
                }
                return true;
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (credentials: SignUpCredentials): Promise<boolean> => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const responseData: LoginResponse = await response.json();
            console.log('Login Response:', responseData);



            if (response.ok) {
                router.push('/');
                return true

            } else {
                throw new Error(responseData.msg || 'Login failed');

            }
        } catch (error) {
            console.error('Login Error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // const logOut = async (): Promise<void> => {
    //     try {
    //         setLoading(true);
    //         // Optional: Call logout endpoint if you need to invalidate the token on the server
    //         // await fetch(`${BASE_URL}/api/auth/logout`, {
    //         //     method: 'POST',
    //         //     headers: {
    //         //         'Content-Type': 'application/json',
    //         //     }
    //         // });
    //
    //         // Call the context logout function to clear the auth state
    //
    //         // Redirect to home page
    //         router.push('/');
    //     } catch (error) {
    //         console.error('Logout Error:', error);
    //         setError(error instanceof Error ? error.message : 'Something went wrong during logout');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    return {
        login,
        loading,
        error,
        signUp,
    };
};