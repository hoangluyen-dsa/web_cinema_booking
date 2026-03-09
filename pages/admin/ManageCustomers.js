import { useState } from "react";

const ManageCustomers = () => { // Quản lý khách hàng
  const [customers] = useState([ // Danh sách khách hàng, dữ liệu giả lập cố định (mock data)
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "vana@gmail.com",
      history: [
        { movie: "Conan", quantity: 2, date: "2026-02-20" },
        { movie: "Avengers", quantity: 1, date: "2026-02-22" },
      ],
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "thib@gmail.com",
      history: [
        { movie: "Mưa Đỏ", quantity: 3, date: "2026-02-25" },
      ],
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null); // Khách hàng được chọn

  const [filters, setFilters] = useState({ // Bộ lọc khách hàng
    name: "",
    email: "",
  });

  const handleFilterChange = (e) => { // Xử lý thay đổi bộ lọc
    setFilters({ ...filters, [e.target.name]: e.target.value }); // Cập nhật bộ lọc
  };

  const filteredCustomers = customers.filter((customer) => // Lọc khách hàng theo bộ lọc
    Object.keys(filters).every( // Kiểm tra tất cả các bộ lọc
      (key) =>
        !filters[key] ||
        customer[key]
          ?.toLowerCase()
          .includes(filters[key].toLowerCase()) // Kiểm tra bộ lọc
    )
  );

  return ( // Giao diện quản lý khách hàng
    <div style={wrapperStyle}>
      <div style={cardStyle}> {/* Card chứa thông tin khách hàng */}
        <h2 style={{ color: "white", marginBottom: "30px" }}>
          Khách hàng
        </h2>

        {/* BẢNG KHÁCH HÀNG */}
        <table style={tableStyle}>
          <thead>
            <tr style={{ color: "red" }}>
              <th style={thStyle}>
                Tên
                <input
                  name="name"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>

              <th style={thStyle}>
                Email
                <input
                  name="email"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length > 0 ? ( // Kiểm tra xem có khách hàng nào không
              filteredCustomers.map((customer) => ( // Lặp qua danh sách khách hàng đã lọc
                <tr key={customer.id}>
                  <td
                    style={{
                      ...tdStyle,
                      cursor: "pointer",
                      color: "#4da6ff",
                    }}
                    onClick={() => setSelectedCustomer(customer)} // Khách hàng được chọn
                  >
                    {customer.name}
                  </td>
                  <td style={tdStyle}>{customer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center", padding: "15px" }}>
                  Không tìm thấy khách hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* LỊCH SỬ ĐẶT VÉ */}
        {selectedCustomer && (
          <div style={{ marginTop: "40px" }}>
            <h3 style={{ color: "white", marginBottom: "15px" }}>
              Lịch sử đặt vé - {selectedCustomer.name}
            </h3>

            <table style={tableStyle}>
              <thead>
                <tr style={{ color: "red" }}>
                  <th style={thStyle}>Tên phim</th>
                  <th style={thStyle}>Số lượng</th>
                  <th style={thStyle}>Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomer.history.length === 0 ? ( // Kiểm tra xem có lịch sử đặt vé không
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "15px" }}>
                      Chưa có lịch sử đặt vé
                    </td>
                  </tr>
                ) : (
                  selectedCustomer.history.map((ticket, index) => ( // Lặp qua lịch sử đặt vé
                    <tr key={index}>
                      <td style={tdStyle}>{ticket.movie}</td>
                      <td style={tdStyle}>{ticket.quantity}</td>
                      <td style={tdStyle}>{ticket.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCustomers;

/* ================= STYLE ================= */

const wrapperStyle = { // Style cho wrapper
  padding: "40px",
  background: "#000",
  minHeight: "100vh",
};

const cardStyle = { // Style cho card chứa thông tin khách hàng
  background: "linear-gradient(to right, #0f172a, #020617)", // Gradient background
  padding: "40px",
  borderRadius: "20px",
  maxWidth: "1000px",
  margin: "auto", // Căn giữa card
  color: "white",
};

const tableStyle = { // Style cho bảng
  width: "100%",
  borderCollapse: "collapse", // Căn giữa bảng
  color: "white",
};

const thStyle = { // Style cho th, th xác định ô tiêu đề trong bảng
  padding: "10px",
  borderBottom: "1px solid #333", // Đường viền dưới cho th
  textAlign: "center",
};

const tdStyle = { // Style cho td, td xác định ô dữ liệu trong bảng
  padding: "15px",
  borderBottom: "1px solid #222",
  textAlign: "center",
};

const filterStyle = { // Style cho ô tìm kiếm
  marginTop: "8px",
  width: "80%",
  padding: "8px 10px",
  borderRadius: "20px",
  border: "none",
  outline: "none", // Ẩn viền
  background: "#e5e5e5",
  display: "block", // Hiển thị dưới dạng khối
  marginLeft: "auto", // Căn giữa ô tìm kiếm
  marginRight: "auto", 
};