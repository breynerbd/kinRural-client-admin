import { create } from "zustand";
import {
  getTransactions,
  createTransaction,
  getTransactionsByAccount,
} from "../../../shared/api";

export const TransactionsStore = create((set) => ({
  transactions: [],
  isLoading: false,

  getTransactions: async () => {
    try {
      set({ isLoading: true });
      const { data } = await getTransactions();
      set({ transactions: data, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getTransactionsByAccount: async (accountId) => {
    try {
      set({ isLoading: true });
      const { data } = await getTransactionsByAccount(accountId);
      set({ transactions: data, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  createTransaction: async (formData) => {
    try {
      const payload = {
        cuenta_origen_id: Number(formData.cuenta_origen_id),
        cuenta_destino_id: Number(formData.cuenta_destino_id),
        monto: Number(formData.monto),
      };
      const { data } = await createTransaction(payload);
      set((state) => ({
        transactions: [data.transaction, ...state.transactions],
      }));
      return data;
    } finally {
      set({ isLoading: false });
    }
  },
}));
