import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/ProductsSlice';
import CartSlice from '@/slices/CartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: CartSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
