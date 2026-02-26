import React from 'react';
import { Link } from 'react-router-dom';

export default function CipoKartya({ termek }) {
    return (
        <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', color: 'white', border: '1px solid #333', textAlign: 'center' }}>
            <img
                src={`/kepek/${termek.kepUrl}`}
                alt={termek.nev}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
            />
            <h3>{termek.nev}</h3>
            <p style={{ color: '#007bff', fontWeight: 'bold' }}>{Number(termek.ar).toLocaleString()} Ft</p>
            <Link to={`/products/${termek.cikkszam}`} style={{ color: '#aaa', display: 'block', margin: '10px 0' }}>Részletek</Link>
        </div>
    );
}