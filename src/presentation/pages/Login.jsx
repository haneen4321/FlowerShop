import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageOnly from "../components/layout/LanguageOnly";
import "../styles/auth.css";
import "../styles/global.css";
export default function Login() {
  const { translations } = useLanguage();
  const t = {
    ...translations.global,
    ...translations.buttons,
    ...translations.auth,
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username);
    if (!user) {
      setLoginError(t.invalid_username); // اسم المستخدم غير موجود
      return;
    }
    if (user.password !== password) {
      setLoginError(t.invalid_password); // كلمة المرور غير صحيحة
      return;
    }
    setLoginError("");
    login(user);
    navigate("/profile");
  };
  return (
    <div className="auth-wrapper">
      {/* 🌍 Language Selector */}
      <div className="auth-lang">
        <LanguageOnly />
      </div>
      <div className="auth-container">
        <div className="auth-form">
          <Link to="/" className="back-home">🏠 {t.back_to_home}</Link>
          <p className="subtitle">{t.login_subtitle}</p>
          <input
            placeholder={t.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          {loginError && <p className="error-text">{loginError}</p>}
          <button className="auth-btn" onClick={handleLogin}>{t.login}</button>
          <div className="auth-footer">
            {t.no_account} <Link to="/register">{t.register}</Link>
          </div>
        </div>
        <div
          className="auth-image"
          style={{ backgroundImage: "url(/images/auth/login.png)" }}/>
      </div>
    </div>
  );
}