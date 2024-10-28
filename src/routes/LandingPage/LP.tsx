import React from 'react';
import './Styles/main.scss';
import RuningCode from '../../components/RuningCode';
import StudioContact from './StudioContact';


const services = [

    {
        title: 'עיצוב מוצר ועיצוב אתרים',
        description: 'תכנון ועיצוב חוויות דיגיטליות ייחודיות, המשלבות יצירתיות, חדשנות והתאמה מלאה לצרכים הייחודיים של המותג שלך. כל עיצוב נבנה במטרה ליצור חיבור משמעותי בין המוצר לקהל היעד שלו.',
        icon: 'img/Product & Web Design.svg',
    },
    {
        title: 'ייעוץ UX/UI',
        description: 'ייעוץ מקצועי וממוקד לשיפור חוויית המשתמש, עם דגש על יצירת אינטראקציה טבעית ומזמינה. שילוב הבנה מעמיקה של הצרכים עם פתרונות מעשיים לשדרוג האפקטיביות והנגישות של המוצר שלך.',
        icon: 'img/UI Consultation.svg',
    },

    {
        title: 'פיתוח צד לקוח (Front-End)',
        description: 'פיתוח צד לקוח מתמקד ביצירת ממשקי משתמש דינאמיים ואינטראקטיביים, עם דגש על חוויית משתמש חלקה, טבעית ומותאמת לכל מכשיר. הפיתוח משלב עיצוב מתקדם עם קוד איכותי, על מנת לספק ביצועים מעולים והתאמה מלאה לצרכים של משתמשי הקצה.',
        icon: 'img/Front-End Development.svg',
    },

    {
        title: 'פיתוח צד שרת (Back-End)',
        description: 'בניית תשתיות חזקות ומאובטחות שמתפקדות בצורה מושלמת מאחורי הקלעים, כך שהמערכת שלך תוכל להציע שירות חלק ומהיר למשתמשים. התאמה אישית לכל צורך כדי להבטיח פתרונות טכנולוגיים יציבים ואמינים.',
        icon: 'img/Back-End Development.svg',
    },
    
    {
        title: 'פיתוח חנויות Shopify',
        description: 'צירת חנויות Shopify שמספרות את סיפור המותג שלך ויוצרות חוויית קנייה ייחודית ואינטואיטיבית. כל חנות נבנית בהתאמה אישית כדי לשקף את הערכים שלך ולמשוך את הלקוחות הנכונים.',
        icon: 'img/Shopify Store Development.svg',
    },
    {
        title: 'WordPress ו-Elementor',
        description: 'עיצוב ופיתוח אתרים מתקדמים ב-WordPress עם Elementor, המאפשרים לך לשלוט בקלות בתוכן ולהתאים אותו לצרכים שלך. כל אתר מעוצב בקפידה כדי לשדר אמינות, נראות מרשימה, וגמישות מלאה בניהול.',
        icon: 'img/WordPress & Elementor.svg',
    },
   
];



const LandingPageHeb = () => {
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
                            <p>We’d love to hear your ideas</p>
                        </div>

                        <div className="icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>


                    </a>


                    <a href="#firstProject" className="small-banner projects">
                        <div className="banner-content">
                            <h2>Projects</h2>
                            <p>View recent works and designs</p>
                        </div>
                        <div className="icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </a>
                </div>
            </div>

            <div className="services-section">
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
                <div className="left-side">
                    <p className="description">
                        הפכו את הרעיונות שלכם למציאות בעזרת עיצוב ופיתוח חדשניים, שמקדמים את המותג שלכם קדימה.



                    </p>
                    <a href="#contactForm" className="gold-button">ספרו לנו על הפרויקט שלכם</a>
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
                        <p className="ecommerce-description">Personalizing Cancer Treatments</p>
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
                        <p className="ecommerce-description">App for managing apartment defects and buyer delivery</p>
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
                        <p className="ecommerce-description">Games for Cognitive Motion Rehabilitation</p>
                        <div className="arrow-icon-container">
                            <img src="img/Arrow.svg" alt="Arrow Icon" className="arrow-icon" />
                        </div>
                    </div>
                </a>
            </div>

            <section className="aboutUs-container">
                <div className="aboutUs-content">
                    <h2 className="aboutUs-title">קצת עלינו</h2>
                    <p className="aboutUs-description">
                        אנחנו צופיה, תמר ואלכס מסטודיו Orime – שתי מפתחות Full Stack ומעצב UX/UI. יחד, <br /> אנחנו מביאים שילוב ייחודי של מיומנויות וניסיון לתחום בניית חנויות E-commerce, אתרים ותוכנות.
                    </p>
                    <p className="aboutUs-description">
                        אנחנו מתמחים בפיתוח חנויות ואתרים בקוד פתוח או בפלטפורמות כמו Elementor ו-Shopify, תוך הקפדה על <br />אבטחת מידע ברמה הגבוהה ביותר, רספונסיביות, ופונקציונליות מתקדמת. המטרה שלנו היא ליצור חנויות ואתרים <br /> שנראים לא רק  מצוין, אלא גם מספקים חוויית משתמש מיטבית שממקסמת את ההצלחה העסקית שלכם.
                    </p>
                    <p className="aboutUs-description">
                        ב-Orime, אנחנו מאמינים בשיתוף פעולה ובחדשנות, ועובדים בצמוד ללקוחותינו כדי להביא לידי ביטוי את החזון והצרכים הייחודיים שלהם. <br /> אנחנו מתחייבים לספק שירות מקצועי ואישי שיסייע לעסק שלכם לצמוח ולהצליח בעולם הדיגיטלי.
                    </p>
                    <p className="aboutUs-description">מוכנים לבנות משהו מדהים יחד? בואו נהפוך את הרעיונות שלכם למציאות.</p>
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

export default LandingPageHeb;
