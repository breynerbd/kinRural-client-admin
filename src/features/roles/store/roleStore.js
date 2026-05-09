import { create } from "zustand";
import toast from "react-hot-toast";

import {
  getRoles,
  createRole,
  deleteRole,
} from "../../../shared/api/admin";

export const useRoleStore = create((set) => ({
  roles: [],
  loading: false,
  error: null,

  // ================= GET ROLES =================
  getRoles: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getRoles();

      set({
        roles: response.data.roles || [],
        loading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: error.response?.data?.message || "Error obteniendo roles",
        loading: false,
      });

      toast.error("Error obteniendo roles");
    }
  },

  // ================= CREATE ROLE =================
  createRole: async (data) => {
    try {

      set({ loading: true, error: null });

      const response = await createRole(data);

      set((state) => ({
        roles: [response.data.role, ...state.roles],
        loading: false,
      }));

      toast.success("Rol creado correctamente");

      return response.data;

    } catch (error) {

      console.error(error);

      const message =
        error.response?.data?.message || "Error creando rol";

      set({
        error: message,
        loading: false,
      });

      toast.error(message);

      throw error;
    }
  },

  // ================= DELETE ROLE =================
  deleteRole: async (id) => {
    try {

      set({ loading: true, error: null });

      await deleteRole(id);

      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
        loading: false,
      }));

      toast.success("Rol eliminado correctamente");

    } catch (error) {

      console.error(error);

      const message =
        error.response?.data?.message || "Error eliminando rol";

      set({
        error: message,
        loading: false,
      });

      toast.error(message);

      throw error;
    }
  },
}));