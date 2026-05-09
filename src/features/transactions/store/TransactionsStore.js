// src/features/transactions/store/TransactionsStore.js

import { create } from "zustand";
import toast from "react-hot-toast";
import {
  getTransactions,
  createTransaction,
  getTransactionsByAccount,
} from "../../../shared/api";

export const TransactionsStore = create((set) => ({

  transactions: [],
  isLoading: false,

  /* =========================
     GET ALL
  ========================= */

  getTransactions: async () => {
    try {

      set({ isLoading: true });

      const { data } = await getTransactions();

      set({
        transactions: data,
        isLoading: false,
      });

    } catch (error) {

      set({ isLoading: false });

      toast.error(
        error?.response?.data?.message ||
        "Error al obtener transacciones"
      );
    }
  },

  /* =========================
     GET BY ACCOUNT
  ========================= */

  getTransactionsByAccount: async (accountId) => {
    try {

      set({ isLoading: true });

      const { data } = await getTransactionsByAccount(accountId);

      set({
        transactions: data,
        isLoading: false,
      });

    } catch (error) {

      set({ isLoading: false });

      toast.error(
        error?.response?.data?.message ||
        "Error al obtener transacciones"
      );
    }
  },

  /* =========================
     CREATE TRANSFER
  ========================= */

  createTransaction: async (formData) => {
    try {

      const payload = {
        cuenta_origen_id: Number(formData.cuenta_origen_id),
        cuenta_destino_id: Number(formData.cuenta_destino_id),
        monto: Number(formData.monto),
      };

      const { data } = await createTransaction(payload);

      set((state) => ({
        transactions: [
          data.transaction,
          ...state.transactions,
        ],
      }));

      toast.success("Transferencia realizada");

      return {
        ok: true,
      };

    } catch (error) {

      toast.error(
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Error al realizar transferencia"
      );

      return {
        ok: false,
      };
    }
  },

}));