export type Pizza = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    rating: number;
    category: number
    sizes: Array<number>;
    types: Array<number>;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface pizzaSliceState {
    items: Array<Pizza>;
    isLoading: Status;
}