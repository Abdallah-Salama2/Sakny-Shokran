import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentCard from "../Agents//components/Agents Card";
import { useParams } from "react-router-dom";
import logo from "../../components/Card/images/Capture.PNG";
import "./styles.css";

export default function PropertyDetails() {
  const { id } = useParams();
  let token = localStorage.getItem("Token");
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  function getProperty() {
    axios
      .get(`https://y-sooty-seven.vercel.app/api/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProperty(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getProperty();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!property || !property.images) {
    return <p>No property data available.</p>;
  }

  return (
    <div className="container">
      <div className="property">
        <div className="property__header">
          <h1 className="property__title">{property.title}</h1>
          <div className="property__price">${property.price}</div>
        </div>
        <div className="property__info">
          <p className="property__address">{property.address}</p>
          <div className="property__features">
            <span className="property__feature">
              <i className="property__feature-icon fa-solid fa-bed"></i>{" "}
              {property.beds} Beds
            </span>
            <span className="property__feature">
              <i className="property__feature-icon fa-solid fa-bath"></i>{" "}
              {property.baths} Baths
            </span>
            <span className="property__feature">
              <i className="property__feature-icon fa-solid fa-ruler-combined"></i>{" "}
              {property.area} m²
            </span>
          </div>
          <p
            className={`property__status property__status--${property.status.toLowerCase()}`}
          >
            {property.status}
          </p>
        </div>
      </div>

      <div className="carousel">
        <div id="propertyCarousel" className="carousel slide">
          <div className="carousel-inner">
            {property.images.map((image, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={image.id}
              >
                <img
                  src={image.image_url}
                  className="carousel__image d-block w-100"
                  alt={`Property Image ${image.id}`}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#propertyCarousel"
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
            data-bs-target="#propertyCarousel"
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
        <AgentCard agent={property.agent} />
      </div>

      <div className="contact-button">
        <button className="contact-button__text" onClick={handleShow}>
          Contact Form
        </button>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog d-flex justify-content-center">
            <div className="modal-content w-75">
              <div className="modal-header">
                <h5 className="modal-title">Write to us</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <form>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="name4">
                      Name
                    </label>
                    <input type="text" id="name4" className="form-control" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input type="text" id="phone" className="form-control" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="email4">
                      Email address
                    </label>
                    <input type="email" id="email4" className="form-control" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="textarea4">
                      Your message
                    </label>
                    <textarea
                      id="textarea4"
                      rows="4"
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="d-flex align-items-center mb-4">
                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Phone
                      </label>
                    </div>

                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Text
                      </label>
                    </div>

                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Email
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="website-logo">
        <img src={logo} className="img-fluid" alt="Logo" />
      </div>
    </div>
  );
}
