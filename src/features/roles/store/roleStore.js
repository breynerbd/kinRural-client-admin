import { create } from "zustand";
import { getRoles, createRole, deleteRole } from "../../../shared/api/admin";

export const useRoleStore = create((set) => ({
  roles: [],
  loading: false,

  getRoles: async () => {
    try {
      set({ loading: true });
      const response = await getRoles();
      set({ roles: response.data.roles || [], loading: false });
    } finally {
      set({ loading: false });
    }
  },

  createRole: async (data) => {
    try {
      set({ loading: true });
      const response = await createRole(data);
      set((state) => ({
        roles: [response.data.role, ...state.roles],
        loading: false,
      }));
      return response.data;
    } finally {
      set({ loading: false });
    }
  },

  deleteRole: async (id) => {
    try {
      set({ loading: true });
      await deleteRole(id);
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
        loading: false,
      }));
    } finally {
      set({ loading: false });
    }
  },
}));