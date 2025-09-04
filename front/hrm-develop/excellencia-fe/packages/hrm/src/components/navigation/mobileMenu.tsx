// components/MobileMenu.tsx
import { 
    FiGlobe, 
    FiDatabase, 
    FiGrid,
    FiChevronDown 
  } from "react-icons/fi";
  
  interface MobileMenuProps {
    activeMenu: string | null;
    handleMenuClick: (menuId: string) => void;
  }
  
  const mobileMenuData = {
    solutions: {
      excellenciaSuite: [
        { id: "business-ai", label: "Business AI", href: "#" },
        { id: "business-data-cloud", label: "Business Data Cloud", href: "#" },
        { id: "cloud-erp", label: "Cloud ERP Applications", href: "#" },
        { id: "business-tech", label: "Business Technology Platform", href: "#" },
      ],
      businessSolutions: [
        { id: "financial-mgmt", label: "Financial Management", href: "#" },
        { id: "spend-mgmt", label: "Spend Management", href: "#" },
        { id: "supply-chain", label: "Supply Chain Management", href: "#" },
        { id: "human-capital", label: "Human Capital Management", href: "#" },
      ],
      industrySolutions: [
        { id: "automotive", label: "Automotive", href: "#" },
        { id: "banking", label: "Banking", href: "#" },
        { id: "consumer-products", label: "Consumer Products", href: "#" },
        { id: "oil-gas-energy", label: "Oil, Gas, and Energy", href: "#" },
      ]
    },
    services: [
      { id: "consulting", label: "Consulting Services", href: "#" },
      { id: "implementation", label: "Implementation Services", href: "#" },
      { id: "technical-support", label: "Technical Support", href: "#" },
      { id: "training", label: "Training & Certification", href: "#" },
    ],
    partners: [
      { id: "partner-portal", label: "Partner Portal", href: "#" },
      { id: "become-partner", label: "Become a Partner", href: "#" },
      { id: "partner-types", label: "Partner Types", href: "#" },
      { id: "marketplace", label: "Marketplace", href: "#" },
    ],
    company: [
      { id: "about", label: "About Us", href: "#" },
      { id: "leadership", label: "Leadership", href: "#" },
      { id: "newsroom", label: "Newsroom", href: "#" },
      { id: "careers", label: "Careers", href: "#" },
    ]
  };
  
  export default function MobileMenu({ activeMenu, handleMenuClick }: MobileMenuProps) {
    return (
      <div className="md:hidden bg-gray-800 max-h-[calc(100vh-64px)] overflow-y-auto">
        <div className="px-4 py-2">
          <ul className="space-y-1">
            <li className="py-2">
              <button 
                className="flex items-center justify-between w-full text-left"
                onClick={() => handleMenuClick("solutions")}
              >
                <span className="font-medium">Solutions</span>
                <FiChevronDown 
                  size={16} 
                  className={
                    activeMenu === "solutions" 
                      ? "transform rotate-180 transition-transform" 
                      : "transition-transform"
                  } 
                />
              </button>
              
              {activeMenu === "solutions" && (
                <div className="mt-2 ml-4 space-y-4">
                  <div>
                    <h4 className="font-medium flex items-center text-sm text-gray-300">
                      <FiGlobe className="mr-2" />
                      Excellencia Business Suite
                    </h4>
                    <ul className="ml-6 mt-2 space-y-2">
                      {mobileMenuData.solutions.excellenciaSuite.map((item) => (
                        <li key={item.id}>
                          <a href={item.href} className="block text-gray-400 hover:text-white text-sm transition-colors">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium flex items-center text-sm text-gray-300">
                      <FiDatabase className="mr-2" />
                      Business Solutions
                    </h4>
                    <ul className="ml-6 mt-2 space-y-2">
                      {mobileMenuData.solutions.businessSolutions.map((item) => (
                        <li key={item.id}>
                          <a href={item.href} className="block text-gray-400 hover:text-white text-sm transition-colors">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium flex items-center text-sm text-gray-300">
                      <FiGrid className="mr-2" />
                      Industry Solutions
                    </h4>
                    <ul className="ml-6 mt-2 space-y-2">
                      {mobileMenuData.solutions.industrySolutions.map((item) => (
                        <li key={item.id}>
                          <a href={item.href} className="block text-gray-400 hover:text-white text-sm transition-colors">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
            
            <li className="py-2">
              <button 
                className="flex items-center justify-between w-full text-left"
                onClick={() => handleMenuClick("services")}
              >
                <span className="font-medium">Services & Support</span>
                <FiChevronDown 
                  size={16} 
                  className={
                    activeMenu === "services" 
                      ? "transform rotate-180 transition-transform" 
                      : "transition-transform"
                  } 
                />
              </button>
              
              {activeMenu === "services" && (
                <div className="mt-2 ml-4 space-y-2">
                  {mobileMenuData.services.map((item) => (
                    <a 
                      key={item.id} 
                      href={item.href} 
                      className="block py-1 text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
            
            <li className="py-2">
              <button 
                className="flex items-center justify-between w-full text-left"
                onClick={() => handleMenuClick("partners")}
              >
                <span className="font-medium">Partners & Ecosystem</span>
                <FiChevronDown 
                  size={16} 
                  className={
                    activeMenu === "partners" 
                      ? "transform rotate-180 transition-transform" 
                      : "transition-transform"
                  } 
                />
              </button>
              
              {activeMenu === "partners" && (
                <div className="mt-2 ml-4 space-y-2">
                  {mobileMenuData.partners.map((item) => (
                    <a 
                      key={item.id} 
                      href={item.href} 
                      className="block py-1 text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
            
            <li className="py-2">
              <button 
                className="flex items-center justify-between w-full text-left"
                onClick={() => handleMenuClick("company")}
              >
                <span className="font-medium">Company</span>
                <FiChevronDown 
                  size={16} 
                  className={
                    activeMenu === "company" 
                      ? "transform rotate-180 transition-transform" 
                      : "transition-transform"
                  } 
                />
              </button>
              
              {activeMenu === "company" && (
                <div className="mt-2 ml-4 space-y-2">
                  {mobileMenuData.company.map((item) => (
                    <a 
                      key={item.id} 
                      href={item.href} 
                      className="block py-1 text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
            
            {/* Additional mobile-only items */}
            <li className="py-2 border-t border-gray-700 mt-2">
              <a href="#" className="block py-2 text-gray-300 hover:text-white transition-colors">
                Explore Excellencia
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="block py-2 text-gray-300 hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }