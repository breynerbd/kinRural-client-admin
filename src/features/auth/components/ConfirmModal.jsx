import { toast } from "react-hot-toast";
import { React } from "react";

export function showConfirmToast({ title, message, onConfirm }) {

    toast.custom((t) => (
        <div
            className="
                bg-white
                p-4 sm:p-5 md:p-6
                rounded-xl
                w-[90vw]
                max-w-sm
                sm:max-w-md
                text-center
                shadow-lg
                border
                border-gray-200
            "
        >
            <h2
                className="
                    text-lg
                    sm:text-xl
                    font-bold
                    mb-2
                    break-words
                "
            >
                {title}
            </h2>

            <p
                className="
                    mb-4
                    text-sm
                    sm:text-base
                    break-words
                "
            >
                {message}
            </p>

            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    justify-center
                    gap-3
                    sm:gap-4
                    mt-4
                "
            >

                <button
                    className="
                        w-full
                        sm:w-auto
                        px-5
                        py-2
                        rounded-lg
                        bg-gray-200
                        text-gray-700
                        font-medium
                        hover:bg-gray-300
                        transition
                    "
                    onClick={() => toast.dismiss(t.id)}
                >
                    Cancelar
                </button>

                <button
                    onClick={() => {
                        onConfirm?.();
                        toast.dismiss(t.id);
                    }}
                    className="
                        w-full
                        sm:w-auto
                        px-5
                        py-2
                        rounded-lg
                        bg-red-600
                        text-white
                        font-medium
                        hover:bg-red-700
                        transition
                    "
                >
                    Confirmar
                </button>

            </div>
        </div>
    ));

}