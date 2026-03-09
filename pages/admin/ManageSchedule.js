
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ManageShowtimes = () => {

  const { movies = [], rooms = [] } = useAuth(); // Lấy danh sách phim và phòng từ context

  const [showtimes, setShowtimes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    movie: "",
    room: "",
    date: "",
    shift: "",
  });

  const [filters, setFilters] = useState({
    movie: "",
    room: "",
    date: "",
    shift: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    if (!form.movie || !form.room || !form.date || !form.shift) return;

    if (editIndex !== null) {

      const updated = [...showtimes];
      updated[editIndex] = form;
      setShowtimes(updated);
      setEditIndex(null);

    } else {

      setShowtimes([...showtimes, form]);

    }

    setForm({
      movie: "",
      room: "",
      date: "",
      shift: "",
    });

  };

  const handleEdit = (index) => {

    setForm(showtimes[index]);
    setEditIndex(index);

  };

  const handleDelete = (index) => {

    setShowtimes(showtimes.filter((_, i) => i !== index));

  };

  const filteredShowtimes = showtimes.filter((item) =>
    Object.keys(filters).every(
      (key) =>
        !filters[key] ||
        item[key]?.toLowerCase().includes(filters[key].toLowerCase())
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

        <h2 style={{ marginBottom: "20px" }}>Lịch chiếu</h2>

        {/* ===== FORM ===== */}

        <select
          name="movie"
          value={form.movie}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Chọn phim</option>

          {movies.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}

        </select>

        <select
          name="room"
          value={form.room}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Chọn phòng</option>

          {rooms.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}

        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="shift"
          placeholder="Ca"
          value={form.shift}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={addBtnStyle}>
          {editIndex !== null ? "Cập nhật" : "Thêm"}
        </button>

        {/* ===== TABLE ===== */}

        <table style={tableStyle}>

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
                Phòng
                <input
                  name="room"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>

              <th style={thStyle}>
                Ngày
                <input
                  name="date"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>

              <th style={thStyle}>
                Ca
                <input
                  name="shift"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                  style={filterStyle}
                />
              </th>

              <th style={thStyle}>Thao tác</th>

            </tr>

          </thead>

          <tbody>

            {filteredShowtimes.length > 0 ? (

              filteredShowtimes.map((item, index) => (

                <tr key={index} style={{ textAlign: "center" }}>

                  <td style={tdStyle}>{item.movie}</td>
                  <td style={tdStyle}>{item.room}</td>
                  <td style={tdStyle}>{item.date}</td>
                  <td style={tdStyle}>{item.shift}</td>

                  <td style={tdStyle}>

                    <span
                      onClick={() => handleEdit(index)}
                      style={iconStyle}
                    >
                      ✏
                    </span>

                    <span
                      onClick={() => handleDelete(index)}
                      style={iconStyle}
                    >
                      🗑
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="5" style={{ textAlign: "center", opacity: 0.6 }}>
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
  width: "100%",
  height: "4D0px",
  padding: "0 18px",
  marginBottom: "15px",
  borderRadius: "30px",
  border: "none",
  background: "#e5e5e5",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
  color: "#333"
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

const addBtnStyle = {
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


export default ManageShowtimes;

