import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaUndoAlt, FaPercent } from 'react-icons/fa';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [termek, setTermek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

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
      if (!selectedSize) {
        alert("Kérlek, válassz méretet!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    
    const existingItem = cart.find(item => 
        item.cikkszam === termek.cikkszam && item.valasztottMeret === selectedSize
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        
        cart.push({ 
            ...termek, 
            quantity: 1, 
            valasztottMeret: selectedSize,
            
            ar: Number(String(termek.ar).replace(/[^0-9]/g, '')),
            
            kep: termek.kepUrl ? `/kepek/${termek.kepUrl}` : "/no-image.png"
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Kosárhoz adva!');
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Betöltés...</div>;
    if (!termek) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Termék nem található.</div>;
    const meretek = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
    return (
        <div style={{ padding: '20px', color: 'white', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>

            <button
                onClick={() => navigate(-1)}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }}
            >
                &larr; VISSZA
            </button>

            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>

                <div style={{ flex: '1.2', minWidth: '300px' }}>
                    <img
                        src={termek.kepUrl ? `/kepek/${termek.kepUrl}` : "/no-image.png"}
                        alt={termek.nev}
                        style={{ width: '100%', borderRadius: '4px', backgroundColor: '#fff' }}
                    />
                </div>

                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div>
                        <span style={{ fontSize: '12px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {termek.kategoria?.tipus || "ÚJDONSÁG"}
                        </span>
                        <h1 style={{
                            fontSize: '32px',
                            margin: '5px 0',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(45deg, #007bff, #a55eea)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {termek.nev}
                        </h1>
                        <p style={{ color: '#aaa', marginBottom: '15px', fontSize: '14px' }}>
                            Márka: <span style={{ color: 'white' }}>{termek.marka?.nev}</span> | Anyag: <span style={{ color: 'white' }}>{termek.anyag}</span>
                        </p>
                    </div>

                    <div style={{ marginBottom: '15px', color: '#ffcc00', fontSize: '14px' }}>
                        ★★★★☆ <span style={{ color: '#888', marginLeft: '10px', textDecoration: 'underline', cursor: 'pointer' }}>7 Vélemény</span>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{Number(termek.ar).toLocaleString()} Ft</span>
                        <span style={{ fontSize: '14px', color: '#888', marginLeft: '10px' }}>ÁFÁ-val</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', fontSize: '14px' }}>
                        <span style={{ color: '#888' }}>ELÉRHETŐSÉG:</span>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>● Készleten</span>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '15px', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                            <span style={{ borderBottom: '2px solid white', cursor: 'pointer' }}>EUR</span>
                            <span style={{ color: '#444' }}>US</span>
                            <span style={{ color: '#444' }}>UK</span>
                        </div>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                background: "#1a1a1a",
                                color: "white",
                                border: "1px solid #444",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                        >
                            <option value="">Válassz méretet</option>
                            {meretek.map(m => {

                                const vanKeszleten = termek.valtozatok && termek.valtozatok.some(v => v.nev.includes(String(m)));

                                return (
                                    <option key={m} value={m}>
                                        EU {m} {vanKeszleten ? "" : "(Rendelésre)"}
                                    </option>
                                );
                            })}
                        </select>
                    </div>


                    <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                        <button
                            onClick={addToCart}
                            
                            disabled={!selectedSize}
                            style={{
                                flex: '1',
                                padding: '16px',
                                background: selectedSize ? 'white' : '#555', 
                                color: selectedSize ? 'black' : '#ccc',
                                border: 'none',
                                fontWeight: 'bold',
                                cursor: selectedSize ? 'pointer' : 'not-allowed',
                                textTransform: 'uppercase'
                            }}
                        >
                            {selectedSize ? 'Kosárhoz ad' : 'Válassz méretet!'}
                        </button>

                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            style={{
                                width: '55px',
                                background: '#1a1a1a',
                                border: '1px solid #444',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px'
                            }}
                        >
                            {isFavorite ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
                        </button>
                    </div>


                    <div style={{ borderTop: '1px solid #333', paddingTop: '20px', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>LEÍRÁS</h3>
                        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>{termek.leiras}</p>
                    </div>

                    <div style={{ fontSize: '14px', color: '#ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <FaPercent /> <span>A megrendelés 5%-át visszakapod</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaUndoAlt /> <span>Termékvisszaküldés 30 napon belül</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}