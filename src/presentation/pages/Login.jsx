import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "../styles/auth.css";

export default function Login() {
  const { translations } = useLanguage();
  const t = translations.auth;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // ✅ جديد

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setLoginError(t.invalidCredentials);
      return;
    }

    setLoginError("");
    login(user);
    navigate("/profile");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-form">
          <Link to="/" className="back-home">
            🏠 {t.backToHome}
          </Link>

          <h1>{t.loginTitle}</h1>
          <p className="subtitle">{t.loginSubtitle}</p>

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

          {loginError && (
            <p className="error-text">
              {loginError}
            </p>
          )}

          <button className="auth-btn" onClick={handleLogin}>
            {t.loginButton}
          </button>

          <div className="auth-footer">
            {t.noAccount} <Link to="/register">{t.registerButton}</Link>
          </div>
        </div>

        <div
          className="auth-image"
          style={{ backgroundImage: "url(/images/auth/login.png)" }}
        />
      </div>
    </div>
  );
}