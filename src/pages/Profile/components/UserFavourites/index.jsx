import React from "react";
import Card from "../../../../components/Card";
import { useUserContext } from "../../../../components/Store/API's/UserContext";

export default function UserFavourites() {
  const { favorites, isLoading } = useUserContext();

  return (
    <div className="container-fluid px-2 py-3">
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : favorites.length > 0 ? (
          <div className="row">
            {favorites.map((property) => (
              <div key={property.id} className="col-lg-4 col-sm-6 mb-4">
                <Card property={property} />
              </div>
            ))}
          </div>
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
}
