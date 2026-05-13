// src/features/accountRequests/components/AccountRequests.jsx

import { useEffect, useMemo, useState } from "react";
import { AccountRequestModal } from "./AccountRequestModal";
import { useAccountRequestStore } from "../store/accountRequestStore";

export const AccountRequests = () => {
  const { accountRequests, loading, getAccountRequests } =
    useAccountRequestStore();

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

    return accountRequests.filter(
      (request) => request.status === statusFilter,
    );
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
          sm:mb-8
        "
      >
        <div className="min-w-0 flex-1">
          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-[#677750]
              break-all
              leading-tight
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
              break-all
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
            sm:w-full
            md:w-auto
            border
            border-[#677750]/20
            rounded-xl
            px-4
            py-3
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
          rounded-2xl
          shadow-sm
          overflow-hidden
          w-full
          min-w-0
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
              break-all
            "
          >
            Lista de solicitudes
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
              break-all
            "
          >
            Solicitudes registradas en el sistema
          </p>
        </div>

        {/* MOBILE / TABLET CARDS */}

        <div className="block 2xl:hidden">
          {loading ? (
            <div
              className="
                text-center
                p-6
                text-sm
                text-[#677750]/70
              "
            >
              Cargando solicitudes...
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="divide-y divide-[#677750]/10">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="
                    p-4
                    sm:p-5
                    space-y-4
                    min-w-0
                  "
                >
                  {/* TOP */}

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                      gap-3
                    "
                  >
                    {/* USER */}

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          font-semibold
                          text-[#677750]
                          text-sm
                          sm:text-base
                          break-all
                        "
                      >
                        {request.fullName}
                      </p>

                      <p
                        className="
                          text-xs
                          sm:text-sm
                          text-[#677750]/70
                          mt-1
                          break-all
                        "
                      >
                        DPI: {request.dpi}
                      </p>
                    </div>

                    {/* STATUS */}

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
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-medium
                          whitespace-nowrap
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
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-medium
                          whitespace-nowrap
                          ${statusStyles[request.status]}
                        `}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div className="min-w-0">
                    <p
                      className="
                        text-xs
                        text-[#677750]/50
                        mb-1
                      "
                    >
                      Correo
                    </p>

                    <p
                      className="
                        text-sm
                        text-[#677750]/80
                        break-all
                      "
                    >
                      {request.email}
                    </p>
                  </div>

                  {/* DETAILS */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        Fecha
                      </p>

                      <p
                        className="
                          text-sm
                          text-[#677750]/70
                        "
                      >
                        {new Date(
                          request.createdAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div
                    className="
                      pt-2
                      border-t
                      border-[#677750]/10
                      flex
                      justify-stretch
                      sm:justify-end
                    "
                  >
                    <button
                      onClick={() => openModal(request)}
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
              ))}
            </div>
          ) : (
            <div
              className="
                text-center
                p-8
                text-sm
                text-[#677750]/70
              "
            >
              No hay solicitudes registradas
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
              table-fixed
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
                <th className="p-4 w-[24%] whitespace-nowrap">
                  Solicitante
                </th>

                <th className="p-4 w-[30%] whitespace-nowrap">
                  Correo
                </th>

                <th className="p-4 w-[12%] whitespace-nowrap">
                  Tipo
                </th>

                <th className="p-4 w-[14%] whitespace-nowrap">
                  Estado
                </th>

                <th className="p-4 w-[12%] whitespace-nowrap">
                  Fecha
                </th>

                <th className="p-4 w-[8%] text-center whitespace-nowrap">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="
                      text-center
                      p-8
                      text-[#677750]/70
                    "
                  >
                    Cargando solicitudes...
                  </td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="
                      border-b
                      border-[#677750]/5
                      hover:bg-[#677750]/5
                      transition
                    "
                  >
                    {/* USER */}

                    <td className="p-4 align-top">
                      <div className="min-w-0">
                        <p
                          className="
                            font-medium
                            text-[#677750]
                            break-all
                          "
                        >
                          {request.fullName}
                        </p>

                        <p
                          className="
                            text-xs
                            text-[#677750]/70
                            break-all
                            mt-1
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
                        break-all
                        align-top
                      "
                    >
                      {request.email}
                    </td>

                    {/* ACCOUNT TYPE */}

                    <td className="p-4 align-top">
                      <span
                        className={`
                          px-2 py-1
                          rounded-full
                          text-xs
                          font-medium
                          whitespace-nowrap
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

                    <td className="p-4 align-top">
                      <span
                        className={`
                          px-2 py-1
                          rounded-full
                          text-xs
                          font-medium
                          whitespace-nowrap
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
                        text-[#677750]/70
                        whitespace-nowrap
                        align-top
                      "
                    >
                      {new Date(
                        request.createdAt,
                      ).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4 align-middle">
                  <div
                    className="
                      pt-2
                      border-t
                      border-[#677750]/10
                      flex
                      justify-stretch
                      sm:justify-end
                    "
                  >
                        <button
                          onClick={() => openModal(request)}
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
                      text-[#677750]/70
                    "
                  >
                    No hay solicitudes registradas
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