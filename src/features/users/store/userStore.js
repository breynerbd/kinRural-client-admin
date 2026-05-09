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
    error: null,
    pagination: null,

    getUsers: async (page = 1, limit = 10) => {
        try {
            set({ loading: true, error: null });

            const response = await getUsersRequest(page, limit);

            set({
                users: response.data.data,
                pagination: response.data.pagination,
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error:
                    error.response?.data?.message ||
                    "Error al obtener usuarios",
            });
        }
    },

    createUser: async (data) => {
        try {
            set({ loading: true, error: null });

            const response = await createUserRequest(data);

            set((state) => ({
                users: [response.data.user, ...state.users],
                loading: false,
            }));
        } catch (error) {
            set({
                loading: false,
                error:
                    error.response?.data?.message ||
                    "Error al crear usuario",
            });

            throw error;
        }
    },

    updateUser: async (id, data) => {
        try {
            set({ loading: true, error: null });

            const response = await updateUserRequest(id, data);

            set((state) => ({
                users: state.users.map((user) =>
                    user.id === id ? response.data.user : user
                ),
                loading: false,
            }));
        } catch (error) {
            set({
                loading: false,
                error:
                    error.response?.data?.message ||
                    "Error al actualizar usuario",
            });

            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            set({ loading: true, error: null });

            await deleteUserRequest(id);

            set((state) => ({
                users: state.users.filter((user) => user.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                loading: false,
                error:
                    error.response?.data?.message ||
                    "Error al eliminar usuario",
            });

            throw error;
        }
    },
}));