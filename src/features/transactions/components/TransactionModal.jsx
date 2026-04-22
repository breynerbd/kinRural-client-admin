import { useState } from "react";

export const TransactionModal = ({ isOpen, onClose, onCreate }) => {

  const [form, setForm] = useState({
    cuenta_origen_id: "",
    cuenta_destino_id: "",
    monto: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onCreate(form); // 🔥 conecta con el padre

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="p-5 text-white bg-[#677750]">
          <h2 className="text-xl font-bold">
            Nueva Transferencia
          </h2>
          <p className="text-sm opacity-80">
            Ingresa los datos de la transferencia
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-4">

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#677750] mb-1">
              Cuenta origen
            </label>
            <input
              name="cuenta_origen_id"
              value={form.cuenta_origen_id}
              onChange={handleChange}
              className="input"
              placeholder="Ej. 1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#677750] mb-1">
              Cuenta destino
            </label>
            <input
              name="cuenta_destino_id"
              value={form.cuenta_destino_id}
              onChange={handleChange}
              className="input"
              placeholder="Ej. 2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#677750] mb-1">
              Monto
            </label>
            <input
              type="number"
              name="monto"
              value={form.monto}
              onChange={handleChange}
              className="input"
              placeholder="Q100"
            />
          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#677750]/10">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-lg text-white bg-[#677750] hover:opacity-90"
            >
              {loading ? "Procesando..." : "Transferir"}
            </button>

          </div>
        </div>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            padding: 8px 12px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            background: #f9fafb;
          }
          .input:focus {
            outline: none;
            border-color: #677750;
            box-shadow: 0 0 0 2px rgba(103, 119, 80, 0.2);
          }
        `}
      </style>
    </div>
  );
};