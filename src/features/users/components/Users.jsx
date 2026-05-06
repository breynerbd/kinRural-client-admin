import { useState, useEffect } from "react";
import { useUsersStore } from "../store/useUsersStore";
import { UserModal } from "./UserModal.jsx";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import toast from "react-hot-toast";

export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState("");

  // Conecta con el store
  const { users, getUsers, deleteUser, pagination, loading, error } = useUsersStore();

  // Obtener usuarios al cargar
  useEffect(() => {
    getUsers(1);
  }, []);

  // Mostrar error con toast si existe
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Filtrar por ID
  const filteredUsers = users.filter((user) =>
    searchId === "" ? true : user.id.toString() === searchId
  );

  // Manejar eliminación de usuario con confirmación
  const handleDelete = (id) => {
    showConfirmToast({
      title: "Eliminar usuario",
      message: "¿Estás seguro de eliminar este usuario?",
      onConfirm: async () => {
        try {
          await deleteUser(id);
          toast.success("Usuario eliminado correctamente");
        } catch (err) {
          toast.error(err.response?.data?.message || "Error al eliminar usuario");
        }
      },
    });
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#677750]">Gestión de Usuarios</h1>
          <p className="text-sm text-[#677750]/70">Administra los usuarios del sistema</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#677750] px-4 py-2 rounded text-white hover:opacity-90 transition"
        >
          + Crear Usuario
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-[#677750]/60 block mb-1">
              Buscar usuario por ID
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
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* TABLE */}
      <div className="bg-white border border-[#677750]/10 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#677750]/10">
          <h2 className="text-lg font-semibold text-[#677750]">Lista de usuarios</h2>
          <p className="text-sm text-[#677750]/60">
            Información general de usuarios registrados
          </p>
        </div>

        <table className="w-full text-sm">
          <thead className="text-left text-[#677750]/60 border-b border-[#677750]/10">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Correo</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4">Ingresos</th>
              <th className="p-4">Rol</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/50 transition"
                >
                  <td className="p-4 font-medium text-[#677750]">
                    {user.nombre} {user.apellido}
                  </td>
                  <td className="p-4 text-[#677750]/70">{user.correo}</td>
                  <td className="p-4 text-[#677750]/70">{user.telefono}</td>
                  <td className="p-4 text-green-600 font-medium">
                    Q{user.ingresos_mensuales}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button className="px-3 py-1 text-xs rounded bg-[#677750] text-white hover:opacity-90">
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-[#677750]/60">
                  No se encontró ningún usuario con ese ID
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-2 p-4">
        <button
          disabled={pagination?.currentPage === 1}
          onClick={() => getUsers(pagination.currentPage - 1)}
        >
          Anterior
        </button>

        <span>
          Página {pagination?.currentPage} de {pagination?.totalPages}
        </span>

        <button
          disabled={pagination?.currentPage === pagination?.totalPages}
          onClick={() => getUsers(pagination.currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};