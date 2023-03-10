import {createSlice} from "@reduxjs/toolkit";
import {pizzaSliceState, Status} from "./types";
import {fetchPizza} from "./asyncAction";

const initialState: pizzaSliceState = {
    items: [],
    isLoading: Status.LOADING,
};
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