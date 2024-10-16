import React, { useState, useContext } from "react";
import axios from "axios";
import { ContextToken } from "../Store/token";
import { Link } from "react-router-dom";
import "./styles.css";

export default function AgentPropertyCard({ property, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion state
  let { token } = useContext(ContextToken);

  // Function to delete property with confirmation
  const deleteProperty = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmed) return;

    setIsDeleting(true); // Set loading state

    try {
      const response = await axios.delete(
        `https://y-sooty-seven.vercel.app/api/api/agent/properties/${property.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete Response:", response); // Log response

      if (response.status === 200) {
        // Call the onDelete callback to remove the property from the list
        onDelete(property.id);
        alert("Property deleted successfully.");
      } else {
        alert("Failed to delete the property. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error deleting property:",
        error.response ? error.response : error
      ); // Log full error
      alert("There was an error deleting the property.");
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };
  return (
    <div className="d-flex  gap-2 align-items-center border rounded px-2">
      <div className="d-flex align-items-center gap-2">
        <div className="d-flex flex-column  gap-1 py-2">
          <div className="d-block d-md-flex align-items-center gap-1 me-5 me-md-0">
            <span className="fs-5">{property.price}$</span>
            <div className="fw-bold">
              <span>{property.beds}</span> bds{" "}
              <span className="text-secondary"> | </span>
              <span>{property.baths}</span> ba{" "}
              <span className="text-secondary"> | </span>
              <span>{property.area}</span> m²
            </div>
          </div>
          <span className="text-muted">
            {property.address.split(",")[0] || "Card title"}
          </span>
        </div>

        {/* Property Actions */}
        <section className="row gap-1 justify-content-center py-2">
          <Link
            type="button"
            to={`/details/${property.id}`}
            className="btn btn-outline-secondary col-md-3"
          >
            Preview
          </Link>
          <Link
            type="button"
            className="btn btn-outline-secondary col-md-3"
            to={`/properties/edit/${property.id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-outline-secondary col-md-3"
            onClick={deleteProperty}
            disabled={isDeleting} // Disable button while deleting
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <Link
            type="button"
            className="btn btn-outline-secondary col-md-9"
            to={`/properties/${property.id}/images`}
          >
            Images({property.images.length})
          </Link>
        </section>
      </div>
    </div>
  );
}
