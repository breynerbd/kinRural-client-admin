import { useState } from "react";

export const AccountRequestModal = ({
  isOpen,
  onClose,
  request,
  onApprove,
  onReject,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !request) return null;

  const handleApprove = async () => {
    try {
      setLoading(true);

      console.log("Aprobando:", request.id);

      /*
      await fetch(`/account-requests/${request.id}/approve`, {
        method: "PATCH",
      });
      */

      onApprove(request.id); // 🔥 conecta con el estado global
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

      console.log("Rechazando:", request.id);

      /*
      await fetch(`/account-requests/${request.id}/reject`, {
        method: "PATCH",
      });
      */

      onReject(request.id); // 🔥 conecta con el estado global
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

        {/* HEADER */}
        <div className="p-5 text-white bg-[#677750]">
          <h2 className="text-2xl font-bold">
            Solicitud de Cuenta
          </h2>
          <p className="text-sm opacity-80">
            Revisa y decide sobre la solicitud
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="p-6 space-y-4 overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <p className="text-xs text-gray-500">Nombre</p>
              <p className="font-medium text-[#677750]">
                {request.nombre} {request.apellido}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Correo</p>
              <p className="font-medium text-[#677750]">
                {request.correo}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">DPI</p>
              <p className="font-medium text-[#677750]">
                {request.dpi}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Teléfono</p>
              <p className="font-medium text-[#677750]">
                {request.telefono || "—"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs text-gray-500">Dirección</p>
              <p className="font-medium text-[#677750]">
                {request.direccion || "—"}
              </p>
            </div>

          </div>

          {/* ESTADO */}
          <div className="pt-4 border-t border-[#677750]/10">
            <p className="text-sm text-[#677750]/70 mb-2">Estado actual</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  request.estado === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-700"
                    : request.estado === "APROBADO"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {request.estado}
            </span>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#677750]/10">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cerrar
            </button>

            <button
              onClick={handleReject}
              disabled={loading || request.estado !== "PENDIENTE"}
              className="px-5 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Rechazar"}
            </button>

            <button
              onClick={handleApprove}
              disabled={loading || request.estado !== "PENDIENTE"}
              className="px-5 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Aprobar"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};