import {configureStore} from "@reduxjs/toolkit";
import filters from './slices/fitlersSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice'
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        filters,
        cart,
        pizza
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;