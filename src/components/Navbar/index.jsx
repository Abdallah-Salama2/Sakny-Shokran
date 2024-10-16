import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavLink from "./components/NavLink";
import Logo from "./images/Logo.png";
import "./styles.css";

let navLinks = [
  { name: "Home", path: "" },
  { name: "Buy", path: "buy" },
  { name: "Rent", path: "rent" },
  { name: "Agents", path: "agents" },
  { name: "About", path: "about" },
];

export default function Navbar({ userData, logout }) {
  const [userType, setuserType] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    // console.log(storedUserType);
    if (storedUserType) {
      setuserType(storedUserType);
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 bg-body rounded z-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand col-6 col-md-3" to="/">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid object-fit-contain"
          ></img>
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            backgroundColor: "#C9A26B",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }} // Inverts color for light icon
          ></span>
        </button>

        {/* Nav Links and Buttons (Dropdown) */}
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{
            zIndex: 999, // Ensures dropdown content is above everything else
          }}
        >
          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 mt-3 mt-lg-0 h5">
            {navLinks.map((link) => (
              <NavLink key={link.name} link={link} />
            ))}
          </ul>

          {/* Sign In / Join Now Section */}
          <div className="d-flex justify-content-center ">
            {userData == null ? (
              <>
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={handleRegisterClick}
                >
                  Join now
                </button>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleLoginClick}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split me-5"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="login">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="agentLogin">
                        Agent Sign In
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <button
                    className="border-0 bg-transparent dropdown-toggle pt-2 pe-3"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("UserName")}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to="profile">
                        User Profile
                      </Link>
                    </li>

                    {userType === "client" && <></>}
                    {userType === "agent" && <></>}
                  </ul>
                </div>
                <button className="btn btn-outline-danger" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
