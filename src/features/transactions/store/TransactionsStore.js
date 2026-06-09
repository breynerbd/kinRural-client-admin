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
      const res = await getTransactions();
      set({ transactions: res.data.transactions || [] });
    } finally {
      set({ isLoading: false });
    }
  },

  getTransactionsByAccount: async (accountId) => {
    try {
      set({ isLoading: true });
      const res = await getTransactionsByAccount(accountId);
      set({ transactions: res.data.transactions });
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
      const res = await createTransaction(payload);
      set((state) => ({
        transactions: [res.data.transaction, ...state.transactions],
      }));
      return { ok: true };
    } finally {
      set({ isLoading: false });
    }
  },
}));
