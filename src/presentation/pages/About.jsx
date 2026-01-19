import "../styles/global.css";
import "../styles/about.css";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { translations } = useLanguage();
  const about = translations.about;

  return (
    <div className="about-page">
      <h1 className="about-title">{about.title}</h1>

      <p className="about-text">{about.intro}</p>

      <section className="about-section">
        <h2>{about.missionTitle}</h2>
        <p>{about.missionText}</p>
      </section>

      <section className="about-section">
        <h2>{about.visionTitle}</h2>
        <p>{about.visionText}</p>
      </section>

      <section className="about-section">
        <h2>{about.goalsTitle}</h2>
        <ul>
          {about.goals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}