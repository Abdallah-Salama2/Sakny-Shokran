import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentCard from "../Agents//components/Agents Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PropertyDetails() {
  let token = localStorage.getItem("Token");
  const [properties, setProperties] = useState(null); // Set to null initially to avoid undefined issues
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  function getProperty() {
    axios
      .get(`https://y-sooty-seven.vercel.app/api/api/properties/1`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProperties(res.data.data);
        setLoading(false); // Stop loading once data is received
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even in case of error
      });
  }

  useEffect(() => {
    getProperty();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!properties || !properties.images) {
    return <p>No property data available.</p>;
  }
  return (
    <>
    {/* property info */}
      <div>
        <h3>{properties.title}</h3>
        <p>{properties.description}</p>
        <p className="">
          {properties.city} | {properties.address}
        </p>
        <div className="fs-5">
          <i className="fa-solid fa-bed" />
          <span> {properties.beds} |</span>
          <i className="fa-solid fa-bath" />
          <span> {properties.baths} |</span>
          <i className="fa-solid fa-ruler-combined" />
          <span> {properties.area} |</span>
          <i className="fa-solid fa-tree-city" />
        </div>
        <p>
          Price: $<span>{properties.price}</span>
        </p>
        <p>
          Status:{" "}
          <span
            className={`fw-bold ${
              properties.status === "Available" ? "text-success" : "text-danger"
            }`}
          >
            {properties.status}
          </span>
        </p>
      </div>
      {/* images carousel */}
      <div id="carouselExample" className="carousel slide w-50">
        <div className="carousel-inner">
          {properties.images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={image.id}
            >
              <img
                src={image.image_url}
                className="d-block w-100"
                alt={`Property Image ${image.id}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
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
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* agent */}
      <h1>Listing agent</h1>
      <hr className="border border-dark border-3 opacity-75 w-25"></hr>
      <div style={{ width: "800px" }}>
        <AgentCard key={properties.agent.id} agent={properties.agent} />
      </div>
      {/* details */}
      <h1>The Details</h1>
      <hr className="border border-dark border-3 opacity-75 w-25"></hr>
      <p>{properties.description}</p>

      {/* Button trigger modal */}
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        Contact Form
      </button>

      {/* Modal */}
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
                  {/* Name input */}
                  <label className="form-label" htmlFor="name4">
                    Name
                  </label>
                  <div className="form-outline mb-4">
                    <input type="text" id="name4" className="form-control" />
                  </div>

                  {/* Phone input */}
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>
                  <div className="form-outline mb-4">
                    <input type="text" id="phone" className="form-control" />
                  </div>

                  {/* Email input */}
                  <label className="form-label" htmlFor="email4">
                    Email address
                  </label>
                  <div className="form-outline mb-4">
                    <input type="email" id="email4" className="form-control" />
                  </div>

                  {/* Textarea input */}
                  <label className="form-label" htmlFor="textarea4">
                    Your message
                  </label>
                  <div className="form-outline mb-4">
                    <textarea
                      id="textarea4"
                      rows="4"
                      className="form-control"
                    ></textarea>
                  </div>

                  <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Phone
                      </label>
                    </div>

                    <div class="form-check me-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Text
                      </label>
                    </div>

                    <div class="form-check me-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                      />
                      <label class="form-check-label" for="flexRadioDefault3">
                        Email
                      </label>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block my-3"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Overlay for modal */}
          {/* <div className="modal-backdrop fade show"></div> */}
        </div>
      )}
    </>
  );
}
