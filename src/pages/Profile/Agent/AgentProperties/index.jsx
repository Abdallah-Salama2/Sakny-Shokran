import React, { useContext } from "react";
import Card from "../../../../components/Card";
import { ContextData } from "../../../../components/Store/API's";

export default function AgentProperties() {
  let { agentProperties } = useContext(ContextData);
  
  return (
    <div className="container mt-5">
      <div>
        <h1>My Properties</h1>
        <div className="row ">
          {agentProperties.slice(0, 3).map((property) => (
            <div key={property.id} className="col-md-4 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
