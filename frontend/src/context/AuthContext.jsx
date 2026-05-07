import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = async (formData) => {
    const { data } = await API.post("/auth/login", formData);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const register = async (formData) => {
    const { data } = await API.post("/auth/register", formData);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);