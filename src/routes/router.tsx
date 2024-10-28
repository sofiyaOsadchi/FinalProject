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
import Contact from "./Contact";
import About from "./About";
import PagesList from "./Pages";
import CreatePage from "./CreatePage";
import PageDetail from "./Page";
import LandingPage from "./LandingPage/LandingPage";
import LandingPageHeb from "./LandingPage/LP";


export const router = createBrowserRouter([

    {
        path: "/studio",
        element: <LandingPage/>,
        errorElement: <Error />,
    },
    {
        path: "/studio-heb",
        element: <LandingPageHeb/>,
        errorElement: <Error />,
    },

    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,

        children: [
            { index: true, element: <><CarouselComponent /><Products /></> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            /* {
                path: "/profile", element:
                    <ProtectedRouteUser>
                        <Profile />
                    </ProtectedRouteUser>
            }, */
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
           /*  {
                path: "/admin/products", element:
                    <ProtectedRouteAdmin>
                        <AdminProducts />
                    </ProtectedRouteAdmin>
            },

            { path: "/admin/users", element: <Users /> },*/

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
            /* {
                path: "/osadchi-studio", element: < LandingPage />
            }, */
            /* {
                path: "/admin/analytics", element: < SalesPage />
            }, */
          /*   {
                path: "/admin/orders", element: < AdminOrders />
            }, */
            {
                path: "/admin/dashboard", element: 
                    <ProtectedRouteAdmin>
                <AdminDashboard />
                        </ProtectedRouteAdmin>
            },
            {
                path: "/contact", element: <Contact />
            },
            {
                path: "/about", element: <About />
            },
            {
                path: "/pages", element: <PagesList />
            },
            {
                path: "/pages/:id", element: <PageDetail />
            },
            {
                path: "/create-page", element: <CreatePage />
            },
            
            



        ],
    },
]);