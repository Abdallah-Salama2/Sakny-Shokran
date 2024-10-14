import React, { useContext, useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextData } from "../../../../components/Store/API's";

export default function UserFavourites() {
  let token = localStorage.getItem("Token");

  let { favorites } = useContext(ContextData);

  return (
    <div className="container-fluid px-2 py-3 ">
      <div>
        <div className="row ">
          {favorites.map((property) => (
            <div key={property.id} className="col-md-3 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
