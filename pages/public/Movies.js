import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../../layouts/PublicLayout";

function Movies() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const handleBooking = (movieId) => {
    if (!user) {
      alert("Vui lòng đăng nhập để đặt vé!");
      navigate("/login");
      return;
    }

    if (user.role !== "user") {
      alert("Chỉ khách hàng mới được đặt vé!");
      return;
    }

    navigate(`/booking/${movieId}`);
  };

  // Lọc phim theo tên
  const filterMovies = (list) =>
    list.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <PublicLayout>
      <div style={styles.section}>
        {/* SEARCH BAR */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="🔍 Tìm kiếm phim..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* PHIM ĐANG CHIẾU */}
        <h2 style={styles.title}>🎬 Phim đang chiếu</h2>

        <div style={styles.grid}>
          {filterMovies(nowShowing).map((movie) => (
            <div key={movie.id} style={styles.card}>
              <img src={movie.image} alt={movie.title} style={styles.poster} />
              <h4 style={styles.movieTitle}>{movie.title}</h4>
              <p style={styles.genre}>{movie.genre}</p>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.detailBtn}
                  onClick={() =>
                    navigate(`/movies/${movie.id}`, {
                         state: movie,
  })
}
                >
                  Chi tiết
                </button>

                <button
                  style={styles.bookingBtn}
                  onClick={() => handleBooking(movie.id)}
                >
                  Đặt vé
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PHIM SẮP CHIẾU */}
        {/* PHIM SẮP CHIẾU */}
<h2 style={{ ...styles.title, marginTop: "60px" }}>
  🎥 Phim sắp chiếu
</h2>

<div style={styles.grid}>
  {filterMovies(comingSoon).map((movie) => (
    <div key={movie.id} style={styles.card}>
      <img src={movie.image} alt={movie.title} style={styles.poster} />
      <h4 style={styles.movieTitle}>{movie.title}</h4>
      <p style={styles.genre}>{movie.genre}</p>

      <div style={styles.buttonGroup}>
        <button
          style={styles.detailBtn}
          onClick={() =>
            navigate(`/movies/${movie.id}`, {
              state: movie,
            })
          }
        >
          Chi tiết
        </button>

        <button style={styles.comingBtn}>
          Sắp ra mắt
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </PublicLayout>
  );
}

/* ================= DATA ================= */

const nowShowing = [
  {
    id: 1,
    title: "Mưa đỏ",
    genre: "Lịch sử- Chiến tranh- Chính kịch",
    image:
      "https://upload.wikimedia.org/wikipedia/vi/4/49/Mua_do_poster.jpg",
    description:
      "Bộ phim tái hiện lại những trận chiến ác liệt trong thời kỳ chiến tranh, khắc họa tinh thần chiến đấu và tình đồng đội thiêng liêng.",
  },
  {
    id: 2,
    title: "Conan",
    genre: "Hoạt hình",
    image:
      "https://i.pinimg.com/736x/17/d4/7d/17d47d68b99e54b9722078c2e141462a.jpg",
    description:
      "Thám tử lừng danh Conan tiếp tục đối mặt với một vụ án bí ẩn đầy kịch tính và những màn suy luận căng não.",
  },
];

const comingSoon = [
  
  
  {
    id: 3,
    title: "Thanh Xuân 18x2",
    genre: "Hài/ Tình cảm",
    image:
      "https://channel.mediacdn.vn/428462621602512896/2024/4/9/photo-1-17126550554741283678905.jpg",
    description:
      "Một hành trình thanh xuân đầy hoài niệm, nơi những cảm xúc đầu đời được tái hiện một cách chân thực và sâu sắc.",
  },
  {
    id: 4,
    title: "Gia tài của ngoại",
    genre: "Hài/ Chính kịch",
    image:
      "https://i1-vnexpress.vnecdn.net/2024/06/09/how-to-make-millions-before-grandma-dies-1717896354.jpg?w=330&h=495&q=100&dpr=1&fit=crop&s=XM2biKtmYSGuIzNjjIZRxw",
    description:
      "Câu chuyện gia đình đầy cảm xúc xoay quanh tài sản thừa kế và những bí mật được giấu kín nhiều năm.",
  },
];

/* ================= STYLE ================= */

const styles = {
  section: {
    padding: "40px 60px",
    background: "#111",
    minHeight: "100vh",
    color: "white",
  },

  searchWrapper: {
    textAlign: "center",
    marginBottom: "40px",
  },

  searchInput: {
    width: "400px",
    padding: "12px 20px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },

  title: {
    borderLeft: "5px solid #e50914",
    paddingLeft: "15px",
    marginBottom: "30px",
    fontSize: "22px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 260px))",
    justifyContent: "start",
    gap: "30px",
  },

  card: {
  background: "#1c1c1c",
  padding: "15px",
  borderRadius: "15px",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  overflow: "hidden", // QUAN TRỌNG
},

  poster: {
  width: "100%",
  height: "350px",      // cố định chiều cao
  objectFit: "cover",   // giữ tỷ lệ và cắt ảnh cho đẹp
  borderRadius: "12px",
  marginBottom: "15px",
},

  movieTitle: {
    margin: "10px 0 5px",
  },

  genre: {
    color: "#bbb",
    marginBottom: "15px",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  detailBtn: {
    padding: "8px 12px",
    background: "#444",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  bookingBtn: {
    padding: "8px 12px",
    background: "#e50914",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  comingBtn: {
    padding: "8px 12px",
    background: "#555",
    border: "none",
    borderRadius: "6px",
    color: "#ccc",
    cursor: "not-allowed",
  },
};

export default Movies;