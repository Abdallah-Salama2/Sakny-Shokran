import "./styles.css";
import homeImage from "./images/HomeImage.png";
import React from "react";
import SearchCard from "./comoponents/SearchCard";
import Card from "../../components/Card";

export default function Home() {
  return (
    <div className="bg-red">
      <section className=" position-relative" style={{ height: "500px" }}>
        <div className="homeImage">
          <img src={homeImage} alt="#"></img>
        </div>
        <div style={{ marginBottom: "200px" }}>
          <SearchCard />
        </div>
        <Card />
      </section>
    </div>
  );
}
