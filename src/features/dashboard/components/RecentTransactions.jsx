import { useEffect } from "react";

import {
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

import { useDashboardStore } from "../store/dashboardStore";

export const RecentTransactions = () => {

  const {
    recentTransactions,
    loading,
    loadDashboard,
  } = useDashboardStore();

  useEffect(() => {
    if (recentTransactions.length === 0) {
      loadDashboard();
    }
  }, []);

  return (
    <div
      className="
        bg-white
        border
        border-[#677750]/10
        rounded-2xl
        shadow-sm
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div
        className="
          p-5
          border-b
          border-[#677750]/10
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            text-[#677750]
          "
        >
          Transacciones recientes
        </h2>

        <p
          className="
            text-sm
            text-[#677750]/60
            mt-1
          "
        >
          Últimos movimientos registrados
        </p>
      </div>

      {/* CONTENT */}
      <div>

        {loading ? (

          <div className="divide-y divide-[#677750]/10">

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="
                  p-4
                  animate-pulse
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-[#677750]/10
                    "
                  />

                  <div className="space-y-2">
                    <div
                      className="
                        h-3
                        w-32
                        rounded
                        bg-[#677750]/10
                      "
                    />

                    <div
                      className="
                        h-2
                        w-20
                        rounded
                        bg-[#677750]/10
                      "
                    />
                  </div>
                </div>

                <div
                  className="
                    h-3
                    w-16
                    rounded
                    bg-[#677750]/10
                  "
                />
              </div>
            ))}

          </div>

        ) : recentTransactions.length > 0 ? (

          <div className="divide-y divide-[#677750]/10">

            {recentTransactions.map((transaction) => {

              const amount =
                Number(transaction.monto || 0);

              const isIncoming =
                amount >= 0;

              return (
                <div
                  key={transaction.id}
                  className="
                    p-4
                    flex
                    items-center
                    justify-between
                    gap-4
                    hover:bg-[#677750]/5
                    transition
                  "
                >

                  {/* LEFT */}
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      min-w-0
                    "
                  >

                    {/* ICON */}
                    <div
                      className={`
                        w-11
                        h-11
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        flex-shrink-0

                        ${
                          isIncoming
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }
                      `}
                    >
                      {isIncoming ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>

                    {/* INFO */}
                    <div className="min-w-0">

                      <h3
                        className="
                          text-sm
                          font-semibold
                          text-[#677750]
                          truncate
                        "
                      >
                        Transferencia #{transaction.id}
                      </h3>

<p className="text-xs text-[#677750]/60 mt-0.5 truncate">
   {" Origen: "}
  {transaction.cuenta_origen?.user?.nombre}
  {" "}
  {transaction.cuenta_origen?.user?.apellido}
  {" "}
  →
  {" "}
  {" Destino: "}
  {transaction.cuenta_destino?.user?.nombre}
  {" "}
  {transaction.cuenta_destino?.user?.apellido}
</p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right flex-shrink-0">

                    <p
                      className={`
                        text-sm
                        font-bold

                        ${
                          isIncoming
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      `}
                    >
                      Q{amount.toFixed(2)}
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-[#677750]/50
                        mt-0.5
                      "
                    >
                      {transaction.createdAt
                        ? new Date(
                            transaction.createdAt
                          ).toLocaleDateString()
                        : "Sin fecha"}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        ) : (

          <div
            className="
              p-10
              text-center
            "
          >

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-[#677750]/10
                flex
                items-center
                justify-center
              "
            >
              <ArrowUpRight
                className="
                  w-7
                  h-7
                  text-[#677750]/50
                "
              />
            </div>

            <h3
              className="
                mt-4
                text-sm
                font-semibold
                text-[#677750]
              "
            >
              No hay transacciones
            </h3>

            <p
              className="
                text-xs
                text-[#677750]/60
                mt-1
              "
            >
              Aún no existen movimientos registrados
            </p>
          </div>

        )}

      </div>
    </div>
  );
};