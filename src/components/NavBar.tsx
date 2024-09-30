
import { DarkThemeToggle, Dropdown, Navbar, Tooltip } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiBox, FiUser, FiShoppingCart, FiSettings, FiUsers, FiTrendingUp } from "react-icons/fi";
import Search from "./Search";
import './NavBar.scss';
import { useCart } from "../hooks/useCart";
import UserAvatar from "./UseAvatar";



const Nav = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const { cart } = useCart();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <Navbar fluid rounded style={{ width: '100%' }}>
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">T&T Fashion</span>
            </Navbar.Brand>

            <div className="flex md:order-2 items-center">
                <div className="mr-4">
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
                <DarkThemeToggle />
            
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" className={`text-xs ${isActive("/") ? "font-bold" : ""}`}>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/about" className={`text-xs ${isActive("/about") ? "font-bold" : ""}`}>
                    About
                </Navbar.Link>
                <Navbar.Link href="/contact" className={`text-xs ${isActive("/contact") ? "font-bold" : ""}`}>
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Nav;