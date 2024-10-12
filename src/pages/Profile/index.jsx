import "./styles.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserFavourites from "./components/UserFavourites";
import UserInfo from "./components/UserInfo";
import AgentProperties from "./components/AgentProperties"; // Make sure this component exists
import Inquiries from "./components/Inquiries";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("info");
  const [userType, setUserType] = useState("");

  const renderContent = () => {
    switch (activeSection) {
      case "info":
        return <UserInfo />;
      case "favs":
        return userType === "client" ? <UserFavourites /> : <p>No favourites for this user type</p>;
      case "props":
        return userType === "agent" ? <AgentProperties /> : <p>No properties for this user type</p>;
      case "inquiries":
        return <Inquiries/>;
      default:
        return <p>Select a section</p>;
    }
  };

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        {/* Left side (menu) */}
        <div className="col-3 bg-light vh-100">
          <ul className="list-group">
            <li
              className={`list-group-item ${activeSection === "info" ? "active" : ""}`}
              onClick={() => setActiveSection("info")}
              style={{ cursor: "pointer" }}
            >
              Info
            </li>
            {userType === "client" && (
              <li
                className={`list-group-item ${activeSection === "favs" ? "active" : ""}`}
                onClick={() => setActiveSection("favs")}
                style={{ cursor: "pointer" }}
              >
                Favourites
              </li>
            )}
            {userType === "agent" && (
              <li
                className={`list-group-item ${activeSection === "props" ? "active" : ""}`}
                onClick={() => setActiveSection("props")}
                style={{ cursor: "pointer" }}
              >
                Properties
              </li>
            )}
            <li
              className={`list-group-item ${activeSection === "inquiries" ? "active" : ""}`}
              onClick={() => setActiveSection("inquiries")}
              style={{ cursor: "pointer" }}
            >
              Inquiries
            </li>
          </ul>
        </div>

        {/* Right side (changing content) */}
        <div className="col-9">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
