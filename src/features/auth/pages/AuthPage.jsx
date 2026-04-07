// src/pages/AuthPage.jsx
import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";

const AuthPage = () => {
    const [view, setView] = useState("login"); // "login", "register", "forgot"

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#fffaf2] px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#677750] p-8 md:p-10 animate-fade-in">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img
                        src="/src/assets/img/kinrural_logo.png"
                        alt="Kinrural"
                        className="h-32 w-auto"
                    />
                </div>

                {/* Título y descripción */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#677750] mb-2">
                        {view === "forgot"
                            ? "Recuperar contraseña"
                            : view === "login"
                                ? "Bienvenido de nuevo"
                                : "Crear una cuenta"}
                    </h1>

                    <p className="text-[#677750] text-sm max-w-xs mx-auto">
                        {view === "forgot"
                            ? "Ingresa tu correo electrónico para restablecer tu contraseña"
                            : view === "login"
                                ? "Ingresa a tu cuenta de administrador de Kinrural"
                                : "Regístrate como administrador de Kinrural"}
                    </p>
                </div>

                {/* Formularios */}
                {view === "login" && (
                    <LoginForm
                        onForgotPassword={() => setView("forgot")}
                        onSwitchToRegister={() => setView("register")}
                    />
                )}

                {view === "forgot" && (
                    <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="forgot-email"
                                className="block text-sm font-semibold text-[#677750] mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="forgot-email"
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#677750] to-[#88a06a] hover:from-[#4d5b3c] hover:to-[#6c7b52] text-white font-semibold py-3 rounded-xl shadow-md transform hover:scale-105 transition duration-300"
                        >
                            Enviar enlace de recuperación
                        </button>

                        <button
                            type="button"
                            onClick={() => setView("login")}
                            className="w-full mt-2 text-[#88a06a] hover:underline text-sm font-medium"
                        >
                            Volver al login
                        </button>
                    </form>
                )}

                {view === "register" && (
                    <form className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Apellido */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Apellido
                            </label>
                            <input
                                type="text"
                                placeholder="Tu apellido"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* DPI */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                DPI
                            </label>
                            <input
                                type="text"
                                placeholder="Número de DPI"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Correo */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Correo
                            </label>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                placeholder="Tu teléfono"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Dirección */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Dirección
                            </label>
                            <input
                                type="text"
                                placeholder="Tu dirección"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Ingresos mensuales */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Ingresos mensuales
                            </label>
                            <input
                                type="number"
                                placeholder="Q0.00"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Role ID */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Role ID
                            </label>
                            <input
                                type="number"
                                placeholder="ID del rol"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-semibold text-[#677750] mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 text-sm border border-[#677750] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677750] transition duration-200"
                            />
                        </div>

                        {/* Botón Crear cuenta */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#677750] to-[#88a06a] hover:from-[#4d5b3c] hover:to-[#6c7b52] text-white font-semibold py-3 rounded-xl shadow-md transform hover:scale-105 transition duration-300"
                        >
                            Crear cuenta
                        </button>

                        <button
                            type="button"
                            onClick={() => setView("login")}
                            className="w-full mt-2 text-[#88a06a] hover:underline text-sm font-medium"
                        >
                            Volver al login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;