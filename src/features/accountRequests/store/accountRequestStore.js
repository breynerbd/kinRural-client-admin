import { create } from "zustand";
import {
  getAccountRequests as getAccountRequestsRequest,
  approveAccountRequest as approveAccountRequestRequest,
  rejectAccountRequest as rejectAccountRequestRequest,
} from "../../../shared/api";

export const useAccountRequestStore = create((set) => ({
  accountRequests: [],
  loading: false,
  actionLoading: false,

  getAccountRequests: async () => {
    try {
      set({ loading: true });
      const response = await getAccountRequestsRequest();
      set({ accountRequests: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  approveAccountRequest: async (id) => {
    try {
      set({ actionLoading: true });
      await approveAccountRequestRequest(id);
      set((state) => ({
        accountRequests: state.accountRequests.map((request) =>
          request.id === id ? { ...request, status: "APROBADA" } : request
        ),
        actionLoading: false,
      }));
    } catch (error) {
      set({ actionLoading: false });
      throw error;
    }
  },

  rejectAccountRequest: async (id) => {
    try {
      set({ actionLoading: true });
      await rejectAccountRequestRequest(id);
      set((state) => ({
        accountRequests: state.accountRequests.map((request) =>
          request.id === id ? { ...request, status: "RECHAZADA" } : request
        ),
        actionLoading: false,
      }));
    } catch (error) {
      set({ actionLoading: false });
      throw error;
    }
  },
}));