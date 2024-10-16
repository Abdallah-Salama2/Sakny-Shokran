import React from "react";
import Card from "../../../../components/Card";

import { useUserContext } from "../../../../components/Store/API's/UserContext";

export default function UserFavourites() {
  const { favorites } = useUserContext();

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
