import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { myAxios } from '../../services/api';
import useAuthContext from '../../context/AuthContext';
import "../../css/PublicCss/Checkout.css"; 

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nev: '', email: '', telefon: '', iranyitoszam: '', varos: '', utca: ''
    });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await myAxios.get('/api/kosar');
                const loggedInUserId = user?.felhasznalo_id || user?.id;
                const myCart = response.data.filter(item => item.felhasznalo_id === loggedInUserId);
                setCartItems(myCart);
            } catch (error) {
                console.error("Hiba a szerverről való betöltéskor:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchCart();
    }, [user]);

    const total = cartItems.reduce((sum, item) => sum + (Number(item.termek?.ar || 0) * (item.mennyiseg || 1)), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setLoading(true);

        try {
            const rendelesAdat = {
                felhasznalo_id: user.felhasznalo_id || user.id,
                ar: total,
                szallitasi_cim: `${formData.iranyitoszam} ${formData.varos}, ${formData.utca}`,
                status: 'Feldolgozás alatt'
            };

            await myAxios.post('/api/rendelesek', rendelesAdat);

            alert('Rendelés sikeresen leadva!');
            navigate('/account/orders');
        } catch (error) {
            console.error("Hiba a beküldéskor:", error.response?.data);
            alert("Hiba történt. Ellenőrizd a konzolt!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="checkout-loading">Betöltés...</div>;

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Pénztár</h1>

            <form onSubmit={handleSubmit} className="checkout-form">
                <h3 className="checkout-section-title">Szállítási adatok</h3>

                <input
                    type="text" placeholder="Teljes név" required
                    className="checkout-input"
                    value={formData.nev}
                    onChange={(e) => setFormData({ ...formData, nev: e.target.value })}
                />

                <input
                    type="email" placeholder="Email cím" required
                    className="checkout-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="address-row">
                    <input
                        type="text" placeholder="Irányítószám" required
                        className="checkout-input zip-input"
                        value={formData.iranyitoszam}
                        onChange={(e) => setFormData({ ...formData, iranyitoszam: e.target.value })}
                    />
                    <input
                        type="text" placeholder="Város" required
                        className="checkout-input city-input"
                        value={formData.varos}
                        onChange={(e) => setFormData({ ...formData, varos: e.target.value })}
                    />
                </div>

                <input
                    type="text" placeholder="Utca, házszám" required
                    className="checkout-input"
                    value={formData.utca}
                    onChange={(e) => setFormData({ ...formData, utca: e.target.value })}
                />

                <div className="checkout-summary">
                    <h3 className="total-amount">Fizetendő: {total.toLocaleString()} Ft</h3>
                    <button
                        type="submit"
                        className="submit-order-btn"
                        disabled={cartItems.length === 0}
                    >
                        {loading ? 'FELDOLGOZÁS...' : 'RENDELÉS VÉGLEGESÍTÉSE'}
                    </button>
                </div>
            </form>
        </div>
    );
}