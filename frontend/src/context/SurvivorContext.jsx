import { createContext, useState, useEffect, useContext } from "react";
import { getSurvivors } from "../services/survivorService"; 

const SurvivorContext = createContext();

export const SurvivorProvider = ({ children }) => {
  const [survivors, setSurvivors] = useState([]);

  useEffect(() => {
    const fetchSurvivors = async () => {
      try {
        const data = await getSurvivors();
        setSurvivors(data);
      } catch (error) {
        console.error("Error fetching survivors:", error);
      }
    };
    fetchSurvivors();
  }, []);

  const value = { survivors, setSurvivors };

  return (
    <SurvivorContext.Provider value={value}>
      {children}
    </SurvivorContext.Provider>
  );
};

export const useSurvivors = () => useContext(SurvivorContext);