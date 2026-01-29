import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "../styles/auth.css";

export default function Register() {
  const { translations } = useLanguage();
  const t = translations.auth;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !username || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.username === username)) return;

    const newUser = {
      id: Date.now(),
      email,
      username,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    login(newUser);
    navigate("/profile");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-form">
          <Link to="/" className="back-home">
            🏠 {t.backToHome}
          </Link>

          <h1>{t.registerTitle}</h1>
          <p className="subtitle">{t.registerSubtitle}</p>

          <input
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder={t.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" onClick={handleRegister}>
            {t.registerButton}
          </button>

          <div className="auth-footer">
            {t.haveAccount} <Link to="/login">{t.loginButton}</Link>
          </div>
        </div>

        <div
          className="auth-image"
          style={{ backgroundImage: "url(/images/auth/register.png)" }}
        />
      </div>
    </div>
  );
}