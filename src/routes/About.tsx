import React from 'react';
import './About.scss';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <section className="section welcome">
                <div className="text-image-container column-align">
                    <div className="text-content">
                        <h2 className="section-title">T&T Fashion</h2>
                        <p className="section-description">
                            We have built an intuitive and modern online store with a strong emphasis on innovative design and user-friendly experience.
                            Our goal is to provide a seamless shopping experience for our customers, making it easy to navigate, find products, and complete purchases.
                            Whether you are browsing on a desktop or mobile device, our store is designed to be fully responsive and accessible.
                        </p>
                    </div>
                    <img src="img/b1.png" alt="Store" className="section-image large-image" />
                </div>
            </section>

            <section className="section shopping-cart">
                <div className="text-image-container right-align">
                    <img src="img/b22.png" alt="Shopping Cart" className="section-image" />
                    <div className="text-content">
                        <h2 className="section-title">Shopping Cart</h2>
                        <p className="section-description">
                            The shopping cart is designed to be intuitive and user-friendly. Users can easily add products to their cart, update quantities, and view the total cost of their purchases.
                            After completing a purchase, users can see a detailed order summary. They can also view their entire order history in their account page, allowing them to keep track of their past purchases.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section admin-dashboard">
                <h2 className="section-title">Admin Dashboard</h2>
                <p className="section-description">
                    The admin dashboard is a comprehensive control center for managing the website's functionalities. It includes five main tabs, each dedicated to a specific area of management:
                </p>
                <ul className="dashboard-tabs">
                    <li>
                        <div className="text-image-container right-align">
                            <div className="text-content">
                                <strong>Manage Products: </strong>
                                Administrators can view, create, edit, and delete products. This tab provides all the tools needed to keep the product catalog up to date and well-organized.
                                <br /><br />
                                <strong>Manage Users: </strong>
                                Our website offers a robust user management system that ensures secure and efficient handling of user accounts.
                                There are two levels of access: regular users and administrators. We use bcrypt for password hashing to enhance security.
                                Users have the ability to edit their personal details, ensuring their information is always up to date.
                            </div>
                            <img src="img/b3.png" alt="Manage Products and Users" className="section-image" />
                        </div>
                    </li>

                    <li>
                        <div className="text-image-container left-align">
                            <img src="img/b4.png" alt="Manage Orders" className="section-image" />
                            <div className="text-content">
                                <strong>Manage Orders: </strong>
                                Administrators can view all orders, change their status, and cancel orders if necessary. This tab helps in efficiently managing and tracking customer orders.
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="text-image-container right-align">
                            <div className="text-content">
                                <strong>Analytics: </strong>
                                This tab offers detailed sales analytics based on selected date ranges. Administrators can track sales performance and make informed decisions based on real-time data.
                            </div>
                            <img src="img/b5.png" alt="Analytics" className="section-image" />
                        </div>
                    </li>
                </ul>
            </section>




            <section className="section backend-technology">
                <div className="text-image-container left-align">
                    <div className="text-content">
                        <h2 className="section-title">Backend and Technology</h2>
                        <p className="section-description">
                            Our store is built using MongoDB, which provides a flexible and scalable database solution.
                            The backend is powered by Node.js and Express.js, providing a robust and efficient server-side framework.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
