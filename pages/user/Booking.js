import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../../layouts/PublicLayout";

function Booking() {
  const { bookTicket } = useAuth();

  const [movie, setMovie] = useState("");
  const [cinema, setCinema] = useState("");
  const [showtime, setShowtime] = useState("");
  const [date, setDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatPrice = 80000;

  // 36 ghế
  const seats = Array.from({ length: 36 }, (_, i) => i + 1);

  // Giả lập ghế đã có người đặt trước
  const bookedSeats = [3, 7, 12, 20, 25];

  const toggleSeat = (seat) => {
    // Nếu ghế đã đặt thì không làm gì
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) => // Cập nhật lại danh sách ghế đã chọn
      prev.includes(seat) // Nếu ghế đã được chọn thì bỏ chọn
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const total = selectedSeats.length * seatPrice;

  const handleBooking = () => {
    // Validate bắt buộc chọn đủ
    if (!movie || !cinema || !showtime || !date) {
      alert("Vui lòng chọn đầy đủ thông tin!");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ghế!");
      return;
    }

    const ticket = bookTicket(
      movie,
      cinema,
      showtime,
      selectedSeats,
      total,
      date
    );

    alert("Đặt vé thành công! Mã vé: " + ticket.code);

    // Reset sau khi đặt
    setSelectedSeats([]);
  };

  return (
    <PublicLayout>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>Đặt vé</h2>

        <div style={styles.formGroup}>
          <label>Phim</label>
          <select
            style={styles.select}
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
          >
            <option value="">Chọn phim</option>
            <option>Conan</option>
            <option>Mưa Đỏ</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Rạp</label>
          <select
            style={styles.select}
            value={cinema}
            onChange={(e) => setCinema(e.target.value)}
          >
            <option value="">Chọn rạp</option>
            <option>Beta Thanh Xuân</option>
            <option>Beta Xuân Thủy</option>
            <option>CGV Hà Nội</option>
            <option>Lotte Cinema</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Ngày</label>
          <input
            type="date"
            style={styles.select}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Suất chiếu</label>
          <select
            style={styles.select}
            value={showtime}
            onChange={(e) => setShowtime(e.target.value)}
          >
            <option value="">Chọn suất</option>
            <option>9:00</option>
            <option>12:00</option>
            <option>15:00</option>
            <option>19:00</option>
            <option>21:00</option>
            <option>23:00</option>
          </select>
        </div>

        <h3 style={styles.seatTitle}>Chọn ghế</h3>

        <div style={styles.seatGrid}>
          {seats.map((seat) => {
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);

            return (
              <div
                key={seat}
                onClick={() => toggleSeat(seat)}
                style={{
                  ...styles.seat,
                  backgroundColor: isBooked
                    ? "#e50914"     // đỏ = đã đặt
                    : isSelected
                    ? "#16a34a"     // xanh = đang chọn
                    : "#ffffff",    // trắng = trống
                  color: isBooked || isSelected ? "white" : "black",
                  cursor: isBooked ? "not-allowed" : "pointer",
                }}
              >
                {seat}
              </div>
            );
          })}
        </div>

        <h3 style={{ marginTop: "30px" }}>
          Tổng tiền: {total.toLocaleString()} VND
        </h3>

        <button style={styles.btn} onClick={handleBooking}>
          Xác nhận đặt vé
        </button>
      </div>
    </PublicLayout>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: "50px 80px",
    color: "white",
  },

  title: {
    marginBottom: "30px",
  },

  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    width: "400px",
  },

  select: {
    marginTop: "8px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
  },

  seatTitle: {
    marginTop: "40px",
  },

  seatGrid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(9, 40px)",
    gap: "15px",
  },

  seat: {
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  btn: {
    marginTop: "30px",
    padding: "12px 25px",
    backgroundColor: "#e50914",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Booking;