// features/dashboard/components/ExchangeWidget.jsx
import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "../store/dashboardStore";

const PARES = ["USD", "EUR", "MXN"];

export const ExchangeWidget = () => {
  const { exchangeRates, loading } = useDashboardStore();
  const navigate = useNavigate();

  const tasas = PARES.map((code) => ({
    code,
    rate: exchangeRates.find((m) => m.code === code)?.rate ?? null,
  }));

  return (
    <div className="bg-white border border-[#677750]/10 rounded-2xl p-5 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-[#677750]">
            Tasas de cambio
          </h2>
          <p className="text-xs text-[#677750]/60 mt-0.5">Base: GTQ</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/exchange")}
          className="text-xs px-3 py-1.5 rounded-lg border border-[#677750]/20 text-[#677750] hover:bg-[#677750]/10 transition"
        >
          Ver más
        </button>
      </div>

      {/* TASAS */}
      <div className="flex flex-col gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex justify-between items-center"
              >
                <div className="h-3 w-12 rounded bg-[#677750]/10" />
                <div className="h-3 w-20 rounded bg-[#677750]/10" />
              </div>
            ))
          : tasas.map(({ code, rate }) => (
              <div
                key={code}
                className="flex items-center justify-between py-2 border-b border-[#677750]/5 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-10 h-6 flex items-center justify-center rounded-md bg-[#677750]/10 text-xs font-bold text-[#677750]">
                    {code}
                  </span>
                  <span className="text-xs text-[#677750]/60">1 GTQ</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-[#677750]">
                    {rate?.toFixed(4) ?? "—"}
                  </span>
                  <span className="text-xs text-[#677750]/50 ml-1">{code}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
