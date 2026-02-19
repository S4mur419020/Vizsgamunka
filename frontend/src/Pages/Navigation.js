import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import "../css/Navigation.css";

export default function Navigation({ toggleSettings, isLoggedIn = false, setIsLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="nav-center">
        <Link to="/">Főoldal</Link>
        <Link to="/products">Cipőink</Link>
        <Link to="/stores">Üzleteink</Link>
      </div>

      <div className="nav-right">
        <Link to="/cart" title="Kosár" className="icon-button">
          <FaShoppingCart size={20} />
        </Link>

        <div className="user-menu" ref={userMenuRef}>
          <button
            className="icon-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUser size={20} />
          </button>

          <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="login-button" onClick={() => setIsDropdownOpen(false)}>
                  BEJELENTKEZÉS
                </Link>

                <div className="register-box">
                  Még nincs fiókod?{" "}
                  <Link to="/register" className="register-link">
                    Regisztráció
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/account" className="dropdown-item">
                  Fiókom
                </Link>
                <Link to="/orders" className="dropdown-item">
                  Rendeléseim
                </Link>
                <Link to="/discounts" className="dropdown-item">
                  Kedvezménykódok
                </Link>
                <Link to="/benefits" className="dropdown-item">
                  Előnyeim
                </Link>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item dropdown-logout" onClick={logout}>
                  Kijelentkezés
                </button>
              </>
            )}
          </div>
        </div>

        <button className="icon-button" onClick={toggleSettings}>
          <FaCog size={20} />
        </button>
      </div>
    </nav>
  );
}