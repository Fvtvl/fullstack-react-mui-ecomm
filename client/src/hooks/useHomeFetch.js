import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../state';
import API from '../API';

export const useHomeFetch = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchItems = async (page) => {
    try {
      setError(false);
      setLoading(true);

      const response = await API.fetchItems(page);

      dispatch(setItems(response.data));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems(0);
  }, []);

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
