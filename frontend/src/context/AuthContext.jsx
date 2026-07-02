import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [cardIds, setCardIds] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    const storedCardIds = localStorage.getItem("cardIds");

    if (storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setCardIds(JSON.parse(storedCardIds));
    }
  }, []);

  const value = {
    user,
    token,
    cardIds,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
