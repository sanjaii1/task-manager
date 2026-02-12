import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function useAuth() {
  const { user, login, logout } = useContext(AuthContext);

  const handleLogin = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    login(res.data);
  };

  const handleRegister = async (form) => {
    await API.post("/auth/register", form);
  };

  return { user, logout, handleLogin, handleRegister };
}
