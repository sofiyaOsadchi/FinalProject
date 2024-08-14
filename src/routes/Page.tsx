import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pagesService from '../services/pages';

const PageDetail = () => {
    const { id } = useParams<{ id: string }>(); // קבלת ה-id מה-URL
    const [page, setPage] = useState<any>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await pagesService.getPage(id); // קריאה לשרת כדי לקבל את העמוד לפי ה-id
                setPage(response.data);
            } catch (error) {
                console.error('Failed to fetch page', error);
            }
        };

        fetchPage();
    }, [id]);

    if (!page) return <div>Loading...</div>;

    return (
        <div>
            <h2>{page.title}</h2>
            <div>
                {page.components.map((component, index) => (
                    <div key={index}>
                        {/* הצגת רכיבים שונים לפי הסוג שלהם */}
                        {component.type === 'title' && <h3>{component.content}</h3>}
                        {component.type === 'text' && <p>{component.content}</p>}
                        {component.type === 'image' && component.image && (
                            <img src={component.image.url} alt={component.alt || "Image"} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageDetail;
