import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBars } from "react-icons/fa";

export default function ProductListPage() {
    const [sortOrder, setSortOrder] = useState("");
    const [termekek, setTermekek] = useState([]);
    const [loading, setLoading] = useState(true);

    const badgeStyle = {
        background: "#333",
        color: "white",
        padding: "5px 12px",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "14px",
        border: "1px solid #444",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    };

    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({
        nem: "",
        meret: "",
        szin: "",
        marka: ""
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/termekek', { withCredentials: true })
            .then(response => {
                setTermekek(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Hiba a termékek betöltésekor:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Termékek betöltése...</div>;

    // 1. SZŰRÉS
    const filteredProducts = termekek.filter(t => {
        const nemPasszol = filter.nem === "" || t.nem === filter.nem;
        const meretPasszol = filter.meret === "" || (t.meret && t.meret.toString().includes(filter.meret));
        const szinPasszol = filter.szin === "" || (t.szin && t.szin.toLowerCase().includes(filter.szin.toLowerCase()));
        const markaPasszol = filter.marka === "" || (t.marka_id && (
            (filter.marka === "1" && ["1", "9", "20"].includes(String(t.marka_id))) ||
            (filter.marka === "4" && ["4", "22"].includes(String(t.marka_id))) ||
            (filter.marka === "2" && ["2", "10", "19", "23"].includes(String(t.marka_id))) ||
            String(t.marka_id) === String(filter.marka)
        ));
        return nemPasszol && meretPasszol && szinPasszol && markaPasszol;
    });

    // 2. RENDEZÉS 
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "asc") return Number(a.ar) - Number(b.ar);
        if (sortOrder === "desc") return Number(b.ar) - Number(a.ar);
        if (sortOrder === "abc") return a.nev.localeCompare(b.nev);
        return 0;
    });

    return (
        <div className="product-list-container" style={{ padding: '20px' }}>


            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
                marginBottom: "30px",
                flexWrap: "wrap"
            }}>
                <button
                    onClick={() => setOpenFilter(!openFilter)}
                    style={{
                        background: "#007bff",
                        color: "white",
                        padding: "10px 25px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "16px",
                        fontWeight: "bold"
                    }}
                >
                    <FaBars /> Szűrők
                </button>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    style={{
                        background: "#1a1a1a",
                        color: "white",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        cursor: "pointer",
                        fontSize: "16px",
                        outline: "none"
                    }}
                >
                    <option value="">Rendezés</option>
                    <option value="asc">Ár: Olcsótól</option>
                    <option value="desc">Ár: Drágától</option>
                    <option value="abc">Név: A-Z</option>
                </select>
            </div>


            {openFilter && (
                <div style={{
                    marginTop: "20px",
                    background: "#1a1a1a",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #333",
                    color: "white",
                    maxWidth: "400px",
                    marginInline: "auto",
                    marginBottom: "20px"
                }}>
                    <h3>Szűrés</h3>
                    <label>Nem:</label>
                    <select value={filter.nem} onChange={(e) => setFilter({ ...filter, nem: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "15px", background: "#333", color: "white" }}>
                        <option value="">Mind</option>
                        <option value="ferfi">Férfi</option>
                        <option value="no">Nő</option>
                        <option value="unisex">Unisex</option>
                    </select>

                    <label>Méret:</label>
                    <input type="number" placeholder="pl. 42" value={filter.meret} onChange={(e) => setFilter({ ...filter, meret: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "15px", background: "#333", color: "white" }} />

                    <label>Szín:</label>
                    <input type="text" placeholder="pl. fekete" value={filter.szin} onChange={(e) => setFilter({ ...filter, szin: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "15px", background: "#333", color: "white" }} />

                    <label>Márka:</label>
                    <select value={filter.marka} onChange={(e) => setFilter({ ...filter, marka: e.target.value })} style={{ width: "100%", padding: "10px", background: "#333", color: "white" }}>
                        <option value="">Összes márka</option>
                        <option value="1">Nike</option>
                        <option value="4">Jordan</option>
                        <option value="2">Adidas</option>
                        <option value="3">Puma</option>
                        <option value="5">Reebok</option>
                        <option value="6">Vans</option>
                        <option value="7">New Balance</option>
                        <option value="8">Converse</option>
                        <option value="11">Balenciaga</option>
                        <option value="12">Alexander McQueen</option>
                        <option value="13">Gucci</option>
                        <option value="14">Off-White</option>
                        <option value="15">Maison Margiela</option>
                        <option value="16">Veja</option>
                    </select>
                </div>
            )}


            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
                {filter.marka && <div style={badgeStyle} onClick={() => setFilter({ ...filter, marka: "" })}>Márka törlése ✕</div>}
                {filter.nem && <div style={badgeStyle} onClick={() => setFilter({ ...filter, nem: "" })}>Nem: {filter.nem} ✕</div>}
                {filter.szin && <div style={badgeStyle} onClick={() => setFilter({ ...filter, szin: "" })}>Szín: {filter.szin} ✕</div>}
                {filter.meret && <div style={badgeStyle} onClick={() => setFilter({ ...filter, meret: "" })}>Méret: {filter.meret} ✕</div>}
            </div>

            <h1 style={{ color: 'white', textAlign: 'center' }}>Cipőink</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '30px'
            }}>
                {sortedProducts.map(termek => (
                    <div key={termek.cikkszam} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', color: 'white', border: '1px solid #333', textAlign: 'center' }}>
                        <img
                            src={`/kepek/${termek.kepUrl}`}
                            alt={termek.nev}
                            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
                        />
                        <h3>{termek.nev}</h3>
                        <p style={{ color: '#007bff', fontWeight: 'bold' }}>{Number(termek.ar).toLocaleString()} Ft</p>
                        <Link to={`/products/${termek.cikkszam}`} style={{ color: '#aaa', display: 'block', margin: '10px 0' }}>Részletek</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}