import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { myAxios } from '../../services/api';
import useAuthContext from '../../context/AuthContext';
import { FaHeart, FaRegHeart, FaUndoAlt, FaPercent } from 'react-icons/fa';
import "../../css/PublicCss/ProductDetails.css"; // <-- Importáld a CSS-t

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [termek, setTermek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        myAxios.get(`/api/termekek/${id}`)
            .then(response => {
                setTermek(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Hiba a termék betöltésekor:", error);
                setLoading(false);
            });
    }, [id]);

    const addToCart = async () => {
        if (!selectedSize) {
            alert("Kérlek, válassz méretet!");
            return;
        }

        if (!user) {
            alert("Jelentkezz be a vásárláshoz!");
            navigate('/login');
            return;
        }

        try {
            const payload = {
                felhasznalo_id: user.felhasznalo_id || user.id,
                termek_id: termek.cikkszam || termek.id,
                meret_id: Number(selectedSize),
                mennyiseg: 1,
                hozzaadas_datum: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };

            await myAxios.post('/api/kosar', payload);
            alert('Sikeresen kosárhoz adva!');
        } catch (error) {
            console.error("Szerver válasza:", error.response?.data);
            alert("Hiba! Nézd meg a konzolt a részletekért.");
        }
    };

    if (loading) return <div className="status-message">Betöltés...</div>;
    if (!termek) return <div className="status-message">Termék nem található.</div>;

    const meretek = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];

    return (
        <div className="product-detail-container">
            <button onClick={() => navigate(-1)} className="back-button">
                &larr; VISSZA
            </button>

            <div className="product-layout">
                <div className="product-image-section">
                    <img
                        className="product-main-image"
                        src={termek.kepUrl ? `/kepek/${termek.kepUrl}` : "/no-image.png"}
                        alt={termek.nev}
                    />
                </div>

                <div className="product-info-section">
                    <div>
                        <span className="product-category-tag">
                            {termek.kategoria?.tipus || "ÚJDONSÁG"}
                        </span>
                        <h1 className="product-main-title">{termek.nev}</h1>
                        <p className="product-meta-text">
                            Márka: <span>{termek.marka?.nev}</span> | Anyag: <span>{termek.anyag}</span>
                        </p>
                    </div>

                    <div className="product-rating">
                        ★★★★☆ <span className="product-reviews-link">7 Vélemény</span>
                    </div>

                    <div className="product-price-row">
                        <span className="product-price">{Number(termek.ar).toLocaleString()} Ft</span>
                        <span className="product-tax-info">ÁFÁ-val</span>
                    </div>

                    <div className="product-availability">
                        <span style={{ color: '#888' }}>ELÉRHETŐSÉG:</span>
                        <span className="stock-status">● Készleten</span>
                    </div>

                    <div className="size-selector-container">
                        <div className="size-unit-tabs">
                            <span className="size-unit-active">EUR</span>
                            <span className="size-unit-inactive">US</span>
                            <span className="size-unit-inactive">UK</span>
                        </div>
                        <select
                            className="product-size-dropdown"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
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

                    <div className="action-buttons-row">
                        <button
                            onClick={addToCart}
                            disabled={!selectedSize}
                            className={`add-to-cart-btn ${selectedSize ? 'enabled' : 'disabled'}`}
                        >
                            {selectedSize ? 'Kosárhoz ad' : 'Válassz méretet!'}
                        </button>

                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="favorite-btn"
                        >
                            {isFavorite ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
                        </button>
                    </div>

                    <div className="description-section">
                        <h3 className="description-title">LEÍRÁS</h3>
                        <p className="description-content">{termek.leiras}</p>
                    </div>

                    <div className="perks-section">
                        <div className="perk-item">
                            <FaPercent /> <span>A megrendelés 5%-át visszakapod</span>
                        </div>
                        <div className="perk-item">
                            <FaUndoAlt /> <span>Termékvisszaküldés 30 napon belül</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}