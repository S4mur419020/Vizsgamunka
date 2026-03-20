import React, { createContext, useState, useEffect } from 'react';
import { myAxios } from '.././services/api';
import useAuthContext from '../context/AuthContext';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
    const [termekek, setTermekek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ nem: "", marka: "" });
    const [cartItems, setCartItems] = useState([]);
    const [isApplied, setIsApplied] = useState(false);



    const { user } = useAuthContext();


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


    const fetchCartData = async () => {
        if (!user) return;
        try {
            const response = await myAxios.get('/api/kosar');
            const loggedInUserId = user.id || user.felhasznalo_id;

            // JAVÍTÁS: Ellenőrizzük, hogy tömb-e, vagy a data-n belül van-e a tömb
            const adatok = Array.isArray(response.data) ? response.data : response.data.kosar;

            if (adatok) {
                const myCart = adatok.filter(item => item.felhasznalo_id === loggedInUserId);
                setCartItems(myCart);
            }
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error("Hiba a kosár betöltésekor:", error);
            }
        }
    };


    useEffect(() => {
        if (user) {
            fetchCartData();
        } else {
            setCartItems([]);
            setIsApplied(false);
        }
    }, [user]);


    const szurtTermekek = termekek.filter(t => {
        const nemPasszol = filter.nem === "" || t.nem === filter.nem;
        const markaPasszol = filter.marka === "" || String(t.marka_id) === String(filter.marka);
        return nemPasszol && markaPasszol;
    });

    const updateCart = async (termekId, mennyisegValtozas, meret_id) => {
        try {
            const letezoTetel = cartItems.find(item =>
                item.termek_id === termekId && item.meret_id === meret_id
            );

            if (letezoTetel) {
                const ujMennyiseg = letezoTetel.mennyiseg + mennyisegValtozas;
                if (ujMennyiseg <= 0) {
                    await myAxios.delete(`/api/kosar/${letezoTetel.kosar_id}`);
                } else {
                    await myAxios.put(`/api/kosar/${letezoTetel.kosar_id}`, { mennyiseg: ujMennyiseg });
                }
            } else if (mennyisegValtozas > 0) {
                await myAxios.post('/api/kosar', {
                    termek_id: termekId,
                    mennyiseg: mennyisegValtozas,
                    meret_id: meret_id
                });
            }

            // JAVÍTÁS: Megvárjuk a frissítést!
            await fetchCartData();

        } catch (error) {
            console.error("Kosár módosítási hiba:", error);
        }
    };

    const finalizeOrder = async (orderData) => {
        try {
            const res = await myAxios.post('/api/rendelesek', orderData);
            if (res.status === 200 || res.status === 201) {
                setCartItems([]);
                setIsApplied(false);
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
            setCartItems,
            updateCart,
            isApplied,
            setIsApplied,
            finalizeOrder
        }}>
            {children}
        </ShoeContext.Provider>
    );
};