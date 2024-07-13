import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { createNewProduct } from "../services/product";
import { useAuth } from "../hooks/useAuth";
import { IProduct } from "../@Types/productType";
import patterns from "../validations/patterns";


const CreateProduct = () => {
    const { token } = useAuth(); // Get the token from the context
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();

    const onSubmit = async (data: IProduct) => {
        if (!token) {
            dialogs.error("Error", "No authentication token found.");
            return;
        }

        try {
            await createNewProduct(data);
            dialogs.success("Success", "Card Created Successfully").then(() => {
                navigate("/");
            });
        } catch (error: any) {
            console.log(data);
            dialogs.error("Error", error.response);
            console.log(error);
        }
    };


    return (
        <div className="create-card-container bg-blue-950  text-white dark:bg-slate-600">
            <h2>Create New Product</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* All form fields updated for card creation */}


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
                    <input placeholder="Size" {...register('size',
                        {
                            required: 'Size is required',
                        }
                    )

                    } />
                </section>
                <section>
                    <input placeholder="Quantity" type="number" {...register('quantity', { required: 'Quantity is required' })} />
                </section>

                <button type="submit">Create Card</button>
            </form>
        </div>
    );
};

export default CreateProduct;