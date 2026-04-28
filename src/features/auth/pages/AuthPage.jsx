// src/pages/AuthPage.jsx
import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm.jsx";

const AuthPage = () => {
    const [view, setView] = useState("login"); // "login", "forgot"

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
                        {view === "login"
                            ? "Bienvenido de nuevo"
                            : "Recuperar contraseña"}
                    </h1>

                    <p className="text-[#677750] text-sm max-w-xs mx-auto">
                        {view === "login"
                            ? "Ingresa a tu cuenta de administrador de Kinrural"
                            : "Ingresa tu correo para recuperar tu contraseña"}
                    </p>
                </div>

                {/* LOGIN */}
                {view === "login" && (
                    <LoginForm
                        onForgotPassword={() => setView("forgot")}
                    />
                )}

                {/* FORGOT PASSWORD */}
                {view === "forgot" && (
                    <ForgotPasswordForm
                        onSwitch={() => setView("login")}
                    />
                )}

            </div>
        </div>
    );
};

export default AuthPage;