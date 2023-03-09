import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type CartItems = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    size: number;
    type: string;
    count: number;
    uniqID: string;
}

interface cartSliceState {
    items: Array<CartItems>;
    totalPrice: number;
    totalCount: number;
}

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
            const findPizza = state.items.find(obj => {
                return obj.uniqID === action.payload.uniqID;
            });

            if (!findPizza) {
                action.payload.count = 1;
                state.items.push(action.payload);
            } else {
                findPizza.count += 1;
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
            const clearObj = state.items.find(obj => {
                return obj.uniqID === action.payload;
            });
            if (clearObj) {
                state.items.splice(state.items.indexOf(clearObj), 1);
                state.totalCount -= clearObj.count;
                state.totalPrice -= clearObj.price * clearObj.count;
            }
        },
        incPizza: (state, action: PayloadAction<string>) => {
            const inc = state.items.find(obj => {
                return obj.uniqID === action.payload;
            });
            if (inc) {
                inc.count += 1;
                state.totalCount += 1;
                state.totalPrice += inc.price;
            }
        },
        decPizza: (state, action: PayloadAction<string>) => {
            const dec = state.items.find(obj => {
                return obj.uniqID === action.payload;
            });
            if (dec) {
                dec.count -= 1;
                state.totalCount -= 1;
                state.totalPrice -= dec.price;

                // if (dec.count === 0) {
                //     state.items.splice(state.items.indexOf(dec), 1);
                // }
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

export const selectItems = (state: RootState) => state.cart.items;