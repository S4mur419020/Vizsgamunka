import React, { useState, useEffect } from 'react';
import "../css/Order.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-container" style={{ padding: '20px', color: 'white', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #00c3ff', paddingBottom: '10px', color: '#00c3ff' }}>Rendeléseim</h1>

      {orders.length > 0 ? (
        <div className="orders-list" style={{ marginTop: '20px' }}>
          
          {orders.map((order) => (
            <div key={order.id} className="order-card" style={{ background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #333', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#888' }}>
                <span>Rendelésszám: <strong style={{ color: '#fff' }}>#{order.id}</strong></span>
                <span>Dátum: {order.datum}</span>
              </div>

              <div className="order-items">
                {order.termekek.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 0', borderBottom: '1px solid #222' }}>
                    <img
                      src={item.kep}
                      alt={item.nev}
                      style={{
                        width: '80px',
                        height: 'auto',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        display: 'block'
                      }}
                      onError={(e) => { e.target.src = "/no-image.png"; }}
                    />

                    <div style={{ flex: 2 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.nev}</div>
                      <div style={{ color: '#aaa', fontSize: '13px' }}>Méret: {item.valasztottMeret}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div>{item.quantity} db</div>
                      <div style={{ fontWeight: 'bold', color: '#00c3ff' }}>
                        {(Number(item.ar) * item.quantity).toLocaleString()} Ft
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div>
                  Státusz: <span style={{ color: '#ffcc00', fontWeight: 'bold' }}>{order.statusz}</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Összesen: <span style={{ color: '#00c3ff' }}>{Number(order.osszeg).toLocaleString()} Ft</span>
                </div>
              </div>
            </div>
          ))}

          
          <div style={{ 
              marginTop: '40px', 
              padding: '25px', 
              background: 'linear-gradient(145deg, #111, #1a1a1a)', 
              borderRadius: '15px', 
              border: '2px solid #00c3ff',
              textAlign: 'right',
              boxShadow: '0 4px 15px rgba(0, 195, 255, 0.2)'
          }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#aaa', fontWeight: 'normal' }}>
                  Az összes eddigi rendelésed értéke:
              </h2>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#00c3ff' }}>
                  {orders.reduce((sum, order) => sum + (Number(order.osszeg) || 0), 0).toLocaleString()} Ft
              </div>
          </div>

        </div> 
      ) : (
        
        <div className="orders-empty" style={{ textAlign: 'center', padding: '100px 20px', color: '#666' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>📦</div>
          <p><strong>Még nincs leadott rendelésed.</strong></p>
        </div>
      )}
    </div>
  );
}