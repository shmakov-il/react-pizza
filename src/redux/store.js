import {configureStore} from "@reduxjs/toolkit";
import filters from './slices/fitlersSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice'

const store = configureStore({
    reducer: {
        filters,
        cart,
        pizza
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;