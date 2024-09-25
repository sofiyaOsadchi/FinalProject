import React from 'react';
import './Styles/main.scss';


const services = [
    {
        title: 'Back-End Development',
        description: 'Ensuring robust, scalable server-side logic to power your web applications, integrating databases, and APIs efficiently.',
        icon: 'img/Back-End Development.svg', 
    },
    {
        title: 'Front-End Development',
        description: 'Building the user-facing side of your web applications with modern frameworks for a smooth, responsive experience.',
        icon: 'img/Front-End Development.svg',
    },
    {
        title: 'Shopify Store Development',
        description: 'Developing custom eCommerce stores on Shopify, tailored to your business needs, with optimized functionality for increased sales.',
        icon: 'img/Shopify Store Development.svg',
    },
    {
        title: 'WordPress & Elementor',
        description: 'Building dynamic and customizable websites using WordPress and Elementor to give you full control over content and layout.',
        icon: 'img/WordPress & Elementor.svg',
    },
    {
        title: 'Product & Web Design',
        description: 'Crafting visually striking, user-centered designs for both products and websites, ensuring they are intuitive, responsive, and aligned with your brand\'s goals.',
        icon: 'img/Product & Web Design.svg',
    },
    {
        title: 'UX/UI Consultation',
        description: 'Providing expert guidance on user experience and interface design to help you optimize usability and improve user engagement.',
        icon: 'img/UI Consultation.svg',
    },
];



const LandingPage = () => {
    return (
        <div className="landing-page">
        <div className="banner-container">
            <div className="banner">
                <div className="top-left-text">
                    <h3>ORIME</h3>
                </div>
                <div className="center-text">
                    <h1>Design - Develop - Deliver</h1>
                </div>
                <div className="bottom-left-content">
                    <img src="img/About US Star.svg" alt="Asterisk" className="asterisk-icon" />
                    <p>I am passionately committed to utilizing design for beneficial outcomes that are user-focused, delightful, and human-oriented.</p>
                </div>

            </div>

            <div className="side-banners">
                <div className="small-banner get-in-touch">
                    <div className="banner-content">
                        <h2>Get in Touch</h2>
                        <p>30 Figma icons + 15 solid color</p>
                    </div>
                    <div className="icon-container">
                        <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                    </div>
                </div>

                <div className="small-banner projects">
                    <div className="banner-content">
                        <h2>Projects</h2>
                        <p>30 Figma icons + 15 solid color</p>
                    </div>
                    <div className="icon-container">
                        <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                    </div>
                </div> 
            </div>
        </div>

            <div className="services-section">
                <div className="left-side">
                    <p className="description">
                        Discover how we can elevate your brand with our range of design and development services, tailored to bring your ideas to life.
                    </p>
                    <button className="gold-button">Get in Touch</button>
                </div>
                <div className="right-side">
                    <div className="cards-container">
                        {services.map((service, index) => (
                            <div className="card" key={index}>
                                <div className="icon-circle">
                                    <img src={`${service.icon}`} alt={`${service.title} Icon`} />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="banner-section">
                <img src="img/Tsofiya Osadchi.jpg" alt="Banner Image" className="banner-image" />
                <div className="content-overlay">
                    <div className="content-square">
                        <h3 className="ecommerce-title">E-commerce Builder</h3>
                        <h2 className="ecommerce-name">Tsofiya Osadchi</h2>
                        <p className="ecommerce-description">45x1U keyset. 30 Figma icons + 15 solid color</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </div>
            </div>

{/* sectio private projects
 */}
            <div className="banner-section">
                <img src="img/Priimo.jpg" alt="Banner Image" className="banner-image" />
                <div className="left-content-overlay">
                    <div className="left-content-square">
                        <h3 className="ecommerce-title">Software Design</h3>
                        <h2 className="ecommerce-name">Priimo</h2>
                        <p className="ecommerce-description">45x1U keyset. 30 Figma icons + 15 solid color</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </div>
            </div>

{/* ILAN
 */}  

            <div className="banner-section">
                <img src="img/Ilan.jpg" alt="Banner Image" className="banner-image" />
                <div className="content-overlay">
                    <div className="content-square">
                        <h3 className="ecommerce-title">E-commerce Builder</h3>
                        <h2 className="ecommerce-name">Tsofiya Osadchi</h2>
                        <p className="ecommerce-description">45x1U keyset. 30 Figma icons + 15 solid color</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </div>
            </div>

            {/* sectio private projects
 */}
            <div className="banner-section">
                <img src="img/Reability.jpg" alt="Banner Image" className="banner-image" />
                <div className="left-content-overlay">
                    <div className="left-content-square">
                        <h3 className="ecommerce-title">Software Design</h3>
                        <h2 className="ecommerce-name">Priimo</h2>
                        <p className="ecommerce-description">45x1U keyset. 30 Figma icons + 15 solid color</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
};

export default LandingPage;
