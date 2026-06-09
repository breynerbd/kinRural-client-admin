import { useState, useEffect } from "react";
import { useExchangeStore } from "../store/exchangeStore";
import { RatesModal } from "./RatesModal";

export const Exchange = () => {
  const {
    monedas,
    resultado,
    historial,
    loading,
    loadCurrencies,
    convert,
    clearHistorial,
  } = useExchangeStore();

  const [monto, setMonto] = useState("");
  const [origen, setOrigen] = useState("GTQ");
  const [destino, setDestino] = useState("USD");
  const [openRates, setOpenRates] = useState(false);

  useEffect(() => {
    loadCurrencies();
  }, []);

  const handleConvert = () => {
    if (!monto || isNaN(monto)) return;
    convert(monto, origen, destino);
  };

  const codes = monedas.map((m) => m.code);

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-3 sm:p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#677750] break-words">
            Conversor de Divisas
          </h1>
          <p className="text-xs sm:text-sm text-[#677750]/70 mt-1">
            Convierte montos entre diferentes monedas
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white border border-[#677750]/10 rounded-2xl shadow-sm p-4 sm:p-5 mb-6">
        <div className="flex flex-col xl:flex-row xl:items-end gap-4">
          {/* MONTO */}
          <div className="flex-1 min-w-0">
            <label className="text-xs sm:text-sm text-[#677750]/60 block mb-1">
              Monto
            </label>
            <input
              type="number"
              placeholder="Ej: 100"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full min-w-0 border border-[#677750]/20 rounded-xl px-3 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#677750]/40"
            />
          </div>

          {/* MONEDA ORIGEN */}
          <div className="w-full xl:w-[180px] shrink-0">
            <label className="text-xs sm:text-sm text-[#677750]/60 block mb-1">
              Moneda origen
            </label>
            <select
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              className="w-full border border-[#677750]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#677750]/40"
            >
              {codes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* ARROW */}
          <div className="hidden xl:flex items-end pb-3">
            <span className="text-[#677750] font-bold text-lg">→</span>
          </div>

          {/* MONEDA DESTINO */}
          <div className="w-full xl:w-[180px] shrink-0">
            <label className="text-xs sm:text-sm text-[#677750]/60 block mb-1">
              Moneda destino
            </label>
            <select
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="w-full border border-[#677750]/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#677750]/40"
            >
              {codes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* BOTONES */}
          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full xl:w-auto xl:min-w-[140px] shrink-0 bg-[#677750] px-4 py-2.5 rounded-xl text-white text-sm sm:text-base hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Convirtiendo..." : "Convertir"}
          </button>

          <button
            onClick={() => setOpenRates(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#677750]/20 text-[#677750] text-sm hover:bg-[#677750]/10 transition"
          >
            Ver tasas de cambio
          </button>
        </div>
      </div>

      {/* RESULTADO */}
      <div className="bg-white border border-[#677750]/10 rounded-2xl shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#677750]/10">
          <h2 className="text-base sm:text-lg font-semibold text-[#677750]">
            Resultado
          </h2>
          <p className="text-xs sm:text-sm text-[#677750]/60 mt-1">
            Conversión en tiempo real
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-5">
          {loading ? (
            <div className="text-center p-8 text-sm text-[#677750]/60">
              Calculando...
            </div>
          ) : resultado ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-[#677750]/50">Monto original</p>
                <p className="text-lg font-semibold text-[#677750]">
                  {Number(resultado.monto_original).toLocaleString("es-GT", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  {resultado.moneda_origen}
                </p>
              </div>

              <span className="text-[#677750]/40 text-2xl hidden sm:block">
                →
              </span>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-[#677750]/50">Monto convertido</p>
                <p className="text-2xl font-bold text-[#677750]">
                  {resultado.monto_convertido.toLocaleString("es-GT", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  {resultado.moneda_destino}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-[#677750]/50">Tasa de cambio</p>
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  1 {resultado.moneda_origen} = {resultado.tasa_cambio}{" "}
                  {resultado.moneda_destino}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-sm text-[#677750]/60">
              Ingresa un monto y selecciona las monedas para convertir
            </div>
          )}
        </div>
      </div>
      <RatesModal
        isOpen={openRates}
        onClose={() => setOpenRates(false)}
        monedas={monedas}
        loading={loading}
      />
      {/* HISTORIAL */}
      <div className="bg-white border border-[#677750]/10 rounded-2xl shadow-sm overflow-hidden mt-6">
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#677750]/10 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[#677750]">
              Historial de conversiones
            </h2>
            <p className="text-xs sm:text-sm text-[#677750]/60 mt-1">
              Últimas conversiones de la sesión
            </p>
          </div>
          {historial.length > 0 && (
            <button
              onClick={clearHistorial}
              className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 transition"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* CARDS MOBILE */}
        <div className="block sm:hidden">
          {historial.length > 0 ? (
            <div className="flex flex-col gap-3 p-4">
              {historial.map((h) => (
                <div
                  key={h.id}
                  className="border border-[#677750]/10 rounded-2xl p-4 flex flex-col gap-3 hover:bg-[#fffaf2]/50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-[#677750]/50 mb-1">
                        Conversión
                      </p>
                      <p className="text-sm font-semibold text-[#677750]">
                        {Number(h.monto_original).toLocaleString("es-GT", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        {h.moneda_origen} →{" "}
                        {h.monto_convertido.toLocaleString("es-GT", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        {h.moneda_destino}
                      </p>
                    </div>
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
                      {h.tasa_cambio}
                    </span>
                  </div>
                  <p className="text-xs text-[#677750]/50">{h.fecha}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-sm text-[#677750]/60">
              No hay conversiones en esta sesión
            </div>
          )}
        </div>

        {/* TABLE DESKTOP */}
        <div className="hidden sm:block">
          <table className="w-full table-fixed text-sm">
            <thead className="text-left text-[#677750]/70 border-b border-[#677750]/10 bg-[#677750]/5">
              <tr>
                <th className="p-4 w-[25%]">Fecha</th>
                <th className="p-4 w-[20%]">Monto original</th>
                <th className="p-4 w-[20%]">Monto convertido</th>
                <th className="p-4 w-[20%]">Par</th>
                <th className="p-4 w-[15%]">Tasa</th>
              </tr>
            </thead>
            <tbody>
              {historial.length > 0 ? (
                historial.map((h) => (
                  <tr
                    key={h.id}
                    className="border-b border-[#677750]/5 hover:bg-[#fffaf2]/40 transition"
                  >
                    <td className="p-4 text-[#677750]/70 text-xs">{h.fecha}</td>
                    <td className="p-4 font-medium text-[#677750]">
                      {Number(h.monto_original).toLocaleString("es-GT", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      {h.moneda_origen}
                    </td>
                    <td className="p-4 font-semibold text-[#677750]">
                      {h.monto_convertido.toLocaleString("es-GT", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      {h.moneda_destino}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#677750]/10 text-[#677750]">
                        {h.moneda_origen} → {h.moneda_destino}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {h.tasa_cambio}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-[#677750]/60">
                    No hay conversiones en esta sesión
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
