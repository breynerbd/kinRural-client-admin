import { useState } from "react";
import { LoanModal } from "./LoanModal.jsx";

export const Loans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [loans, setLoans] = useState([
    {
      id: 1,
      usuario: "Juan Pérez",
      monto: 5000,
      estado: "PENDIENTE",
      cuotas_pagadas: 2,
      cuotas_totales: 10,
      fecha: "2026-04-20",
    },
  ]);
  // filtro por ID
  const filteredLoans = loans.filter((loan) =>
    searchId === "" ? true : loan.id.toString() === searchId
  );
  const openModal = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setIsModalOpen(false);
  };

  const handleApprove = async (id) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id ? { ...loan, estado: "APROBADO" } : loan
      )
    );
  };

  const handleReject = async (id) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id ? { ...loan, estado: "RECHAZADO" } : loan
      )
    );
  };

  const handlePay = async (id) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id
          ? {
            ...loan,
            cuotas_pagadas: loan.cuotas_pagadas + 1,
          }
          : loan
      )
    );
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#677750]">
            Gestión de Préstamos
          </h1>
          <p className="text-sm text-[#677750]/70">
            Administra los préstamos del sistema
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">

          <div className="flex-1">
            <label className="text-xs text-[#677750]/60 block mb-1">
              Buscar préstamo por ID
            </label>

            <input
              type="number"
              placeholder="Ej: 1"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full border border-[#677750]/20 rounded-lg px-3 py-2 
        focus:outline-none focus:ring-2 focus:ring-[#677750]/40
        text-[#677750]"
            />
          </div>

          <div className="flex gap-2 mt-2 md:mt-5">
            <button
              onClick={() => setSearchId("")}
              className="px-4 py-2 rounded-lg border border-[#677750]/20 
        text-[#677750] hover:bg-[#677750]/10 transition text-sm"
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

      {/* TABLE */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-[#677750]/10">
          <h2 className="text-lg font-semibold text-[#677750]">
            Lista de préstamos
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="text-left text-[#677750]/60 border-b border-[#677750]/10">
            <tr>
              <th className="p-4">Usuario</th>
              <th className="p-4">Monto</th>
              <th className="p-4">Cuotas</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/50 transition cursor-pointer"
                  onClick={() => openModal(loan)}
                >
                  <td className="p-4 font-medium text-[#677750]">
                    {loan.usuario}
                  </td>

                  <td className="p-4 text-green-600 font-medium">
                    Q{loan.monto}
                  </td>

                  <td className="p-4 text-[#677750]/70">
                    {loan.cuotas_pagadas}/{loan.cuotas_totales}
                  </td>

                  <td className="p-4 text-[#677750]/60">
                    {loan.fecha}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                      ${loan.estado === "PENDIENTE"
                          ? "bg-yellow-100 text-yellow-700"
                          : loan.estado === "APROBADO"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {loan.estado}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(loan);
                      }}
                      className="px-3 py-1 text-xs rounded bg-[#677750] text-white"
                    >
                      Gestionar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-[#677750]/60">
                  No se encontró ningún préstamo con ese ID
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};