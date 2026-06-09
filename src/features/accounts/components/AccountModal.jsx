import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveAccount } from "../hooks/useSaveAccount";
import { useUsersStore } from "../../users/store/userStore";
import { useAccountStore } from "../store/accountStore";
import { useFormSubmit } from "../../../shared/hooks/useFormSubmit";

export const AccountModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveAccount } = useSaveAccount();

  const { users, getUsers } = useUsersStore();

  const loading = useAccountStore((state) => state.loading);

  useEffect(() => {
    getUsers(1);
  }, [getUsers]);

  useEffect(() => {
    if (isOpen) {
      reset({
        tipo: "",
        saldo: "",
        user_id: "",
      });
    }
  }, [isOpen, reset]);

  const { handleSubmit: submitWithFeedback } = useFormSubmit();

  const onSubmit = (data) =>
    submitWithFeedback({
      action: () => saveAccount(data),
      successMsg: "Cuenta creada correctamente",
      errorMsg: "Error al guardar cuenta",
      reset,
      onClose,
    });

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[70]
        bg-black/40 backdrop-blur-sm
        flex justify-center items-center
        p-2 sm:p-4
      "
    >
      <div
        className="
          bg-white
          rounded-xl sm:rounded-2xl
          shadow-2xl
          w-full
          max-w-[95vw]
          sm:max-w-xl
          lg:max-w-2xl
          max-h-[95vh]
          flex flex-col
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div
          className="
            px-4 py-4
            sm:px-5 sm:py-5
            lg:px-6 lg:py-6
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
            Nueva Cuenta
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              opacity-80
              mt-1
            "
          >
            Completa la información de la cuenta
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
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            {/* TIPO */}
            <div className="flex flex-col min-w-0">
              <label className="label">Tipo de cuenta</label>

              <select
                className="input"
                {...register("tipo", {
                  required: "El tipo de cuenta es obligatorio",
                })}
              >
                <option value="">Seleccione tipo</option>

                <option value="AHORRO">AHORRO</option>

                <option value="MONETARIA">MONETARIA</option>
              </select>

              {errors.tipo && <p className="error">{errors.tipo.message}</p>}
            </div>

            {/* SALDO */}
            <div className="flex flex-col min-w-0">
              <label className="label">Saldo inicial</label>

              <input
                type="number"
                step="0.01"
                className="input"
                placeholder="Q1500"
                {...register("saldo", {
                  required: "El saldo es obligatorio",
                  min: {
                    value: 1,
                    message: "El saldo debe ser mayor a Q0",
                  },
                })}
              />

              {errors.saldo && <p className="error">{errors.saldo.message}</p>}
            </div>

            {/* USER */}
            <div
              className="
                flex flex-col
                md:col-span-2
                min-w-0
              "
            >
              <label className="label">Usuario</label>

              <select
                className="input"
                {...register("user_id", {
                  required: "El usuario es obligatorio",
                })}
              >
                <option value="">Seleccione usuario</option>

                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nombre} {user.apellido}
                  </option>
                ))}
              </select>

              {errors.user_id && (
                <p className="error">{errors.user_id.message}</p>
              )}
            </div>
          </div>

          {/* BOTONES */}
          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
              pt-4
              border-t
              border-[#677750]/10
            "
          >
            <button
              type="button"
              onClick={() => {
                reset();

                onClose();
              }}
              className="
                w-full
                sm:w-auto
                px-4 py-2.5
                rounded-lg
                bg-gray-100
                text-gray-600
                text-sm
                sm:text-base
                hover:bg-gray-200
                transition
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:w-auto
                px-5 py-2.5
                rounded-lg
                text-white
                text-sm
                sm:text-base
                font-medium
                bg-[#677750]
                hover:opacity-90
                transition
                shadow
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Guardando..." : "Crear cuenta"}
            </button>
          </div>
        </form>
      </div>

      {/* ESTILOS */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 10px;
            border: 2px solid #e5e7eb;
            background: #f9fafb;
            transition: all 0.2s;
            font-size: 14px;
            min-width: 0;
          }

          .input:focus {
            outline: none;
            border-color: #677750;
            box-shadow: 0 0 0 2px rgba(103, 119, 80, 0.2);
          }

          .label {
            font-size: 13px;
            font-weight: 600;
            color: #677750;
            margin-bottom: 6px;
            word-break: break-word;
          }

          .error {
            color: #dc2626;
            font-size: 12px;
            margin-top: 4px;
            word-break: break-word;
          }

          @media (min-width: 640px) {

            .input {
              font-size: 15px;
              padding: 11px 14px;
            }

            .label {
              font-size: 14px;
            }

            .error {
              font-size: 13px;
            }

          }

          @media (min-width: 1024px) {

            .input {
              font-size: 16px;
            }

          }
        `}
      </style>
    </div>
  );
};
