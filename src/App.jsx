import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Login, Register, Buy, Agents, About } from "./pages";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import AgentLogin from "./pages/AgentLogin";
import User from "./pages/Profile";
import PropertyDetails from "./pages/PropertyDetails";
import PropertInquiries from "./pages/Profile/components/PropertyInquiries";
import CreateProperty from "./pages/Profile/components/AgentProperties/components/CreateProperty";
import EditProperty from "./pages/Profile/components/AgentProperties/components/EditProperty";
import PropertyImage from "./pages/Profile/components/AgentProperties/components/PropertyImage";
import AgentDetails from "./pages/Agents/components/AgentDetails";

export default function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);

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

  return (
    <div>
      <Navbar userData={userData} logout={logout} />
      <Routes>
        <Route path="*" element={<h1>Element Not Found</h1>}></Route>
        <Route path="" element={<Home />}></Route>
        <Route path="home" element={<Home userData={userData} />}></Route>
        <Route path="buy" element={<Buy />}></Route>
        <Route path="rent" element={<Buy />}></Route>
        <Route path="details/:id" element={<PropertyDetails />}></Route>
        <Route path="agents" element={<Agents />}></Route>
        <Route path="agents/:id" element={<AgentDetails />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="profile" element={<User />} />
        <Route path="profile/properties/create" element={<CreateProperty />} />
        <Route path="/properties/edit/:id" element={<EditProperty />} />
        <Route path="/properties/:id/images" element={<PropertyImage />} />

        <Route path="inquiries/:id" element={<PropertInquiries />} />
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
