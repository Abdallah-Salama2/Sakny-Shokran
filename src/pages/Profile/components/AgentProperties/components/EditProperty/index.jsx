import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { ContextToken } from "../../../../../../components/Store/token";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

// Function to handle map clicks and place a marker
function LocationMarker({ setFormData }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setFormData((prevData) => ({
        ...prevData,
        latitude: lat,
        longitude: lng,
      }));
    },
  });

  const customMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return position === null ? null : (
    <Marker position={position} icon={customMarkerIcon} />
  );
}

export default function EditProperty() {
  let { token } = useContext(ContextToken);
  let { id } = useParams();
  let navigate = useNavigate();

  const [properties, setProperties] = useState(null); // Set to null initially to avoid undefined issues
  const [loading, setLoading] = useState(true); // Loading state
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

  // Fetch property details when the component loads
  useEffect(() => {
    axios
      .get(`https://y-sooty-seven.vercel.app/api/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData(res.data.data); // Pre-fill form with fetched data
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage("Unable to fetch property data.");
        setLoading(false);
      });
  }, [id, token]);

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
      .put(
        `https://y-sooty-seven.vercel.app/api/api/properties/${id}`, // PUT request for editing
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSuccessMessage("Property updated successfully!");
        setErrorMessage("");
        navigate("/home"); // Redirect to home after update
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

  return loading ? (
    <div>Loading...</div>
  ) : (
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
                center={[
                  formData.latitude || 30.061361,
                  formData.longitude || 31.344962,
                ]}
                zoom={25}
                style={{ height: "100px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker setFormData={setFormData} />
              </MapContainer>
            </div>
          </div>
        </div>
        <div className="buttons-group d-flex justify-content-center mt-3">
          <button
            className="btn btn-danger border-white text-white fs-6"
            type="submit"
          >
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
}
