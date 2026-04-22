import { useState } from "react";

export const AccountModal = ({ isOpen, onClose }) => {

  const [form, setForm] = useState({
    tipo: "",
    saldo: "",
    user_id: "",
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
      if (!form.tipo || !form.saldo || !form.user_id) return;

      setLoading(true);

      // 🔥 conectar API real aquí
      console.log("Enviando:", form);

      /*
      await fetch("/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          saldo: Number(form.saldo),
          user_id: Number(form.user_id),
        }),
      });
      */

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="p-5 text-white bg-[#677750]">
          <h2 className="text-2xl font-bold">
            Nueva Cuenta
          </h2>
          <p className="text-sm opacity-80">
            Completa la información de la cuenta
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Tipo */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Tipo de cuenta
              </label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seleccione tipo</option>
                <option value="AHORRO">Ahorro</option>
                <option value="MONETARIA">Monetaria</option>
              </select>
            </div>

            {/* Saldo */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Saldo inicial
              </label>
              <input
                type="number"
                name="saldo"
                value={form.saldo}
                onChange={handleChange}
                className="input"
                placeholder="Q1500"
              />
            </div>

            {/* Usuario */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Usuario
              </label>
              <select
                name="user_id"
                value={form.user_id}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seleccione usuario</option>

                {/* 🔥 luego reemplazar con GET /users */}
                <option value="1">Kenneth Mazariegos</option>
                <option value="2">Juan Pérez</option>

              </select>
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#677750]/10">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-lg text-white font-medium bg-[#677750] hover:opacity-90 transition shadow"
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>

          </div>
        </div>
      </div>

      {/* ESTILO BASE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 8px 12px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            background: #f9fafb;
            transition: all 0.2s;
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