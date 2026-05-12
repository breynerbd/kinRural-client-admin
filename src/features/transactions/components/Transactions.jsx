// src/features/transactions/components/Transactions.jsx

import { useEffect, useMemo, useState } from "react";
import { TransactionModal } from "./TransactionModal";
import { TransactionsStore } from "../store/TransactionsStore";

export const Transactions = () => {
  const transactions = TransactionsStore((state) => state.transactions);

  const getTransactions = TransactionsStore((state) => state.getTransactions);

  const getTransactionsByAccount = TransactionsStore(
    (state) => state.getTransactionsByAccount,
  );

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
     SEARCH
  ========================= */

  const handleSearch = async () => {
    if (!searchAccountId) {
      getTransactions();

      return;
    }

    await getTransactionsByAccount(searchAccountId);
  };

  /* =========================
     FILTERED
  ========================= */

  const filteredTransactions = useMemo(() => {
    return transactions;
  }, [transactions]);

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:justify-between
          lg:items-center
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
            Gestión de Transacciones
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
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
            bg-[#677750]
            px-4 py-2.5
            rounded-lg
            text-white
            text-sm
            sm:text-base
            hover:opacity-90
            transition
          "
        >
          + Nueva Transferencia
        </button>
      </div>

      {/* SEARCH */}

      <div
        className="
          bg-white
          border border-[#677750]/10
          rounded-xl
          shadow-sm
          p-4
          sm:p-5
          mb-6
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            gap-3
          "
        >
          <div className="flex-1 min-w-0">
            <label
              className="
                text-xs
                sm:text-sm
                text-[#677750]/60
                block
                mb-1
              "
            >
              Buscar por ID de cuenta origen
            </label>

            <input
              type="number"
              placeholder="Ej: 1"
              value={searchAccountId}
              onChange={(e) => setSearchAccountId(e.target.value)}
              className="
                w-full
                border
                border-[#677750]/20
                rounded-lg
                px-3 py-2.5
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
              md:w-auto
            "
          >
            <button
              onClick={handleSearch}
              className="
                w-full
                sm:w-auto
                px-4 py-2.5
                rounded-lg
                bg-[#677750]
                text-white
                text-sm
                hover:opacity-90
                transition
              "
            >
              Buscar
            </button>

            <button
              onClick={() => {
                setSearchAccountId("");

                getTransactions();
              }}
              className="
                w-full
                sm:w-auto
                px-4 py-2.5
                rounded-lg
                border
                border-[#677750]/20
                text-[#677750]
                text-sm
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

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* TABLE */}

      <div
        className="
          bg-white
          border border-[#677750]/10
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
            Historial de Transacciones
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
            "
          >
            Transferencias registradas en el sistema
          </p>
        </div>

        {/* MOBILE / TABLET */}

        <div className="block lg:hidden">
          {isLoading ? (
            <div
              className="
                  text-center
                  p-6
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
                          space-y-4
                        "
                >
                  {/* ID */}

                  <div>
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
                              break-words
                            "
                    >
                      #{transaction.id}
                    </p>
                  </div>

                  {/* TYPE + AMOUNT */}

                  <div
                    className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                          "
                  >
                    <span
                      className="
                              px-2 py-1
                              rounded-full
                              text-xs
                              font-medium
                              bg-[#677750]/10
                              text-[#677750]
                            "
                    >
                      {transaction.tipo}
                    </span>

                    <span
                      className="
                              text-green-600
                              font-semibold
                              text-sm
                            "
                    >
                      Q{transaction.monto}
                    </span>
                  </div>

                  {/* DETAILS */}

                  <div
                    className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-3
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
                        Cuenta Origen
                      </p>

                      <p
                        className="
                                text-sm
                                text-[#677750]/70
                              "
                      >
                        #{transaction.cuenta_origen_id}
                      </p>
                    </div>

                    <div>
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
                              "
                      >
                        #{transaction.cuenta_destino_id}
                      </p>
                    </div>

                    <div
                      className="
                              sm:col-span-2
                            "
                    >
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
                                break-words
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
                  text-center
                  p-6
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
            lg:block
            overflow-x-auto
          "
        >
          <table
            className="
              w-full
              min-w-[1200px]
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
                <th className="p-4">ID</th>

                <th className="p-4">Tipo</th>

                <th className="p-4">Cuenta Origen</th>

                <th className="p-4">Cuenta Destino</th>

                <th className="p-4">Monto</th>

                <th className="p-4">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="
                        text-center
                        p-6
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
                          "
                    >
                      #{transaction.id}
                    </td>

                    <td className="p-4">
                      <span
                        className="
                              px-2 py-1
                              rounded-full
                              text-xs
                              font-medium
                              bg-[#677750]/10
                              text-[#677750]
                            "
                      >
                        {transaction.tipo}
                      </span>
                    </td>

                    <td
                      className="
                            p-4
                            text-[#677750]/70
                          "
                    >
                      #{transaction.cuenta_origen_id}
                    </td>

                    <td
                      className="
                            p-4
                            text-[#677750]/70
                          "
                    >
                      #{transaction.cuenta_destino_id}
                    </td>

                    <td
                      className="
                            p-4
                            text-green-600
                            font-semibold
                          "
                    >
                      Q{transaction.monto}
                    </td>

                    <td
                      className="
                            p-4
                            text-[#677750]/60
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
                        text-center
                        p-6
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
