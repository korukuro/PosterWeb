import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Helper functions for local storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Error loading cart from local storage", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to local storage", error);
  }
};

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    add: (state, action) => {
      const poster = action.payload;
      const existingItem = state.find((item) => item._id === poster._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...poster, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    remove: (state, action) => {
      const productId = action.payload;
      const existingItem = state.find((item) => item._id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          const newState = state.filter((item) => item._id !== productId);
          saveCartToLocalStorage(newState);
          toast.success("Removed item from the cart");
          return newState;
        }
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
