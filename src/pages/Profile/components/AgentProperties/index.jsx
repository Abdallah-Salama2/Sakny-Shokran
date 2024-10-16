import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextData } from "../../../../components/Store/API's";
import AgentPropertyCard from "../../../../components/AgentPropertyCard";

export default function AgentProperties() {
  const navigate = useNavigate();

  let { agentProperties } = useContext(ContextData);
  const [info, setInfo] = useState([]);
  const handleDelete = (id) => {
    setInfo(agentProperties.filter((property) => property.id !== id));
  };

  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (agentProperties) {
      setInfo(agentProperties);
      setLoading(false);
    }
  }, [agentProperties]);

  console.log("agentPorpes", agentProperties);

  return (
    <>
      {Loading ? (
        <div>Loading....</div>
      ) : (
        <div className="container-fluid px-2 py-3 ">
          <div className="d-flex justify-content-end">
            <Link
              className="btn btn-outline-primary mb-4"
              to="properties/create"
            >
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
      )}
    </>
  );
}
