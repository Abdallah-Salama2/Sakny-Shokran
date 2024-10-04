import { Link, useNavigate } from "react-router-dom";
import React from "react";
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
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3  bg-body rounded z-3">
      <div className="container-fluid ">
        <Link className="navbar-brand  " to="/">
          <img src={Logo} alt="#"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="w-100 flex ">
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            {userData != null && (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 h5 ">
                {navLinks.map((link) => {
                  return <NavLink key={link.name} link={link} />;
                })}
              </ul>
            )}

            {userData == null && (
              <>
                <button
                  className="btn btn-outline-secondary me-2 ms-auto"
                  onClick={handleRegisterClick}
                >
                  Join now
                </button>
                <button
                  className="btn btn-outline-primary me-5"
                  onClick={handleLoginClick}
                >
                  Sign in
                </button>
              </>
            )}
            {userData != null && (
              <>
                <div class="dropdown">
                  <button
                    className="border-0 bg-transparent  dropdown-toggle me-3"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("UserName")}
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link class="dropdown-item" to="profile">
                        User Profile
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="favorites">
                        Favorites
                      </Link>
                    </li>
                  </ul>
                </div>
                <button className="btn btn-outline-primary " onClick={logout}>
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
