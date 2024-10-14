import { createContext, useEffect, useState } from "react";
import { ContextToken } from "../token";
import { useContext } from "react";
import axios from "axios";

export const ContextData = createContext(0);

export const ContextDataProvider = ({children}) => {
    const { token } = useContext(ContextToken);
    const [properties, setProperties] = useState([]);
    const [agentProperties, setAgentProperties] = useState([]);
    const [agents, setAgents] = useState([]);
    const [userInquiries, setUserInquiries] = useState([]);
    const [agentInquiries, setAgentInquiries] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loggedUser, setLoggedUser] = useState([]);
    let userData = localStorage.getItem("userType");



    function getData(type, callback) {
      return axios
      .get(`https://y-sooty-seven.vercel.app/api/api/${type}`, {
          headers: {
              Authorization: `Bearer ${token}`, // Passing the token here
          },
      })
      .then((res) => {
          console.log("API Response:", res);
          const data = type === "properties" ? res.data.data : res.data; // Update this based on your API response
          console.log(`API Response for ${type}:`, data);
          callback(data);

          // Handle inquiries conditionally
          const inquiries = userData === "client" ? res.data.inquiries : res.data.properties;
          setUserInquiries(inquiries);
          setAgentProperties(inquiries);
      })
      .catch((err) => {
          console.log(err);
      });
}

    useEffect(() => {
      Promise.all([
          getData("properties", setProperties),
          getData("agents", setAgents),
          getData("preferences", setFavorites),
          getData("loggedInUser", setLoggedUser),
      ])
      .then(() => {
          if (token && userData === "client") {
              getData("user/inquiries", setUserInquiries);
          } else {
              getData("agent/inquiries", setAgentInquiries);
              getData("agent/properties", setAgentProperties);
          }
      });
  }, [token, userData]);

    return (
        <ContextData.Provider value={{ properties, agents, agentProperties, userInquiries, agentInquiries, favorites, loggedUser }}>
            {children}
        </ContextData.Provider>
    );
}
