import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import pagesService from '../services/pages'; // השירות המעודכן ליצירת עמודים
import './CreatePage.scss';

const COMPONENT = 'COMPONENT';

const DraggableComponent = ({ component, index, moveComponent }: any) => {
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
            {component.type === 'title' && <h3>{component.content}</h3>}
            {component.type === 'text' && <p>{component.content}</p>}
            {component.type === 'image' && component.image && <img src={component.image.url} alt={component.alt || "Image"} />}
        </div>
    );
};

const CreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); // שימוש ב-React Hook Form כדי לטפל בטופס
    const [title, setTitle] = useState(''); // כותרת של העמוד
    const [components, setComponents] = useState<any[]>([]); // רכיבים דינמיים בעמוד
    const navigate = useNavigate();

    // הוספת רכיב חדש לעמוד
    const handleAddComponent = (type: string) => {
        const newComponent = {
            type,
            content: '', // טקסט לתוכן
            image: undefined, // תמונה, אם זה רכיב תמונה
            alt: '', // תיאור התמונה
            styles: { color: '#000000', fontSize: '16px' }, // סגנונות ברירת מחדל
            position: { x: 0, y: 0 }, // מיקום ברירת מחדל
        };
        setComponents([...components, newComponent]); // עדכון רשימת הרכיבים
    };

    // פונקציה להזזת רכיב בעמוד (drag & drop)
    const moveComponent = (fromIndex: number, toIndex: number) => {
        const updatedComponents = [...components];
        const [movedComponent] = updatedComponents.splice(fromIndex, 1);
        updatedComponents.splice(toIndex, 0, movedComponent); // שינוי מיקום של רכיב ברשימה
        setComponents(updatedComponents);
    };

    // שליחת הנתונים לשרת
    const onSubmit = async () => {
        const pageData = {
            title, // הכותרת של העמוד
            components // רשימת הרכיבים
        };

        try {
            await pagesService.createPage(pageData); // שליחה לשירות יצירת עמוד
            dialogs.success("Success", "Page Created Successfully")
                .then(() => navigate("/pages")); // ניווט חזרה לרשימת העמודים לאחר יצירה מוצלחת
        } catch (error) {
            dialogs.error("Error", error.response?.data?.message || "Failed to create page"); // טיפול בשגיאה
        }
    };

    return (
        <div className="create-page-container">
            <h2>Create New Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    {/* שדה להזנת הכותרת */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Page Title"
                        required
                    />
                </section>

                <section className="component-buttons">
                    {/* כפתורים להוספת רכיבים דינמיים */}
                    <button type="button" onClick={() => handleAddComponent('title')}>Add Title</button>
                    <button type="button" onClick={() => handleAddComponent('text')}>Add Text</button>
                    <button type="button" onClick={() => handleAddComponent('image')}>Add Image</button>
                </section>

                <section className="components-list">
                    {/* רשימת הרכיבים הדינמיים שנוצרו */}
                    {components.map((component, index) => (
                        <DraggableComponent
                            key={index}
                            index={index}
                            component={component}
                            moveComponent={moveComponent} // פונקציה להזזת רכיב
                        />
                    ))}
                </section>

                <button type="submit">Create Page</button>
            </form>
        </div>
    );
};

export default CreatePage;
