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

  const {
    chartData,
    loading,
  } = useDashboardStore();

  return (
    <div
      className="
        bg-white
        border
        border-[#677750]/10
        rounded-2xl
        p-5
        h-[400px]
      "
    >

      <div className="mb-4">

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
            h-[300px]
            rounded-xl
            animate-pulse
            bg-[#677750]/10
          "
        />

      ) : (

        <ResponsiveContainer width="100%" height="85%">

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="transactions"
              stroke="#677750"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      )}

    </div>
  );
};