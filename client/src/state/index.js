import { createSlice } from '@reduxjs/toolkit';
import { isPersistedCart } from '../helpers';

const localState = (state) => {
  localStorage.setItem(
    'cartItems',
    JSON.stringify(state.cart.map((item) => item))
  );
};

const initialState = {
  isCartOpen: false,
  cart: isPersistedCart,
  items: [],
  page: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.page > 0
        ? state.items.push(
            ...action.payload.filter(
              (item) =>
                state.items.findIndex((itm) => itm.id === item.id) === -1
            )
          )
        : (state.items = action.payload);
    },

    setPage: (state) => {
      state.page === state.items.length
        ? (state.page = state.items.length)
        : (state.page = state.page + 12);
    },
    addToCart: (state, action) => {
      const exists = state.cart.find(
        (eachItem) => eachItem.id === action.payload.item.id
      );
      if (!exists) {
        state.cart = [...state.cart, action.payload.item];
      }
      localState(state);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localState(state);
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
      localState(state);
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });

      localState(state);
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  setPage,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
