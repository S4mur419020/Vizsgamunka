import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductListPage() {
    const [termekek, setTermekek] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Kérés küldése...");
        axios.get('http://localhost:8000/api/termekek', { withCredentials: true })
            .then(response => {
                console.log("Adatok megérkeztek:", response.data);
                setTermekek(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Hiba a termékek betöltésekor:", error);
                setLoading(false);
            });
    }, []);

    const addToCart = (termek) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.cikkszam === termek.cikkszam);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...termek, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${termek.nev} bekerült a kosárba!`);
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Termékek betöltése...</div>;

    return (
        <div className="product-list-container" style={{ padding: '20px' }}>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Cipőink</h1>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '20px', 
                marginTop: '30px' 
            }}>
                {termekek.map(termek => (
                    <div key={termek.cikkszam} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', color: 'white', border: '1px solid #333', textAlign: 'center' }}>
                        <img src={termek.kep || 'https://via.placeholder.com/200'} alt={termek.nev} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h3>{termek.nev}</h3>
                        <p style={{ color: '#007bff', fontWeight: 'bold' }}>{Number(termek.ar).toLocaleString()} Ft</p>
                        <Link to={`/products/${termek.cikkszam}`} style={{ color: '#aaa', display: 'block', margin: '10px 0' }}>Részletek</Link>
                        <button onClick={() => addToCart(termek)} style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>KOSÁRBA</button>
                    </div>
                ))}
            </div>
        </div>
    );
}