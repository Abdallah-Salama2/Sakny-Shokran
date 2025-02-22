import "./styles.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { useUserContext } from "../../components/Store/API's/UserContext";
import PasswordInput from "../../components/PasswordInput";
import { ContextData } from "../../components/Store/API's";

export default function Register({ saveDataUser }) {
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); //validation for backend
  const [errors, setErrors] = useState(""); //validation for frontend
  const navigate = useNavigate();
  const { setUserInfo } = useUserContext();
  const { fetchData: fetchDataFromContextData } = useContext(ContextData);

  const [formData, setFormData] = useState({
    name: "",
    // dateOfBirth: "2024-09-04",
    email: "",
    password: "",
    phone_number: "",
    password_confirmation: "",
  });

  function getData(e) {
    let data = { ...formData };

    data[e.target.name] = e.target.value;
    setFormData(data);
    console.log(data);
    // set data now in formData to send it to api
  }

  function submitHandler(e) {
    e.preventDefault(); // prevent page reload

    let statusError = validateData();
    if (statusError?.error) {
      setErrors(statusError?.error.details);
    } else {
      axios
        .post("https://y-sooty-seven.vercel.app/api/api/register", formData)
        .then((res) => {
          setUserInfo(res.data.user);

          if (res.data.token) {
            localStorage.setItem("UserName", res.data.user.name);
            localStorage.setItem("userType", res.data.type);
            localStorage.setItem("Token", res.data.token);
            saveDataUser();
            navigate("/home");
          } else {
            setErrorMessage("Login failed, token not generated.");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            setErrorMessage("Invalid credentials.");
          } else if (err.response && err.response.data) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        });
    }
  }

  function validateData() {
    let schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().required(),
      password_confirmation: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
        }),
      phone_number: Joi.number().required(), // Added dateOfBirth validation
    });

    return schema.validate(formData, { abortEarly: false });
  }

  return (
    <div
      className="content container justify-content-center align-items-center d-flex shadow-lg flex-column"
      id="content"
    >
      <h2>Register</h2>
      {errorMessage.length > 0 && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      {errors?.length > 0 &&
        errors.map((err, i) => (
          <div key={i} className="alert alert-danger">
            <strong>Error:</strong> {err.message}
          </div>
        ))}
      <form className="form  w-75 p-1" onSubmit={submitHandler}>
        <input
          className="form-control form-control-lg bg-light fs-6 mb-3"
          type="text"
          placeholder="Name"
          name="name"
          onChange={getData}
          required
        />
        <input
          className="form-control form-control-lg bg-light fs-6 mb-3"
          type="email"
          placeholder="Email"
          name="email"
          onChange={getData}
          required
        />
        <input
          className="form-control form-control-lg bg-light fs-6 mb-3"
          type="number"
          placeholder="Phone Number"
          name="phone_number"
          onChange={getData}
          required
        />
        <PasswordInput
          placeholder="Password"
          name="password"
          onChange={getData}
          required
        />
        <PasswordInput
          placeholder="Confirm Password"
          name="password_confirmation"
          onChange={getData}
          required
        />

        <div className="">
          <Link
            to="/login"
            className="text-decoration-none"
            style={{ color: "rgb(160, 128, 22)" }}
          >
            Already have an account?
          </Link>
        </div>
        <div className="buttons-group d-flex justify-content-center">
          <button className="btn border-white text-white fs-6" type="submit">
            Register
          </button>
        </div>
      </form>
      {/* <p className="text-black">{message}</p> */}
    </div>
  );
}
