import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { getProductById, updateProduct } from "../services/product";
import { IProductInput } from "../@Types/productType";
import { useState, useEffect } from "react";

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<IProductInput>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    });
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
                    setValue('alt', product.alt);
                    setImageUrl(product.image.url);

                    // הוספת מערך ה- variants
                    setValue('variants', product.variants);

                    // אם יש תמונה ישנה
                    setImageName(product.image.url.split('/').pop() || "");
                })
                .catch(err => setError(err));
        }
    }, [id, setValue]);

    const onSubmit = async (data: IProductInput) => {
        try {
            if (id) {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("subtitle", data.subtitle);
                formData.append("description", data.description);

                // הוספת variants
                data.variants.forEach((variant, index) => {
                    formData.append(`variants[${index}][size]`, variant.size);
                    formData.append(`variants[${index}][price]`, variant.price.toString());
                    formData.append(`variants[${index}][quantity]`, variant.quantity.toString());
                });

                formData.append("alt", data.alt);
                if (image) {
                    formData.append("image", image);
                } else {
                    formData.append("imageUrl", imageUrl); // שימוש בתמונה הקיימת אם לא נבחרה תמונה חדשה
                }

                await updateProduct(id, formData);
                dialogs.success("Success", "Product updated successfully").then(() => {
                    navigate("/admin/dashboard");
                });
            }
        } catch (error: any) {
            dialogs.error("Error", error.response?.data?.message || "Failed to update product");
            console.log(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="create-card-container text-gray-800 dark:bg-slate-600">
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
                    <h3 className="mb-2">Variants:</h3>
                    {fields.map((variant, index) => (
                        <div key={variant.id} className="variant">
                            <input placeholder="Size" {...register(`variants.${index}.size` as const, { required: "Size is required" })} />
                            <input placeholder="Price" type="number" step="0.01" {...register(`variants.${index}.price` as const, { required: "Price is required" })} />
                            <input placeholder="Quantity" type="number" {...register(`variants.${index}.quantity` as const, { required: "Quantity is required" })} />
                            <button type="button" className="removeButton" onClick={() => remove(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="add-variant-button" onClick={() => append({ size: "", price: 0, quantity: 0 })}>Add Variant</button>
                </section>

                <button type="submit" className=" bg-slate-600 text-white dark:bg-slate-900">Save</button>
            </form>
        </div>
    );
};

export default EditProduct;
