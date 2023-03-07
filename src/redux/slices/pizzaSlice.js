import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    isLoading: 'loading' // loading | success | error
};

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async (params = {}) => {
        const {category, sortBy, order, search, page} = params;
        const {data} = await axios.get(`https://63fc646c859df29986bb930b.mockapi.io/items?${category}${sortBy}${order}${search}${page}`);
        return data;
    }
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.isLoading = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.isLoading = 'success';
            state.items = action.payload;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.isLoading = 'error';
            state.items = [];
        });
        builder.addDefaultCase(() => {
        })
    }
});

const {reducer, actions} = pizzaSlice;

export default reducer;
export const {} = actions;

// Selectors
export const selectPizza = (state) => state.pizza;
export const selectPizzaCount = (id) => (state) => state.cart.items
    .filter(obj => obj.id === id)
    .reduce((sum, obj) => obj.count + sum, 0);