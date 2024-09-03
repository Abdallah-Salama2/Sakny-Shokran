import { Link, useNavigate } from "react-router-dom";
import React from "react";
import NavLink from "./components/NavLink";
import Logo from "./images/Logo.png";
import "./styles.css";

let navLinks = [
  { name: "Buy", path: "buy" },
  { name: "Rent", path: "rent" },
  { name: "Agents", path: "agents" },
  { name: "About", path: "about" },
];
export default function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
      <div className="container ">
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
        <div className="w-75 flex justify-content-between">
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 h5 ">
              {navLinks.map((link) => {
                return <NavLink key={link.name} link={link} />;
              })}
            </ul>
            <button
              className="btn btn-outline-secondary me-2 ms-auto"
              onClick={handleRegisterClick}
            >
              Join now
            </button>
            <button
              className="btn btn-outline-primary "
              onClick={handleLoginClick}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
