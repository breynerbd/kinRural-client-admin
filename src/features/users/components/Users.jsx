import { useEffect, useState } from "react";

import { useUsersStore } from "../store/userStore";

import { UserModal } from "./UserModal";

import { showConfirmToast } from "../../auth/components/ConfirmModal";

import {
  showError,
  showSuccess,
} from "../../../shared/utils/toast";

export const Users = () => {

  const {
    users,
    error,
    getUsers,
    deleteUser,
  } = useUsersStore();

  const [openModal, setOpenModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {

    if (error) {
      showError(error);
    }

  }, [error]);

  const filteredUsers = users.filter((user) => {

    const fullName =
      `${user.nombre} ${user.apellido}`.toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      user.correo
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.id
        ?.toString()
        .includes(search)
    );

  });

  const handleDelete = (id, nombre) => {

    showConfirmToast({
      title: "Eliminar usuario",
      message: `¿Eliminar a ${nombre}?`,
      onConfirm: async () => {

        try {

          await deleteUser(id);

          showSuccess(
            "Usuario eliminado correctamente"
          );

        } catch {

          showError(
            "Error al eliminar usuario"
          );

        }

      },
    });

  };

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
            px-4 py-2.5
            rounded-lg
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

        <input
          type="text"
          placeholder="Buscar por nombre, correo o ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
          "
        />

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
          border border-[#677750]/10
          rounded-xl
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

        {/* MOBILE / TABLET */}
        <div className="block lg:hidden">

          {
            filteredUsers.length > 0 ? (

              <div
                className="
                  divide-y
                  divide-[#677750]/10
                "
              >

                {
                  filteredUsers.map((user) => (

                    <div
                      key={user.id}
                      className="
                        p-4
                        space-y-4
                      "
                    >

                      {/* USER */}
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
                            font-semibold
                            text-[#677750]
                            text-sm
                            sm:text-base
                            break-words
                          "
                        >
                          {user.nombre} {user.apellido}
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
                            Q{user.ingresos_mensuales}
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
                              px-2 py-1
                              rounded-full
                              text-xs
                              font-medium
                              bg-blue-100
                              text-blue-700
                            "
                          >
                            {
                              user.role_id === 1
                                ? "ADMIN"
                                : "USUARIO"
                            }
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

                      {/* ACTIONS */}
                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          gap-2
                        "
                      >

                        <button
                          className="
                            w-full
                            sm:w-auto
                            px-4 py-2
                            text-sm
                            rounded-lg
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
                            px-4 py-2
                            text-sm
                            rounded-lg
                            bg-red-600
                            text-white
                            hover:bg-red-700
                            transition
                          "
                          onClick={() =>
                            handleDelete(
                              user.id,
                              `${user.nombre} ${user.apellido}`
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </div>

                    </div>

                  ))
                }

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
                No hay usuarios registrados
              </div>

            )
          }

        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">

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

                <th className="p-4 whitespace-nowrap">
                  ID
                </th>

                <th className="p-4 whitespace-nowrap">
                  Nombre
                </th>

                <th className="p-4 whitespace-nowrap">
                  DPI
                </th>

                <th className="p-4 whitespace-nowrap">
                  Correo
                </th>

                <th className="p-4 whitespace-nowrap">
                  Teléfono
                </th>

                <th className="p-4 whitespace-nowrap">
                  Dirección
                </th>

                <th className="p-4 whitespace-nowrap">
                  Ingresos
                </th>

                <th className="p-4 whitespace-nowrap">
                  Rol
                </th>

                <th className="p-4 text-center whitespace-nowrap">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredUsers.length > 0 ? (

                  filteredUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="
                        border-b
                        border-[#677750]/5
                        hover:bg-[#677750]/5
                        transition
                      "
                    >

                      <td
                        className="
                          p-4
                          text-[#677750]
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        #{user.id}
                      </td>

                      <td
                        className="
                          p-4
                          font-medium
                          text-[#677750]
                          whitespace-nowrap
                        "
                      >
                        {user.nombre} {user.apellido}
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                          whitespace-nowrap
                        "
                      >
                        {user.dpi}
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                          break-all
                        "
                      >
                        {user.correo}
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                          whitespace-nowrap
                        "
                      >
                        {user.telefono}
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                          min-w-[220px]
                          break-words
                        "
                      >
                        {user.direccion}
                      </td>

                      <td
                        className="
                          p-4
                          text-green-600
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        Q{user.ingresos_mensuales}
                      </td>

                      <td
                        className="
                          p-4
                          whitespace-nowrap
                        "
                      >

                        <span
                          className="
                            px-2 py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-blue-100
                            text-blue-700
                          "
                        >
                          {
                            user.role_id === 1
                              ? "ADMIN"
                              : "USUARIO"
                          }
                        </span>

                      </td>

                      <td className="p-4">

                        <div
                          className="
                            flex
                            gap-2
                            justify-center
                          "
                        >

                          <button
                            className="
                              px-3 py-1
                              text-xs
                              rounded
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
                              px-3 py-1
                              text-xs
                              rounded
                              bg-red-600
                              text-white
                              hover:bg-red-700
                              transition
                            "
                            onClick={() =>
                              handleDelete(
                                user.id,
                                `${user.nombre} ${user.apellido}`
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

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};