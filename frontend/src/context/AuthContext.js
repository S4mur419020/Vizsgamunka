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
        console.log("Küldés indítása ide:", vegpont); 
        console.log("Adatok:", adat);
        setErrors({});
        try {
            await csrf();
            console.log("CSRF OK, jöhet a POST");
            const response = await myAxios.post(vegpont, adat);
            console.log("Válasz a szervertől:", response);
            await getUser();
            return true;
        } catch (error) {
            console.error("Hiba történt a híváskor:", error.response || error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
            return false;
        }
    };

    const logout = async () => {
        setUser(null);
        setErrors({});
        try {
            await myAxios.post('/api/logout');
        } catch (error) {
            console.warn("Szerveroldali kijelentkezés már megtörtént vagy hiba lépett fel.");
        } finally {
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