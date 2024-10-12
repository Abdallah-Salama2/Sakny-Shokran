import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AgentProperties() {
  let token = localStorage.getItem("Token");

  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

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
    <div className="container-fluid px-2 py-3 ">
      <div>
        <div className="row pt-3">
          {properties.map((property) => (
            <div key={property.id} className="col-md-3 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
