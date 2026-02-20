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

       
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

        
        const newOrder = {
            id: Math.floor(100000 + Math.random() * 900000), 
            datum: new Date().toLocaleString('hu-HU'),
            termekek: [...cartItems],
            osszeg: total,
            statusz: 'Feldolgozás alatt',
            vevo: formData.nev
        };

        
        localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

        
        alert('Rendelés sikeresen leadva!');
        localStorage.removeItem('cart'); 
        navigate('/account/orders');
    };

    const inputStyle = { padding: '12px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' };

    return (
        <div style={{ padding: '40px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#00c3ff' }}>Pénztár</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Szállítási adatok</h3>
                <input type="text" placeholder="Teljes név" required onChange={(e) => setFormData({...formData, nev: e.target.value})} style={inputStyle} />
                <input type="email" placeholder="Email cím" required onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Irányítószám" required style={{...inputStyle, flex: 1}} />
                    <input type="text" placeholder="Város" required style={{...inputStyle, flex: 2}} />
                </div>
                <input type="text" placeholder="Utca, házszám" required style={inputStyle} />
                
                <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Fizetendő: {total.toLocaleString()} Ft</h3>
                    <button type="submit" style={{ width: '100%', padding: '15px', background: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                        RENDELÉS VÉGLEGESÍTÉSE
                    </button>
                </div>
            </form>
        </div>
    );
}