import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import axios from "axios";

export default function Card({ property }) {
  const [isClick, setClick] = useState(false);
  let token = localStorage.getItem("Token"); // Fetch token from local storage

  // Initialize heart click state based on favoriteStats from the property
  useEffect(() => {
    setClick(property.favoriteStats === 1);
  }, [property.favoriteStats]);

  // Handle favorite status change
  const handleFavorite = async () => {
    try {
      // Send POST request to toggle favorite status
      const response = await axios.post(
        `https://y-sooty-seven.vercel.app/api/api/preferences/${property.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in request headers
          },
        }
      );
      
      // Toggle the heart click state on successful API response
      setClick(!isClick);
      console.log(response.data); // Optionally log the response
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
<div className="card h-100 rounded-5">
  <div id={`carousel-${property.id}`} className="carousel slide rounded-top-5" data-bs-ride="carousel">
    <div className="carousel-inner">
      {property.images.map((image, index) => (
        <div
          className={`carousel-item ${index === 0 ? "active" : ""}`}
          key={image.id}
        >
          <img
            src={image.image_url}
            className="d-block w-100 rounded-top-5"
            alt={`Property Image ${image.id}`}
            style={{ objectFit: "cover", width: "100%", height: "250px" }}
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
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target={`#carousel-${property.id}`}
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>

  <div className="card-body">
    <h5 className="card-title">{property.title || "Card title"}</h5>
    <p className="card-text">{property.description || "No description"}</p>
    <p>
      {property.city} | {property.address}
    </p>
    <div className="fs-5">
      <i className="fa-solid fa-bed" />
      <span> {property.beds} |</span>
      <i className="fa-solid fa-bath" />
      <span> {property.baths} |</span>
      <i className="fa-solid fa-ruler-combined" />
      <span> {property.area} |</span>
      <i className="fa-solid fa-tree-city" />
    </div>
   
    <p>
      Status:{" "}
      <span
        className={`fw-bold ${
          property.status === "Available" ? "text-success" : "text-danger"
        }`}
      >
        {property.status}
      </span>
    </p>
  </div>
  <hr class="border border-dark border-3 opacity-75"></hr>

  <div className="card-body d-flex justify-content-between align-items-center">
  <p>
      Price: <span className="fw-bold">${property.price}</span>
    </p>    <Heart isClick={isClick} onClick={handleFavorite} />
  </div>
</div>

  );
}
