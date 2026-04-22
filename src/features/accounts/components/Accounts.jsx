import { useState } from "react";
import { AccountModal } from "./AccountModal.jsx";

export const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  // mock data (luego reemplazar con GET /accounts)
  const accounts = [
    {
      id: 1,
      tipo: "AHORRO",
      saldo: 1500,
      user: "Kenneth Mazariegos",
    },
    {
      id: 2,
      tipo: "MONETARIA",
      saldo: 3200,
      user: "Juan Pérez",
    },
  ];

  // filtro por ID
  const filteredAccounts = accounts.filter((account) =>
    searchId === "" ? true : account.id.toString() === searchId
  );
  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#677750]">
            Gestión de Cuentas
          </h1>
          <p className="text-sm text-[#677750]/70">
            Administra las cuentas del sistema
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#677750] px-4 py-2 rounded text-white hover:opacity-90 transition"
        >
          + Crear Cuenta
        </button>
      </div>

      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">

          <div className="flex-1">
            <label className="text-xs text-[#677750]/60 block mb-1">
              Buscar cuenta por ID
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
      <AccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* TABLE */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm overflow-hidden">

        {/* HEADER TABLA */}
        <div className="p-5 border-b border-[#677750]/10">
          <h2 className="text-lg font-semibold text-[#677750]">
            Lista de cuentas
          </h2>
          <p className="text-sm text-[#677750]/60">
            Cuentas registradas en el sistema
          </p>
        </div>

        <table className="w-full text-sm">

          <thead className="text-left text-[#677750]/60 border-b border-[#677750]/10">
            <tr>
              <th className="p-4">Tipo</th>
              <th className="p-4">Saldo</th>
              <th className="p-4">Usuario</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/50 transition"
                >
                  <td className="p-4 font-medium text-[#677750]">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${account.tipo === "AHORRO"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                      }`}>
                      {account.tipo}
                    </span>
                  </td>

                  <td className="p-4 text-green-600 font-medium">
                    Q{account.saldo}
                  </td>

                  <td className="p-4 text-[#677750]/70">
                    {account.user}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-[#677750]/60">
                  No se encontró ninguna cuenta con ese ID
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};