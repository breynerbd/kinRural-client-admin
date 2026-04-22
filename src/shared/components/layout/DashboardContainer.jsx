import { Outlet } from "react-router-dom";
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

        {/* Contenido dinámico */}
        <main className="flex-1 p-6">
          <div className="bg-white border border-[#677750]/10 rounded-2xl shadow-sm p-6 min-h-full">

            <Outlet /> {/* 🔥 aquí se renderizan las rutas */}

          </div>
        </main>

      </div>
    </div>
  );
};