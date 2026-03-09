import { useNavigate } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

function Cinema() {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div style={styles.app}>
        <div style={styles.content}>
          <h3>Rạp phim</h3>

          <input
            type="text"
            defaultValue="CGV"
            style={styles.searchInput}
          />

          {/* PHIM ĐANG CHIẾU */}
          <h3 style={{ marginTop: "30px" }}>🎬 Phim đang chiếu</h3>

          <div style={styles.movieGrid}>
            {nowShowing.map((movie) => (
              <div
                key={movie.id}
                style={styles.movieCard}
                onClick={() =>
                  navigate(`/movies/${movie.id}`, { // Chuyển hướng đến trang chi tiết phim
                    state: movie,
                  })
                }
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={styles.movieImg}
                />
                <div style={styles.movieTitle}>
                  {movie.title}
                </div>
              </div>
            ))}
          </div>

          {/* PHIM SẮP CHIẾU */}
          <h3 style={{ marginTop: "30px" }}>🎬 Phim sắp chiếu</h3>

          <div style={styles.movieGrid}>
            {comingSoon.map((movie) => (
              <div
                key={movie.id}
                style={styles.movieCard}
                onClick={() =>
                  navigate(`/movies/${movie.id}`, {
                    state: movie,
                  })
                }
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={styles.movieImg}
                />
                <div style={styles.movieTitle}>
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

/* ================= DATA ================= */

const nowShowing = [
  {
    id: 1,
    title: "Mưa Đỏ",
    genre: "Lịch sử - Chiến tranh - Chính kịch",
    description:
      "Bộ phim tái hiện lại những trận chiến khốc liệt trong chiến tranh và tinh thần đồng đội thiêng liêng.",
    image:
      "https://upload.wikimedia.org/wikipedia/vi/4/49/Mua_do_poster.jpg",
  },
];

const comingSoon = [
  {
    id: 3,
    title: "Thanh Xuân 18x2",
    genre: "Tình cảm - Hài",
    description:
      "Hành trình thanh xuân đầy cảm xúc với những kỷ niệm không thể quên.",
    image:
      "https://channel.mediacdn.vn/428462621602512896/2024/4/9/photo-1-17126550554741283678905.jpg",
  },
];

/* ================= STYLES ================= */

const styles = {
  app: {
    backgroundColor: "#000",
    color: "white",
    minHeight: "100vh",
  },
  content: {
    padding: "40px 60px",
  },
  searchInput: {
    width: "400px",
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    marginBottom: "20px",
  },
  movieGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  movieCard: {
    backgroundColor: "#222",
    borderRadius: "8px",
    overflow: "hidden",
    width: "180px",
    cursor: "pointer",
    transition: "0.3s",
  },
  movieImg: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  movieTitle: {
    padding: "10px",
  },
};

export default Cinema;
