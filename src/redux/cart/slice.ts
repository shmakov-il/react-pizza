import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {findPizzaOnUniqID} from "../../utils/findPizzaOnUniqID";
import {CartItems, cartSliceState} from "./types";

const initialState: cartSliceState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems: (state, action: PayloadAction<CartItems>) => {
            const pizza = findPizzaOnUniqID(state.items, action.payload.uniqID);

            if (!pizza) {
                action.payload.count = 1;
                state.items.push(action.payload);
            } else {
                pizza.count += 1;
            }

            state.totalPrice += action.payload.price;
            state.totalCount += 1;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0;
        },
        clearItemCart: (state, action: PayloadAction<string>) => {

            const pizza = findPizzaOnUniqID(state.items, action.payload);

            if (pizza) {
                state.items.splice(state.items.indexOf(pizza), 1);
                state.totalCount -= pizza.count;
                state.totalPrice -= pizza.price * pizza.count;
            }
        },
        incPizza: (state, action: PayloadAction<string>) => {
            const pizza = findPizzaOnUniqID(state.items, action.payload);

            if (pizza) {
                pizza.count += 1;
                state.totalCount += 1;
                state.totalPrice += pizza.price;
            }
        },
        decPizza: (state, action: PayloadAction<string>) => {
            const pizza = findPizzaOnUniqID(state.items, action.payload);

            if (pizza) {
                pizza.count -= 1;
                state.totalCount -= 1;
                state.totalPrice -= pizza.price;
            }
        }
    }
});

const {reducer, actions} = cartSlice;

export default reducer;
export const {
    addItems,
    clearCart,
    clearItemCart,
    incPizza,
    decPizza
} = actions;