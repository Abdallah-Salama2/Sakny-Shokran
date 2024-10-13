import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../../../../components/Store/API's";

export default function Inquiries() {
  const userType = localStorage.getItem("userType");
  let [Loading, setLoading] = useState(true);
  let {userInquiries, agentInquiries} = useContext(ContextData);
  let inquiries;

  
  if(userType){
    if (userType === "client") {
      inquiries = userInquiries;
  } else {
    inquiries = agentInquiries;
  }
  }
  


    if ( inquiries && inquiries.length > 0) {
      setLoading(false);}

console.log("inqq " + inquiries);
  return (
    <>
    {Loading ? (<div>Loading .......</div>) : 
    (<div className="container">
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
  {inquiries.map((property) => (
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
    </div>)}
      
    </>
  );
}
