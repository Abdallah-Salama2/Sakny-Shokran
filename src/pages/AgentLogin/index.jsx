import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ContextData } from "../../components/Store/API's";
import {
  UserContext,
  useUserContext,
} from "../../components/Store/API's/UserContext";
import "./styles.css";
import PasswordInput from "../../components/PasswordInput";

export default function AgentLogin({ saveDataUser }) {
  const { setUserInfo } = useUserContext();

  const { fetchData } = useContext(ContextData);
  // const { fetchData: fetchDataFromUserContext } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //validation for backend
  const [errors, setErrors] = useState(""); //validation for frontend
  const navigate = useNavigate();

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
      setLoading(true); // Start loading

      try {
        // Get CSRF token
        await axios.get(
          "https://y-sooty-seven.vercel.app/api/sanctum/csrf-cookie"
        );

        // Make login request
        const res = await axios.post(
          "https://y-sooty-seven.vercel.app/api/api/agent/login",
          formData
        );
        setUserInfo(res.data.user);

        if (res.data.token) {
          localStorage.setItem("UserName", res.data.agent.name);
          localStorage.setItem("Token", res.data.token);
          localStorage.setItem("userType", res.data.type);
          // await fetchDataFromUserContext();
          // await fetchDataFromContextData();
          saveDataUser();
          // fetchData();
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
      password: Joi.string().required(),
      remember: Joi.required(),
    });

    return schema.validate(formData, { abortEarly: true });
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
      <form className="form  w-75 p-1 text-center" onSubmit={submitHandler}>
        <input
          className="form-control form-control-lg bg-light fs-6 mb-3"
          type="email"
          placeholder="Email"
          name="email"
          onChange={getData}
        />
        <PasswordInput
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
