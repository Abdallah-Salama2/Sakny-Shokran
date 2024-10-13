import "./styles.css";
import Option from "./components/Option";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Link } from "react-router-dom";

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
    <div className=" bg-white text-center  py-2 border rounded-5">
      <h4 className="mb-5 mt-4 upper">Make yourself at home.</h4>
      <div className="container">
        <div className="row">
          <div className="col col-xl-10 mx-xl-auto">
            <div className="input-group d-flex  border border-2 rounded-5 p-3 mb-5">
              <div></div>
              <div className="row align-items-center  border border-1 rounded-start ">
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
              </div>
              {/* <ul className="p-0 w-">
          
        </ul> */}

              <input
                type="text"
                className="form-control custom-placeholder  border border-1 border-start-0 border-end-0 "
                placeholder="Enter a location,address,property"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-danger border border-0  rounded  rounded-start-0   rounded-end-3"
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="w-100 py-2"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="small">
        Sakny's commitment to{" "}
        <Link to="#" className="text-decoration-none me-1">
          fair housing laws
        </Link>
        ,
        <Link to="#" className="ms-1 text-decoration-none me-2">
          standard operating procedures
        </Link>
        ,and
        <Link to="#" className=" ms-1 text-decoration-none">
          reasonable accommodations .
        </Link>
      </p>
    </div>
  );
}
