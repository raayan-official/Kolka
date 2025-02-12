import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload._id);
      if (!product) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Item is already added");
      }
      updateCartSummary(state);
    },
    updateQuantity: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload.id);
      if (product) {
        product.quantity = action.payload.type === "increment"
          ? product.quantity + 1
          : Math.max(product.quantity - 1, 1);
      }
      updateCartSummary(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload.id);
      updateCartSummary(state);
    }
  },
});

// Utility function to update derived state values
const updateCartSummary = (state) => {
  state.selectedItems = state.products.reduce((total, p) => total + p.quantity, 0);
  state.totalPrice = state.products.reduce((total, p) => total + p.quantity * p.price, 0);
  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;
};

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
