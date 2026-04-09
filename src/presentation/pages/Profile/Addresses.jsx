import { useState } from "react";

export default function Addresses({ user, updateUser, t }) {
  const [addresses, setAddresses] = useState(user.addresses || [""]);
  const [success, setSuccess] = useState("");

  const handleChange = (index, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const addAddress = () => setAddresses([...addresses, ""]);

  const removeAddress = (index) =>
    setAddresses(addresses.filter((_, i) => i !== index));

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = { ...user, addresses };

    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updateUser(updatedUser);

    setSuccess("تم حفظ العناوين ✅");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="profile-section">
      <h3>عناوينك</h3>

      {addresses.map((addr, index) => (
        <div key={index} className="address-row">
          <input
            type="text"
            value={addr}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`العنوان ${index + 1}`}
          />
          <button onClick={() => removeAddress(index)}>حذف</button>
        </div>
      ))}

      <button onClick={addAddress}>إضافة عنوان جديد</button>

      <button className="save-btn" onClick={handleSave}>{t.save_changes}</button>

      {success && <p className="success-message">{success}</p>}
    </div>
  );
}