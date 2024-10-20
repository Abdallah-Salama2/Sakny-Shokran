import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../components/Card/images/Capture.PNG";
import AgentCard from "../Agents//components/Agents Card";
import "./styles.css";
import { Base_Api_Url } from "../../components/Store/API's";
import Skeleton from "react-loading-skeleton";

export default function PropertyDetails() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("Token");

  const getPropertyDetails = async () => {
    try {
      const response = await axios.get(`${Base_Api_Url}/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("prop,details", response.data.data);
      setPropertyDetails(response.data.data);
      setLoading(false); // Set loading to false after data is successfully fetched
    } catch (err) {
      console.error("Error fetching property details:", err);
      setError("Failed to fetch property details.");
      setLoading(false); // Ensure loading is false in case of an error
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    message: "",
    contact_type: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const modalRef = useRef();

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSuccessMessage(""); // Reset success message when closing
  };

  const getData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://y-sooty-seven.vercel.app/api/api/properties/${id}/inquiries`,
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSuccessMessage("Inquiry sent successfully!"); // Set success message
        setTimeout(() => {
          handleClose(); // Close modal after 3 seconds
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPropertyDetails();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="container">
      {loading ? (
        <Skeleton height={900} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="property">
          <div className="property__header">
            <h1 className="property__title">{propertyDetails.title}</h1>
            <div className="property__price">${propertyDetails.price}</div>
          </div>
          <div className="propertyDetails__info">
            <p className="propertyDetails__address">
              {propertyDetails.address}
            </p>
            <div className="propertyDetails__features">
              <span className="propertyDetails__feature">
                <i className="propertyDetails__feature-icon fa-solid fa-bed"></i>{" "}
                {propertyDetails.beds} Beds
              </span>
              <span className="propertyDetails__feature">
                <i className="propertyDetails__feature-icon fa-solid fa-bath"></i>{" "}
                {propertyDetails.baths} Baths
              </span>
              <span className="propertyDetails__feature">
                <i className="propertyDetails__feature-icon fa-solid fa-ruler-combined"></i>{" "}
                {propertyDetails.area} m²
              </span>
            </div>
            <p
              className={`propertyDetails__status propertyDetails__status--${propertyDetails.status?.toLowerCase()}`}
            >
              {propertyDetails.status}
            </p>
          </div>

          <div className="carousel">
            <div id="propertyDetailsCarousel" className="carousel slide">
              <div className="carousel-inner">
                {propertyDetails.images?.map((image, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={image.id}
                  >
                    <img
                      loading="lazy"
                      src={image.image_url}
                      className="carousel__image d-block w-100"
                      alt={`propertyDetails Image ${image.id}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#propertyDetailsCarousel"
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
                data-bs-target="#propertyDetailsCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="agent">
            <h2 className="agent__title">The Agent</h2>
            <hr className="agent__divider" />
            <AgentCard agent={propertyDetails?.agent} />
          </div>

          <div className="contact-button">
            <button className="contact-button__text" onClick={handleShow}>
              Contact Form
            </button>
          </div>

          {showModal && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog d-flex justify-content-center">
                <div className="modal-content w-75" ref={modalRef}>
                  <div className="modal-header">
                    <h5 className="modal-title">Write to us</h5>
                    <button
                      type="button"
                      className="btn-close btn btn-primary"
                      onClick={handleClose}
                      aria-label="Close"
                    >
                      X
                    </button>
                  </div>
                  <div className="modal-body p-4">
                    {successMessage ? ( // Display success message if available
                      <div className="alert alert-success">
                        {successMessage}
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="form-label" htmlFor="contact">
                            Contact Type
                          </label>
                          <div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="contact_type"
                                id="contactPhone"
                                value="phone"
                                onChange={getData}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="contactPhone"
                              >
                                Phone
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="contact_type"
                                id="contactEmail"
                                value="email"
                                onChange={getData}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="contactEmail"
                              >
                                Email
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="contact_type"
                                id="contactText"
                                value="text"
                                onChange={getData}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="contactText"
                              >
                                Text
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label" htmlFor="phone">
                            Phone
                          </label>
                          <input
                            type="text"
                            id="phone"
                            className="form-control"
                            name="phone_number"
                            onChange={getData}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label" htmlFor="email4">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email4"
                            className="form-control"
                            name="email"
                            onChange={getData}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label" htmlFor="textarea4">
                            Your message
                          </label>
                          <textarea
                            name="message"
                            id="textarea4"
                            rows="4"
                            className="form-control"
                            onChange={getData}
                          ></textarea>
                        </div>
                        {token ? (
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Send
                          </button>
                        ) : (
                          <p className="text-danger text-center">Login First</p>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="website-logo">
            <img src={logo} className="img-fluid" alt="Logo" />
          </div>
        </div>
      )}
    </div>
  );
}
