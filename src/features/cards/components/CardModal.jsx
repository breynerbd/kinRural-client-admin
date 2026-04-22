import { useState } from "react";

export const CardModal = ({
  isOpen,
  onClose,
  card,
  onAction,
  onActivate,
  onBlock,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !card) return null;

  const handleAction = async (accion) => {
    try {
      setLoading(true);

      await onAction(card.id, accion); // 🔥 conecta con el padre

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    try {
      setLoading(true);

      await onActivate(card.id); // 🔥 conecta con el padre

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async () => {
    try {
      setLoading(true);

      await onBlock(card.id); // 🔥 conecta con el padre

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
          <h2 className="text-2xl font-bold">Detalle de Tarjeta</h2>
          <p className="text-sm opacity-80">
            Gestiona el estado de la tarjeta
          </p>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Número</p>
              <p className="font-medium text-[#677750]">{card.numero}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Titular</p>
              <p className="font-medium text-[#677750]">{card.titular}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Tipo</p>
              <p className="font-medium text-[#677750]">{card.tipo}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Fecha</p>
              <p className="font-medium text-[#677750]">{card.fecha}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#677750]/10">
            <p className="text-sm text-[#677750]/70 mb-2">Estado actual</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  card.estado === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-700"
                    : card.estado === "APROBADA" || card.estado === "ACTIVA"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {card.estado}
            </span>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#677750]/10">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Cerrar
            </button>

            <button
              onClick={() => handleAction("RECHAZADA")}
              disabled={loading || card.estado !== "PENDIENTE"}
              className="px-5 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Rechazar"}
            </button>

            <button
              onClick={() => handleAction("APROBADA")}
              disabled={loading || card.estado !== "PENDIENTE"}
              className="px-5 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Aprobar"}
            </button>

            <button
              onClick={handleActivate}
              disabled={loading || card.estado !== "APROBADA"}
              className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Activar"}
            </button>

            <button
              onClick={handleBlock}
              disabled={loading || card.estado !== "ACTIVA"}
              className="px-5 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Bloquear"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};