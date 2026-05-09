// src/pages/AuthPage.jsx
import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm.jsx";

const AuthPage = () => {
    const [view, setView] = useState("login");

    return (
        <div
            className="
                flex
                items-center
                justify-center
                min-h-screen
                bg-[#fffaf2]
                px-3
                sm:px-4
                md:px-6
                py-6
                sm:py-8
            "
        >
            <div
                className="
                    w-full
                    max-w-sm
                    sm:max-w-md
                    md:max-w-lg
                    bg-white
                    rounded-xl
                    sm:rounded-2xl
                    shadow-2xl
                    border
                    border-[#677750]
                    p-5
                    sm:p-8
                    md:p-10
                    animate-fade-in
                "
            >

                {/* Logo */}
                <div
                    className="
                        flex
                        justify-center
                        mb-6
                        sm:mb-8
                    "
                >
                    <img
                        src="/src/assets/img/kinrural_logo.png"
                        alt="Kinrural"
                        className="
                            h-20
                            sm:h-24
                            md:h-32
                            w-auto
                            object-contain
                        "
                    />
                </div>

                {/* Título y descripción */}
                <div
                    className="
                        text-center
                        mb-6
                        sm:mb-8
                    "
                >
                    <h1
                        className="
                            text-2xl
                            sm:text-3xl
                            md:text-4xl
                            font-bold
                            text-[#677750]
                            mb-2
                            leading-tight
                        "
                    >
                        {view === "login"
                            ? "Bienvenido de nuevo"
                            : "Recuperar contraseña"}
                    </h1>

                    <p
                        className="
                            text-[#677750]
                            text-xs
                            sm:text-sm
                            md:text-base
                            max-w-xs
                            sm:max-w-sm
                            mx-auto
                            leading-relaxed
                            px-2
                        "
                    >
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