import { useState } from "react";
import { AccountRequestModal } from "./AccountRequestModal.jsx";

export const AccountRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [requests, setRequests] = useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      dpi: "1234567890101",
      correo: "juan@gmail.com",
      estado: "PENDIENTE",
      fecha: "2026-04-20",
    },
  ]);

  const openModal = (req) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const handleApprove = async (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, estado: "APROBADO" } : req
      )
    );
  };

  const handleReject = async (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, estado: "RECHAZADO" } : req
      )
    );
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#677750]">
          Solicitudes de Cuenta
        </h1>
        <p className="text-sm text-[#677750]/70">
          Administra las solicitudes de creación de cuentas
        </p>
      </div>

      {/* MODAL */}
      <AccountRequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        request={selectedRequest}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* TABLE */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-[#677750]/10">
          <h2 className="text-lg font-semibold text-[#677750]">
            Lista de solicitudes
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="text-left text-[#677750]/60 border-b border-[#677750]/10">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Correo</th>
              <th className="p-4">DPI</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                onClick={() => openModal(req)}
                className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/50 transition cursor-pointer"
              >
                <td className="p-4 font-medium text-[#677750]">
                  {req.nombre} {req.apellido}
                </td>

                <td className="p-4 text-[#677750]/70">
                  {req.correo}
                </td>

                <td className="p-4 text-[#677750]/70">
                  {req.dpi}
                </td>

                <td className="p-4 text-[#677750]/60">
                  {req.fecha}
                </td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${req.estado === "PENDIENTE"
                        ? "bg-yellow-100 text-yellow-700"
                        : req.estado === "APROBADO"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {req.estado}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(req);
                    }}
                    className="px-3 py-1 text-xs rounded bg-[#677750] text-white"
                  >
                    Gestionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};