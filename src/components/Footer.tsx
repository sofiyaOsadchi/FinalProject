import { FiAlertCircle, FiHome, FiMail } from 'react-icons/fi';
import { Tooltip } from 'flowbite-react';
import './Footer.scss';

function Footer() {
    return (
        <footer className="footer text-slate-600 dark:bg-[#374151]">
            <div className="full-footer-content">
                <span className="text-sm md:p-6 p-4 sm:text-center dark:text-gray-200 font-medium">
                    2024 All Rights Reserved To Tsofiya Osadchi ©
                </span>
                <ul className="flex flex-wrap items-center text-sm font-medium mr-3 dark:text-slate-200">
                    <li>
                        <Tooltip content="Home" placement="top" className="text-xs bg-gray-700 rounded px-1 py-1">
                            <a href="/" className="hover:underline dark:text-gray-200"><FiHome size={20} /></a>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="About" placement="top" className="text-xs bg-gray-700 text-white rounded px-1 py-1">
                            <a href="/about" className="hover:underline dark:text-gray-200"><FiAlertCircle size={20} /></a>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Contact" placement="top" className="text-xs bg-gray-700 text-white rounded px-1 py-1">
                            <a href="/contact" className="hover:underline dark:text-gray-200"><FiMail size={20} /></a>
                        </Tooltip>
                    </li>
                </ul>
            </div>
            <div className="mobile-footer-content">
                <span className="mobile-footer text-gray-700 dark:text-[#f0e6f6]">
                    All Rights Reserved To Tsofiya Osdachi ©
                </span>
                <ul className="text-gray-700 dark:text-[#f0e6f6]">
                    <li><a href="/" className="hover:underline text-gray-700 dark:text-[#f0e6f6]"><FiHome /></a></li>
                    <li><a href="/about" className="hover:underline dark:text-[#f0e6f6]"><FiAlertCircle /></a></li>
                    <li><a href="/contact" className="hover:underline dark:text-[#f0e6f6]"><FiMail /></a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
