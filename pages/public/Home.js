import { useNavigate } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

function Home() {
  const navigate = useNavigate();

  // Phân loại phim
  const nowShowing = allMovies.filter(
    (movie) => movie.status === "now"
  );
  const comingSoon = allMovies.filter(
    (movie) => movie.status === "soon"
  );

  return (
    <PublicLayout>
      <div style={styles.app}>
        {/* ===== HERO ===== */}
        <div style={styles.hero}>
          <div style={styles.heroOverlay}></div>

          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Đặt vé xem phim trực tuyến
            </h1>
            <p style={styles.heroSub}>
              Nhanh chóng - Tiện lợi - Hiện đại
            </p>

            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/movies")}
            >
              Đặt vé ngay
            </button>
          </div>
        </div>

        {/* ===== PHIM ĐANG CHIẾU ===== */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🎬 Phim đang chiếu</h2>

          <div style={styles.movieGrid}>
            {nowShowing.map((movie) => (
              <div
                key={movie.id}
                style={styles.card}
                onClick={() =>
                  navigate(`/movies/${movie.id}`, {
                    state: movie,
                  })
                }
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={styles.poster}
                />
                <div style={styles.cardTitle}>
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PHIM SẮP CHIẾU ===== */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🎥 Phim sắp chiếu</h2>

          <div style={styles.movieGrid}>
            {comingSoon.map((movie) => (
              <div
                key={movie.id}
                style={styles.card}
                onClick={() =>
                  navigate(`/movies/${movie.id}`, {
                    state: movie,
                  })
                }
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={styles.poster}
                />
                <div style={styles.cardTitle}>
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

const allMovies = [
  {
    id: 1,
    title: "Mưa Đỏ",
    genre: "Lịch sử - Chiến tranh - Chính kịch",
    description:
      "Bộ phim tái hiện lại những trận chiến khốc liệt trong chiến tranh và tinh thần đồng đội thiêng liêng.",
    image:
      "https://upload.wikimedia.org/wikipedia/vi/4/49/Mua_do_poster.jpg",
    status: "now",
  },
  {
    id: 2,
    title: "Conan",
    genre: "Hoạt hình - Trinh thám",
    description:
      "Thám tử Conan tiếp tục đối đầu với một vụ án bí ẩn đầy kịch tính.",
    image:
      "https://i.pinimg.com/736x/17/d4/7d/17d47d68b99e54b9722078c2e141462a.jpg",
    status: "now",
  },
  {
    id: 3,
    title: "Thanh Xuân 18x2",
    genre: "Tình cảm - Hài",
    description:
      "Hành trình thanh xuân đầy cảm xúc với những kỷ niệm không thể quên.",
    image:
      "https://channel.mediacdn.vn/428462621602512896/2024/4/9/photo-1-17126550554741283678905.jpg",
    status: "soon",
  },
  {
    id: 4,
    title: "Gia tài của ngoại",
    genre: "Hài - Chính kịch",
    description:
      "Câu chuyện gia đình đầy cảm xúc xoay quanh tài sản thừa kế và những bí mật được giấu kín nhiều năm.",
    image:
      "https://i1-vnexpress.vnecdn.net/2024/06/09/how-to-make-millions-before-grandma-dies-1717896354.jpg?w=330&h=495&q=100&dpr=1&fit=crop&s=XM2biKtmYSGuIzNjjIZRxw",
    status: "soon",
  },
];

/* ================= STYLES ================= */

const styles = {
  app: {
    backgroundColor: "#0b0f19",
    color: "white",
    minHeight: "100vh",
  },

  hero: {
    position: "relative",
    height: "65vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    paddingLeft: "80px",
  },

  heroOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
  },

  heroTitle: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  heroSub: {
    marginBottom: "20px",
    color: "#ccc",
  },

  primaryBtn: {
    backgroundColor: "#e50914",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  section: {
    padding: "50px 80px",
  },

  sectionTitle: {
    marginBottom: "20px",
    fontSize: "18px",
  },

  movieGrid: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },

  card: {
  width: "200px",
  cursor: "pointer",
  
  overflow: "hidden", // QUAN TRỌNG
},

  poster: {
  width: "100%",
  height: "300px",       // cố định chiều cao
  objectFit: "cover",    // giữ tỷ lệ ảnh
  borderRadius: "15px",
},

  cardTitle: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default Home;