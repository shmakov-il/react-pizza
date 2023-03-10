import {RootState} from "../store";

export const selectFilterData = (state: RootState) => state.filters;
export const selectFilterSort = (state: RootState) => state.filters.sort;
export const selectSortType = (state: RootState) => state.filters.sorts;
export const selectToggleSort = (state: RootState) => state.filters.toggleSort;