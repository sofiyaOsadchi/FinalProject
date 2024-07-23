import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { createNewProduct } from "../services/product";
import { useAuth } from "../hooks/useAuth";
import { IProductInput } from "../@Types/productType";
import { useState } from "react";

const CreateProduct = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IProductInput>();
    const [image, setImage] = useState<File | null>(null);

    const onSubmit = async (data: IProductInput) => {
        if (!token) {
            dialogs.error("Error", "No authentication token found.");
            return;
        }

        if (!image) {
            dialogs.error("Error", "Please select an image.");
            return;
        }

        const sizesArray = data.sizes.split(',').map(size => size.trim());

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("subtitle", data.subtitle);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());

        // הוספת sizes כמספר פריטים ב-FormData
        sizesArray.forEach((size, index) => {
            formData.append(`sizes[${index}]`, size);
        });

        formData.append("quantity", data.quantity.toString());
        formData.append("alt", data.alt);
        if (image) {
            formData.append("image", image);
        }

        try {
            console.log("Form Data:", Object.fromEntries(formData.entries())); // לוג לפני שליחה
            await createNewProduct(formData);
            dialogs.success("Success", "Product Created Successfully")
                .then(() => {
                    navigate("/");
                });
        } catch (error: any) {
            console.log("Form Data Error:", Object.fromEntries(formData.entries())); // לוג בשגיאה
            dialogs.error("Error", error.response);
            console.log(error);
        }
    };

    return (
        <div className="create-card-container bg-blue-950 text-white dark:bg-slate-600">
            <h2>Create New Product</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <input placeholder="Title" {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </section>
                <section>
                    <input placeholder="Subtitle" {...register("subtitle", { required: "Subtitle is required" })} />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </section>
                <section>
                    <input placeholder="Description" {...register("description", { required: "Description is required" })} />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </section>
                <section>
                    <input placeholder="Price" type="number" step="0.01" {...register('price', { required: 'Price is required' })} />
                    <span className="error-message">{errors.price && errors.price.message}</span>
                </section>
                <section>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                </section>
                <section>
                    <input placeholder="Image Description" {...register("alt", { required: "Image description is required" })} />
                    {errors.alt && <p className="text-red-500">{errors.alt.message}</p>}
                </section>
                <section>
                    <input placeholder="Sizes (comma separated, e.g., S,M,L)" {...register('sizes', { required: 'Sizes are required' })} />
                    {errors.sizes && <p className="text-red-500">{errors.sizes.message}</p>}
                </section>
                <section>
                    <input placeholder="Quantity" type="number" {...register('quantity', { required: 'Quantity is required' })} />
                    {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
                </section>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;
