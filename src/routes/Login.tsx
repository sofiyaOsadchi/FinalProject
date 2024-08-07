import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import dialogs from "../ui/dialogs";
import { ILogin } from "../@Types/types";
import patterns from "../validations/patterns";
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const onLogin = (data: ILogin) => {
        login(data.email, data.password)
            .then(() => {
                dialogs.success("Login", "Logged in").then(() => {
                    // send the user to home page
                    navigate("/");
                });
            })
            .catch((e) => {
                console.error("Login error:", e);
                dialogs.error("Login Error", e.response.data.message);
            });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>();

    return (
        <div className="create-card-container text-white dark:bg-slate-600">
            <form noValidate onSubmit={handleSubmit(onLogin)}>
                {/* email */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Email"
                        autoCapitalize="true"
                        autoCorrect="false"
                        autoComplete="email"
                        type="email"
                        {...register("email", {
                            required: "This field is mandatory",
                            pattern: patterns.email,
                        })}
                    />
                    {errors.email && <p>{errors.email?.message}</p>}
                </section>



                {/* password */}
                <section>
                    <input
                        className="create-card-input"
                        autoComplete="current-password"
                        placeholder="Password"
                        type="password"
                        {...register("password", {
                            required: "This field is mandatory",
                            pattern: patterns.password,
                        })}
                    />
                    {errors.password && <p>{errors.password?.message}</p>}
                </section>

                <button type="submit" className="submit-button bg-slate-600 dark:bg-slate-900 ">Login</button>

                <div className="relative flex items-center mt-8">
                    <div className="border h-0 w-2/4 border-stone-500"></div>
                    <div className="text-stone-500 px-4 text-sm font-normal">OR</div>
                    <div className="border h-0 w-2/4 border-stone-500"></div>
                </div>
                <Link to="/register" type="submit"
                    className="border border-indigo-900 rounded-lg text-center text-indigo-900 bg-white text-base font-semibold w-full py-3 mt-9">
                    Signup now
                </Link>
            </form>
        </div>
    );
};

export default Login;