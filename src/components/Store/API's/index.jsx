// Context file
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ContextData = createContext(0);
export const Base_Api_Url = "https://y-sooty-seven.vercel.app/api/api";

export const ContextDataProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsAuthenticated(!!token);
    //!!token will evaluate to true if token has any truthy value (non-null, non-undefined, non-empty string, etc.), and false otherwise.
  }, []);

  // Token retrieval logic happens inside functions

  const getData = async (type, callback) => {
    const token = localStorage.getItem("Token");

    try {
      const response = await axios.get(`${Base_Api_Url}/${type}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/json",
        },
      });

      const data = response.data.data ? response.data.data : response.data;
      // let data;

      // if (response.data.data) {
      //   data = response.data.data;
      // } else {
      //   data = response.data;
      // }

      console.log(`API Response for ${type}:`, data);

      callback(data); // Set data in state
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      setError(`Failed to fetch ${type}`);
    }
  };

  const fetchAuthProps = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("Token");
      if (token) {
        await getData("properties", setProperties);
        setIsAuthenticated(true);
      } else {
        throw new Error("No token found");
      }
      await getData("agents", setAgents);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      await getData("home/properties", setProperties);
      await getData("agents", setAgents);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("Token");
    setProperties([]);
    setAgents([]);
    setError(null);
    setIsAuthenticated(false);
  };

  return (
    <ContextData.Provider
      value={{
        properties,
        agents,
        loading,
        error,
        isAuthenticated,
        logout,
        fetchData,
        fetchAuthProps,
        setProperties,
      }}
    >
      {children}
    </ContextData.Provider>
  );
};
