import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentCard from "../Agents//components/Agents Card";
import { useParams } from "react-router-dom";
import logo from "../../components/Card/images/Capture.PNG";
import "./styles.css";

export default function PropertyDetails() {
  const { id } = useParams();
  console.log(id);
  let token = localStorage.getItem("Token");
  const [property, setProperty] = useState(null); // Set to null initially to avoid undefined issues
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  function getProperty() {
    axios
      .get(`https://y-sooty-seven.vercel.app/api/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProperty(res.data.data);
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

  if (!property || !property.images) {
    return <p>No property data available.</p>;
  }
  return (
    <div className={"container-fluid"}>
      <div className="row position-relative">
        <div className="col-12 form-button position-sticky">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShow}
          >
            Contact Form
          </button>
          {/*  /!* Modal *!/*/}
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
                        <input
                          type="text"
                          id="name4"
                          className="form-control"
                        />
                      </div>

                      {/* Phone input */}
                      <label className="form-label" htmlFor="phone">
                        Phone
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="phone"
                          className="form-control"
                        />
                      </div>

                      {/* Email input */}
                      <label className="form-label" htmlFor="email4">
                        Email address
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email4"
                          className="form-control"
                        />
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

                      <div className="d-flex align-items-center">
                        <div className="form-check me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault1"
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
                            checked
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault2"
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
                            for="flexRadioDefault3"
                          >
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
        </div>
        <div className="col-9 property-info ">
          <div className="px-3">
            <div className={"fw-bold pt-5 mt-2  ms-2 "}>{property.title}</div>
            <div className={"fw-bold py-3 ms-2 text-muted "}>
              {property.address}
            </div>
            <div className=" property-info d-flex justify-content-start align-items-center gap-2  text-muted flex-wrap fs-5">
              <br />
              <br />
              <span className="fw-semibold text-black">Single Family</span>
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
                className={`fw-bold ms-2 ${
                  property.status === "Available"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {property.status}
              </span>
            </p>
          </div>
        </div>
        <div className="col-3 position-relative ">
          <div className={"property-price"}>${property.price}</div>
          <div className="w-100 website-logo" style={{ maxWidth: "250px" }}>
            <img src={logo} className="img-fluid" alt="Logo" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 property-carousel prop ">
          <div id="carouselExample" className="carousel slide w-50">
            <div className="carousel-inner">
              {property.images.map((image, index) => (
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
        </div>
      </div>
      <div className="row ">
        <div className="  col-6 offset-6 property-agent d-flex justify-content-end align-items-center ">
          <AgentCard agent={property.agent} />
        </div>
      </div>
      {/* property info */}
      {/*  <div>*/}
      {/*    <h3>{property.title}</h3>*/}
      {/*    <p>{property.description}</p>*/}
      {/*    <p className="">*/}
      {/*      {property.city} | {property.address}*/}
      {/*    </p>*/}
      {/*    <div className="fs-5">*/}
      {/*      <i className="fa-solid fa-bed" />*/}
      {/*      <span> {property.beds} |</span>*/}
      {/*      <i className="fa-solid fa-bath" />*/}
      {/*      <span> {property.baths} |</span>*/}
      {/*      <i className="fa-solid fa-ruler-combined" />*/}
      {/*      <span> {property.area} |</span>*/}
      {/*      <i className="fa-solid fa-tree-city" />*/}
      {/*    </div>*/}
      {/*    <p>*/}
      {/*      Price: $<span>{property.price}</span>*/}
      {/*    </p>*/}
      {/*    <p>*/}
      {/*      Status:{" "}*/}
      {/*      <span*/}
      {/*        className={`fw-bold ${*/}
      {/*          property.status === "Available" ? "text-success" : "text-danger"*/}
      {/*        }`}*/}
      {/*      >*/}
      {/*        {property.status}*/}
      {/*      </span>*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*  /!* images carousel *!/*/}
      {/*  <div id="carouselExample" className="carousel slide w-50">*/}
      {/*    <div className="carousel-inner">*/}
      {/*      {property.images.map((image, index) => (*/}
      {/*        <div*/}
      {/*          className={`carousel-item ${index === 0 ? "active" : ""}`}*/}
      {/*          key={image.id}*/}
      {/*        >*/}
      {/*          <img*/}
      {/*            src={image.image_url}*/}
      {/*            className="d-block w-100"*/}
      {/*            alt={`Property Image ${image.id}`}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*    <button*/}
      {/*      className="carousel-control-prev"*/}
      {/*      type="button"*/}
      {/*      data-bs-target="#carouselExample"*/}
      {/*      data-bs-slide="prev"*/}
      {/*    >*/}
      {/*      <span*/}
      {/*        className="carousel-control-prev-icon"*/}
      {/*        aria-hidden="true"*/}
      {/*      ></span>*/}
      {/*      <span className="visually-hidden">Previous</span>*/}
      {/*    </button>*/}

      {/*    <button*/}
      {/*      className="carousel-control-next"*/}
      {/*      type="button"*/}
      {/*      data-bs-target="#carouselExample"*/}
      {/*      data-bs-slide="next"*/}
      {/*    >*/}
      {/*      <span*/}
      {/*        className="carousel-control-next-icon"*/}
      {/*        aria-hidden="true"*/}
      {/*      ></span>*/}
      {/*      <span className="visually-hidden">Next</span>*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*  /!* agent *!/*/}

      {/*  /!* details *!/*/}
      {/*  <h1>The Details</h1>*/}
      {/*  <hr className="border border-dark border-3 opacity-75 w-25"></hr>*/}
      {/*  <p>{property.description}</p>*/}

      {/*  /!* Button trigger modal *!/*/}
      {/*  <button type="button" className="btn btn-primary" onClick={handleShow}>*/}
      {/*    Contact Form*/}
      {/*  </button>*/}

      {/*  /!* Modal *!/*/}
      {/*  {showModal && (*/}
      {/*    <div className="modal show d-block" tabIndex="-1" role="dialog">*/}
      {/*      <div className="modal-dialog d-flex justify-content-center">*/}
      {/*        <div className="modal-content w-75">*/}
      {/*          <div className="modal-header">*/}
      {/*            <h5 className="modal-title">Write to us</h5>*/}
      {/*            <button*/}
      {/*              type="button"*/}
      {/*              className="btn-close"*/}
      {/*              onClick={handleClose}*/}
      {/*              aria-label="Close"*/}
      {/*            ></button>*/}
      {/*          </div>*/}
      {/*          <div className="modal-body p-4">*/}
      {/*            <form>*/}
      {/*              /!* Name input *!/*/}
      {/*              <label className="form-label" htmlFor="name4">*/}
      {/*                Name*/}
      {/*              </label>*/}
      {/*              <div className="form-outline mb-4">*/}
      {/*                <input type="text" id="name4" className="form-control" />*/}
      {/*              </div>*/}

      {/*              /!* Phone input *!/*/}
      {/*              <label className="form-label" htmlFor="phone">*/}
      {/*                Phone*/}
      {/*              </label>*/}
      {/*              <div className="form-outline mb-4">*/}
      {/*                <input type="text" id="phone" className="form-control" />*/}
      {/*              </div>*/}

      {/*              /!* Email input *!/*/}
      {/*              <label className="form-label" htmlFor="email4">*/}
      {/*                Email address*/}
      {/*              </label>*/}
      {/*              <div className="form-outline mb-4">*/}
      {/*                <input type="email" id="email4" className="form-control" />*/}
      {/*              </div>*/}

      {/*              /!* Textarea input *!/*/}
      {/*              <label className="form-label" htmlFor="textarea4">*/}
      {/*                Your message*/}
      {/*              </label>*/}
      {/*              <div className="form-outline mb-4">*/}
      {/*                <textarea*/}
      {/*                  id="textarea4"*/}
      {/*                  rows="4"*/}
      {/*                  className="form-control"*/}
      {/*                ></textarea>*/}
      {/*              </div>*/}

      {/*              <div className="d-flex align-items-center">*/}
      {/*                <div className="form-check me-3">*/}
      {/*                  <input*/}
      {/*                    className="form-check-input"*/}
      {/*                    type="radio"*/}
      {/*                    name="flexRadioDefault"*/}
      {/*                    id="flexRadioDefault1"*/}
      {/*                  />*/}
      {/*                  <label className="form-check-label" for="flexRadioDefault1">*/}
      {/*                    Phone*/}
      {/*                  </label>*/}
      {/*                </div>*/}

      {/*                <div className="form-check me-3">*/}
      {/*                  <input*/}
      {/*                    className="form-check-input"*/}
      {/*                    type="radio"*/}
      {/*                    name="flexRadioDefault"*/}
      {/*                    id="flexRadioDefault2"*/}
      {/*                    checked*/}
      {/*                  />*/}
      {/*                  <label className="form-check-label" for="flexRadioDefault2">*/}
      {/*                    Text*/}
      {/*                  </label>*/}
      {/*                </div>*/}

      {/*                <div className="form-check me-3">*/}
      {/*                  <input*/}
      {/*                    className="form-check-input"*/}
      {/*                    type="radio"*/}
      {/*                    name="flexRadioDefault"*/}
      {/*                    id="flexRadioDefault3"*/}
      {/*                  />*/}
      {/*                  <label className="form-check-label" for="flexRadioDefault3">*/}
      {/*                    Email*/}
      {/*                  </label>*/}
      {/*                </div>*/}
      {/*              </div>*/}

      {/*              /!* Submit button *!/*/}
      {/*              <button*/}
      {/*                type="submit"*/}
      {/*                className="btn btn-primary btn-block my-3"*/}
      {/*              >*/}
      {/*                Send*/}
      {/*              </button>*/}
      {/*            </form>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      /!* Overlay for modal *!/*/}
      {/*      /!* <div className="modal-backdrop fade show"></div> *!/*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</>*/}
    </div>
  );
}
