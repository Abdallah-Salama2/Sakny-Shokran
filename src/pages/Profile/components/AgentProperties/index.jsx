import React from "react";
import Card from "../../../../components/Card";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextData } from "../../../../components/Store/API's";

export default function AgentProperties() {
  
  const navigate = useNavigate();

  let {agentProperties} = useContext(ContextData);
  console.log("agent properties " + agentProperties);
  return (
    <div className="container-fluid px-2 py-3 ">
      <div>
        <div className="row pt-3">
          {agentProperties.map((property) => (
            <div key={property.id} className="col-md-3 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
