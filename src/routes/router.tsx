import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root";
import Products from "../Products";
import Register from "./Register";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        /*     errorElement: <Error />, */
        children: [
            { index: true, element: <Products /> },
            { path: "/register", element: <Register /> },

        ],
    },
]);