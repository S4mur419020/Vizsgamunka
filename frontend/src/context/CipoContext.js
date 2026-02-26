import React, { createContext, useState, useEffect } from 'react';

export const CipoContext = createContext();

export const CipoProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
        setOrders(JSON.parse(localStorage.getItem('orders')) || []);
    }, []);

    const updateCart = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const finalizeOrder = (order) => {
        const updatedOrders = [...orders, order];
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        updateCart([]); 
    };

    return (
        <CipoContext.Provider value={{ cartItems, updateCart, orders, finalizeOrder }}>
            {children}
        </CipoContext.Provider>
    );
};