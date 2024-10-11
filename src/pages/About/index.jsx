import React from "react";
import backgroundImg from "./img/pexels-pixabay-210617.jpg";
import visionImage from "./img/pexels-pixabay-210617.jpg";
import teamImage from "./img/agents_team.jpg";
import usOne from "./img/trust1.jpg";
import usTwo from "./img/trust2.jpg";
import Facebook from "./img/icons/facebookLogo.png";
import Instagram from "./img/icons/instagramLogo.png";
import LinkedIn from "./img/icons/LinkedIn.png";
import X from "./img/icons/X_logo-black.png";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  // Inline style for the fixed background image
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`, // Replace with your image path
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    minHeight: "80vh", // Ensure the div covers the full viewport height
  };

  return (
    <div style={backgroundStyle}>
      <div className="d-flex align-items-center bg-light bg-opacity-75 py-5 vh-100">
        <div className="container text-center text-md-left">
          <h1 className="display-4">About Us</h1>
          <p className="lead">
            Welcome to <strong>Sakeny-Shokran</strong>, your trusted partner in
            real estate. Founded in 2024, we have dedicated ourselves to
            providing exceptional service and expertise in the property market.
            Our mission is to connect buyers and sellers with the perfect
            properties that meet their needs.
          </p>
        </div>
      </div>

      <div className="vh-100 d-flex align-items-center bg-secondary text-white bg-opacity-75">
        <div className="container d-flex flex-column flex-md-row">
          <div className="col-md-6 text-center text-md-left">
            <h2 className="display-5">Our Vision</h2>
            <p className="lead">
              At Sakeny-Shokran, we envision a world where every individual can
              find their ideal home. We believe in the importance of community
              and strive to make a positive impact in every neighborhood we
              serve.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={visionImage}
              alt="Vision"
              className="img-fluid"
              style={{ borderRadius: "30px" }}
            />
          </div>
        </div>
      </div>

      <div className="vh-100 d-flex align-items-center bg-light bg-opacity-75">
        <div className="container d-flex flex-column flex-md-row">
          <div className="col-md-6">
            <img
              src={teamImage}
              alt="Team"
              className="img-fluid"
              style={{ borderRadius: "30px" }}
            />
          </div>
          <div className="col-md-6 text-center text-md-left">
            <h2 className="display-5">Our Team</h2>
            <p className="lead">
              Our team consists of experienced real estate professionals who are
              passionate about helping clients navigate the complexities of
              buying and selling properties. With extensive knowledge of the
              local market, we are committed to delivering personalized service
              tailored to each client’s unique needs.
            </p>
          </div>
        </div>
      </div>

      <div className="vh-100 d-flex align-items-center bg-secondary text-white bg-opacity-75">
        <div className="container d-flex flex-column flex-md-row">
          <div className="col-md-6 text-center text-md-left">
            <h2 className="display-5">Why Choose Us?</h2>
            <ul className="list-unstyled">
              <li className="my-3">
                <strong>Expert Guidance:</strong> Our agents are well-versed in
                market trends and property values, ensuring you make informed
                decisions.
              </li>
              <li className="my-3">
                <strong>Comprehensive Services:</strong> From residential sales
                to commercial properties, we cover all aspects of real estate.
              </li>
              <li className="my-3">
                <strong>Client-Centric Approach:</strong> Your satisfaction is
                our priority. We work tirelessly to exceed your expectations at
                every step.
              </li>
            </ul>
          </div>
          <div className="col-md-6 position-relative">
            <img
              src={usTwo}
              alt="Why Choose Us"
              className="img-fluid"
              style={{
                width: "80%",
                height: "auto",
                borderRadius: "30px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-23%, -10%)",
              }}
            />
            <img
              src={usOne}
              alt="Why Choose Us"
              className="img-fluid"
              style={{
                width: "80%",
                height: "auto",
                borderRadius: "30px",
                transform: "translate(0%, -40%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center bg-opacity-75">
        <h2>Get in Touch</h2>
        <p>
          Whether you’re looking to buy, sell, or invest in real estate,
          Sakeny-Shokran is here to help. Contact us today to learn more about
          how we can assist you in your real estate journey.
        </p>
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
        <div className="social-media mt-4">
          <h4>Follow Us:</h4>
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
    </div>
  );
};

export default About;
