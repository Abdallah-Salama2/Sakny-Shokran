import React, { useState } from "react";

const PropertyFilter = ({ onFilter }) => {
  // Define state for the filter form
  const [filterForm, setFilterForm] = useState({
    address: "",
    priceFrom: "",
    priceTo: "",
    beds: "",
    baths: "",
    areaFrom: "",
    areaTo: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filterForm); // Trigger the filtering function passed as a prop
  };

  // Handle clearing the form
  const handleClear = () => {
    setFilterForm({
      address: "",
      priceFrom: "",
      priceTo: "",
      beds: "",
      baths: "",
      areaFrom: "",
      areaTo: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-2 pt-2   ">
        {/* Price From / To */}
        <div className="col-md-11">
          <div className="row g-0">
            <div className="col-md-12">
              <input
                type="text"
                name="address"
                value={filterForm.address}
                onChange={handleChange}
                placeholder="Address"
                className="form-control  "
              />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row g-0">
            <div className="col-md-6">
              <input
                type="number"
                name="priceFrom"
                value={filterForm.priceFrom}
                onChange={handleChange}
                placeholder="Price from"
                className="form-control  rounded-end-0"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="priceTo"
                value={filterForm.priceTo}
                onChange={handleChange}
                placeholder="Price to"
                className="form-control rounded-start-0"
              />
            </div>
          </div>
        </div>
        {/* Beds / Baths */}
        <div className="col-md-3">
          <div className="row g-0">
            <div className="col-md-6">
              <select
                name="beds"
                value={filterForm.beds}
                onChange={handleChange}
                className="form-select  rounded-end-0"
              >
                <option value="">Beds</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
                <option value="6+">6+</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                name="baths"
                value={filterForm.baths}
                onChange={handleChange}
                className="form-select rounded-start-0"
              >
                <option value="">Baths</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
                <option value="6+">6+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Area From / To */}
        <div className="col-md-3">
          <div className="row g-0">
            <div className="col-md-6">
              <input
                type="number"
                name="areaFrom"
                value={filterForm.areaFrom}
                onChange={handleChange}
                placeholder="Area from"
                className="form-control rounded-end-0 "
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="areaTo"
                value={filterForm.areaTo}
                onChange={handleChange}
                placeholder="Area to"
                className="form-control rounded-start-0"
              />
            </div>
          </div>
        </div>
        {/* Filter and Clear Buttons */}
        <div className="col-md-3 d-flex justify-content-start gap-2">
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-secondary"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyFilter;
