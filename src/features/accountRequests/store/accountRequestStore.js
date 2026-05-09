// src/features/accountRequests/store/accountRequestStore.js

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
  error: null,

  // =========================
  // GET REQUESTS
  // =========================
  getAccountRequests: async () => {
    try {

      set({
        loading: true,
        error: null,
      });

      const response =
        await getAccountRequestsRequest();

      set({
        accountRequests: response.data,
        loading: false,
      });

    } catch (error) {

      set({
        loading: false,
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error al obtener solicitudes",
      });

    }
  },

  // =========================
  // APPROVE REQUEST
  // =========================
  approveAccountRequest: async (id) => {
    try {

      set({
        actionLoading: true,
        error: null,
      });

      await approveAccountRequestRequest(id);

      set((state) => ({
        accountRequests:
          state.accountRequests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status: "APROBADA",
                }
              : request
          ),

        actionLoading: false,
      }));

    } catch (error) {

      set({
        actionLoading: false,
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error al aprobar solicitud",
      });

      throw error;

    }
  },

  // =========================
  // REJECT REQUEST
  // =========================
  rejectAccountRequest: async (id) => {
    try {

      set({
        actionLoading: true,
        error: null,
      });

      await rejectAccountRequestRequest(id);

      set((state) => ({
        accountRequests:
          state.accountRequests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status: "RECHAZADA",
                }
              : request
          ),

        actionLoading: false,
      }));

    } catch (error) {

      set({
        actionLoading: false,
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error al rechazar solicitud",
      });

      throw error;

    }
  },

}));