import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const menuButtonStyle = {
    display: "block",
    backgroundColor: "#ff0000",
    color: "white",
    padding: "12px",
    margin: "15px auto",
    width: "80%",
    textAlign: "center",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#0b0f19",
        paddingTop: "20px",
        position: "fixed",
        left: 0,
        top: 0
      }}
    >
      <h2 style={{ color: "red", textAlign: "center" }}>
        🎬 RẠP PHIM
      </h2>

      {role === "admin" && (
        <>
          <Link to="/admin/movies" style={menuButtonStyle}>Phim</Link>
          <Link to="/admin/cinema" style={menuButtonStyle}>Rạp</Link>
          <Link to="/admin/rooms" style={menuButtonStyle}>Phòng chiếu</Link>
          <Link to="/admin/schedule" style={menuButtonStyle}>Lịch chiếu</Link>
          <Link to="/admin/tickets" style={menuButtonStyle}>Bán vé</Link>
          <Link to="/admin/staff" style={menuButtonStyle}>Nhân sự</Link>
          <Link to="/admin/customers" style={menuButtonStyle}>Khách hàng</Link>

          <button onClick={handleLogout} style={menuButtonStyle}>
            Đăng xuất
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;