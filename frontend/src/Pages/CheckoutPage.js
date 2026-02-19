import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        nev: '', email: '', telefon: '', iranyitoszam: '', varos: '', utca: ''
    });

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (Number(item.ar) * (item.quantity || 1)), 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Rendelés sikeresen leadva! Köszönjük a vásárlást!');
        localStorage.removeItem('cart'); 
        navigate('/'); 
    };

    return (
        <div style={{ padding: '40px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Pénztár</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <h3>Szállítási adatok</h3>
                <input type="text" placeholder="Teljes név" required onChange={(e) => setFormData({...formData, nev: e.target.value})} style={inputStyle} />
                <input type="email" placeholder="Email cím" required onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Irányítószám" required style={inputStyle} />
                    <input type="text" placeholder="Város" required style={inputStyle} />
                </div>
                <input type="text" placeholder="Utca, házszám" required style={inputStyle} />
                
                <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                    <h3>Fizetendő: {total.toLocaleString()} Ft</h3>
                    <button type="submit" className="checkout-btn" style={{ width: '100%', padding: '15px', background: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                        RENDELÉS VÉGLEGESÍTÉSE
                    </button>
                </div>
            </form>
        </div>
    );
}

const inputStyle = { padding: '12px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' };