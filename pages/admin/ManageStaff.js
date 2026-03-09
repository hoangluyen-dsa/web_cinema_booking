import { useState, useEffect } from "react";

const ManageStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    position: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const [filters, setFilters] = useState({
    username: "",
    email: "",
    position: "",
  });

  /* ================= LOAD STAFF ================= */
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const onlyStaff = users.filter((u) => u.role === "staff");
    setStaffs(onlyStaff);
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = () => {
    if (!form.username || !form.email || !form.password || !form.position) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng từ localStorage

    if (editIndex !== null) {
      const oldUsername = staffs[editIndex].username; // Lưu tên đăng nhập cũ

      users = users.map((u) => 
        u.username === oldUsername
          ? { ...form, role: "staff" }
          : u // Giữ nguyên thông tin người dùng không bị chỉnh sửa
      );
    } else {
      const existed = users.find((u) => u.username === form.username); // Kiểm tra xem tên đăng nhập đã tồn tại chưa
      if (existed) {
        alert("Username đã tồn tại!");
        return;
      }

      users.push({ // Thêm người dùng mới
        ...form,
        role: "staff", // Đặt vai trò là nhân viên
      });
    }

    localStorage.setItem("users", JSON.stringify(users));

    const onlyStaff = users.filter((u) => u.role === "staff"); // Lọc lại danh sách nhân viên sau khi cập nhật
    setStaffs(onlyStaff);

    setForm({ username: "", email: "", password: "", position: "" });
    setEditIndex(null);
  };

  /* ================= EDIT ================= */
  const handleEdit = (index) => { // Xử lý chỉnh sửa nhân viên
    setForm(staffs[index]);
    setEditIndex(index);
  };

  /* ================= DELETE ================= */
  const handleDelete = (index) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng từ localStorage

    users = users.filter(
      (u) => u.username !== staffs[index].username // Lọc bỏ nhân viên đã xóa
    );

    localStorage.setItem("users", JSON.stringify(users)); // Cập nhật lại danh sách người dùng trong localStorage

    const onlyStaff = users.filter((u) => u.role === "staff"); // Lọc lại danh sách nhân viên sau khi xóa
    setStaffs(onlyStaff); // Cập nhật lại danh sách nhân viên trong state
  };

  /* ================= FILTER ================= */
  const filteredStaffs = staffs.filter((staff) => 
    Object.keys(filters).every(
      (key) =>
        !filters[key] ||
        staff[key]
          ?.toLowerCase()
          .includes(filters[key].toLowerCase())
    )
  );

  return (
    <div style={{ padding: "40px", background: "#000", minHeight: "100vh" }}>
      <div
        style={{
          background: "linear-gradient(to right, #0f172a, #020617)",
          padding: "40px",
          borderRadius: "20px",
          maxWidth: "1100px",
          margin: "auto",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>
          Quản lý Nhân Sự
        </h2>

        {/* INPUT */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />

          {/* POSITION */}
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">-- Chọn vị trí --</option>
            <option value="Bán vé">Bán vé</option>
            <option value="Soát vé">Soát vé</option>
            <option value="Quản lý phòng chiếu">Quản lý phòng chiếu</option>
            <option value="Kỹ thuật">Kỹ thuật</option>
          </select>
        </div>

        <button onClick={handleSubmit} style={buttonStyle}>
          {editIndex !== null ? "Cập nhật" : "Tạo nhân viên"}
        </button>

        {/* TABLE */}
        <table style={{ width: "100%", marginTop: "30px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "red", textAlign: "center" }}>
              <th style={thStyle}>
                Username
                <input
                  name="username"
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

              <th style={thStyle}>
                Vị trí
                <input
                  name="position"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>

              <th style={thStyle}>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{staff.username}</td>
                  <td style={tdStyle}>{staff.email}</td>
                  <td style={tdStyle}>{staff.position}</td>
                  <td style={tdStyle}>
                    <span
                      style={iconStyle}
                      onClick={() => handleEdit(index)}
                    >
                      ✏
                    </span>
                    <span
                      style={iconStyle}
                      onClick={() => handleDelete(index)}
                    >
                      🗑
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", opacity: 0.6 }}>
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

const inputStyle = {
  padding: "10px 15px",
  borderRadius: "20px",
  border: "none",
  background: "#d9d9d9",
  outline: "none",
  width: "200px",
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

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid #333",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #222",
};

const buttonStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
};

const iconStyle = {
  margin: "0 10px",
  cursor: "pointer",
  fontSize: "18px",
};

export default ManageStaff;