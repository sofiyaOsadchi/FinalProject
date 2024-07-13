import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getUserById, updateUser } from '../services/auth';
import { useParams } from 'react-router-dom';
import { updateUserType } from '../@Types/types';
import './Register.scss';
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import patterns from "../validations/patterns";

const UpdateUser = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<updateUserType>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getUserById(id)
                .then(res => {
                    const user = res.data;
                    setValue('name.first', user.name.first);
                    setValue('name.middle', user.name.middle || '');
                    setValue('name.last', user.name.last);
                    setValue('email', user.email);
                    setValue('phone', user.phone);
                    setValue('address.city', user.address.city);
                    setValue('address.street', user.address.street);
                    setValue('address.houseNumber', user.address.houseNumber);
                    setValue('address.country', user.address.country);
                    setValue('address.zip', user.address.zip);
                    setValue('image.url', user.image?.url || '');
                    setValue('image.alt', user.image?.alt || '');
                    setValue('address.state', user.address.state || '');
                })
                .catch(err => console.log(err));
        }
    }, [id, setValue]);

    const onSubmit = async (data: updateUserType) => {
        try {
            if (id) {
                await updateUser(id, data);
                dialogs.success("Success", "User updated successfully").then(() => {
                    navigate("/profile");
                });
            }
        } catch (error) {
            dialogs.error("Error", "Failed to update user");
            console.log(error);
        }
    };

    return (
        <div className="register-container">
            <h2>Update User</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* firstName */}
                <section>
                    <input
                        placeholder="First Name"
                        type="text"
                        {...register("name.first", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.name?.first && (
                        <p className="text-red-500">{errors.name?.first?.message}</p>
                    )}
                </section>

                {/* middle */}
                <section>
                    <input
                        placeholder="Middle Name"
                        type="text"
                        {...register("name.middle", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.name?.middle && (
                        <p className="text-red-500">{errors.name?.middle?.message}</p>
                    )}
                </section>

                {/* last */}
                <section>
                    <input
                        placeholder="Last Name"
                        type="text"
                        {...register("name.last", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.name?.last && (
                        <p className="text-red-500">{errors.name?.last?.message}</p>
                    )}
                </section>

                {/* phone */}
                <section>
                    <input
                        placeholder="Phone"
                        type="tel"
                        {...register("phone", {
                            required: "This field is mandatory",
                            minLength: { value: 9, message: "Too short" },
                            maxLength: { value: 14, message: "Too long" },
                        })}
                    />
                    {errors.phone && (
                        <p className="text-red-500">{errors.phone?.message}</p>
                    )}
                </section>

                {/* email */}
                <section>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.email,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email?.message}</p>
                    )}
                </section>

                {/* address.city */}
                <section>
                    <input
                        placeholder="City"
                        type="text"
                        {...register("address.city", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.city && (
                        <p className="text-red-500">{errors.address?.city?.message}</p>
                    )}
                </section>

                {/* address.street */}
                <section>
                    <input
                        placeholder="Street"
                        type="text"
                        {...register("address.street", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.street && (
                        <p className="text-red-500">{errors.address?.street?.message}</p>
                    )}
                </section>

                {/* address.houseNumber */}
                <section>
                    <input
                        placeholder="House Number"
                        type="number"
                        {...register("address.houseNumber", {
                            required: "This field is mandatory",
                            min: { value: 1, message: "Too small" },
                            max: { value: 10000, message: "Too big" },
                        })}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-red-500">
                            {errors.address?.houseNumber?.message}
                        </p>
                    )}
                </section>

                {/* address.country */}
                <section>
                    <input
                        placeholder="Country"
                        type="text"
                        {...register("address.country", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.country && (
                        <p className="text-red-500">{errors.address?.country?.message}</p>
                    )}
                </section>

                {/* address.zip */}
                <section>
                    <input
                        placeholder="Zip"
                        type="number"
                        {...register("address.zip", {
                            required: "This field is mandatory",
                            min: { value: 1, message: "Too small" },
                            max: { value: 9999999, message: "Too big" },
                        })}
                    />
                    {errors.address?.zip && (
                        <p className="text-red-500">{errors.address?.zip?.message}</p>
                    )}
                </section>

                {/* image.url */}
                <section>
                    <input
                        placeholder="Image URL"
                        type="url"
                        {...register("image.url", {
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

                {/* address.state */}
                <section>
                    <input
                        placeholder="State"
                        type="text"
                        {...register("address.state", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.state && (
                        <p className="text-red-500">{errors.address?.state?.message}</p>
                    )}
                </section>

                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUser;
