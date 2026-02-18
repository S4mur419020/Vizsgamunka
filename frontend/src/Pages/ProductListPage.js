import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBars } from "react-icons/fa";


export default function ProductListPage() {
    const [termekek, setTermekek] = useState([]);
    const [loading, setLoading] = useState(true);


    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({
        nem: "",
        meret: "",
        szin: ""
    });


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

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Termékek betöltése...</div>;

    const filteredProducts = termekek.filter(t => {
        return (
            (filter.nem === "" || t.nem === filter.nem) &&
            (filter.meret === "" || t.meret?.includes(filter.meret)) &&
            (filter.szin === "" || t.szin?.toLowerCase().includes(filter.szin.toLowerCase()))
        );
    });


    return (
        <div className="product-list-container" style={{ padding: '20px' }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <button
                    onClick={() => setOpenFilter(!openFilter)}
                    style={{
                        background: "#007bff",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        margin: "0 auto"
                    }}
                >
                    <FaBars /> Szűrők
                </button>

                {openFilter && (
                    <div style={{
                        marginTop: "20px",
                        background: "#1a1a1a",
                        padding: "20px",
                        borderRadius: "10px",
                        border: "1px solid #333",
                        color: "white",
                        maxWidth: "400px",
                        marginInline: "auto"
                    }}>
                        <h3>Szűrés</h3>

                        <label>Nem:</label>
                        <select
                            value={filter.nem}
                            onChange={(e) => setFilter({ ...filter, nem: e.target.value })}
                            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                        >
                            <option value="">Mind</option>
                            <option value="ferfi">Férfi</option>
                            <option value="no">Nő</option>
                            <option value="unisex">Unisex</option>
                        </select>

                        <label>Méret:</label>
                        <input
                            type="number"
                            placeholder="pl. 42"
                            value={filter.meret}
                            onChange={(e) => setFilter({ ...filter, meret: e.target.value })}
                            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                        />

                        <label>Szín:</label>
                        <input
                            type="text"
                            placeholder="pl. fekete"
                            value={filter.szin}
                            onChange={(e) => setFilter({ ...filter, szin: e.target.value })}
                            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                        />
                    </div>
                )}
            </div>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Cipőink</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '30px'
            }}>
                {filteredProducts.map(termek => (
                    <div key={termek.cikkszam} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', color: 'white', border: '1px solid #333', textAlign: 'center' }}>
                        <img
                            src={`/kepek/${termek.kepUrl}`}
                            alt={termek.nev}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "5px"
                            }}
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