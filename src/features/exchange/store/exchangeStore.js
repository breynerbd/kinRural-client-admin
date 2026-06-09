// exchangeStore.js
import { create } from "zustand";
import { convertCurrency, getCurrencies } from "../../../shared/api/admin";

export const useExchangeStore = create((set, get) => ({
  monedas: [],
  resultado: null,
  historial: [], // ✅ agregar
  loading: false,
  error: null,

  loadCurrencies: async () => {
    try {
      set({ loading: true, error: null });
      const res = await getCurrencies();
      set({ monedas: res.data.monedas });
    } catch {
      set({ error: "Error al cargar monedas." });
    } finally {
      set({ loading: false });
    }
  },

  convert: async (monto, moneda_origen, moneda_destino) => {
    try {
      set({ loading: true, error: null, resultado: null });
      const res = await convertCurrency(monto, moneda_origen, moneda_destino);
      const resultado = res.data;

      // ✅ agregar al historial
      const nuevaEntrada = {
        id: Date.now(),
        fecha: new Date().toLocaleString("es-GT"),
        ...resultado,
      };

      set({
        resultado,
        historial: [nuevaEntrada, ...get().historial].slice(0, 20), // máximo 20
      });
    } catch {
      set({ error: "Error al convertir." });
    } finally {
      set({ loading: false });
    }
  },

  clearHistorial: () => set({ historial: [] }), // ✅ agregar
}));
