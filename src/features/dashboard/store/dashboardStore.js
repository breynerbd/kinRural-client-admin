import { create } from "zustand";

import {
  getUsers,
  getAccounts,
  getLoans,
  getTransactions,
  getCurrencies,
} from "../../../shared/api/admin";

export const useDashboardStore = create((set) => ({
  stats: {
    users: 0,
    accounts: 0,
    loans: 0,
    transactions: 0,
    totalMoneyMoved: 0,
    pendingLoans: 0,
    approvedLoans: 0,
  },

  recentTransactions: [],
  exchangeRates: [],

  chartData: [],

  loading: false,
  error: null,

  loadDashboard: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const [usersRes, accountsRes, loansRes, transactionsRes, ratesRes] =
        await Promise.all([
          getUsers(),
          getAccounts(),
          getLoans(),
          getTransactions(),
          getCurrencies(),
        ]);

      // USERS
      const users = usersRes?.data?.users || [];

      // ACCOUNTS
      const accounts = accountsRes?.data?.accounts || [];

      // LOANS
      const loans = loansRes?.data?.loans || [];

      // TRANSACTIONS
      const transactions = transactionsRes?.data?.transactions || [];

      //EXCHANGES

      const exchangeRates = ratesRes?.data?.monedas || [];

      // TOTAL MONEY MOVED
      const totalMoneyMoved = transactions.reduce(
        (acc, tx) => acc + Number(tx.monto || 0),
        0,
      );

      // LOAN STATES
      const pendingLoans = loans.filter(
        (loan) => loan.estado === "PENDIENTE",
      ).length;

      const approvedLoans = loans.filter(
        (loan) => loan.estado === "APROBADO",
      ).length;

      // RECENT TRANSACTIONS
      const recentTransactions = [...transactions]
        .sort(
          (a, b) =>
            new Date(b.fecha || b.createdAt) - new Date(a.fecha || a.createdAt),
        )
        .slice(0, 5);

      // CHART DATA
      const monthlyMap = {};

      transactions.forEach((tx) => {
        const date = new Date(tx.fecha || tx.createdAt);

        if (Number.isNaN(date.getTime())) {
          return;
        }

        const monthIndex = date.getMonth();

        if (!monthlyMap[monthIndex]) {
          monthlyMap[monthIndex] = {
            month: date.toLocaleString("es-GT", {
              month: "short",
            }),

            transactions: 0,

            order: monthIndex,
          };
        }

        monthlyMap[monthIndex].transactions += 1;
      });

      const chartData = Object.values(monthlyMap).sort(
        (a, b) => a.order - b.order,
      );

      set({
        stats: {
          users: users.length,

          accounts: accounts.length,

          loans: loans.length,

          transactions: transactions.length,

          totalMoneyMoved,

          pendingLoans,

          approvedLoans,
        },

        recentTransactions,

        chartData,

        exchangeRates,
      });
      console.log("TRANSACTIONS:", transactions);
      console.log("CHART DATA:", chartData);
    } catch (error) {
      console.error("Error loading dashboard:", error);

      set({
        error: error?.response?.data?.message || "Error al cargar dashboard",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  loadExchangeRates: async () => {
    try {
      const res = await getCurrencies();
      set({ exchangeRates: res.data.monedas });
    } catch {
      console.error("Error cargando tasas");
    }
  },
}));
