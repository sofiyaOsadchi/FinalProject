import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root";
import Products from "../Products";
import Register from "./Register";
import Login from "./Login";
import { CarouselComponent } from "../components/Carousel";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        /*     errorElement: <Error />, */
        children: [
            { index: true, element: <><CarouselComponent /><Products /></> },
            { path: "/register", element: <Register /> },
            {path: "/login", element: <Login />},
            { path: "/carousel", element: <CarouselComponent />}

        ],
    },
]);