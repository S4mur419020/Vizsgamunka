import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const checkUserStatus = useCallback(async () => {
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
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Nem sikerült azonosítani");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    
    useEffect(() => {
        checkUserStatus();
    }, [checkUserStatus]);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                
                await checkUserStatus();
                return { success: true };
            }
            return { success: false, message: data.message || 'Hibás belépési adatok!' };
        } catch (error) {
            return { success: false, message: 'Hálózati hiba a bejelentkezés során!' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:8000/api/regisztracio', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                
                await checkUserStatus();
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message || 'Hiba a regisztráció során!' };
        } catch (error) {
            return { success: false, message: 'Hálózati hiba a regisztráció során!' };
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout'); 
        } catch (error) {
            console.error("Logout hiba:", error);
        } finally {
            
            setUser(null);
            localStorage.removeItem('user'); 
            window.location.href = '/'; 
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, checkUserStatus }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);