import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [agentProperties, setAgentProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("Token");
  const userType = localStorage.getItem("userType");

  const fetchData = async () => {
    try {
      const [userInfoRes, agentPropertiesRes, favoritesRes, inquiriesRes] =
        await Promise.all([
          axios.get("http://127.0.0.1:8000/api/loggedInUser", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/agent/properties", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/preferences", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          axios.get(
            userType === "client"
              ? "http://127.0.0.1:8000/api/user/inquiries"
              : "http://127.0.0.1:8000/api/agent/inquiries",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

      console.log("User Info Response:", userInfoRes.data);
      console.log("Agent Properties Response:", agentPropertiesRes.data);
      console.log("Favorites Response:", favoritesRes.data);
      console.log("Inquiries Response:", inquiriesRes.data);

      setUserInfo(userInfoRes.data);
      setAgentProperties(agentPropertiesRes.data.data);
      setFavorites(favoritesRes.data);
      setInquiries(
        userType === "client"
          ? inquiriesRes.data.inquiries
          : inquiriesRes.data.properties
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [token]);
  // Logout function to clear state and localStorage
  const logout = () => {
    setUserInfo(null);
    setAgentProperties([]);
    setFavorites([]);
    setInquiries([]);
    localStorage.removeItem("Token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("userType");
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        agentProperties,
        favorites,
        inquiries,
        loading,
        error,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
