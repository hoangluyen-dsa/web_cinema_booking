import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../../layouts/PublicLayout";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!username || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const success = register(username, email, password);

    if (!success) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <PublicLayout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>ĐĂNG KÝ</h2>

          <input
            type="text"
            placeholder="Tên đăng nhập"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={handleRegister}>
            Đăng ký
          </button>

          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Đã có tài khoản?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 0",
  },
  card: {
    background: "#1c1c1c",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 0 20px rgba(229,9,20,0.4)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#e50914",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #444",
    background: "#2a2a2a",
    color: "white",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#e50914",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  link: {
    color: "#e50914",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Register;