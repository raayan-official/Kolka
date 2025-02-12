import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; // Correct reducer import
import authApi from './features/auth/authApi';
import authReducer from '../redux/features/auth/authSlice';
import productsApi from './features/products/productsApi';
import reviewApi from './features/review/reviewsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Fixes the naming and adds the missing comma
    [authApi.reducerPath]: authApi.reducer, // Keeps dynamic key for API slice
    auth: authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewApi.middleware) // Appends API middleware
});
