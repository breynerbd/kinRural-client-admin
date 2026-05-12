import { create } from "zustand";
import {
  getUsers as getUsersRequest,
  createUser as createUserRequest,
  updateUser as updateUserRequest,
  deleteUser as deleteUserRequest,
} from "../../../shared/api";

export const useUsersStore = create((set) => ({
  users: [],
  loading: false,
  pagination: null,

  getUsers: async (page = 1, limit = 10) => {
    try {
      set({ loading: true });
      const response = await getUsersRequest(page, limit);
      set({
        users: response.data.data,
        pagination: response.data.pagination,
      });
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (data) => {
    try {
      set({ loading: true });
      const response = await createUserRequest(data);
      set((state) => ({
        users: [response.data.user, ...state.users],
      }));
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (id, data) => {
    try {
      set({ loading: true });
      const response = await updateUserRequest(id, data);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? response.data.user : user
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    try {
      set({ loading: true });
      await deleteUserRequest(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },
}));