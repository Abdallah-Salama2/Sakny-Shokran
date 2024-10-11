import "./styles.css";
import homeImage from "./images/HomeImage.png";
import React, { useEffect, useState } from "react";
import SearchCard from "./comoponents/SearchCard";
import Card from "../../components/Card";
import axios from "axios";

export default function Home() {
  const [properties, setProperties] = useState([]);

  function getProperties() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/properties", {
        headers: {
          Authorization: `Bearer {$token}`, // Passing the token here
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
    <>
      <section className="position-relative margin-bottom-large ">
        <div className="homeImage">
          <img src={homeImage} alt="#"></img>
        </div>
        <div className="  search-card-wrapper ">
          <SearchCard />
        </div>
      </section>

      <div className="container ">
        <div>
          <h1>Featured Listings</h1>
          <div className="row pe-5">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className="col-md-4 col-sm-6 mb-4">
                <Card property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
