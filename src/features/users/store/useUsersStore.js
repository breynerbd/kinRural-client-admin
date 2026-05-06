import { create } from "zustand";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../../../shared/api";

export const useUsersStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    getUsers: async (page = 1) => {
        try {
            set({ loading: true });

            const res = await getUsers(page);

            set({
                users: res.data.data,
                pagination: res.data.pagination,
                loading: false
            });

        } catch (e) {
            set({ error: "Error al obtener usuarios", loading: false });
        }
    },

    createUser: async (data) => {
        const res = await createUser(data);

        set((state) => ({
            users: [res.data.user, ...state.users]
        }));
    },

    updateUser: async (id, data) => {
        const res = await updateUser(id, data);

        set((state) => ({
            users: state.users.map(u =>
                u.id === id ? res.data.user : u
            )
        }));
    },

    deleteUser: async (id) => {
        await deleteUser(id);

        set((state) => ({
            users: state.users.filter(u => u.id !== id)
        }));
    }
}));