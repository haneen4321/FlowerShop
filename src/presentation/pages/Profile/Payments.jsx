import { useState } from "react";
export default function Payments({ user, updateUser, t }) {
  const [paymentMethods, setPaymentMethods] = useState(
    user.paymentMethods || [""]
  );
  const [success, setSuccess] = useState("");
  const handleChange = (index, value) => {
    const newMethods = [...paymentMethods];
    newMethods[index] = value;
    setPaymentMethods(newMethods);
  };

  const addMethod = () => setPaymentMethods([...paymentMethods, ""]);
  const removeMethod = (index) =>
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUser = { ...user, paymentMethods };
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    updateUser(updatedUser);
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="profile-section">
      <h3>طرق الدفع</h3>
      {paymentMethods.map((method, index) => (
        <div key={index} className="payment-row">
          <input
            type="text"
            value={method}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`طريقة الدفع ${index + 1}`}/>
          <button className="save-btn" onClick={() => removeMethod(index)}>حذف</button>
        </div>
      ))}
      <button className="save-btn" onClick={addMethod}>إضافة طريقة دفع</button>
      <button className="save-btn" onClick={handleSave}>{t.save_changes}</button>
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}