import { useState } from "react";

export const LoanModal = ({
  isOpen,
  onClose,
  loan,
  onApprove,
  onReject,
  onPay,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !loan) return null;

  const handleApprove = async () => {
    try {
      setLoading(true);

      await onApprove(loan.id); // 🔥 conecta con el padre

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

      await onReject(loan.id); // 🔥 conecta con el padre

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    try {
      setLoading(true);

      await onPay(loan.id); // 🔥 conecta con el padre

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">

        <div className="p-5 text-white bg-[#677750]">
          <h2 className="text-2xl font-bold">Detalle de Préstamo</h2>
          <p className="text-sm opacity-80">
            Revisa y gestiona el préstamo
          </p>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Usuario</p>
              <p className="font-medium text-[#677750]">{loan.usuario}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Monto</p>
              <p className="font-medium text-green-600">Q{loan.monto}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Cuotas</p>
              <p className="font-medium text-[#677750]">
                {loan.cuotas_pagadas}/{loan.cuotas_totales}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Fecha</p>
              <p className="font-medium text-[#677750]">{loan.fecha}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#677750]/10">
            <p className="text-sm text-[#677750]/70 mb-2">Estado</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  loan.estado === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-700"
                    : loan.estado === "APROBADO"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {loan.estado}
            </span>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#677750]/10">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cerrar
            </button>

            <button
              onClick={handleReject}
              disabled={loading || loan.estado !== "PENDIENTE"}
              className="px-5 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Rechazar"}
            </button>

            <button
              onClick={handleApprove}
              disabled={loading || loan.estado !== "PENDIENTE"}
              className="px-5 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Aprobar"}
            </button>

            <button
              onClick={handlePay}
              disabled={loading || loan.estado !== "APROBADO"}
              className="px-5 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Pagar cuota"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};