import "./styles.css";
import React, {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Card from "../../components/Card/index";
import PropertyFilter from "../../components/PropertyFilter";
import {useContext} from "react";
import {ContextData} from "../../components/Store/API's";

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
    let [Loading, setLoading] = useState(true);
    let {properties} = useContext(ContextData);
    useEffect(() => {
        if (properties && properties.length) {
            setFilteredProperties(properties);
            setLoading(false);
        }
    }, [properties, Loading]);

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

    return (
        <div className="offwhite border mt-2">
            <div className="d-flex justify-content-between  pe-5">
                {Loading ? (
                    <div>Loading map...</div>
                ) : (
                    <MapContainer center={position} zoom={16} scrollWheelZoom={true}>
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
                )}

                <div
                    className="col-7 border"
                    style={{height: "80vh", overflowY: "auto", overflowX: "hidden"}}
                >
                    <div className="form-outline mb-3 z-3">
                        {/* Pass the filtering function to the PropertyFilter component */}
                        <PropertyFilter onFilter={handleFilter} />
                    </div>
                    <div className="row pe-3">
                        {/* Display filtered properties in the list */}
                        {filteredProperties.map((property) => (
                            <div key={property.id} className="col-md-4 col-sm-6 mb-4">
                                <Card property={property} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
