import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import {
  FiHome,
  FiChevronRight,
  FiChevronDown,
  FiGrid,
  FiSettings,
  FiUsers,
  FiDatabase,
  FiServer,
  FiShoppingCart,
  FiDollarSign,
  FiMenu,
  FiX,
  FiPackage,
  FiLayers,
  FiSearch,
  FiInfo,
  FiBookmark,
  FiBriefcase,
  FiGlobe,
  FiTrendingUp,
  FiBox,
  FiActivity,
  FiTarget,
  FiMapPin,
  FiCpu,
  FiPieChart,
  FiBell,
  FiStar
} from "react-icons/fi";
import { CgMenuGridR } from "react-icons/cg";

// Types
type CategoryItem = {
  id: string;
  label: string;
  info?: boolean;
  subcategories?: { id: string; label: string }[];
};

type IndustryItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

type CompanySizeItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

type CandyboxModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Data
const portfolioCategories: CategoryItem[] = [
  { id: "ai", label: "Artificial Intelligence", info: true },
  {
    id: "btp",
    label: "Business Technology Platform",
    info: true,
    subcategories: [
      { id: "appdev", label: "Application Development and Automation" },
      { id: "data", label: "Data and Analytics" },
      { id: "integration", label: "Integration" }
    ]
  },
  { id: "crm", label: "CRM and Customer Experience", info: true },
  { id: "erp", label: "Enterprise Resource Planning", info: true },
  { id: "finance", label: "Financial Management", info: true },
  { id: "hcm", label: "Human Capital Management", info: true },
  { id: "spend", label: "Spend Management", info: true },
  { id: "scm", label: "Supply Chain Management", info: true }
];

const industriesData: IndustryItem[] = [
  { id: "aerospace", label: "Aerospace and Defense", icon: <FiTarget />, color: "bg-blue-500" },
  { id: "automotive", label: "Automotive", icon: <FiActivity />, color: "bg-red-500" },
  { id: "banking", label: "Banking", icon: <FiDollarSign />, color: "bg-green-500" },
  { id: "chemicals", label: "Chemicals", icon: <FiBox />, color: "bg-purple-500" },
  { id: "consumer", label: "Consumer Products", icon: <FiShoppingCart />, color: "bg-yellow-500" },
  { id: "defense", label: "Defense and Security", icon: <FiBookmark />, color: "bg-indigo-500" },
  { id: "education", label: "Education and Research", icon: <FiBookmark />, color: "bg-pink-500" },
  { id: "engineering", label: "Engineering and Construction", icon: <FiGrid />, color: "bg-orange-500" },
  { id: "healthcare", label: "Healthcare", icon: <FiActivity />, color: "bg-teal-500" },
  { id: "tech", label: "High Tech", icon: <FiCpu />, color: "bg-cyan-500" },
  { id: "insurance", label: "Insurance", icon: <FiStar />, color: "bg-amber-500" },
  { id: "life", label: "Life Sciences", icon: <FiActivity />, color: "bg-lime-500" },
  { id: "media", label: "Media", icon: <FiGlobe />, color: "bg-violet-500" },
  { id: "mill", label: "Mill Products", icon: <FiBox />, color: "bg-rose-500" },
  { id: "mining", label: "Mining", icon: <FiMapPin />, color: "bg-slate-500" },
  { id: "oil", label: "Oil, Gas, and Energy", icon: <FiActivity />, color: "bg-fuchsia-500" },
  { id: "professional", label: "Professional Services", icon: <FiBriefcase />, color: "bg-blue-500" },
  { id: "public", label: "Public Sector", icon: <FiGlobe />, color: "bg-emerald-500" },
  { id: "retail", label: "Retail", icon: <FiShoppingCart />, color: "bg-amber-500" },
  { id: "sports", label: "Sports and Entertainment", icon: <FiTarget />, color: "bg-red-500" },
  { id: "telecom", label: "Telecommunications", icon: <FiActivity />, color: "bg-indigo-500" },
  { id: "travel", label: "Travel and Transportation", icon: <FiMapPin />, color: "bg-green-500" },
  { id: "utilities", label: "Utilities", icon: <FiActivity />, color: "bg-orange-500" },
  { id: "wholesale", label: "Wholesale Distribution", icon: <FiTrendingUp />, color: "bg-purple-500" }
];

const companySizesData: CompanySizeItem[] = [
  { id: "small", label: "Small Businesses", icon: <FiInfo />, color: "bg-green-500" },
  { id: "midsize", label: "Midsize Companies", icon: <FiInfo />, color: "bg-yellow-500" },
  { id: "large", label: "Large Enterprise", icon: <FiInfo />, color: "bg-blue-500" }
];

export default function Candybox({ isOpen, onClose }: CandyboxModalProps) {
  // State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Excellencia S/Excellencia Cloud", "Artificial Intelligence", "Business Technology Platform",
    "CRM and Customer Experience", "Enterprise Resource Planning"
  ]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    btp: true // Open the Business Technology Platform category by default
  });
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");


  // Handlers
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleIndustry = (industryLabel: string) => {
    setSelectedIndustries(prev => {
      if (prev.includes(industryLabel)) {
        return prev.filter(id => id !== industryLabel);
      } else {
        return [...prev, industryLabel];
      }
    });
  };

  const toggleCompanySize = (sizeLabel: string) => {
    setSelectedCompanySizes(prev => {
      if (prev.includes(sizeLabel)) {
        return prev.filter(id => id !== sizeLabel);
      } else {
        return [...prev, sizeLabel];
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const removeSelectedItem = (item: string) => {
    setSelectedCategories(prev => prev.filter(id => id !== item));
    setSelectedIndustries(prev => prev.filter(id => id !== item));
    setSelectedCompanySizes(prev => prev.filter(id => id !== item));
  };

  // Filtered data based on search
  const filteredPortfolioCategories = portfolioCategories.filter(
    category => category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIndustries = industriesData.filter(
    industry => industry.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanySizes = companySizesData.filter(
    size => size.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // BTP Category view component
  const BTPCategoryView = () => {
    return (
      <div className="border rounded-md bg-gray-50 mb-6">
        <div className="flex items-center p-3 bg-amber-100 rounded-t-md">
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            <span className="mr-2">📁</span>
            <span className="font-medium">Business Technology Platform</span>
          </div>
          <div className="ml-auto flex items-center">
            <span className="mr-1 text-gray-700">Portfolio subcategory</span>
            <FiChevronDown />
          </div>
        </div>

        <div className="py-2">
          <div className="pl-10 py-2 flex items-center bg-gray-100">
            <span className="mr-2">+</span>
            <span>Application Development and Automation</span>
            <div className="ml-auto mr-4 flex items-center">
              <span className="mr-1 text-blue-600">Products</span>
              <FiChevronDown className="text-blue-600" />
            </div>
          </div>

          <div className="pl-10 py-2 flex items-center">
            <span className="mr-2">+</span>
            <span>Data and Analytics</span>
            <div className="ml-auto mr-4 flex items-center">
              <span className="mr-1 text-blue-600">Products</span>
              <FiChevronDown className="text-blue-600" />
            </div>
          </div>

          <div className="pl-10 py-2 flex items-center bg-blue-50">
            <span className="mr-2">+</span>
            <span>Integration</span>
            <div className="ml-auto mr-4 flex items-center">
              <span className="mr-1 text-blue-600">Products</span>
              <FiChevronDown className="text-blue-600" />
            </div>
          </div>

          <div className="pl-16 py-2">
            <div className="ml-6 space-y-2">
              <div className="flex items-center">
                <span className="mr-2">+</span>
                <span>Excellencia Advanced Data Migration and Management by Syniti</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">+</span>
                <span>Ariba Cloud Integration</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">+</span>
                <span>Excellencia Integration Suite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;



  // Dans votre composant, ajoutez une fonction pour réinitialiser les sélections
  const resetAllSelections = () => {
    // Ces fonctions devront être définies dans votre composant parent
    setSelectedCategories([]);
    setSelectedIndustries([]);
    setSelectedCompanySizes([]);
  };

  return (
    <>
      {/* Modal with background opacity control */}
      <>
        {/* Semi-transparent background overlay */}
        <div className={`fixed inset-0 bg-black flex-1 overflow-auto`}></div>


        {/* The actual modal content - fully visible */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-12/12 h-12/12 flex overflow-hidden text-gray-800">
            {/* Left Panel */}
            <div className="w-1/3 bg-gray-800 text-white flex flex-col p-8">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full border-4 border-white flex items-center justify-center">
                    <CgMenuGridR size={48} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-blue-700 rounded-full p-2 w-20 h-20 flex items-center justify-center">
                      <svg viewBox="0 0 50 50" className="w-10 h-10 text-white">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="25" cy="15" r="5" fill="currentColor" />
                        <path d="M15,25 A10,10 0 0,1 35,25" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-4">What are your interests?</h2>
              <p className="text-center mb-8">
                Select the topics that interest you to personalize your Excellencia experience.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-yellow-500 p-1 rounded mr-2">
                    <span className="text-blue-700 font-bold">📁</span>
                  </div>
                  <span>Portfolio category</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-1 rounded mr-2">
                    <span className="text-white font-bold">📋</span>
                  </div>
                  <span>Portfolio subcategory</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 p-1 rounded mr-2">
                    <span className="text-white font-bold">🛒</span>
                  </div>
                  <span>Product</span>
                </div>
              </div>

              {/* Preview of Selected Items */}
              {/* <div className="mt-8">
            <h3 className="font-medium mb-2">Selected items: {selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length}</h3>
            <div className="max-h-64 overflow-y-auto bg-blue-800 p-3 rounded-md">
              {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].slice(0, 5).map(item => (
                <div key={item} className="bg-blue-600 rounded-md p-2 mb-2 flex items-center justify-between">
                  <span className="text-sm">{item}</span>
                  <button 
                    onClick={() => removeSelectedItem(item)}
                    className="text-blue-200 hover:text-white"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
              {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 5 && (
                <div className="text-center text-blue-200 mt-2">
                  +{(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) - 5} more
                </div>
              )}
            </div>
          </div> */}


              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Selected items: {selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length}</h3>

                  {/* Bouton Reset Selection */}
                  {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 0 && (
                    <button
                      onClick={resetAllSelections}
                      className="flex items-center text-md text-white hover:text-orange-400 transition-colors"
                    >
                      <FiRefreshCw size={14} className="mr-1" />
                      Reset Selection
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto bg-blue-800 p-3 rounded-md">
                  {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].slice(0, 5).map(item => (
                    <div key={item} className="bg-blue-600 rounded-md p-2 mb-2 flex items-center justify-between">
                      <span className="text-sm">{item}</span>
                      <button
                        onClick={() => removeSelectedItem(item)}
                        className="text-blue-200 hover:text-white"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                  {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 5 && (
                    <div className="text-center text-blue-200 mt-2">
                      +{(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) - 5} more
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Content */}
            <div className="w-2/3 overflow-y-auto relative">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800"
              >
                <FiX size={24} />
              </button>

              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Select from the portfolio categories, subcategories or products</h2>

                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full p-3 pr-10 border rounded-full"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <FiSearch className="absolute right-3 top-3.5 text-gray-500" />
                  </div>
                </div>

                {/* BTP Category View as shown in the screenshot */}
                <BTPCategoryView />

                {/* Other Categories */}
                <div className="space-y-4">
                  {filteredPortfolioCategories.filter(cat => cat.id !== "btp").map(category => (
                    <div key={category.id} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="bg-yellow-100 p-1 rounded-md mr-2 flex items-center">
                            <input
                              type="checkbox"
                              id={category.id}
                              checked={selectedCategories.includes(category.label)}
                              onChange={() => toggleCategory(category.label)}
                              className="mr-1"
                            />
                            <label htmlFor={category.id} className="text-gray-800 flex items-center">
                              <FiPackage className="text-gray-600 mr-1" /> {category.label}
                            </label>
                          </div>
                          {category.info && (
                            <button className="ml-2 text-gray-500 hover:text-blue-600">
                              <FiInfo />
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => toggleCategoryExpand(category.id)}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <span className="mr-2">Portfolio subcategory</span>
                          {expandedCategories[category.id] ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                      </div>

                      {/* Subcategories if expanded */}
                      {category.subcategories && expandedCategories[category.id] && (
                        <div className="ml-6 space-y-2">
                          {category.subcategories.map(sub => (
                            <div key={sub.id} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <button
                                  className="bg-white border rounded-md p-1 flex items-center hover:bg-blue-50"
                                  onClick={() => toggleCategory(sub.label)}
                                >
                                  <span className="text-gray-800">
                                    {selectedCategories.includes(sub.label) ? "✓" : "+"} {sub.label}
                                  </span>
                                </button>
                              </div>
                              <button
                                className="flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <span className="mr-2">Products</span>
                                <FiChevronRight className="text-blue-600" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Industries Section - Card View */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Industries</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredIndustries.map(industry => (
                      <div
                        key={industry.id}
                        className={`rounded-lg p-4 border transition-all cursor-pointer
                      ${selectedIndustries.includes(industry.label)
                            ? "border-blue-500 shadow-md"
                            : "border-gray-200 hover:shadow-sm"}`}
                        onClick={() => toggleIndustry(industry.label)}
                      >
                        <div className="flex items-center">
                          <div className={`${industry.color} text-white p-2 rounded-full mr-3`}>
                            {industry.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{industry.label}</div>
                            {selectedIndustries.includes(industry.label) && (
                              <div className="text-xs text-blue-600 mt-1">Selected</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Size Section - Card View */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Company size</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {filteredCompanySizes.map(size => (
                      <div
                        key={size.id}
                        className={`rounded-lg p-4 border transition-all cursor-pointer flex flex-col items-center
                      ${selectedCompanySizes.includes(size.label)
                            ? "border-blue-500 shadow-md"
                            : "border-gray-200 hover:shadow-sm"}`}
                        onClick={() => toggleCompanySize(size.label)}
                      >
                        <div className={`${size.color} text-white p-3 rounded-full mb-2`}>
                          {size.icon}
                        </div>
                        <div className="font-medium text-center">{size.label}</div>
                        {selectedCompanySizes.includes(size.label) && (
                          <div className="text-xs text-blue-600 mt-1">Selected</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Items Review */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Review your selections:</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].map(category => (
                      <div key={category} className="bg-gray-100 rounded-md p-2 flex items-center">
                        <span>{category}</span>
                        <button
                          className="ml-2 text-gray-500 hover:text-gray-800"
                          onClick={() => removeSelectedItem(category)}
                        >×</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={onClose}
                  >
                    Save and Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}