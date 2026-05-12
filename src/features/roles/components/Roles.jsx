import { useEffect, useState } from "react";
import { RoleModal } from "./RoleModal";
import { useRoleStore } from "../store/roleStore";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roles, getRoles, deleteRole, loading } = useRoleStore();

  // ================= LOAD =================
  useEffect(() => {
    getRoles();
  }, [getRoles]);

  // ================= DELETE =================
  const handleDelete = (id) => {
    showConfirmToast({
      title: "Eliminar rol",
      message: "¿Deseas eliminar este rol?",
      onConfirm: async () => {
        try {
          await deleteRole(id);
          showSuccess("Rol eliminado correctamente");
        } catch {
          showError("Error al eliminar rol");
        }
      },
    });
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#677750] break-words">
            Gestión de Roles
          </h1>

          <p className="text-xs sm:text-sm text-[#677750]/70 mt-1">
            Administra los roles del sistema
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="
            w-full sm:w-auto
            bg-[#677750]
            px-4 py-2.5
            rounded-lg
            text-sm sm:text-base
            text-white
            hover:opacity-90
            transition
          "
        >
          + Crear Rol
        </button>
      </div>

      {/* MODAL */}
      <RoleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* TABLE */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm overflow-hidden">
        {/* HEADER TABLA */}
        <div className="p-4 sm:p-5 border-b border-[#677750]/10">
          <h2 className="text-base sm:text-lg font-semibold text-[#677750]">
            Lista de Roles
          </h2>

          <p className="text-xs sm:text-sm text-[#677750]/60 mt-1">
            Roles registrados en el sistema
          </p>
        </div>

        {/* MOBILE / TABLET CARDS */}
        <div className="block lg:hidden">
          {loading ? (
            <div className="text-center p-6 text-sm text-[#677750]/60">
              Cargando roles...
            </div>
          ) : roles.length > 0 ? (
            <div className="divide-y divide-[#677750]/10">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="p-4 space-y-4 hover:bg-[#fffaf2]/50 transition"
                >
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-[#677750]/50">ID</p>

                      <p className="text-sm font-medium text-[#677750] break-all">
                        #{role.id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#677750]/50">Nombre</p>

                      <p className="text-sm font-semibold text-[#677750] break-words">
                        {role.nombre}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(role.id)}
                    className="
                      w-full
                      px-3 py-2
                      text-sm
                      rounded-lg
                      bg-red-600
                      text-white
                      hover:bg-red-700
                      transition
                    "
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 text-sm text-[#677750]/60">
              No hay roles registrados
            </div>
          )}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="text-left text-[#677750]/60 border-b border-[#677750]/10">
              <tr>
                <th className="p-4 whitespace-nowrap">ID</th>

                <th className="p-4 whitespace-nowrap">Nombre</th>

                <th className="p-4 text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-[#677750]/60">
                    Cargando roles...
                  </td>
                </tr>
              ) : roles.length > 0 ? (
                roles.map((role) => (
                  <tr
                    key={role.id}
                    className="
                      border-b border-[#677750]/5
                      hover:bg-[#fffaf2]/50
                      transition
                    "
                  >
                    <td className="p-4 text-[#677750]/70 whitespace-nowrap">
                      #{role.id}
                    </td>

                    <td className="p-4 font-medium text-[#677750] break-words">
                      {role.nombre}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="
                            px-3 py-1
                            text-xs
                            rounded
                            bg-red-600
                            text-white
                            hover:bg-red-700
                            transition
                          "
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-[#677750]/60">
                    No hay roles registrados
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
