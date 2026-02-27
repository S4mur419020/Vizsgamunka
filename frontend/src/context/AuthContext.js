import React, { createContext, useState, useContext, useEffect } from 'react';
import { myAxios } from "../services/api"; // A te saját api.js fájlod

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
        await csrf(); 
        try {
            await myAxios.post(vegpont, adat);
            await getUser(); 
            
            return true; 
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            return false;
        }
    };

    const logout = async () => {
        try {
            await myAxios.post('/logout');
            setUser(null);
        } catch (error) {
            setUser(null);
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