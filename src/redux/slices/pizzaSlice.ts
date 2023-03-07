import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

type Pizza = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    rating: number;
    category: number
    sizes: Array<number>;
    types: Array<number>;
}

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface pizzaSliceState {
    items: Array<Pizza>;
    isLoading: Status;
}

const initialState: pizzaSliceState = {
    items: [],
    isLoading: Status.LOADING
};

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async (params: Record<string, string>) => {
        const {category, sortBy, order, search, page} = params;
        const {data} = await axios.get<Array<Pizza>>(`https://63fc646c859df29986bb930b.mockapi.io/items?${category}${sortBy}${order}${search}${page}`);
        return data;
    }
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.isLoading = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.isLoading = Status.SUCCESS;
            state.items = action.payload;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.isLoading = Status.ERROR;
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
export const selectPizza = (state: RootState) => state.pizza;
export const selectPizzaCount = (id: string) => (state: RootState) => state.cart.items
    .filter(obj => obj.id === id)
    .reduce((sum, obj) => obj.count + sum, 0);