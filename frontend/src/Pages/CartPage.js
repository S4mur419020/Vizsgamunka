import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.ar) * item.quantity), 0);

  
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

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Üres a kosarad!");

    
    const newOrder = {
      id: Math.floor(Math.random() * 900000) + 100000,
      datum: new Date().toLocaleString(),
      termekek: cartItems,
      osszeg: finalTotal, 
      statusz: "Feldolgozás alatt",
      couponApplied: isApplied
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

   
    localStorage.removeItem('cart');
    alert("Rendelés sikeresen leadva!");
    navigate("/account/orders"); 
  };

  return (
    <div className="cart-page-container" style={{ display: 'flex', padding: '40px', gap: '40px', color: 'white', background: '#000', minHeight: '100vh' }}>

      
      <div className="cart-items-section" style={{ flex: 2 }}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 0', borderBottom: '1px solid #222' }}>
              <img src={item.kep} alt={item.nev} style={{ width: '100px', borderRadius: '8px', background: 'white' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{item.nev}</h3>
                <p style={{ color: '#888', margin: '5px 0' }}>Méret: {item.valasztottMeret}</p>
              </div>
              <div style={{ fontWeight: 'bold' }}>{item.quantity} db</div>
              <div style={{ fontWeight: 'bold' }}>{Number(item.ar).toLocaleString()} Ft</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#666' }}>A kosarad még üres.</div>
        )}

        <div style={{ marginTop: '30px', border: '1px solid #222', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#888' }}>Pluszba ajánlott termékek</p>
        </div>
      </div>

     
      <div className="cart-summary-section" style={{ flex: 1 }}>
        <div style={{ border: '1px solid #333', padding: '30px', borderRadius: '4px', position: 'sticky', top: '20px' }}>
          <h2 style={{ textAlign: 'center', marginTop: 0, fontSize: '24px' }}>Összesen:</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', color: '#ccc' }}>
            <span>Részösszeg:</span>
            <span>{subtotal.toLocaleString()} Ft</span>
          </div>

         
          <div style={{ marginBottom: '20px' }}>
            {!isApplied ? (
              <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                <input
                  type="text"
                  placeholder="Kuponkód..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ background: '#000', border: '1px solid #444', color: 'white', padding: '12px', borderRadius: '4px' }}
                />
                <button
                  onClick={handleApplyCoupon}
                  style={{ background: '#111', border: '1px solid #444', color: 'white', padding: '10px', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}
                >
                  Kupon aktiválása
                </button>
              </div>
            ) : (
              <div style={{ background: '#1a1a1a', padding: '10px', borderRadius: '4px', color: '#28a745', fontSize: '13px', textAlign: 'center', border: '1px solid #28a745' }}>
                ✓ 10% kedvezmény aktiválva
              </div>
            )}
          </div>

          {isApplied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', marginBottom: '15px', fontSize: '14px' }}>
              <span>Kedvezmény:</span>
              <span>- {discountAmount.toLocaleString()} Ft</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', borderTop: '1px solid #333', paddingTop: '20px' }}>
            <span>Fizetendő:</span>
            <span>{finalTotal.toLocaleString()} Ft</span>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '15px',
              marginTop: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Tovább a fizetéshez
          </button>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#666', marginTop: '15px' }}>
            Kiszállítási idő: 2-3 munkanap
          </p>
        </div>
      </div>

    </div>
  );
}