import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ManageMovies = () => {
  const { user, movies, addMovie, deleteMovie, updateMovie } = useAuth(); // Lấy thông tin người dùng và danh sách phim từ context

  const [editingId, setEditingId] = useState(null); // ID của phim đang chỉnh sửa

  const [form, setForm] = useState({ // Dữ liệu của form
    name: "",
    duration: "",
    status: "",
    category: "",
    description: "",
    price: "",
    poster: "",
  });

  // FILTER STATE
  const [filters, setFilters] = useState({ // Bộ lọc phim
    name: "",
    duration: "",
    status: "",
    category: "",
    price: "",
  });

  if (user?.role !== "admin") {
    return <h2>Bạn không có quyền truy cập!</h2>;
  }

  const handleChange = (e) => { // Xử lý thay đổi dữ liệu trong form
    setForm({ ...form, [e.target.name]: e.target.value }); // Cập nhật dữ liệu trong form
  };

  const handleFilterChange = (e) => { // Xử lý thay đổi bộ lọc
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setForm({ ...form, poster: imageUrl });
  }
};
  const handleSubmit = () => { // Xử lý gửi form
    if (editingId) {
      updateMovie(editingId, form); // Cập nhật phim, gọi hàm updateMovie từ context
      setEditingId(null); // Đặt lại ID đang chỉnh sửa
    } else {
      addMovie(form); // Thêm phim mới, gọi hàm addMovie từ context
    }

    setForm({ // Đặt lại dữ liệu trong form
      name: "",
      duration: "",
      status: "",
      category: "",
      description: "",
      price: "",
      poster: "",
    });
  };

  const handleEdit = (movie) => { // Xử lý chỉnh sửa phim
    setEditingId(movie.id); // Đặt ID của phim đang chỉnh sửa
    setForm(movie);
  };

  // FILTER LOGIC
  const filteredMovies = movies.filter((m) => // Lọc phim theo bộ lọc
    Object.keys(filters).every(
      (key) =>
        !filters[key] ||
        m[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Quản Lý Phim</h2>

      {/* FORM */}
      <div style={styles.card}>
        <input name="name" placeholder="Tên phim" value={form.name} onChange={handleChange} style={styles.input} /> {/* Tên phim */}
        <input name="duration" placeholder="Thời lượng" value={form.duration} onChange={handleChange} style={styles.input} />
        <input name="status" placeholder="Trạng thái" value={form.status} onChange={handleChange} style={styles.input} />
        <input name="category" placeholder="Thể loại" value={form.category} onChange={handleChange} style={styles.input} />
        <input name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} style={styles.input} />
        <input name="price" placeholder="Giá vé" value={form.price} onChange={handleChange} style={styles.input} />
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
        />

        <button style={styles.addBtn} onClick={handleSubmit}>
          {editingId ? "Cập nhật" : "Thêm"}
        </button>
      </div>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>
              Tên
              <input name="name" placeholder="Tìm..." onChange={handleFilterChange} style={styles.filterInput} />
            </th>
            <th>
              Thời lượng
              <input name="duration" placeholder="Tìm..." onChange={handleFilterChange} style={styles.filterInput} />
            </th>
            <th>
              Trạng thái
              <input name="status" placeholder="Tìm..." onChange={handleFilterChange} style={styles.filterInput} />
            </th>
            <th>
              Thể loại
              <input name="category" placeholder="Tìm..." onChange={handleFilterChange} style={styles.filterInput} />
            </th>
            <th>
              Giá
              <input name="price" placeholder="Tìm..." onChange={handleFilterChange} style={styles.filterInput} />
            </th>
          
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.duration}</td>
                <td>{m.status}</td>
                <td>{m.category}</td>
                <td>{m.price}</td>
                <td>
                  <span style={styles.iconStyle} onClick={() => handleEdit(m)}>
                    ✏
                  </span>
                  <span style={styles.iconStyle} onClick={() => deleteMovie(m.id)}>
                    🗑
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", opacity: 0.6 }}>
                Không tìm thấy dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
  },

  title: {
    marginBottom: "20px",
  },

  card: {
    backgroundColor: "#0f172a",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "30px",
    display: "grid",
    gap: "10px",
  },
  iconStyle: {
    cursor: "pointer",
    margin: "0 10px",
    fontSize: "18px",
  },
  input: {
  width: "90%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "20px",
  border: "none",
  background: "#e5e5e5",
},

  filterInput: {
  marginTop: "6px",
  width: "90%",
  padding: "4px 6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "#0f172a",
  color: "black",
  fontSize: "11px",
  height: "26px",
},


  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  addBtn : { // Nút thêm và chỉnh sửa
  width: "10%",
  background: "red",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "20px",
},

  deleteBtn: { // Nút xóa phim
    backgroundColor: "red",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },
};

export default ManageMovies;