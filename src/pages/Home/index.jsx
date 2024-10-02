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
        <div className="mx-auto w-50 position-absolute start-50 translate-middle  ">
          <SearchCard />
        </div>
      </section>

      <div className="container ">
        <Card />
      </div>
    </>
  );
}
