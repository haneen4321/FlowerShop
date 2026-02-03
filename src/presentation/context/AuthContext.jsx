import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false); // ✅ جديد

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("currentUser");
      }
    }

    setAuthReady(true);
  }, []);


  const login = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, authReady, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}