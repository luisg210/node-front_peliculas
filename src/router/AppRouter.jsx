import { Routes, Route, Navigate } from "react-router-dom";
import { ListMovie } from "../modules/movie/ListMovie";
import { Navbar } from "../shared/Navbar";
import { Login } from "../modules/auth/Login";
import { Register } from "../modules/auth/Register";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import api from "../api/api";

export const AppRouter = () => {
  const { token, logout, login, email } = useContext(AuthContext);

  const checkAuthToken = async () => {
    
    if (!token) return logout();

    try {
      const { data } = await api.post("users/api/v1/renew", {email, token});
      
      login(data.token, data.user.email, data.user.role);
      
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      {!token ? (
        <Route path="/" element={<Navbar />}>
          <Route index element={<ListMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <Route path="/" element={<Navbar />}>
          <Route index element={<ListMovie />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
};
