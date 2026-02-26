import React, { createContext, useState, useEffect } from 'react';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
    const [termekek, setTermekek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ nem: "", marka: "" });
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const initData = async () => {
            try {
                const [resTermekek, resKosar] = await Promise.all([
                    fetch('http://localhost:8000/api/termekek'),
                    fetch('http://localhost:8000/api/kosar')
                ]);

                const termekAdat = await resTermekek.json();
                const kosarAdat = await resKosar.json();
                console.log("Betölti a termékeket:", termekAdat)
                setTermekek(termekAdat);
                setCartItems(kosarAdat);
                setLoading(false);
            } catch (error) {
                console.error("Adatbetöltési hiba:", error);
                setLoading(false);
            }
        };
        initData();
    }, []);

    const szurtTermekek = termekek.filter(t => {
        const nemPasszol = filter.nem === "" || t.nem === filter.nem;
        const markaPasszol = filter.marka === "" || String(t.marka_id) === String(filter.marka);
        
        return nemPasszol && markaPasszol;
    });

    const updateCart = async (termekId, mennyiseg) => {
        try {
            const res = await fetch('http://localhost:8000/api/kosar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ termek_id: termekId, mennyiseg: mennyiseg })
            });
            const frissitettKosar = await res.json();
            setCartItems(frissitettKosar);
        } catch (error) {
            console.error("Kosár hiba:", error);
        }
    };

    const finalizeOrder = async (orderData) => {
        try {
            const res = await fetch('http://localhost:8000/api/rendelesek', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            if (res.ok) {
                setCartItems([]); 
            }
        } catch (error) {
            console.error("Rendelés hiba:", error);
        }
    };

    return (
        <ShoeContext.Provider value={{ 
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