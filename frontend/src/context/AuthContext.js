import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setUser(data.user);
                return { success: true };
            }
            return { success: false, message: data.message || 'Hibás adatok!' };
        } catch (error) {
            return { success: false, message: 'A szerver nem elérhető!' };
        }
    };

    
    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:8000/api/regisztracio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                
                return { success: true };
            }
            return { success: false, message: data.message || 'Regisztrációs hiba!' };
        } catch (error) {
            return { success: false, message: 'A szerver nem elérhető!' };
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);