import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "../styles/profile.css";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { translations } = useLanguage();
  const t = translations.profile;

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔒 حماية الصفحة + تحميل البيانات
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user, navigate]);

  if (!user) return null;

  // حفظ بيانات الحساب
  const handleSaveProfile = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = {
      ...user,
      email,
      username,
    };

    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updateUser(updatedUser);

    alert("Profile updated successfully ✅");
  };

  // تغيير كلمة المرور
  const handleChangePassword = () => {
    if (currentPassword !== user.password) {
      alert("Current password is incorrect");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = {
      ...user,
      password: newPassword,
    };

    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updateUser(updatedUser);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    alert("Password updated successfully 🔐");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <h2>{t.title}</h2>

          <div className="profile-tabs">
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              {t.tabProfile}
            </button>
            <button
              className={activeTab === "password" ? "active" : ""}
              onClick={() => setActiveTab("password")}
            >
              {t.tabPassword}
            </button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="profile-section">
            <label>
              {t.email}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              {t.username}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <button className="save-btn" onClick={handleSaveProfile}>
              {t.saveChanges}
            </button>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="profile-section">
            <label>
              {t.currentPassword}
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>

            <label>
              {t.newPassword}
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>

            <label>
              {t.confirmPassword}
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            <button className="save-btn" onClick={handleChangePassword}>
              {t.updatePassword}
            </button>
          </div>
        )}

        {/* Logout */}
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          {t.logout}
        </button>
      </div>
    </div>
  );
}