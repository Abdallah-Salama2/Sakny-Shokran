import React, { useState } from "react";
import { Link } from "react-router-dom";
import AgentPropertyCard from "../../../../components/AgentPropertyCard";
import { useUserContext } from "../../../../components/Store/API's/UserContext";

export default function AgentProperties() {
  const { agentProperties } = useUserContext();
  const [filtered, setfiltered] = useState([]);
  const handleDelete = (id) => {
    setfiltered(agentProperties.filter((property) => property.id !== id));
  };

  console.log("agentPorpes", agentProperties);

  return (
    <div className="container-fluid px-2 py-3 ">
      <div className="d-flex justify-content-end">
        <Link className="btn btn-outline-primary mb-4" to="properties/create">
          + New Listing
        </Link>
      </div>
      <div>
        <div className="row ">
          {agentProperties.length > 0 ? (
            agentProperties.map((property) => (
              <div key={property.id} className="col-md-6 col-sm-6 mb-4 ">
                <AgentPropertyCard
                  property={property}
                  onDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <p>Loading properties...</p>
          )}
        </div>
      </div>
    </div>
  );
}
