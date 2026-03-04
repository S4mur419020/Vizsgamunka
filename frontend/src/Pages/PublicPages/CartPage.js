import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PublicCss/Cart.css';
import { myAxios } from '../../services/api';
import useAuthContext from '../../context/AuthContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await myAxios.get('/api/kosar');
        const loggedInUserId = user?.felhasznalo_id || user?.id;
        const myCart = response.data.filter(item => item.felhasznalo_id === loggedInUserId);

        setCartItems(myCart);
      } catch (error) {
        console.error("Hiba a kosár lekérésekor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  
  const handleRemove = async (kosarId) => {
    try {
      
      await myAxios.delete(`/api/kosar/${kosarId}`);

      
      setCartItems(prevItems => prevItems.filter(item => item.kosar_id !== kosarId));

      console.log("Sikeres törlés ID:", kosarId);
    } catch (error) {
      console.error("Törlési hiba részletei:", error.response?.data);
      alert("Hiba történt a törlés során!");
    }
  };

 
  const subtotal = cartItems.reduce((acc, item) => {
    const ar = item.termek?.ar || 0;
    return acc + (Number(ar) * item.mennyiseg);
  }, 0);

  const discountAmount = isApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === '7X4K-29QZ') {
      setIsApplied(true);
      alert("Sikeres aktiválás! 10% kedvezmény levonva.");
    } else {
      alert("Érvénytelen kuponkód!");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Üres a kosarad!");
    navigate("/checkout");
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Betöltés...</div>;

  return (
    <div className="cart-page-container" style={{ display: 'flex', padding: '40px', gap: '40px', color: 'white', background: '#000', minHeight: '100vh' }}>
      <div className="cart-items-section" style={{ flex: 2 }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.kosar_id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 0', borderBottom: '1px solid #222' }}>
              <img
                src={item.termek?.kepUrl ? `/kepek/${item.termek.kepUrl}` : "/no-image.png"}
                alt={item.termek?.nev}
                style={{ width: '100px', borderRadius: '8px', background: 'white' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{item.termek?.nev}</h3>
                <p style={{ color: '#888', margin: '5px 0' }}>Méret: {item.meret_id}</p>
                <button
                  onClick={() => handleRemove(item.kosar_id)}
                  style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}
                >
                  Eltávolítás
                </button>
              </div>
              <div style={{ fontWeight: 'bold' }}>{item.mennyiseg} db</div>
              <div style={{ fontWeight: 'bold' }}>{Number(item.termek?.ar || 0).toLocaleString()} Ft</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#666' }}>A kosarad még üres.</div>
        )}
      </div>
      <div className="cart-summary-section" style={{ flex: 1 }}>
        <div style={{ border: '1px solid #333', padding: '30px', borderRadius: '4px', position: 'sticky', top: '20px' }}>
          <h2 style={{ textAlign: 'center', marginTop: 0, fontSize: '24px' }}>Összesen:</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', color: '#ccc' }}>
            <span>Részösszeg:</span>
            <span>{subtotal.toLocaleString()} Ft</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {!isApplied ? (
              <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                <input
                  type="text"
                  placeholder="Kuponkód..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ background: '#000', border: '1px solid #444', color: 'white', padding: '12px', borderRadius: '4px' }}
                />
                <button onClick={handleApplyCoupon} style={{ background: '#111', border: '1px solid #444', color: 'white', padding: '10px', cursor: 'pointer', fontSize: '12px' }}>
                  Kupon aktiválása
                </button>
              </div>
            ) : (
              <div style={{ background: '#1a1a1a', padding: '10px', borderRadius: '4px', color: '#28a745', fontSize: '13px', textAlign: 'center', border: '1px solid #28a745' }}>
                ✓ 10% kedvezmény aktiválva
              </div>
            )}
          </div>

          {isApplied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', marginBottom: '15px', fontSize: '14px' }}>
              <span>Kedvezmény:</span>
              <span>- {discountAmount.toLocaleString()} Ft</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', borderTop: '1px solid #333', paddingTop: '20px' }}>
            <span>Fizetendő:</span>
            <span>{finalTotal.toLocaleString()} Ft</span>
          </div>

          <button
            onClick={handleCheckout}
            style={{ width: '100%', background: 'transparent', border: '1px solid white', color: 'white', padding: '15px', marginTop: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            Tovább a fizetéshez
          </button>
        </div>
      </div>
    </div>
  );
}