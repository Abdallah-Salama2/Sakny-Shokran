import "./styles.css";
import homeImage from "./images/HomeImage.png";
import metingImage from "./images/meeting-3.jpg";
import React, { useEffect, useState } from "react";
import SearchCard from "./comoponents/SearchCard";
import Card from "../../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Facebook from "./images/icons/facebookLogo.png";
import Instagram from "./images/icons/instagramLogo.png";
import LinkedIn from "./images/icons/LinkedIn.png";
import X from "./images/icons/X_logo-black.png";
export default function Home() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

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
          <div className="row ">
            {properties?.slice(0, 3).map((property) => (
              <div key={property.id} className="col-md-4 col-sm-6 mb-4">
                <Card property={property} />
              </div>
            ))}
          </div>
          <hr />
          <div className="d-flex mt-5 align-content-center">
            <div className="d-flex flex-column justify-content-center w-50 text-center">
              <h2>
                Get to know a <br />
                Sakny Shokran agent.
              </h2>
              <p>
                Whether you’re buying, renting, or selling, when you connect
                with a Corcoran agent, you’re working with the best in the
                business.
              </p>
              <button
                className="btn btn-outline-secondary w-25 align-self-center rounded-5"
                // onClick={navigate("/agents")}
              >
                Find An Agent
              </button>
            </div>
            <div className="w-50 ">
              <img src={metingImage} alt="#" className="w-100 " />
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="h-25  w-100 bg-white  py-5 ">
        <div className="d-flex  container gap-5 align-items-center">
          <div>
            <h2>Get in Touch</h2>
            <p>
              Whether you’re looking to buy, sell, or invest in real estate,
              Sakeny-Shokran is here to help. <br />
              Contact us today to learn more about how we can assist you in your
              real estate journey.
            </p>
            <div className="social-media mt-4">
              <ul className="list-unstyled d-flex justify-content-center">
                <li className="mx-3">
                  <a
                    href="https://facebook.com/sakenyshokran"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={Facebook}
                      alt="Facebook"
                      className="img-fluid"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </a>
                </li>
                <li className="mx-3">
                  <a
                    href="https://twitter.com/sakenyshokran"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={X}
                      alt="Twitter"
                      className="img-fluid"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </a>
                </li>
                <li className="mx-3">
                  <a
                    href="https://instagram.com/sakenyshokran"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={Instagram}
                      alt="Instagram"
                      className="img-fluid"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </a>
                </li>
                <li className="mx-3">
                  <a
                    href="https://linkedin.com/company/sakenyshokran"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedIn}
                      alt="LinkedIn"
                      className="img-fluid"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="contact-info">
            <h4>Contact Us:</h4>
            <ul className="list-unstyled">
              <li>
                📞 <strong>Phone:</strong> +20 123 456 7890
              </li>
              <li>
                📧 <strong>Email:</strong> info@sakenyshokran.com
              </li>
              <li>
                📍 <strong>Address:</strong> 123 Real Estate St, Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
