import {
  Users,
  Wallet,
  Landmark,
  ArrowRightLeft,
} from "lucide-react";

import { useDashboardStore } from "../store/dashboardStore";

export const StatsCards = () => {

  const {
    stats,
    loading,
  } = useDashboardStore();

  const items = [
    {
      title: "Usuarios",
      value: stats.users,
      icon: Users,
    },
    {
      title: "Cuentas",
      value: stats.accounts,
      icon: Wallet,
    },
    {
      title: "Préstamos",
      value: stats.loans,
      icon: Landmark,
    },
    {
      title: "Transacciones",
      value: stats.transactions,
      icon: ArrowRightLeft,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
    >

      {items.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              border
              border-[#677750]/10
              rounded-2xl
              p-5
              shadow-sm
            "
          >

            {loading ? (

              <div className="animate-pulse">

                <div
                  className="
                    h-3
                    w-20
                    rounded
                    bg-[#677750]/10
                  "
                />

                <div
                  className="
                    h-8
                    w-24
                    rounded
                    bg-[#677750]/10
                    mt-4
                  "
                />
              </div>

            ) : (

              <div className="flex justify-between items-center">

                <div>

                  <p
                    className="
                      text-sm
                      text-[#677750]/60
                    "
                  >
                    {item.title}
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-[#677750]
                      mt-2
                    "
                  >
                    {item.value}
                  </h2>
                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-[#677750]/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon className="text-[#677750]" />
                </div>

              </div>

            )}

          </div>
        );
      })}

    </div>
  );
};