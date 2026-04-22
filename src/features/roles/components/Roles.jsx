import { useState } from "react";
import { RoleModal } from "./RoleModal.jsx";

export const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // mock data (luego reemplazar con GET /roles)
  const roles = [
    {
      id: 1,
      nombre: "ADMIN",
    },
    {
      id: 2,
      nombre: "USER",
    },
  ];

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#677750]">
            Gestión de Roles
          </h1>
          <p className="text-sm text-[#677750]/70">
            Administra los roles del sistema
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#677750] px-4 py-2 rounded text-white hover:opacity-90 transition"
        >
          + Crear Rol
        </button>
      </div>

      {/* MODAL */}
      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* TABLE */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm overflow-hidden">

        {/* HEADER TABLA */}
        <div className="p-5 border-b border-[#677750]/10">
          <h2 className="text-lg font-semibold text-[#677750]">
            Lista de roles
          </h2>
          <p className="text-sm text-[#677750]/60">
            Roles registrados en el sistema
          </p>
        </div>

        <table className="w-full text-sm">

          <thead className="text-left text-[#677750]/60 border-b border-[#677750]/10">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/50 transition"
              >
                <td className="p-4 font-medium text-[#677750]">
                  {role.nombre}
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-center">

                    <button className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700">
                      Eliminar
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};