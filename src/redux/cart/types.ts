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

export interface cartSliceState {
    items: Array<CartItems>;
    totalPrice: number;
    totalCount: number;
}