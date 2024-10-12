import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Inquiries() {
  let token = localStorage.getItem("Token");
  const [userType, setuserType] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [properties, setProperties] = useState([]);

  let uri;

  if (userType === "client") {
    uri = `https://y-sooty-seven.vercel.app/api/api/user/inquiries`;
  } else {
    uri = `https://y-sooty-seven.vercel.app/api/api/agent/inquiries`;
  }

  function getInquiries() {
    axios
      .get(uri, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })
      .then((res) => {
        if (userType === "client") {
          console.log(res.data.inquiries);
          setInquiries(res.data.inquiries);
        } else {
          console.log(res.data.properties);
          setProperties(res.data.properties);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setuserType(storedUserType);
    }
  }, []);

  useEffect(() => {
    if (userType) {
      getInquiries(); // Fetch inquiries only when userType is set
    }
  }, [userType]);

  return (
    <>
      {userType === "client" && (<>
          <div className="row ">
            {inquiries.map((inquiry) => (
              <div key={inquiry.inquiry_id} className="col-md-4 col-sm-6 mb-4">
                <div className="card" style={{width: "18rem;"}}>
                  <div className="card-body">
                    <h3 className="card-title">Inquiry ID: {inquiry.inquiry_id}</h3>
                    <p className="card-title text-opacity-75">Inquiry Message: <span className="text-primary">{inquiry.message}</span></p>
                    <hr class="border border-dark border-3 opacity-75"></hr>
                    <h5>property ID: {inquiry.property.property_id}</h5>
                    <p className="card-text">
                      property: <span className="text-primary">{inquiry.property.description}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {userType === "agent" && (
        <>

<div className="row ">
  {properties.map((property) => (
    <div key={property.property_id} className="col-md-4 col-sm-6 mb-4">
      {/* Wrap the card with the Link component */}
      <Link to={`/inquiries/${property.property_id}`} style={{ textDecoration: 'none' }}>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h3 className="card-title">{property.title}</h3>
            <p className="card-title text-primary text-opacity-75">{property.description}</p>
            <p className="card-text">
              Inquiries Count: <span className="text-primary fs-2">{property.inquiries.length}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

        </>
      )}
    </>
  );
}
