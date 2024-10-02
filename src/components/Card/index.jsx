import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Card() {
  const [homes, setHomes] = useState([]);

  function getHomes() {
    axios
      .get("https://y-sooty-seven.vercel.app/api/api/properties", {
        headers: {
          Authorization: `Bearer 21|FbKc3Ol5jQA35OMtXJaHMx9HNsh8g2F915jNUHuJa2385431`, // Passing the token here
        },
      })

      .then((res) => {
        console.log(res.data);
        setHomes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getHomes();
  }, []);

  return (
    // <div
    //   className="d-flex col-6 me-5"
    //   style={{ height: "50vh", overflowY: "auto", overflowX: "hidden" }}
    // >
    //   <div className="row">
    //     {homes.map(
    //       (
    //         home,
    //         index // Mapping over the homes data
    //       ) => (
    //         <div
    //           key={index}
    //           className="card col-6 me-3"
    //           style={{ width: "18rem" }}
    //         >
    //           <img
    //             src={home.imageUrl || "default-image-url"} // Use actual data if available
    //             className="card-img-top"
    //             alt={home.title || "Home Image"}
    //           />
    //           <div className="card-body">
    //             <h5 className="card-title">{home.title || "Card title"}</h5>
    //             <p className="card-text">
    //               {home.description ||
    //                 "Some quick example text to build on the card title and make up the bulk of the card's content."}
    //             </p>
    //           </div>

    //           <div className="card-body">
    //             <a href={home.link || "#"} className="card-link">
    //               Card link
    //             </a>
    //             <a href="#" className="card-link">
    //               Another link
    //             </a>
    //           </div>
    //         </div>
    //       )
    //     )}
    //   </div>
    // </div>

    <div
      className="d-flex   "
      // style={{ height: "50vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row">
        <div className="card col-6 m-3" style={{ width: "18rem" }}>
          <img
            src="https://media-cloud.corcoranlabs.com/filters:format(webp)/fit-in/424x424/ListingFullAPI/Realogy/7BB84F62-8ABC-449B-85DC-FE851B695001/D9F26C72-30CA-4ECE-97CD-21547B002488"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>

          <div className="card-body">
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
        <div className="card col-6 m-3" style={{ width: "18rem" }}>
          <img
            src="https://media-cloud.corcoranlabs.com/filters:format(webp)/fit-in/424x424/ListingFullAPI/Realogy/7BB84F62-8ABC-449B-85DC-FE851B695001/D9F26C72-30CA-4ECE-97CD-21547B002488"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>

          <div className="card-body">
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
        <div className="card col-6 m-3" style={{ width: "18rem" }}>
          <img
            src="https://media-cloud.corcoranlabs.com/filters:format(webp)/fit-in/424x424/ListingFullAPI/Realogy/7BB84F62-8ABC-449B-85DC-FE851B695001/D9F26C72-30CA-4ECE-97CD-21547B002488"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>

          <div className="card-body">
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
        <div className="card col-6 m-3" style={{ width: "18rem" }}>
          <img
            src="https://media-cloud.corcoranlabs.com/filters:format(webp)/fit-in/424x424/ListingFullAPI/Realogy/7BB84F62-8ABC-449B-85DC-FE851B695001/D9F26C72-30CA-4ECE-97CD-21547B002488"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>

          <div className="card-body">
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
        <div className="card col-6 m-3" style={{ width: "18rem" }}>
          <img
            src="https://media-cloud.corcoranlabs.com/filters:format(webp)/fit-in/424x424/ListingFullAPI/Realogy/7BB84F62-8ABC-449B-85DC-FE851B695001/D9F26C72-30CA-4ECE-97CD-21547B002488"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>

          <div className="card-body">
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
        <div className="card col-6 m-3" style={{ width: "18rem" }}>
          <img
            src="https://media-cloud.corcoranlabs.com/filters:format(webp)/fit-in/424x424/ListingFullAPI/Realogy/7BB84F62-8ABC-449B-85DC-FE851B695001/D9F26C72-30CA-4ECE-97CD-21547B002488"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>

          <div className="card-body">
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
