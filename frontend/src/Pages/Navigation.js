import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../css/Navigation.css";
import useTranslation from "../i18n/useTranslation";

export default function Navigation({ toggleSettings, isLoggedIn = false, setIsLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 
  const userName = user ? user.nev : null; 

  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout(); 
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">{t("nav.home")}</Link>
        <Link to="/products">{t("nav.products")}</Link>
        <Link to="/stores">{t("nav.stores")}</Link>
      </div>
      <div className="nav-right">
        <Link to="/cart" title={t("nav.cart")} className="icon-button">
          <FaShoppingCart size={20} />
        </Link>
        <div className="user-menu" ref={userMenuRef}>
          <button
            className="icon-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUser size={20} />
            {isLoggedIn && <span className="user-name">{userName}</span>}
          </button>

          <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="login-button" onClick={() => setIsDropdownOpen(false)}>
                  {t("nav.login")}
                </Link>

                <div className="register-box">
                  {t("nav.noAccount")}{" "}
                  <Link to="/register" className="register-link">
                    {t("nav.register")}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="dropdown-header">{userName || t("nav.account")}</div>

                <Link to="/account/profile" className="dropdown-item">{t("nav.profile")}</Link>
                <Link to="/account/password" className="dropdown-item">{t("nav.passwordChange")}</Link>
                <Link to="/account/addresses" className="dropdown-item">{t("nav.addresses")}</Link>

                <div className="dropdown-divider"></div>

                <Link to="/account/orders" className="dropdown-item">{t("nav.orders")}</Link>
                <Link to="/account/discounts" className="dropdown-item">{t("nav.discounts")}</Link>
                <Link to="/account/benefits" className="dropdown-item">{t("nav.benefits")}</Link>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                  {t("nav.logout")}
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