import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { myAxios } from '../../services/api';
import useAuthContext from '../../context/AuthContext';
import { ShoeContext } from '../../context/ShoeContext';
import useTranslation from '../../i18n/useTranslation';
import "../../css/PublicCss/Checkout.css";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAuthContext();
    const [cartItems, setCartItems] = useState([]);
    const { isApplied, setIsApplied } = useContext(ShoeContext);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('Bankkártya');
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
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchCart();
    }, [user]);

    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.termek?.ar || 0) * (item.mennyiseg || 1)), 0);
    const discount = isApplied ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discount;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;
        setLoading(true);

        try {
            const rendelesAdat = {
                felhasznalo_id: user.felhasznalo_id || user.id,
                ar: total,
                szallitasi_cim: `${formData.iranyitoszam} ${formData.varos}, ${formData.utca}`,
                status: t('orders.processing'),
                fizetesi_mod: paymentMethod,
                fizetes_statusz: paymentMethod === 'Bankkártya' ? 'teljesítve' : 'függőben'
            };

            await myAxios.post('/api/rendelesek', rendelesAdat);
            alert(t('profile.save_success'));
            setIsApplied(false);
            navigate('/account/orders');
        } catch (error) {
            alert(t('profile.save_error'));
        } finally {
            setLoading(false);
        }
    };

    const optionStyle = (isActive) => ({
        flex: 1,
        padding: '15px',
        border: isActive ? '2px solid #d32f2f' : '1px solid #333',
        borderRadius: '8px',
        background: isActive ? '#222' : '#1a1a1a',
        cursor: 'pointer',
        transition: '0.3s'
    });

    if (loading) return <div className="checkout-loading">{t('loading')}</div>;

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">{t('nav.cart')}</h1>
            <form onSubmit={handleSubmit} className="checkout-form">
                <h3 className="checkout-section-title">{t('orders.title')}</h3>
                <input
                    type="text" placeholder={t('auth.full_name')} required
                    className="checkout-input"
                    value={formData.nev}
                    onChange={(e) => setFormData({ ...formData, nev: e.target.value })}
                />
                <input
                    type="email" placeholder={t('auth.email')} required
                    className="checkout-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="address-row">
                    <input
                        type="text" placeholder={t('zip_code')} required
                        className="checkout-input zip-input"
                        value={formData.iranyitoszam}
                        onChange={(e) => setFormData({ ...formData, iranyitoszam: e.target.value })}
                    />
                    <input
                        type="text" placeholder={t('city')} required
                        className="checkout-input city-input"
                        value={formData.varos}
                        onChange={(e) => setFormData({ ...formData, varos: e.target.value })}
                    />
                </div>
                <input
                    type="text" placeholder={t('street')} required
                    className="checkout-input"
                    value={formData.utca}
                    onChange={(e) => setFormData({ ...formData, utca: e.target.value })}
                />

                <div className="payment-section" style={{ marginTop: '30px' }}>
                    <h3 className="checkout-section-title">Fizetési mód</h3>
                    <div className="payment-options" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                        <label style={optionStyle(paymentMethod === 'Bankkártya')}>
                            <input 
                                type="radio" name="payment" value="Bankkártya"
                                checked={paymentMethod === 'Bankkártya'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ display: 'none' }}
                            />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px' }}>💳</div>
                                <div>Bankkártya</div>
                            </div>
                        </label>
                        <label style={optionStyle(paymentMethod === 'Utánvét')}>
                            <input 
                                type="radio" name="payment" value="Utánvét"
                                checked={paymentMethod === 'Utánvét'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ display: 'none' }}
                            />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px' }}>💵</div>
                                <div>Utánvét</div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="checkout-summary">
                    <h3 className="total-amount">
                        {t('orders.total')}: {total.toLocaleString()} Ft
                    </h3>
                    <button
                        type="submit"
                        className="submit-order-btn"
                        disabled={cartItems.length === 0}
                    >
                        {loading ? t('loading').toUpperCase() : 
                         (t('nav.home') === 'Startseite' ? 'BESTELLUNG ABSCHLIEẞEN' : 
                          t('nav.home') === 'Home' ? 'FINALIZE ORDER' : 'RENDELÉS VÉGLEGESÍTÉSE')}
                    </button>
                </div>
            </form>
        </div>
    );
}