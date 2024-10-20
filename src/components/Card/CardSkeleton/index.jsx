import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS

const CardSkeleton = () => {
  return (
    <div className="card" style={{ width: "340px", margin: "20px" }}>
      {/* Card Image Skeleton */}
      <Skeleton height={200} />

      {/* Card Body Skeleton */}
      <div className="card-body">
        <h5 className="card-title">
          <Skeleton width={200} />
        </h5>
        <p className="card-text">
          <Skeleton width={250} />
        </p>

        {/* Property Details Skeleton */}
        <div className="d-flex justify-content-between">
          <div>
            <Skeleton circle={true} height={20} width={20} />{" "}
            <Skeleton width={50} />
          </div>
          <div>
            <Skeleton circle={true} height={20} width={20} />{" "}
            <Skeleton width={50} />
          </div>
          <div>
            <Skeleton circle={true} height={20} width={20} />{" "}
            <Skeleton width={50} />
          </div>
        </div>

        {/* Availability Status Skeleton */}
        <div className="mt-2">
          <Skeleton width={100} />
        </div>

        {/* Price Skeleton */}
        <div className="font-weight-bold mt-2">
          <Skeleton width={80} />
        </div>
      </div>

      {/* Card Footer Skeleton */}
      <div className="card-footer d-flex justify-content-between">
        <Skeleton width={100} height={20} />

        <Skeleton circle={true} height={30} width={30} />
      </div>
    </div>
  );
};

export default CardSkeleton;
