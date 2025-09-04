// components/MegaMenu.tsx
import { 
    FiCloud, 
    FiDatabase, 
    FiServer, 
    FiCode,
    FiDollarSign, 
    FiShoppingCart, 
    FiTruck, 
    FiUsers,
    FiCpu, 
    FiCreditCard, 
    FiShoppingBag, 
    FiZap,
    FiGrid, 
    FiGlobe
  } from "react-icons/fi";
  
  interface MegaMenuProps {
    activeMenu: string | null;
    setActiveMenu: (menu: string | null) => void;
  }
  
  const menuData = {
    excellenciaSuite: [
      { id: "business-suite", label: "Excellencia Business Suite", icon: <FiGlobe />, href: "#" },
      { id: "business-ai", label: "Business AI", icon: <FiCpu />, href: "#" },
      { id: "business-data-cloud", label: "Business Data Cloud", icon: <FiCloud />, href: "#" },
      { id: "cloud-erp", label: "Cloud ERP Applications", icon: <FiServer />, href: "#" },
      { id: "business-tech", label: "Business Technology Platform", icon: <FiCode />, href: "#" },
    ],
    businessSolutions: [
      { id: "business-solutions", label: "Business Solutions", icon: <FiDatabase />, href: "#" },
      { id: "financial-mgmt", label: "Financial Management", icon: <FiDollarSign />, href: "#" },
      { id: "spend-mgmt", label: "Spend Management", icon: <FiShoppingCart />, href: "#" },
      { id: "supply-chain", label: "Supply Chain Management", icon: <FiTruck />, href: "#" },
      { id: "human-capital", label: "Human Capital Management", icon: <FiUsers />, href: "#" },
    ],
    industrySolutions: [
      { id: "industry-solutions", label: "Industry Solutions", icon: <FiGrid />, href: "#" },
      { id: "automotive", label: "Automotive", icon: <FiUsers />, href: "#" },
      { id: "banking", label: "Banking", icon: <FiCreditCard />, href: "#" },
      { id: "consumer-products", label: "Consumer Products", icon: <FiShoppingBag />, href: "#" },
      { id: "oil-gas-energy", label: "Oil, Gas, and Energy", icon: <FiZap />, href: "#" },
      { id: "all-industries", label: "All Industries", icon: <FiGrid />, href: "#" },
    ]
  };
  
  export default function MegaMenu({ activeMenu, setActiveMenu }: MegaMenuProps) {
    return (
      <div 
        className="absolute left-0 w-full bg-gray-800 z-50 py-6 px-8 grid grid-cols-3 gap-8 border-t border-gray-700 shadow-xl"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {activeMenu === "solutions" && (
          <>
            <div>
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <FiGlobe className="mr-2 text-orange-500" />
                Excellencia Business Suite
              </h3>
              <ul className="space-y-3">
                {menuData.excellenciaSuite.slice(1).map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="flex items-center hidden md:block text-gray-300 hover:text-white text-sm transition-colors">
                      <span className="mr-2 text-gray-400">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <FiDatabase className="mr-2 text-orange-500" />
                Business Solutions
              </h3>
              <ul className="space-y-3">
                {menuData.businessSolutions.slice(1).map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="flex items-center hidden md:block text-gray-300 hover:text-white text-sm transition-colors">
                      <span className="mr-2 text-gray-400">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <FiGrid className="mr-2 text-orange-500" />
                Industry Solutions
              </h3>
              <ul className="space-y-3">
                {menuData.industrySolutions.slice(1).map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="flex items-center hidden md:block text-gray-300 hover:text-white text-sm transition-colors">
                      <span className="mr-2 text-gray-400">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        
        {activeMenu === "services" && (
          <div className="col-span-3">
            <h3 className="text-lg font-medium mb-6 text-white border-b border-gray-700 pb-2">Services & Support</h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  Services
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Consulting Services</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Implementation Services</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Managed Services</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Custom Development</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  Support
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Technical Support</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Customer Success</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Training & Certification</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">SLA Options</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  Resources
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Documentation</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Knowledge Base</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Community Forums</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">API Reference</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeMenu === "partners" && (
          <div className="col-span-3">
            <h3 className="text-lg font-medium mb-6 text-white border-b border-gray-700 pb-2">Partners & Ecosystem</h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  Partner Programs
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Partner Portal</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Become a Partner</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Partner Benefits</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Partner Tiers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  Partner Types
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Solution Providers</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Technology Partners</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Service Partners</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Resellers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  Ecosystem
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Marketplace</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Developer Network</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Partner Finder</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Integration Hub</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeMenu === "company" && (
          <div className="col-span-3">
            <h3 className="text-lg font-medium mb-6 text-white border-b border-gray-700 pb-2">Company</h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  About Us
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Our Story</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Leadership Team</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Corporate Responsibility</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Locations</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  News & Events
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Newsroom</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Events & Webinars</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Blog</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Press Releases</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-white flex items-center">
                  <span className="h-1 w-4 bg-orange-500 mr-2"></span>
                  Careers
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Open Positions</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Life at Excellencia</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Benefits</a></li>
                  <li><a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Internships</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }