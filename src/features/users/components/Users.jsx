import { useEffect, useState } from "react";
import { useUsersStore } from "../store/userStore";
import { UserModal } from "./UserModal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const Users = () => {
  const { users, getUsers, deleteUser, loading } =
    useUsersStore();

  const [openModal, setOpenModal] = useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState("");

  const [minIncome, setMinIncome] =
    useState("");

  const [maxIncome, setMaxIncome] =
    useState("");

  // ================= LOAD =================

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // ================= FILTER =================

  const filteredUsers = users
    .filter((user) => {
      const fullName =
        `${user.nombre} ${user.apellido}`.toLowerCase();

      return (
        fullName.includes(search.toLowerCase()) ||
        user.correo
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.id?.toString().includes(search)
      );
    })
    .filter((user) => {
      if (
        roleFilter &&
        user.role_id.toString() !== roleFilter
      )
        return false;

      if (
        minIncome &&
        user.ingresos_mensuales <
          Number(minIncome)
      )
        return false;

      if (
        maxIncome &&
        user.ingresos_mensuales >
          Number(maxIncome)
      )
        return false;

      return true;
    });

  // ================= DELETE =================

  const handleDelete = (id, nombre) => {
    showConfirmToast({
      title: "Eliminar usuario",
      message: `¿Eliminar a ${nombre}?`,
      onConfirm: async () => {
        try {
          await deleteUser(id);

          showSuccess(
            "Usuario eliminado correctamente",
          );
        } catch {
          showError("Error al eliminar usuario");
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
            Gestión de Usuarios
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
            "
          >
            Administra los usuarios registrados
          </p>
        </div>

        <button
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
          onClick={() => {
            setSelectedUser(null);
            setOpenModal(true);
          }}
        >
          + Crear Usuario
        </button>
      </div>

      {/* SEARCH + FILTERS */}

{/* SEARCH + FILTERS */}

<div
  className="
    bg-white
    border border-[#677750]/10
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
    {/* SEARCH */}

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
        Buscar usuario
      </label>

      <input
        type="text"
        placeholder="Nombre, correo o ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          min-w-0
          border
          border-[#677750]/20
          rounded-xl
          px-3
          py-2.5
          text-sm
          sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-[#677750]/40
        "
      />
    </div>

    {/* ROL */}

    <div
      className="
        w-full
        xl:w-[180px]
        shrink-0
      "
    >
      <label
        className="
          text-xs
          sm:text-sm
          text-[#677750]/60
          block
          mb-1
        "
      >
        Rol
      </label>

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="
          w-full
          border
          border-[#677750]/20
          rounded-xl
          px-3
          py-2.5
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#677750]/40
        "
      >
        <option value="">Todos</option>

        <option value="1">
          ADMIN
        </option>

        <option value="2">
          USUARIO
        </option>
      </select>
    </div>

    {/* INGRESO MIN */}

    <div
      className="
        w-full
        xl:w-[180px]
        shrink-0
      "
    >
      <label
        className="
          text-xs
          sm:text-sm
          text-[#677750]/60
          block
          mb-1
        "
      >
        Ingreso mínimo
      </label>

      <input
        type="number"
        placeholder="Q0"
        value={minIncome}
        onChange={(e) =>
          setMinIncome(e.target.value)
        }
        className="
          w-full
          border
          border-[#677750]/20
          rounded-xl
          px-3
          py-2.5
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#677750]/40
        "
      />
    </div>

    {/* INGRESO MAX */}

    <div
      className="
        w-full
        xl:w-[180px]
        shrink-0
      "
    >
      <label
        className="
          text-xs
          sm:text-sm
          text-[#677750]/60
          block
          mb-1
        "
      >
        Ingreso máximo
      </label>

      <input
        type="number"
        placeholder="Q10000"
        value={maxIncome}
        onChange={(e) =>
          setMaxIncome(e.target.value)
        }
        className="
          w-full
          border
          border-[#677750]/20
          rounded-xl
          px-3
          py-2.5
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#677750]/40
        "
      />
    </div>

    {/* LIMPIAR */}

    <button
      onClick={() => {
        setSearch("");
        setRoleFilter("");
        setMinIncome("");
        setMaxIncome("");
      }}
      className="
        w-full
        xl:w-auto
        xl:min-w-[120px]
        shrink-0
        px-4
        py-2.5
        rounded-xl
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

      {/* MODAL */}

      <UserModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

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
            Lista de usuarios
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
            "
          >
            Usuarios registrados en el sistema
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
              Cargando usuarios...
            </div>
          ) : filteredUsers.length > 0 ? (
            <div
              className="
                flex
                flex-col
                gap-4
                p-4
                sm:p-5
              "
            >
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
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
                  {/* USER */}

                  <div className="space-y-4">
                    <div>
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        Usuario
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
                        {user.nombre}{" "}
                        {user.apellido}
                      </p>
                    </div>

                    {/* EMAIL */}

                    <div>
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
                          text-[#677750]/70
                          break-all
                        "
                      >
                        {user.correo}
                      </p>
                    </div>

                    {/* INFO */}

                    <div
                      className="
                        flex
                        flex-col
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
                          DPI
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                          "
                        >
                          {user.dpi}
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
                          Teléfono
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                          "
                        >
                          {user.telefono}
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
                          Ingresos
                        </p>

                        <p
                          className="
                            text-sm
                            text-green-600
                            font-semibold
                          "
                        >
                          Q
                          {
                            user.ingresos_mensuales
                          }
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
                          Rol
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
                          {user.role_id === 1
                            ? "ADMIN"
                            : "USUARIO"}
                        </span>
                      </div>
                    </div>

                    {/* ADDRESS */}

                    <div>
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        Dirección
                      </p>

                      <p
                        className="
                          text-sm
                          text-[#677750]/70
                          break-words
                        "
                      >
                        {user.direccion}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}

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
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenModal(true);
                      }}
                    >
                      Editar
                    </button>

                    <button
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
                      onClick={() =>
                        handleDelete(
                          user.id,
                          `${user.nombre} ${user.apellido}`,
                        )
                      }
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
              No hay usuarios registrados
            </div>
          )}
        </div>

        {/* TABLE XL */}

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
                <th className="p-4 w-[5%]">
                  ID
                </th>

                <th className="p-4 w-[15%]">
                  Nombre
                </th>

                <th className="p-4 w-[10%]">
                  DPI
                </th>

                <th className="p-4 w-[18%]">
                  Correo
                </th>

                <th className="p-4 w-[10%]">
                  Teléfono
                </th>

                <th className="p-4 w-[17%]">
                  Dirección
                </th>

                <th className="p-4 w-[10%]">
                  Ingresos
                </th>

                <th className="p-4 w-[7%]">
                  Rol
                </th>

                <th className="p-4 text-center w-[8%]">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="
                      text-center
                      p-8
                      text-[#677750]/60
                    "
                  >
                    Cargando usuarios...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="
                      border-b
                      border-[#677750]/5
                      hover:bg-[#fffaf2]/40
                      transition
                    "
                  >
                    <td className="p-4">
                      #{user.id}
                    </td>

                    <td
                      className="
                        p-4
                        font-medium
                        text-[#677750]
                      "
                    >
                      {user.nombre}{" "}
                      {user.apellido}
                    </td>

                    <td className="p-4">
                      {user.dpi}
                    </td>

                    <td
                      className="
                        p-4
                        break-all
                      "
                    >
                      {user.correo}
                    </td>

                    <td className="p-4">
                      {user.telefono}
                    </td>

                    <td
                      className="
                        p-4
                        break-words
                      "
                    >
                      {user.direccion}
                    </td>

                    <td
                      className="
                        p-4
                        text-green-600
                        font-semibold
                      "
                    >
                      Q
                      {
                        user.ingresos_mensuales
                      }
                    </td>

                    <td className="p-4">
                      <span
                        className="
                          px-2
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          bg-blue-100
                          text-blue-700
                        "
                      >
                        {user.role_id === 1
                          ? "ADMIN"
                          : "USUARIO"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div
                        className="
                          flex
                          flex-col
                          gap-2
                        "
                      >
                        <button
                          className="
                            px-3
                            py-2
                            rounded-lg
                            text-xs
                            bg-[#677750]
                            text-white
                            hover:opacity-90
                            transition
                          "
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenModal(true);
                          }}
                        >
                          Editar
                        </button>

                        <button
                          className="
                            px-3
                            py-2
                            rounded-lg
                            text-xs
                            bg-red-600
                            text-white
                            hover:bg-red-700
                            transition
                          "
                          onClick={() =>
                            handleDelete(
                              user.id,
                              `${user.nombre} ${user.apellido}`,
                            )
                          }
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
                    colSpan="9"
                    className="
                      text-center
                      p-8
                      text-[#677750]/60
                    "
                  >
                    No hay usuarios registrados
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