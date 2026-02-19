import "../css/Order.css";

export default function OrdersPage() {
  return (
    <div className="orders-container">
      <h1>Rendeléseim</h1>

      <div className="orders-empty">
        <p><strong>Még nincs rendelésed.</strong></p>
        <p>Ha vásárolsz valamit, itt fog megjelenni.</p>
      </div>
    </div>
  );
}