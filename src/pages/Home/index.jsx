import "./styles.css";
import homeImage from "./images/HomeImage.png";
import metingImage from "./images/meeting-3.jpg";
import learnMore from "./images/LearnMore.jpg";
import React, { useContext } from "react";
import SearchCard from "./comoponents/SearchCard";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import Facebook from "./images/icons/facebookLogo.png";
import Instagram from "./images/icons/instagramLogo.png";
import LinkedIn from "./images/icons/LinkedIn.png";
import X from "./images/icons/X_logo-black.png";
import { ContextData } from "../../components/Store/API's";

export default function Home() {
  const navigate = useNavigate();
  let { properties } = useContext(ContextData);

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

      <div className=" py-5  offwhite">
        <div className="container">
          <h1>Featured Listings</h1>
          <div className="row pt-5 ">
            {console.log("homeProps", properties)}
            {properties?.slice(0, 3).map((property) => (
              <div key={property.id} className="col-md-4 col-sm-6 mb-4">
                <Card property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get to know agent */}
      <div
        className="mt-5 container "
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div className="row">
          <div className="col-12 col-md-6  d-flex flex-column justify-content-center text-center ">
            <h2>
              Get to know a <br />
              Sakny Shokran agent.
            </h2>
            <p>
              Whether you’re buying, renting, or selling, when you connect with{" "}
              <br />a Corcoran agent, you’re working with the best in the
              business.
            </p>
            <button
              className="btn btn-outline-secondary w-auto align-self-center rounded-5"
              onClick={() => navigate("/agents")}
            >
              Find An Agent
            </button>
          </div>
          <div className="col-12 col-md-6  mt-3 mt-md-0 align-self-center">
            <img
              src={metingImage}
              alt="#"
              className=" w-100 "
              style={{
                borderRadius: "15px",
              }}
            />
          </div>
        </div>
      </div>

      {/* About us */}
      <div className="offwhite">
        <div
          className="container mt-5  "
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <div className=" row">
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-center ">
              <h2>
                Want to know <br />
                more about our Company.
              </h2>
              <p>
                Whether you’re buying, renting, or selling, when you connect
                with a Corcoran agent, you’re working with the best in the
                business.
              </p>
              <button
                className="btn btn-outline-secondary w-auto align-self-center rounded-5"
                onClick={() => navigate("/about")}
              >
                About us
              </button>
            </div>
            <div className="col-12 mt-3 mt-md-0 col-md-6 align-self-center">
              <img
                src={learnMore}
                alt="#"
                className=" w-100 "
                style={{ borderRadius: "15px" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="h-25  w-100   py-5  ">
        <div className="d-lg-flex  container gap-5 align-items-center">
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
          <div className="contact-info mt-5 mt-md-0 ">
            <h4>Contact Us:</h4>
            <ul className="list-unstyled">
              <li>
                📞 <strong className="fs-6">Phone:</strong> +20 123 456 7890
              </li>
              <li className="">
                <span>
                  <strong className="">📧 Email:</strong>
                  info@sakenyshokran.com
                </span>
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
