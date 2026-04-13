import imgLogo from "../../../assets/img/kinrural_logo.png";

export const Navbar = () => {
    return (
        <nav className="bg-white/90 backdrop-blur-md border-b border-[#677750]/20 shadow-sm sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo + título */}
                <div className="flex items-center gap-3">

                    <img
                        src={imgLogo}
                        alt="Kinrural Logo"
                        className="h-9 md:h-10 w-auto object-contain"
                    />

                    <div className="leading-tight">
                        <h1 className="font-bold text-[#677750] text-lg md:text-xl">
                            Kinrural
                        </h1>
                        <p className="text-xs text-[#677750]/60 -mt-0.5">
                            Admin Dashboard
                        </p>
                    </div>

                </div>

                {/* User section */}
                <div className="flex items-center gap-4">

                    {/* User info */}
                    <div className="text-right hidden sm:block leading-tight">
                        <p className="text-sm font-semibold text-[#677750]">
                            Administrador
                        </p>
                        <p className="text-xs text-[#677750]/60">
                            Kinrural
                        </p>
                    </div>

                    {/* Avatar */}
                    <div className="relative group">

                        <div className="
                            w-10 h-10 rounded-full
                            bg-[#677750]/10
                            border border-[#677750]/20
                            flex items-center justify-center
                            font-bold text-[#677750]
                            cursor-pointer
                            transition
                            group-hover:scale-105
                        ">
                            A
                        </div>

                        {/* hover glow */}
                        <div className="absolute inset-0 rounded-full bg-[#677750]/10 blur-md opacity-0 group-hover:opacity-100 transition" />

                    </div>

                </div>

            </div>
        </nav>
    );
};