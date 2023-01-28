import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';

export const useItemFetch = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getItem = async (itemId) => {
    try {
      setError(false);
      setLoading(true);

      const response = await API.fetchItem(itemId);
      setItem(response.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getItem(itemId);
  }, [itemId]);

  return {
    item,
    loading,
    error,
  };
};

export default useItemFetch;
