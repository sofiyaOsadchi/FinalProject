import { useForm } from "react-hook-form";
import { IUser } from "../@Types/types";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import dialogs from "../ui/dialogs";
import patterns from "../validations/patterns";
import './Login.scss';  

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>();

    const { register: registerUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);


    const onRegister = (data: IUser) => {
        console.log(data)
        registerUser(data).then(() => {
            dialogs.success("Success", "Register").then(() => {
                navigate("/login");
            });
        })
            .catch((e) => {
                dialogs.error("Register Error", e.response.data.message);
            })
    };

 

    return (
        <div className="create-card-container">
            <h2 className="text-slate-600">Register</h2>
            <form noValidate onSubmit={handleSubmit(onRegister)}>
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
                    {errors.name?.last && (
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

                {/* password */}
                <section>
                    <div className="password-container">
                        <input
                            placeholder="Password"
                            type={showPassword ? `text` : `password`}
                            {...register("password", {
                                required: "This field is mandatory",
                                pattern: {
                                    value: patterns.password,
                                    message:
                                        "Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setShowPassword((s) => !s);
                            }}
                        >
                            {showPassword ? <BsEyeSlashFill /> : <BsEye />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500">{errors.password?.message}</p>
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
                            min: { value: 2, message: "Too small" },
                            max: { value: 256, message: "Too big" },
                        })}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-red-500">
                            {errors.address?.houseNumber?.message}
                        </p>
                    )}
                </section>

                {/* address.zip */}
                <section>
                    <input
                        placeholder="Zip"
                        type="number"
                        {...register("address.zip", {
                            required: "This field is mandatory",
                            min: { value: 2, message: "Too small" },
                            max: { value: 256, message: "Too big" },
                        })}
                    />
                    {errors.address?.zip && (
                        <p className="text-red-500">{errors.address?.zip?.message}</p>
                    )}
                </section>

                <button type="submit" className=" bg-slate-600 text-white dark:bg-slate-900">Register</button>
            </form>
        </div>
    );
};

export default Register;