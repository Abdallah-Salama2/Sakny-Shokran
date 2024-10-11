import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Card() {
  const [homes, setHomes] = useState([]);
  const [isFavorite, setFavorite]= useState(false);
  const handleFavorite = (index) => {
      setFavorite((prev)=>({
        ...prev,
        [index] : !prev[index],
      }));
  };
  function getHomes() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/properties", {
        headers: {
          Authorization: `Bearer 3|zZr8HFamC3evprXVAHHCw196KqtuHJXlpB8ZK4Xsf2a2b642`, // Passing the token here
        },
      })

      .then((res) => {
        console.log(res.data.data);
        setHomes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getHomes();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {homes.map((home, index) => (
          <div
            key={index}
            className="card col-md-3 col-sm-6 mb-4"
          >
            <img
              src={home.images[0].image_url || "Home Image"}
              className="image"
              alt={home.images[0].image_url || "Home Image"}
              style={{objectFit:"cover", width: "100%", height: "auto"}} 
            />
            <div className="card-body">
              <h5 className="card-title">
                {home.title || "Card title"}
              </h5>
              <p className="card-text">
                {home.description || "No description"}
              </p>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
              <p>$ {home.price}</p>
              <button
          onClick={()=>handleFavorite(home.id)}
          className={`btn ${isFavorite[home.id] ? 'btn-danger' : 'btn-outline-danger'}`}
        >
          {isFavorite[home.id] ? '❤️' : '♡'}
        </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
