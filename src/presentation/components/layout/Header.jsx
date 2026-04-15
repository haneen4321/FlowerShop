import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/layout.css";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import LanguageOnly from "./LanguageOnly";
export default function Header() {
  const { translations } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // 👈 مهم
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const t = { ...translations.global };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },
  []);
  return (
    <header className="header">
      {!isAuthPage && (
        <>
          <Link to="/" className="logo-wrapper">
            <img
              className="logo"
              src="/images/flower-shop-logo-light.png"
              alt="Flower Shop Logo"
            />
          </Link>
          <nav className="pages-nav">
            <Link to="/">{t.home}</Link>
            <Link to="/shop">{t.shop}</Link>
            <Link to="/about">{t.about}</Link>
          </nav>
        </>
      )}

      <div className="header-icons">
        <LanguageOnly />

        {!isAuthPage && (
          <>
            {user ? (
              <div className="user-menu" ref={menuRef}>
                <button
                  className="btn-text btn-secondary"
                  onClick={() => setShowMenu((prev) => !prev)}>👤</button>
                {showMenu && (
                  <div className="header-dropdown box">
                    <Link to="/profile" className="header-option"> {t.profile}</Link>
                    <button onClick={handleLogout} className="header-option">{t.logout}</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn-text btn-secondary" onClick={() => navigate("/login")}>👤</button>
            )}
            <button className="btn-text btn-secondary" onClick={() => navigate("/cart")}>🛒</button>
          </>
        )}
      </div>
    </header>
  );
}