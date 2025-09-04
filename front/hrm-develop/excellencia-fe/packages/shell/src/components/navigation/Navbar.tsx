import { useState } from "react";
import TopNav from "./topNav";
import MainNav from "./mainNavigation";
import MegaMenu from "./megaMeny";
import MobileMenu from "./mobileMenu";

interface NavbarProps {
  onToggleView: (item: boolean) => void;
  sidebarExpanded?: boolean;
  toggleSidebar?: () => void;
}

export default function Navbar({ onToggleView }: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Combined Navigation Container */}
      <div className="flex items-stretch border-b border-gray-700">
        {/* Excellencia Logo - moved from sidebar */}
        <div className="flex items-center p-4 border-none border-gray-700 w-[255px] ml-[30px]">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-orange-500 mr-2 flex items-center justify-center rounded">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="font-semibold">Excellencia</span>
          </div>
        </div>
        
        {/* Main Navigation - takes up remaining space */}
        <div className="flex-1 flex items-stretch">
          <MainNav 
            activeMenu={activeMenu} 
            handleMenuClick={handleMenuClick} 
          />
          
          {/* Top Navigation (right side items) */}
          <div className="ml-auto flex items-center px-4 border-l border-gray-700">
            <TopNav 
              mobileMenuOpen={mobileMenuOpen} 
              setMobileMenuOpen={setMobileMenuOpen} 
              onToggleView={onToggleView}
            />
          </div>
        </div>
      </div>
      
      {/* Mega Menu Dropdown */}
      {activeMenu && (
        <MegaMenu 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
        />
      )}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu 
          activeMenu={activeMenu} 
          handleMenuClick={handleMenuClick} 
        />
      )}
    </div>
  );
}