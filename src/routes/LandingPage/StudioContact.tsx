import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IMessage } from "../../@Types/types";
import { sendMessage } from "../../services/message-service";
import dialogs from "../../ui/dialogs";
import patterns from "../../validations/patterns";


const StudioContact = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IMessage>({
        defaultValues: { fullName: "", email: "", message: "" },
        mode: "onChange",
    });

    const onSend = (data: IMessage) => {
        console.log("Send data:", data);
        sendMessage(data)
            .then(() => {
                dialogs.success("Message Sent", "Your message has been sent successfully.");
                navigate("/");
            })
            .catch((error) => {
                dialogs.error("Message Error", error.response.data);
            });
    };

    return (
        <div className="contact-container">
            <form
                noValidate
                onSubmit={handleSubmit(onSend)}
                className="contact-form"
            >
                <h2 className="contact-title">Get in Touch</h2>

                {/* Full Name */}
                <section>
                    <input
                        placeholder="Full Name"
                        type="text"
                        className="contact-input"
                        {...register("fullName", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.fullName && (
                        <p className="errorMessage">{errors.fullName?.message}</p>
                    )}
                </section>

                {/* Email */}
                <section>
                    <input
                        placeholder="Email"
                        type="email"
                        className="contact-input"
                        {...register("email", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.email,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="errorMessage">{errors.email?.message}</p>
                    )}
                </section>

                {/* Phone */}
                <section>
                    <input
                        placeholder="Phone"
                        type="tel"
                        className="contact-input"
                        {...register("phone", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.phone,
                                message: "Invalid phone number",
                            },
                        })}
                    />
                    {errors.phone && (
                        <p className="errorMessage">{errors.phone?.message}</p>
                    )}
                </section>

                {/* Message */}
                <section>
                    <textarea
                        placeholder="Message"
                        className="contact-input"
                        rows={1}

                        {...register("message", {
                            required: "This field is mandatory",
                            minLength: { value: 5, message: "Too short" },
                            maxLength: { value: 500, message: "Too long" },
                        })}
                    />
                    {errors.message && (
                        <p className="errorMessage">{errors.message?.message}</p>
                    )}
                </section>

                <button

                    type="submit"
                    className="contact-button"
                >
                    Start Your Project
                </button>
            </form>
        </div>
    );
};

export default StudioContact;