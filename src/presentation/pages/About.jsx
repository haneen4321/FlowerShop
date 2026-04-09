import { useLanguage } from "../context/LanguageContext";
import "../styles/global.css";
export default function About() {
  const { translations } = useLanguage();
  const t = {...translations.global, ...translations.about,};
  return (
      <div className="page">
      <h1>{t.about}</h1>
      <p>{t.intro}</p>
      <section>
        <h2>{t.mission_title}</h2>
        <p>{t.mission_text}</p>
      </section>
      <section>
        <h2>{t.vision_title}</h2>
        <p>{t.vision_text}</p>
      </section>
      <section>
        <h2>{t.goals_title}</h2>
        <ul>{t.goals_text.map((goal, index) => (<li key={index}>{goal}</li>))}</ul>
      </section>
    </div>
  );
}