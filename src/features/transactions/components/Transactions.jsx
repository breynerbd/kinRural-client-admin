import { useState } from "react";
import { TransactionModal } from "./TransactionModal.jsx";

export const Transactions = () => {
  const [searchAccountId, setSearchAccountId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      cuenta_origen_id: 1,
      cuenta_destino_id: 2,
      monto: 100,
      fecha: "2026-04-20",
    },
    {
      id: 2,
      cuenta_origen_id: 2,
      cuenta_destino_id: 1,
      monto: 250,
      fecha: "2026-04-21",
    },
    {
      id: 3,
      cuenta_origen_id: 2,
      cuenta_destino_id: 3,
      monto: 100,
      fecha: "2026-04-20",
    },
  ]);

  // 🔍 FILTRO POR CUENTA (ORIGEN O DESTINO)
  const filteredTransactions = transactions.filter((tx) =>
    searchAccountId === ""
      ? true
      : tx.cuenta_origen_id.toString() === searchAccountId ||
      tx.cuenta_destino_id.toString() === searchAccountId
  );

  const handleCreate = async (data) => {
    try {
      console.log("Creando transacción:", data);

      setTransactions((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          fecha: new Date().toISOString().split("T")[0],
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#677750]">
            Gestión de Transacciones
          </h1>
          <p className="text-sm text-[#677750]/70">
            Administra las transferencias del sistema
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#677750] px-4 py-2 rounded text-white hover:opacity-90 transition"
        >
          + Nueva Transferencia
        </button>
      </div>

      {/* 🔍 BUSCADOR */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">

          <div className="flex-1">
            <label className="text-xs text-[#677750]/60 block mb-1">
              Buscar transacciones por ID de cuenta
            </label>

            <input
              type="number"
              placeholder="Ej: 1"
              value={searchAccountId}
              onChange={(e) => setSearchAccountId(e.target.value)}
              className="w-full border border-[#677750]/20 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-[#677750]/40
              text-[#677750]"
            />
          </div>

          <div className="flex gap-2 mt-2 md:mt-5">
            <button
              onClick={() => setSearchAccountId("")}
              className="px-4 py-2 rounded-lg border border-[#677750]/20 
              text-[#677750] hover:bg-[#677750]/10 transition text-sm"
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
        onCreate={handleCreate}
      />

      {/* TABLE */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-[#677750]/10">
          <h2 className="text-lg font-semibold text-[#677750]">
            Historial de transacciones
          </h2>
          <p className="text-sm text-[#677750]/60">
            Transferencias realizadas en el sistema
          </p>
        </div>

        <table className="w-full text-sm">

          <thead className="text-left text-[#677750]/60 border-b border-[#677750]/10">
            <tr>
              <th className="p-4">Cuenta origen</th>
              <th className="p-4">Cuenta destino</th>
              <th className="p-4">Monto</th>
              <th className="p-4">Fecha</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/50 transition"
                >
                  <td className="p-4 text-[#677750]">
                    #{tx.cuenta_origen_id}
                  </td>

                  <td className="p-4 text-[#677750]">
                    #{tx.cuenta_destino_id}
                  </td>

                  <td className="p-4 text-green-600 font-medium">
                    Q{tx.monto}
                  </td>

                  <td className="p-4 text-[#677750]/60">
                    {tx.fecha}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-[#677750]/60">
                  No se encontraron transacciones para esa cuenta
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};