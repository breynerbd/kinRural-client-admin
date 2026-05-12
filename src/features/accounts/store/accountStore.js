import { create } from "zustand";
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

  getAccounts: async () => {
    try {
      set({ loading: true });
      const response = await getAccounts();
      set({ accounts: response.data.accounts || [] });
    } finally {
      set({ loading: false });
    }
  },

  getAccountById: async (id) => {
    try {
      set({ loading: true });
      const response = await getAccountById(id);
      set({ account: response.data.account });
      return response.data.account;
    } finally {
      set({ loading: false });
    }
  },

  createAccount: async (data) => {
    try {
      set({ loading: true });
      const response = await createAccount(data);
      set((state) => ({
        accounts: [response.data.account, ...state.accounts],
      }));
      return response.data;
    } finally {
      set({ loading: false });
    }
  },

  deleteAccount: async (id) => {
    try {
      set({ loading: true });
      await deleteAccount(id);
      set((state) => ({
        accounts: state.accounts.filter((account) => account.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },
}));