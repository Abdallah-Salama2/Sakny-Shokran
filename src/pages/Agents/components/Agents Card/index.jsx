import React from "react";

const AgentCard = ({ agent }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{agent.name}</h5>
          <p className="card-text"><strong>Email:</strong> {agent.email}</p>
          <p className="card-text"><strong>Phone:</strong> {agent.phone}</p>
          <p className="card-text"><strong>Agency:</strong> {agent.agency}</p>
          <p className="card-text"><strong>Years of Experience:</strong> {agent.experience}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
