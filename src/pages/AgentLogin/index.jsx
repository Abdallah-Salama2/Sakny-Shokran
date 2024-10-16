import "./styles.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { ClipLoader } from "react-spinners";
import { ContextData } from "../../components/Store/API's";

export default function AgentLogin({ saveDataUser }) {
  const { fetchData, loading: contextLoading } = useContext(ContextData);

  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // validation for backend
  const [errors, setErrors] = useState(""); // validation for frontend
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
  }

  async function submitHandler(e) {
    e.preventDefault();

    let statusError = validateData();
    if (statusError?.error) {
      setErrors(statusError?.error.details);
    } else {
      try {
        setLoading(true); // Start loading
        // Get CSRF token
        const csrfResponse = await axios.get(
          "https://y-sooty-seven.vercel.app/api/sanctum/csrf-cookie"
        );
        console.log(csrfResponse);

        // Make login request
        const res = await axios.post(
          "https://y-sooty-seven.vercel.app/api/api/agent/login",
          formData
        );
        console.log(res.data);

        if (res.data.token) {
          localStorage.setItem("UserName", res.data.agent.name);
          localStorage.setItem("Token", res.data.token);
          localStorage.setItem("userType", res.data.type);

          saveDataUser();
          fetchData();

          navigate("/profile");
        } else {
          setErrorMessage("Login failed, False Credentials");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setErrorMessage("Invalid credentials.");
        } else if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
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

  // Show loading spinner if context is loading
  if (contextLoading) {
    return (
      <div className="spinner-container d-flex flex-column justify-content-center align-items-center vh-100">
        <ClipLoader size={150} color={"#123abc"} loading={contextLoading} />
        <h3>Loading Data...</h3>
      </div>
    );
  }

  return (
    <div
      className="content container justify-content-center align-items-center d-flex shadow-lg flex-column"
      id="content"
    >
      <h2>Agent Login</h2>

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

      <form className="form w-75 p-1 text-center" onSubmit={submitHandler}>
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

        {/* Checkbox to Remember Me */}
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
