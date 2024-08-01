/* import { DarkThemeToggle, Dropdown, Navbar, Tooltip } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FiBox, FiUser, FiShoppingCart, FiSettings } from "react-icons/fi";
import Search from "./Search";
import './NavBar.scss';
import { useCart } from "../hooks/useCart";
import UserAvatar from "./UseAvatar";

const Nav = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const { cart } = useCart();

    return (
        <Navbar rounded>
            <Navbar.Brand href="#">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tsofiya Osadchi</span>
            </Navbar.Brand>

            <div className="flex md:order-2 items-center">
                <div className="mr-5">
                    <Search />
                </div>

                <Link to="/cart" className="mr-4">
                    <Tooltip
                        content="View Cart"
                        placement="top"
                        className="text-sm bg-gray-700 text-white rounded px-2 py-1"
                    >
                        <div className="relative">
                            <FiShoppingCart size={20} className={cart && cart.totalQuantity > 0 ? "text-red-500" : "text-gray-300"} />
                            {cart && cart.totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                                    {cart.totalQuantity}
                                </span>
                            )}
                        </div>
                    </Tooltip>
                </Link>

                {isLoggedIn && user?.isAdmin && (
                    <Link to="/admin/dashboard" className="mr-5 hidden md:block">
                        <Tooltip
                            content="Manage Shop"
                            placement="top"
                            className="text-sm bg-gray-700 text-white rounded px-2 py-1"
                        >
                            <FiSettings size={20} className="text-gray hover:text-gray-300" />
                        </Tooltip>
                    </Link>
                )}

                {isLoggedIn && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <UserAvatar firstName={user.name.first} lastName={user.name.last} />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name.first} {user.name.last}</span>
                            <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={() => navigate(`/users/${user._id}`)}>Edit Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/orders")}>My Orders</Dropdown.Item>
                        {user.isAdmin && (
                            <>
                                <Dropdown.Item onClick={() => navigate("/admin/dashboard")}>
                                    Manage Shop
                                </Dropdown.Item>
                                <Dropdown.Divider />
                            </>
                        )}
                        <Dropdown.Item>
                            <div className="flex items-center">
                                <DarkThemeToggle />
                                <span className="ml-2">Mode</span>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => { logout(); navigate("/"); }}> Sign out </Dropdown.Item>
                    </Dropdown>
                )}

                {!isLoggedIn && (
                    <Tooltip content="Login" placement="bottom" className="text-xs bg-gray-700 text-white rounded px-1 py-1">
                        <Link to="/login" className="mr-4 flex items-center">
                            <FiUser size={20} className="text-gray hover:text-gray-300" />
                        </Link>
                    </Tooltip>
                )}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="/contact">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;
 */

import { DarkThemeToggle, Dropdown, Navbar, Tooltip } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FiBox, FiUser, FiShoppingCart, FiSettings, FiUsers, FiTrendingUp } from "react-icons/fi";
import Search from "./Search";
import './NavBar.scss';
import { useCart } from "../hooks/useCart";
import UserAvatar from "./UseAvatar";

const Nav = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const { cart } = useCart();

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tsofiya Osadchi</span>
            </Navbar.Brand>

            <div className="flex md:order-2 items-center">
                <div className="mr-5">
                    <Search />
                </div>

                <Link to="/cart" className="mr-4">
                    <Tooltip
                        content="View Cart"
                        placement="top"
                        className="text-xs bg-gray-700 text-white rounded px-2 py-1"
                    >
                        <div className="relative">
                            <FiShoppingCart size={20} className={cart && cart.totalQuantity > 0 ? "text-red-500" : "text-gray-300"} />
                            {cart && cart.totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                                    {cart.totalQuantity}
                                </span>
                            )}
                        </div>
                    </Tooltip>
                </Link>

                {isLoggedIn && user?.isAdmin && (
                    <>
                        <Link to="/admin/dashboard" className="mr-5 hidden md:block">
                            <Tooltip
                                content="Manage Shop"
                                placement="top"
                                className="text-xs bg-gray-700 text-white rounded px-2 py-1"
                            >
                                <FiSettings size={20} className="text-gray hover:text-gray-300" />
                            </Tooltip>
                        </Link>
                        {/* Add other admin links if needed */}
                    </>
                )}

                {isLoggedIn && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <UserAvatar firstName={user.name.first} lastName={user.name.last} />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-xs">{user.name.first} {user.name.last}</span>
                            <span className="block truncate text-xs font-medium">{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={() => navigate(`/users/${user._id}`)}>Edit Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/orders")}>My Orders</Dropdown.Item>
                        <Dropdown.Divider />
                        {user.isAdmin && (
                            <>
                                <Dropdown.Item onClick={() => navigate("/admin/dashboard")}>
                                    Manage Shop
                                </Dropdown.Item>
                                <Dropdown.Divider />
                            </>
                        )}
                        <Dropdown.Item as="button">
                            <div className="flex items-center" onClick={() => document.documentElement.classList.toggle('dark')}>
                                <DarkThemeToggle />
                                <span className="ml-2">Mode</span>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => { logout(); navigate("/"); }}>Sign out</Dropdown.Item>
                    </Dropdown>
                )}

                {!isLoggedIn && (
                    <Tooltip content="Login" placement="bottom" className="text-xs bg-gray-700 text-white rounded px-1 py-1">
                        <Link to="/login" className="mr-4 flex items-center">
                            <FiUser size={20} className="text-gray hover:text-gray-300" />
                        </Link>
                    </Tooltip>
                )}

                <Navbar.Toggle />
               {/*  <DarkThemeToggle className="ml-2" />
                <Navbar.Toggle /> */}
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active className="text-xs">
                    Home
                </Navbar.Link>
                <Navbar.Link href="#" className="text-xs">
                    About
                </Navbar.Link>
                <Navbar.Link href="/contact" className="text-xs">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Nav;