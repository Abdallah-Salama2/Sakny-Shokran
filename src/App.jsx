import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Navbar } from "./components";
import { ContextData } from "./components/Store/API's";
import { useUserContext } from "./components/Store/API's/UserContext";
import { About, Agents, Buy, Home, Login, Register } from "./pages";
import AgentLogin from "./pages/AgentLogin";
import AgentDetails from "./pages/Agents/components/AgentDetails";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import User from "./pages/Profile";
import CreateProperty from "./pages/Profile/components/AgentProperties/components/CreateProperty";
import EditProperty from "./pages/Profile/components/AgentProperties/components/EditProperty";
import PropertyImage from "./pages/Profile/components/AgentProperties/components/PropertyImage";
import PropertInquiries from "./pages/Profile/components/PropertyInquiries";
import PropertyDetails from "./pages/PropertyDetails";

export default function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { logout: userLogout } = useUserContext();
  const { logout: contextLogout } = useContext(ContextData);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const { fetchData } = useContext(ContextData);

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
    setLoading(true); // Start loading

    const token = localStorage.getItem("Token");

    console.log(token);
    axios
      .post(
        "https://y-sooty-seven.vercel.app/api/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUserData(null);
        localStorage.clear();
        userLogout();
        contextLogout();
        navigate("/login");
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  }

  //Routes
  return (
    <div>
      <Navbar userData={userData} logout={logout} loading={loading} />
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

        {/* Wrap Login and AgentLogin Routes with LoadingWrapper */}
        <Route path="login" element={<Login saveDataUser={saveDataUser} />} />
        <Route
          path="agentLogin"
          element={<AgentLogin saveDataUser={saveDataUser} />}
        />
        <Route
          path="register"
          element={<Register saveDataUser={saveDataUser} />}
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}
