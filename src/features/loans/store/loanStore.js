import { create } from "zustand";
import {
  getLoans,
  getLoanById,
  approveLoan,
  rejectLoan,
  payLoanInstallment,
  checkLoanMora,
} from "../../../shared/api/admin";

export const useLoanStore = create((set, get) => ({
  loans: [],
  selectedLoan: null,
  loading: false,

  getLoans: async () => {
    try {
      set({ loading: true });
      const response = await getLoans();
      set({ loans: response.data.loans || [] });
    } finally {
      set({ loading: false });
    }
  },

  getLoanById: async (id) => {
    try {
      set({ loading: true });
      const response = await getLoanById(id);
      set({ selectedLoan: response.data.loan });
      return response.data.loan;
    } finally {
      set({ loading: false });
    }
  },

  approveLoan: async (id) => {
    try {
      set({ loading: true });
      const response = await approveLoan(id);
      set((state) => ({
        loans: state.loans.map((loan) =>
          loan.id === id ? response.data.loan : loan
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },

  rejectLoan: async (id) => {
    try {
      set({ loading: true });
      const response = await rejectLoan(id);
      set((state) => ({
        loans: state.loans.map((loan) =>
          loan.id === id ? response.data.loan : loan
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },

  payLoanInstallment: async (installmentId) => {
    try {
      set({ loading: true });
      await payLoanInstallment(installmentId);
      await get().getLoans();
    } finally {
      set({ loading: false });
    }
  },

  checkLoanMora: async () => {
    try {
      set({ loading: true });
      await checkLoanMora();
      await get().getLoans();
    } finally {
      set({ loading: false });
    }
  },
}));