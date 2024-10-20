import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ placeholder, name, onChange, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="position-relative mb-3 ">
      <input
        className="form-control form-control-lg bg-light fs-6 ps-10 w-full"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={required}
      />

      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="h-5 w-5 position-absolute end-0 pe-3 translate-middle-y top-50 "
        style={{ cursor: "pointer" }}
        onClick={togglePasswordVisibility}
      />
    </div>
  );
};

export default PasswordInput;
