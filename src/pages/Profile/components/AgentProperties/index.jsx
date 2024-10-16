import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextData } from "../../../../components/Store/API's";
import AgentPropertyCard from "../../../../components/AgentPropertyCard";
import axios from "axios";

export default function AgentProperties() {
  let token = localStorage.getItem("Token");

  const [agentProperties, setAgentProperties] = useState([]);
  const navigate = useNavigate();

  function getProperties() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/agent/properties", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })

      .then((res) => {
        console.log(res.data.data);
        setAgentProperties(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = (id) => {
    setAgentProperties(
      agentProperties.filter((property) => property.id !== id)
    );
  };
  useEffect(() => {
    getProperties();
  }, []);
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
