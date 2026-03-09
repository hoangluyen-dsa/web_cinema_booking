import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../../layouts/PublicLayout";

function Account() {
  const {
    user,
    tickets,
    updateProfile,
    changePassword,
    cancelTicket,
  } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleUpdate = () => {
    updateProfile({ name, email });
    alert("Cập nhật thành công!");
  };

  const handleChangePass = () => { // Đổi mật khẩu
    const success = changePassword(oldPass, newPass);
    if (success) {
      setOldPass("");
      setNewPass("");
    }
  };

  const handleCancel = (ticket) => { // Hủy vé
    const today = new Date();
    const showDate = new Date(ticket.date);

    if (showDate <= today) {
      alert("Không thể hủy vé đã đến ngày chiếu!");
      return;
    }

    cancelTicket(ticket.code);
    alert("Hủy vé thành công!");
  };

  return (
    <PublicLayout>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.title}>TÀI KHOẢN CỦA BẠN</h2>

          <div style={styles.card}>
            {/* TAB MENU */}
            <div style={styles.tabRow}>
              <button
                style={
                  activeTab === "profile"
                    ? styles.activeTab
                    : styles.tab
                }
                onClick={() => setActiveTab("profile")}
              >
                Thông tin cá nhân
              </button>

              <button
                style={
                  activeTab === "password"
                    ? styles.activeTab
                    : styles.tab
                }
                onClick={() => setActiveTab("password")}
              >
                Đổi mật khẩu
              </button>
            </div>

            {/* PROFILE */}
            {activeTab === "profile" && (
              <div style={styles.section}>
                <input
                  style={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Họ tên"
                />

                <input
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />

                <button
                  style={styles.primaryBtn}
                  onClick={handleUpdate}
                >
                  Lưu thay đổi
                </button>
              </div>
            )}

            {/* PASSWORD */}
            {activeTab === "password" && (
              <div style={styles.section}>
                <input
                  type="password"
                  style={styles.input}
                  placeholder="Mật khẩu cũ"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />

                <input
                  type="password"
                  style={styles.input}
                  placeholder="Mật khẩu mới"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />

                <button
                  style={styles.primaryBtn}
                  onClick={handleChangePass}
                >
                  Đổi mật khẩu
                </button>
              </div>
            )}

            {/* HISTORY */}
<div style={styles.historySection}>
  <h3 style={{ marginBottom: "20px" }}>
    🎟 Lịch sử đặt vé
  </h3>

  {!tickets || tickets.length === 0 ? (
    <p style={{ opacity: 0.7 }}>
      Bạn chưa có vé nào
    </p>
  ) : (
    tickets.map((ticket) => (
      <div key={ticket.code} style={styles.ticket}>
        <div style={styles.ticketInfo}>
          <p><b>Mã vé:</b> {ticket.code}</p>
          <p><b>Phim:</b> {ticket.movie || "Không rõ"}</p>
          <p><b>Rạp:</b> {ticket.cinema || "Không rõ"}</p>
          <p><b>Suất:</b> {ticket.showtime || "Không rõ"}</p>
          <p>
            <b>Ghế:</b>{" "}
            {Array.isArray(ticket.seats)
              ? ticket.seats.join(", ")
              : "Không có"}
          </p>
          <p><b>Ngày:</b> {ticket.date || "Không rõ"}</p>
          <p>
            <b>Tổng tiền:</b>{" "}
            {ticket.total
              ? ticket.total.toLocaleString()
              : 0}{" "}
            VND
          </p>
        </div>

        <button
          style={styles.dangerBtn}
          onClick={() => handleCancel(ticket)}
        >
          Hủy vé
        </button>
      </div>
    ))
  )}
</div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: "60px 0",
  },

  container: {
    width: "900px",
    margin: "0 auto",
    color: "white",
  },

  title: {
    marginBottom: "30px",
    textAlign: "center",
    color: "#e50914",
    letterSpacing: "1px",
  },

  card: {
    backgroundColor: "#0f172a",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 0 30px rgba(229,9,20,0.3)",
  },

  tabRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  tab: {
    backgroundColor: "#1e293b",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  activeTab: {
    backgroundColor: "#e50914",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  section: {
    marginBottom: "40px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1e293b",
    color: "white",
  },

  primaryBtn: {
    backgroundColor: "#e50914",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  historySection: {
    marginTop: "20px",
  },

  ticket: {
    backgroundColor: "#1e293b",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ticketInfo: {
    lineHeight: "1.6",
  },

  dangerBtn: {
    backgroundColor: "#b91c1c",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};

export default Account;
