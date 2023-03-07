import React from "react";
import {Provider} from "react-redux";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import store from "./redux/store";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import RootLayout from './layouts/RootLayout'

import "./scss/app.scss";
import AboutPizza from "./components/AboutPizza";

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path='/' element={<RootLayout/>}>
//             <Route index element={<Home/>}/>
//             <Route path="cart" element={<Cart/>}/>
//             <Route path="pizza/:id" element={<AboutPizza/>}/>
//             <Route path="*" element={<NotFound/>}/>
//         </Route>
//     )
// )

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "cart",
                element: <Cart/>,
            },
            {
                path: "pizza/:id",
                element: <AboutPizza/>,
            },
            {
                path: "*",
                element: <NotFound/>,
            },
        ],
    },
]);

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export default App;




