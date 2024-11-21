import React, { useEffect, useState, createContext } from "react";
import { getMe, loginToApi } from "../services/auth.service.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const token = localStorage.getItem("session");
      if (token) {
        const user = await getMe();
        setUser(user);
      }
      setLoading(false);
    };

    checkToken();
  }, []);


  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{ user, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};