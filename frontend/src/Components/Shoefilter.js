import React, { useContext } from 'react';
import { ShoeContext } from '../context/ShoeContext';

export default function ShoeFilter() {
    const { filter, setFilter } = useContext(ShoeContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const selectStyle = { 
        width: "100%", padding: "10px", marginBottom: "15px", 
        background: "#333", color: "white", border: "1px solid #444",
        borderRadius: "5px", display: "block", marginTop: "5px", boxSizing: "border-box"
    };

    const buttonStyle = { 
        background: "#ff4d4d", color: "white", width: "100%", 
        padding: "10px", border: "none", borderRadius: "5px",
        cursor: "pointer", fontWeight: "bold", marginTop: "10px"
    };

    return (
        <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "10px", color: "white" }}>
            <h3 style={{ marginBottom: "20px", borderBottom: "1px solid #444", paddingBottom: "10px" }}>Szűrő</h3>
            
            <label>Nem:</label>
            <select name="nem" value={filter.nem} onChange={handleInputChange} style={selectStyle}>
                <option value="">Mind</option>
                <option value="ferfi">Férfi</option>
                <option value="no">Nő</option>
                <option value="unisex">Unisex</option>
                <option value="gyerek">Gyerek</option>
            </select>

            <label>Márka:</label>
            <select name="marka" value={filter.marka} onChange={handleInputChange} style={selectStyle}>
                <option value="">Összes márka</option>
                <option value="1">Nike</option>
                <option value="2">Adidas</option>
                <option value="3">Puma</option>
                <option value="4">Jordan</option>
                <option value="5">Reebok</option>
                <option value="6">Vans</option>
                <option value="7">New Balance</option>
                <option value="8">Converse</option>
                <option value="11">Balenciaga</option>
                <option value="12">Alexander McQueen</option>
                <option value="13">Gucci</option>
                <option value="14">Off-White</option>
                <option value="15">Maison Margiela</option>
                <option value="22">Maison Mihara Yasuhiro</option>
                <option value="16">Veja</option>
                <option value="17">Allbirds</option>
                <option value="18">Cariuma</option>
                <option value="61">Yeezy</option>
                <option value="64">Crocs</option>
            </select>

            <button 
                onClick={() => setFilter({ nem: "",marka: "" })}
                style={buttonStyle}
            >
                Szűrők alaphelyzetbe
            </button>
        </div>
    );
}