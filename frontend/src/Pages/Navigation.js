import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaGift } from 'react-icons/fa';
import '../css/Navigation.css';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //a return elött rész csak az eltüntetés csinálj, hogy ne csak az ikonra kattintva tünjön el a bejelentkezés
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray", display: "flex", alignItems: "center", gap: "15px" }}>
      <Link to="/">Főoldal</Link>
      <Link to="/products">Cipőink</Link>
      <Link to="/stores">Üzleteink</Link>
      
      <Link to="/cart" title="Kosár">
        <FaGift size={20} />
      </Link>

      <div className="user-menu" ref={userMenuRef}>
        <FaUser
          size={20}
          title="Bejelentkezés"
          onClick={() => setIsDropdownOpen(prev => !prev)}
          style={{ cursor: 'pointer' }}
        />

        {isDropdownOpen && (
          <div className="dropdown">
            <Link to="/login" className="login-button">
              BEJELENTKEZÉS
            </Link>

            <div className="register-box">
              <span>Még nincs fiókod? </span>
              <Link to="/register" className="register-link">
                Regisztráció
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link to="/settings" title="Beállítások">
        <FaCog size={20} />
      </Link>


    </nav>
  );
}
