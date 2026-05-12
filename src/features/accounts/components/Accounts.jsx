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

  // ================= FILTRO =================
  const filteredAccounts = accounts.filter((account) =>
    searchId === "" ? true : account.id.toString() === searchId,
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
          + Crear Cuenta
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
              Buscar cuenta por ID
            </label>

            <input
              type="number"
              placeholder="Ej: 1"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
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
              onClick={() => setSearchId("")}
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
      <AccountModal isOpen={isModalOpen} onClose={closeModal} />

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

        {/* MOBILE / TABLET */}
        <div className="block lg:hidden">
          {loading ? (
            <div
              className="
      text-center
      p-6
      text-sm
      text-[#677750]/60
    "
            >
              Cargando cuentas...
            </div>
          ) : filteredAccounts.length > 0 ? (
            <div className="divide-y divide-[#677750]/10">
              {filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className="
                        p-4
                        space-y-4
                      "
                >
                  {/* ACCOUNT NUMBER */}
                  <div>
                    <p
                      className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                    >
                      Número
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
                      {account.numero_cuenta}
                    </p>
                  </div>

                  {/* TYPE + BALANCE */}
                  <div
                    className="
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                  >
                    <span
                      className={`
                            px-2 py-1
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
                            font-semibold
                            text-sm
                          "
                    >
                      Q{account.saldo}
                    </span>
                  </div>

                  {/* USER */}
                  <div>
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
                          "
                    >
                      #{account.user_id}
                    </p>
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() => handleDelete(account.id)}
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
                  >
                    Eliminar
                  </button>
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
              {loading ? "Cargando cuentas..." : "No se encontraron cuentas"}
            </div>
          )}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">
          <table
            className="
              w-full
              text-sm
              min-w-[1000px]
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
                <th className="p-4">Número</th>

                <th className="p-4">Tipo</th>

                <th className="p-4">Saldo</th>

                <th className="p-4">Usuario ID</th>

                <th className="p-4 text-center">Acciones</th>
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
                      hover:bg-[#677750]/5
                      transition
                    "
                  >
                    <td
                      className="
                          p-4
                          font-medium
                          text-[#677750]
                          break-words
                        "
                    >
                      {account.numero_cuenta}
                    </td>

                    <td className="p-4">
                      <span
                        className={`
                            px-2 py-1
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
                          font-medium
                        "
                    >
                      Q{account.saldo}
                    </td>

                    <td
                      className="
                          p-4
                          text-[#677750]/70
                        "
                    >
                      #{account.user_id}
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
                          onClick={() => handleDelete(account.id)}
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
                  <td
                    colSpan="5"
                    className="
                        text-center
                        p-6
                        text-[#677750]/60
                      "
                  >
                    {loading
                      ? "Cargando cuentas..."
                      : "No se encontraron cuentas"}
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
