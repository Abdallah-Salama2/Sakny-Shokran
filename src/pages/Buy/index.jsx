import "./styles.css";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import Card from "../../components/Card/index";

// Define custom icon with proper image paths
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

export default function Buy() {
  const position = [50, 49];
  const [properties, setProperties] = useState([]);

  let token = localStorage.getItem("Token");

  function getProperties() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/properties", {
        headers: {
          Authorization: `Bearer ${token}`, // Passing the token here
        },
      })

      .then((res) => {
        console.log(res.data.data);
        setProperties(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {

    getProperties();
  }, []);

  // function LocationMarker() {
  //     const [position, setPosition] = useState(null)
  //     const map = useMapEvents({
  //         click() {
  //             map.locate()
  //         },
  //         locationfound(e) {
  //             setPosition(e.latlng)
  //             map.flyTo(e.latlng, map.getZoom())
  //         },
  //     })
  //
  //     return position === null ? null : (
  //         <Marker position={position} icon={customIcon}>
  //             <Popup>You are here</Popup>
  //         </Marker>
  //     )
  // }

  return (
    <>
      <div className="form-outline mb-3 z-3" data-mdb-input-init>
        <input
          type="search"
          id="form1"
          className="form-control z-2"
          style={{ zIndex: "10" }}
          placeholder="Type query"
          aria-label="Search"
        />
      </div>

      <div className="d-flex justify-content-between  pe-5">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {properties.map((property) => (
            <Marker
              position={[property.latitude, property.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h6>{property.description}</h6>
                </div>
              </Popup>
            </Marker>
          ))}
          {/*<LocationMarker/>*/}
        </MapContainer>
        <div
          className="col-7"
          style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}
        >
          <div className="row pe-3 ">
            {properties.map((property) => (
              <div key={property.id} className="col-md-4 col-sm-6 mb-4">
                <Card property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
