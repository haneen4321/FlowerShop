import { Link, useLocation } from "react-router-dom";
import "../../styles/Layout.css";
import { useLanguage } from "../../context/LanguageContext";

export default function Header() {
  const { lang, setLang, languages, translations } = useLanguage();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <header className="header">
      {/* ❌ لا نعرض الشعار والتنقل في صفحات auth */}
      {!isAuthPage && (
        <>
          <div className="header__logo">
            <span className="logo-accent">Flower</span> Shop
          </div>

          <nav className="header__nav">
            <Link to="/">{translations.header.home}</Link>
            <Link to="/shop">{translations.header.shop}</Link>
            <Link to="/about">{translations.header.about}</Link>
          </nav>
        </>
      )}

      {/* ✅ اللغة تظهر دائمًا */}
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
            <Link to="/profile">👤</Link>
            <Link to="/cart">🛒</Link>
          </>
        )}
      </div>
    </header>
  );
}