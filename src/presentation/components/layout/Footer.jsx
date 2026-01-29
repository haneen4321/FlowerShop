import { Link } from "react-router-dom";
import "../../styles/Layout.css";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;

  return (
    <footer className="footer">
      <div className="footer__content">
        {/* About */}
        <div className="footer__section">
          <h3>
            <span className="logo-accent">Flower</span> Shop
          </h3>
          <p>{t.aboutText1}</p>
          <p>{t.aboutText2}</p>
        </div>

        {/* Links */}
        <div className="footer__section">
          <h4>{t.linksTitle}</h4>
          <ul className="footer__links">
            <li>
              <Link to="/">{t.home}</Link>
            </li>
            <li>
              <Link to="/shop">{t.shop}</Link>
            </li>
            <li>
              <Link to="/about">{t.about}</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__section">
          <h4>{t.contactTitle}</h4>
          <p>📍 {t.addresss}</p>
          <p>✉️ {t.email}</p>
          <p>📞 {t.phone}</p>
        </div>
      </div>
    </footer>
  );
}