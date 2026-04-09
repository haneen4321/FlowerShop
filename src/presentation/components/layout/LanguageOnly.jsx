import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/language.css";
export default function LanguageOnly() {
  const { lang, setLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages[lang];
  return (
    <div className="wrapper">
      <div className="lang-selected box" onClick={() => setOpen(!open)}>
        <img src={current.image} alt={current.label} />
        <span>{current.label}</span>
      </div>
      {open && (
        <div className="lang-dropdown box">
          {Object.entries(languages).map(([code, info]) => (
            <div key={code} className="lang-selected" onClick={() => {setLang(code); setOpen(false);}}>
              <img src={info.image} alt={info.label}/>
              <span>{info.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}