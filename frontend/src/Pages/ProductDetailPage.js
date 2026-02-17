import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetailPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [termek, setTermek] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/termekek/${id}`, { withCredentials: true })
            .then(response => {
                setTermek(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Hiba:", error);
                setLoading(false);
            });
    }, [id]);

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.cikkszam === termek.cikkszam);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...termek, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Kosárhoz adva!');
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center' }}>Betöltés...</div>;
    if (!termek) return <div style={{ color: 'white', textAlign: 'center' }}>Termék nem található.</div>;

    return (
        <div style={{ padding: '40px', color: 'white', maxWidth: '900px', margin: '0 auto' }}>
            <button 
                onClick={() => navigate(-1)} 
                style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', marginBottom: '20px' }}
            >
                &larr; Vissza a listához
            </button>
            
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <img 
                        src={termek.kep || 'https://via.placeholder.com/400'} 
                        alt={termek.nev} 
                        style={{ width: '100%', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                    />
                </div>
                
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{termek.nev}</h1>
                    <p style={{ color: '#888', marginBottom: '20px' }}>Cikkszám: {termek.cikkszam}</p>
                    <p style={{ fontSize: '2rem', color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>
                        {Number(termek.ar).toLocaleString()} Ft
                    </p>
                    
                    <div style={{ marginBottom: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                        <h3>Leírás:</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6' }}>{termek.leiras || "Nincs leírás a termékhez."}</p>
                    </div>

                    <button 
                        onClick={addToCart}
                        style={{
                            width: '100%',
                            padding: '18px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        KOSÁRBA TESZEM
                    </button>
                </div>
            </div>
        </div>
    );
}