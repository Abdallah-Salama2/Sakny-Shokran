import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { ContextDataProvider, ContextData } from "./components/Store/API's";
import { ContextTokenProvider } from "./components/Store/token";
import {
  UserProvider,
  useUserContext,
} from "./components/Store/API's/UserContext";
import { ClipLoader } from "react-spinners";
import { SkeletonTheme } from "react-loading-skeleton";

// const LoadingWrapper = ({ children }) => {
//   const { loading: userLoading, error: userError } = useUserContext();
//   const { loading: contextLoading, error: contextError } =
//     React.useContext(ContextData);

//   if (userLoading || contextLoading) {
//     return (
//       <div className="spinner-container d-flex flex-column justify-content-center align-items-center vh-100">
//         <ClipLoader size={150} color={"#123abc"} loading={true} />
//         <h3>Loading Data...</h3>
//       </div>
//     );
//   }

//   if (userError || contextError) {
//     return <div>Error: {userError || contextError}</div>;
//   }

//   return children;
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <SkeletonTheme>
    <Router>
      <ContextTokenProvider>
        <ContextDataProvider>
          <UserProvider>
            {/* <LoadingWrapper> */}
            <App />
            {/* </LoadingWrapper> */}
          </UserProvider>
        </ContextDataProvider>
      </ContextTokenProvider>
    </Router>
  </SkeletonTheme>
  // </React.StrictMode>
);

reportWebVitals();
