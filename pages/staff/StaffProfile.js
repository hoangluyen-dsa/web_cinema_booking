import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function StaffProfile() {
  const { user, updateProfile, changePassword } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  return (
    <div style={cardStyle}>
      <h2>Thông tin tài khoản</h2>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <button
        style={btnStyle}
        onClick={() => updateProfile({ email })}
      >
        Cập nhật thông tin
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h3>Đổi mật khẩu</h3>

      <input
        type="password"
        placeholder="Mật khẩu cũ"
        onChange={(e) => setOldPass(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Mật khẩu mới"
        onChange={(e) => setNewPass(e.target.value)}
        style={inputStyle}
      />

      <button
        style={btnStyle}
        onClick={() => changePassword(oldPass, newPass)}
      >
        Đổi mật khẩu
      </button>
    </div>
  );
}

const cardStyle = {
  background: "#0b1220",
  padding: "40px",
  borderRadius: "20px",
  maxWidth: "600px",
  margin: "auto",
  color: "white",
  boxShadow: "0 0 40px rgba(255,0,0,0.3)",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  width: "100%",
  marginBottom: "10px",
};

const btnStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default StaffProfile;
