import { useState } from "react";
import { useSaveCard } from "../hooks/useSaveCard";

export const CardModal = ({
  isOpen,
  onClose,
  card,
}) => {

  const [loading, setLoading] =
    useState(false);

  const {
    handleAction,
    handleActivate,
    handleBlock,
  } = useSaveCard();

  if (!isOpen || !card) return null;

  /* =========================
     ACTIONS
  ========================= */

  const onApprove = async () => {

    setLoading(true);

    const ok = await handleAction(
      card.id,
      "APROBADA"
    );

    setLoading(false);

    if (ok) onClose();

  };

  const onReject = async () => {

    setLoading(true);

    const ok = await handleAction(
      card.id,
      "RECHAZADA"
    );

    setLoading(false);

    if (ok) onClose();

  };

  const onActivateCard = async () => {

    setLoading(true);

    const ok = await handleActivate(
      card.id
    );

    setLoading(false);

    if (ok) onClose();

  };

  const onBlockCard = async () => {

    setLoading(true);

    const ok = await handleBlock(
      card.id
    );

    setLoading(false);

    if (ok) onClose();

  };

  /* =========================
     HELPERS
  ========================= */

  const getStatusStyles = (status) => {

    switch (status) {

      case "PENDIENTE":
        return "bg-yellow-100 text-yellow-700";

      case "APROBADA":
      case "ACTIVA":
        return "bg-green-100 text-green-700";

      case "BLOQUEADA":
        return "bg-gray-200 text-gray-700";

      case "RECHAZADA":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  return (
    <div
      className="
        fixed inset-0 z-50
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
          sm:max-w-2xl
          overflow-hidden
          max-h-[95vh]
          flex flex-col
        "
      >

        {/* HEADER */}

        <div
          className="
            bg-[#677750]
            text-white
            px-4 py-4
            sm:px-5 sm:py-5
            lg:px-6 lg:py-6
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
            Detalle de Tarjeta
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              opacity-80
              mt-1
            "
          >
            Gestiona la tarjeta seleccionada
          </p>

        </div>

        {/* CONTENT */}

        <div
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

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                "
              >
                Número
              </p>

              <p
                className="
                  font-medium
                  text-[#677750]
                  text-sm
                  sm:text-base
                  break-words
                "
              >
                {card.numero_tarjeta}
              </p>

            </div>

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                "
              >
                Tipo
              </p>

              <p
                className="
                  font-medium
                  text-[#677750]
                  text-sm
                  sm:text-base
                  break-words
                "
              >
                {card.tipo}
              </p>

            </div>

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                "
              >
                Expiración
              </p>

              <p
                className="
                  font-medium
                  text-[#677750]
                  text-sm
                  sm:text-base
                "
              >
                {card.fecha_expiracion}
              </p>

            </div>

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                "
              >
                Número de Cuenta
              </p>

              <p
                className="
                  font-medium
                  text-[#677750]
                  text-sm
                  sm:text-base
                  break-words
                "
              >
                {card.account_id}
              </p>

            </div>

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                  mb-1
                "
              >
                Estado
              </p>

              <span
                className={`
                  inline-flex
                  items-center
                  px-2 py-1
                  rounded-full
                  text-xs
                  font-medium
                  ${getStatusStyles(card.estado)}
                `}
              >
                {card.estado}
              </span>

            </div>

          </div>

          {
            card.tipo === "CREDITO" && (
              <div
                className="
                  border-t
                  border-[#677750]/10
                  pt-4
                "
              >

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-500
                  "
                >
                  Límite de crédito
                </p>

                <p
                  className="
                    font-semibold
                    text-green-600
                    text-lg
                    sm:text-xl
                    break-words
                  "
                >
                  Q{card.limite_credito || 0}
                </p>

              </div>
            )
          }

          {/* ACTIONS */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:flex-wrap
              sm:justify-end
              gap-3
              pt-4
              border-t
              border-[#677750]/10
            "
          >

            <button
              onClick={onClose}
              className="
                w-full
                sm:w-auto
                px-4 py-2.5
                rounded-lg
                bg-gray-100
                text-gray-700
                text-sm
                sm:text-base
                hover:bg-gray-200
                transition
              "
            >
              Cerrar
            </button>

            <button
              onClick={onReject}
              disabled={
                loading ||
                card.estado !== "PENDIENTE"
              }
              className="
                w-full
                sm:w-auto
                px-5 py-2.5
                rounded-lg
                bg-red-600
                text-white
                text-sm
                sm:text-base
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {
                loading
                  ? "Procesando..."
                  : "Rechazar"
              }
            </button>

            <button
              onClick={onApprove}
              disabled={
                loading ||
                card.estado !== "PENDIENTE"
              }
              className="
                w-full
                sm:w-auto
                px-5 py-2.5
                rounded-lg
                bg-green-600
                text-white
                text-sm
                sm:text-base
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {
                loading
                  ? "Procesando..."
                  : "Aprobar"
              }
            </button>

            <button
              onClick={onActivateCard}
              disabled={
                loading ||
                card.estado !== "APROBADA"
              }
              className="
                w-full
                sm:w-auto
                px-5 py-2.5
                rounded-lg
                bg-blue-600
                text-white
                text-sm
                sm:text-base
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {
                loading
                  ? "Procesando..."
                  : "Activar"
              }
            </button>

            <button
              onClick={onBlockCard}
              disabled={
                loading ||
                card.estado !== "ACTIVA"
              }
              className="
                w-full
                sm:w-auto
                px-5 py-2.5
                rounded-lg
                bg-gray-700
                text-white
                text-sm
                sm:text-base
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {
                loading
                  ? "Procesando..."
                  : "Bloquear"
              }
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};