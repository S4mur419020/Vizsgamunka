import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    method: 'GET',
                    
                    credentials: 'include', 
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Nem sikerült azonosítani");
            } finally {
                setLoading(false);
            }
        };
        checkUserStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                credentials: 'include', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setUser(data.user);
                return { success: true };
            }
            return { success: false, message: data.message || 'Hiba!' };
        } catch (error) {
            return { success: false, message: 'Hiba!' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:8000/api/regisztracio', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            return { success: response.ok && data.success, message: data.message };
        } catch (error) {
            return { success: false, message: 'Hiba!' };
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8000/api/logout', { 
                method: 'POST',
                credentials: 'include' 
            });
            setUser(null);
        } catch (error) {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);