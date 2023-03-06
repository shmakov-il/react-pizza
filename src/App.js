import React from "react";
import {Provider} from "react-redux";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import store from "./redux/store";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import RootLayout from './layouts/RootLayout'

import "./scss/app.scss";

export const SearchContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState('');
    return (
        <Provider store={store}>
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <RouterProvider router={
                    createBrowserRouter(
                        createRoutesFromElements(
                            <Route path='/'
                                   element={<RootLayout/>}>
                                <Route index element={<Home/>}/>
                                <Route path="cart" element={<Cart/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Route>
                        )
                    )
                }/>
            </SearchContext.Provider>
        </Provider>
    )
}

export default App;
