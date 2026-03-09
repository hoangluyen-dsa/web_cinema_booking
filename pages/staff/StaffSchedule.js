import { useState } from "react";

const ManageShowtimes = () => {
  const showtimesData = [
    {
      movie: "Conan",
      cinema: "CGV Hà Nội",
      room: "Phòng 1",
      date: "2026-03-05",
      shift: "19:00",
    },
    {
      movie: "Mưa Đỏ",
      cinema: "Lotte Cinema",
      room: "Phòng 2",
      date: "2026-03-06",
      shift: "21:00",
    },
    {
      movie: "Thanh Xuân 18x2",
      cinema: "CGV Hà Nội",
      room: "Phòng 3",
      date: "2026-03-07",
      shift: "18:30",
    },
  ];

  const [filters, setFilters] = useState({
    movie: "",
    cinema: "",
    room: "",
    date: "",
    shift: "",
  });

  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value });
  };

  const filteredData = showtimesData.filter((item) =>
    Object.keys(filters).every(
      (key) => !filters[key] || item[key] === filters[key]
    )
  );

  const getUniqueValues = (key) => [
    ...new Set(showtimesData.map((item) => item[key])),
  ];

  return (
    <>
      <style>{`
        .admin-card {
          width: 1000px;
          background: linear-gradient(to right, #081225, #050d1f);
          padding: 40px;
          border-radius: 20px;
          color: white;
        }

        .admin-card h2 {
          margin-bottom: 25px;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          color: red;
          text-align: left;
          padding-bottom: 10px;
        }

        .admin-table td {
          padding: 12px 0;
          border-bottom: 1px solid #222;
        }

        select {
          margin-top: 5px;
          width: 100%;
          background: #1e293b;
          color: white;
          border: none;
          padding: 5px;
          border-radius: 6px;
        }

        .empty-row {
          color: #777;
          text-align: center;
          padding: 20px 0;
        }
      `}</style>

      <div className="admin-card">
        <h2>Danh sách lịch chiếu</h2>

        <table className="admin-table">
          <thead>
            <tr>
              {["movie", "cinema", "room", "date", "shift"].map((col) => (
                <th key={col}>
                  {col === "movie" && "Tên phim"}
                  {col === "cinema" && "Rạp"}
                  {col === "room" && "Phòng"}
                  {col === "date" && "Ngày"}
                  {col === "shift" && "Ca"}

                  <select
                    value={filters[col]}
                    onChange={(e) =>
                      handleFilterChange(col, e.target.value)
                    }
                  >
                    <option value="">Tất cả</option>
                    {getUniqueValues(col).map((value, i) => (
                      <option key={i} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.movie}</td>
                  <td>{item.cinema}</td>
                  <td>{item.room}</td>
                  <td>{item.date}</td>
                  <td>{item.shift}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-row">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageShowtimes;