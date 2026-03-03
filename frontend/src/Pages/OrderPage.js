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
    ? orders.reduce((sum, order) => sum + Number(order.ar), 0) 
    : 0;

  return (
    <div className="orders-container">
      <h1 className="order-title">{t('orders.title')}</h1>

      {orders.length > 0 ? (
        <>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span>{t('orders.number')}: <strong>#{order.id}</strong></span>
                  <span>{t('orders.date')}: {new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div className="order-footer">
                  <div className="status">{t('orders.status')}: {t(`orders.${order.statusz}`)}</div>
                  <div className="total">{t('orders.total')}: {Number(order.osszeg).toLocaleString()} Ft</div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-summary">
            <h2>{t('orders.all_total') || "Összes rendelésed:"}</h2>
            <div className="grand-total">{totalSpent.toLocaleString()} Ft</div>
          </div>
        </>
      ) : (
        <div className="empty-state"><p>{t('orders.empty')}</p></div>
      )}
    </div>
  );
}