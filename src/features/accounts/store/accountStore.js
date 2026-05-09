import { create } from "zustand";
import toast from "react-hot-toast";

import {
  getAccounts,
  getAccountById,
  createAccount,
  deleteAccount,
} from "../../../shared/api/admin";

export const useAccountStore = create((set) => ({
  accounts: [],
  account: null,
  loading: false,
  error: null,

  // ================= GET ACCOUNTS =================
  getAccounts: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getAccounts();

      set({
        accounts: response.data.accounts || [],
      });

    } catch (error) {

      const message =
        error.response?.data?.message || "Error al obtener cuentas";

      set({ error: message });

      toast.error(message);

    } finally {
      set({ loading: false });
    }
  },

  // ================= GET ACCOUNT BY ID =================
  getAccountById: async (id) => {
    try {
      set({ loading: true, error: null });

      const response = await getAccountById(id);

      set({
        account: response.data.account,
      });

      return response.data.account;

    } catch (error) {

      const message =
        error.response?.data?.message || "Error al obtener cuenta";

      set({ error: message });

      toast.error(message);

    } finally {
      set({ loading: false });
    }
  },

  // ================= CREATE ACCOUNT =================
  createAccount: async (data) => {
    try {
      set({ loading: true, error: null });

      const response = await createAccount(data);

      set((state) => ({
        accounts: [response.data.account, ...state.accounts],
      }));

      toast.success("Cuenta creada correctamente");

      return response.data;

    } catch (error) {

      const message =
        error.response?.data?.message || "Error al crear cuenta";

      set({ error: message });

      toast.error(message);

      throw error;

    } finally {
      set({ loading: false });
    }
  },

  // ================= DELETE ACCOUNT =================
  deleteAccount: async (id) => {
    try {
      set({ loading: true, error: null });

      await deleteAccount(id);

      set((state) => ({
        accounts: state.accounts.filter(
          (account) => account.id !== id
        ),
      }));

      toast.success("Cuenta eliminada correctamente");

    } catch (error) {

      const message =
        error.response?.data?.message || "Error al eliminar cuenta";

      set({ error: message });

      toast.error(message);

      throw error;

    } finally {
      set({ loading: false });
    }
  },
}));