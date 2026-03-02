import React, { useState, useContext } from 'react';
import { FaBars } from "react-icons/fa";
import { ShoeContext } from '../context/ShoeContext'; 
import ShoeFilter from '../Components/Shoefilter';
import ShoeCard from '../Components/ShoeCard';

export default function ProductListPage() {
    const { szurtTermekek, loading } = useContext(ShoeContext);
    const [sortOrder, setSortOrder] = useState("");
    const [openFilter, setOpenFilter] = useState(false);

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Termékek betöltése...</div>;

    const sortedProducts = [...szurtTermekek].sort((a, b) => {
        if (sortOrder === "asc") return Number(a.ar) - Number(b.ar);
        if (sortOrder === "desc") return Number(b.ar) - Number(a.ar);
        if (sortOrder === "abc") return a.nev.localeCompare(b.nev);
        return 0;
    });

    return (
        <div className="product-list-container" style={{ padding: '20px' }}>
            <button 
                onClick={() => setOpenFilter(!openFilter)}
                style={{ 
                    background: "#007bff", color: "white", padding: "10px 20px", 
                    border: "none", borderRadius: "8px", cursor: "pointer", 
                    display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" 
                }}
            >
                <FaBars /> {openFilter ? "Szűrők bezárása" : "Szűrők"}
            </button>
            {openFilter && <ShoeFilter />}

            <h1 style={{ color: 'white', textAlign: 'center' }}>Cipőink</h1>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '20px', 
                marginTop: '30px' 
            }}>
                {sortedProducts.map(termek => (
                    <ShoeCard key={termek.cikkszam} termek={termek} />
                ))}
            </div>
        </div>
    );
}