import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../../layouts/PublicLayout";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const role = login(username, password);

    if (!role) {
      alert("Sai tài khoản hoặc mật khẩu!");
      return;
    }

    if (role === "admin") navigate("/admin");
    else if (role === "staff") navigate("/staff");
    else navigate("/");
  };

  return (
    <PublicLayout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>ĐĂNG NHẬP</h2>

          <input
            type="text"
            placeholder="Tên đăng nhập"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={handleLogin}>
            Đăng nhập
          </button>

          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Chưa có tài khoản?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/register")}
            >
              Đăng ký
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

export default Login;