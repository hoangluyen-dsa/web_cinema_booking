import { useLocation, useNavigate, useParams } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Nếu có state thì dùng state
  // Nếu không thì tìm theo id
  const movie =
    location.state ||
    allMovies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <PublicLayout>
        <div style={styles.wrapper}>
          <h2 style={{ color: "white" }}>
            Không tìm thấy phim.
          </h2>
          <button
            style={styles.btn}
            onClick={() => navigate("/movies")}
          >
            Quay lại
          </button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <img
            src={movie.image}
            alt={movie.title}
            style={styles.poster}
          />

          <div style={styles.info}>
            <h2 style={styles.title}>{movie.title}</h2>

            <p style={styles.text}>
              <strong>Thể loại:</strong> {movie.genre}
            </p>

            <p style={styles.text}>
              <strong>Mô tả:</strong> {movie.description}
            </p>

            <button
              style={styles.btn}
              onClick={() => navigate(`/booking/${id}`)}
            >
              Đặt vé ngay
            </button>
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
  },
  {
    id: 2,
    title: "Conan",
    genre: "Hoạt hình - Trinh thám",
    description:
      "Thám tử Conan tiếp tục đối đầu với một vụ án bí ẩn đầy kịch tính.",
    image:
      "https://i.pinimg.com/736x/17/d4/7d/17d47d68b99e54b9722078c2e141462a.jpg",
  },
  {
    id: 3,
    title: "Thanh Xuân 18x2",
    genre: "Tình cảm - Hài",
    description:
      "Hành trình thanh xuân đầy cảm xúc với những kỷ niệm không thể quên.",
    image:
      "https://channel.mediacdn.vn/428462621602512896/2024/4/9/photo-1-17126550554741283678905.jpg",
  },
  {
    id: 4,
    title: "Gia tài của ngoại",
    genre: "Hài - Chính kịch",
    description:
      "Câu chuyện gia đình đầy cảm xúc xoay quanh tài sản thừa kế và những bí mật được giấu kín nhiều năm.",
    image:
      "https://thegioidienanh.vn/stores/news_dataimages/2024/062024/10/08/0220240610080916.jpg?rt=20240610080921https://i1-vnexpress.vnecdn.net/2024/06/09/how-to-make-millions-before-grandma-dies-1717896354.jpg?w=330&h=495&q=100&dpr=1&fit=crop&s=XM2biKtmYSGuIzNjjIZRxw",
  },
];

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: "40px 80px",
  },
  card: {
    display: "flex",
    gap: "40px",
    backgroundColor: "#2f2f2f",
    borderRadius: "20px",
    padding: "30px",
  },
  poster: {
    width: "320px",
    borderRadius: "15px",
  },
  info: {
    flex: 1,
    color: "white",
  },
  title: {
    marginBottom: "20px",
  },
  text: {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#ddd",
  },
  btn: {
    marginTop: "25px",
    padding: "12px 25px",
    background: "#e50914",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default MovieDetail;