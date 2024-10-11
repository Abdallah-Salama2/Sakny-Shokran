import "./styles.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AgentProperties from "./components/AgentProperties";

const ChangingPage = () => {
  const [activeSection, setActiveSection] = useState("info");

  const renderContent = () => {
    switch (activeSection) {
      case "info":
        return <p>This is the Info section</p>;
      case "props":
        return <AgentProperties />;
      case "ingine":
        return <p>This is the Ingine section</p>;
      default:
        return <p>Select a section</p>;
    }
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        {/*  left side (conest) */}
        <div className="col-3 bg-light vh-100">
          {/* <h4 className="mt-3">Menu</h4> */}
          <ul className="list-group">
            <li
              className={`list-group-item ${
                activeSection === "info" ? "active" : ""
              }`}
              onClick={() => setActiveSection("info")}
              style={{ cursor: "pointer" }}
            >
              Info
            </li>
            <li
              className={`list-group-item ${
                activeSection === "props" ? "active" : ""
              }`}
              onClick={() => setActiveSection("props")}
              style={{ cursor: "pointer" }}
            >
              Props
            </li>
            <li
              className={`list-group-item ${
                activeSection === "ingine" ? "active" : ""
              }`}
              onClick={() => setActiveSection("ingine")}
              style={{ cursor: "pointer" }}
            >
              Inquiries
            </li>
          </ul>
        </div>

        {/* right side (changing)*/}
        <div className="col-9">
          {renderContent()}
          {/* <div className="content mt-4 p-4">{}</div> */}
        </div>
      </div>
    </div>
  );
};

export default ChangingPage;
