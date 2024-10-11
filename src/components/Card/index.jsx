import React, { useState } from "react";
import Heart from "react-animated-heart";

export default function Card({ property }) {
  const [isClick, setClick] = useState(false);

  const [isFavorite, setFavorite] = useState(false);
  const handleFavorite = (index) => {
    setFavorite((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
        <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
      </div>
    </div>
  );
}
