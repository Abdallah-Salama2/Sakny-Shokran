import React, { useState, useEffect, useContext } from "react";
import Heart from "react-animated-heart";
import axios from "axios";
import logo from "./images/Capture.PNG";
import { ContextToken } from "../Store/token";
import { Link } from "react-router-dom";

export default function Card({ property }) {
  const [isClick, setClick] = useState(false);
  let { token } = useContext(ContextToken);
  let userType = localStorage.getItem("userType");

  useEffect(() => {
    setClick(property.favoriteStats === 1);
  }, [property.favoriteStats]);

  const handleFavorite = async () => {
    if (!token) {
      // If user is not authenticated, just toggle the heart color
      setClick(!isClick);
      return;
    }
    try {
      setClick(!isClick);
      const response = await axios.post(
        `https://y-sooty-seven.vercel.app/api/api/preferences/${property.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div
      className="card h-100  shadow-sm"
      style={{
        maxWidth: "310px", // Restrict card width
        margin: "auto", // Center the card
        border: "1px solid #ddd", // Border for card
        backgroundColor: "#fff", // Background color for card
      }}
    >
      <div
        id={`carousel-${property.id}`}
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {property.images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={image.id}
            >
              <img
                src={image.image_url}
                className="d-block w-100 "
                alt={`Property Image ${image.id}`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "200px", // Smaller height for image
                  borderRadius: "8px", // Smooth corners
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carousel-${property.id}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carousel-${property.id}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="card-body p-3">
        <Link to={`/details/${property.id}`} style={{ textDecoration: "none" }}>
          <h5 className="card-title fs-6  text-muted">
            {property.address.split(",")[0] || "Card title"}
          </h5>
          {/* <p className="card-text  mb-1 fw-bold">
          {property.description.length > 60
            ? property.description.substring(0, 60) + "..."
            : property.description || "No description"}
        </p> */}
          <p className="fw-semibold small">
            {property.city} | {property.address}
          </p>
        </Link>
      </div>
      <Link to={`/details/${property.id}`} style={{ textDecoration: "none" }}>
        <div className="px-3">
          <div className="d-flex justify-content-start align-items-center gap-2  text-muted flex-wrap">
            <span className="fw-semibold fs-6 text-black">Single Family</span>
            <span>| </span>
            <br />
            <span>
              <i className="fa-solid fa-bed" /> {property.beds}
            </span>
            <span>|</span>
            <span>
              <i className="fa-solid fa-bath" /> {property.baths}
            </span>
            <span>|</span>
            <span>
              <i className="fa-solid fa-ruler-combined" /> {property.area} m²
            </span>
          </div>
        </div>
        <div className="px-3 d-flex justify-content-between align-content-center mt-3">
          <p className=" ">
            <span
              className={`fw-bold ${
                property.status === "Available" ? "text-success" : "text-danger"
              }`}
            >
              {property.status}
            </span>
          </p>
          <div className="" style={{ width: "80px" }}>
            <img src={logo} className="w-100"></img>
          </div>
        </div>
      </Link>

      <div className="card-footer d-flex justify-content-between align-items-center p-3 m-0">
        <p className=" fw-semibold fst-italic m-0 p-0">
          Price:
          <span className="text-dark ps-2">
            {property.price.toLocaleString()}$
          </span>
        </p>
        {userType !== "agent" && (
          <div onClick={handleFavorite} style={{ cursor: "pointer" }}>
            <i
              className={`fa-heart fs-4 ${isClick ? "fa-solid" : "fa-regular"}`}
              style={{
                transition: "all 0.3s ease",
                color: isClick ? "#f00" : "#000",
              }}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}
