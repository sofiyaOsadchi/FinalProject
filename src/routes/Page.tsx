import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pagesService from '../services/pages';

const PageDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<any>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await pagesService.getPage(id);
                console.log("Fetched Page Data:", response.data); // לוג כדי לראות אם הנתונים מגיעים
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
                    <div
                        key={index}
                        style={{
                            position: 'relative', // שימוש במיקום יחסית כדי להימנע ממיקום מוחלט שעשוי לגרום לבעיות
                            marginBottom: '20px', // מרווח כדי להקל על קריאה
                            color: component.styles?.color,
                            fontSize: `${component.styles?.fontSize}px`,
                        }}
                    >
                        {component.type === 'title' && <h3>{component.content}</h3>}
                        {component.type === 'text' && <p>{component.content}</p>}

                        {/* הצגת תמונה רק אם יש URL לתמונה */}
                        {component.type === 'image' && component.image?.url && (
                            <>
                                <p>Image URL: {component.image.url}</p> {/* לוג לבדיקה אם ה-URL מגיע */}
                                <img
                                    src={component.image.url}
                                    alt={component.alt || "Image"}
                                    style={{ maxWidth: '100%', height: 'auto' }} // הגבלת גודל התמונה
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageDetail;
