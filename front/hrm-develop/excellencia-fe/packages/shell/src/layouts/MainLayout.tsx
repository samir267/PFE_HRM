import { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import OrganizationCard from "../components/organizationCard";
import Sidebar from "../components/sideBar/sideBar";
import { Outlet } from "react-router-dom";
import { MdOutlineMenuOpen, MdMenu } from "react-icons/md";

export default function Layout() {
  const [showOrganization, setShowOrganization] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  const toggleOrganization = () => {
    setShowOrganization(!showOrganization);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`flex h-screen ${showOrganization ? "bg-gray-500" : "bg-gray-100"}`}>
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Navbar - always visible, now contains the Excellencia logo */}
        <Navbar 
          onToggleView={toggleOrganization} 
          sidebarExpanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />

        {/* Toggle sidebar button */}
        <button 
          className="rounded-full bg-orange-500 hover:bg-orange-600 text-white fixed left-3 top-5 p-1 z-50 shadow-md transition-all duration-200 flex items-center justify-center"
          onClick={toggleSidebar}
          aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <div className={`transform transition-transform duration-300 ${sidebarExpanded ? "" : "rotate-180"}`}>
            <MdOutlineMenuOpen size={16} />
          </div>
        </button>
        
        {/* Content area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar */}
          <Sidebar isExpanded={sidebarExpanded} />
          
          {/* Main content */}
          <div className={`flex-1 overflow-auto transition-opacity duration-200 ${showOrganization ? "opacity-50" : ""}`}>
            <Outlet />
          </div>
          
          {/* Organization Card - appears below navbar */}
          {showOrganization && (
            <div className="fixed right-0 top-16 h-full w-80 bg-white shadow-lg z-40 border-l border-gray-200">
              <OrganizationCard
                organizationId="123"
                organizationName="Spi Efe"
                planType="Trial"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}