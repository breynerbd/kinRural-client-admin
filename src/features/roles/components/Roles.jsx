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

  const handleDelete = (id, nombre) => {
    showConfirmToast({
      title: "Eliminar rol",
      message: `¿Deseas eliminar el rol ${nombre}?`,
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
          xl:justify-between
          xl:items-center
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
            Gestión de Roles
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
            "
          >
            Administra los roles registrados
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="
            w-full
            sm:w-auto
            bg-[#677750]
            px-4
            py-2.5
            rounded-xl
            text-white
            text-sm
            sm:text-base
            hover:opacity-90
            transition
          "
        >
          + Crear Rol
        </button>
      </div>

      {/* MODAL */}

      <RoleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* CONTAINER */}

      <div
        className="
          bg-white
          border
          border-[#677750]/10
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >
        {/* HEADER */}

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
            Lista de Roles
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
            "
          >
            Roles registrados en el sistema
          </p>
        </div>

        {/* RESPONSIVE CARDS */}

        <div className="block 2xl:hidden">
          {loading ? (
            <div
              className="
                text-center
                p-8
                text-sm
                text-[#677750]/60
              "
            >
              Cargando roles...
            </div>
          ) : roles.length > 0 ? (
            <div
              className="
                flex
                flex-col
                gap-4
                p-4
                sm:p-5
              "
            >
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="
                    w-full
                    border
                    border-[#677750]/10
                    rounded-2xl
                    p-4
                    sm:p-5
                    hover:bg-[#fffaf2]/50
                    transition
                    flex
                    flex-col
                    gap-5
                  "
                >
                  {/* TOP */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                    "
                  >
                    {/* NAME */}

                    <div>
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        Nombre del Rol
                      </p>

                      <p
                        className="
                          text-sm
                          sm:text-base
                          font-semibold
                          text-[#677750]
                          break-words
                        "
                      >
                        {role.nombre}
                      </p>
                    </div>

                    {/* INFO */}

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-4
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
                            text-sm
                            font-medium
                            text-[#677750]
                          "
                        >
                          #{role.id}
                        </p>
                      </div>

                      {/* STATUS */}

                      <div>
                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Estado
                        </p>

                        <span
                          className="
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-blue-100
                            text-blue-700
                          "
                        >
                          ACTIVO
                        </span>
                      </div>
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
                      onClick={() => handleDelete(role.id, role.nombre)}
                      className="
                        w-full
                        sm:w-auto
                        px-4
                        py-2.5
                        rounded-xl
                        text-sm
                        font-medium
                        bg-red-600
                        text-white
                        hover:opacity-90
                        transition
                      "
                    >
                      Eliminar
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
                text-[#677750]/60
              "
            >
              No hay roles registrados
            </div>
          )}
        </div>

        {/* EXTRA LARGE TABLE */}

        <div className="hidden 2xl:block">
          <table className="w-full table-fixed text-sm">
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
                <th className="p-4 w-[15%]">ID</th>

                <th className="p-4 w-[45%]">Nombre del Rol</th>

                <th className="p-4 w-[20%]">Estado</th>

                <th className="p-4 text-center w-[20%]">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="
                      text-center
                      p-8
                      text-[#677750]/60
                    "
                  >
                    Cargando roles...
                  </td>
                </tr>
              ) : roles.length > 0 ? (
                roles.map((role) => (
                  <tr
                    key={role.id}
                    className="
                      border-b
                      border-[#677750]/5
                      hover:bg-[#fffaf2]/40
                      transition
                    "
                  >
                    <td
                      className="
                        p-4
                        text-[#677750]
                        font-medium
                      "
                    >
                      #{role.id}
                    </td>

                    <td
                      className="
                        p-4
                        font-medium
                        text-[#677750]
                        break-words
                      "
                    >
                      {role.nombre}
                    </td>

                    <td className="p-4">
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          bg-blue-100
                          text-blue-700
                        "
                      >
                        ACTIVO
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(role.id, role.nombre)}
                          className="
                            px-4
                            py-2
                            rounded-lg
                            text-xs
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
                  <td
                    colSpan="4"
                    className="
                      text-center
                      p-8
                      text-[#677750]/60
                    "
                  >
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
