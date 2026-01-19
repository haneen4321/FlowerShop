import { Link } from "react-router-dom";
import "../../styles/Layout.css";
import { useLanguage } from "../../context/LanguageContext";

export default function Header() {
  const { lang, setLang, languages, translations } = useLanguage();

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <span className="logo-accent">Flower</span> Shop
      </div>

      {/* Navigation */}
      <nav className="header__nav">
        <Link to="/">{translations.header.home}</Link>
        <Link to="/shop">{translations.header.shop}</Link>
        <Link to="/about">{translations.header.about}</Link>
      </nav>

      {/* Icons + Language selector */}
      <div className="header__icons">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="lang-select"
          aria-label="Select language"
        >
          {Object.entries(languages).map(([code, info]) => (
            <option key={code} value={code}>
              {info.label}
            </option>
          ))}
        </select>

        <Link to="/profile">👤</Link>
        <Link to="/cart">🛒</Link>
      </div>
    </header>
  );
}