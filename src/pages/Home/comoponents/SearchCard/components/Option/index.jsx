import "./styles.css";
import React from "react";

export default function Option({ id, name, label, checked, handleClick }) {
  return (
    <div className="col-12 col-xxl-4 pb-2 pb-xxl-0">
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
    </div>
  );
}
