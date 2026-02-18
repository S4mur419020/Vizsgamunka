import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import "../css/Navigation.css";

export default function Navigation({ toggleSettings }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">Főoldal</Link>
      <Link to="/products">Cipőink</Link>
      <Link to="/stores">Üzleteink</Link>

      <Link to="/cart" title="Kosár">
        <FaShoppingCart size={20} />
      </Link>

      <div className="user-menu" ref={userMenuRef}>
        <FaUser
          size={20}
          title="Bejelentkezés"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />

        {isDropdownOpen && (
          <div className="dropdown">
            <Link to="/login" className="login-button">
              BEJELENTKEZÉS
            </Link>

            <div className="register-box">
              Még nincs fiókod?{" "}
              <Link to="/register" className="register-link">
                Regisztráció
              </Link>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={toggleSettings}
        title="Beállítások"
        className="settings-button"
      >
        <FaCog size={20} />
      </button>
    </nav>
  );
}
