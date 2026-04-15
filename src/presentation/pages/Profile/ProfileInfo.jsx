import { useState } from "react";
export default function ProfileInfo({ user, updateUser, t }) {
  const [email, setEmail] = useState(user.email || "");
  const [username, setUsername] = useState(user.username || "");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [success, setSuccess] = useState("");
  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUser = {
      ...user,
      email,
      username,
      firstName,
      lastName,
      phone,
    };
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updateUser(updatedUser);

    setSuccess("تم حفظ المعلومات");
    setTimeout(() => setSuccess(""), 3000);
  };
  return (
    <div className="profile-section">
      <label>{t.email}<input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <label>{t.username}<input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <label>{t.first_name}<input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}/>
      </label>
      <label>{t.last_name}<input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
      </label>
      <label>{t.phone_num}<input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}/>
      </label>
      <button className="save-btn" onClick={handleSave}>{t.save_changes}</button>
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}