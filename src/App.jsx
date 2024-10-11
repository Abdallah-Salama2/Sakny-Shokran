import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import React, { Component, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Login, Register, Buy, Agents, About } from "./pages";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import Favorites from "./pages/Profile/Customer/Favorites";
import Profile from "./pages/Profile";
import AgentLogin from "./pages/AgentLogin";
import { ClipLoader } from "react-spinners";

const mockFavorites = [
  { id: 1, title: "Beautiful Family House", location: "New York" },
  { id: 2, title: "Modern Apartment", location: "San Francisco" },
];

const mockForms = [
  { id: 1, formType: "Mortgage Application", date: "2023-01-05" },
  { id: 2, formType: "Rental Application", date: "2023-06-18" },
];
export default function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [favorites, setFavorites] = useState(mockFavorites);
  const [filledForms] = useState(mockForms);
  const [loading, setLoading] = useState(true); // Loading state for spinner

  const updateUserInfo = (updatedInfo) => {
    setUserInfo(updatedInfo);
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  function saveDataUser() {
    let token = localStorage.getItem("Token");
    if (token) {
      try {
        setUserData(token); // Save decoded data in state
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("Token"); // Clear invalid token
      }
    }
  }

  useEffect(() => {
    saveDataUser();

    // Simulate loading for 1000 seconds (1000000 ms)
    setTimeout(() => {
      setLoading(false); // After 1000 seconds, stop loading
    }, 1000); // 1000000ms = 1000 seconds
  }, []);

  function logout() {
    // Get the token from localStorage (if you're using an API token)
    const token = localStorage.getItem("Token");

    console.log(token);
    // Configure the axios request with the Authorization header if using API tokens
    axios
      .post(
        "https://y-sooty-seven.vercel.app/api/api/logout",
        {}, // Send an empty body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the header
          },
        }
      )
      .then(() => {
        setUserData(null); // Clear user data from state
        localStorage.clear();
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  }
  // If loading, show the spinner
  if (loading) {
    return (
      <div className="spinner-container d-flex flex-column justify-content-center align-items-center vh-100">
        <ClipLoader size={150} color={"#123abc"} loading={loading} />
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <div>
      <Navbar userData={userData} logout={logout} />
      <Routes>
        <Route path="*" element={<h1>Element Not Found</h1>}></Route>
        <Route path="" element={<Home />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="buy" element={<Buy />}></Route>
        <Route path="rent" element={<Buy />}></Route>
        <Route path="agents" element={<Agents />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route
          path="profile"
          element={
            <Profile userInfo={userInfo} updateUserInfo={updateUserInfo} />
          }
        ></Route>
        <Route
          path="favorites"
          element={
            <Favorites favorites={favorites} removeFavorite={removeFavorite} />
          }
        ></Route>
        <Route
          path="register"
          element={<Register saveDataUser={saveDataUser} />}
        ></Route>
        <Route path="login" element={<Login saveDataUser={saveDataUser} />} />
        <Route
          path="agentLogin"
          element={<AgentLogin saveDataUser={saveDataUser} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}
