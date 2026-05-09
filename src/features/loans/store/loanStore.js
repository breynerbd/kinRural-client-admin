import { create } from "zustand";
import toast from "react-hot-toast";

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
  error: null,

  // =========================
  // GET ALL LOANS
  // =========================
  getLoans: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getLoans();

      set({
        loans: response.data.loans || [],
      });

    } catch (error) {

      set({
        error:
          error.response?.data?.message ||
          "Error al obtener préstamos",
      });

    } finally {
      set({ loading: false });
    }
  },

  // =========================
  // GET LOAN BY ID
  // =========================
  getLoanById: async (id) => {
    try {

      set({ loading: true, error: null });

      const response = await getLoanById(id);

      set({
        selectedLoan: response.data.loan,
      });

      return response.data.loan;

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Error al obtener préstamo";

      set({ error: message });

      toast.error(message);

    } finally {
      set({ loading: false });
    }
  },

  // =========================
  // APPROVE LOAN
  // =========================
  approveLoan: async (id) => {
    try {

      set({ loading: true, error: null });

      const response = await approveLoan(id);

      set((state) => ({
        loans: state.loans.map((loan) =>
          loan.id === id
            ? response.data.loan
            : loan
        ),
      }));

      toast.success("Préstamo aprobado");

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Error al aprobar préstamo";

      set({ error: message });

      toast.error(message);

      throw error;

    } finally {
      set({ loading: false });
    }
  },

  // =========================
  // REJECT LOAN
  // =========================
  rejectLoan: async (id) => {
    try {

      set({ loading: true, error: null });

      const response = await rejectLoan(id);

      set((state) => ({
        loans: state.loans.map((loan) =>
          loan.id === id
            ? response.data.loan
            : loan
        ),
      }));

      toast.success("Préstamo rechazado");

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Error al rechazar préstamo";

      set({ error: message });

      toast.error(message);

      throw error;

    } finally {
      set({ loading: false });
    }
  },

  // =========================
  // PAY INSTALLMENT
  // =========================
  payLoanInstallment: async (installmentId) => {
    try {

      set({ loading: true, error: null });

      const response = await payLoanInstallment(
        installmentId
      );

      toast.success(
        response.data.message ||
        "Cuota pagada correctamente"
      );

      // refrescar lista
      await get().getLoans();

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Error al pagar cuota";

      set({ error: message });

      toast.error(message);

      throw error;

    } finally {
      set({ loading: false });
    }
  },

  // =========================
  // CHECK MORA
  // =========================
  checkLoanMora: async () => {
    try {

      set({ loading: true, error: null });

      await checkLoanMora();

      toast.success("Mora actualizada");

      await get().getLoans();

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Error al verificar mora";

      set({ error: message });

      toast.error(message);

    } finally {
      set({ loading: false });
    }
  },
}));