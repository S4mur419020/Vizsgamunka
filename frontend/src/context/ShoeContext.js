import React, { createContext, useState, useEffect } from 'react';
import { myAxios } from '.././services/api';
import useAuthContext from './AuthContext';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [termekek, setTermekek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ nem: "", marka: "" });
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        myAxios.get('/api/termekek')
            .then(res => {
                setTermekek(res.data);
                setLoading(false);
            })
            .catch(err => console.error("Termék hiba:", err));
    }, []);

    useEffect(() => {
        if (user) {
            myAxios.get('/api/kosar')
                .then(res => setCartItems(res.data))
                .catch(err => {
                    if (err.response?.status === 401) {
                        setCartItems([]);
                    }
                });
        } else {
            setCartItems([]);
        }
    }, [user]);

    const szurtTermekek = termekek.filter(t => {
        const nemPasszol = filter.nem === "" || t.nem === filter.nem;
        const markaPasszol = filter.marka === "" || String(t.marka_id) === String(filter.marka);
        return nemPasszol && markaPasszol;
    });

    const updateCart = async (termekId, mennyiseg) => {
        try {
            const res = await myAxios.post('/api/kosar', { termek_id: termekId, mennyiseg: mennyiseg });
            setCartItems(res.data);
        } catch (error) {
            console.error("Kosár hiba:", error);
        }
    };

    const finalizeOrder = async (orderData) => {
        try {
            const res = await myAxios.post('/api/rendelesek', orderData);
            if (res.status === 200 || res.status === 201) {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Rendelés hiba:", error);
        }
    };

    return (
        <ShoeContext.Provider value={{
            user,
            termekek,
            szurtTermekek,
            loading,
            filter,
            setFilter,
            cartItems,
            updateCart,
            finalizeOrder
        }}>
            {children}
        </ShoeContext.Provider>
    );
};