// src/components/LoginForm.jsx
const LoginForm = ({ onForgotPassword, onSwitchToRegister }) => {
    return (
        <>
            <form className="space-y-6">
                {/* Email/usuario */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#677750] mb-2"
                    >
                        Email o usuario
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-[#677750] mb-2"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                    />
                </div>

                {/* Botón login */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#677750] to-[#88a06a] hover:from-[#4d5b3c] hover:to-[#6c7b52] text-white font-semibold py-3 rounded-xl shadow-md transform hover:scale-105 transition duration-300"
                >
                    Iniciar sesión
                </button>
            </form>

            <p className="text-center text-sm mt-5 flex flex-col gap-3 text-[#677750]">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-[#88a06a] hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>

                <span>
                    ¿No tienes cuenta?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-[#88a06a] hover:underline font-semibold"
                    >
                        Regístrate
                    </button>
                </span>
            </p>
        </>
    );
};

export default LoginForm;