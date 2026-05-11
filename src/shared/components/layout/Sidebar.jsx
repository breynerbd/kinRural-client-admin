
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ open, setOpen }) => {

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
        <>
            {/* OVERLAY MOBILE */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="
                        fixed
                        inset-0
                        bg-black/30
                        z-40
                        lg:hidden
                    "
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed
                    top-0
                    left-0
                    z-50
                    h-screen
                    w-[280px]
                    bg-white
                    border-r
                    border-[#677750]/20
                    shadow-xl
                    transition-transform
                    duration-300

                    ${open ? "translate-x-0" : "-translate-x-full"}

                    lg:translate-x-0
                    lg:static
                    lg:w-64
                    lg:min-h-[calc(100vh-5rem)]
                    lg:shadow-sm
                `}
            >

                {/* HEADER */}
                <div className="p-4 border-b border-[#677750]/10">

                    <div className="flex items-center justify-between">

                        <div>
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-widest
                                    text-[#677750]/60
                                "
                            >
                                Navegación
                            </p>

                            <h2
                                className="
                                    text-sm
                                    font-semibold
                                    text-[#677750]
                                    mt-1
                                "
                            >
                                Panel Admin
                            </h2>
                        </div>

                        {/* CLOSE MOBILE */}
                        <button
                            onClick={() => setOpen(false)}
                            className="
                                lg:hidden
                                text-[#677750]
                                p-2
                                rounded-lg
                                hover:bg-[#677750]/10
                            "
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* ITEMS */}
                <nav className="p-3">

                    <ul className="flex flex-col gap-1">

                        {items.map((item) => {

                            const isActive =
                                location.pathname === item.path;

                            return (
                                <li key={item.label}>

                                    <Link
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        className={`
                                            flex
                                            items-center
                                            gap-3
                                            px-4
                                            py-3
                                            rounded-xl
                                            text-sm
                                            font-medium
                                            transition-all
                                            duration-200

                                            ${
                                                isActive
                                                    ? "bg-[#677750]/10 text-[#677750] shadow-sm"
                                                    : "text-[#677750]/80 hover:bg-[#677750]/5 hover:text-[#677750]"
                                            }
                                        `}
                                    >

                                        {/* INDICADOR */}
                                        <span
                                            className={`
                                                w-2
                                                h-2
                                                rounded-full
                                                flex-shrink-0

                                                ${
                                                    isActive
                                                        ? "bg-[#677750]"
                                                        : "bg-[#677750]/30"
                                                }
                                            `}
                                        />

                                        <span>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* FOOTER */}
                <div
                    className="
                        absolute
                        bottom-4
                        left-4
                        right-4
                    "
                >
                    <div
                        className="
                            bg-[#fffaf2]
                            border
                            border-[#677750]/10
                            rounded-xl
                            p-3
                        "
                    >
                        <p className="text-xs text-[#677750]/70">
                            Kinrural Admin
                        </p>

                        <p className="text-sm font-medium text-[#677750]">
                            v1.0.0
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};
