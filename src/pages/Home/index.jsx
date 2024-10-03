import "./styles.css";
import homeImage from "./images/HomeImage.png";
import React from "react";
import SearchCard from "./comoponents/SearchCard";
import Card from "../../components/Card";

export default function Home() {
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
        <Card />
      </div>
    </>
  );
}
