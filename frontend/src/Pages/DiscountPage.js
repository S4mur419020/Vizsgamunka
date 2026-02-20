import "../css/Discount.css";

export default function DiscountsPage() {
  return (
    <div className="discounts-container">
      <h1>Kedvezménykódok</h1>

      <div className="discount-card">
        <div className="discount-info">
          <h3>10% kedvezmény</h3>
          <p>Akár a következő rendelésedre</p>
          <p>Használd a kedvezménykódot a rendelés első lépésében.</p>
        </div>
        <div className="dicount-code">
            <p>7X4K-29QZ</p>
            <p>Kód érvényesség: 3 nap</p>
        </div>
        <button className="copy-btn">Kód másolása</button>
      </div>
    </div>
  );
}