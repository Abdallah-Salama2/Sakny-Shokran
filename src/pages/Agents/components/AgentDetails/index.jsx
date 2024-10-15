import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ContextData } from "../../../../components/Store/API's";
import AgentPropertyCard from "../../../../components/AgentPropertyCard";
import Card from "../../../../components/Card";
import Facebook from "./images/icons/facebookLogo.png";
import Instagram from "./images/icons/instagramLogo.png";
import LinkedIn from "./images/icons/LinkedIn.png";
import X from "./images/icons/X_logo-black.png";

export default function AgentDetails() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState(
    "هذه بيانات إضافية يمكنك إضافتها"
  );
  let { id } = useParams();
  let { agentProperties } = useContext(ContextData);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://y-sooty-seven.vercel.app/api/api/agents/${id}`
        );
        setUserData(response.data.data);
        console.log("response", response);
        console.log("agentDetails", userData);
        setError("");
      } catch (err) {
        setError("Error fetching user data");
      }
    };

    fetchUserData();
    if (agentProperties) {
      setInfo(agentProperties);
    }
  }, [agentProperties]);

  return (
    <>
      <div className="offwhite py-4">
        <div className="container">
          <div className="row mt-3 ">
            <div className="col-6">
              {userData ? (
                <div className="user-info">
                  <div className="w-50">
                    <img
                      src={userData.image_url}
                      alt="User"
                      className="img-fluid"
                    />
                  </div>
                  <h2>{userData.name}</h2>
                  <p>
                    {" "}
                    <span className="fw-bold">Phone Number: </span>
                    {userData.phone_number}
                  </p>
                  <p>
                    <span className="fw-bold">Address: </span>Cairo
                  </p>
                  <hr />
                  <div className="info d-flex gap-5">
                    <div className="lang d-flex flex-column">
                      <strong>Languages</strong>
                      <span>English</span>
                    </div>
                    <div className="licens d-flex flex-column">
                      <strong>Licenses</strong>
                      <span>CA 01380025</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <div className="col-6">
              <div className="header">
                <h1>Sakny Shokran Group</h1>
                <p>licensed as Sakny Realty Group</p>
              </div>
              <div className="aboutContent mt-5">
                <h5 className="">About Sakny Realty Group</h5>
                <hr className="w-25" />
                <p>
                  The Sakny Realty Group represents a wide demographic of
                  Sellers and Buyers, from single-family homes and condominiums
                  to vacant land, multi-use properties, and luxury properties.
                  Their business covers the greater Contra Costa County, Alameda
                  County, and the Tri-County areas. We are committed to bringing
                  each client personal service, excellent communication, and
                  extensive knowledge and education throughout their
                  transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="row   ">
            <h2>Agent Properties</h2>

            {agentProperties.map((property) => (
              <div key={property.id} className="col-md-3 col-sm-6 mb-4 ">
                <Card property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-25  w-100  offwhite py-5  ">
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
