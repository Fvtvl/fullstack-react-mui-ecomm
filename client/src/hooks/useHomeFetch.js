import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../state';

export const useHomeFetch = (url) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setError(false);
      setLoading(true);

      const item = await fetch(`${url}`, {
        method: 'GET',
      });
      const itemsJson = await item.json();
      dispatch(setItems(itemsJson.data));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    items,
    loading,
    error,
    bestSellersItems: items.filter(
      (item) => item.attributes.category === 'bestSellers'
    ),
    newArrivalsItems: items.filter(
      (item) => item.attributes.category === 'newArrivals'
    ),
    topRatedItems: items.filter(
      (item) => item.attributes.category === 'topRated'
    ),
  };
};

export default useHomeFetch;
