import { useState, useEffect } from 'react';
import { getItems } from '../services/ItemServices';

export const useItemData = () => {
  const [Items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
        console.log(response);
        setItems(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return { Items};
};