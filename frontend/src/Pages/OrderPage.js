import React, { useState, useEffect } from 'react';
import "../css/Order.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  
  const totalAmount = orders.reduce((sum, order) => sum + (Number(order.osszeg) || 0), 0);

 
  const discountedAmount = isApplied ? Math.round(totalAmount * 0.9) : totalAmount;

  const handleActivateGlobalCoupon = () => {
    if (couponCode.toUpperCase() === '7X4K-29QZ') {
      setIsApplied(true);
      alert("Sikeres aktiválás! 10% kedvezmény levonva a végösszegből.");
    } else {
      alert("Érvénytelen kuponkód!");
    }
  };

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
                    <img src={item.kep} alt={item.nev} style={{ width: '80px', height: 'auto', borderRadius: '6px', backgroundColor: 'white' }} onError={(e) => { e.target.src = "/no-image.png"; }} />
                    <div style={{ flex: 2 }}>
                      <div style={{ fontWeight: 'bold' }}>{item.nev}</div>
                      <div style={{ color: '#aaa', fontSize: '13px' }}>Méret: {item.valasztottMeret}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ color: '#aaa' }}>{item.quantity} db</div>
                      <div style={{ fontWeight: 'bold', color: '#00c3ff' }}>{(Number(item.ar) * item.quantity).toLocaleString()} Ft</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ color: '#ffcc00', fontWeight: 'bold' }}>Státusz: {order.statusz}</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Összesen: <span style={{ color: '#00c3ff' }}>{Number(order.osszeg).toLocaleString()} Ft</span>
                </div>
              </div>
            </div>
          ))}

        
          <div style={{ marginTop: '40px', padding: '15px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #444', display: 'flex', gap: '15px', alignItems: 'center' }}>
            {!isApplied ? (
              <>
                <input
                  type="text"
                  placeholder="Kedvezménykód aktiválása (pl. 7X4K-29QZ)..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ background: '#333', border: '1px solid #555', color: 'white', padding: '12px', borderRadius: '6px', flex: 1, fontSize: '16px' }}
                />
                <button
                  onClick={handleActivateGlobalCoupon}
                  style={{ background: '#00c3ff', color: 'black', border: 'none', padding: '12px 25px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
                >
                  AKTIVÁLÁS
                </button>
              </>
            ) : (
              <div style={{ width: '100%', textAlign: 'center', color: '#28a745', fontWeight: 'bold', fontSize: '18px' }}>
                ✓ A 10%-os kedvezményt sikeresen érvényesítettük a teljes összegre!
              </div>
            )}
          </div>

          
          <div style={{
            marginTop: '15px',
            padding: '25px',
            background: 'linear-gradient(145deg, #111, #1a1a1a)',
            borderRadius: '15px',
            border: '2px solid #00c3ff',
            textAlign: 'right',
            boxShadow: isApplied ? '0 0 20px rgba(40, 167, 69, 0.3)' : 'none'
          }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#aaa', fontWeight: 'normal' }}>
              Az összes rendelésed értéke összesen:
            </h2>

            {isApplied && (
              <div style={{ textDecoration: 'line-through', color: '#ff4444', fontSize: '18px', marginBottom: '5px' }}>
                {totalAmount.toLocaleString()} Ft
              </div>
            )}

            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#00c3ff' }}>
              {discountedAmount.toLocaleString()} Ft
            </div>
          </div>

        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '100px 20px', color: '#666' }}>
          <p>Még nincs leadott rendelésed.</p>
        </div>
      )}
    </div>
  );
}