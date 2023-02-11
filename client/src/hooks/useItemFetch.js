import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import { isPersistedState } from '../helpers';

export const useItemFetch = () => {
  const [item, setItem] = useState({});
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
    const sessionState = isPersistedState(itemId);
    console.log('useEffect  sessionState', sessionState);
    if (sessionState) {
      console.log('from session');
      setItem(sessionState);
      setLoading(false);
      return;
    }
    getItem(itemId);
    console.log('fetching data');
  }, [itemId]);

  useEffect(() => {
    if (item.id === Number(itemId))
      sessionStorage.setItem(itemId, JSON.stringify(item));
  }, [itemId, item]);

  return {
    item,
    loading,
    error,
  };
};

export default useItemFetch;
