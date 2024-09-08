import "./styles.css";
import React from "react";

export default function Option({ id, name, label, checked, handleClick }) {
  return (
    <li className="nav-item">
      <input
        type="radio"
        className="btn-check "
        name={name}
        id={id}
        autoComplete="off"
        checked={checked}
        onChange={handleClick} // Call the click handler when clicked
      />
      <label
        className="btn btn-outline-secondary border border-0 mx-2"
        htmlFor={id}
      >
        {label}
      </label>
    </li>
  );
}
