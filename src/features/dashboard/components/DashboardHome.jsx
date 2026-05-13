import { useEffect } from "react";

import { StatsCards } from "./StatsCard";
import { Charts } from "./Charts";
import { RecentTransactions } from "./RecentTransactions";
import { QuickActions } from "./QuickActions";

import { useDashboardStore } from "../store/dashboardStore";

export const DashboardHome = () => {
  const loadDashboard = useDashboardStore((state) => state.loadDashboard);

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-[#677750]
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-[#677750]/60
            mt-1
          "
        >
          Resumen general del sistema
        </p>
      </div>

      <StatsCards />

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          min-w-0
        "
      >
        <div
          className="
            xl:col-span-2
            min-w-0
          "
        >
          <Charts />
        </div>

        <div className="min-w-0">
          <QuickActions />
        </div>
      </div>

      <div className="min-w-0">
        <RecentTransactions />
      </div>
    </div>
  );
};
