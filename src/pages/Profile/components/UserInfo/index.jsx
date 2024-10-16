import React from "react";
import { useUserContext } from "../../../../components/Store/API's/UserContext";

export default function UserInfo() {
  const { userInfo, loading } = useUserContext();
  console.log(userInfo);

  return (
    <>
      {!loading ? (
        userInfo ? (
          <div className="w-fit">
            <img
              src={
                userInfo.image_url ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              alt={userInfo.name}
              style={{ width: "200px", height: "200px" }}
              className="mb-3"
            />
            <p className="fw-bolder fs-3">
              Name: <span className="text-primary">{userInfo.name}</span>
            </p>
            <p className="fw-bolder fs-3">
              Email: <span className="text-primary">{userInfo.email}</span>
            </p>
            <p className="fw-bolder fs-3">
              PhoneNumber:{" "}
              <span className="text-primary">
                {userInfo.phone_number || userInfo.phone}
              </span>
            </p>
            <p className="fw-bolder fs-3">
              Joined Since:{" "}
              <span className="text-primary">
                {userInfo.created_at
                  ? userInfo.created_at.split("T")[0]
                  : "N/A"}
              </span>
            </p>
          </div>
        ) : (
          <p>No User Found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
