// src/components/LoginForm.jsx

import { useAuthStore } from "../store/authStore.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const LoginForm = ({
    onForgotPassword,
    onSwitchToRegister,
}) => {

    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    const loading = useAuthStore((state) => state.loading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const res = await login(data);

        if (res.success) {

            toast.success("Bienvenido de nuevo 🚀");

            navigate("/dashboard");

        } else {

            toast.error(res.error);

        }
    };

    return (
        <>
            <form
                className="
                    space-y-4
                    sm:space-y-5
                    md:space-y-6
                    w-full
                "
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* IDENTIFIER */}
                <div>

                    <label
                        htmlFor="identifier"
                        className="
                            block
                            text-xs
                            sm:text-sm
                            font-medium
                            text-[#677750]
                            mb-1.5
                        "
                    >
                        Email o usuario
                    </label>

                    <input
                        id="identifier"
                        type="text"
                        placeholder="tu@email.com o usuario"
                        {...register("identifier", {
                            required:
                                "El correo o usuario es obligatorio",
                        })}
                        className="
                            w-full
                            px-3
                            sm:px-4
                            py-2
                            sm:py-2.5
                            text-sm
                            sm:text-base
                            border
                            border-[#677750]
                            rounded-lg
                            bg-white
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#677750]
                            transition
                        "
                    />

                    {errors.identifier && (
                        <p
                            className="
                                text-red-500
                                text-[11px]
                                sm:text-xs
                                mt-1
                                break-words
                            "
                        >
                            {errors.identifier.message}
                        </p>
                    )}

                </div>

                {/* PASSWORD */}
                <div>

                    <label
                        htmlFor="password"
                        className="
                            block
                            text-xs
                            sm:text-sm
                            font-medium
                            text-[#677750]
                            mb-1.5
                        "
                    >
                        Contraseña
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required:
                                "La contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message:
                                    "La contraseña debe tener mínimo 8 caracteres",
                            },
                        })}
                        className="
                            w-full
                            px-3
                            sm:px-4
                            py-2
                            sm:py-2.5
                            text-sm
                            sm:text-base
                            border
                            border-[#677750]
                            rounded-lg
                            bg-white
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#677750]
                            transition
                        "
                    />

                    {errors.password && (
                        <p
                            className="
                                text-red-500
                                text-[11px]
                                sm:text-xs
                                mt-1
                                break-words
                            "
                        >
                            {errors.password.message}
                        </p>
                    )}

                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full
                        bg-[#677750]
                        hover:opacity-90
                        disabled:opacity-50
                        text-white
                        font-medium
                        py-2.5
                        sm:py-3
                        rounded-lg
                        shadow-sm
                        transition
                        text-sm
                        sm:text-base
                    "
                >
                    {loading
                        ? "Ingresando..."
                        : "Iniciar sesión"}
                </button>

            </form>

            <div
                className="
                    text-center
                    mt-5
                    sm:mt-6
                    flex
                    flex-col
                    gap-3
                    text-[#677750]
                    text-xs
                    sm:text-sm
                "
            >

                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="
                        hover:underline
                        font-medium
                        break-words
                    "
                >
                    ¿Olvidaste tu contraseña?
                </button>

                <span
                    className="
                        leading-relaxed
                        px-2
                    "
                >
                    ¿No tienes cuenta?{" "}

                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="
                            font-medium
                            underline
                            hover:opacity-80
                            break-words
                        "
                    >
                        Regístrate
                    </button>

                </span>

            </div>
        </>
    );
};