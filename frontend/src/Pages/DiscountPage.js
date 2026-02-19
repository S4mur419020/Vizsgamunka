import "../css/Discount.css";

export default function DiscountsPage() {
  return (
    <div className="discounts-container">
      <h1>Kedvezménykódok</h1>

      <div className="discount-card">
        <div className="discount-info">
          <h3>10% kedvezmény</h3>
          <p>Akár a következő rendelésedre</p>
        </div>

        <button className="copy-btn">Kód másolása</button>
      </div>
    </div>
  );
}