import { useNavigate } from "react-router-dom";

import {
  UserPlus,
  Wallet,
  Landmark,
  CreditCard,
  ArrowRightLeft,
  FileClock,
} from "lucide-react";

const actions = [
  {
    title: "Crear usuario",
    description: "Registrar nuevo cliente",
    icon: UserPlus,
    path: "/dashboard/users",
  },
  {
    title: "Nueva cuenta",
    description: "Crear cuenta bancaria",
    icon: Wallet,
    path: "/dashboard/accounts",
  },
  {
    title: "Aprobar préstamos",
    description: "Revisar solicitudes",
    icon: Landmark,
    path: "/dashboard/loans",
  },
  {
    title: "Gestionar tarjetas",
    description: "Administrar tarjetas",
    icon: CreditCard,
    path: "/dashboard/cards",
  },
  {
    title: "Transferencias",
    description: "Nueva transacción",
    icon: ArrowRightLeft,
    path: "/dashboard/transactions",
  },
  {
    title: "Solicitudes",
    description: "Revisar pendientes",
    icon: FileClock,
    path: "/dashboard/account-requests",
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-white
        border
        border-[#677750]/10
        rounded-2xl
        shadow-sm
        p-5
      "
    >
      {/* HEADER */}
      <div className="mb-5">
        <h2
          className="
            text-lg
            font-semibold
            text-[#677750]
          "
        >
          Acciones rápidas
        </h2>

        <p
          className="
            text-sm
            text-[#677750]/60
            mt-1
          "
        >
          Accesos directos del sistema
        </p>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="
                group
                w-full
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                border
                border-[#677750]/10
                hover:border-[#677750]/30
                hover:bg-[#677750]/5
                transition-all
                duration-200
              "
            >
              {/* ICON */}
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#677750]/10
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <Icon
                  className="
                    w-5
                    h-5
                    text-[#677750]
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1 text-left min-w-0">
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-[#677750]
                  "
                >
                  {action.title}
                </h3>

                <p
                  className="
                    text-xs
                    text-[#677750]/60
                    mt-0.5
                  "
                >
                  {action.description}
                </p>
              </div>

              {/* ARROW */}
              <div
                className="
                  text-[#677750]/40
                  group-hover:text-[#677750]
                  group-hover:translate-x-1
                  transition-all
                "
              >
                →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};