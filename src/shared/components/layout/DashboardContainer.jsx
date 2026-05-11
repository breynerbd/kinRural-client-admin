
import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const DashboardContainer = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#fffaf2] flex flex-col">

            {/* NAVBAR */}
            <Navbar
                onMenuToggle={() =>
                    setSidebarOpen(!sidebarOpen)
                }
            />

            <div className="flex flex-1">

                {/* SIDEBAR */}
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                />

                {/* CONTENIDO */}
                <main
                    className="
                        flex-1
                        p-3
                        sm:p-4
                        md:p-6
                        overflow-x-auto
                    "
                >

                    <div
                        className="
                            bg-white
                            border
                            border-[#677750]/10
                            rounded-xl
                            md:rounded-2xl
                            shadow-sm
                            p-3
                            sm:p-4
                            md:p-6
                            min-h-full
                            w-full
                        "
                    >
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
