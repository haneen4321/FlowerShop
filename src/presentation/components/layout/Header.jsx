import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Layout.css";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { lang, setLang, languages, translations } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const t = translations.header;

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <header className="header">
      {!isAuthPage && (
        <>
          <div className="header__logo">
            <span className="logo-accent">Flower</span> Shop
          </div>

          <nav className="header__nav">
            <Link to="/">{t.home}</Link>
            <Link to="/shop">{t.shop}</Link>
            <Link to="/about">{t.about}</Link>
          </nav>
        </>
      )}

      <div className="header__icons">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="lang-select"
        >
          {Object.entries(languages).map(([code, info]) => (
            <option key={code} value={code}>
              {info.label}
            </option>
          ))}
        </select>

        {!isAuthPage && (
          <>
            {user && (
              <div className="user-menu">
                <button
                  className="user-icon"
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  👤
                </button>

                {showMenu && (
                  <div className="header-dropdown">
                    <Link
                      to="/profile"
                      className="header-option"
                      onClick={() => setShowMenu(false)}
                    >
                      {t.profile}
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="header-option"
                    >
                      {t.logout}
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link to="/cart">🛒</Link>
          </>
        )}
      </div>
    </header>
  );
}