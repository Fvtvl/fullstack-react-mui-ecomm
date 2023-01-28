import { API_URL } from './config';

const apiSettings = {
  fetchItems: async (page) => {
    return await (
      await fetch(
        `${API_URL}/api/items?populate=image&pagination[start]=${page}&pagination[limit]=16`,
        { method: 'GET' }
      )
    ).json();
  },

  fetchItem: async (itemId) => {
    return await (
      await fetch(`${API_URL}/api/items/${itemId}?populate=image`, {
        method: 'GET',
      })
    ).json();
  },
};

export default apiSettings;
