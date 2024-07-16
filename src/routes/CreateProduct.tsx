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

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("subtitle", data.subtitle);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("size", data.size);
        formData.append("quantity", data.quantity.toString());
        formData.append("alt", data.image.alt);
        if (image) {
            formData.append("image", image);
        }

        try {
            await createNewProduct(formData, token);
            dialogs.success("Success", "Product Created Successfully").then(() => {
                navigate("/");
            });
        } catch (error: any) {
            console.log(data);
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
                    <input placeholder="Image Description" {...register("image.alt", { required: "Image description is required" })} />
                    {errors.image?.alt && <p className="text-red-500">{errors.image.alt.message}</p>}
                </section>
                <section>
                    <input placeholder="Size" {...register('size', { required: 'Size is required' })} />
                </section>
                <section>
                    <input placeholder="Quantity" type="number" {...register('quantity', { required: 'Quantity is required' })} />
                </section>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;
