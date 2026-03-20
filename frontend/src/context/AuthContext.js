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
            const profileRes = await myAxios.get('/api/profile');
            setUser({ ...data, ...profileRes.data });
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loginReg = async (adat, vegpont, navigate) => {
        setErrors({});
        try {
            await csrf();
            const { data } = await myAxios.post(vegpont, adat);
            const loggedInUser = data.user;
            setUser(loggedInUser);

            if (loggedInUser.role_id === 1) {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            }

            return true;
        } catch (error) {
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
        } catch { }
        finally {
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