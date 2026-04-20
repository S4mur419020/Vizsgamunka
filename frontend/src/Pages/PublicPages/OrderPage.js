import React, { useState, useEffect } from 'react';
import "../../css/PublicCss/Order.css";
import useTranslation from '../../i18n/useTranslation';
import { myAxios } from '../../services/api';

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
            {orders.map((order) => {
              const subTotal = order.tetel 
                ? order.tetel.reduce((sum, item) => {
                    const price = Number(item.ar || item.termek?.ar || 0);
                    const qty = Number(item.mennyiseg || 0);
                    return sum + (price * qty);
                  }, 0)
                : 0;
              
              const hasDiscount = subTotal > Number(order.osszeg) + 10;

              return (
                <div key={order.rendeles_id} className="order-card">
                  <div className="order-header">
                    <span>{t('orders.number')}: <strong>#{order.rendeles_id}</strong></span>
                    <span>{t('orders.date')}: {new Date(order.datum).toLocaleDateString()}</span>
                  </div>

                  <div className="order-items">
                    {order.tetel && order.tetel.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <img
                          className="order-item-image"
                          src={item.termek?.kepUrl
                            ? `/kepek/${item.termek.kepUrl}`
                            : `/kepek/default.png`
                          }
                          alt={item.termek?.nev || 'Cipő'}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/kepek/default.png";
                          }}
                        />
                        <div className="order-item-details">
                          <span className="order-item-name">
                            {item.termek?.nev || item.termek_nev || 'Ismeretlen termék'}
                          </span>
                          <span className="order-item-price">
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
                    
                    <div className="total-info" style={{ textAlign: 'right' }}>
                      {hasDiscount && (
                        <div className="discount-tag" style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '2px' }}>
                          -10% Kedvezmény felasználva
                        </div>
                      )}
                      <div className="total">
                        <strong>{t('orders.total')}:</strong> {Number(order.osszeg).toLocaleString()} Ft
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="total-summary">
            <h2>Összesen elköltött összeg:</h2>
            <div className="grand-total">
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