import { useEffect, useMemo, useState } from "react";
import { LoanModal } from "./LoanModal.jsx";
import { useLoanStore } from "../store/loanStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const Loans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchId, setSearchId] = useState("");

  const {
    loans,
    loading,
    getLoans,
    getLoanById,
    approveLoan,
    rejectLoan,
    payLoanInstallment,
    checkLoanMora,
  } = useLoanStore();

  /* =========================
     LOAD DATA
  ========================= */

  useEffect(() => {
    getLoans();
  }, [getLoans]);

  /* =========================
     FILTER
  ========================= */

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) =>
      searchId === ""
        ? true
        : loan.id.toString().includes(searchId),
    );
  }, [loans, searchId]);

  /* =========================
     CLOSE MODAL
  ========================= */

  const closeModal = () => {
    setSelectedLoan(null);

    setIsModalOpen(false);
  };

  /* =========================
     ACTIONS
  ========================= */

  const handleApprove = async (id) => {
    try {
      await approveLoan(id);

      await getLoans();

      showSuccess("Préstamo aprobado correctamente");
    } catch {
      showError("Error al aprobar préstamo");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLoan(id);

      await getLoans();

      showSuccess("Préstamo rechazado");
    } catch {
      showError("Error al rechazar préstamo");
    }
  };

  const handlePay = async (installmentId) => {
    try {
      await payLoanInstallment(installmentId);

      if (selectedLoan?.id) {
        const updatedLoan = await getLoanById(selectedLoan.id);

        setSelectedLoan(updatedLoan);
      }

      await getLoans();

      showSuccess("Cuota pagada correctamente");
    } catch {
      showError("Error al pagar cuota");
    }
  };

  const handleCheckMora = async () => {
    try {
      await checkLoanMora();

      showSuccess("Mora actualizada correctamente");
    } catch {
      showError("Error al verificar mora");
    }
  };

  const openModal = async (loanId) => {
    try {
      const loan = await getLoanById(loanId);

      setSelectedLoan(loan);

      setIsModalOpen(true);
    } catch {
      showError("Error al cargar préstamo");
    }
  };

  /* =========================
     STATUS STYLE
  ========================= */

  const getStatusConfig = (status) => {
    switch (status) {
      case "PENDING":
        return {
          label: "PENDIENTE",
          className: "bg-yellow-100 text-yellow-700",
        };

      case "ACTIVE":
        return {
          label: "ACTIVO",
          className: "bg-green-100 text-green-700",
        };

      case "DELINQUENT":
        return {
          label: "MOROSO",
          className: "bg-red-100 text-red-700",
        };

      case "CLOSED":
        return {
          label: "CERRADO",
          className: "bg-gray-200 text-gray-700",
        };

      case "REJECTED":
        return {
          label: "RECHAZADO",
          className: "bg-red-100 text-red-700",
        };

      default:
        return {
          label: "DESCONOCIDO",
          className: "bg-gray-100 text-gray-600",
        };
    }
  };

  return (
    <div
      className="
        w-full
        min-w-0
        overflow-x-hidden
        p-3
        sm:p-4
        md:p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-4
          mb-6
        "
      >
        <div className="min-w-0 flex-1">
          <h1
            className="
              text-xl
              sm:text-2xl
              md:text-3xl
              font-bold
              text-[#677750]
              break-all
              leading-tight
            "
          >
            Gestión de Préstamos
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
              break-all
            "
          >
            Administra préstamos, cuotas y mora
          </p>
        </div>

        <button
          onClick={handleCheckMora}
          disabled={loading}
          className="
            w-full
            sm:w-full
            md:w-auto
            shrink-0
            px-4
            py-3
            rounded-xl
            bg-red-600
            text-white
            text-sm
            sm:text-base
            font-medium
            hover:bg-red-700
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Revisar Mora
        </button>
      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          mb-6
        "
      >
        <div
          className="
            p-4
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-[#677750]/10
            min-w-0
          "
        >
          <span className="text-xs text-gray-500 break-all">
            Total Préstamos
          </span>

          <span
            className="
              text-2xl
              font-bold
              text-[#677750]
              break-all
            "
          >
            {loans.length}
          </span>
        </div>

        <div
          className="
            p-4
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-[#677750]/10
            min-w-0
          "
        >
          <span className="text-xs text-gray-500 break-all">
            Pendientes
          </span>

          <span
            className="
              text-2xl
              font-bold
              text-yellow-700
              break-all
            "
          >
            {loans.filter((l) => l.estado === "PENDING").length}
          </span>
        </div>

        <div
          className="
            p-4
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-[#677750]/10
            min-w-0
          "
        >
          <span className="text-xs text-gray-500 break-all">
            Activos
          </span>

          <span
            className="
              text-2xl
              font-bold
              text-green-700
              break-all
            "
          >
            {loans.filter((l) => l.estado === "ACTIVE").length}
          </span>
        </div>

        <div
          className="
            p-4
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-[#677750]/10
            min-w-0
          "
        >
          <span className="text-xs text-gray-500 break-all">
            Morosos
          </span>

          <span
            className="
              text-2xl
              font-bold
              text-red-700
              break-all
            "
          >
            {loans.filter((l) => l.estado === "DELINQUENT").length}
          </span>
        </div>
      </div>

      {/* SEARCH */}

      <div
        className="
          bg-white
          border
          border-[#677750]/10
          rounded-2xl
          shadow-sm
          p-4
          sm:p-5
          mb-6
          overflow-hidden
        "
      >
        <div
          className="
            flex
            flex-col
            xl:flex-row
            xl:items-end
            gap-4
          "
        >
          <div className="flex-1 min-w-0">
            <label
              className="
                text-xs
                sm:text-sm
                text-[#677750]/60
                block
                mb-2
              "
            >
              Buscar préstamo por ID
            </label>

            <input
              type="number"
              placeholder="Ej: 1"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="
                w-full
                min-w-0
                border
                border-[#677750]/20
                rounded-xl
                px-3
                py-3
                text-sm
                sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-[#677750]/40
                text-[#677750]
              "
            />
          </div>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-2
              w-full
              xl:w-auto
            "
          >
            <button
              onClick={() => setSearchId("")}
              className="
                w-full
                sm:w-full
                md:w-auto
                px-4
                py-3
                rounded-xl
                border
                border-[#677750]/20
                text-[#677750]
                text-sm
                font-medium
                hover:bg-[#677750]/10
                transition
              "
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}

      <LoanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        loan={selectedLoan}
        onApprove={handleApprove}
        onReject={handleReject}
        onPay={handlePay}
      />

      {/* CONTENT */}

      <div
        className="
          bg-white
          border
          border-[#677750]/10
          rounded-2xl
          shadow-sm
          overflow-hidden
          w-full
          min-w-0
        "
      >
        {/* HEADER */}

        <div
          className="
            p-4
            sm:p-5
            border-b
            border-[#677750]/10
          "
        >
          <h2
            className="
              text-base
              sm:text-lg
              font-semibold
              text-[#677750]
              break-all
            "
          >
            Lista de préstamos
          </h2>

          <p
            className="
              hidden
              md:block
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
              break-all
            "
          >
            Información general de préstamos registrados
          </p>
        </div>

        {/* MOBILE + TABLET */}

        <div className="block 2xl:hidden">
          {filteredLoans.length > 0 ? (
            <div className="divide-y divide-[#677750]/10">
              {filteredLoans.map((loan) => {
                const statusConfig = getStatusConfig(loan.estado);

                return (
                  <div
                    key={loan.id}
                    className="
                      p-4
                      sm:p-5
                      min-w-0
                    "
                  >
                    <div
                      className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-4
                        items-start
                      "
                    >
                      {/* USER */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Usuario
                        </p>

                        <p
                          className="
                            font-semibold
                            text-[#677750]
                            text-sm
                            sm:text-base
                            break-all
                          "
                        >
                          {loan.user?.nombre} {loan.user?.apellido}
                        </p>

                        <p
                          className="
                            text-xs
                            text-[#677750]/60
                            break-all
                            mt-1
                          "
                        >
                          {loan.user?.correo}
                        </p>
                      </div>

                      {/* MONTO */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Monto
                        </p>

                        <p
                          className="
                            text-green-600
                            font-bold
                            text-lg
                            break-all
                          "
                        >
                          Q{loan.monto}
                        </p>
                      </div>

                      {/* STATUS */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Estado
                        </p>

                        <span
                          className={`
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            break-all
                            ${statusConfig.className}
                          `}
                        >
                          {statusConfig.label}
                        </span>
                      </div>

                      {/* ACCOUNT */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Cuenta
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                            break-all
                          "
                        >
                          #{loan.account?.id}
                        </p>
                      </div>

                      {/* INTEREST */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Interés
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                            break-all
                          "
                        >
                          {loan.tasa_interes}%
                        </p>
                      </div>

                      {/* TERM */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Plazo
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                            break-all
                          "
                        >
                          {loan.plazo_meses} meses
                        </p>
                      </div>

                      {/* BALANCE */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Saldo
                        </p>

                        <p
                          className="
                            text-sm
                            font-bold
                            text-red-600
                            break-all
                          "
                        >
                          Q{loan.saldo_pendiente || 0}
                        </p>
                      </div>

                      {/* ACTION */}

                      <div
                        className="
                          md:col-span-2
                          xl:col-span-3
                          pt-3
                          border-t
                          border-[#677750]/10
                          flex
                          justify-stretch
                          sm:justify-end
                        "
                      >
                        <button
                          onClick={() => openModal(loan.id)}
                          className="
                            w-full
                            sm:w-auto
                            px-4
                            py-2.5
                            rounded-xl
                            text-sm
                            font-medium
                            bg-[#677750]
                            text-white
                            hover:opacity-90
                            transition
                          "
                        >
                          Gestionar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="
                text-center
                p-6
                text-sm
                text-[#677750]/60
              "
            >
              {loading
                ? "Cargando préstamos..."
                : "No se encontraron préstamos"}
            </div>
          )}
        </div>

        {/* DESKTOP TABLE */}

        <div
          className="
            hidden
            2xl:block
            w-full
          "
        >
          <table
            className="
              w-full
              text-sm
            "
          >
            <thead
              className="
                text-left
                text-[#677750]/70
                border-b
                border-[#677750]/10
                bg-[#677750]/5
              "
            >
              <tr>
                <th className="p-4 whitespace-nowrap">Usuario</th>

                <th className="p-4 whitespace-nowrap">Cuenta</th>

                <th className="p-4 whitespace-nowrap">Monto</th>

                <th className="p-4 whitespace-nowrap">Interés</th>

                <th className="p-4 whitespace-nowrap">Plazo</th>

                <th className="p-4 whitespace-nowrap">Saldo</th>

                <th className="p-4 whitespace-nowrap">Estado</th>

                <th className="p-4 text-center whitespace-nowrap">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => {
                  const statusConfig = getStatusConfig(loan.estado);

                  return (
                    <tr
                      key={loan.id}
                      className="
                        border-b
                        border-[#677750]/5
                        hover:bg-[#677750]/5
                        transition
                      "
                    >
                      <td className="p-4">
                        <div className="flex flex-col min-w-0">
                          <span
                            className="
                              font-medium
                              text-[#677750]
                              break-all
                            "
                          >
                            {loan.user?.nombre} {loan.user?.apellido}
                          </span>

                          <span
                            className="
                              text-xs
                              text-[#677750]/60
                              break-all
                            "
                          >
                            {loan.user?.correo}
                          </span>
                        </div>
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                          whitespace-nowrap
                        "
                      >
                        #{loan.account?.id}
                      </td>

                      <td
                        className="
                          p-4
                          text-green-600
                          font-semibold
                          whitespace-nowrap
                        "
                      >
                        Q{loan.monto}
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                          whitespace-nowrap
                        "
                      >
                        {loan.tasa_interes}%
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                          whitespace-nowrap
                        "
                      >
                        {loan.plazo_meses} meses
                      </td>

                      <td
                        className="
                          p-4
                          text-red-600
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        Q{loan.saldo_pendiente || 0}
                      </td>

                      <td className="p-4">
                        <span
                          className={`
                            px-2
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            whitespace-nowrap
                            ${statusConfig.className}
                          `}
                        >
                          {statusConfig.label}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => openModal(loan.id)}
                          className="
                            px-3
                            py-2
                            rounded-lg
                            text-xs
                            bg-[#677750]
                            text-white
                            hover:opacity-90
                            transition
                          "
                        >
                          Gestionar
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="
                      text-center
                      p-6
                      text-[#677750]/60
                    "
                  >
                    {loading
                      ? "Cargando préstamos..."
                      : "No se encontraron préstamos"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};