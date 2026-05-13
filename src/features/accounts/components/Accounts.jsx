import { useEffect, useState } from "react";
import { AccountModal } from "./AccountModal.jsx";
import { useAccountStore } from "../store/accountStore";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchId, setSearchId] = useState("");

  const { accounts, getAccounts, deleteAccount, loading } = useAccountStore();

  // ================= MODAL =================

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ================= GET =================

  useEffect(() => {
    getAccounts(1);
  }, [getAccounts]);

  // ================= FILTER =================

  const filteredAccounts = accounts.filter((account) =>
    searchId === "" ? true : account.id.toString().includes(searchId),
  );

  // ================= DELETE =================

  const handleDelete = (id) => {
    showConfirmToast({
      title: "Eliminar cuenta",
      message: "¿Deseas eliminar esta cuenta?",
      onConfirm: async () => {
        try {
          await deleteAccount(id);

          showSuccess("Cuenta eliminada correctamente");
        } catch {
          showError("Error al eliminar cuenta");
        }
      },
    });
  };

  return (
    <div
      className="
        w-full
        min-w-0
        max-w-full
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
            Gestión de Cuentas
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
            "
          >
            Administra las cuentas del sistema
          </p>
        </div>

        <button
          onClick={openModal}
          className="
            w-full
            sm:w-auto
            shrink-0
            px-4
            py-2.5
            rounded-xl
            bg-[#677750]
            text-white
            text-sm
            sm:text-base
            hover:opacity-90
            transition
          "
        >
          + Crear Cuenta
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
            lg:flex-row
            gap-4
            lg:items-end
          "
        >
          <div className="min-w-0 flex-1">
            <label
              className="
                block
                text-xs
                sm:text-sm
                text-[#677750]/60
                mb-1
              "
            >
              Buscar cuenta por ID
            </label>

            <input
              type="number"
              placeholder="Ej: 1"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
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
                text-[#677750]
                focus:outline-none
                focus:ring-2
                focus:ring-[#677750]/30
              "
            />
          </div>

          <button
            onClick={() => setSearchId("")}
            className="
              w-full
              lg:w-auto
              lg:min-w-[120px]
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

      <AccountModal isOpen={isModalOpen} onClose={closeModal} />

      {/* CONTENT */}

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
            Lista de cuentas
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
            "
          >
            Cuentas registradas en el sistema
          </p>
        </div>

        {/* MOBILE + TABLET + LAPTOP */}

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
              Cargando cuentas...
            </div>
          ) : filteredAccounts.length > 0 ? (
            <div
              className="
                flex
                flex-col
                gap-4
                p-4
                sm:p-5
              "
            >
              {filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className="
                    w-full
                    min-w-0
                    border
                    border-[#677750]/10
                    rounded-2xl
                    p-4
                    sm:p-5
                    hover:bg-[#fffaf2]/50
                    transition
                    flex
                    flex-col
                    justify-between
                    gap-5
                  "
                >
                  {/* TOP */}

                  <div className="flex flex-col gap-4 flex-1 min-w-0">
                    {/* NUMBER */}

                    <div className="min-w-0">
                      <p
                        className="
                          text-xs
                          text-[#677750]/50
                          mb-1
                        "
                      >
                        Número de cuenta
                      </p>

                      <p
                        className="
                          text-sm
                          sm:text-base
                          font-semibold
                          text-[#677750]
                          break-all
                        "
                      >
                        {account.numero_cuenta}
                      </p>
                    </div>

                    {/* BADGES */}

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
                      <span
                        className={`
                          w-fit
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          ${
                            account.tipo === "AHORRO"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        `}
                      >
                        {account.tipo}
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
                        Q{account.saldo}
                      </span>
                    </div>

                    {/* USER */}

                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-4
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
                          Cuenta ID
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                            break-all
                          "
                        >
                          #{account.id}
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
                          Usuario ID
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                            break-all
                          "
                        >
                          #{account.user_id}
                        </p>
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
                      onClick={() => handleDelete(account.id)}
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
              No se encontraron cuentas
            </div>
          )}
        </div>

        {/* EXTRA LARGE TABLE */}

        <div className="hidden 2xl:block overflow-x-auto">
          <table className="w-full table-fixed text-sm min-w-[900px]">
            <thead
              className="
                bg-[#677750]/5
                text-[#677750]/70
                border-b
                border-[#677750]/10
              "
            >
              <tr>
                <th className="p-4 text-left w-[35%]">Número</th>

                <th className="p-4 text-left w-[15%]">Tipo</th>

                <th className="p-4 text-left w-[20%]">Saldo</th>

                <th className="p-4 text-left w-[15%]">Usuario</th>

                <th className="p-4 text-center w-[15%]">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="
                      text-center
                      p-8
                      text-[#677750]/60
                    "
                  >
                    Cargando cuentas...
                  </td>
                </tr>
              ) : filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <tr
                    key={account.id}
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
                        font-medium
                        text-[#677750]
                        break-all
                      "
                    >
                      {account.numero_cuenta}
                    </td>

                    <td className="p-4">
                      <span
                        className={`
                          px-2
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          ${
                            account.tipo === "AHORRO"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        `}
                      >
                        {account.tipo}
                      </span>
                    </td>

                    <td
                      className="
                        p-4
                        text-green-600
                        font-semibold
                        break-all
                      "
                    >
                      Q{account.saldo}
                    </td>

                    <td
                      className="
                        p-4
                        text-[#677750]/70
                        break-all
                      "
                    >
                      #{account.user_id}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(account.id)}
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
                    colSpan="5"
                    className="
                      text-center
                      p-8
                      text-[#677750]/60
                    "
                  >
                    No se encontraron cuentas
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
