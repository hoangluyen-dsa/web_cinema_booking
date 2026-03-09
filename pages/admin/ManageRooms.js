import { useState, useEffect } from "react";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]); // Danh sách phòng chiếu
  const [roomName, setRoomName] = useState(""); // Lưu tên phòng đang nhập trong form
  const [capacity, setCapacity] = useState(""); // Lưu sức chứa phòng đang nhập trong form
  const [editingIndex, setEditingIndex] = useState(null); // Lưu chỉ số phòng đang chỉnh sửa

  // FILTER STATE
  const [filters, setFilters] = useState({ // Bộ lọc phòng
    name: "",
    capacity: "",
  });

  useEffect(() => { // Lấy danh sách phòng từ localStorage khi component được mount
    const storedRooms = JSON.parse(localStorage.getItem("rooms")) || []; // Lấy danh sách phòng từ localStorage
    setRooms(storedRooms); // Cập nhật danh sách phòng
  }, []);

  const saveToLocal = (data) => { // Lưu danh sách phòng vào localStorage
    localStorage.setItem("rooms", JSON.stringify(data)); // Lưu danh sách phòng vào localStorage
    setRooms(data); // Cập nhật danh sách phòng
  };

  const handleSubmit = () => { // Xử lý gửi form
    if (!roomName || !capacity) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newRoom = {
      name: roomName,
      capacity: Number(capacity),
    };

    let updatedRooms; // Danh sách phòng đã cập nhật

    if (editingIndex !== null) { // Nếu đang chỉnh sửa phòng
      updatedRooms = [...rooms]; // Tạo bản sao danh sách phòng
      updatedRooms[editingIndex] = newRoom; // Cập nhật phòng đang chỉnh sửa
      setEditingIndex(null);
    } else {
      updatedRooms = [...rooms, newRoom]; // Thêm phòng mới vào cuối mảng
    }

    saveToLocal(updatedRooms); // Lưu danh sách phòng đã cập nhật vào localStorage
    setRoomName("");
    setCapacity("");
  };

  const handleEdit = (index) => { // Xử lý chỉnh sửa phòng
    setRoomName(rooms[index].name); // Đặt tên phòng vào form
    setCapacity(rooms[index].capacity);
    setEditingIndex(index); // Đặt chỉ số phòng đang chỉnh sửa
  };

  const handleDelete = (index) => { // Xử lý xóa phòng
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      const updatedRooms = rooms.filter((_, i) => i !== index); // Lọc bỏ phòng đã xóa
      saveToLocal(updatedRooms); // Lưu danh sách phòng đã cập nhật vào localStorage
    }
  };

  const handleFilterChange = (e) => { // Xử lý thay đổi bộ lọc
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // FILTER LOGIC
  const filteredRooms = rooms.filter((room) => // duyệt từng phòng
    Object.keys(filters).every(
      (key) =>
        !filters[key] ||
        room[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase()) // Kiểm tra điều kiện lọc
    )
  );

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Phòng chiếu</h2>

        <input
          type="text"
          placeholder="Phòng" // Nhập tên phòng, placeholder hiển thị chữ gợi ý tạm thời bên trong ô nhập liệu
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)} // Cập nhật tên phòng khi người dùng nhập
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Sức chứa"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={btnStyle}>
          {editingIndex !== null ? "Cập nhật" : "Thêm"}
        </button>

        <table style={tableStyle}>
          <thead>
            <tr style={{ color: "red" }}>
              <th style={thStyle}>
                Phòng
                <input
                  name="name"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterInputStyle}
                />
              </th>

              <th style={thStyle}>
                Sức chứa
                <input
                  name="capacity"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterInputStyle}
                />
              </th>

              <th style={thStyle}>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{room.name}</td>
                  <td style={tdStyle}>{room.capacity}</td>
                  <td style={tdStyle}>
                    <span onClick={() => handleEdit(index)} style={iconStyle}>
                      ✏
                    </span>
                    <span onClick={() => handleDelete(index)} style={iconStyle}>
                      🗑
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: "20px", opacity: 0.6 }}>
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

const wrapperStyle = {
  minHeight: "100vh",
  background: "black",
  padding: "40px 20px",
};

const cardStyle = { // Card chứa form thêm/sửa phòng
  maxWidth: "900px",
  margin: "auto",
  background: "linear-gradient(to right, #0f172a, #020617)",
  padding: "30px",
  borderRadius: "20px",
  color: "white",
  boxShadow: "0 0 30px rgba(255,0,0,0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "20px",
  border: "none",
  background: "#e5e5e5",
};

const filterInputStyle = {
  marginTop: "6px",
  width: "90%",
  padding: "4px 6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "#dcdcdc",
  color: "black",
  fontSize: "11px",
  height: "26px",
};

const btnStyle = { // Nút thêm và chỉnh sửa
  background: "red",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid #333",
  textAlign: "center",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #222",
};

const iconStyle = {
  cursor: "pointer",
  margin: "0 10px",
  fontSize: "18px",
};

export default ManageRooms;