import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../../../components/Card";
import Facebook from "./images/icons/facebookLogo.png";
import Instagram from "./images/icons/instagramLogo.png";
import LinkedIn from "./images/icons/LinkedIn.png";
import X from "./images/icons/X_logo-black.png";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "../../../../components/Card/CardSkeleton";

export default function AgentDetails() {
  const { id } = useParams();
  const [agentDetails, setAgentDetails] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("Token");

  async function getAgentDetails() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://y-sooty-seven.vercel.app/api/api/agents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAgentDetails(response.data.data);
      setProperties(response.data.data.properties); // Update properties from agentDetails
    } catch (err) {
      console.error("Error fetching agent details:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAgentDetails();
  }, [id]); // Added id as dependency

  return (
    <>
      {/* Agent Details Section */}
      <div className="offwhite py-4">
        <div className="container">
          <div className="row mt-3">
            <div className="col-lg-6">
              {loading ? (
                <Skeleton height={500} />
              ) : agentDetails ? (
                <div className="user-info">
                  <div className="w-fit pe-5">
                    <img
                      loading="lazy"
                      src={
                        agentDetails?.image_url || "/path/to/default-image.jpg"
                      }
                      alt={agentDetails?.name || "Agent Image"}
                      className="img-fluid"
                    />
                  </div>
                  <h2 className="pt-3">
                    {agentDetails?.name || "Name Not Available"}
                  </h2>
                  <p>
                    <span className="fw-bold">Phone Number: </span>
                    {agentDetails?.phone_number || "Not Available"}
                  </p>
                  <p>
                    <span className="fw-bold">Address: </span>Cairo
                  </p>
                  <hr />
                  <div className="info d-flex gap-5">
                    <div className="lang d-flex flex-column">
                      <strong>Languages</strong>
                      <span>
                        {agentDetails?.languages?.join(", ") || "English"}
                      </span>
                    </div>
                    <div className="licens d-flex flex-column">
                      <strong>Licenses</strong>
                      <span>{agentDetails?.license || "Not Available"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No agent details available.</p>
              )}
            </div>

            {/* About Section */}
            <div className="mt-5 mt-lg-0 col-lg-6">
              <div className="header">
                <h1>Sakny Shokran Group</h1>
                <p>Licensed as Sakny Realty Group</p>
              </div>
              <div className="aboutContent mt-5">
                <h5>About Sakny Realty Group</h5>
                <hr className="w-25" />
                <p>
                  The Sakny Realty Group represents a wide demographic of
                  Sellers and Buyers, from single-family homes and condominiums
                  to vacant land, multi-use properties, and luxury properties.
                  They are committed to bringing each client personal service,
                  excellent communication, and extensive knowledge throughout
                  their transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="py-4">
        <div className="container">
          <div className="row">
            <h2>Properties</h2>

            {loading ? ( // Show loading message while properties are being fetched
              Array(3)
                .fill()
                .map((_, index) => <CardSkeleton key={index} />)
            ) : properties?.length > 0 ? (
              properties.map((property) => (
                <div key={property.id} className="col-md-4 col-sm-6 mb-4">
                  <Card property={property} />
                </div>
              ))
            ) : (
              <p>No properties available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="h-25 w-100 bg-light py-5">
        <div className="d-md-flex container gap-5 align-items-center">
          <div>
            <h2>Get in Touch</h2>
            <p>
              Whether you’re looking to buy, sell, or invest in real estate,
              Sakeny-Shokran is here to help.
              <br />
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
                      loading="lazy"
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
                      loading="lazy"
                      src={X}
                      alt="X (formerly Twitter)"
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
                      loading="lazy"
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
                      loading="lazy"
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

          <div className="contact-info mt-5 mt-md-0">
            <h4>Contact Us:</h4>
            <ul className="list-unstyled">
              <li>
                📞 <strong className="fs-6">Phone:</strong> +20 123 456 7890
              </li>
              <li>
                <span>
                  <strong>📧 Email:</strong> info@sakenyshokran.com
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
