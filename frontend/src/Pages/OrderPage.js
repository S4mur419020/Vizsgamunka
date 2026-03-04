import React, { useState, useEffect } from 'react';
import "../css/Order.css";
import useTranslation from "../i18n/useTranslation";
import { myAxios } from "../services/api"; 

export default function OrderPage() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    myAxios.get('/api/rendelesek') 
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Hiba a rendelések lekérésekor:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Betöltés...</div>;

  const totalSpent = Array.isArray(orders) 
    ? orders.reduce((sum, order) => sum + Number(order.osszeg || 0), 0) 
    : 0;

  return (
    <div className="orders-container">
      <h1 className="order-title">{t('orders.title')}</h1>

      {orders.length > 0 ? (
        <>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.rendeles_id} className="order-card">
                <div className="order-header">
                  <span>{t('orders.number')}: <strong>#{order.rendeles_id}</strong></span>
                  <span>{t('orders.date')}: {new Date(order.datum).toLocaleDateString()}</span>
                </div>

               
                <div className="order-items">
                  {order.tetel && order.tetel.map((item, index) => (
                    <div key={index} className="order-item-row" style={{ display: 'flex', alignItems: 'center', margin: '15px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                      <img 
                        
                        src={`/kepek/${item.termek?.kepUrl || 'default.png'}`} 
                        alt={item.termek_nev} 
                        style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px", marginRight: "15px" }}
                        onError={(e) => { e.target.src = "/kepek/default.png"; }}
                      />
                      <div className="order-item-details">
                        <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.termek_nev}</span>
                        
                        <span style={{ color: '#ccc' }}>
                          {item.mennyiseg} db x {Number(item.ar || item.termek?.ar || 0).toLocaleString()} Ft
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="status">
                    <strong>{t('orders.status')}:</strong> {order.allapot}
                  </div>
                  <div className="total">
                    <strong>{t('orders.total')}:</strong> {Number(order.osszeg).toLocaleString()} Ft
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-summary" style={{ marginTop: '30px', textAlign: 'center', padding: '20px', background: '#1a1a1a', borderRadius: '10px' }}>
            <h2>Összesen elköltött összeg:</h2>
            <div className="grand-total" style={{ fontSize: '2rem', color: '#007bff', fontWeight: 'bold' }}>
                {totalSpent.toLocaleString()} Ft
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>{t('orders.empty')}</p>
        </div>
      )}
    </div>
  );
}