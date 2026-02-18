import React, { useState } from 'react';
import '../css/Cart.css';

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, brand: "Márka", name: "Cipő leírás", price: 45000, qty: 1 }
  ]);

  return (
    <div className="cart-container">
      <div className="cart-layout">
        
        {/* Termék lista */}
        <div className="items-section">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">Cipő kép</div>
              <div className="item-details">
                <div className="item-header">
                  <span>{item.brand}</span>
                  <span>{item.price} Ft</span>
                </div>
                <p>{item.name}</p>
                <div className="qty-controls">
                   Mennyiség: <input type="number" value={item.qty} readOnly />
                   <button className="delete-btn">🗑️ Törlés</button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="recommended-box" style={{border: '1px solid #444', height: '200px', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             Pluszba ajánlott termékek
          </div>
        </div>

        {/* Összesítő */}
        <div className="summary-panel">
          <h2>Összesen:</h2>
          <div className="summary-row">
            <span>Részösszeg</span>
            <span>45.000 Ft</span>
          </div>
          <button className="checkout-btn">Tovább a fizetéshez</button>
          <p style={{textAlign: 'center', fontSize: '12px', marginTop: '10px'}}>Kiszállítási idő: 2-3 munkanap</p>
        </div>

      </div>
    </div>
  );
}