import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const DashboardContainer = () => {
    return (
        <div className="min-h-screen bg-[#fffaf2] flex flex-col">

            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1">

                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <main className="flex-1 p-6">
                    <div className="bg-white border border-[#677750] rounded-2xl shadow-lg p-6 min-h-full animate-fade-in">
                        
                        {/* Contenido del menú */}
                        <h1 className="text-2xl font-bold text-[#677750] mb-4">
                            Dashboard
                        </h1>

                        <div className="text-[#677750] text-sm">
                            Contenido del menú
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
};