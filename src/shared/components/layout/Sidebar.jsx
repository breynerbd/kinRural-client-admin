import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const items = [
    { label: "Usuarios", path: "/dashboard/users" },
    { label: "Roles", path: "/dashboard/roles" },
    { label: "Cuentas", path: "/dashboard/accounts" },
    { label: "Solicitudes de cuenta", path: "/dashboard/account-requests" },
    { label: "Préstamos", path: "/dashboard/loans" },
    { label: "Tarjetas", path: "/dashboard/cards" },
    { label: "Transacciones", path: "/dashboard/transactions" },
  ];

  return (
    <aside
      className="
        w-full
        md:w-60
        bg-white
        border-b
        md:border-b-0
        md:border-r
        border-[#677750]/20
        md:min-h-[calc(100vh-5rem)]
        p-3
        sm:p-4
        shadow-sm
        relative
      "
    >

      {/* Header */}
      <div className="mb-4 sm:mb-6 px-1 sm:px-2">
        <p
          className="
            text-[10px]
            sm:text-xs
            uppercase
            tracking-widest
            text-[#677750]/60
          "
        >
          Navegación
        </p>

        <h2
          className="
            text-xs
            sm:text-sm
            font-semibold
            text-[#677750]
            mt-1
          "
        >
          Panel Admin
        </h2>
      </div>

      {/* Items */}
      <nav className="overflow-x-auto">
        <ul
          className="
            flex
            md:flex-col
            gap-2
            md:gap-1
            min-w-max
            md:min-w-0
          "
        >
          {items.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.label} className="flex-shrink-0 md:w-full">
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-2
                    px-3 sm:px-4
                    py-2
                    rounded-lg
                    text-xs
                    sm:text-sm
                    font-medium
                    whitespace-nowrap
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#677750]/10 text-[#677750] shadow-sm"
                        : "text-[#677750]/80 hover:bg-[#677750]/5 hover:text-[#677750]"
                    }
                  `}
                >
                  {/* indicador */}
                  <span
                    className={`
                      w-1.5 h-1.5 rounded-full flex-shrink-0
                      ${
                        isActive
                          ? "bg-[#677750]"
                          : "bg-[#677750]/30"
                      }
                    `}
                  />

                  <span className="truncate">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div
        className="
          hidden
          md:block
          absolute
          bottom-4
          left-4
          right-4
        "
      >
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