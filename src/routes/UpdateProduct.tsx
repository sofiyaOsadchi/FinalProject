import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProductById, updateProduct } from '../services/product';
import { IProduct } from '../@Types/productType';
import './CreateProduct.scss';
import dialogs from '../ui/dialogs';

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProduct>();
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    const product = res.data;
                    setValue('title', product.title);
                    setValue('subtitle', product.subtitle);
                    setValue('description', product.description);
                    setValue('price', product.price);
                /*     setValue('image.url', product.image.url); */
                    setValue('alt', product.alt);
                    setValue('size', product.size);
                    setValue('quantity', product.quantity);
                    
                })
                .catch(err => setError(err));
        }
    }, [id, setValue]);

  /*   const onSubmit = async (data: IProduct) => {
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

    if (error) return <div>Error: {error.message}</div>; */

    const onSubmit = async (data: IProduct) => {
        try {
            if (id) {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("subtitle", data.subtitle);
                formData.append("description", data.description);
                formData.append("price", data.price.toString());
                formData.append("size", data.size);
                formData.append("quantity", data.quantity.toString());
                formData.append("alt", data.alt);
                if (image) {
                    formData.append("image", image);
                } else {
                    formData.append("imageUrl", data.image.url); // לשמור על התמונה הקיימת אם לא נבחרה תמונה חדשה
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

              
                {/* <section className='text-gray-50'>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                    
                </section> */}

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
