import React, { useContext } from "react";
import Card from "../../../../components/Card";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../../../components/Store/API's";

export default function AgentProperties() {
  
  const navigate = useNavigate();
  let { agentProperties } = useContext(ContextData);
  console.log("agent properties: " + agentProperties);

  

  return (
    <div className="container ">
      <div>
        <h1>Featured Listings</h1>
        <div className="row ">
          {agentProperties.map((property) => (
            <div key={property.id} className="col-md-4 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
