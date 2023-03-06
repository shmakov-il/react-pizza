import {configureStore} from "@reduxjs/toolkit";
import filters from './slices/fitlersSlice';
import cart from './slices/cartSlice';

const store = configureStore({
    reducer: {
        filters,
        cart
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;