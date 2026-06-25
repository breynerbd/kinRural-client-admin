import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSaveTransaction } from "../hooks/useSaveTransaction";
import { useAccountStore } from "../../accounts/store/accountStore";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { useFormSubmit } from "../../../shared/hooks/useFormSubmit";

export const TransactionModal = ({ isOpen, onClose }) => {
  const { handleCreate } = useSaveTransaction();
  const { accounts, getAccounts } = useAccountStore();
  const [searchOrigen, setSearchOrigen] = useState("");
  const [searchDestino, setSearchDestino] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      tipo: "TRANSFERENCIA",
      cuenta_origen_id: "",
      cuenta_destino_id: "",
      monto: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      getAccounts();
    }
  }, [isOpen]);

  // Escuchar cambios en el formulario
  const tipoSeleccionado = watch("tipo");
  const cuentaOrigenSeleccionada = watch("cuenta_origen_id");

  // Cambio 2: Limpieza de los buscadores al cambiar de Tipo de Transacción
  useEffect(() => {
    setSearchOrigen("");
    setSearchDestino("");
  }, [tipoSeleccionado]);

  // Cambio 1: Filtro de Origen tolerante a campos vacíos
  const filteredOrigenAccounts = accounts.filter((account) => {
    const text = `
      ${account.tipo}
      ${account.user?.nombre}
      ${account.user?.apellido}
      ${account.numero_cuenta}
    `.toLowerCase();

    return text.includes(searchOrigen.toLowerCase());
  });

  // Cambio 1: Filtro de Destino tolerante a campos vacíos y lógica de exclusión corregida
  const filteredDestinoAccounts = accounts
    .filter((account) => {
      // Solo excluir si realmente estamos en una transferencia
      if (tipoSeleccionado === "TRANSFERENCIA" && cuentaOrigenSeleccionada) {
        return String(account.id) !== String(cuentaOrigenSeleccionada);
      }
      return true;
    })
    .filter((account) => {
      const text = `
        ${account.tipo}
        ${account.user?.nombre}
        ${account.user?.apellido}
        ${account.numero_cuenta}
      `.toLowerCase();

      return text.includes(searchDestino.toLowerCase());
    });

  const formatAccountNumber = (numero) => {
    return numero;
  };

  /* =========================
      SUBMIT LOGIC
  ========================= */
  const { handleSubmit: submitWithFeedback } = useFormSubmit();

  const onSubmit = (data) => {
    const titulos = {
      TRANSFERENCIA: "Confirmar Transferencia",
      DEPOSITO: "Confirmar Depósito",
      RETIRO: "Confirmar Retiro",
    };

    const mensajes = {
      TRANSFERENCIA:
        "¿Estás seguro de realizar esta transferencia?\n\nEl dinero será transferido inmediatamente.",
      DEPOSITO: "¿Estás seguro de realizar este depósito en efectivo?",
      RETIRO: "¿Estás seguro de realizar este retiro de efectivo?",
    };

    showConfirmToast({
      title: titulos[data.tipo] || "Confirmar Operación",
      message: mensajes[data.tipo] || "¿Estás seguro?",
      onConfirm: () =>
        submitWithFeedback({
          action: () => handleCreate(data),
          successMsg: "Operación realizada correctamente",
          errorMsg: "Error al procesar la transacción",
          reset,
          onClose,
        }),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex justify-center items-center px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg overflow-hidden max-h-[95vh] flex flex-col">
        {/* HEADER DINÁMICO */}
        <div className="p-4 sm:p-5 text-white bg-[#677750]">
          <h2 className="text-xl sm:text-2xl font-bold break-words">
            Nueva Transacción {tipoSeleccionado && `(${tipoSeleccionado})`}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 mt-1">
            Registra movimientos monetarios dentro del sistema
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >
          {/* SELECCIÓN DE TIPO */}
          <div className="flex flex-col">
            <label className="label">Tipo de Transacción</label>
            <select
              className="input"
              {...register("tipo", { required: "El tipo es obligatorio" })}
            >
              <option value="TRANSFERENCIA">TRANSFERENCIA</option>
              <option value="DEPOSITO">DEPÓSITO (Caja / Efectivo)</option>
              <option value="RETIRO">RETIRO (Caja / Efectivo)</option>
            </select>
          </div>

          {/* CUENTA ORIGEN (Oculto en DEPÓSITO) */}
          {tipoSeleccionado !== "DEPOSITO" && (
            <div className="flex flex-col">
              <label className="label">Cuenta origen</label>
              <input
                type="text"
                placeholder="Buscar cuenta..."
                className="input mb-2"
                value={searchOrigen}
                onChange={(e) => setSearchOrigen(e.target.value)}
              />

              <select
                className="input"
                {...register("cuenta_origen_id", {
                  required:
                    tipoSeleccionado !== "DEPOSITO"
                      ? "La cuenta origen es obligatoria"
                      : false,
                })}
              >
                <option value="">Selecciona una cuenta</option>
                {filteredOrigenAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.tipo} {" | "} {account.user?.nombre}{" "}
                    {account.user?.apellido} {" | "}{" "}
                    {formatAccountNumber(account.numero_cuenta)}
                  </option>
                ))}
              </select>

              {errors.cuenta_origen_id && (
                <p className="error">{errors.cuenta_origen_id.message}</p>
              )}
            </div>
          )}

          {/* CUENTA DESTINO (Oculto en RETIRO) */}
          {tipoSeleccionado !== "RETIRO" && (
            <div className="flex flex-col">
              <label className="label">Cuenta destino</label>
              <input
                type="text"
                placeholder="Buscar cuenta..."
                className="input mb-2"
                value={searchDestino}
                onChange={(e) => setSearchDestino(e.target.value)}
              />

              <select
                className="input"
                {...register("cuenta_destino_id", {
                  required:
                    tipoSeleccionado !== "RETIRO"
                      ? "La cuenta destino es obligatoria"
                      : false,
                  validate: (value, formValues) => {
                    if (
                      formValues.tipo === "TRANSFERENCIA" &&
                      value === formValues.cuenta_origen_id
                    ) {
                      return "La cuenta origen y destino no pueden ser iguales";
                    }
                    return true;
                  },
                })}
              >
                <option value="">Selecciona una cuenta</option>
                {filteredDestinoAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.tipo} {" | "} {account.user?.nombre}{" "}
                    {account.user?.apellido} {" | "}{" "}
                    {formatAccountNumber(account.numero_cuenta)}
                  </option>
                ))}
              </select>

              {errors.cuenta_destino_id && (
                <p className="error">{errors.cuenta_destino_id.message}</p>
              )}
            </div>
          )}

          {/* MONTO */}
          <div className="flex flex-col">
            <label className="label">Monto</label>
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
            {errors.monto && <p className="error">{errors.monto.message}</p>}
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
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm sm:text-base"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#677750] text-white disabled:opacity-50 text-sm sm:text-base"
            >
              {isSubmitting ? "Procesando..." : "Ejecutar Operación"}
            </button>
          </div>
        </form>
      </div>

      {/* ESTILOS EMBEDIDOS */}
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
