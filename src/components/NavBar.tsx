// Nav.tsx
"use client";

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { LuPackagePlus } from "react-icons/lu";
import { AiOutlineProject } from "react-icons/ai";
import { FiBox, FiUsers, FiTrendingUp } from "react-icons/fi";


const Nav = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tsofiya Osadchi</span>
            </Navbar.Brand>
           

            <div className="flex md:order-2 items-center">
                {isLoggedIn && user?.isAdmin && (
                    <Link to="/admin/products" className="mr-4">
                        <FiBox size={24} className="text-gray hover:text-gray-300" />
                    </Link>
                )}
                
                {isLoggedIn && user?.isAdmin && (
                    <Link to="/admin/users" className="mr-4">
                        <FiUsers size={24} className="text-gray hover:text-gray-300" />
                    </Link>
                )}
                {isLoggedIn && user?.isAdmin && (
                    <Link to="/users" className="mr-4">
                        <FiTrendingUp size={24} className="text-gray hover:text-gray-300" />
                    </Link>
                )}

                {isLoggedIn && user && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name.first} {user.name.last}</span>
                            <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => { logout(); navigate("/"); }}> Sign out </Dropdown.Item>
                    </Dropdown>
                    
                )}
               
                <Navbar.Toggle />
                <DarkThemeToggle className="ml-2" />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                {!isLoggedIn && <Navbar.Link href="/register">Register</Navbar.Link>}
                {!isLoggedIn && <Navbar.Link href="/login">Login</Navbar.Link>}
                {isLoggedIn && <Navbar.Link href="/profile">Profile</Navbar.Link>}
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;



