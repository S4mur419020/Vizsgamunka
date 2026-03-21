import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../../css/PublicCss/Cart.css';
import { ShoeContext } from '../../context/ShoeContext'; 

export default function CartPage() {
  const navigate = useNavigate();
 
  const [couponCode, setCouponCode] = useState("");
  
  
  const { 
    cartItems, 
    updateCart, 
    isApplied, 
    setIsApplied, 
    loading 
  } = useContext(ShoeContext);

  
  
  const handleRemove = async (kosarId) => {
    try {
    
      
      const { myAxios } = await import('../../services/api'); 
      await myAxios.delete(`/api/kosar/${kosarId}`);
      
      window.location.reload(); 
    } catch (error) {
      alert("Hiba történt a törlés során!");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (Number(item.termek?.ar || 0) * item.mennyiseg);
  }, 0);

  const discountAmount = isApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === '7X4K-29QZ') {
      setIsApplied(true);
      alert("Sikeres aktiválás! 10% kedvezmény levonva.");
    } else {
      alert("Érvénytelen kuponkód!");
    }
  };

  if (loading) return <div className="empty-cart-msg">Betöltés...</div>;

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
                <p>Méret: {item.meret_id}</p> 
                <button onClick={() => handleRemove(item.kosar_id)} className="remove-btn">
                  Eltávolítás
                </button>
              </div>

              
              <div className="cart-item-quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => updateCart(item.termek_id, -1, item.meret_id)}
                > - </button>
                
                <span className="qty-value">{item.mennyiseg} db</span>
                
                <button 
                  className="qty-btn"
                  onClick={() => updateCart(item.termek_id, 1, item.meret_id)}
                > + </button>
              </div>

              <div className="cart-item-price">
                {(Number(item.termek?.ar || 0) * item.mennyiseg).toLocaleString()} Ft
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart-msg">A kosarad még üres.</div>
        )}
      </div>

      <div className="cart-summary-section">
        <div className="summary-box">
          <h2 className="summary-title">Összesen:</h2>
          <div className="summary-row">
            <span>Részösszeg:</span>
            <span>{subtotal.toLocaleString()} Ft</span>
          </div>

          <div className="coupon-container">
            {!isApplied ? (
              <>
                <input
                  type="text"
                  placeholder="Kuponkód..."
                  value={couponCode}
                  className="coupon-input"
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={handleApplyCoupon} className="coupon-btn">
                  Kupon aktiválása
                </button>
              </>
            ) : (
              <div className="coupon-applied">✓ 10% kedvezmény aktiválva</div>
            )}
          </div>

          {isApplied && (
            <div className="summary-row discount-row">
              <span>Kedvezmény:</span>
              <span>- {discountAmount.toLocaleString()} Ft</span>
            </div>
          )}

          <div className="total-row">
            <span>Fizetendő:</span>
            <span>{finalTotal.toLocaleString()} Ft</span>
          </div>

          <button
            onClick={() => cartItems.length > 0 ? navigate("/checkout") : alert("Üres a kosarad!")}
            className="checkout-btn"
          >
            Tovább a fizetéshez
          </button>
        </div>
      </div>
    </div>
  );
}