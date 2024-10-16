import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import React, { useContext, useEffect, useState } from "react";
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
import { useUserContext } from "./components/Store/API's/UserContext";
import { ContextData } from "./components/Store/API's";
import { ClipLoader } from "react-spinners";

export default function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { logout: userLogout } = useUserContext();
  const { logout: contextLogout } = useContext(ContextData);

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
    const token = localStorage.getItem("Token");

    console.log(token);
    axios
      .post(
        "http://127.0.0.1:8000/api/logout",
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
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  }

  const LoadingWrapper = ({ children }) => {
    const { loading: userLoading, error: userError } = useUserContext();
    const { loading: contextLoading, error: contextError } =
      React.useContext(ContextData);

    if (userLoading || contextLoading) {
      return (
        <div className="spinner-container d-flex flex-column justify-content-center align-items-center vh-100">
          <ClipLoader size={150} color={"#123abc"} loading={true} />
          <h3>Loading Data...</h3>
        </div>
      );
    }

    if (userError || contextError) {
      return <div>Error: {userError || contextError}</div>;
    }

    return children;
  };
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

        {/* Wrap Login and AgentLogin Routes with LoadingWrapper */}
        <Route
          path="login"
          element={
            <LoadingWrapper>
              <Login saveDataUser={saveDataUser} />
            </LoadingWrapper>
          }
        />
        <Route
          path="agentLogin"
          element={
            <LoadingWrapper>
              <AgentLogin saveDataUser={saveDataUser} />
            </LoadingWrapper>
          }
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
