import { create } from "zustand";
import {
  getCards,
  updateCardStatus,
  activateCard,
  blockCard,
} from "../../../shared/api";

import toast from "react-hot-toast";

export const CardsStore = create((set) => ({

  cards: [],
  isLoading: false,

  /* =========================
     GET ALL
  ========================= */

  getCards: async () => {
    try {

      set({ isLoading: true });

      const { data } = await getCards();

      set({
        cards: data,
        isLoading: false,
      });

    } catch (error) {

      set({ isLoading: false });

      toast.error(
        error?.response?.data?.message ||
        "Error al obtener tarjetas"
      );
    }
  },

  /* =========================
     APPROVE / REJECT
  ========================= */

  approveCard: async (id, action) => {
    try {

      const { data } = await updateCardStatus(
        id,
        { action }
      );

      set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id
            ? {
                ...card,
                estado: action,
              }
            : card
        ),
      }));

      return data;

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Error al procesar tarjeta"
      );

      throw error;
    }
  },

  /* =========================
     ACTIVATE
  ========================= */

  activateCard: async (id) => {
    try {

      const { data } = await activateCard(id);

      set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id
            ? {
                ...card,
                estado: "ACTIVA",
              }
            : card
        ),
      }));

      return data;

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Error al activar tarjeta"
      );

      throw error;
    }
  },

  /* =========================
     BLOCK
  ========================= */

  blockCard: async (id) => {
    try {

      const { data } = await blockCard(
        id,
        {
          action: "BLOQUEADA",
        }
      );

      set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id
            ? {
                ...card,
                estado: "BLOQUEADA",
              }
            : card
        ),
      }));

      return data;

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Error al bloquear tarjeta"
      );

      throw error;
    }
  },

}));