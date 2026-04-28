// src/components/LoginForm.jsx
import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

export const LoginForm = ({ onForgotPassword, onSwitchToRegister }) => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSumnit = async (data) => {
        const res = await login(data);
        if (res) {
            navigate("/dashboard");
            toast.success("Bienvenido de nuevo 🚀");
        } else {
            toast.error(res.error);
        }
    };

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(onSumnit)}>

                {/* Email/usuario */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#677750] mb-1.5"
                    >
                        Email o usuario
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="tu@email.com"
                        {...register("email", { required: true })}
                        className="w-full px-3 py-2 text-sm border border-[#677750] rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition"
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-[#677750] mb-1.5"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", { required: true, minLength: 8 })}
                        className="w-full px-3 py-2 text-sm border border-[#677750] rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition"
                    />
                </div>

                {/* Botón login */}
                <button
                    type="submit"
                    className="w-full bg-[#677750] hover:opacity-90 text-white font-medium py-2.5 rounded-lg shadow-sm transition"
                >
                    Iniciar sesión
                </button>
            </form>

            <p className="text-center text-sm mt-5 flex flex-col gap-3 text-[#677750]">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="hover:underline font-medium"
                >
                    ¿Olvidaste tu contraseña?
                </button>

                <span>
                    ¿No tienes cuenta?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="font-medium underline hover:opacity-80"
                    >
                        Regístrate
                    </button>
                </span>
            </p>
        </>
    );
};
