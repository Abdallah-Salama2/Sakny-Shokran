import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../../components/Store/API's/UserContext";

export default function Inquiries() {
  const { inquiries, isLoading } = useUserContext();
  let userType = localStorage.getItem("userType");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {userType === "client" && (
        <div className="row">
          {inquiries.length > 0 ? (
            inquiries?.map((inquiry) => (
              <div key={inquiry.inquiry_id} className="col-lg-4 col mb-4">
                <div
                  className="d-flex flex-column justify-content-between"
                  style={{
                    position: "relative",
                    width: "18rem",
                    height: "35rem",
                  }}
                >
                  <div
                    className="topside p-2"
                    style={{
                      backgroundImage: "linear-gradient(#E4E0E1, #E4E0E1)",
                      position: "relative",
                      width: "100%",
                      height: "24.5rem",
                      borderRadius: "15px",
                      overflow: "auto",
                      wordWrap: "break-word",
                    }}
                  >
                    <h3 className="card-title fw-bolder">
                      Inquiry ID: {inquiry.inquiry_id}
                    </h3>
                    <p
                      className="card-title text-opacity-75 inquiry_message fw-bold"
                      style={{ height: "18rem" }}
                    >
                      Inquiry Message:{" "}
                      <span className="text-black fw-normal">
                        {inquiry.message}
                      </span>
                    </p>
                  </div>

                  <div
                    className="botside"
                    style={{
                      backgroundImage: "linear-gradient(#E4E0E1, #E4E0E1)",
                      borderTopLeftRadius: "1px",
                      borderTopRightRadius: "15px",
                      borderBottomLeftRadius: "15px",
                      borderBottomRightRadius: "15px",
                      position: "relative",
                      height: "10rem",
                    }}
                  >
                    <h5
                      className="pt-2 ps-3 fs-4 fw-bolder"
                      style={{
                        backgroundImage: "linear-gradient(#E4E0E1, #E4E0E1)",
                        position: "absolute",
                        height: "70px",
                        width: "50%",
                        top: "-70px",
                        borderTop: "5px solid #fff",
                        borderRight: "5px solid #fff",
                        borderTopRightRadius: "15px",
                      }}
                    >
                      Property ID: {inquiry.property.property_id}
                    </h5>
                    <p className="card-text p-2 fs-5 fw-bold">
                      Property:{" "}
                      <span className="text-black fs-6 fw-normal">
                        {inquiry.property.description}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No inquiries found.</p>
          )}
        </div>
      )}

      {userType === "agent" && (
        <div className="row">
          {inquiries.length > 0 ? (
            inquiries?.map(
              (property) =>
                property.inquiries.length > 0 && (
                  <div
                    key={property.property_id}
                    className="col-md-4  col-sm-6 mb-4"
                  >
                    <Link
                      to={`/inquiries/${property.property_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="topside p-3"
                        style={{
                          backgroundImage: "linear-gradient(#E4E0E1, #FFF)",
                          width: "100%",
                          height: "80%",
                          borderRadius: "15px",
                        }}
                      >
                        <h3 className="card-title text-black ">
                          {property.price}$
                        </h3>
                        <p className="card-title  text-black text-opacity-75 ">
                          {property.description}
                        </p>
                      </div>
                    </Link>

                    <div
                      className="botside ps-2"
                      style={{
                        backgroundImage: "linear-gradient(#FFF, #E4E0E1)",
                        borderRadius: "15px",
                        height: "20%",
                      }}
                    >
                      <div className="pb-5">
                        <p className="card-text  ps-3  fs-5 fw-bold">
                          Inquiries Count:{" "}
                          <span className=" fs-2 fw-normal">
                            {property.inquiries.length}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )
          ) : (
            <p>No inquiries found.</p>
          )}
        </div>
      )}
    </>
  );
}
