export const ForgotPasswordForm = ({ onSwitch }) => {
    return (
        <form
            className="
                space-y-4
                sm:space-y-5
                md:space-y-6
                w-full
            "
        >

            {/* Campo email */}
            <div>
                <label
                    className="
                        block
                        text-xs
                        sm:text-sm
                        font-medium
                        text-[#677750]
                        mb-1.5
                    "
                >
                    Email
                </label>

                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
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
                        focus:border-[#677750]
                        transition
                    "
                />
            </div>

            {/* Botón */}
            <button
                type="submit"
                className="
                    w-full
                    bg-[#677750]
                    text-white
                    py-2.5
                    sm:py-3
                    px-4
                    rounded-lg
                    text-sm
                    sm:text-base
                    font-medium
                    shadow-sm
                    hover:opacity-90
                    active:scale-[0.99]
                    transition
                "
            >
                Enviar correo
            </button>

            {/* Texto + acción */}
            <p
                className="
                    text-center
                    text-xs
                    sm:text-sm
                    text-[#677750]
                    leading-relaxed
                    px-2
                "
            >
                ¿Recordaste tu contraseña?{" "}

                <button
                    type="button"
                    onClick={onSwitch}
                    className="
                        font-medium
                        underline
                        hover:opacity-80
                        transition
                        break-words
                    "
                >
                    Iniciar sesión
                </button>
            </p>

        </form>
    );
};