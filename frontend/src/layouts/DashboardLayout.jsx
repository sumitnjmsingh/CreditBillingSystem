import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          className={`
            flex-1
            p-8
            transition-all
            duration-300
            ${sidebarOpen ? "ml-20" : "ml-20"}
          `}
        >
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
