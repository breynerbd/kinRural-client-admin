import imgLogo from "../../../assets/img/kinrural_logo.png";
import { AvatarUser } from "../ui/AvatarUser.jsx";
import { useAuthStore } from "../../../features/auth/store/authStore.js";

export const Navbar = () => {

    const user = useAuthStore((state) => state.user);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[60] border-b border-[#EADDCA]/60 shadow-sm">

            <div
                className="
                    w-full
                    mx-auto
                    px-3
                    sm:px-4
                    md:px-6
                    h-16
                    sm:h-18
                    md:h-20
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                {/* SECCIÓN IZQUIERDA */}
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        sm:gap-3
                        md:gap-4
                        group
                        cursor-pointer
                        min-w-0
                    "
                >
                    <div
                        className="
                            bg-[#FDF8F3]
                            p-1.5
                            sm:p-2
                            rounded-lg
                            sm:rounded-xl
                            border
                            border-[#EADDCA]
                            transition-transform
                            group-hover:scale-105
                            shadow-sm
                            flex-shrink-0
                        "
                    >
                        <img
                            src={imgLogo}
                            alt="KINRURAL Logo"
                            className="
                                h-7
                                sm:h-8
                                md:h-10
                                w-auto
                                object-contain
                            "
                        />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <h1
                            className="
                                font-black
                                text-[#4A3728]
                                text-sm
                                sm:text-lg
                                md:text-xl
                                tracking-tighter
                                leading-none
                                truncate
                            "
                        >
                            KINRURAL
                        </h1>

                        <span
                            className="
                                text-[8px]
                                sm:text-[9px]
                                md:text-[10px]
                                font-bold
                                text-[#8B4513]
                                uppercase
                                tracking-[0.15em]
                                sm:tracking-[0.2em]
                                mt-1
                                truncate
                            "
                        >
                            Management System
                        </span>
                    </div>
                </div>

                {/* SECCIÓN DERECHA */}
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        sm:gap-4
                        md:gap-6
                        flex-shrink-0
                    "
                >

                    {/* Notificaciones */}
                    <button
                        className="
                            relative
                            group
                            p-2
                            sm:p-2.5
                            text-[#8B4513]
                            hover:bg-[#FDF8F3]
                            rounded-lg
                            sm:rounded-xl
                            transition-all
                            duration-300
                            border
                            border-transparent
                            hover:border-[#EADDCA]
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="
                                w-5
                                h-5
                                sm:w-6
                                sm:h-6
                                group-hover:rotate-12
                                transition-transform
                            "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>

                        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>

                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-600 border border-white"></span>
                        </span>
                    </button>

                    {/* Divisor */}
                    <div className="hidden sm:block h-8 w-[1px] bg-[#EADDCA]"></div>

                    {/* Perfil */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        <div className="text-right hidden md:block">
                            <p className="text-xs font-black text-[#4A3728] truncate max-w-[180px]">
                                {user?.username || "Administrador"}
                            </p>

                            <p className="text-[10px] font-bold text-[#D2B48C] uppercase tracking-wider">
                                {user?.role || "Gerencia"}
                            </p>
                        </div>

                        <AvatarUser />
                    </div>
                </div>
            </div>
        </nav>
    );
};