import { configureStore, createSlice } from "@reduxjs/toolkit";
import data from "../assets/data";

const menuSlice = createSlice({
  name: "menu",
  initialState: data.menu,
  reducers: {
    setMenu: (state, action) => action.payload,
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.find((el) => el.id === item.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.push({ ...item, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      return state.filter(
        (el) =>
          el.id !== item.id ||
          JSON.stringify(el.options) !== JSON.stringify(item.options)
      );
    },
  },
});

export const { setMenu } = menuSlice.actions;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    cart: cartSlice.reducer,
  },
});
