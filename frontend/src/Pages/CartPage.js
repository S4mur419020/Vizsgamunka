import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

export default function CartPage() {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(savedCart);
  }, []);


  const removeItem = (index) => {
    const newCart = items.filter((_, i) => i !== index);
    setItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQty = (index, delta) => {
    const newItems = [...items];
    const item = newItems[index];


    const newQty = (item.quantity || item.mennyiseg || 1) + delta;

    if (newQty >= 1) {

      if (item.quantity !== undefined) item.quantity = newQty;
      if (item.mennyiseg !== undefined) item.mennyiseg = newQty;

      setItems(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
    }
  };


  const total = items.reduce((sum, item) => {

    const price = Number(String(item.ar).replace(/[^0-9]/g, '')) || 0;
    const qty = Number(item.quantity || item.qty) || 0;
    return sum + (price * qty);

  }, 0);
  return (
    <div className="cart-container">
      <div className="cart-layout">

        <div className="items-section">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="cart-item">

                <div className="item-image">
                  <img src={item.kep} alt={item.nev} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <span>{item.nev}</span>
                    <span>{item.ar} Ft</span>
                  </div>

                  <p>Méret: <strong>{item.meret}</strong></p>
                  <div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Mennyiség:
                    <button
                      onClick={() => updateQty(index, -1)}
                      style={{ background: '#333', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >-</button>

                    <input
                      type="number"
                      value={item.quantity || item.mennyiseg}
                      readOnly
                      style={{ width: '40px', textAlign: 'center', background: '#222', color: 'white', border: 'none' }}
                    />

                    <button
                      onClick={() => updateQty(index, 1)}
                      style={{ background: '#333', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >+</button>

                    <button className="delete-btn" onClick={() => removeItem(index)}>🗑️ Törlés</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
              A kosarad még üres.
            </div>
          )}

          <div className="recommended-box" style={{ border: '1px solid #444', height: '200px', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Pluszba ajánlott termékek
          </div>
        </div>

        <div className="summary-panel">
          <h2>Összesen:</h2>
          <div className="summary-row">
            <span>Részösszeg</span>

            <span>{total.toLocaleString()} Ft</span>
          </div>
          <button
            className="checkout-btn"
            disabled={items.length === 0}
            onClick={() => navigate('/account/checkout')} 
          >
            Tovább a fizetéshez
          </button>
          <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '10px' }}>Kiszállítási idő: 2-3 munkanap</p>
        </div>

      </div>
    </div>
  );
}