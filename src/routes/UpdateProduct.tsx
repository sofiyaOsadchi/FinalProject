import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProductById, updateProduct } from '../services/product';
import { IProduct } from '../@Types/productType';
import './CreateProduct.scss';
import dialogs from '../ui/dialogs';
import patterns from '../validations/patterns';

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProduct>();
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    const product = res.data;
                    setValue('title', product.title);
                    setValue('subtitle', product.subtitle);
                    setValue('description', product.description);
                    setValue('price', product.price);
                    setValue('image.url', product.image.url);
                    setValue('image.alt', product.image.alt);
                    setValue('size', product.size);
                    setValue('quantity', product.quantity);
                })
                .catch(err => setError(err));
        }
    }, [id, setValue]);

    const onSubmit = async (data: IProduct) => {
        try {
            if (id) {
                await updateProduct(id, data);
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
                {/* title */}
                <section>
                    <input placeholder="Title" {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </section>

                {/* subtitle */}
                <section>
                    <input placeholder="Subtitle" {...register("subtitle", { required: "Subtitle is required" })} />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </section>

                {/* description */}
                <section>
                    <input placeholder="Description" {...register("description", { required: "Description is required" })} />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </section>

                {/* price */}
                <section>
                    <input placeholder="Price" type="number" step="0.01" {...register('price', { required: 'Price is required' })} />
                    <span className="error-message">{errors.price && errors.price.message}</span>
                </section>

                {/* image.url */}
                <section>
                    <input
                        placeholder="Image URL"
                        type="url"
                        {...register("image.url", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.url,
                                message: "Invalid image URL",
                            },
                        })}
                    />
                    {errors.image?.url && (
                        <p className="text-red-500">{errors.image?.url?.message}</p>
                    )}
                </section>

                {/* image.alt */}
                <section>
                    <input
                        placeholder="Image Description"
                        type="text"
                        {...register("image.alt", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.image?.alt && (
                        <p className="text-red-500">{errors.image?.alt?.message}</p>
                    )}
                </section>

                <section>
                    <input placeholder="Size" {...register('size', { required: 'Size is required' })} />
                </section>
                <section>
                    <input placeholder="Quantity" type="number" {...register('quantity', { required: 'Quantity is required' })} />
                </section>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProduct;
