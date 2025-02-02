import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';


interface AuthContextType {
    isAuthenticated: boolean;
    username: string;
    token: string | null;
    loading: boolean;
    login: (token: string, user: string,isAdmin: boolean) => void;
    logout: () => Promise<void>;
    isAdmin: boolean;
}

interface AuthState {
    isAuthenticated: boolean;
    username: string ;
    token: string | null;
    loading: boolean;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isAdmin: false,
    username: '',
    token: null,
    loading: false,
    login: () => {},
    logout: async () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        username: '',
        token: null,
        loading: true,
        isAdmin: false
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token){
                router.push('/')
            }
            // if (token) {
            //     const response = await fetch(`${BASE_URL}/api/auth/verify`, {
            //         headers: {
            //             'Authorization': `Bearer ${token}`
            //         }
            //     });
            //
            //     if (response.ok) {
            //         const data = await response.json();
            //         setAuth(prev => ({
            //             ...prev,
            //             isAuthenticated: true,
            //             user: data.user,
            //             token,
            //             loading: false
            //         }));
            //     } else {
            //         throw new Error('Invalid token');
            //     }
            // } else {
            //     router.push('/');
            //     setAuth(prev => ({
            //         ...prev,
            //         loading: false
            //     }));
            // }
        } catch (error) {
            console.error('Auth Check Error:', error);
            localStorage.removeItem('token');
            setAuth({
                isAuthenticated: false,
                username: '',
                token: null,
                loading: false,
                isAdmin: false
            });
        }
    };

    const login = (token: string, username: string,isAdmin: boolean) => {
        localStorage.setItem('user', username);
        setAuth({
            isAuthenticated: true,
            username,
            token,
            loading: false,
            isAdmin
        });
    };

    const logout = async (): Promise<void> => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setAuth({
            isAuthenticated: false,
            username: '',
            token: null,
            loading: false,
            isAdmin: false
        });
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};