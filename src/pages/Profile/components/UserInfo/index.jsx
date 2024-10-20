import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../../components/Store/API's/UserContext";
import Skeleton from "react-loading-skeleton";

export default function UserInfo() {
  const { fetchData, userInfo, loading } = useContext(UserContext);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, fetchData]);

  if (!token && !loading) {
    return <p>No User Found</p>;
  }

  return (
    <>
      {loading ? (
        <div className="w-fit">
          <Skeleton circle={true} height={200} width={200} className="mb-3" />
          <p className="fw-bolder fs-3">
            Name: <Skeleton width={100} />
          </p>
          <p className="fw-bolder fs-3">
            Email: <Skeleton width={150} />
          </p>
          <p className="fw-bolder fs-3">
            PhoneNumber: <Skeleton width={120} />
          </p>
          <p className="fw-bolder fs-3">
            Joined Since: <Skeleton width={100} />
          </p>
        </div>
      ) : (
        <div className="w-fit">
          <img
            src={
              userInfo?.image_url ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt={userInfo?.name || "User Avatar"}
            style={{ width: "200px", height: "200px" }}
            className="mb-3"
          />
          <p className="fw-bolder fs-3">
            Name:{" "}
            <span className="text-primary">
              {userInfo?.name || <Skeleton width={100} />}
            </span>
          </p>
          <p className="fw-bolder fs-3">
            Email:{" "}
            <span className="text-primary">
              {userInfo?.email || <Skeleton width={100} />}
            </span>
          </p>
          <p className="fw-bolder fs-3">
            PhoneNumber:{" "}
            <span className="text-primary">
              {userInfo?.phone_number || userInfo?.phone || (
                <Skeleton width={100} />
              )}
            </span>
          </p>
          <p className="fw-bolder fs-3">
            Joined Since:{" "}
            <span className="text-primary">
              {userInfo?.created_at ? userInfo.created_at.split("T")[0] : "N/A"}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
