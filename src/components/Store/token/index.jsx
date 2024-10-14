import { createContext, useEffect, useState } from "react";

// Create the context
export const  ContextToken = createContext(0);

export const ContextTokenProvider = ({ children }) => {
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
    <ContextToken.Provider value={{ token, setToken }}>
      {children}
    </ContextToken.Provider>
  );
};
