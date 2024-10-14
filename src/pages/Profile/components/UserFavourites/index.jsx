import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextData } from "../../../../components/Store/API's";

export default function UserFavourites() {
  
  let {favorites} = useContext(ContextData);
const navigate = useNavigate();

  const [Loading, setLoading] = useState(true);
  const [favs, setFavs] = useState([]);
  useEffect(() => {
      const fetchedFavs = favorites
      if (fetchedFavs && fetchedFavs.length > 0) {
        setFavs(fetchedFavs);
        setLoading(false);
    }
  }, [favorites]); 

  return (
    <div className="container-fluid px-2 py-3 ">
      <div>
        {Loading ? (<div>Loading....</div>):
        (<div className="row ">
          {favs.map((property) => (
            <div key={property.id} className="col-md-3 col-sm-6 mb-4">
              <Card property={property} />
            </div>
          ))}
        </div>)}
      </div>
    </div>
  );
}
