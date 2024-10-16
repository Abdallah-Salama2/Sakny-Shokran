import React, { useContext } from "react";
import AgentCard from "./components/Agents Card/index";

import { ContextData } from "../../components/Store/API's";

const Agents = () => {
  let { agents } = useContext(ContextData);

  return (
    <div className="offwhite">
      <div className="    ">
        <div className="container">
          <h1>Real Estate Agents</h1>
          <div className="row">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
