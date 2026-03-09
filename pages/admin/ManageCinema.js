import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
//FaEdit → icon cây bút , FaTrash → icon thùng rác
export default function ManageCinema() {
  const [cinemas, setCinemas] = useState([]); // Danh sách các rạp chiếu phim
  const [name, setName] = useState(""); // Tên rạp chiếu phim
  const [address, setAddress] = useState(""); // Địa chỉ rạp chiếu phim
  const [editingId, setEditingId] = useState(null); // Nếu null → đang ở chế độ thêm, Nếu có id → đang chỉnh sửa

  // FILTER STATE
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  }); // lọc theo tên, địa chỉ

  const handleSubmit = () => { // Hàm xử lý khi thêm hoặc chỉnh sửa rạp
    if (!name || !address) return;

    if (editingId) { // Tìm rạp trùng id và cập nhật
      setCinemas(
        cinemas.map((c) =>
          c.id === editingId ? { ...c, name, address } : c
        )
      );
      setEditingId(null);
    } else {
      setCinemas([
        ...cinemas,
        { id: Date.now(), name, address } // Thêm rạp mới
      ]);
    }

    setName("");
    setAddress(""); // xóa input sau khi thêm, sửa
  };

  const handleEdit = (cinema) => { // Bắt đầu chỉnh sửa rạp khi bấm vào icon bút sửa
    setEditingId(cinema.id);
    setName(cinema.name);
    setAddress(cinema.address);
  };

  const handleDelete = (id) => {
    setCinemas(cinemas.filter((c) => c.id !== id));
  };

  const handleFilterChange = (e) => { // Hàm xử lý khi thay đổi bộ lọc
    setFilters({ ...filters, [e.target.name]: e.target.value }); // Cập nhật giá trị bộ lọc
  };

  // FILTER LOGIC
  const filteredCinemas = cinemas.filter((c) =>
    Object.keys(filters).every( // Kiểm tra tất cả các bộ lọc
      (key) =>
        !filters[key] ||
        c[key]?.toLowerCase().includes(filters[key].toLowerCase()) // Kiểm tra từng bộ lọc
    )
  );

  return (
    <> {/* Wrapper cho toàn bộ nội dung, viết trực tiếp css */}
      <style>{` 
         .cinema-wrapper { /* Wrapper cho toàn bộ nội dung */
    display: flex;
    justify-content: center; /* Canh giữa theo chiều ngang */
    padding: 30px 20px;
    min-height: 100vh;
    box-sizing: border-box; /* Để bao gồm padding và border trong kích thước tổng thể */
  }

  .cinema-card { /* Thẻ chứa nội dung chính */
    width: 100%;
    max-width: 1000px;   /* Không vượt quá 1000px */
    background: linear-gradient(to right, #081225, #050d1f);
    padding: 30px;
    border-radius: 20px;
    color: white;
    box-sizing: border-box;
  }

        .cinema-card h2 { /* Tiêu đề */
          margin-bottom: 25px;
        }

        .cinema-card input.form-input { /* input thêm rạp */
          width: 100%;
          padding: 14px;
          margin-bottom: 20px;
          border-radius: 30px;
          border: none;
          background: #dcdcdc;
          font-size: 14px;
        }

        .btn-add { /* nút thêm/cập nhật */
          background: red;
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 15px;
          cursor: pointer;
          font-weight: bold;
          margin-bottom: 30px;
        }

        /* TABLE GRID */
        .cinema-table { /* tạo khoảng cách giữa form và bảng */
          margin-top: 20px;
        }

        .cinema-header,
        .cinema-row {
          display: grid; /* Hiển thị dưới dạng lưới */
          grid-template-columns: 1fr 1fr 150px; /* 3 cột: Tên, Địa chỉ, Thao tác */
          align-items: center;
          gap: 20px;
        }

        .cinema-header { /* Header của bảng */
          margin-bottom: 10px;
        }

        .column-title { /* Tiêu đề của cột */
          color: red;
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
        }

        .search-input { /* Input tìm kiếm */
          width: 100%;
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #e5e5e5;
          color: black;
          font-size: 12px;
          height: 26px;
        }

        .cinema-row { /* Dòng rạp */
          padding: 12px 0;
          border-bottom: 1px solid #222;
        }

        .icon { /* Icon chỉnh sửa/xóa */
          cursor: pointer;
          margin-right: 15px;
          font-size: 16px;
        }

        .icon:hover { /* Icon chỉnh sửa/xóa khi hover */
          color: red;
        }

        .empty-row { /* Dòng rạp không có kết quả */
          color: #777;
          padding: 20px 0;
        }
      `}</style>

      <div className="cinema-wrapper">
        <div className="cinema-card">
          <h2>Quản Lý Rạp</h2>

          {/* FORM */}
          <input
            className="form-input"
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-input"
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="btn-add" onClick={handleSubmit}>
            {editingId ? "Cập nhật" : "Thêm"}
          </button>

          {/* TABLE */}
          <div className="cinema-table">

            {/* HEADER */}
            <div className="cinema-header">
              <div>
                <span className="column-title">Tên</span>
                <input
                  name="name"
                  className="search-input"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                />
              </div>

              <div>
                <span className="column-title">Địa chỉ</span>
                <input
                  name="address"
                  className="search-input"
                  placeholder="Tìm..."
                  onChange={handleFilterChange}
                />
              </div>

              <div className="column-title">Thao tác</div>
            </div>

            {/* BODY */}
            {filteredCinemas.length === 0 ? (
              <div className="empty-row">Không có kết quả</div>
            ) : (
              filteredCinemas.map((cinema) => (
                <div key={cinema.id} className="cinema-row">
                  <div>{cinema.name}</div>
                  <div>{cinema.address}</div>
                  <div>
                    <FaEdit
                      className="icon"
                      onClick={() => handleEdit(cinema)}
                    />
                    <FaTrash
                      className="icon"
                      onClick={() => handleDelete(cinema.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
