import React, { useState } from 'react'; 
import "../css/Discount.css";

export default function DiscountsPage() {
  const couponCode = "7X4K-29QZ";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    
    navigator.clipboard.writeText(couponCode).then(() => {
     
      setIsCopied(true);

      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Hiba a másolás során: ', err);
    });
  };

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
          <p style={{ fontWeight: 'bold' }}>{couponCode}</p>
          <p>Kód érvényesség: 3 nap</p>
        </div>

        
        <button
          className={`copy-btn ${isCopied ? 'copied' : ''}`}
          onClick={handleCopy}
          style={{
            backgroundColor: isCopied ? '#28a745' : '#00c3ff', 
            transition: 'background-color 0.3s ease'
          }}
        >
          {isCopied ? '✓ Kimásolva!' : 'Kód másolása'}
        </button>
      </div>
    </div>
  );
}