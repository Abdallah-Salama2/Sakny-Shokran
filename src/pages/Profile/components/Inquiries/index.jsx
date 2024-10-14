import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../../../../components/Store/API's";

export default function Inquiries() {
  const userType = localStorage.getItem("userType");
  const { userInquiries, agentInquiries } = useContext(ContextData);
  const [Loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (userType) {
      const fetchedInquiries = userType === "client" ? userInquiries : agentInquiries;
      if (fetchedInquiries && fetchedInquiries.length > 0) {
        setInquiries(fetchedInquiries);
        setLoading(false);
      }
    }
  }, [userInquiries, agentInquiries, userType]);

  return (
    <>
      {Loading ? (
        <div>Loading....</div>
      ) : (
        <>
          {userType === "client" && inquiries && (
            <div className="row">
              {inquiries.map((inquiry) => (
                <div key={inquiry.inquiry_id} className="col-md-4 col-sm-6 mb-4">
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h3 className="card-title">Inquiry ID: {inquiry.inquiry_id}</h3>
                      <p className="card-title text-opacity-75">
                        Inquiry Message: <span className="text-primary">{inquiry.message}</span>
                      </p>
                      <hr className="border border-dark border-3 opacity-75"></hr>
                      <h5>Property ID: {inquiry.property.property_id}</h5>
                      <p className="card-text">
                        Property: <span className="text-primary">{inquiry.property.description}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {userType === "agent" && inquiries && (
            <div className="row">
              {inquiries.map((property) => (
                <div key={property.property_id} className="col-md-4 col-sm-6 mb-4">
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
          )}
        </>
      )}
    </>
  );
}
