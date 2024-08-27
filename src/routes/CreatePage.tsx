import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import pagesService from '../services/pages';
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
        <div
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="component-editor"
        >
            {component.type === 'title' && (
                <h3>{component.content}</h3>
            )}
            {component.type === 'text' && (
                <p>{component.content}</p>
            )}
            {component.type === 'image' && component.image && (
                <img src={component.image.url} alt={component.alt || "Image"} />
            )}
        </div>
    );
};

const CreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [title, setTitle] = useState('');
    const [components, setComponents] = useState<any[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const navigate = useNavigate();

    const handleAddComponent = (type: string) => {
        const newComponent = {
            type,
            content: '',
            image: undefined,
            alt: '',
            styles: { color: '#000000', fontSize: '16px' },
            position: { x: 0, y: 0 },
        };
        setComponents([...components, newComponent]);
    };

    const moveComponent = (fromIndex: number, toIndex: number) => {
        const updatedComponents = [...components];
        const [movedComponent] = updatedComponents.splice(fromIndex, 1);
        updatedComponents.splice(toIndex, 0, movedComponent);
        setComponents(updatedComponents);
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("components", JSON.stringify(components));

        if (image) {
            formData.append("image", image);
        }

        try {
            await pagesService.createPage(formData);
            dialogs.success("Success", "Page Created Successfully")
                .then(() => {
                    navigate("/pages");
                });
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

                <section>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setImage(file);
                            setImageName(file ? file.name : "");
                        }}
                    />
                    {imageName && <p className="file-name">{imageName}</p>}
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
                        />
                    ))}
                </section>

                <button type="submit">Create Page</button>
            </form>
        </div>
    );
};

export default CreatePage;
