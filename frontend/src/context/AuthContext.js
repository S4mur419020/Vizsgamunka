import React, { createContext, useState, useContext, useEffect } from 'react';
import { myAxios } from "../services/api"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

    const getUser = async () => {
        try {
            const { data } = await myAxios.get('/api/user');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loginReg = async (adat, vegpont) => {
    setErrors({});
    try {
       
        await csrf(); 

        
        await myAxios.post(vegpont, adat);

        await getUser();
        window.location.href = '/';
    } catch (error) {
        if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors);
        }
        console.error("Login hiba:", error.response);
    }
};

    const logout = async () => {
        try {
            
            await csrf();
            await myAxios.post('/api/logout');
        } catch (error) {
            console.error("Logout hiba:", error);
        } finally {
            
            setUser(null);
            setErrors({});
            window.location.href = '/login';
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, errors, loginReg, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
}