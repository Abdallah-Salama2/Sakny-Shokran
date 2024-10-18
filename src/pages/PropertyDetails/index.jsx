import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../components/Card/images/Capture.PNG";
import AgentCard from "../Agents//components/Agents Card";
import "./styles.css";
import { Base_Api_Url } from "../../components/Store/API's";

export default function PropertyDetails() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  let token = localStorage.getItem("Token");
  //   let count = 0;
  const [count, setCount] = useState(0);

  const [propertyDetails, setPropertyDetails] = useState([]);

  async function getPropertyDetails() {
    try {
      const response = await axios.get(`${Base_Api_Url}/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("prop,details", response.data.data);
      setPropertyDetails(response.data.data);
    } catch (err) {
      console.error("Error fetching property details:", err);
    }
  }
  //   const getPropertyDetails = async () => {};

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  //   const { propertyDetails, loading, error } = useContext(ContextData);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error}</p>;

  //   const property = propertyDetails[id];
  //   if (!property) return <p>No property data available.</p>;

  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    message: "",
    contact_type: "",
  });

  function getData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   console.log(1);
  useEffect(() => {
    // console.log(2);
    // setCount((prev) => prev + 1);
    // setCount((prev) => prev + 1);

    getPropertyDetails();
    // console.log(3);
  }, []);

  return (
    <div className="container">
      <div className="property">
        <div className="property__header">
          <h1 className="property__title">{propertyDetails.title}</h1>
          <div className="property__price">${propertyDetails.price}</div>
        </div>
        <div className="propertyDetails__info">
          <p className="propertyDetails__address">{propertyDetails.address}</p>
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
                    <label className="form-label" htmlFor="contact">
                      Contact Type
                    </label>
                    <input
                      type="text"
                      id="contact"
                      className="form-control"
                      name={"contact_type"}
                      onChange={getData}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      name={"phone_number"}
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
                      name={"email"}
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

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}
                  >
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
