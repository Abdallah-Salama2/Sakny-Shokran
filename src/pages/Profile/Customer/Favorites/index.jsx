import "./styles.css";

import React from "react";

const Favorites = ({ favorites, removeFavorite }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2>Favorites</h2>
      </div>
      <div className="card-body">
        <div className="row">
          {favorites.map((fav) => (
            <div key={fav.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{fav.title}</h5>
                  <p className="card-text">{fav.location}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFavorite(fav.id)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
