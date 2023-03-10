import {RootState} from "../store";

export const selectPizza = (state: RootState) => state.pizza;
export const selectPizzaCount = (id: string) => (state: RootState) => state.cart.items
    .filter(obj => obj.id === id)
    .reduce((sum, obj) => obj.count + sum, 0);