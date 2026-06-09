// src/features/auth/store/authStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

import { login as loginRequest } from "../../../shared/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      expiresAt: null,
      loading: false,
      error: null,
      isLoadingAuth: true,
      isAuthenticated: false,

      checkAuth: () => {
        const token = get().token;
        const role = get().user?.role;
        const isAdmin = role === "ADMIN" || role === "MASTER_ADMIN";

        if (token && !isAdmin) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            isAuthenticated: false,
            isLoadingAuth: false,
            error: "No autorizado para acceder al panel de administración",
          });
        } else {
          set({
            isLoadingAuth: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          expiresAt: null,
          isAuthenticated: false,
          error: null,
        });
      },

      login: async ({ identifier, password }) => {
        try {
          set({
            loading: true,
            error: null,
          });

          const { data } = await loginRequest({
            identifier,
            password,
          });

          const token = data.accessToken || data.token;

          const decoded = jwtDecode(token);
          console.log("TOKEN DECODIFICADO:", decoded);

          const role =
            decoded.role ||
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          const username = decoded.username;
          const userEmail = decoded.email;

          if (role !== "ADMIN" && role !== "MASTER_ADMIN") {
            const message =
              "No autorizado para acceder al panel de administración";

            set({
              user: null,
              token: null,
              refreshToken: null,
              expiresAt: null,
              isAuthenticated: false,
              isLoadingAuth: false,
              loading: false,
              error: message,
            });

            return {
              success: false,
              error: message,
            };
          }

          set({
            user: {
              username,
              email: userEmail,
              role,
            },
            token,
            refreshToken: data.refreshToken,
            expiresAt: data.expiresIn || data.expiresAt,
            isAuthenticated: true,
            error: null,
            loading: false,
            isLoadingAuth: false,
          });

          return {
            success: true,
          };
        } catch (error) {
          const message =
            error?.response?.data?.message || "Error al iniciar sesión";

          set({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            isAuthenticated: false,
            loading: false,
            isLoadingAuth: false,
            error: message,
          });

          return {
            success: false,
            error: message,
          };
        }
      },
    }),
    {
      name: "auth-store",
    },
  ),
);
