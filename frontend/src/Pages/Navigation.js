import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaShoppingBag } from 'react-icons/fa';

export default function Navigation({ toggleSettings, toggleLogin }) {
  const userMenuRef = useRef(null);

  // Ha kell, itt lehet handleClickOutside, ami toggleLogin-t hívja
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        // toggleLogin(false) vagy valami állapotkezelés
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav style={{ padding: "10px", display: "flex", gap: "15px", alignItems: "center" }}>
      <Link to="/">Főoldal</Link>
      <Link to="/products">Cipőink</Link>
      <Link to="/stores">Üzleteink</Link>

      <Link to="/cart"><FaShoppingBag size={20} /></Link>

      <div ref={userMenuRef} className="user-menu">
        <FaUser size={20} style={{ cursor: 'pointer' }} onClick={toggleLogin} />
      </div>

      <button
        onClick={toggleSettings}
        title="Beállítások"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <FaCog size={20} />
      </button>
    </nav>
  );
}
