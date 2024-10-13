import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserInfo() {
  let token = localStorage.getItem("Token");

  const [info, setInfo] = useState([]);
//   const navigate = useNavigate();

  function getInfo() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/loggedInUser", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })

      .then((res) => {
        console.log(res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
<>
      {info ? ( // Check if info is available before rendering
        <>
        <div className="w-fit">
            <img
              src={info.image_url||"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
              alt={info.name}
              style={{ width: "200px", height: "200px" }}
              className="mb-3"
            />
          </div>
          <p className="fw-bolder fs-3">
          Name: <span className="text-primary">{info.name}</span>
          </p>
          <p className="fw-bolder fs-3">
          Email: <span className="text-primary">{info.email}</span>
          </p>
          <p className="fw-bolder fs-3">
          PhoneNumber: <span className="text-primary">{info.phone_number||info.phone}</span>
          </p>
          <p className="fw-bolder fs-3">
          Joined Since: <span className="text-primary">{info.created_at ? info.created_at.split("T")[0] : "N/A"}</span>
          </p>
        </>
      ) : (
        <p className="fw-bolder fs-3">Loading...</p> // Show a loading message while data is being fetched
      )}
    </>
  );
}
