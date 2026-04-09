import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import ProfileInfo from "./ProfileInfo";
import Password from "./Password";
import Addresses from "./Addresses";
import Payments from "./Payments";
import "../../styles/profile.css";
export default function Profile() {
  const { user, updateUser } = useAuth();
  const { translations } = useLanguage();
  const t = {
    ...translations.global,
    ...translations.profile,
    ...translations.buttons,
  };
  const [activeTab, setActiveTab] = useState("profile");
  if (!user) return null;
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-tabs">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}>
            {t.profile}
          </button>

          <button
            className={activeTab === "password" ? "active" : ""}
            onClick={() => setActiveTab("password")}>
            {t.password}
          </button>
          <button
            className={activeTab === "addresses" ? "active" : ""}
            onClick={() => setActiveTab("addresses")}>
            {t.addresses}
          </button>
          <button
            className={activeTab === "payments" ? "active" : ""}
            onClick={() => setActiveTab("payments")}>
            {t.payments}
          </button>
        </div>
        {activeTab === "profile" && (
          <ProfileInfo user={user} updateUser={updateUser} t={t} />
        )}
        {activeTab === "password" && (
          <Password user={user} updateUser={updateUser} t={t} />
        )}
        {activeTab === "addresses" && (
          <Addresses user={user} updateUser={updateUser} t={t} />
        )}
        {activeTab === "payments" && (
          <Payments user={user} updateUser={updateUser} t={t} />
        )}
      </div>
    </div>
  );
}