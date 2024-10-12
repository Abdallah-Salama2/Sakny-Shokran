import { useState, useEffect } from "react";
import {
  useParams
  } from "react-router-dom"
import axios from "axios";

export default function PropertInquiries() {
    const { id } = useParams();
    console.log(id)
  let token = localStorage.getItem("Token");
  const [inquiries, setInquiries] = useState([]);
  let uri = `https://y-sooty-seven.vercel.app/api/api/properties/${id}/inquiries`;

  function getInquiries() {
    axios
      .get(uri, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })
      .then((res) => {
        console.log(res.data.inquiries);
        setInquiries(res.data.inquiries);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getInquiries(); // Fetch inquiries only when userType is set
  }, []);
  return (
    <>
      <div className="row ">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card" style={{ width: "18rem;" }}>
              <div className="card-body">
                <h3 className="card-title">Inquiry Info</h3>
                <p className="card-title text-opacity-75">
                  Property Id:
                  <span className="text-primary"> {inquiry.property_id}</span>
                </p>
                <p className="card-title text-opacity-75">
                  Inquiry Id:
                  <span className="text-primary"> {inquiry.id}</span>
                </p>
                <p className="card-title text-opacity-75">
                  Inquiry Message:
                  <span className="text-primary">{inquiry.message}</span>
                </p>
                <p className="card-title text-opacity-75">
                  Inquiry email:
                  <span className="text-primary">{inquiry.email}</span>
                </p>
                <p className="card-title text-opacity-75">
                  Inquiry PhoneNumber:
                  <span className="text-primary">{inquiry.phone_number}</span>
                </p>
                <p className="card-title text-opacity-75">
                  Inquiry ContactType:
                  <span className="text-primary">{inquiry.contact_type}</span>
                </p>
                <p className="card-title text-opacity-75">
                  Inquiry CreationTime:
                  <span className="text-primary">{inquiry.inquiry_date.split(" ")[0]}</span>
                </p>
                <hr class="border border-dark border-3 opacity-75"></hr>
                <h3>User Info</h3>
                <h5>ID: {inquiry.user.id}</h5>
                <p className="card-text">
                Name:
                  <span className="text-primary">
                    {inquiry.user.name}
                  </span>
                </p>
                <p className="card-text">
                Email:
                  <span className="text-primary">
                    {inquiry.user.email}
                  </span>
                </p>
                <p className="card-text">
                  PhoneNumber:
                  <span className="text-primary">
                    {inquiry.user.phone_number}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
