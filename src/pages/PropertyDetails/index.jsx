import React, {useContext, useState} from "react";
import AgentCard from "../Agents//components/Agents Card";
import {useParams} from "react-router-dom";
import logo from "../../components/Card/images/Capture.PNG";
import "./styles.css";
import {ContextData} from "../../components/Store/API's";
import data from "bootstrap/js/src/dom/data";
import axios from "axios";

export default function PropertyDetails() {
    const {id} = useParams();
    const [showModal, setShowModal] = useState(false);
    let token = localStorage.getItem("Token");

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [formData, setFormData] = useState({
        email: "",
        phone_number: "",
        message: "",
        contact_type: ""
    })

    const {propertyDetails, loading, error} = useContext(ContextData);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const property = propertyDetails[id];
    if (!property) return <p>No property data available.</p>;

    function getData(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }


    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`https://y-sooty-seven.vercel.app/api/api/properties/${id}/inquiries`, formData,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                },
            }
            )
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
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
                                        <label className="form-label" htmlFor="contact" >
                                            Contact Type
                                        </label>
                                        <input type="text" id="contact" className="form-control" name={"contact_type"} onChange={getData}/>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="phone">
                                            Phone
                                        </label>
                                        <input type="text" id="phone" className="form-control" name={"phone_number"} onChange={getData} />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="email4">
                                            Email address
                                        </label>
                                        <input type="email" id="email4" className="form-control" name={"email"} onChange={getData} />
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

                                    <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>
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
