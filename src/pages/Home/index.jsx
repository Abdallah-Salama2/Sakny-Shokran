import "./styles.css";
import homeImage from "./images/HomeImage.png";
import { Link } from "react-router-dom";
import React from "react";
import SearchCard from "./comoponents/SearchCard";

export default function Home() {
  return (
    <div className="bg-red">
      <section className=" position-relative" style={{ height: "500px" }}>
        <div className="homeImage">
          <img src={homeImage} alt="#"></img>
        </div>
        <SearchCard />
      </section>
    </div>
  );
}
