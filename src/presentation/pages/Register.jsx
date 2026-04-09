import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import {
  isValidEmail,
  isValidPassword,
  getPasswordRequirements,
} from "../components/validation";
import LanguageOnly from "../components/layout/LanguageOnly";
import "../styles/auth.css";

export default function Register() {
  const { translations } = useLanguage();
  const t = {
    ...translations.global,
    ...translations.buttons,
    ...translations.auth,
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordRules = getPasswordRequirements(password);

  const handleRegister = () => {
    if (!email || !username || !password) return;

    if (!isValidEmail(email)) {
      setEmailError(t.invalid_email);
      return;
    }
    setEmailError("");

    if (!isValidPassword(password)) {
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.username === username)) {
      setUsernameError(t.username_taken);
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
      <div className="auth-lang">
        <LanguageOnly />
      </div>

      <div className="auth-container">
        <div className="auth-form">
          <Link to="/" className="back-home">
            🏠 {t.back_to_home}
          </Link>

          <h1>{t.registerTitle}</h1>
          <p className="subtitle">{t.register_subtitle}</p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p className="error-text">{emailError}</p>}

          {/* USERNAME */}
          <input
            placeholder={t.username}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError("");
            }}
          />
          {usernameError && (
            <p className="error-text">{usernameError}</p>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 🔥 Password Requirements */}
          {password && (
            <div className="password-rules">
              {!passwordRules.minLength && (
                <p>{t.role_1}</p>
              )}

              {!passwordRules.hasUpperCase && (
                <p>{t.role_2}</p>
              )}

              {!passwordRules.hasLowerCase && (
                <p>{t.role_3}</p>
              )}

              {!passwordRules.hasNumber && (
                <p>{t.role_4}</p>
              )}
            </div>
          )}

          <button className="auth-btn" onClick={handleRegister}>
            {t.register}
          </button>

          <div className="auth-footer">
            {t.have_account}{" "}
            <Link to="/login">{t.login}</Link>
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