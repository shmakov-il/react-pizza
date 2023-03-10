import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Pizza} from "./types";

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async (params: Record<string, string>) => {
        const {category, sortBy, order, search, page} = params;
        const {data} = await axios.get<Array<Pizza>>(`https://63fc646c859df29986bb930b.mockapi.io/items?${category}${sortBy}${order}${search}${page}`);
        return data;
    }
);