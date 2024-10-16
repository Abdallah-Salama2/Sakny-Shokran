import React from "react";
import { Link } from "react-router-dom";

const AgentCard = ({ agent }) => {
  return (
    <div className=" col-sm-6  col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <Link to={`${agent.id}`}>
            <div className="" style={{ width: "auto", height: "250px" }}>
              <img
                src={agent.image_url}
                alt="Picture"
                className="w-100 h-100 rounded-3 mb-3"
              />
            </div>
          </Link>
          <h5 className="card-title pt-3">{agent.name}</h5>
          <p className="card-text">
            <strong>Email:</strong> {agent.email}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {agent.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
