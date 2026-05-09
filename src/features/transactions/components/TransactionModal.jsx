// src/features/transactions/components/TransactionModal.jsx

import { useForm } from "react-hook-form";

import { useSaveTransaction } from "../hooks/useSaveTransaction";

export const TransactionModal = ({
  isOpen,
  onClose,
}) => {

  const { handleCreate } = useSaveTransaction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      cuenta_origen_id: "",
      cuenta_destino_id: "",
      monto: "",
    },
  });

  if (!isOpen) return null;

  /* =========================
     SUBMIT
  ========================= */

  const onSubmit = async (data) => {
    try {

      const ok = await handleCreate(data);

      if (!ok) return;

      reset();

      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg overflow-hidden max-h-[95vh] flex flex-col">

        {/* HEADER */}

        <div className="p-4 sm:p-5 text-white bg-[#677750]">

          <h2 className="text-xl sm:text-2xl font-bold break-words">
            Nueva Transferencia
          </h2>

          <p className="text-xs sm:text-sm opacity-80 mt-1">
            Realiza una transferencia entre cuentas
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >

          {/* CUENTA ORIGEN */}

          <div className="flex flex-col">

            <label className="label">
              Cuenta origen
            </label>

            <input
              type="number"
              placeholder="Ej: 1"
              className="input"
              {...register("cuenta_origen_id", {
                required: "La cuenta origen es obligatoria",
                min: {
                  value: 1,
                  message: "Debe ser un ID válido",
                },
              })}
            />

            {errors.cuenta_origen_id && (
              <p className="error">
                {errors.cuenta_origen_id.message}
              </p>
            )}

          </div>

          {/* CUENTA DESTINO */}

          <div className="flex flex-col">

            <label className="label">
              Cuenta destino
            </label>

            <input
              type="number"
              placeholder="Ej: 2"
              className="input"
              {...register("cuenta_destino_id", {
                required: "La cuenta destino es obligatoria",
                min: {
                  value: 1,
                  message: "Debe ser un ID válido",
                },
                validate: (value, formValues) =>
                  value !== formValues.cuenta_origen_id ||
                  "La cuenta origen y destino no pueden ser iguales",
              })}
            />

            {errors.cuenta_destino_id && (
              <p className="error">
                {errors.cuenta_destino_id.message}
              </p>
            )}

          </div>

          {/* MONTO */}

          <div className="flex flex-col">

            <label className="label">
              Monto
            </label>

            <input
              type="number"
              step="0.01"
              placeholder="Q100"
              className="input"
              {...register("monto", {
                required: "El monto es obligatorio",
                min: {
                  value: 1,
                  message: "El monto mínimo es Q1",
                },
              })}
            />

            {errors.monto && (
              <p className="error">
                {errors.monto.message}
              </p>
            )}

          </div>

          {/* ACTIONS */}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#677750]/10">

            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              disabled={isSubmitting}
              className="
                w-full sm:w-auto
                px-4 py-2
                rounded-lg
                bg-gray-100
                text-gray-700
                hover:bg-gray-200
                transition
                text-sm sm:text-base
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full sm:w-auto
                px-5 py-2
                rounded-lg
                bg-[#677750]
                text-white
                disabled:opacity-50
                text-sm sm:text-base
              "
            >
              {isSubmitting
                ? "Procesando..."
                : "Transferir"}
            </button>

          </div>

        </form>

      </div>

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
          }

          @media (min-width: 640px) {
            .input {
              font-size: 15px;
            }
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
          }

          @media (min-width: 640px) {
            .label {
              font-size: 14px;
            }
          }

          .error {
            color: #dc2626;
            font-size: 12px;
            margin-top: 4px;
            word-break: break-word;
          }
        `}
      </style>

    </div>
  );
};