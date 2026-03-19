import React, { createContext, useState, useEffect } from 'react';
import { myAxios } from '.././services/api';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
    const [termekek, setTermekek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ nem: "", marka: "" });
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchTermekek = async () => {
            try {
                const res = await myAxios.get('/api/termekek');
                setTermekek(res.data);
            } catch (error) {
                console.error("Termék betöltési hiba:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTermekek();
    }, []);

    useEffect(() => {
        const fetchPrivateData = async () => {
            if (user) { 
                try {
                    const resKosar = await myAxios.get('/api/kosar');
                    setCartItems(resKosar.data);
                } catch (error) {
                    if (error.response?.status !== 401) {
                        console.error("Kosár betöltési hiba:", error);
                    }
                }
            } else {
                setCartItems([]);
            }
        };

        fetchPrivateData();
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
            setUser,
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