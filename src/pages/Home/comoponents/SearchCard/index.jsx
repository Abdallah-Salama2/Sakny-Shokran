import "./styles.css";
import Option from "./components/Option";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchCard() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const handleClick = (id) => {
    setSelectedOption(id);
  };

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      setShowDropdown(true);
      try {
        let type =
          selectedOption === "option1"
            ? "buy"
            : selectedOption === "option2"
            ? "rent"
            : "agent";

        const response = await axios.post(
          `https://y-sooty-seven.vercel.app/api/api/search/${type}`,
          {
            query: searchTerm, // Properly send the search term in the body
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResults(response.data.data);
        console.log();
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setShowDropdown(false);
      setResults([]);
    }
  };

  const handleSelect = (result) => {
    if (selectedOption === "option3") {
      // Case for "Agent" selection (option3)
      setQuery(result.name);
      navigate(`/agents/${result.id}`);
      console.log("Selected Agent ID:", result.id); // Log the selected agent ID
    } else {
      // Case for "Buy" or "Rent" selection (option1 or option2)
      setQuery(result.address); // Set the selected property address in the input field
      navigate(`/details/${result.id}`);

      console.log("Selected Property ID:", result.id); // Log the selected property ID
    }

    // Hide the dropdown after selection
    setShowDropdown(false);
  };

  const options = [
    { id: "option1", label: "Buy" },
    { id: "option2", label: "Rent" },
    { id: "option3", label: "Agent" },
  ];

  return (
    <div className="bg-white text-center py-2 border rounded-5">
      <h4 className="mb-5 mt-4 upper">Make yourself at home.</h4>
      <div className="container">
        <div className="row">
          <div className="col col-xl-10 mx-xl-auto">
            <div className="input-group d-flex border border-2 rounded-5 p-3 ">
              <div className="row align-items-center border border-1 rounded-start">
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

              <input
                type="text"
                className="form-control custom-placeholder border border-1 border-start-0 border-end-0"
                placeholder="Enter a location, address, property"
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={query}
                onChange={handleSearch} // Handle search input
                autoComplete="off"
              />

              <div className="input-group-append">
                <button
                  className="btn btn-danger border border-0 rounded rounded-start-0 rounded-end-3"
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="w-100 py-2"
                  />
                </button>
              </div>
            </div>

            {showDropdown && results.length > 0 && (
              <ul className="dropdown-menu show w-75 p-0 ms-5">
                {results.map((result) => (
                  <li
                    key={result.id}
                    className="dropdown-item border "
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(result)}
                  >
                    {selectedOption === "option3" ? (
                      result.name
                    ) : (
                      <>
                        {/* Render preview image if available */}
                        {result.preview_image_url ? (
                          <img
                            src={result.preview_image_url.filename}
                            alt="Preview"
                            className="me-2"
                            style={{ width: "50px", height: "50px" }}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                        {result.address} - {result.price}$
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <p className="small mt-5">
        Sakny's commitment to{" "}
        <Link to="#" className="text-decoration-none me-1">
          fair housing laws
        </Link>
        ,
        <Link to="#" className="ms-1 text-decoration-none me-2">
          standard operating procedures
        </Link>
        ,and
        <Link to="#" className="ms-1 text-decoration-none">
          reasonable accommodations.
        </Link>
      </p>
    </div>
  );
}
