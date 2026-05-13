import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useDashboardStore } from "../store/dashboardStore";

export const Charts = () => {
  const { chartData, loading } = useDashboardStore();

  return (
    <div
      className="
        bg-white
        border
        border-[#677750]/10
        rounded-2xl
        p-5
        min-w-0
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-lg
            font-semibold
            text-[#677750]
          "
        >
          Transacciones por mes
        </h2>

        <p
          className="
            text-sm
            text-[#677750]/60
            mt-1
          "
        >
          Movimientos registrados
        </p>
      </div>

      {loading ? (
        <div
          className="
            w-full
            h-[320px]
            rounded-2xl
            animate-pulse
            bg-[#677750]/10
          "
        />
      ) : (
        <div className="w-full min-w-0 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#677750",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#677750",
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                }}
              />

              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#677750"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
