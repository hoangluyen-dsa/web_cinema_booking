import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function StaffScanTicket() {
  const { tickets } = useAuth();
  const [code, setCode] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleSearch = () => {
    const found = tickets.find((t) => t.code === code);
    if (!found) {
      alert("Không tìm thấy vé!");
      setSelectedTicket(null);
      return;
    }
    setSelectedTicket(found);
  };

  const handleCheckIn = () => {
    const updated = tickets.map((t) =>
      t.code === selectedTicket.code ? { ...t, checked: true } : t
    );

    localStorage.setItem("tickets", JSON.stringify(updated));

    setSelectedTicket({ ...selectedTicket, checked: true });
    alert("Check-in thành công!");
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Soát vé</h2>

      {/* SEARCH */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nhập mã vé"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={inputStyle}
        />
        <button style={btnStyle} onClick={handleSearch}>
          Kiểm tra
        </button>
      </div>

      {/* CHI TIẾT VÉ */}
      {selectedTicket && (
        <div style={detailCard}>
          <h3>Chi tiết vé</h3>
          <p><b>Mã vé:</b> {selectedTicket.code}</p>
          <p><b>Phim:</b> {selectedTicket.movie}</p>
          <p><b>Ghế:</b> {selectedTicket.seats}</p>
          <p>
            <b>Trạng thái:</b>{" "}
            <span style={{
              color: selectedTicket.checked ? "#22c55e" : "#facc15"
            }}>
              {selectedTicket.checked ? "Đã check-in" : "Chưa check-in"}
            </span>
          </p>

          {!selectedTicket.checked && (
            <button style={btnStyle} onClick={handleCheckIn}>
              Check-in
            </button>
          )}
        </div>
      )}

      {/* DANH SÁCH VÉ */}
      <div style={{ marginTop: "40px" }}>
        <h3>Danh sách vé</h3>

        <div style={listContainer}>
          {tickets.map((t) => (
            <div
              key={t.code}
              style={{
                ...ticketItem,
                border:
                  selectedTicket?.code === t.code
                    ? "2px solid red"
                    : "1px solid #334155",
              }}
              onClick={() => setSelectedTicket(t)}
            >
              <div>
                <b>{t.movie}</b>
                <p style={{ fontSize: "13px", margin: 0 }}>Ghế: {t.seats}</p>
              </div>

              <span
                style={{
                  fontSize: "13px",
                  color: t.checked ? "#22c55e" : "#facc15",
                }}
              >
                {t.checked ? "Đã check-in" : "Chưa check-in"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================== STYLE ================== */

const containerStyle = {
  maxWidth: "800px",
  margin: "auto",
  padding: "40px",
  color: "white",
};

const detailCard = {
  background: "#0b1220",
  padding: "25px",
  borderRadius: "15px",
  marginTop: "20px",
  boxShadow: "0 0 30px rgba(255,0,0,0.3)",
};

const listContainer = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const ticketItem = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  transition: "0.2s",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  width: "70%",
  marginRight: "10px",
};

const btnStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default StaffScanTicket;