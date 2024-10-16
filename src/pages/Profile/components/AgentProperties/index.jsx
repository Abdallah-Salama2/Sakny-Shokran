import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AgentPropertyCard from "../../../../components/AgentPropertyCard";
import { useUserContext } from "../../../../components/Store/API's/UserContext";

export default function AgentProperties() {
  const { agentProperties, isLoading } = useUserContext();
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    setFilteredProperties(agentProperties);
  }, [agentProperties]);

  const handleDelete = (id) => {
    setFilteredProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== id)
    );
  };

  return (
    <div className="container-fluid px-2 py-3">
      <div className="d-flex justify-content-end">
        <Link className="btn btn-outline-primary mb-4" to="properties/create">
          + New Listing
        </Link>
      </div>
      <div>
        {isLoading ? (
          <p>Loading properties...</p>
        ) : filteredProperties.length > 0 ? (
          <div className="row">
            {filteredProperties.map((property) => (
              <div key={property.id} className="col-md-6 col-sm-6 mb-4">
                <AgentPropertyCard
                  property={property}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
}
