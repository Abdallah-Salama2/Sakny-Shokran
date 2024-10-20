import React from "react";
import Card from "../../../../components/Card";
import { useUserContext } from "../../../../components/Store/API's/UserContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../../../../components/Card/CardSkeleton";

export default function UserFavourites() {
  const { favorites, loading } = useUserContext();

  return (
    <div className="container-fluid px-2 py-3">
      <div>
        {loading ? (
          // Display 6 skeletons while loading
          <div className="row">
            {Array(3)
              .fill()
              .map((_, index) => (
                <CardSkeleton key={index} />
              ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="row">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
              >
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
