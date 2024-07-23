import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { getProductById, updateProduct } from "../services/product";
import { IProductInput } from "../@Types/productType";
import { useState, useEffect } from "react";

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProductInput>();
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    const product = res.data;
                    setValue('title', product.title);
                    setValue('subtitle', product.subtitle);
                    setValue('description', product.description);
                    setValue('price', product.price);
                    setImageUrl(product.image.url);
                    setValue('alt', product.alt);
                    setValue('sizes', product.sizes.join(',')); // הפיכת המערך למחרוזת עם פסיקים
                    setValue('quantity', product.quantity);
                })
                .catch(err => setError(err));
        }
    }, [id, setValue]);

    const onSubmit = async (data: IProductInput) => {
        try {
            if (id) {
                const sizesArray = data.sizes.split(',').map(size => size.trim());
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("subtitle", data.subtitle);
                formData.append("description", data.description);
                formData.append("price", data.price.toString());

                sizesArray.forEach((size, index) => {
                    formData.append(`sizes[${index}]`, size);
                });

                formData.append("quantity", data.quantity.toString());
                formData.append("alt", data.alt);
                if (image) {
                    formData.append("image", image);
                } else {
                    formData.append("imageUrl", imageUrl); // שימוש בתמונה הקיימת אם לא נבחרה תמונה חדשה
                }

                await updateProduct(id, formData);
                dialogs.success("Success", "Product updated successfully").then(() => {
                    navigate("/admin/products");
                });
            }
        } catch (error: any) {
            console.log(data);
            dialogs.error("Error", error.response.data.message);
            console.log(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="create-card-container bg-blue-950 text-white dark:bg-slate-600">
            <h2>Edit Product</h2>
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
                    <input
                        type="file"
                        accept="image/*"
                        className="custom-file-upload"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setImage(file);
                            setImageName(file ? file.name : "");
                        }}
                    />
                    {imageName && <p className="file-name">{imageName}</p>}
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
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProduct;
