import React, { useState } from 'react';
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import pagesService from '../services/pages';

const CreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [title, setTitle] = useState('');
    const [components, setComponents] = useState<any[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const navigate = useNavigate();

    const handleAddComponent = (type: string) => {
        const newComponent = { type, content: '', styles: {}, position: { x: 0, y: 0 } };
        setComponents([...components, newComponent]);
    };

    const handleComponentChange = (index: number, content: string) => {
        const updatedComponents = [...components];
        updatedComponents[index].content = content;
        setComponents(updatedComponents);
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("components", JSON.stringify(components));

        if (image) {
            formData.append("image", image);  // הוספת התמונה ל-FormData
        }

        try {
            await pagesService.createPage(formData);
            dialogs.success("Success", "Page Created Successfully")
                .then(() => {
                    navigate("/pages");  // ניתוב מחדש לאחר יצירה מוצלחת
                });
        } catch (error: any) {
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

                {/* אפשרות להעלאת תמונה */}
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

                {/* הוספת רכיבים לעמוד */}
                <section>
                    <button type="button" onClick={() => handleAddComponent('title')}>Add Title</button>
                    <button type="button" onClick={() => handleAddComponent('text')}>Add Text</button>
                    <button type="button" onClick={() => handleAddComponent('image')}>Add Image</button>
                </section>

                {/* הצגת רכיבים קיימים */}
                {components.map((component, index) => (
                    <div key={index}>
                        {component.type === 'title' && (
                            <input
                                type="text"
                                placeholder="Title"
                                value={component.content}
                                onChange={(e) => handleComponentChange(index, e.target.value)}
                            />
                        )}
                        {component.type === 'text' && (
                            <textarea
                                placeholder="Text"
                                value={component.content}
                                onChange={(e) => handleComponentChange(index, e.target.value)}
                            />
                        )}
                        {component.type === 'image' && (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        handleComponentChange(index, file ? file.name : "");
                                        if (file) setImage(file);  // ניתן לשלב את העלאת התמונה כחלק מהרכיב
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}

                <button type="submit">Create Page</button>
            </form>
        </div>
    );
};



////
/* <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0C8SQ5RDCD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0C8SQ5RDCD');
</script> */

export default CreatePage;















































