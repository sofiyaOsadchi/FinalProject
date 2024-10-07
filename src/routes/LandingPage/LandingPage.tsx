import React from 'react';
import './Styles/main.scss';
import RuningCode from '../../components/RuningCode';
import StudioContact from './StudioContact';


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
<img src="img/Logo.png" alt="orime-logo" />
                    </div>
                    <div className="center-text">
                        <h2>Design - Develop - Deliver</h2>
                        <p>Designing ideas, Building solutions</p>
                    </div>

                </div>

                <div className="side-banners">
                    <a href="#contactForm" className="small-banner get-in-touch">
                        <div className="banner-content">
                            <h2>Get in Touch</h2>
                            <p>30 Figma icons + 15 solid color</p>
                        </div>

                        <div className="icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>


                    </a>


                    <a href="#firstProject" className="small-banner projects">
                        <div className="banner-content">
                            <h2>Projects</h2>
                            <p>30 Figma icons + 15 solid color</p>
                        </div>
                        <div className="icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </a>
                </div>
            </div>

            <div className="services-section">
                <div className="left-side">
                    <p className="description">
                        Discover how we can elevate your brand with our range of design and development services, tailored to bring your ideas to life.
                    </p>
                    <a href="#contactForm" className="gold-button">Get in Touch</a>
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


            <div className="banner-section" id="firstProject">
                <img src="img/T&T Fashion.jpg" alt="Banner Image" className="banner-image fashion" />
                <a href="https://finalproject-ousr.onrender.com/about" target="_blank" rel="noopener noreferrer" className="content-overlay">
                    <div className="content-square">
                        <h3 className="ecommerce-title">Full Stuck Development</h3>
                        <h2 className="ecommerce-name">T&T Fashion</h2>
                        <p className="ecommerce-description">Online shop was built by React and NodeJS</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </a>
            </div>

            {/* sectio private projects
 */}
            <div className="banner-section">
                <img src="img/Priimo.jpg" alt="Banner Image" className="banner-image priimo" />
                <a href="http://www.alex-osadchi.com/primo/" target="_blank" rel="noopener noreferrer" className="left-content-overlay">
                    <div className="left-content-square">
                        <h3 className="ecommerce-title">Software Design</h3>
                        <h2 className="ecommerce-name">Priimo</h2>
                        <p className="ecommerce-description">45x1U keyset. 30 Figma icons + 15 solid color</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </a>
            </div>

            {/* ILAN
 */}

            <div className="banner-section">
                <img src="img/Ilan.jpg" alt="Banner Image" className="banner-image shemesh" />
                <a href="http://www.alex-osadchi.com/ilaan-shemesh/" target="_blank" rel="noopener noreferrer" className="content-overlay">
                    <div className="content-square">
                        <h3 className="ecommerce-title">Management System</h3>
                        <h2 className="ecommerce-name">Ilan Overview</h2>
                        <p className="ecommerce-description">45x1U keyset. 30 Figma icons + 15 solid color</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </a>
            </div>

            {/* sectio private projects
 */}
            <div className="banner-section">
                <img src="img/Reability.jpg" alt="Banner Image" className="banner-image reability" />
                <a href="http://www.alex-osadchi.com/reability-online-2/" target="_blank" rel="noopener noreferrer" className="left-content-overlay">
                    <div className="left-content-square">
                        <h3 className="ecommerce-title">Video Motion Game</h3>
                        <h2 className="ecommerce-name">ReAbility Online</h2>
                        <p className="ecommerce-description">45x1U keyset. 30 Figma icons + 15 solid color</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </a>
            </div>

            <section className="aboutUs-container">
                <div className="aboutUs-content">
                    <h2 className="aboutUs-title">About Us</h2>
                    <p className="aboutUs-description">At Orime, we are passionate about transforming ideas into digital solutions that bring real results. With expertise in design and development, our team delivers tailored services that meet the unique needs of each project. From creating visually compelling websites to developing robust web applications, we blend creativity and functionality seamlessly.</p>
                    <p className="aboutUs-description">Our collaborative approach ensures that every project reflects your brand’s goals, while our commitment to excellence drives results that exceed expectations.</p>
                    <p className="aboutUs-description">Ready to build something amazing? Let’s bring your ideas to life.</p>
                </div>

                <div className="members-container">
                    <div className="aboutUs-member tamar-img">

                        <div className='member-info'>
                            <div className='member-details'>
                                <h3 className='member-title'>Tamar Tamam</h3>
                                <p className='member-description'>Full-Stack Developer</p>
                            </div>
                            <div className='member-social'>
                                <img src='img/Back-End Development.svg' alt='Back-End Development' />
                            </div>
                        </div>
                    </div>
                    <div className="aboutUs-member tsofiya-img">

                        <div className='member-info'>
                            <div className='member-details'>
                                <h3 className='member-title'>Tsofiya Osadchi</h3>
                                <p className='member-description'>Full-Stack Developer</p>
                            </div>
                            <div className='member-social'>
                                <img src='img/Back-End Development.svg' alt='Back-End Development' />
                            </div>
                        </div>
                    </div>
                    <div className="aboutUs-member alex-img">

                        <div className='member-info'>
                            <div className='member-details'>
                                <h3 className='member-title'>Alex Osadchi</h3>
                                <p className='member-description'>Product Designer (UX/UI)</p>
                            </div>
                            <div className='member-social'>
                                <img src='img/Product & Web Design.svg' alt='Product & Web Design' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id="contactForm">
                <StudioContact />
            </div>

        </div>
    );
};

export default LandingPage;
