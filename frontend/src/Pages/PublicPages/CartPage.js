import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PublicCss/Cart.css';
import { ShoeContext } from '../../context/ShoeContext';
import useTranslation from '../../i18n/useTranslation';
import { myAxios } from '../../services/api';

export default function CartPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [couponCode, setCouponCode] = useState("");
  const [availableDiscounts, setAvailableDiscounts] = useState([]);
  const [currentPercent, setCurrentPercent] = useState(0);

  const {
    cartItems,
    updateCart,
    isApplied,
    setIsApplied,
    loading
  } = useContext(ShoeContext);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const res = await myAxios.get('/api/learazasok');
        setAvailableDiscounts(res.data);
      } catch (error) {
        console.error("Hiba az akciók betöltésekor:", error);
      }
    };
    fetchDiscounts();
  }, []);

  const handleRemove = async (kosarId) => {
    try {
      await myAxios.delete(`/api/kosar/${kosarId}`);
      window.location.reload();
    } catch (error) {
      alert(t('profile.save_error') || "Hiba történt a törlés során!");
    }
  };

  // PONTOSÍTOTT SZÁMÍTÁS
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = Number(item.termek?.ar || 0);
    const itemQty = Number(item.mennyiseg || 0);
    return acc + (itemPrice * itemQty);
  }, 0);

  const discountAmount = isApplied ? Math.round(subtotal * (Number(currentPercent) / 100)) : 0;
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    const found = availableDiscounts.find(d =>
      `${d.marka.toUpperCase()}${d.akcio_szazalek}` === couponCode.trim().toUpperCase()
    );

    if (found) {
      setCurrentPercent(Number(found.akcio_szazalek));
      setIsApplied(true);
      alert(`Sikeres kupon: ${found.akcio_szazalek}% kedvezmény!`);
    } else {
      alert(t('profile.save_error') || "Érvénytelen kuponkód!");
      setCouponCode("");
      setIsApplied(false);
      setCurrentPercent(0);
    }
  };

  if (loading) return <div className="empty-cart-msg">{t('loading')}...</div>;

  return (
    <div className="cart-page-container">
      <div className="cart-items-section">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.kosar_id} className="cart-item-row">
              <img
                src={item.termek?.kepUrl ? `/kepek/${item.termek.kepUrl}` : "/no-image.png"}
                alt={item.termek?.nev}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.termek?.nev}</h3>
                <p>{t('product.size_label')}: {item.meret_id}</p>
              </div>

              <div className="cart-item-quantity-controls">
                <button className="qty-btn" onClick={() => {
                  if (item.mennyiseg > 1) {
                    updateCart(item.termek_id, -1, item.meret_id);
                  } else {
                    handleRemove(item.kosar_id);
                  }
                }}> − </button>
                <span className="qty-value">{item.mennyiseg} db</span>
                <button className="qty-btn" onClick={() => updateCart(item.termek_id, 1, item.meret_id)}> + </button>
              </div>

              <div className="cart-item-price">
                {(Number(item.termek?.ar || 0) * item.mennyiseg).toLocaleString()} Ft
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart-msg">{t('cart.empty')}</div>
        )}
      </div>

      <div className="cart-summary-section">
        <div className="summary-box">
          <h2 className="summary-title">{t('cart.summary')}:</h2>
          <div className="summary-row">
            <span>{t('cart.subtotal')}:</span>
            <span>{subtotal.toLocaleString()} Ft</span>
          </div>

          <div className="coupon-container">
            {!isApplied ? (
              <>
                <input
                  type="text"
                  placeholder={t('cart.coupon')}
                  value={couponCode}
                  className="coupon-input"
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={handleApplyCoupon} className="coupon-btn">
                  {t('cart.coupon_btn')}
                </button>
              </>
            ) : (
              <div className="coupon-applied">
                ✓ {currentPercent}% {t('cart.discount').toLowerCase()}
              </div>
            )}
          </div>

          {isApplied && (
            <div className="summary-row discount-row">
              <span>{t('cart.discount')}:</span>
              <span>- {discountAmount.toLocaleString()} Ft</span>
            </div>
          )}

          <div className="total-row">
            <span>{t('orders.total')}:</span>
            <span>{finalTotal.toLocaleString()} Ft</span>
          </div>

          <button
            onClick={() => cartItems.length > 0 ? navigate("/checkout") : alert(t('cart.empty'))}
            className="checkout-btn"
          >
            {t('cart.checkout_btn')}
          </button>
        </div>
      </div>
    </div>
  );
}