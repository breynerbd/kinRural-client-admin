// src/features/transactions/components/Transactions.jsx

import { useEffect, useMemo, useState } from "react";
import { TransactionModal } from "./TransactionModal";
import { TransactionsStore } from "../store/TransactionsStore";

export const Transactions = () => {
  const transactions = TransactionsStore((state) => state.transactions);
  const getTransactions = TransactionsStore((state) => state.getTransactions);
  const isLoading = TransactionsStore((state) => state.isLoading);

  const [searchAccountId, setSearchAccountId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* =========================
      LOAD
  ========================= */

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  /* =========================
      FILTERS
  ========================= */

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Si no cuenta con origen (caso depósito), igualar a un string vacío para evitar romper el filter
      const origenId = transaction.cuenta_origen_id
        ? String(transaction.cuenta_origen_id)
        : "";
      return origenId.includes(searchAccountId);
    });
  }, [transactions, searchAccountId]);

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
            Gestión de Transacciones
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
            Administra las transferencias bancarias
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="
            w-full
            sm:w-auto
            shrink-0
            bg-[#677750]
            px-4
            py-3
            rounded-xl
            text-white
            text-sm
            sm:text-base
            font-medium
            hover:opacity-90
            transition
          "
        >
          + Nueva Transacción
        </button>
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
          {/* INPUT */}

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
              Buscar por ID de cuenta origen
            </label>

            <input
              type="text"
              placeholder="Ej: 1"
              value={searchAccountId}
              onChange={(e) => setSearchAccountId(e.target.value)}
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

          {/* ACTIONS */}

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
              onClick={() => setSearchAccountId("")}
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
                whitespace-nowrap
              "
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
            Historial de Transacciones
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
              break-all
            "
          >
            Transferencias registradas en el sistema
          </p>
        </div>

        {/* MOBILE + TABLET CARDS */}

        <div className="block 2xl:hidden">
          {isLoading ? (
            <div
              className="
                p-6
                text-center
                text-sm
                text-[#677750]/60
              "
            >
              Cargando transacciones...
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div
              className="
                divide-y
                divide-[#677750]/10
              "
            >
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
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
                      sm:items-center
                      sm:justify-between
                      gap-3
                      min-w-0
                    "
                  >
                    <div className="min-w-0">
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        ID
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
                        #{transaction.id}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        min-w-0
                      "
                    >
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          bg-[#677750]/10
                          text-[#677750]
                          break-all
                        "
                      >
                        {transaction.tipo}
                      </span>

                      <span
                        className="
                          text-green-600
                          font-bold
                          text-sm
                          sm:text-base
                          break-all
                        "
                      >
                        Q{transaction.monto}
                      </span>
                    </div>
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
                    <div className="min-w-0">
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        Cuenta Origen
                      </p>

                      <p
                        className="
                          text-sm
                          text-[#677750]/70
                          break-all
                        "
                      >
                        {transaction.cuenta_origen_id
                          ? `#${transaction.cuenta_origen_id}`
                          : "N/A (DEPÓSITO)"}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        Cuenta Destino
                      </p>

                      <p
                        className="
                          text-sm
                          text-[#677750]/70
                          break-all
                        "
                      >
                        {transaction.cuenta_destino_id
                          ? `#${transaction.cuenta_destino_id}`
                          : "N/A (RETIRO)"}
                      </p>
                    </div>

                    <div className="sm:col-span-2 min-w-0">
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
                          break-all
                        "
                      >
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="
                p-6
                text-center
                text-sm
                text-[#677750]/60
              "
            >
              No hay transacciones disponibles
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
                <th className="p-4 whitespace-nowrap">ID</th>
                <th className="p-4 whitespace-nowrap">Tipo</th>
                <th className="p-4 whitespace-nowrap">Cuenta Origen</th>
                <th className="p-4 whitespace-nowrap">Cuenta Destino</th>
                <th className="p-4 whitespace-nowrap">Monto</th>
                <th className="p-4 whitespace-nowrap">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="
                      p-6
                      text-center
                      text-[#677750]/60
                    "
                  >
                    Cargando transacciones...
                  </td>
                </tr>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="
                      border-b
                      border-[#677750]/5
                      hover:bg-[#fffaf2]/50
                      transition
                    "
                  >
                    <td
                      className="
                        p-4
                        font-medium
                        text-[#677750]
                        whitespace-nowrap
                      "
                    >
                      #{transaction.id}
                    </td>

                    <td className="p-4">
                      <span
                        className="
                          px-2
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          bg-[#677750]/10
                          text-[#677750]
                          whitespace-nowrap
                        "
                      >
                        {transaction.tipo}
                      </span>
                    </td>

                    <td
                      className="
                        p-4
                        text-[#677750]/70
                        whitespace-nowrap
                      "
                    >
                      {transaction.cuenta_origen_id
                        ? `#${transaction.cuenta_origen_id}`
                        : "N/A (DEPÓSITO)"}
                    </td>

                    <td
                      className="
                        p-4
                        text-[#677750]/70
                        whitespace-nowrap
                      "
                    >
                      {transaction.cuenta_destino_id
                        ? `#${transaction.cuenta_destino_id}`
                        : "N/A (RETIRO)"}
                    </td>

                    <td
                      className="
                        p-4
                        text-green-600
                        font-semibold
                        whitespace-nowrap
                      "
                    >
                      Q{transaction.monto}
                    </td>

                    <td
                      className="
                        p-4
                        text-[#677750]/60
                        whitespace-nowrap
                      "
                    >
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="
                      p-6
                      text-center
                      text-[#677750]/60
                    "
                  >
                    No hay transacciones disponibles
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
