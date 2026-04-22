import { useState } from "react";

export const UserModal = ({ isOpen, onClose }) => {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dpi: "",
    correo: "",
    telefono: "",
    direccion: "",
    ingresos_mensuales: "",
    role_id: "",
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

      // 🔥 aquí conectas tu API real
      console.log("Enviando:", form);

      /*
      await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="p-5 text-white bg-[#677750]">
          <h2 className="text-2xl font-bold">
            Nuevo Usuario
          </h2>
          <p className="text-sm opacity-80">
            Completa la información del usuario
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-5 overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Nombre */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Nombre
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="input"
                placeholder="Ej. Kenneth"
              />
            </div>

            {/* Apellido */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Apellido
              </label>
              <input
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                className="input"
                placeholder="Ej. Mazariegos"
              />
            </div>

            {/* DPI */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                DPI
              </label>
              <input
                name="dpi"
                value={form.dpi}
                onChange={handleChange}
                className="input"
                placeholder="Ej. 1234567890101"
              />
            </div>

            {/* Correo */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Correo
              </label>
              <input
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="input"
                placeholder="correo@gmail.com"
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Teléfono
              </label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="input"
                placeholder="98765432"
              />
            </div>

            {/* Ingresos */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Ingresos mensuales
              </label>
              <input
                type="number"
                name="ingresos_mensuales"
                value={form.ingresos_mensuales}
                onChange={handleChange}
                className="input"
                placeholder="Q8000"
              />
            </div>

            {/* Dirección */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Dirección
              </label>
              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="input"
                placeholder="Zona 5"
              />
            </div>

            {/* Rol */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-[#677750] mb-1">
                Rol
              </label>
              <select
                name="role_id"
                value={form.role_id}
                onChange={handleChange}
                className="input"
              >
                <option value="">Seleccione un rol</option>
                <option value="1">Admin</option>
                <option value="2">Usuario</option>
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
              {loading ? "Creando..." : "Crear usuario"}
            </button>

          </div>
        </div>
      </div>

      {/* ESTILO BASE reutilizable */}
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