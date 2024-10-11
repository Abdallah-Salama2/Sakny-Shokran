import React, { useEffect, useState } from "react";
import AgentCard from "./components/Agents Card/index";
import axios from "axios";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const token = localStorage.getItem("Token");

  function getAgents() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/agents", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })

      .then((res) => {
        console.log(res.data);
        setAgents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAgents();
  }, []);

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
