import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";

export default function AgentProperties() {
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem("Token");

  function getProperties() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/agent/properties", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })

      .then((res) => {
        console.log(res.data.data);
        setProperties(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProperties();
  }, []);
  return (
    <div className="container mt-5">
      <div>
        <h1>My Properties</h1>
        <div className="row ">
          {properties.slice(0, 3).map((property) => (
            <div key={property.id} className="col-md-4 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
