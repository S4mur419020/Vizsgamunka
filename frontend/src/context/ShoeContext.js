import React, { createContext, useState, useEffect } from 'react';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
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
        <ShoeContext.Provider value={{ cartItems, updateCart, orders, finalizeOrder }}>
            {children}
        </ShoeContext.Provider>
    );
};