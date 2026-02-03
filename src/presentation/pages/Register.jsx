import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "../styles/auth.css";

// ✅ Email validation helper
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function Register() {
  const { translations } = useLanguage();
  const t = translations.auth;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    // 🔴 تحقق من الحقول الفارغة
    if (!email || !username || !password) return;

    // 🔴 تحقق من صحة البريد
    if (!isValidEmail(email)) {
      setEmailError(t.invalidEmail);
      return;
    }

    setEmailError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔴 تحقق من تكرار اسم المستخدم
    if (users.some((u) => u.username === username)) {
      setUsernameError(t.usernameTaken);
      return;
    }

    setUsernameError("");

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
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-text">{emailError}</p>}

          <input
            placeholder={t.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p className="error-text">{usernameError}</p>}

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