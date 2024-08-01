import React from 'react';
import './About.scss';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <section className="section welcome">
                <h2 className="section-title">Welcome to Our Store</h2>
                <p className="section-description">
                    We have built an intuitive and modern online store with a strong emphasis on innovative design and user-friendly experience.
                    Our goal is to provide a seamless shopping experience for our customers, making it easy to navigate, find products, and complete purchases.
                    Whether you are browsing on a desktop or mobile device, our store is designed to be fully responsive and accessible.
                </p>
            </section>

            <section className="section search-notifications">
                <h2 className="section-title">Search and Notifications</h2>
                <p className="section-description">
                    The search functionality is seamlessly integrated into the navigation bar, allowing users to quickly find products across different pages.
                    Our store also features pop-up notifications for successful actions and confirmations before deleting items, ensuring that users are well-informed
                    about their actions and reducing the risk of accidental deletions.
                </p>
            </section>

            <section className="section user-management">
                <h2 className="section-title">User Management</h2>
                <p className="section-description">
                    Our website offers a robust user management system that ensures secure and efficient handling of user accounts.
                    There are two levels of access: regular users and administrators. We use bcrypt for password hashing to enhance security.
                    Users have the ability to edit their personal details, ensuring their information is always up to date.
                    Administrators can manage user access and roles, providing a comprehensive view of all registered users and the ability to remove users if necessary.
                </p>
            </section>

            <section className="section product-management">
                <h2 className="section-title">Product Management</h2>
                <p className="section-description">
                    Our product management system is designed to be flexible and detailed. Each product can have multiple variants, allowing for different sizes, and prices.
                    This ensures that inventory and pricing can be managed accurately for each variant. Additionally, administrators can add new products, update existing product details,
                    and remove products from the inventory as needed. The system is adaptable for future enhancements to cater to specific business requirements.
                </p>
            </section>

            <section className="section shopping-cart">
                <h2 className="section-title">Shopping Cart</h2>
                <p className="section-description">
                    The shopping cart is designed to be intuitive and user-friendly. Users can easily add products to their cart, update quantities, and view the total cost of their purchases.
                    After completing a purchase, users can see a detailed order summary. They can also view their entire order history in their account page, allowing them to keep track of their past purchases.
                </p>
            </section>

            <section className="section admin-dashboard">
                <h2 className="section-title">Admin Dashboard</h2>
                <p className="section-description">
                    The admin dashboard is a comprehensive control center for managing the website's functionalities. It includes five main tabs, each dedicated to a specific area of management:
                </p>
                <ul className="dashboard-tabs">
                    <li><strong>Manage Products:</strong> Administrators can view, create, edit, and delete products. This tab provides all the tools needed to keep the product catalog up to date and well-organized.</li>
                    <li><strong>Manage Users:</strong> This tab allows administrators to view and delete users.</li>
                    <li><strong>Manage Orders:</strong> Administrators can view all orders, change their status, and cancel orders if necessary. This tab helps in efficiently managing and tracking customer orders.</li>
                    <li><strong>Analytics:</strong> This tab offers detailed sales analytics based on selected date ranges. Administrators can track sales performance and make informed decisions based on real-time data.</li>
                    <li><strong>CRM System (Leads):</strong> This tab is dedicated to managing leads and messages, providing a streamlined system for handling customer interactions and potential sales opportunities.</li>
                </ul>
            </section>

            <section className="section backend-technology">
                <h2 className="section-title">Backend and Technology</h2>
                <p className="section-description">
                    Our store is built using MongoDB, which provides a flexible and scalable database solution. MongoDB's schema-less nature allows for easy adjustments and scaling,
                    ensuring that the system can grow with the needs of the business. The backend is powered by Node.js and Express.js, providing a robust and efficient server-side framework.
                    The use of modern technologies ensures that our store is fast, reliable, and capable of handling large volumes of data and traffic efficiently. We have implemented extensive validations
                    and error handling to ensure data integrity and smooth operation of the store. The system is designed to prevent common issues and provide a seamless experience for both administrators and users.
                </p>
            </section>
        </div>
    );
};

export default About;