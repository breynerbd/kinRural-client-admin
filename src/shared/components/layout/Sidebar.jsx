export const Sidebar = () => {
  // Items del menú basados en entidades Kinrural
  const items = [
    { label: "Usuarios" },
    { label: "Roles" },
    { label: "Cuentas" },
    { label: "Solicitudes de cuenta" },
    { label: "Préstamos" },
    { label: "Tarjetas" },
    { label: "Transacciones" },
  ];

  return (
    <aside className="w-60 bg-white border-r border-[#677750]/20 min-h-[calc(100vh-4rem)] p-4 shadow-sm relative">

      {/* Header sidebar */}
      <div className="mb-6 px-2">
        <p className="text-xs uppercase tracking-widest text-[#677750]/60">
          Navegación
        </p>
        <h2 className="text-sm font-semibold text-[#677750] mt-1">
          Panel Admin
        </h2>
      </div>

      {/* Items */}
      <nav>
        <ul className="space-y-1">

          {items.map((item, index) => {
            const isActive = index === 0; // placeholder activo en Usuarios

            return (
              <li key={item.label}>
                <div
                  className={`
                    flex items-center gap-2
                    px-4 py-2 rounded-lg
                    text-sm font-medium
                    cursor-pointer
                    transition-all duration-200
                    ${isActive
                      ? "bg-[#677750]/10 text-[#677750] shadow-sm"
                      : "text-[#677750]/80 hover:bg-[#677750]/5 hover:text-[#677750]"
                    }
                  `}
                >
                  {/* indicador */}
                  <span
                    className={`
                      w-1.5 h-1.5 rounded-full
                      ${isActive ? "bg-[#677750]" : "bg-[#677750]/30"}
                    `}
                  />
                  {item.label}
                </div>
              </li>
            );
          })}

        </ul>
      </nav>

      {/* Footer sidebar */}
      <div className="absolute bottom-4 w-52 px-2">
        <div className="bg-[#fffaf2] border border-[#677750]/10 rounded-xl p-3">
          <p className="text-xs text-[#677750]/70">
            Kinrural Admin
          </p>
          <p className="text-sm font-medium text-[#677750]">
            v1.0.0
          </p>
        </div>
      </div>

    </aside>
  );
};