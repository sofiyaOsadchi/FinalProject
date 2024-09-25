import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import pagesService from '../services/pages';
import './CreatePage.scss';

const COMPONENT = 'COMPONENT';

const DraggableComponent = ({ component, index, moveComponent, updateComponent }: any) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: COMPONENT,
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: COMPONENT,
        hover: (draggedItem: any) => {
            if (draggedItem.index !== index) {
                moveComponent(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    }));

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }} className="component-editor">
            {/* עריכת טקסט לכותרת */}
            {component.type === 'title' && (
                <input
                    type="text"
                    value={component.content}
                    onChange={(e) => updateComponent(index, 'content', e.target.value)}
                    placeholder="Enter title text"
                />
            )}

            {/* עריכת טקסט לפסקה */}
            {component.type === 'text' && (
                <textarea
                    value={component.content}
                    onChange={(e) => updateComponent(index, 'content', e.target.value)}
                    placeholder="Enter paragraph text"
                />
            )}

            {/* עריכת URL לתמונה */}
            {component.type === 'image' && (
                <>
                    <input
                        type="text"
                        value={component.image?.url || ''}
                        onChange={(e) => updateComponent(index, 'image', { url: e.target.value })}
                        placeholder="Enter image URL"
                    />
                    {component.image?.url && <img src={component.image.url} alt={component.alt || "Image"} />}
                </>
            )}
        </div>
    );
};

const CreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [title, setTitle] = useState(''); // כותרת העמוד
    const [components, setComponents] = useState<any[]>([]); // רכיבי העמוד
    const navigate = useNavigate();

    // הוספת רכיב חדש לעמוד
    const handleAddComponent = (type: string) => {
        const newComponent = {
            type,
            content: '', // תוכן ברירת מחדל
            image: undefined, // אם זה תמונה
            alt: '', // תיאור לתמונה
            styles: { color: '#000000', fontSize: '16px' }, // סגנונות
            position: { x: 0, y: 0 }, // מיקום
        };
        setComponents([...components, newComponent]); // עדכון הרכיבים עם רכיב חדש
    };

    // הזזת רכיב
    const moveComponent = (fromIndex: number, toIndex: number) => {
        const updatedComponents = [...components];
        const [movedComponent] = updatedComponents.splice(fromIndex, 1);
        updatedComponents.splice(toIndex, 0, movedComponent);
        setComponents(updatedComponents);
    };

    // עדכון תוכן של רכיב
    const updateComponent = (index: number, key: string, value: any) => {
        const updatedComponents = [...components];
        updatedComponents[index] = { ...updatedComponents[index], [key]: value };
        setComponents(updatedComponents);
    };

    // שליחת הנתונים לשרת
    const onSubmit = async () => {
        const pageData = {
            title,
            components,
        };

        try {
            await pagesService.createPage(pageData);
            dialogs.success("Success", "Page Created Successfully")
                .then(() => navigate("/pages"));
        } catch (error) {
            dialogs.error("Error", error.response?.data?.message || "Failed to create page");
        }
    };

    return (
        <div className="create-page-container">
            <h2>Create New Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Page Title"
                        required
                    />
                </section>

                <section className="component-buttons">
                    <button type="button" onClick={() => handleAddComponent('title')}>Add Title</button>
                    <button type="button" onClick={() => handleAddComponent('text')}>Add Text</button>
                    <button type="button" onClick={() => handleAddComponent('image')}>Add Image</button>
                </section>

                <section className="components-list">
                    {components.map((component, index) => (
                        <DraggableComponent
                            key={index}
                            index={index}
                            component={component}
                            moveComponent={moveComponent}
                            updateComponent={updateComponent} // פונקציה לעדכון תוכן הרכיב
                        />
                    ))}
                </section>

                <button type="submit">Create Page</button>
            </form>
        </div>
    );
};

export default CreatePage;
