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
      <img
        src={property.preview_image_url.src || "Home Image"}
        className="image rounded-top-5"
        alt={property.image_url || "Home Image"}
        style={{ objectFit: "cover", width: "100%", height: "250px " }}
      />
      <div className="card-body">
        <h5 className="card-title">{property.title || "Card title"}</h5>
        <p className="card-text">{property.description || "No description"}</p>
      </div>
      <div className="card-body d-flex justify-content-between align-items-center">
        <p>$ {property.price}</p>
         <Heart isClick={isClick} onClick={handleFavorite} />
      </div>
    </div>
  );
}
