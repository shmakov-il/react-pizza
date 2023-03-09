import {CartItems} from "../redux/slices/cartSlice";

export const findPizzaOnUniqID = (items: Array<CartItems>, payload: string) => {
    return items.find(obj => {
        return obj.uniqID === payload;
    });

}
