import { useLanguage } from "../../context/LanguageContext";
import "../../styles/Layout.css";

export default function LanguageOnlyHeader() {
  const { lang, setLang, languages } = useLanguage();

  return (
    <div className="lang-only-header">
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
    </div>
  );
}