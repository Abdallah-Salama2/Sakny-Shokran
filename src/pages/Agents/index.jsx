import React, { useState } from "react";
import AgentCard from "./components/Agents Card/index";

const mockAgents = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@realestate.com",
    phone: "555-1234",
    agency: "Dream Homes Agency",
    experience: 8,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@realestate.com",
    phone: "555-5678",
    agency: "Luxury Estates",
    experience: 12,
  },
  {
    id: 3,
    name: "Catherine Brown",
    email: "catherine.brown@realestate.com",
    phone: "555-8765",
    agency: "Home Sweet Home Realty",
    experience: 5,
  },
];

const Agents = () => {
  const [agents] = useState(mockAgents);

  return (
    <div className="container mt-5">
      <h1>Real Estate Agents</h1>
      <div className="row">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default Agents;
