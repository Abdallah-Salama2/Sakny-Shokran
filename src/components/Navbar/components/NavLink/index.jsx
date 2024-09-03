import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavLink({ link }) {
  const location = useLocation();
  const isActive = location.pathname === `/${link.path}`;

  return (
    <li className="nav-item">
      <Link
        className={`nav-link pe-3 ${isActive ? "active" : ""}`}
        aria-current={isActive ? "page" : undefined}
        to={link.path}
      >
        {link.name}
      </Link>
    </li>
  );
}
