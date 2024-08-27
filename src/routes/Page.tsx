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
                            position: 'absolute',
                            top: `${component.position.y}px`,
                            left: `${component.position.x}px`,
                            color: component.styles?.color,
                            fontSize: `${component.styles?.fontSize}px`,
                        }}
                    >
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
