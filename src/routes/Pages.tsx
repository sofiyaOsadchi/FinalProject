import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // מייבא את הרכיב Link ליצירת קישורים
import pagesService from '../services/pages';

const PagesList = () => {
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await pagesService.getAllPages();
                setPages(response.data);
            } catch (error) {
                console.error('Failed to fetch pages', error);
            }
        };

        fetchPages();
    }, []);

    return (
        <div>
            <h2>Pages</h2>
            <ul>
                {pages.map((page) => (
                    <li key={page._id}>
                        <Link to={`/pages/${page._id}`}>{page.title}</Link> {/* הוספת קישור לכל עמוד */}
                        {/* כפתורי עריכה ומחיקה */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PagesList;
