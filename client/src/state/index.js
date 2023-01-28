import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  cart: [],
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
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
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
