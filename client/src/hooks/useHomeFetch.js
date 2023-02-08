import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../state';
import { isPersistedState } from '../helpers';
import API from '../API';

export const useHomeFetch = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const page = useSelector((state) => state.cart.page);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    if (items.length !== 0) {
      const sessionState = isPersistedState('homeState');

      if (sessionState) {
        console.log('useEffect  sessionState', sessionState);

        dispatch(setItems(sessionState));
        return;
      }
    }
    console.log('api');
    fetchItems(page);
  }, []);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchItems(page);
    setIsLoadingMore(false);
  }, [isLoadingMore, page]);

  useEffect(() => {
    sessionStorage.setItem('homeState', JSON.stringify(items));
  }, [items]);

  return {
    items,
    setIsLoadingMore,
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
