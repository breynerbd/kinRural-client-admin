// src/components/LoginForm.jsx
const LoginForm = ({ onForgotPassword, onSwitchToRegister }) => {
    return (
        <>
            <form className="space-y-6">

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

export default LoginForm;