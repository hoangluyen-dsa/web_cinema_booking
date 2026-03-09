import { useEffect, useState } from "react";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  const [filters, setFilters] = useState({
    movie: "",
    quantity: "",
  });

  useEffect(() => { // Lấy danh sách vé từ localStorage
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || []; // Lấy danh sách vé từ localStorage
    setTickets(storedTickets); // Cập nhật lại danh sách vé trong state
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredTickets = tickets.filter((ticket) =>
    Object.keys(filters).every(
      (key) =>
        !filters[key] ||
        ticket[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase())
    )
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "linear-gradient(to right, #0f172a, #020617)",
          padding: "30px",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Bán Vé</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ color: "red", textAlign: "center" }}>
              <th style={thStyle}>
                Tên phim
                <input
                  name="movie"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>

              <th style={thStyle}>
                Số lượng
                <input
                  name="quantity"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.length > 0 ? ( // Kiểm tra xem có vé nào phù hợp với bộ lọc không
              filteredTickets.map((ticket, index) => ( // Lặp qua danh sách vé đã lọc
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{ticket.movie}</td>
                  <td style={tdStyle}>{ticket.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center", opacity: 0.6 }}>
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ===== STYLE ===== */

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid #333",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #222",
};

const filterStyle = {
  marginTop: "8px",
  width: "80%",
  padding: "8px 10px",
  borderRadius: "20px",
  border: "none",
  outline: "none",
  background: "#e5e5e5",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

export default ManageTickets;