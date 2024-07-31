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
import AdminProducts from "./AdminProducts";
import EditProduct from "./UpdateProduct";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";
import UserOrders from "./UserOrders";
import SalesPage from "./SalesByDate";
import AdminOrders from "./AdminOrders";
import AdminDashboard from "./AdminDashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,

        children: [
            { index: true, element: <><CarouselComponent /><Products /></> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/carousel", element: <CarouselComponent /> },
            {
                path: "/profile", element:
                    <ProtectedRouteUser>
                        <Profile />
                    </ProtectedRouteUser>
            },
            { path: "/products/:id", element: <Product /> },
            {
                path: "/admin/create-product", element:
                    <ProtectedRouteAdmin>
                        <CreateProduct />
                    </ProtectedRouteAdmin>
            },
            {
                path: "/admin/products/:id", element:
                    <ProtectedRouteAdmin>
                        <EditProduct />
                    </ProtectedRouteAdmin>
            },
            {
                path: "/admin/products", element:
                    <ProtectedRouteAdmin>
                        <AdminProducts />
                    </ProtectedRouteAdmin>
            },

            { path: "/admin/users", element: <Users /> },

            {
                path: "/users/:id", element:
                    <ProtectedRouteUser>
                        <UpdateUser />
                    </ProtectedRouteUser>
            },
            {
                path: "/cart", element: <Cart />,
            },
            {
                path: "/order-confirmation/:orderId", element: < OrderConfirmation />
            },

            {
                path: "/orders", element: < UserOrders />
            },
            {
                path: "/admin/analytics", element: < SalesPage />
            },
            {
                path: "/admin/orders", element: < AdminOrders />
            },
            {
                path: "/admin/dashboard", element: <AdminDashboard />
            },
            



        ],
    },
]);