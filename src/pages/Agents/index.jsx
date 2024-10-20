import React, { useContext } from "react";
import AgentCard from "./components/Agents Card/index";

import { ContextData } from "../../components/Store/API's";
import CardSkeleton from "../../components/Card/CardSkeleton";

const Agents = () => {
  let { agents } = useContext(ContextData);
  let { loading } = useContext(ContextData);

  return (
    <div className="offwhite">
      <div className="    ">
        <div className="container">
          <h1>Real Estate Agents</h1>
          <div className="row">
            {loading
              ? Array(6)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="col-md-4 col-sm-6 mb-4">
                      <CardSkeleton />
                    </div>
                  ))
              : agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
