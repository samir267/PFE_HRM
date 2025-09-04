// components/MainNav.tsx
import { FiChevronDown } from "react-icons/fi";

interface MainNavProps {
  activeMenu: string | null;
  handleMenuClick: (menuId: string) => void;
  
}

const mainNavItems = [
  { id: "solutions", label: "Solutions", subMenu: true },
  { id: "services", label: "Services & Support", subMenu: true },
  { id: "partners", label: "Partners & Ecosystem", subMenu: true },
  { id: "company", label: "Company", subMenu: true }
];

export default function MainNav({ activeMenu, handleMenuClick }: MainNavProps) {
  return (
    <div className="flex-1 flex bg-gray-900 ">
      {mainNavItems.map((item) => (
        <div key={item.id} className="relative group flex items-stretch ">
          <button 
            className={`flex items-center px-6 py-4 space-x-2 transition-colors ${
              activeMenu === item.id 
                ? 'text-orange-500 hover:text-orange-400' 
                : 'text-white hover:text-gray-300'
            }`}
            onClick={() => handleMenuClick(item.id)}
          >
            <span className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">{item.label}</span>
            {item.subMenu && (
              <FiChevronDown 
                size={16} 
                className={
                  activeMenu === item.id 
                    ? "transform rotate-180 transition-transform" 
                    : "transition-transform"
                } 
              />
            )}
          </button>
          
          {/* Hover indicator */}
          {activeMenu === item.id && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
          )}
        </div>
      ))}
    </div>
  );
}