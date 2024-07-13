import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root";
import Products from "./Products";
import Register from "./Register";
import Login from "./Login";
import { CarouselComponent } from "../components/Carousel";
import Profile from "./Profile";
import Product from "./Product";
import Error from "./Error";
import ProtectedRouteUser from "./ProtectedRouteUser";
import CreateProduct from "./CreateProduct";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import Users from "./Users";
import UpdateUser from "./UpdateUser";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />, 
       
        children: [
            { index: true, element: <><CarouselComponent /><Products /></> },
            { path: "/register", element: <Register /> },
            {path: "/login", element: <Login />},
            { path: "/carousel", element: <CarouselComponent />},
            {
                path: "/profile", element:
                    <ProtectedRouteUser>
                        <Profile />
                    </ProtectedRouteUser>
            },
            { path: "/products/:id", element: <Product /> },
            {
                path: "/create-product", element:
                    <ProtectedRouteAdmin>
                        <CreateProduct />
                    </ProtectedRouteAdmin>
            },
            { path: "/users", element: <Users />},
            { path: "/users/:id", element: <UpdateUser /> },


        ],
    },
]);