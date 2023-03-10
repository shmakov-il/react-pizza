import {CartItems} from "../redux/cart/types";

export const findPizzaOnUniqID = (items: Array<CartItems>, payload: string) => {
    return items.find(obj => {
        return obj.uniqID === payload;
    });

}
