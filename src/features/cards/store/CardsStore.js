import { create } from "zustand";
import { getCards, updateCardStatus, activateCard, blockCard } from "../../../shared/api";

export const CardsStore = create((set) => ({
  cards: [],
  isLoading: false,

  getCards: async () => {
    try {
      set({ isLoading: true });
      const { data } = await getCards();
      set({ cards: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  approveCard: async (id, action) => {
    try {
      const { data } = await updateCardStatus(id, { action });
      set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id ? { ...card, estado: action } : card
        ),
      }));
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  activateCard: async (id) => {
    try {
      const { data } = await activateCard(id);
      set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id ? { ...card, estado: "ACTIVA" } : card
        ),
      }));
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  blockCard: async (id) => {
    try {
      const { data } = await blockCard(id, { action: "BLOQUEADA" });
      set((state) => ({
        cards: state.cards.map((card) =>
          card.id === id ? { ...card, estado: "BLOQUEADA" } : card
        ),
      }));
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));