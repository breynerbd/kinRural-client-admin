import { create } from "zustand";
import {
  getTransactions,
  createTransaction,
  createDeposit,
  createWithdraw,
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
      set({ transactions: res.data.transactions || [] });
    } finally {
      set({ isLoading: false });
    }
  },

  createTransaction: async (formData) => {
    try {
      set({ isLoading: true });
      const { tipo, monto, cuenta_origen_id, cuenta_destino_id } = formData;

      let res;
      const montoNum = Number(monto);
      const idOrigen = cuenta_origen_id ? Number(cuenta_origen_id) : null;
      const idDestino = cuenta_destino_id ? Number(cuenta_destino_id) : null;

      // Despacho inteligente según el tipo de transacción al endpoint correcto
      if (tipo === "DEPOSITO") {
        const payload = {
          tipo,
          monto: montoNum,
          cuenta_destino_id: idDestino,
        };
        res = await createDeposit(payload);
      } else if (tipo === "RETIRO") {
        const payload = {
          tipo,
          monto: montoNum,
          cuenta_origen_id: idOrigen,
        };
        res = await createWithdraw(payload);
      } else {
        // TRANSFERENCIA convencional
        const payload = {
          tipo,
          monto: montoNum,
          cuenta_origen_id: idOrigen,
          cuenta_destino_id: idDestino,
        };
        res = await createTransaction(payload);
      }

      set((state) => ({
        transactions: [res.data.transaction, ...state.transactions],
      }));
      return { ok: true };
    } catch (error) {
      // Registramos el error en consola para depuración
      if (error.response && error.response.data) {
        console.error(
          "ALERTA BACKEND ->",
          JSON.stringify(error.response.data, null, 2),
        );
      } else {
        console.error(error);
      }

      // RELANZAR el error para que useFormSubmit lo capture y muestre el toast
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
