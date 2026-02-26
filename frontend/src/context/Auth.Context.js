import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedName = localStorage.getItem("userName");
        if (savedName) {
            setUser({ name: savedName });
            setIsLoggedIn(true);
        }
    }, []);

    const login = (email) => {
        const name = email.split("@")[0];
        localStorage.setItem("userName", name);
        setUser({ name: name });
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("userName");
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};