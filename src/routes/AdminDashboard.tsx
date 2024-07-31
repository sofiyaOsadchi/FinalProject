import { Tabs } from "flowbite-react";
import { FiBox, FiUsers, FiClipboard, FiTrendingUp, FiFileText } from "react-icons/fi";
import AdminProducts from "./AdminProducts";
import Users from "./Users";
import AdminOrders from "./AdminOrders";
import SalesChart from "./SalesByDate";
import './AdminDashboard.scss';
import AdminMessages from "./AdminMessage";

const AdminDashboard = () => {
    return (
        <Tabs aria-label="Tabs with icons" className="tabs">
            <Tabs.Item active title="Manage Products" icon={FiBox}>
                <AdminProducts />
            </Tabs.Item>
            <Tabs.Item title="Manage Users" icon={FiUsers}>
                <Users />
            </Tabs.Item>
            <Tabs.Item title="Manage Orders" icon={FiClipboard}>
                <AdminOrders />
            </Tabs.Item>
            <Tabs.Item title="Analytics" icon={FiTrendingUp}>
                <SalesChart />
            </Tabs.Item>
            <Tabs.Item title="Leads" icon={FiFileText}>
                <AdminMessages />
            </Tabs.Item>
        </Tabs>
    );
};

export default AdminDashboard;
