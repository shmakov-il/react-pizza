import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterSliceState, SortType, TypeFromURL, Types} from "./types";

export const initialState: FilterSliceState = {
    categoryID: 0,
    categories: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
    sort: {
        name: 'популярности',
        sortProperty: Types.RATING
    },
    sorts: [
        {name: 'популярности', sortProperty: Types.RATING},
        {name: 'цене', sortProperty: Types.PRICE},
        {name: 'алфавиту', sortProperty: Types.TITLE},
    ],
    toggleSort: true,
    currentPage: 1,
    searchValue: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID: (state, action: PayloadAction<number>) => {
            state.categoryID = action.payload;
        },
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
        },
        setToggleSort: (state) => {
            state.toggleSort = !state.toggleSort;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<TypeFromURL>) => {
            state.categoryID = Number(action.payload.activeCategories);
            state.currentPage = Number(action.payload.currentPage);
            state.toggleSort = action.payload.toggleSort === 'true';
            state.sort = state.sorts.find((obj) => obj.sortProperty === action.payload.selectedSort) || state.sort;
        },
        setSearchValues: (state, action) => {
            state.searchValue = action.payload;
        }
    }
});

const {reducer, actions} = filtersSlice;

export default reducer;
export const {
    setCategoryID,
    setSort,
    setToggleSort,
    setCurrentPage,
    setFilters,
    setSearchValues
} = actions;