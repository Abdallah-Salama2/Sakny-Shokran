import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../../../../components/Store/API's";

export default function UserInfo() {
  let {loggedUser} = useContext(ContextData);

  const [info, setInfo] = useState([]);

  const [Loading, setLoading] = useState(true);
  useEffect(() => {
      if (loggedUser) {
        setInfo(loggedUser);
        setLoading(false);
    }
  }, [loggedUser]); 


  return (
<>
      {Loading ? (<div>Loading....</div>) :(
        <>
        <div className="w-fit">
            <img
              src={info.image_url||"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
              alt={info.name}
              style={{ width: "200px", height: "200px" }}
              className="mb-3"
            />
          </div>
          <p className="fw-bolder fs-3">
          Name: <span className="text-primary">{info.name}</span>
          </p>
          <p className="fw-bolder fs-3">
          Email: <span className="text-primary">{info.email}</span>
          </p>
          <p className="fw-bolder fs-3">
          PhoneNumber: <span className="text-primary">{info.phone_number||info.phone}</span>
          </p>
          <p className="fw-bolder fs-3">
          Joined Since: <span className="text-primary">{info.created_at ? info.created_at.split("T")[0] : "N/A"}</span>
          </p>
        </>
      )}
    </>
  );
}
