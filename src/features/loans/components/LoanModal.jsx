import { useState } from "react";

export const LoanModal = ({
  isOpen,
  onClose,
  loan,
  onApprove,
  onReject,
  onPay,
}) => {

  const [loading, setLoading] =
    useState(false);

  if (!isOpen || !loan) return null;

  const handleApprove = async () => {

    try {

      setLoading(true);

      await onApprove(loan.id);

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleReject = async () => {

    try {

      setLoading(true);

      await onReject(loan.id);

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handlePay = async (installmentId) => {

    try {

      setLoading(true);

      await onPay(installmentId);

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const getStatusConfig = (status) => {

    switch (status) {

      case "PENDING":
        return {
          label: "PENDIENTE",
          className:
            "bg-yellow-100 text-yellow-700",
        };

      case "ACTIVE":
        return {
          label: "ACTIVO",
          className:
            "bg-green-100 text-green-700",
        };

      case "DELINQUENT":
        return {
          label: "MOROSO",
          className:
            "bg-red-100 text-red-700",
        };

      case "CLOSED":
        return {
          label: "CERRADO",
          className:
            "bg-gray-200 text-gray-700",
        };

      case "REJECTED":
        return {
          label: "RECHAZADO",
          className:
            "bg-red-100 text-red-700",
        };

      default:
        return {
          label: "DESCONOCIDO",
          className:
            "bg-gray-100 text-gray-600",
        };

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
          max-w-[98vw]
          lg:max-w-5xl
          max-h-[95vh]
          flex flex-col
          overflow-hidden
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
              text-xl sm:text-2xl
              font-bold
              break-words
            "
          >
            Detalle de Préstamo
          </h2>

          <p
            className="
              text-xs sm:text-sm
              opacity-80
              mt-1
            "
          >
            Gestión completa del préstamo
          </p>

        </div>

        {/* CONTENT */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-4 sm:p-5 md:p-6
            space-y-6
          "
        >

          {/* INFO */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-4 sm:gap-5
            "
          >

            <div
              className="
                bg-[#f9fafb]
                rounded-xl
                p-4
                border border-[#677750]/10
                min-w-0
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Usuario
              </p>

              <p
                className="
                  font-semibold
                  text-[#677750]
                  text-sm sm:text-base
                  break-words
                "
              >
                {loan.user?.nombre}{" "}
                {loan.user?.apellido}
              </p>

              <p
                className="
                  text-xs sm:text-sm
                  text-[#677750]/70
                  break-words
                "
              >
                {loan.user?.correo}
              </p>

            </div>

            <div
              className="
                bg-[#f9fafb]
                rounded-xl
                p-4
                border border-[#677750]/10
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Cuenta
              </p>

              <p
                className="
                  font-semibold
                  text-[#677750]
                  text-sm sm:text-base
                "
              >
                #{loan.account?.id}
              </p>

              <p
                className="
                  text-xs sm:text-sm
                  text-[#677750]/70
                "
              >
                {loan.account?.tipo}
              </p>

            </div>

            <div
              className="
                bg-[#f9fafb]
                rounded-xl
                p-4
                border border-[#677750]/10
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-2
                "
              >
                Estado
              </p>

              {(() => {

                const statusConfig =
                  getStatusConfig(
                    loan.estado
                  );

                return (
                  <span
                    className={`
                      inline-flex
                      items-center
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${statusConfig.className}
                    `}
                  >
                    {statusConfig.label}
                  </span>
                );

              })()}

            </div>

          </div>

          {/* FINANCIAL INFO */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-4
            "
          >

            <div
              className="
                border border-[#677750]/10
                rounded-xl
                p-4
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Monto
              </p>

              <p
                className="
                  text-lg sm:text-xl
                  font-bold
                  text-green-600
                  break-words
                "
              >
                Q{loan.monto}
              </p>

            </div>

            <div
              className="
                border border-[#677750]/10
                rounded-xl
                p-4
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Interés
              </p>

              <p
                className="
                  text-lg sm:text-xl
                  font-bold
                  text-[#677750]
                "
              >
                {loan.tasa_interes}%
              </p>

            </div>

            <div
              className="
                border border-[#677750]/10
                rounded-xl
                p-4
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Cuota mensual
              </p>

              <p
                className="
                  text-lg sm:text-xl
                  font-bold
                  text-blue-600
                  break-words
                "
              >
                Q{loan.cuota_mensual || 0}
              </p>

            </div>

            <div
              className="
                border border-[#677750]/10
                rounded-xl
                p-4
              "
            >

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Saldo pendiente
              </p>

              <p
                className="
                  text-lg sm:text-xl
                  font-bold
                  text-red-600
                  break-words
                "
              >
                Q{loan.saldo_pendiente || 0}
              </p>

            </div>

          </div>

          {/* INSTALLMENTS */}

          <div>

            <div
              className="
                flex
                flex-col sm:flex-row
                sm:justify-between
                sm:items-center
                gap-2
                mb-4
              "
            >

              <h3
                className="
                  text-base sm:text-lg
                  font-semibold
                  text-[#677750]
                "
              >
                Cuotas
              </h3>

            </div>

            {/* MOBILE */}

            <div className="block lg:hidden space-y-4">

              {
                loan.loan_installments?.length > 0 ? (

                  loan.loan_installments.map(
                    (installment) => (

                      <div
                        key={installment.id}
                        className="
                          border border-[#677750]/10
                          rounded-xl
                          p-4
                          space-y-3
                        "
                      >

                        <div
                          className="
                            flex
                            justify-between
                            items-start
                            gap-3
                          "
                        >

                          <div>

                            <p
                              className="
                                text-xs
                                text-gray-500
                              "
                            >
                              Cuota
                            </p>

                            <p
                              className="
                                font-semibold
                                text-[#677750]
                              "
                            >
                              #
                              {
                                installment.numero_cuota
                              }
                            </p>

                          </div>

                          <span
                            className={`
                              px-2 py-1
                              rounded-full
                              text-xs
                              font-medium
                              ${
                                installment.estado ===
                                "PAGADA"
                                  ? "bg-green-100 text-green-700"
                                  : installment.estado ===
                                      "EN_MORA"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }
                            `}
                          >
                            {
                              installment.estado ===
                              "PAGADA"
                                ? "PAGADA"
                                : installment.estado ===
                                    "EN_MORA"
                                  ? "EN MORA"
                                  : "PENDIENTE"
                            }
                          </span>

                        </div>

                        <div
                          className="
                            grid
                            grid-cols-2
                            gap-3
                            text-sm
                          "
                        >

                          <div>

                            <p className="text-gray-500 text-xs">
                              Vencimiento
                            </p>

                            <p>
                              {
                                new Date(
                                  installment.fecha_vencimiento
                                ).toLocaleDateString()
                              }
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 text-xs">
                              Cuota
                            </p>

                            <p className="text-green-600 font-medium">
                              Q
                              {
                                installment.monto_cuota
                              }
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 text-xs">
                              Capital
                            </p>

                            <p>
                              Q
                              {installment.capital}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 text-xs">
                              Interés
                            </p>

                            <p>
                              Q
                              {installment.interes}
                            </p>

                          </div>

                          <div className="col-span-2">

                            <p className="text-gray-500 text-xs">
                              Mora
                            </p>

                            <p className="text-red-600">
                              Q
                              {
                                installment.mora_acumulada
                              }
                            </p>

                          </div>

                        </div>

                        <button
                          onClick={() =>
                            handlePay(
                              installment.id
                            )
                          }
                          disabled={
                            loading ||
                            installment.estado ===
                              "PAGADA"
                          }
                          className="
                            w-full
                            px-4 py-2
                            rounded-lg
                            bg-blue-600
                            text-white
                            text-sm
                            hover:bg-blue-700
                            disabled:opacity-50
                          "
                        >
                          Pagar
                        </button>

                      </div>

                    )
                  )

                ) : (

                  <div
                    className="
                      text-center
                      p-5
                      border border-[#677750]/10
                      rounded-xl
                      text-[#677750]/60
                      text-sm
                    "
                  >
                    No hay cuotas generadas
                  </div>

                )
              }

            </div>

            {/* DESKTOP TABLE */}

            <div
              className="
                hidden lg:block
                overflow-x-auto
                border border-[#677750]/10
                rounded-xl
              "
            >

              <table className="w-full text-sm min-w-[1000px]">

                <thead
                  className="
                    bg-[#f9fafb]
                    text-left
                    text-[#677750]/70
                  "
                >

                  <tr>

                    <th className="p-3">
                      #
                    </th>

                    <th className="p-3">
                      Vencimiento
                    </th>

                    <th className="p-3">
                      Cuota
                    </th>

                    <th className="p-3">
                      Capital
                    </th>

                    <th className="p-3">
                      Interés
                    </th>

                    <th className="p-3">
                      Mora
                    </th>

                    <th className="p-3">
                      Estado
                    </th>

                    <th className="p-3 text-center">
                      Acciones
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    loan.loan_installments
                      ?.length > 0 ? (

                      loan.loan_installments.map(
                        (installment) => (

                          <tr
                            key={installment.id}
                            className="
                              border-t
                              border-[#677750]/5
                            "
                          >

                            <td className="p-3">
                              {
                                installment.numero_cuota
                              }
                            </td>

                            <td className="p-3">
                              {
                                new Date(
                                  installment.fecha_vencimiento
                                ).toLocaleDateString()
                              }
                            </td>

                            <td
                              className="
                                p-3
                                text-green-600
                                font-medium
                              "
                            >
                              Q
                              {
                                installment.monto_cuota
                              }
                            </td>

                            <td className="p-3">
                              Q
                              {
                                installment.capital
                              }
                            </td>

                            <td className="p-3">
                              Q
                              {
                                installment.interes
                              }
                            </td>

                            <td
                              className="
                                p-3
                                text-red-600
                              "
                            >
                              Q
                              {
                                installment.mora_acumulada
                              }
                            </td>

                            <td className="p-3">

                              <span
                                className={`
                                  px-2 py-1
                                  rounded-full
                                  text-xs
                                  font-medium
                                  ${
                                    installment.estado ===
                                    "PAGADA"
                                      ? "bg-green-100 text-green-700"
                                      : installment.estado ===
                                          "EN_MORA"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                  }
                                `}
                              >
                                {
                                  installment.estado ===
                                  "PAGADA"
                                    ? "PAGADA"
                                    : installment.estado ===
                                        "EN_MORA"
                                      ? "EN MORA"
                                      : "PENDIENTE"
                                }
                              </span>

                            </td>

                            <td className="p-3 text-center">

                              <button
                                onClick={() =>
                                  handlePay(
                                    installment.id
                                  )
                                }
                                disabled={
                                  loading ||
                                  installment.estado ===
                                    "PAGADA"
                                }
                                className="
                                  px-3 py-1
                                  rounded-lg
                                  bg-blue-600
                                  text-white
                                  text-xs
                                  hover:bg-blue-700
                                  disabled:opacity-50
                                "
                              >
                                Pagar
                              </button>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="8"
                          className="
                            text-center
                            p-5
                            text-[#677750]/60
                          "
                        >
                          No hay cuotas generadas
                        </td>

                      </tr>

                    )
                  }

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            p-4 sm:p-5
            border-t border-[#677750]/10
            flex flex-col-reverse
            sm:flex-row
            sm:flex-wrap
            justify-end
            gap-3
          "
        >

          <button
            onClick={onClose}
            className="
              w-full sm:w-auto
              px-4 py-2
              rounded-lg
              bg-gray-100
              text-gray-700
              hover:bg-gray-200
              transition
            "
          >
            Cerrar
          </button>

          <button
            onClick={handleReject}
            disabled={
              loading ||
              loan.estado !== "PENDING"
            }
            className="
              w-full sm:w-auto
              px-5 py-2
              rounded-lg
              text-white
              bg-red-600
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            Rechazar
          </button>

          <button
            onClick={handleApprove}
            disabled={
              loading ||
              loan.estado !== "PENDING"
            }
            className="
              w-full sm:w-auto
              px-5 py-2
              rounded-lg
              text-white
              bg-green-600
              hover:bg-green-700
              disabled:opacity-50
            "
          >
            Aprobar
          </button>

        </div>

      </div>

    </div>
  );
};