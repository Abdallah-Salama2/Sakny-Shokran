import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ContextData = createContext(0);

export const ContextDataProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState({});
  const [agentDetails, setAgentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let token = localStorage.getItem("Token");
  let userData = localStorage.getItem("userType");

  const getData = async (type, callback) => {
    try {
      const response = await axios.get(
        `https://y-sooty-seven.vercel.app/api/api/${type}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data ? response.data.data : response.data;
      console.log(`API Response for ${type}:`, data);

      callback(data);
      return data;
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      setError(`Failed to fetch ${type}`);
    }
  };

  const getPropertyDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://y-sooty-seven.vercel.app/api/api/properties/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (err) {
      console.error("Error fetching property details:", err);
      setError("Failed to fetch property details");
    }
  };

  const getAgentDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://y-sooty-seven.vercel.app/api/api/agents/${id}`
      );
      return response.data.data;
    } catch (err) {
      console.error("Error fetching agent details:", err);
      setError("Failed to fetch agent details");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [propertiesData, agentsData] = await Promise.all([
        token
          ? getData("properties", setProperties)
          : getData("home/properties", setProperties),
        getData("agents", setAgents),
      ]);

      const propertyDetailsPromises = propertiesData.map((property) =>
        getPropertyDetails(property.id)
      );
      const agentDetailsPromises = agentsData.map((agent) =>
        getAgentDetails(agent.id)
      );

      const [fetchedPropertyDetails, fetchedAgentDetails] = await Promise.all([
        Promise.all(propertyDetailsPromises),
        Promise.all(agentDetailsPromises),
      ]);

      const propertyDetailsMap = fetchedPropertyDetails.reduce(
        (acc, property) => {
          acc[property.id] = property;
          return acc;
        },
        {}
      );

      const agentDetailsMap = fetchedAgentDetails.reduce((acc, agent) => {
        acc[agent.id] = agent;
        return acc;
      }, {});

      setPropertyDetails(propertyDetailsMap);
      setAgentDetails(agentDetailsMap);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, userData]);

  // Logout function for context data
  const logout = () => {
    setProperties([]);
    setAgents([]);
    setPropertyDetails({});
    setAgentDetails({});
  };
  return (
    <ContextData.Provider
      value={{
        properties,
        agents,
        propertyDetails,
        agentDetails,
        loading,
        error,
        logout,
        fetchData,
      }}
    >
      {children}
    </ContextData.Provider>
  );
};
