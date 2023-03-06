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
    setFilters
} = actions;