import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserFavourites() {
  let token = localStorage.getItem("Token");

  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  function getFavourites() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/preferences", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
        },
      })

      .then((res) => {
        console.log(res.data);
        setFavourites(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div className="container-fluid px-2 py-3 ">
      <div>
        <div className="row ">
          {favourites.map((property) => (
            <div key={property.id} className="col-md-3 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
