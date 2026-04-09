import { Link } from "react-router-dom";
import "../../styles/layout.css";
import { useLanguage } from "../../context/LanguageContext";
export default function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;
  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="footer_section">
          <img className="logo" src="/images/flower-shop-logo-dark.png" alt="Flower Shop Logo" />
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>
        <div className="footer_section">
          <h4>{t.contact}</h4>
          <p>✉️ support@flowers.com</p>
          <p>📞 +1 236 5489</p>
        </div>
      </div>
    </footer>
  );
}