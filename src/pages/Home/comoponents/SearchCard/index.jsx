import "./styles.css";
import Option from "./components/Option";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import React from "react";

export default function SearchCard() {
  const [selectedOption, setSelectedOption] = useState("option1"); // Initial checked option

  // Function to handle click and update the checked state
  const handleClick = (id) => {
    setSelectedOption(id);
  };

  const options = [
    { id: "option1", label: "Buy" },
    { id: "option2", label: "Rent" },
    { id: "option3", label: "Agent" },
  ];
  return (
    <div className="searchCard bg-white text-center w-50   py-2 border rounded-5">
      <h4 className="mb-5 mt-4 upper">Make yourself at home.</h4>
      <div
        className="input-group d-flex mx-auto border border-2 rounded-5 p-3 mb-5 "
        style={{ width: "600px" }}
      >
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-self-center flex-row">
          {options.map((option) => (
            <Option
              key={option.id}
              id={option.id}
              name="options"
              label={option.label}
              checked={selectedOption === option.id}
              handleClick={() => handleClick(option.id)}
            />
          ))}
        </ul>

        <input
          type="text"
          className="form-control custom-placeholder rounded-start border border-end-0 "
          placeholder="Enter a location,address,property"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button
            className="btn btn-danger border border-0  rounded  rounded-start-0   rounded-end-3"
            type="button"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-100 py-2" />
          </button>
        </div>
      </div>

      <p className="small">
        Sakny's commitment to{" "}
        <a href="#" className="text-decoration-none me-1">
          fair housing laws
        </a>
        ,
        <a href="#" className="ms-1 text-decoration-none me-2">
          standard operating procedures
        </a>
        ,and
        <a href="#" className=" ms-1 text-decoration-none">
          reasonable accommodations .
        </a>
      </p>
    </div>
  );
}
