import { createContext, useEffect, useState } from "react";

// Create the context
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from localStorage when the app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("Token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("Token", token);
    } else {
      localStorage.removeItem("Token");
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
