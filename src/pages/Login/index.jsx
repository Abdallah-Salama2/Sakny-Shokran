import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./styles.css";
import { ContextData } from "../../components/Store/API's";
import { UserContext } from "../../components/Store/API's/UserContext";

export default function Login({ saveDataUser }) {
  const { fetchData: fetchDataFromContextData } = useContext(ContextData);
  const { fetchData: fetchDataFromUserContext } = useContext(UserContext);

  const [loading, setLoading] = useState(false); // State for loading spinner

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); //validation for backend
  const [errors, setErrors] = useState(""); //validation for frontend
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false, // add remember field
  });
  function getData(e) {
    let data = { ...formData };
    if (e.target.name === "remember") {
      data[e.target.name] = e.target.checked; // handle checkbox
    } else {
      data[e.target.name] = e.target.value;
    }
    setFormData(data);
    console.log(data);
    // set data now in formData to send it to api
  }

  async function submitHandler(e) {
    e.preventDefault();

    let statusError = validateData();
    if (statusError?.error) {
      setErrors(statusError?.error.details);
    } else {
      setLoading(true); // Start loading
      try {
        // Get CSRF token
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

        // Make login request
        const res = await axios.post(
          "http://127.0.0.1:8000/api/login",
          formData
        );

        if (res.data.token) {
          localStorage.setItem("UserName", res.data.user.name);
          localStorage.setItem("userType", res.data.type);
          localStorage.setItem("Token", res.data.token);
          saveDataUser();

          // await Promise.all([
          //   fetchDataFromContextData(),
          //   fetchDataFromUserContext(),
          // ]);

          navigate("/home");
        } else {
          setErrorMessage("Login failed,  False Credentials.");
        }
      } catch (err) {
        console.error("Login error: ", err);
        if (err.response && err.response.status === 401) {
          setErrorMessage("Invalid credentials.");
        } else if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      } finally {
        setLoading(false); // End loading
      }
    }
  }

  function validateData() {
    let schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "org"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      remember: Joi.required(),
    });

    return schema.validate(formData, { abortEarly: true });
  }

  return (
    <div
      className="content container justify-content-center align-items-center d-flex shadow-lg flex-column"
      id="content"
    >
      <h2>Login</h2>
      {/* Conditionally show error message if it exists */}
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
      <form className="form  w-75 p-1 text-center" onSubmit={submitHandler}>
        <input
          className="form-control form-control-lg bg-light fs-6 mb-3"
          type="email"
          placeholder="Email"
          name="email"
          onChange={getData}
        />
        <input
          className="form-control form-control-lg bg-light fs-6 mb-3"
          type="password"
          placeholder="Password"
          name="password"
          onChange={getData}
        />

        {/*  Checkbox to Remember Me */}
        <div className="d-flex justify-content-between mt-4">
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              name="remember"
              onChange={getData}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember Me
            </label>
          </div>

          <div className="">
            <Link
              to="/forgot-password"
              className="text-decoration-none"
              style={{ color: "rgb(160, 128, 22)" }}
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="buttons-group d-flex justify-content-between">
          <button type="submit" disabled={loading}>
            {loading ? (
              <ClipLoader size={20} color={"#fff"} /> // Display spinner during loading
            ) : (
              "Login"
            )}
          </button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </form>
    </div>
  );
}
