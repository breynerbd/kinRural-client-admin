import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-[#fffaf2] flex flex-col">

      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col md:flex-row flex-1">

        {/* Sidebar */}
        <div
          className="
            w-full
            md:w-auto
            md:min-h-full
          "
        >
          <Sidebar />
        </div>

        {/* Contenido dinámico */}
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