import axios from "axios";
import React, { useContext, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { ContextToken } from "../../../../../../components/Store/token";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./styles.css";
import { useNavigate } from "react-router-dom";

// Function to handle map clicks and place a marker
function LocationMarker({ setFormData }) {
  const [position, setPosition] = useState(null); // Store the position of the marker

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng; // Leaflet gives lat and lng
      setPosition(e.latlng); // Set the clicked position for the marker
      setFormData((prevData) => ({
        ...prevData,
        latitude: lng, // Swap latitude with longitude
        longitude: lat, // Swap longitude with latitude
      }));
    },
  });

  // Custom marker icon if needed (optional)
  const customMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  // Render a marker only if the position is set (i.e., after a click)
  return position === null ? null : (
    <Marker position={position} icon={customMarkerIcon} />
  );
}

export default function CreateProperty() {
  let { token } = useContext(ContextToken);
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    address: "",
    beds: "",
    baths: "",
    area: "",
    latitude: "",
    longitude: "",
    price: "",
    status: "",
    type: "",
  });

  function getData(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post(
        "https://y-sooty-seven.vercel.app/api/api/agent/properties",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setSuccessMessage("Property added successfully!");
          setErrorMessage("");
          setFormData({
            title: "",
            description: "",
            city: "",
            address: "",
            beds: "",
            latitude: "",
            longitude: "",
            baths: "",
            area: "",
            price: "",
            status: "",
            type: "",
          });
          navigate("/home");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage("Invalid data or unauthorized.");
        } else if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      });
  }

  return (
    <div>
      {errorMessage && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <strong>Success:</strong> {successMessage}
        </div>
      )}

      <form className="form w-75 p-1" onSubmit={submitHandler}>
        <div>
          <div>
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={getData}
              required
            />
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={getData}
              required
            />
          </div>
          <div>
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={getData}
              required
            />
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={getData}
              required
            />
          </div>
          <div>
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="number"
              placeholder="Beds"
              name="beds"
              value={formData.beds}
              onChange={getData}
              required
            />
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="number"
              placeholder="Baths"
              name="baths"
              value={formData.baths}
              onChange={getData}
              required
            />
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="number"
              placeholder="Area (sq ft)"
              name="area"
              value={formData.area}
              onChange={getData}
              required
            />
          </div>

          <div>
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={getData}
              required
            />
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="text"
              placeholder="Status"
              name="status"
              value={formData.status}
              onChange={getData}
              required
            />
            <input
              className="form-control form-control-lg bg-light fs-6 mb-3"
              type="text"
              placeholder="Type"
              name="type"
              value={formData.type}
              onChange={getData}
              required
            />
          </div>
          <div className="d-flex">
            <div>
              <input
                className="form-control form-control-lg bg-light fs-6 mb-3"
                type="number"
                placeholder="Latitude"
                name="latitude"
                value={formData.latitude}
                onChange={getData}
                required
              />
              <input
                className="form-control form-control-lg bg-light fs-6 mb-3"
                type="number"
                placeholder="Longitude"
                name="longitude"
                value={formData.longitude}
                onChange={getData}
                required
              />
            </div>
            <div className="map">
              <MapContainer
                center={[30.061361, 31.344962]}
                zoom={25}
                style={{ height: "100px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker setFormData={setFormData} />{" "}
                {/* Pass setFormData */}
              </MapContainer>
            </div>
          </div>
        </div>
        <div className="buttons-group d-flex justify-content-center mt-3">
          <button
            className="btn btn-danger border-white text-white fs-6"
            type="submit"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
}
