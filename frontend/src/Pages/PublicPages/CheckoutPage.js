import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { myAxios } from '../../services/api';
import useAuthContext from '../../context/AuthContext';;

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nev: '', email: '', telefon: '', iranyitoszam: '', varos: '', utca: ''
    });

   
    const inputStyle = {
        padding: '12px',
        background: '#222',
        border: '1px solid #444',
        color: 'white',
        borderRadius: '4px'
    };

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
    if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Betöltés...</div>;

    return (
        <div style={{ padding: '40px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#00c3ff' }}>Pénztár</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Szállítási adatok</h3>
                <input type="text" placeholder="Teljes név" required value={formData.nev} onChange={(e) => setFormData({ ...formData, nev: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Email cím" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Irányítószám" required value={formData.iranyitoszam} onChange={(e) => setFormData({ ...formData, iranyitoszam: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                    <input type="text" placeholder="Város" required value={formData.varos} onChange={(e) => setFormData({ ...formData, varos: e.target.value })} style={{ ...inputStyle, flex: 2 }} />
                </div>
                <input type="text" placeholder="Utca, házszám" required value={formData.utca} onChange={(e) => setFormData({ ...formData, utca: e.target.value })} style={inputStyle} />

                <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Fizetendő: {total.toLocaleString()} Ft</h3>
                    <button type="submit" style={{ width: '100%', padding: '15px', background: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                        RENDELÉS VÉGLEGESÍTÉSE
                    </button>
                </div>
            </form>
        </div>
    );
}