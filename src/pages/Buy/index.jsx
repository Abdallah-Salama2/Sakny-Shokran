import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Card from "../../components/Card/index";
import PropertyFilter from "../../components/PropertyFilter";
import { ContextData } from "../../components/Store/API's";
import "./styles.css";
import CardSkeleton from "../../components/Card/CardSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS

// Define custom icon with proper image paths
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Buy() {
  const position = [30.0644174, 31.3430602];

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [mapVisible, setMapVisible] = useState(false); // State to control map visibility
  let [Loading, setLoading] = useState(true);
  let { properties } = useContext(ContextData);

  const MapSkeleton = () => {
    return (
      <div className="map-skeleton">
        <Skeleton height={`calc(100vh - 90px)`} /> {/* Map placeholder */}
      </div>
    );
  };

  useEffect(() => {
    if (properties && properties.length) {
      setFilteredProperties(properties);
      setLoading(false);
    }
  }, [properties]);

  // Filtering function
  const handleFilter = (filterCriteria) => {
    let filtered = properties;

    // Apply filtering logic based on user input
    if (filterCriteria.address) {
      filtered = filtered.filter((property) =>
        property.address
          .toLowerCase()
          .includes(filterCriteria.address.toLowerCase())
      );
    }
    if (filterCriteria.priceFrom) {
      filtered = filtered.filter(
        (property) => property.price >= filterCriteria.priceFrom
      );
    }
    if (filterCriteria.priceTo) {
      filtered = filtered.filter(
        (property) => property.price <= filterCriteria.priceTo
      );
    }
    if (filterCriteria.beds) {
      filtered = filtered.filter(
        (property) => property.beds >= filterCriteria.beds
      );
    }
    if (filterCriteria.baths) {
      filtered = filtered.filter(
        (property) => property.baths >= filterCriteria.baths
      );
    }
    if (filterCriteria.areaFrom) {
      filtered = filtered.filter(
        (property) => property.area >= filterCriteria.areaFrom
      );
    }
    if (filterCriteria.areaTo) {
      filtered = filtered.filter(
        (property) => property.area <= filterCriteria.areaTo
      );
    }

    setFilteredProperties(filtered);
  };

  // Toggle map visibility
  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };

  return (
    <div className="border">
      <div className="container-fluid">
        <div className="row">
          <div className="d-lg-none col-12 mb-3 text-center">
            <button className="btn btn-primary" onClick={toggleMap}>
              {mapVisible ? "Hide Map" : "Show Map"}
            </button>
          </div>

          {Loading ? (
            <div className=" col-lg-5 zero-padd">
              <MapSkeleton />
            </div>
          ) : (
            <>
              {(mapVisible || window.innerWidth >= 992) && (
                <div className=" col-lg-5 zero-padd">
                  <MapContainer
                    center={position}
                    zoom={16}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Display filtered properties on the map */}
                    {filteredProperties.map((property) => (
                      <Marker
                        key={property.id}
                        position={[property?.latitude, property?.longitude]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div>
                            <Card property={property} />
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              )}
            </>
          )}

          <div className="col-lg-7 zero-padd">
            <div
              className="border ps-lg-2 card-height"
              style={{ overflowX: "hidden" }}
            >
              <div className="form-outline mb-3 z-3 ps-lg-5">
                {/* Pass the filtering function to the PropertyFilter component */}
                <PropertyFilter onFilter={handleFilter} />
              </div>
              <div className="row pe-3">
                {/* Conditional rendering for skeleton and properties */}
                {Loading
                  ? Array(6)
                      .fill()
                      .map((_, index) => (
                        <div key={index} className="col-md-4 col-sm-6 mb-4">
                          <CardSkeleton />
                        </div>
                      ))
                  : filteredProperties.map((property) => (
                      <div
                        key={property.id}
                        className="col-lg-6 col-xxl-4 col-md-4 col mb-4"
                      >
                        <Card property={property} />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
