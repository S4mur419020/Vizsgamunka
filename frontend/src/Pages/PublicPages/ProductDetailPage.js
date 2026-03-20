import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { myAxios } from '../../services/api';
import useAuthContext from '../../context/AuthContext';
import { useSizeContext } from '../../context/SizeContext';
import { FaHeart, FaRegHeart, FaUndoAlt, FaPercent } from 'react-icons/fa';
import "../../css/PublicCss/ProductDetails.css";

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { sizes, loading: sizesLoading } = useSizeContext();

    const [termek, setTermek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [sizeSystem, setSizeSystem] = useState("EU");

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
        console.log("Kiválasztott state értéke:", selectedSize);

        if (!selectedSize || selectedSize === "") {
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
                felhasznalo_id: Number(user.felhasznalo_id || user.id),
                termek_id: Number(termek.cikkszam || termek.id),
                meret_id: parseInt(selectedSize),
                mennyiseg: 1,
                hozzaadas_datum: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };
            console.log("Küldött adatok:", payload);
            await myAxios.post('/api/kosar', payload);
            alert('Sikeresen kosárhoz adva!');
        } catch (error) {
            console.error("Szerver válasza:", error.response?.data);
            alert("Hiba! Nézd meg a konzolt a részletekért.");
        }
    };

    if (loading || sizesLoading) return <div className="status-message">Betöltés...</div>;
    if (!termek) return <div className="status-message">Termék nem található.</div>;

    return (
        <div className="product-detail-container">
            <button onClick={() => navigate(-1)} className="back-button">&larr; VISSZA</button>
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
                        <span className="product-category-tag">{termek.kategoria?.tipus || "ÚJDONSÁG"}</span>
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
                            <span className={sizeSystem === "EU" ? "size-unit-active" : "size-unit-inactive"} onClick={() => setSizeSystem("EU")}>EU</span>
                            <span className={sizeSystem === "US" ? "size-unit-active" : "size-unit-inactive"} onClick={() => setSizeSystem("US")}>US</span>
                            <span className={sizeSystem === "UK" ? "size-unit-active" : "size-unit-inactive"} onClick={() => setSizeSystem("UK")}>UK</span>
                        </div>
                        <select
                            className="product-size-dropdown"
                            value={selectedSize}
                            onChange={(e) => {
                                console.log("Kiválasztott ID:", e.target.value);
                                setSelectedSize(e.target.value);
                            }}
                        >
                            <option value="">Válassz méretet</option>
                            {sizes.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {sizeSystem} {s[sizeSystem]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="action-buttons-row">
                        <button onClick={addToCart} disabled={!selectedSize} className={`add-to-cart-btn ${selectedSize ? 'enabled' : 'disabled'}`}>
                            {selectedSize ? 'Kosárhoz ad' : 'Válassz méretet!'}
                        </button>
                        <button onClick={() => setIsFavorite(!isFavorite)} className="favorite-btn">
                            {isFavorite ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
                        </button>
                    </div>
                    <div className="description-section">
                        <h3 className="description-title">LEÍRÁS</h3>
                        <p className="description-content">{termek.leiras}</p>
                    </div>
                    <div className="perks-section">
                        <div className="perk-item"><FaPercent /> <span>A megrendelés 5%-át visszakapod</span></div>
                        <div className="perk-item"><FaUndoAlt /> <span>Termékvisszaküldés 30 napon belül</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};