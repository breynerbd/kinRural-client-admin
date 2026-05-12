import { useForm } from "react-hook-form";
import { useSaveRole } from "../hooks/useSaveRole";
import { useFormSubmit } from "../../../shared/hooks/useFormSubmit";

export const RoleModal = ({ isOpen, onClose }) => {

  const { saveRole } = useSaveRole();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: "",
    },
  });

const { handleSubmit: submitWithFeedback } = useFormSubmit();

const onSubmit = (data) =>
  submitWithFeedback({
    action: () => saveRole(data),
    successMsg: "Rol creado",
    errorMsg: "Error al guardar rol",
    reset,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        flex justify-center items-center
        px-3 sm:px-4
        py-4
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          max-w-md
          max-h-[90vh]
          overflow-hidden
          flex flex-col
        "
      >

        {/* HEADER */}
        <div
          className="
            p-4 sm:p-5 md:p-6
            text-white
            bg-[#677750]
          "
        >
          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
              break-words
            "
          >
            Nuevo Rol
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              opacity-80
              mt-1
            "
          >
            Crea un nuevo rol en el sistema
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            p-4
            sm:p-6
            overflow-y-auto
            space-y-5
          "
        >

          <div className="flex flex-col">

            <label
              className="
                text-sm
                font-semibold
                text-[#677750]
                mb-1
              "
            >
              Nombre del rol
            </label>

            <input
              type="text"
              placeholder="Ej. ADMIN"
              className="
                input
                text-sm
                sm:text-base
              "
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
              })}
            />

            {errors.nombre && (
              <span
                className="
                  text-red-500
                  text-xs
                  mt-1
                  break-words
                "
              >
                {errors.nombre.message}
              </span>
            )}

          </div>

          {/* BOTONES */}
          <div
            className="
              flex flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
              pt-4
              border-t border-[#677750]/10
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                sm:w-auto
                px-4 py-2
                rounded-lg
                bg-gray-100
                text-gray-600
                hover:bg-gray-200
                transition
                text-sm
                sm:text-base
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                sm:w-auto
                px-5 py-2
                rounded-lg
                text-white
                font-medium
                bg-[#677750]
                hover:opacity-90
                transition
                shadow
                text-sm
                sm:text-base
              "
            >
              {isSubmitting ? "Creando..." : "Crear rol"}
            </button>

          </div>
        </form>
      </div>

      {/* ESTILO BASE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 10px;
            border: 2px solid #e5e7eb;
            background: #f9fafb;
            transition: all 0.2s;
          }

          .input:focus {
            outline: none;
            border-color: #677750;
            box-shadow: 0 0 0 2px rgba(103, 119, 80, 0.2);
          }

          @media (max-width: 640px) {
            .input {
              padding: 12px;
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};