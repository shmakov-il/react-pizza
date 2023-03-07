import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    categoryID: 0,
    categories: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    },
    sorts: [
        {name: 'популярности', sortProperty: 'rating'},
        {name: 'цене', sortProperty: 'price'},
        {name: 'алфавиту', sortProperty: 'title'},
    ],
    toggleSort: true,
    currentPage: 1,
    searchValue: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID: (state, action) => {
            state.categoryID = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setToggleSort: (state, action) => {
            state.toggleSort = !state.toggleSort;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.categoryID = Number(action.payload.activeCategories);
            state.currentPage = Number(action.payload.currentPage);
            state.toggleSort = action.payload.toggleSort === 'true';
            state.sort = state.sorts.find((obj) => obj.sortProperty === action.payload.selectedSort);
        },
        setSearchValues: (state, action) => {
            console.log(state)
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

// Selectors
export const selectFilterData = (state) => state.filters;
export const selectFilterSort = (state) => state.filters.sort;
export const selectSortType = (state) => state.filters.sorts;
export const selectToggleSort = (state) => state.filters.toggleSort;