import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../i18n/useTranslation';

export default function ShoeCard({ termek }) {
    const { t } = useTranslation(); 
    return (
        <div style={{ 
            background: '#1a1a1a', 
            padding: '15px', 
            borderRadius: '10px', 
            color: 'white', 
            border: '1px solid #333', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <img
                src={`/kepek/${termek.kepUrl}`}
                alt={termek.nev}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
            />
            <h3>{termek.nev}</h3>
            <p style={{ color: '#007bff', fontWeight: 'bold' }}>
                {Number(termek.ar).toLocaleString()} Ft
            </p>
            <Link 
                to={`/products/${termek.cikkszam}`} 
                style={{ 
                    color: '#fff', 
                    background: '#333', 
                    textDecoration: 'none', 
                    padding: '8px', 
                    borderRadius: '5px',
                    marginTop: '10px' 
                }}
            >
                {t('products.details')}
            </Link>
        </div>
    );
}