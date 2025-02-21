import { useState, useEffect } from 'react';
import { getSurvivors } from '../services/survivorService'; 

export const useSurvivorData = () => {
  const [survivors, setSurvivors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSurvivors = async () => {
      try {
        const response = await getSurvivors();
        setSurvivors(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvivors();
  }, []);

  return { survivors, loading, error };
};