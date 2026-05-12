// src/features/accountRequests/components/AccountRequests.jsx

import { useEffect, useMemo, useState } from "react";
import { AccountRequestModal } from "./AccountRequestModal";
import { useAccountRequestStore } from "../store/accountRequestStore";

export const AccountRequests = () => {
  const { accountRequests, loading, getAccountRequests } = useAccountRequestStore();

  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("TODOS");

  // =========================
  // LOAD REQUESTS
  // =========================
  useEffect(() => {
    getAccountRequests();
  }, [getAccountRequests]);

  // =========================
  // FILTERS
  // =========================
  const filteredRequests = useMemo(() => {
    if (statusFilter === "TODOS") {
      return accountRequests;
    }

    return accountRequests.filter((request) => request.status === statusFilter);
  }, [accountRequests, statusFilter]);

  // =========================
  // MODAL
  // =========================
  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  // =========================
  // STATUS STYLES
  // =========================
  const statusStyles = {
    PENDIENTE: "bg-yellow-100 text-yellow-700",
    APROBADA: "bg-green-100 text-green-700",
    RECHAZADA: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
          mb-6
          sm:mb-8
        "
      >
        <div className="min-w-0">
          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-[#677750]
              break-words
            "
          >
            Solicitudes de Cuenta
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
            "
          >
            Gestiona solicitudes de creación de cuentas
          </p>
        </div>

        {/* FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            w-full
            sm:w-auto
            border
            border-[#677750]/20
            rounded-lg
            px-4 py-2.5
            text-sm
            sm:text-base
            text-[#677750]
            focus:outline-none
            focus:ring-2
            focus:ring-[#677750]/30
          "
        >
          <option value="TODOS">Todos</option>

          <option value="PENDIENTE">Pendientes</option>

          <option value="APROBADA">Aprobadas</option>

          <option value="RECHAZADA">Rechazadas</option>
        </select>
      </div>

      {/* MODAL */}
      <AccountRequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        request={selectedRequest}
      />

      {/* TABLE */}
      <div
        className="
          bg-white
          border
          border-[#677750]/10
          rounded-xl
          shadow-sm
          overflow-hidden
        "
      >
        {/* TABLE HEADER */}
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
            "
          >
            Lista de solicitudes
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
            "
          >
            Solicitudes registradas en el sistema
          </p>
        </div>

        {loading ? (
          <div
            className="
                p-8
                sm:p-10
                text-center
                text-sm
                sm:text-base
                text-[#677750]/60
              "
          >
            Cargando solicitudes...
          </div>
        ) : (
          <>
            {/* MOBILE / TABLET CARDS */}
            <div className="block lg:hidden">
              {filteredRequests.length > 0 ? (
                <div className="divide-y divide-[#677750]/10">
                  {filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      className="
                              p-4
                              space-y-4
                            "
                    >
                      {/* USER */}
                      <div className="space-y-1">
                        <p
                          className="
                                  font-semibold
                                  text-[#677750]
                                  text-sm
                                  sm:text-base
                                  break-words
                                "
                        >
                          {request.fullName}
                        </p>

                        <p
                          className="
                                  text-xs
                                  sm:text-sm
                                  text-[#677750]/60
                                  break-words
                                "
                        >
                          DPI: {request.dpi}
                        </p>
                      </div>

                      {/* EMAIL */}
                      <div>
                        <p className="text-xs text-[#677750]/50 mb-1">Correo</p>

                        <p
                          className="
                                  text-sm
                                  text-[#677750]/80
                                  break-words
                                "
                        >
                          {request.email}
                        </p>
                      </div>

                      {/* TYPE + STATUS */}
                      <div
                        className="
                                flex
                                flex-wrap
                                items-center
                                gap-2
                              "
                      >
                        <span
                          className={`
                                  px-2 py-1
                                  rounded-full
                                  text-xs
                                  font-medium
                                  ${
                                    request.tipo === "AHORRO"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-blue-100 text-blue-700"
                                  }
                                `}
                        >
                          {request.tipo}
                        </span>

                        <span
                          className={`
                                  px-2 py-1
                                  rounded-full
                                  text-xs
                                  font-medium
                                  ${statusStyles[request.status]}
                                `}
                        >
                          {request.status}
                        </span>
                      </div>

                      {/* DATE */}
                      <div>
                        <p className="text-xs text-[#677750]/50 mb-1">Fecha</p>

                        <p
                          className="
                                  text-sm
                                  text-[#677750]/70
                                "
                        >
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* ACTION */}
                      <button
                        onClick={() => openModal(request)}
                        className="
                                w-full
                                sm:w-auto
                                px-4 py-2
                                rounded-lg
                                bg-[#677750]
                                text-white
                                text-sm
                                hover:opacity-90
                                transition
                              "
                      >
                        Gestionar
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="
                        text-center
                        p-8
                        text-sm
                        text-[#677750]/60
                      "
                >
                  No hay solicitudes registradas
                </div>
              )}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead
                  className="
                      border-b
                      border-[#677750]/10
                      text-left
                      text-[#677750]/60
                    "
                >
                  <tr>
                    <th className="p-4">Solicitante</th>

                    <th className="p-4">Correo</th>

                    <th className="p-4">Tipo</th>

                    <th className="p-4">Estado</th>

                    <th className="p-4">Fecha</th>

                    <th className="p-4 text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="
                              border-b
                              border-[#677750]/5
                              hover:bg-[#fffaf2]/50
                              transition
                            "
                      >
                        {/* USER */}
                        <td className="p-4">
                          <div>
                            <p
                              className="
                                    font-medium
                                    text-[#677750]
                                    break-words
                                  "
                            >
                              {request.fullName}
                            </p>

                            <p
                              className="
                                    text-xs
                                    text-[#677750]/60
                                  "
                            >
                              DPI: {request.dpi}
                            </p>
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td
                          className="
                                p-4
                                text-[#677750]/70
                                break-words
                              "
                        >
                          {request.email}
                        </td>

                        {/* ACCOUNT TYPE */}
                        <td className="p-4">
                          <span
                            className={`
                                  px-2 py-1
                                  rounded-full
                                  text-xs
                                  font-medium
                                  ${
                                    request.tipo === "AHORRO"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-blue-100 text-blue-700"
                                  }
                                `}
                          >
                            {request.tipo}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="p-4">
                          <span
                            className={`
                                  px-2 py-1
                                  rounded-full
                                  text-xs
                                  font-medium
                                  ${statusStyles[request.status]}
                                `}
                          >
                            {request.status}
                          </span>
                        </td>

                        {/* DATE */}
                        <td
                          className="
                                p-4
                                text-[#677750]/60
                              "
                        >
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>

                        {/* ACTIONS */}
                        <td className="p-4">
                          <div
                            className="
                                  flex
                                  justify-center
                                "
                          >
                            <button
                              onClick={() => openModal(request)}
                              className="
                                    px-4 py-2
                                    rounded-lg
                                    bg-[#677750]
                                    text-white
                                    hover:opacity-90
                                    transition
                                  "
                            >
                              Gestionar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="
                              text-center
                              p-10
                              text-[#677750]/60
                            "
                      >
                        No hay solicitudes registradas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
