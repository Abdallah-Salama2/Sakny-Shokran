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
    let [Loading, setLoading] = useState(true);
    let userData = localStorage.getItem("userType");

    function getData(type, callback) {
        axios
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
                const data2 = userData === "client" ? res.data.inquiries : res.data.properties
                    console.log("client inquiries: ", res.data.inquiries);
                    setUserInquiries(data2); 
                
                    console.log("agent properties: ", res.data.properties);
                    setAgentProperties(data2); 
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        {getData("properties", setProperties);
        getData("agents", setAgents);
        
        // Call inquiries based on user type
        if (userData === "client") {
            getData("user/inquiries", setUserInquiries);
        } else {
            getData("agent/inquiries", setAgentInquiries);
        }}
    }, [token, userData]);

    return (
        <ContextData.Provider value={{ properties, agents, agentProperties, userInquiries, agentInquiries }}>
            {children}
        </ContextData.Provider>
    );
}
