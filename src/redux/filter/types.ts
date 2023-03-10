export type TypeFromURL = Record<string, string>

export enum Types {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title'
}

export type SortType = {
    name: string;
    sortProperty: Types;
}

export interface FilterSliceState {
    categoryID: number,
    categories: Array<string>,
    sort: SortType,
    sorts: Array<SortType>,
    toggleSort: boolean,
    currentPage: number,
    searchValue: string,
}