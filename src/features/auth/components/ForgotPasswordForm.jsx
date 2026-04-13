export const ForgotPasswordForm = ({ onSwitch }) => {
    return (
        <form className="space-y-6">

            {/* Campo email */}
            <div>
                <label className="block text-sm font-medium text-[#677750] mb-1.5">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="
                        w-full px-3 py-2 text-sm
                        border border-[#677750]
                        rounded-lg bg-white
                        shadow-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-[#677750]
                        focus:border-[#677750]
                        transition
                    "
                />
            </div>

            {/* Botón */}
            <button
                type="submit"
                className="
                    w-full bg-[#677750]
                    text-white py-2.5 px-4
                    rounded-lg text-sm font-medium
                    shadow-sm
                    hover:opacity-90 active:scale-[0.99]
                    transition
                "
            >
                Enviar correo
            </button>

            {/* Texto + acción */}
            <p className="text-center text-sm text-[#677750]">
                ¿Recordaste tu contraseña?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="
                        font-medium
                        underline
                        hover:opacity-80
                        transition
                    "
                >
                    Iniciar sesión
                </button>
            </p>

        </form>
    );
};