import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

// Create context to store the data
export const ContextData = createContext(0);

// Context provider component
export const ContextDataProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [agentProperties, setAgentProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [userInquiries, setUserInquiries] = useState([]);
  const [agentInquiries, setAgentInquiries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  let token = localStorage.getItem("Token");
  let userData = localStorage.getItem("userType");

  // Function to fetch data from API
  const getData = async (type, callback) => {
    try {
      const response = await axios.get(
        `https://y-sooty-seven.vercel.app/api/api/${type}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Include token in headers
            Accept: "application/json",
          },
        }
      );

      // Dynamically handle cases where data might be inside `data.data`
      const data = response.data.data ? response.data.data : response.data;
      console.log(`API Response for ${type}:`, data);

      callback(data); // Pass the data to the corresponding state setter
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      setError(`Failed to fetch ${type}`);
    }
  };
  const fetchData = async () => {
    setLoading(true); // Show the loading spinner

    await Promise.all([
      getData("home/properties", setProperties),
      getData("agents", setAgents),
    ]);

    // Conditional fetching based on user type
    if (token && userData === "client") {
      await Promise.all([
        getData("properties", setProperties),
        getData("user/inquiries", setUserInquiries),
        getData("preferences", setFavorites),
        getData("loggedInUser", setLoggedUser),
      ]);
    } else if (token && userData === "agent") {
      await Promise.all([
        getData("loggedInUser", setLoggedUser),
        getData("agent/inquiries", setAgentInquiries),
        getData("agent/properties", setAgentProperties),
      ]);
    }

    setLoading(false); // Hide the loading spinner once data is fetched
  };
  useEffect(() => {
    setError(null); // Reset errors

    fetchData();
  }, [token, userData]);

  // Return early if still loading or if there's an error
  if (loading) {
    return (
      <div className="spinner-container d-flex flex-column justify-content-center align-items-center vh-100">
        <ClipLoader size={150} color={"#123abc"} loading={loading} />
        <h3>Loading Data...</h3>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; // Display the error message
  }

  // Provide context data once everything is loaded
  return (
    <ContextData.Provider
      value={{
        properties,
        agents,
        agentProperties,
        userInquiries,
        agentInquiries,
        favorites,
        loggedUser,
        fetchData,
        loading,
      }}
    >
      {children}
    </ContextData.Provider>
  );
};
