import React, { useContext, useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextData } from "../../../../components/Store/API's";

export default function UserFavourites() {
  let token = localStorage.getItem("Token");

  const [favorites, setFavourites] = useState([]);

  function getFavourites() {
    console.log(token);

    axios
      .get("https://y-sooty-seven.vercel.app/api/api/preferences", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the header
          Accept: "application/json",
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
        {console.log(favorites)}
        <div className="row ">
          {favorites.length > 0 ? (
            favorites.map((property) => (
              <div key={property.id} className="col-md-3 col-sm-6 mb-4">
                <Card property={property} />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
