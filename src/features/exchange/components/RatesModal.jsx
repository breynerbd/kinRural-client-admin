// features/exchange/components/RatesModal.jsx
import { useState } from "react";

export const RatesModal = ({ isOpen, onClose, monedas, loading }) => {
  const [searchRate, setSearchRate] = useState("");

  const filteredRates = monedas.filter((m) =>
    m.code.toLowerCase().includes(searchRate.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#677750]/10 flex items-center justify-between gap-3 flex-shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[#677750]">
              Tasas de cambio
            </h2>
            <p className="text-xs sm:text-sm text-[#677750]/60 mt-1">
              Referencia base: GTQ
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#677750] p-2 rounded-lg hover:bg-[#677750]/10 transition flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* SEARCH */}
        <div className="p-4 sm:p-5 border-b border-[#677750]/10 flex-shrink-0">
          <input
            type="text"
            placeholder="Buscar moneda..."
            value={searchRate}
            onChange={(e) => setSearchRate(e.target.value)}
            className="w-full border border-[#677750]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#677750]/40"
          />
        </div>

        {/* CONTENT — scrollable */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {/* CARDS MOBILE */}
          <div className="block sm:hidden">
            {loading ? (
              <div className="text-center p-8 text-sm text-[#677750]/60">
                Cargando tasas...
              </div>
            ) : filteredRates.length > 0 ? (
              <div className="flex flex-col gap-3 p-4">
                {filteredRates.map((m) => (
                  <div
                    key={m.code}
                    className="border border-[#677750]/10 rounded-2xl p-4 flex justify-between items-center hover:bg-[#fffaf2]/50 transition"
                  >
                    <div>
                      <p className="text-xs text-[#677750]/50 mb-1">Moneda</p>
                      <p className="text-sm font-semibold text-[#677750]">
                        {m.code}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#677750]/50 mb-1">
                        Tasa (1 GTQ)
                      </p>
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {m.rate?.toFixed(4) ?? "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 text-sm text-[#677750]/60">
                No se encontraron monedas
              </div>
            )}
          </div>

          {/* TABLE DESKTOP */}
          <div className="hidden sm:block">
            <table className="w-full table-fixed text-sm">
              <thead className="text-left text-[#677750]/70 border-b border-[#677750]/10 bg-[#677750]/5">
                <tr>
                  <th className="p-4 w-[30%]">Código</th>
                  <th className="p-4 w-[40%]">Tasa (1 GTQ =)</th>
                  <th className="p-4 w-[30%]">Equivale a</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center p-8 text-[#677750]/60"
                    >
                      Cargando tasas...
                    </td>
                  </tr>
                ) : filteredRates.length > 0 ? (
                  filteredRates.map((m) => (
                    <tr
                      key={m.code}
                      className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/40 transition"
                    >
                      <td className="p-4 font-semibold text-[#677750]">
                        {m.code}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {m.rate?.toFixed(4) ?? "—"} {m.code}
                        </span>
                      </td>
                      <td className="p-4 text-[#677750]/70">
                        1 {m.code} = {m.rate ? (1 / m.rate).toFixed(4) : "—"}{" "}
                        GTQ
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center p-8 text-[#677750]/60"
                    >
                      No se encontraron monedas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 sm:p-5 border-t border-[#677750]/10 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl border border-[#677750]/20 text-[#677750] text-sm hover:bg-[#677750]/10 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
