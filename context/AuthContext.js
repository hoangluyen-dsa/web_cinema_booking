import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(); // tạo một vùng dữ liệu toàn cục, như kho dữ liệu chung

export const AuthProvider = ({ children }) => { // component bao bọc toàn bộ app
  const [user, setUser] = useState(null); // lưu người dùng đăng nhập
  const [movies, setMovies] = useState([]); // lưu danh sách phim
  const [tickets, setTickets] = useState([]); // lưu danh sách vé đặt

  /* =========================
     INIT DATA
  ========================== */
  useEffect(() => {
    // Tạo admin mặc định nếu chưa có
    const users = JSON.parse(localStorage.getItem("users")) || []; // lấy danh sách từ localStorage

    const adminExists = users.find((u) => u.username === "admin"); // tìm user có username=admin

    if (!adminExists) {
      const adminUser = {
        username: "admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
      };

      users.push(adminUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Load user hiện tại
    const storedUser = localStorage.getItem("currentUser"); // lấy user đăng nhập trước đó
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } // nếu có thì cập nhật state

    // Load movies
    const storedMovies =
      JSON.parse(localStorage.getItem("movies")) || []; // lấy phim từ localStorage
    setMovies(storedMovies);

    // Load tickets
    const storedTickets =
      JSON.parse(localStorage.getItem("tickets")) || []; // lấy vé từ localStorage
    setTickets(storedTickets);
  }, []);

  /* =========================
     AUTH
  ========================== */
  const login = (username, password) => { // nhập username + password
    const users =
      JSON.parse(localStorage.getItem("users")) || []; // lấy danh sách users

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    ); // tìm user trùng username và password

    if (!foundUser) return null; // không tìm thấy trả về null

    setUser(foundUser);
    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    ); // lưu user vào state và localStorage để giữ trạng thái đăng nhập

    return foundUser.role; // trả về role admin hay user
  };

  const logout = () => {
    setUser(null); // xóa state
    localStorage.removeItem("currentUser"); // xóa khỏi localStorage
  };

  const register = (username, email, password) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existed = users.find(
      (u) => u.username === username
    );
    if (existed) return false; // kiểm tra có trùng username, trùng thì không cho đăng ký

    const newUser = {
      username,
      email,
      password,
      role: "user",
    }; // tạo user mới

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true; // đăng ký thành công
  };

  /* =========================
     MOVIES CRUD
  ========================== */
  const addMovie = (movie) => {
    const newMovie = { id: Date.now(), ...movie }; // tạo id bằng timestamp
    const updated = [...movies, newMovie]; // tạo mảng mới
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated)); // Cập nhật state + lưu localStorage.
  };

  const deleteMovie = (id) => {
    const updated = movies.filter((m) => m.id !== id); // lọc bỏ phim theo id.
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  };

  const updateMovie = (id, updatedMovie) => {
    const updated = movies.map((m) =>
      m.id === id ? { ...m, ...updatedMovie } : m // nếu id trùng thì cập nhật dữ liệu
    );
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  };

  /* =========================
     BOOKING
  ========================== */
  const bookTicket = (
    movie,
    cinema,
    showtime,
    seats,
    total,
    date
  ) => {
    const newTicket = {
      code: "T" + Date.now(),
      username: user.username, // lưu người đặt
      movie,
      cinema,
      showtime,
      seats,
      total,
      date,
    };

    const updatedTickets = [...tickets, newTicket];

    setTickets(updatedTickets);
    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedTickets) // cập nhật state + lưu localStorage
    );

    return newTicket; // trả về vé mới tạo
  };

  const cancelTicket = (code) => {
    const updated = tickets.filter(
      (t) => t.code !== code // lọc bỏ vé theo code
    );
    setTickets(updated);
    localStorage.setItem(
      "tickets",
      JSON.stringify(updated)
    );
  };

  /* =========================
     PROFILE
  ========================== */
  const updateProfile = (newData) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.username === user.username
        ? { ...u, ...newData }
        : u
    ); // cập nhật thông tin người dùng

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );
  };

  const changePassword = (oldPass, newPass) => {
    if (oldPass !== user.password) {
      alert("Mật khẩu cũ không đúng!");
      return false;
    }

    updateProfile({ password: newPass });
    alert("Đổi mật khẩu thành công!");
    return true;
  };

  return (
    <AuthContext.Provider // cung cấp context cho toàn bộ ứng dụng
      value={{
        user,
        movies,
        tickets,
        login,
        logout,
        register,
        addMovie,
        deleteMovie,
        updateMovie,
        bookTicket,
        cancelTicket,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // hook để sử dụng context
