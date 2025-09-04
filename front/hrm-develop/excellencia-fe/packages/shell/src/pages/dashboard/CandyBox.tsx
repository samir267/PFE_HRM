// import { useState } from "react";
// import { FiRefreshCw } from "react-icons/fi";
// import {
//   FiHome,
//   FiChevronRight,
//   FiChevronDown,
//   FiGrid,
//   FiSettings,
//   FiUsers,
//   FiDatabase,
//   FiServer,
//   FiShoppingCart,
//   FiDollarSign,
//   FiMenu,
//   FiX,
//   FiPackage,
//   FiLayers,
//   FiSearch,
//   FiInfo,
//   FiBookmark,
//   FiBriefcase,
//   FiGlobe,
//   FiTrendingUp,
//   FiBox,
//   FiActivity,
//   FiTarget,
//   FiMapPin,
//   FiCpu,
//   FiPieChart,
//   FiBell,
//   FiStar
// } from "react-icons/fi";
// import { CgMenuGridR } from "react-icons/cg";

// // Types
// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   subcategories?: { id: string; label: string }[];
// };

// type IndustryItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   color: string;
// };

// type CompanySizeItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   color: string;
// };



// // Data
// const portfolioCategories: CategoryItem[] = [
//   { id: "ai", label: "Artificial Intelligence", info: true },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     subcategories: [
//       { id: "appdev", label: "Application Development and Automation" },
//       { id: "data", label: "Data and Analytics" },
//       { id: "integration", label: "Integration" }
//     ]
//   },
//   { id: "crm", label: "CRM and Customer Experience", info: true },
//   { id: "erp", label: "Enterprise Resource Planning", info: true },
//   { id: "finance", label: "Financial Management", info: true },
//   { id: "hcm", label: "Human Capital Management", info: true },
//   { id: "spend", label: "Spend Management", info: true },
//   { id: "scm", label: "Supply Chain Management", info: true }
// ];

// const industriesData: IndustryItem[] = [
//   { id: "aerospace", label: "Aerospace and Defense", icon: <FiTarget />, color: "bg-white-8000" },
//   { id: "automotive", label: "Automotive", icon: <FiActivity />, color: "bg-red-500" },
//   { id: "banking", label: "Banking", icon: <FiDollarSign />, color: "bg-green-500" },
//   { id: "chemicals", label: "Chemicals", icon: <FiBox />, color: "bg-purple-500" },
//   { id: "consumer", label: "Consumer Products", icon: <FiShoppingCart />, color: "bg-yellow-500" },
//   { id: "defense", label: "Defense and Security", icon: <FiBookmark />, color: "bg-indigo-500" },
//   { id: "education", label: "Education and Research", icon: <FiBookmark />, color: "bg-pink-500" },
//   { id: "engineering", label: "Engineering and Construction", icon: <FiGrid />, color: "bg-orange-500" },
//   { id: "healthcare", label: "Healthcare", icon: <FiActivity />, color: "bg-teal-500" },
//   { id: "tech", label: "High Tech", icon: <FiCpu />, color: "bg-cyan-500" },
//   { id: "insurance", label: "Insurance", icon: <FiStar />, color: "bg-amber-500" },
//   { id: "life", label: "Life Sciences", icon: <FiActivity />, color: "bg-lime-500" },
//   { id: "media", label: "Media", icon: <FiGlobe />, color: "bg-violet-500" },
//   { id: "mill", label: "Mill Products", icon: <FiBox />, color: "bg-rose-500" },
//   { id: "mining", label: "Mining", icon: <FiMapPin />, color: "bg-slate-500" },
//   { id: "oil", label: "Oil, Gas, and Energy", icon: <FiActivity />, color: "bg-fuchsia-500" },
//   { id: "professional", label: "Professional Services", icon: <FiBriefcase />, color: "bg-white-8000" },
//   { id: "public", label: "Public Sector", icon: <FiGlobe />, color: "bg-emerald-500" },
//   { id: "retail", label: "Retail", icon: <FiShoppingCart />, color: "bg-amber-500" },
//   { id: "sports", label: "Sports and Entertainment", icon: <FiTarget />, color: "bg-red-500" },
//   { id: "telecom", label: "Telecommunications", icon: <FiActivity />, color: "bg-indigo-500" },
//   { id: "travel", label: "Travel and Transportation", icon: <FiMapPin />, color: "bg-green-500" },
//   { id: "utilities", label: "Utilities", icon: <FiActivity />, color: "bg-orange-500" },
//   { id: "wholesale", label: "Wholesale Distribution", icon: <FiTrendingUp />, color: "bg-purple-500" }
// ];

// const companySizesData: CompanySizeItem[] = [
//   { id: "small", label: "Small Businesses", icon: <FiInfo />, color: "bg-green-500" },
//   { id: "midsize", label: "Midsize Companies", icon: <FiInfo />, color: "bg-yellow-500" },
//   { id: "large", label: "Large Enterprise", icon: <FiInfo />, color: "bg-white-8000" }
// ];

// export default function Candybox() {
//   // State
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([
//     "Excellencia S/Excellencia Cloud", "Artificial Intelligence", "Business Technology Platform",
//     "CRM and Customer Experience", "Enterprise Resource Planning"
//   ]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     btp: true // Open the Business Technology Platform category by default
//   });
//   const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
//   const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");


//   // Handlers
//   const toggleCategory = (categoryId: string) => {
//     setSelectedCategories(prev => {
//       if (prev.includes(categoryId)) {
//         return prev.filter(id => id !== categoryId);
//       } else {
//         return [...prev, categoryId];
//       }
//     });
//   };

//   const toggleCategoryExpand = (categoryId: string) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [categoryId]: !prev[categoryId]
//     }));
//   };

//   const toggleIndustry = (industryLabel: string) => {
//     setSelectedIndustries(prev => {
//       if (prev.includes(industryLabel)) {
//         return prev.filter(id => id !== industryLabel);
//       } else {
//         return [...prev, industryLabel];
//       }
//     });
//   };

//   const toggleCompanySize = (sizeLabel: string) => {
//     setSelectedCompanySizes(prev => {
//       if (prev.includes(sizeLabel)) {
//         return prev.filter(id => id !== sizeLabel);
//       } else {
//         return [...prev, sizeLabel];
//       }
//     });
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const removeSelectedItem = (item: string) => {
//     setSelectedCategories(prev => prev.filter(id => id !== item));
//     setSelectedIndustries(prev => prev.filter(id => id !== item));
//     setSelectedCompanySizes(prev => prev.filter(id => id !== item));
//   };

//   // Filtered data based on search
//   const filteredPortfolioCategories = portfolioCategories.filter(
//     category => category.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredIndustries = industriesData.filter(
//     industry => industry.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredCompanySizes = companySizesData.filter(
//     size => size.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // BTP Category view component
//   const BTPCategoryView = () => {
//     return (
//       <div className="border rounded-md bg-gray-50 mb-6">
//         <div className="flex items-center p-3 bg-amber-100 rounded-t-md">
//           <div className="flex items-center">
//             <span className="mr-2">✓</span>
//             <span className="mr-2">📁</span>
//             <span className="font-medium">Business Technology Platform</span>
//           </div>
//           <div className="ml-auto flex items-center">
//             <span className="mr-1 text-gray-700">Portfolio subcategory</span>
//             <FiChevronDown />
//           </div>
//         </div>

//         <div className="py-2">
//           <div className="pl-10 py-2 flex items-center bg-gray-100">
//             <span className="mr-2">+</span>
//             <span>Application Development and Automation</span>
//             <div className="ml-auto mr-4 flex items-center">
//               <span className="mr-1 text-orange-600-600">Products</span>
//               <FiChevronDown className="text-orange-600-600" />
//             </div>
//           </div>

//           <div className="pl-10 py-2 flex items-center">
//             <span className="mr-2">+</span>
//             <span>Data and Analytics</span>
//             <div className="ml-auto mr-4 flex items-center">
//               <span className="mr-1 text-orange-600-600">Products</span>
//               <FiChevronDown className="text-orange-600-600" />
//             </div>
//           </div>

//           <div className="pl-10 py-2 flex items-center bg-white-800">
//             <span className="mr-2">+</span>
//             <span>Integration</span>
//             <div className="ml-auto mr-4 flex items-center">
//               <span className="mr-1 text-orange-600-600">Products</span>
//               <FiChevronDown className="text-orange-600-600" />
//             </div>
//           </div>

//           <div className="pl-16 py-2">
//             <div className="ml-6 space-y-2">
//               <div className="flex items-center">
//                 <span className="mr-2">+</span>
//                 <span>Excellencia Advanced Data Migration and Management by Syniti</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="mr-2">+</span>
//                 <span>Ariba Cloud Integration</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="mr-2">+</span>
//                 <span>Excellencia Integration Suite</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };





//   // Dans votre composant, ajoutez une fonction pour réinitialiser les sélections
//   const resetAllSelections = () => {
//     // Ces fonctions devront être définies dans votre composant parent
//     setSelectedCategories([]);
//     setSelectedIndustries([]);
//     setSelectedCompanySizes([]);
//   };

//   return (
//     <>
//       {/* Modal with background opacity control */}
//       <>


//         {/* The actual modal content - fully visible */}
//         <div className=" inset-0 flex items-center justify-center ">
//           <div className="bg-white rounded-md w-12/12 h-12/12 flex overflow-hidden text-gray-800">
//             {/* Left Panel */}
//             <div className="w-1/3 bg-gray-800 text-white flex flex-col p-8">
//               <div className="flex justify-center mb-8">
//                 <div className="relative">
//                   <div className="h-32 w-32 rounded-full border-4 border-white flex items-center justify-center">
//                     <CgMenuGridR size={48} />
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="bg-blue-700 rounded-full p-2 w-20 h-20 flex items-center justify-center">
//                       <svg viewBox="0 0 50 50" className="w-10 h-10 text-white">
//                         <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
//                         <circle cx="25" cy="15" r="5" fill="currentColor" />
//                         <path d="M15,25 A10,10 0 0,1 35,25" fill="none" stroke="currentColor" strokeWidth="2" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <h2 className="text-2xl font-bold text-center mb-4">What are your interests?</h2>
//               <p className="text-center mb-8">
//                 Select the topics that interest you to personalize your Excellencia experience.
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <div className="bg-yellow-500 p-1 rounded mr-2">
//                     <span className="text-orange-600-700 font-bold">📁</span>
//                   </div>
//                   <span>Portfolio category</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="bg-white-8000 p-1 rounded mr-2">
//                     <span className="text-white font-bold">📋</span>
//                   </div>
//                   <span>Portfolio subcategory</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="bg-green-500 p-1 rounded mr-2">
//                     <span className="text-white font-bold">🛒</span>
//                   </div>
//                   <span>Product</span>
//                 </div>
//               </div>

//               {/* Preview of Selected Items */}
//               {/* <div className="mt-8">
//             <h3 className="font-medium mb-2">Selected items: {selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length}</h3>
//             <div className="max-h-64 overflow-y-auto bg-blue-800 p-3 rounded-md">
//               {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].slice(0, 5).map(item => (
//                 <div key={item} className="bg-blue-600 rounded-md p-2 mb-2 flex items-center justify-between">
//                   <span className="text-sm">{item}</span>
//                   <button 
//                     onClick={() => removeSelectedItem(item)}
//                     className="text-orange-600-200 hover:text-white"
//                   >
//                     <FiX size={16} />
//                   </button>
//                 </div>
//               ))}
//               {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 5 && (
//                 <div className="text-center text-orange-600-200 mt-2">
//                   +{(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) - 5} more
//                 </div>
//               )}
//             </div>
//           </div> */}


//               <div className="mt-8">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="font-medium">Selected items: {selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length}</h3>

//                   {/* Bouton Reset Selection */}
//                   {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 0 && (
//                     <button
//                       onClick={resetAllSelections}
//                       className="flex items-center text-md text-white hover:text-orange-400 transition-colors"
//                     >
//                       <FiRefreshCw size={14} className="mr-1" />
//                       Reset Selection
//                     </button>
//                   )}
//                 </div>

//                 <div className="max-h-64 overflow-y-auto bg-blue-800 p-3 rounded-md">
//                   {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].slice(0, 5).map(item => (
//                     <div key={item} className="bg-blue-600 rounded-md p-2 mb-2 flex items-center justify-between">
//                       <span className="text-sm">{item}</span>
//                       <button
//                         onClick={() => removeSelectedItem(item)}
//                         className="text-orange-600-200 hover:text-white"
//                       >
//                         <FiX size={16} />
//                       </button>
//                     </div>
//                   ))}
//                   {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 5 && (
//                     <div className="text-center text-orange-600-200 mt-2">
//                       +{(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) - 5} more
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Panel - Content */}
//             <div className="w-2/3 overflow-y-auto relative">


//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-4">Select from the portfolio categories, subcategories or products</h2>

//                 <div className="mb-4">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search"
//                       className="w-full p-3 pr-10 border rounded-full"
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                     />
//                     <FiSearch className="absolute right-3 top-3.5 text-gray-500" />
//                   </div>
//                 </div>

//                 {/* BTP Category View as shown in the screenshot */}
//                 <BTPCategoryView />

//                 {/* Other Categories */}
//                 <div className="space-y-4">
//                   {filteredPortfolioCategories.filter(cat => cat.id !== "btp").map(category => (
//                     <div key={category.id} className="border-b pb-4">
//                       <div className="flex justify-between items-center mb-2">
//                         <div className="flex items-center">
//                           <div className="bg-yellow-100 p-1 rounded-md mr-2 flex items-center">
//                             <input
//                               type="checkbox"
//                               id={category.id}
//                               checked={selectedCategories.includes(category.label)}
//                               onChange={() => toggleCategory(category.label)}
//                               className="mr-1"
//                             />
//                             <label htmlFor={category.id} className="text-gray-800 flex items-center">
//                               <FiPackage className="text-gray-600 mr-1" /> {category.label}
//                             </label>
//                           </div>
//                           {category.info && (
//                             <button className="ml-2 text-gray-500 hover:text-orange-600-600">
//                               <FiInfo />
//                             </button>
//                           )}
//                         </div>
//                         <button
//                           onClick={() => toggleCategoryExpand(category.id)}
//                           className="flex items-center text-orange-600-600 hover:text-gray-800"
//                         >
//                           <span className="mr-2">Portfolio subcategory</span>
//                           {expandedCategories[category.id] ? <FiChevronDown /> : <FiChevronRight />}
//                         </button>
//                       </div>

//                       {/* Subcategories if expanded */}
//                       {category.subcategories && expandedCategories[category.id] && (
//                         <div className="ml-6 space-y-2">
//                           {category.subcategories.map(sub => (
//                             <div key={sub.id} className="flex justify-between items-center">
//                               <div className="flex items-center">
//                                 <button
//                                   className="bg-white border rounded-md p-1 flex items-center hover:bg-white-800"
//                                   onClick={() => toggleCategory(sub.label)}
//                                 >
//                                   <span className="text-gray-800">
//                                     {selectedCategories.includes(sub.label) ? "✓" : "+"} {sub.label}
//                                   </span>
//                                 </button>
//                               </div>
//                               <button
//                                 className="flex items-center text-orange-600-600 hover:text-gray-800"
//                               >
//                                 <span className="mr-2">Products</span>
//                                 <FiChevronRight className="text-orange-600-600" />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Industries Section - Card View */}
//                 <div className="mt-8">
//                   <h3 className="text-lg font-semibold mb-4">Industries</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {filteredIndustries.map(industry => (
//                       <div
//                         key={industry.id}
//                         className={`rounded-lg p-4 border transition-all cursor-pointer
//                       ${selectedIndustries.includes(industry.label)
//                             ? "border-blue-500 shadow-md"
//                             : "border-gray-200 hover:shadow-sm"}`}
//                         onClick={() => toggleIndustry(industry.label)}
//                       >
//                         <div className="flex items-center">
//                           <div className={`${industry.color} text-white p-2 rounded-full mr-3`}>
//                             {industry.icon}
//                           </div>
//                           <div>
//                             <div className="font-medium text-sm">{industry.label}</div>
//                             {selectedIndustries.includes(industry.label) && (
//                               <div className="text-xs text-orange-600-600 mt-1">Selected</div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Company Size Section - Card View */}
//                 <div className="mt-8">
//                   <h3 className="text-lg font-semibold mb-4">Company size</h3>
//                   <div className="grid grid-cols-3 gap-4">
//                     {filteredCompanySizes.map(size => (
//                       <div
//                         key={size.id}
//                         className={`rounded-lg p-4 border transition-all cursor-pointer flex flex-col items-center
//                       ${selectedCompanySizes.includes(size.label)
//                             ? "border-blue-500 shadow-md"
//                             : "border-gray-200 hover:shadow-sm"}`}
//                         onClick={() => toggleCompanySize(size.label)}
//                       >
//                         <div className={`${size.color} text-white p-3 rounded-full mb-2`}>
//                           {size.icon}
//                         </div>
//                         <div className="font-medium text-center">{size.label}</div>
//                         {selectedCompanySizes.includes(size.label) && (
//                           <div className="text-xs text-orange-600-600 mt-1">Selected</div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Selected Items Review */}
//                 <div className="mt-8">
//                   <h3 className="text-lg font-semibold mb-4">Review your selections:</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].map(category => (
//                       <div key={category} className="bg-gray-100 rounded-md p-2 flex items-center">
//                         <span>{category}</span>
//                         <button
//                           className="ml-2 text-gray-500 hover:text-gray-800"
//                           onClick={() => removeSelectedItem(category)}
//                         >×</button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Save Button */}
//                 <div className="mt-8 flex justify-center">
//                   <button
//                     className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                   
//                   >
//                     Save and Continue
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     </>
//   );
// }


//###################################### New Version #######################################""

// import { useState, useCallback, useMemo } from "react";
// import {
//   FiRefreshCw,
//   FiChevronRight,
//   FiChevronDown,
//   FiGrid,
//   FiShoppingCart,
//   FiDollarSign,
//   FiX,
//   FiPackage,
//   FiLayers,
//   FiSearch,
//   FiInfo,
//   FiBookmark,
//   FiBriefcase,
//   FiGlobe,
//   FiTrendingUp,
//   FiBox,
//   FiActivity,
//   FiTarget,
//   FiMapPin,
//   FiCpu,
//   FiList,
//   FiPlus,
//   FiCheckCircle,
//   FiStar, // New icon for selected state
// } from "react-icons/fi";
// import { CgMenuGridR } from "react-icons/cg";

// // Types
// type SubCategory = {
//   id: string;
//   label: string;
//   type: "product" | "subcategory";
//   products?: Item[];
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   type: "category";
//   subcategories?: SubCategory[];
//   description?: string;
// };

// type Item = {
//   id: string;
//   label: string;
//   icon?: React.ReactNode;
//   color?: string;
//   type: "industry" | "companySize" | "product";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type CombinedDataItem = CategoryItem | Item | SubCategory;

// // Data (Keeping your extended data, adding more descriptions for depth)
// const allData: CombinedDataItem[] = [
//   // Portfolio Categories
//   { id: "excellence", label: "Excellencia S/Excellencia Cloud", type: "category", description: "Our flagship cloud offerings for comprehensive business solutions, designed for unparalleled performance and scalability." },
//   {
//     id: "ai", label: "Artificial Intelligence", info: true, type: "category",
//     description: "Leverage cutting-edge AI to transform your business operations, unlock deep insights, and automate complex tasks with intelligent systems.",
//     subcategories: [
//       {
//         id: "ai_platform", label: "AI Platform Services", type: "subcategory",
//         products: [
//           { id: "ai_core", label: "AI Core Engine", type: "product", description: "The foundational AI engine for developing and deploying sophisticated machine learning models, offering robust computational power." },
//           { id: "data_intelligence", label: "Data Intelligence Hub", type: "product", description: "A centralized hub for advanced data processing, real-time analysis, and predictive modeling, enabling smart, data-driven decisions." }
//         ]
//       },
//       {
//         id: "ml_solutions", label: "Machine Learning Solutions", type: "subcategory",
//         products: [
//           { id: "predictive_analytics", label: "Predictive Analytics Suite", type: "product", description: "Powerful tools for forecasting future trends, identifying opportunities, and mitigating risks across various business domains." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     type: "category",
//     description: "Innovate and integrate with our robust Business Technology Platform, providing a foundation for agile development and intelligent enterprise.",
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         type: "subcategory",
//         products: [
//           { id: "app_studio", label: "Excellencia App Studio", type: "product", description: "A comprehensive low-code/no-code platform for rapid application development and deployment, empowering citizen developers and IT." },
//           { id: "process_automation", label: "Process Automation Suite", type: "product", description: "Automate business processes end-to-end for increased efficiency, reduced manual effort, and improved operational agility." },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         type: "subcategory",
//         products: [
//           { id: "data_warehouse", label: "Excellencia Data Warehouse Cloud", type: "product", description: "Scalable cloud-based data warehousing solution for all your data needs, offering high performance and flexibility for analytics." },
//           { id: "analytics_cloud", label: "Excellencia Analytics Cloud", type: "product", description: "Integrated business intelligence, planning, and predictive analytics in the cloud, enabling informed decisions and strategic foresight." },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         type: "subcategory",
//         products: [
//           { id: "data_migration", label: "Excellencia Advanced Data Migration and Management by Syniti", type: "product", description: "Robust data migration and management tools ensuring data quality, consistency, and seamless transfer across systems." },
//           { id: "ariba_integration", label: "Ariba Cloud Integration", type: "product", description: "Seamless integration capabilities with Ariba cloud services for optimized procurement processes and enhanced supplier collaboration." },
//           { id: "integration_suite", label: "Excellencia Integration Suite", type: "product", description: "A comprehensive suite for enterprise integration, connecting diverse applications and processes across your IT landscape." },
//         ],
//       },
//     ],
//   },
//   {
//     id: "crm", label: "CRM and Customer Experience", info: true, type: "category",
//     description: "Optimize customer interactions and enhance their overall experience, building lasting relationships and driving loyalty.",
//     subcategories: [
//       { id: "sales_cloud", label: "Sales Cloud", type: "subcategory", products: [{ id: "crm_sales", label: "CRM Sales Automation", type: "product", description: "Automate sales processes, manage leads, and foster strong customer relationships with a powerful sales force automation solution." }] },
//       { id: "service_cloud", label: "Service Cloud", type: "subcategory", products: [{ id: "crm_service", label: "CRM Service Management", type: "product", description: "Deliver exceptional customer service and support operations with intelligent service management tools and omnichannel capabilities." }] },
//     ]
//   },
//   {
//     id: "erp", label: "Enterprise Resource Planning", info: true, type: "category",
//     description: "Streamline your core business processes with our comprehensive ERP solutions, integrating finance, logistics, and more for efficiency.",
//     subcategories: [
//       { id: "s4hana", label: "S/4HANA", type: "subcategory", products: [{ id: "erp_core", label: "ERP Core Functions", type: "product", description: "Next-generation ERP functionalities for finance, logistics, manufacturing, and more, leveraging in-memory computing for real-time insights." }] }
//     ]
//   },
//   {
//     id: "finance", label: "Financial Management", info: true, type: "category",
//     description: "Gain real-time financial insights and streamline your financial operations, ensuring compliance and strategic financial planning.",
//     subcategories: [
//       { id: "financial_planning", label: "Financial Planning", type: "subcategory", products: [{ id: "fp_suite", label: "Financial Planning Suite", type: "product", description: "Tools for budgeting, forecasting, and in-depth financial analysis to drive performance and achieve financial goals." }] }
//     ]
//   },
//   {
//     id: "hcm", label: "Human Capital Management", info: true, type: "category",
//     description: "Manage your workforce effectively from hire to retire, optimizing talent management and employee experience.",
//     subcategories: [
//       { id: "successfactors", label: "SuccessFactors", type: "subcategory", products: [{ id: "hcm_suite", label: "HCM Suite", type: "product", description: "Comprehensive human capital management solutions covering HR, payroll, talent management, and employee engagement." }] }
//     ]
//   },
//   {
//     id: "spend", label: "Spend Management", info: true, type: "category",
//     description: "Optimize spending, enhance compliance, and drive savings across your organization with integrated spend management solutions.",
//     subcategories: [
//       { id: "concur", label: "Concur", type: "subcategory", products: [{ id: "travel_expense", label: "Travel & Expense Management", type: "product", description: "Automate travel and expense reporting for greater control, visibility, and compliance." }] }
//     ]
//   },
//   {
//     id: "scm", label: "Supply Chain Management", info: true, type: "category",
//     description: "Transform your supply chain for resilience, efficiency, and sustainability, from planning to logistics.",
//     subcategories: [
//       { id: "ariba", label: "Ariba", type: "subcategory", products: [{ id: "procurement_suite", label: "Procurement Suite", type: "product", description: "Streamline procurement and supplier management processes for better collaboration and cost control." }] }
//     ]
//   },

//   // Industries
//   {
//     id: "aerospace", label: "Aerospace and Defense", icon: <FiTarget />, color: "bg-blue-600", type: "industry", description: "Solutions tailored for the unique demands of the aerospace and defense sectors, ensuring precision and reliability.",
//     details: [
//       { label: "Focus Areas", value: "Complex Manufacturing, Global Logistics, Regulatory Compliance, Project Management" },
//       { label: "Key Benefits", value: "Enhanced operational efficiency, Improved supply chain visibility, Accelerated innovation cycles, Risk mitigation" }
//     ]
//   },
//   {
//     id: "automotive", label: "Automotive", icon: <FiActivity />, color: "bg-red-600", type: "industry", description: "Drive innovation and efficiency across the automotive value chain, from design to after-sales service.",
//     details: [
//       { label: "Focus Areas", value: "Vehicle Production, R&D, Sales & Service, Supplier Collaboration" },
//       { label: "Key Benefits", value: "Accelerated time-to-market, Enhanced customer satisfaction, Optimized production processes" }
//     ]
//   },
//   {
//     id: "banking", label: "Banking", icon: <FiDollarSign />, color: "bg-green-600", type: "industry", description: "Secure and intelligent financial solutions for banking institutions, enabling digital transformation and customer-centricity.",
//     details: [
//       { label: "Focus Areas", value: "Digital Banking, Risk Management, Core Banking Transformation, Customer Engagement" },
//       { label: "Key Benefits", value: "Enhanced security and compliance, Improved customer experience, Operational efficiency, Fraud prevention" }
//     ]
//   },
//   {
//     id: "chemicals", label: "Chemicals", icon: <FiBox />, color: "bg-purple-600", type: "industry", description: "Specialized management systems for chemical industries, focusing on safety, compliance, and sustainable operations.",
//     details: [
//       { label: "Focus Areas", value: "Batch Production, Supply Chain Optimization, Environmental Health & Safety (EHS)" },
//       { label: "Key Benefits", value: "Optimized resource utilization, Strict regulatory compliance, Improved plant safety" }
//     ]
//   },
//   {
//     id: "consumer", label: "Consumer Products", icon: <FiShoppingCart />, color: "bg-yellow-600", type: "industry", description: "Solutions designed for consumer goods manufacturers to meet evolving customer demands and optimize market presence.",
//     details: [
//       { label: "Focus Areas", value: "Demand Planning, Brand Management, Retail Execution, E-commerce Integration" },
//       { label: "Key Benefits", value: "Faster time-to-market, Increased sales and brand loyalty, Efficient inventory management" }
//     ]
//   },
//   {
//     id: "defense", label: "Defense and Security", icon: <FiBookmark />, color: "bg-indigo-600", type: "industry", description: "Mission-critical software for defense and security organizations, ensuring readiness and operational excellence.",
//     details: [
//       { label: "Focus Areas", value: "Asset Management, Project Lifecycle Management, Cybersecurity, Logistics" },
//       { label: "Key Benefits", value: "Enhanced operational readiness, Optimized resource allocation, Secure data management" }
//     ]
//   },
//   {
//     id: "education", label: "Education and Research", icon: <FiBookmark />, color: "bg-pink-600", type: "industry", description: "Tools for educational institutions and research organizations to foster learning, collaboration, and administrative efficiency.",
//     details: [
//       { label: "Focus Areas", value: "Student Information Systems, Campus Operations, Research Grant Management, Alumni Relations" },
//       { label: "Key Benefits", value: "Improved student outcomes, Streamlined administrative processes, Enhanced research capabilities" }
//     ]
//   },
//   {
//     id: "engineering", label: "Engineering and Construction", icon: <FiGrid />, color: "bg-orange-600", type: "industry", description: "Software to manage complex engineering and construction projects, from planning and execution to asset lifecycle.",
//     details: [
//       { label: "Focus Areas", value: "Project Planning & Control, Asset Performance Management, Field Service Management" },
//       { label: "Key Benefits", value: "Reduced project delays and costs, Improved project visibility, Enhanced collaboration" }
//     ]
//   },
//   {
//     id: "healthcare", label: "Healthcare", icon: <FiActivity />, color: "bg-teal-600", type: "industry", description: "Healthcare-specific management and analytics solutions, supporting patient care, operational efficiency, and regulatory compliance.",
//     details: [
//       { label: "Focus Areas", value: "Patient Management, Clinical Trials, Supply Chain for Medical Devices/Pharma" },
//       { label: "Key Benefits", value: "Improved patient care outcomes, Streamlined administrative workflows, Enhanced data security" }
//     ]
//   },
//   {
//     id: "tech", label: "High Tech", icon: <FiCpu />, color: "bg-cyan-600", type: "industry", description: "Innovative solutions for high technology companies, enabling rapid product development and global market penetration.",
//     details: [
//       { label: "Focus Areas", value: "Product Lifecycle Management, Global Supply Chain, Research & Development" },
//       { label: "Key Benefits", value: "Faster innovation cycles, Optimized manufacturing processes, Stronger competitive edge" }
//     ]
//   },
//   {
//     id: "insurance", label: "Insurance", icon: <FiStar />, color: "bg-amber-600", type: "industry", description: "Robust software solutions for the insurance sector, enhancing policy management, claims processing, and customer engagement.",
//     details: [
//       { label: "Focus Areas", value: "Policy Administration, Claims Management, Customer Relationship Management" },
//       { label: "Key Benefits", value: "Reduced processing times, Enhanced customer satisfaction, Improved risk assessment" }
//     ]
//   },
//   {
//     id: "life", label: "Life Sciences", icon: <FiActivity />, color: "bg-lime-600", type: "industry", description: "Comprehensive solutions for pharmaceutical and biotechnology companies, supporting drug discovery to market.",
//     details: [
//       { label: "Focus Areas", value: "Research & Development, Clinical Trials Management, Manufacturing & Quality Control" },
//       { label: "Key Benefits", value: "Accelerated drug discovery, Compliance with GxP regulations, Improved patient safety" }
//     ]
//   },
//   {
//     id: "media", label: "Media", icon: <FiGlobe />, color: "bg-violet-600", type: "industry", description: "Systems for media and entertainment companies, enabling content creation, distribution, and monetization.",
//     details: [
//       { label: "Focus Areas", value: "Content Production, Rights Management, Audience Engagement, Digital Distribution" },
//       { label: "Key Benefits", value: "Increased revenue streams, Broader audience reach, Efficient content lifecycle management" }
//     ]
//   },
//   {
//     id: "mill", label: "Mill Products", icon: <FiBox />, color: "bg-rose-600", type: "industry", description: "Specialized software for mill products manufacturing, optimizing production, inventory, and supply chain.",
//     details: [
//       { label: "Focus Areas", value: "Production Planning, Quality Management, Inventory Optimization, Logistics" },
//       { label: "Key Benefits", value: "Reduced waste and scrap, Improved production efficiency, Better customer service" }
//     ]
//   },
//   {
//     id: "mining", label: "Mining", icon: <FiMapPin />, color: "bg-slate-600", type: "industry", description: "Integrated solutions for mining operations, focusing on resource management, safety, and environmental responsibility.",
//     details: [
//       { label: "Focus Areas", value: "Resource Planning, Safety Management, Equipment Maintenance, Environmental Compliance" },
//       { label: "Key Benefits", value: "Increased operational efficiency, Enhanced worker safety, Sustainable resource extraction" }
//     ]
//   },
//   {
//     id: "oil", label: "Oil, Gas, and Energy", icon: <FiActivity />, color: "bg-fuchsia-600", type: "industry", description: "Robust software for the energy sector, managing operations from exploration to distribution.",
//     details: [
//       { label: "Focus Areas", value: "Upstream, Midstream, Downstream Operations, Asset Performance Management" },
//       { label: "Key Benefits", value: "Optimized asset utilization, Enhanced safety protocols, Improved regulatory adherence" }
//     ]
//   },
//   {
//     id: "professional", label: "Professional Services", icon: <FiBriefcase />, color: "bg-blue-600", type: "industry", description: "Tools for professional service firms to manage projects, resources, and client relationships effectively.",
//     details: [
//       { label: "Focus Areas", value: "Project Profitability, Resource Utilization, Client Engagement, Billing & Invoicing" },
//       { label: "Key Benefits", value: "Improved project delivery success, Higher client satisfaction, Enhanced employee productivity" }
//     ]
//   },
//   {
//     id: "public", label: "Public Sector", icon: <FiGlobe />, color: "bg-emerald-600", type: "industry", description: "Solutions for government and public administration, driving efficiency, transparency, and citizen engagement.",
//     details: [
//       { label: "Focus Areas", value: "Citizen Services, Budget Management, Public Safety, Urban Planning" },
//       { label: "Key Benefits", value: "Enhanced public services, Greater operational transparency, Improved accountability" }
//     ]
//   },
//   {
//     id: "retail", label: "Retail", icon: <FiShoppingCart />, color: "bg-amber-600", type: "industry", description: "Transform retail operations with solutions that enhance customer experience, optimize inventory, and drive sales.",
//     details: [
//       { label: "Focus Areas", value: "Omnichannel Commerce, Inventory Optimization, Customer Loyalty Programs, Store Operations" },
//       { label: "Key Benefits", value: "Personalized shopping experience, Increased sales and profitability, Efficient supply chain" }
//     ]
//   },
//   {
//     id: "sports", label: "Sports and Entertainment", icon: <FiTarget />, color: "bg-red-600", type: "industry", description: "Management systems for sports and entertainment entities, enhancing fan engagement and event operations.",
//     details: [
//       { label: "Focus Areas", value: "Event Management, Fan Engagement, Venue Operations, Sponsorship Management" },
//       { label: "Key Benefits", value: "Enhanced fan experience, Optimized event revenue, Streamlined venue operations" }
//     ]
//   },
//   {
//     id: "telecom", label: "Telecommunications", icon: <FiActivity />, color: "bg-indigo-600", type: "industry", description: "Advanced solutions for telecommunications providers, supporting network management, billing, and customer services.",
//     details: [
//       { label: "Focus Areas", value: "Network Management, Customer Billing, Service Provisioning, Digital Transformation" },
//       { label: "Key Benefits", value: "Improved service quality, Faster network deployment, Enhanced customer loyalty" }
//     ]
//   },
//   {
//     id: "travel", label: "Travel and Transportation", icon: <FiMapPin />, color: "bg-green-600", type: "industry", description: "Software for travel and logistics businesses, optimizing operations and enhancing traveler experience.",
//     details: [
//       { label: "Focus Areas", value: "Passenger Experience, Logistics & Freight, Fleet Management, Route Optimization" },
//       { label: "Key Benefits", value: "Streamlined operations, Enhanced customer satisfaction, Reduced operational costs" }
//     ]
//   },
//   {
//     id: "utilities", label: "Utilities", icon: <FiActivity />, color: "bg-orange-600", type: "industry", description: "Comprehensive systems for utility companies, managing infrastructure, services, and customer relations.",
//     details: [
//       { label: "Focus Areas", value: "Smart Grid Management, Asset Management, Customer Billing, Field Service" },
//       { label: "Key Benefits", value: "Efficient resource management, Reliable service delivery, Improved regulatory compliance" }
//     ]
//   },
//   {
//     id: "wholesale", label: "Wholesale Distribution", icon: <FiTrendingUp />, color: "bg-purple-600", type: "industry", description: "Solutions for wholesale distribution businesses, enhancing inventory management, order fulfillment, and supplier relationships.",
//     details: [
//       { label: "Focus Areas", value: "Inventory Management, Order Fulfillment, Supplier Relationship Management, Warehouse Operations" },
//       { label: "Key Benefits", value: "Optimized inventory levels, Faster order processing, Improved customer service" }
//     ]
//   },

//   // Company Sizes
//   {
//     id: "small", label: "Small Businesses", icon: <FiInfo />, color: "bg-green-600", type: "companySize", description: "Tailored solutions designed for small businesses to grow efficiently and effectively.",
//     details: [
//       { label: "Typical Challenges", value: "Limited resources, Scalability, Market penetration, Digital presence" },
//       { label: "Our Approach", value: "Cost-effective, User-friendly, Quick implementation, Integrated solutions" }
//     ]
//   },
//   {
//     id: "midsize", label: "Midsize Companies", icon: <FiInfo />, color: "bg-yellow-600", type: "companySize", description: "Flexible and scalable solutions for growing midsize companies, supporting expansion and operational excellence.",
//     details: [
//       { label: "Typical Challenges", value: "Rapid growth management, Process optimization, Talent acquisition & retention, Data silos" },
//       { label: "Our Approach", value: "Modular and scalable, Industry-specific, Cloud-first, Data-driven insights" }
//     ]
//   },
//   {
//     id: "large", label: "Large Enterprise", icon: <FiInfo />, color: "bg-blue-600", type: "companySize", description: "Robust and comprehensive solutions for large-scale enterprises, enabling complex operations and global digital transformation.",
//     details: [
//       { label: "Typical Challenges", value: "Global operations, Complex integrations, Regulatory compliance, Legacy system modernization" },
//       { label: "Our Approach", value: "Comprehensive suites, Highly customizable, Secure and compliant, AI-powered automation" }
//     ]
//   },
// ];

// export default function Candybox() {
//   // State
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     btp: true, // Open the Business Technology Platform category by default
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState<"list" | "card">("card"); // 'list' or 'card'
//   const [isRightBarOpen, setIsRightBarOpen] = useState(false);
//   const [selectedItemForRightBar, setSelectedItemForRightBar] = useState<CombinedDataItem | null>(null);

//   // Handlers
//   const toggleSelection = useCallback((itemId: string) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
//     );
//   }, []);

//   const toggleCategoryExpand = useCallback((categoryId: string) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   }, []);

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   const removeSelectedItem = useCallback(
//     (item: string) => {
//       toggleSelection(item);
//       if (selectedItemForRightBar?.id === item) {
//         setIsRightBarOpen(false);
//         setSelectedItemForRightBar(null);
//       }
//     },
//     [toggleSelection, selectedItemForRightBar]
//   );

//   const resetAllSelections = useCallback(() => {
//     setSelectedItems([]);
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//   }, []);

//   const handleItemClickForRightBar = useCallback((item: CombinedDataItem) => {
//     setSelectedItemForRightBar(item);
//     setIsRightBarOpen(true);
//   }, []);

//   const closeRightBar = useCallback(() => {
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//   }, []);

//   // Filtered data based on search and selections
//   const filteredData = useMemo(() => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     return allData.filter((item) => {
//       const matchesSearch = item.label.toLowerCase().includes(lowerCaseSearchTerm);

//       if (item.type === "category" && item.subcategories) {
//         const matchesSubcategoryOrProduct = item.subcategories.some(sub =>
//           sub.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//           (sub.products && sub.products.some(prod => prod.label.toLowerCase().includes(lowerCaseSearchTerm)))
//         );
//         return matchesSearch || matchesSubcategoryOrProduct;
//       }
//       return matchesSearch;
//     });
//   }, [searchTerm]);

//   const portfolioCategories = useMemo(() => filteredData.filter((item): item is CategoryItem => item.type === "category"), [filteredData]);
//   const industriesData = useMemo(() => filteredData.filter((item): item is Item => item.type === "industry"), [filteredData]);
//   const companySizesData = useMemo(() => filteredData.filter((item): item is Item => item.type === "companySize"), [filteredData]);

//   const selectedItemsDetails = useMemo(() => {
//     return selectedItems.map(id => allData.find(item => item.id === id)).filter(Boolean) as CombinedDataItem[];
//   }, [selectedItems]);

//   // Component for Right Bar Info
//   const RightBarInfo = ({ item, onClose }: { item: CombinedDataItem | null; onClose: () => void }) => {
//     if (!item) return null;

//     const isSelected = selectedItems.includes(item.id);

//     return (
//       <div className="absolute right-0 top-0 h-full w-1/3 bg-white border-l border-gray-100 shadow-xl p-8 overflow-y-auto transform transition-transform duration-300 ease-out z-20">
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h3 className="text-2xl font-extrabold text-gray-800">Details View</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
//             aria-label="Close details"
//           >
//             <FiX className="w-7 h-7" />
//           </button>
//         </div>

//         <div className="space-y-6">
//           <div className="flex items-center space-x-4 mb-4">
//             {item.type !== "category" && 'icon' in item && item.icon && 'color' in item && item.color ? (
//               <div className={`p-3 rounded-xl ${item.color} text-white shadow-md`}>
//                 {item.icon}
//               </div>
//             ) : (
//               <FiLayers className="text-orange-600-500 w-10 h-10" />
//             )}
//             <h2 className="text-3xl font-bold text-gray-900 leading-tight">{item.label}</h2>
//           </div>

//           {'description' in item && item.description && (
//             <div className="bg-white-800 p-4 rounded-lg border border-blue-100">
//               <p className="text-gray-800 text-lg">{item.description}</p>
//             </div>
//           )}

//           {item.type === "category" && 'subcategories' in item && item.subcategories && item.subcategories.length > 0 && (
//             <div className="mt-6">
//               <h4 className="font-bold text-gray-700 mb-4 text-xl">Category Breakdown:</h4>
//               <div className="space-y-4">
//                 {item.subcategories.map(sub => (
//                   <div key={sub.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
//                     <p className="font-semibold text-gray-800 text-lg flex items-center">
//                       <FiChevronRight className="mr-2 text-orange-600-600" /> {sub.label}
//                     </p>
//                     {sub.products && sub.products.length > 0 && (
//                       <div className="ml-6 mt-3 space-y-2">
//                         <h5 className="font-medium text-gray-600 text-md mb-2 border-b border-gray-200 pb-1">Associated Products:</h5>
//                         <ul className="list-none space-y-2">
//                           {sub.products.map(prod => (
//                             <li key={prod.id} className="flex items-start text-gray-700 text-sm">
//                               <FiCheckCircle className="mr-2 mt-1 text-green-500 flex-shrink-0" />
//                               <div>
//                                 <strong className="text-gray-900">{prod.label}:</strong> {prod.description || "Detailed product information forthcoming."}
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {item.type !== "category" && 'details' in item && item.details && item.details.length > 0 && (
//             <div className="mt-6">
//               <h4 className="font-bold text-gray-700 mb-4 text-xl">Key Aspects:</h4>
//               <dl className="space-y-3">
//                 {item.details.map((detail, index) => (
//                   <div key={index} className="flex items-start">
//                     <span className="font-semibold text-orange-600-600 mr-2 min-w-[100px]">{detail.label}:</span>
//                     <dd className="text-gray-700 flex-1">{detail.value}</dd>
//                   </div>
//                 ))}
//               </dl>
//             </div>
//           )}

//           <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
//             <button
//               className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ease-in-out
//                 ${isSelected ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}
//                 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300`}
//               onClick={() => {
//                 toggleSelection(item.id);
//                 // Optionally keep the bar open or close it
//                 // onClose();
//               }}
//             >
//               {isSelected ? "Remove from Selections" : "Add to Selections"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // BTP Category view component - integrated directly for simplicity given its static nature
//   const BTPCategoryView = () => (
//     <div className="border border-gray-200 rounded-xl bg-gray-50 mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
//       <div className="flex items-center p-4 bg-amber-50 rounded-t-xl cursor-pointer" onClick={() => toggleCategoryExpand("btp")}>
//         <div className="flex items-center flex-grow">
//           <input
//             type="checkbox"
//             id="category-btp"
//             checked={selectedItems.includes("btp")}
//             onChange={(e) => { e.stopPropagation(); toggleSelection("btp"); }}
//             className="form-checkbox h-5 w-5 text-orange-600-600 rounded-md mr-3 border-gray-300 focus:ring-blue-500"
//           />
//           <label htmlFor="category-btp" className="font-extrabold text-lg flex items-center text-gray-800 cursor-pointer">
//             <FiPackage className="text-amber-600 mr-2 w-6 h-6" />Business Technology Platform
//           </label>
//         </div>
//         <div className="flex items-center text-gray-600 text-sm">
//           <span className="mr-2">Subcategories & Products</span>
//           {expandedCategories["btp"] ? <FiChevronDown className="w-5 h-5 transition-transform duration-200 transform rotate-180" /> : <FiChevronRight className="w-5 h-5 transition-transform duration-200" />}
//         </div>
//       </div>

//       {expandedCategories["btp"] && (
//         <div className="py-3 px-2 border-t border-gray-100">
//           {allData.find(d => d.id === "btp")?.['subcategories']?.map(sub => (
//             <div key={sub.id} className="mb-2">
//               <div
//                 className={`flex items-center py-2 pl-8 pr-4 rounded-lg transition-colors duration-200 cursor-pointer
//                           ${selectedItems.includes(sub.id) ? "bg-blue-100 text-gray-800" : "hover:bg-gray-100 text-gray-700"}`}
//                 onClick={() => toggleCategoryExpand(sub.id)}
//               >
//                 <input
//                   type="checkbox"
//                   id={`subcategory-btp-${sub.id}`}
//                   checked={selectedItems.includes(sub.id)}
//                   onChange={(e) => { e.stopPropagation(); toggleSelection(sub.id); }}
//                   className="form-checkbox h-4 w-4 text-orange-600-600 rounded mr-2 border-gray-300 focus:ring-blue-500"
//                 />
//                 <label htmlFor={`subcategory-btp-${sub.id}`} className="font-medium flex-grow text-base cursor-pointer">
//                   {sub.label}
//                 </label>
//                 {sub.products && sub.products.length > 0 && (
//                   <span className="text-sm text-gray-500 flex items-center">
//                     {sub.products.length} Products
//                     {expandedCategories[sub.id] ? <FiChevronDown className="ml-1 transition-transform duration-200 transform rotate-180" /> : <FiChevronRight className="ml-1 transition-transform duration-200" />}
//                   </span>
//                 )}
//               </div>
//               {sub.products && expandedCategories[sub.id] && (
//                 <div className="ml-16 mt-2 space-y-1">
//                   {sub.products.map(product => (
//                     <div
//                       key={product.id}
//                       className={`flex items-center py-1.5 pl-4 pr-3 rounded-md transition-colors duration-200 cursor-pointer
//                                 ${selectedItems.includes(product.id) ? "bg-green-50 text-green-800" : "hover:bg-gray-50 text-gray-600"}`}
//                       onClick={() => toggleSelection(product.id)}
//                     >
//                       <input
//                         type="checkbox"
//                         id={`product-btp-${product.id}`}
//                         checked={selectedItems.includes(product.id)}
//                         onChange={() => toggleSelection(product.id)}
//                         className="form-checkbox h-3.5 w-3.5 text-green-600 rounded mr-2 border-gray-300 focus:ring-green-500"
//                       />
//                       <label htmlFor={`product-btp-${product.id}`} className="text-sm cursor-pointer flex-grow">
//                         {product.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="w-full  flex items-center justify-center  font-sans">
//       <div className="bg-white rounded-2xl w-full  flex shadow-2xl">

//         {/* Left Panel - Selection and Filters */}
//         <div className="w-1/3 border-r border-gray-100 p-8 overflow-y-auto custom-scrollbar relative">
//           <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
//             <h2 className="text-3xl font-extrabold text-gray-900">Filter Hub</h2>
//             <button
//               onClick={resetAllSelections}
//               className="text-orange-600-600 hover:text-gray-800 flex items-center text-sm font-medium px-3 py-1.5 rounded-full bg-white-800 hover:bg-blue-100 transition-colors duration-200"
//             >
//               <FiRefreshCw className="mr-1" /> Reset All
//             </button>
//           </div>

//           <div className="mb-8">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search categories, industries, sizes..."
//                 className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-700 text-base"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 aria-label="Search filter options"
//               />
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" />
//             </div>
//           </div>

//           {/* Selected Items Display */}
//           {selectedItemsDetails.length > 0 && (
//             <div className="mb-8 border-b border-gray-100 pb-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Your Active Selections:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedItemsDetails.map((item) => (
//                   <span
//                     key={item.id}
//                     className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full flex items-center font-medium shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105"
//                   >
//                     {item.label}
//                     <button
//                       onClick={() => removeSelectedItem(item.id)}
//                       className="ml-2 -mr-1 p-1 rounded-full hover:bg-white-8000 transition-colors duration-200"
//                       aria-label={`Remove ${item.label}`}
//                     >
//                       <FiX className="w-4 h-4" />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Portfolio Categories Filter */}
//           <div className="mb-8 border-b border-gray-100 pb-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Portfolio Categories</h3>
//             <div className="space-y-3">
//               {portfolioCategories.map((category) => (
//                 <div key={category.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 shadow-sm">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id={`filter-category-${category.id}`}
//                         checked={selectedItems.includes(category.id)}
//                         onChange={() => toggleSelection(category.id)}
//                         className="form-checkbox h-5 w-5 text-orange-600-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
//                       />
//                       <label htmlFor={`filter-category-${category.id}`} className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
//                         {category.label}
//                       </label>
//                     </div>
//                     {category.subcategories && category.subcategories.length > 0 && (
//                       <button
//                         onClick={() => toggleCategoryExpand(category.id)}
//                         className="text-gray-500 hover:text-gray-700 transition-colors duration-200 ml-2 p-1 rounded-full hover:bg-gray-200"
//                         aria-expanded={expandedCategories[category.id]}
//                       >
//                         {expandedCategories[category.id] ? <FiChevronDown className="w-5 h-5 transform rotate-180 transition-transform duration-200" /> : <FiChevronRight className="w-5 h-5 transition-transform duration-200" />}
//                       </button>
//                     )}
//                   </div>
//                   {category.subcategories && expandedCategories[category.id] && (
//                     <div className="ml-6 mt-3 space-y-2 border-l-2 border-blue-200 pl-4 py-2">
//                       {category.subcategories.map((sub) => (
//                         <div key={sub.id} className="bg-white rounded-md p-2 hover:bg-white-800 transition-colors duration-200 shadow-xs">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                               <input
//                                 type="checkbox"
//                                 id={`filter-subcategory-${sub.id}`}
//                                 checked={selectedItems.includes(sub.id)}
//                                 onChange={() => toggleSelection(sub.id)}
//                                 className="form-checkbox h-4 w-4 text-purple-600 rounded-sm border-gray-300 focus:ring-purple-500 cursor-pointer"
//                               />
//                               <label htmlFor={`filter-subcategory-${sub.id}`} className="ml-3 text-md text-gray-600 font-medium cursor-pointer">
//                                 {sub.label}
//                               </label>
//                             </div>
//                             {sub.products && sub.products.length > 0 && (
//                               <button
//                                 onClick={() => toggleCategoryExpand(sub.id)}
//                                 className="text-gray-800 hover:text-gray-600 transition-colors duration-200 ml-2 p-1 rounded-full hover:bg-gray-100"
//                                 aria-expanded={expandedCategories[sub.id]}
//                               >
//                                 {expandedCategories[sub.id] ? <FiChevronDown className="w-4 h-4 transform rotate-180 transition-transform duration-200" /> : <FiChevronRight className="w-4 h-4 transition-transform duration-200" />}
//                               </button>
//                             )}
//                           </div>
//                           {sub.products && expandedCategories[sub.id] && (
//                             <div className="ml-6 mt-2 space-y-1 border-l border-gray-200 pl-3 py-1">
//                               {sub.products.map((product) => (
//                                 <div key={product.id} className="flex items-center hover:bg-green-50 rounded-sm p-1.5 transition-colors duration-200">
//                                   <input
//                                     type="checkbox"
//                                     id={`filter-product-${product.id}`}
//                                     checked={selectedItems.includes(product.id)}
//                                     onChange={() => toggleSelection(product.id)}
//                                     className="form-checkbox h-3.5 w-3.5 text-green-600 rounded-sm border-gray-300 focus:ring-green-500 cursor-pointer"
//                                   />
//                                   <label htmlFor={`filter-product-${product.id}`} className="ml-3 text-sm text-gray-500 cursor-pointer">
//                                     {product.label}
//                                   </label>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Industries Filter */}
//           <div className="mb-8 border-b border-gray-100 pb-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Industries</h3>
//             <div className="space-y-3">
//               {industriesData.map((industry) => (
//                 <div key={industry.id} className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 shadow-sm">
//                   <input
//                     type="checkbox"
//                     id={`filter-industry-${industry.id}`}
//                     checked={selectedItems.includes(industry.id)}
//                     onChange={() => toggleSelection(industry.id)}
//                     className="form-checkbox h-5 w-5 text-orange-600-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
//                   />
//                   <label htmlFor={`filter-industry-${industry.id}`} className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
//                     {industry.label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Company Size Filter */}
//           <div className="mb-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Company Size</h3>
//             <div className="space-y-3">
//               {companySizesData.map((size) => (
//                 <div key={size.id} className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 shadow-sm">
//                   <input
//                     type="checkbox"
//                     id={`filter-size-${size.id}`}
//                     checked={selectedItems.includes(size.id)}
//                     onChange={() => toggleSelection(size.id)}
//                     className="form-checkbox h-5 w-5 text-orange-600-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
//                   />
//                   <label htmlFor={`filter-size-${size.id}`} className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
//                     {size.label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Content Display (List/Card View) */}
//         <div className={`relative p-8 transition-all duration-300 ease-out ${isRightBarOpen ? "w-2/3" : "w-full"}`}>
//           <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
//             <h2 className="text-3xl font-extrabold text-gray-900">Discover Solutions</h2>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-3 rounded-full transition-all duration-200 shadow-md
//                   ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
//                 aria-label="Switch to list view"
//               >
//                 <FiList className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={() => setViewMode("card")}
//                 className={`p-3 rounded-full transition-all duration-200 shadow-md
//                   ${viewMode === "card" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
//                 aria-label="Switch to card view"
//               >
//                 <CgMenuGridR className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className="overflow-y-auto pr-4 custom-scrollbar" style={{ maxHeight: 'calc(100% - 100px)' }}> {/* Adjust max-height based on header */}
//             {searchTerm === "" && selectedItems.length === 0 ? (
//               <div className="text-center text-gray-500 py-20 flex flex-col items-center justify-center">
//                 <FiInfo className="w-16 h-16 mx-auto mb-6 text-orange-600-300" />
//                 <p className="text-xl font-medium">Start by searching or selecting filters on the left to explore our offerings.</p>
//                 <p className="text-md text-gray-800 mt-2">Your perfect solution awaits!</p>
//               </div>
//             ) : (
//               <>
//                 {/* Display Portfolio Categories and their subcategories/products based on filters */}
//                 {portfolioCategories.map((category) => {
//                   const filteredSubcategories = category.subcategories?.filter(sub =>
//                     selectedItems.includes(category.id) || selectedItems.includes(sub.id) ||
//                     sub.products?.some(prod => selectedItems.includes(prod.id)) ||
//                     sub.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     (sub.products && sub.products.some(prod => prod.label.toLowerCase().includes(searchTerm.toLowerCase())))
//                   ) || [];

//                   const categoryMatchesSearch = category.label.toLowerCase().includes(searchTerm.toLowerCase());
//                   const hasSelectedSubItems = selectedItems.includes(category.id) || filteredSubcategories.some(sub => selectedItems.includes(sub.id) || (sub.products && sub.products.some(prod => selectedItems.includes(prod.id))));

//                   const displayCategory = categoryMatchesSearch || hasSelectedSubItems || filteredSubcategories.length > 0;

//                   if (!displayCategory && searchTerm !== "") return null; // Only hide if search is active and no match

//                   return (
//                     <div key={category.id} className="mb-10 p-6 bg-white-800 rounded-xl shadow-inner border border-blue-100">
//                       <div
//                         className={`flex items-center mb-5 cursor-pointer group`}
//                         onClick={() => handleItemClickForRightBar(category)}
//                       >
//                         {viewMode === "list" ? (
//                           <div className="flex items-center text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
//                             <FiLayers className="mr-3 w-7 h-7 text-orange-600-600 group-hover:text-orange-600-700" /> {category.label}
//                           </div>
//                         ) : (
//                           <h3 className="text-3xl font-extrabold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
//                             {category.label}
//                           </h3>
//                         )}
//                         {category.info && (
//                           <button
//                             className="ml-3 text-orange-600-400 hover:text-orange-600-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-100"
//                             aria-label={`More info about ${category.label}`}
//                             onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(category); }}
//                           >
//                             <FiInfo className="w-6 h-6" />
//                           </button>
//                         )}
//                       </div>

//                       <p className="text-gray-700 mb-6 text-lg">{category.description}</p>

//                       {/* Display subcategories and products */}
//                       <div className={viewMode === "card" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
//                         {category.subcategories?.map((sub) => {
//                           const filteredProducts = sub.products?.filter(prod =>
//                             selectedItems.includes(prod.id) || prod.label.toLowerCase().includes(searchTerm.toLowerCase())
//                           ) || [];

//                           const subcategoryMatchesSearch = sub.label.toLowerCase().includes(searchTerm.toLowerCase());
//                           const hasSelectedProducts = filteredProducts.some(prod => selectedItems.includes(prod.id));

//                           const displaySubcategory = subcategoryMatchesSearch || hasSelectedProducts || filteredProducts.length > 0;

//                           if (!displaySubcategory && searchTerm !== "") return null; // Only hide if search is active and no match

//                           return (
//                             <div key={sub.id}>
//                               {viewMode === "list" && (
//                                 <div
//                                   className="flex items-center ml-4 mb-3 text-xl font-semibold text-gray-700 cursor-pointer hover:text-purple-700 transition-colors duration-200"
//                                   onClick={() => handleItemClickForRightBar(sub)}
//                                 >
//                                   <FiChevronRight className="mr-3 w-5 h-5 text-purple-500" /> {sub.label}
//                                   {sub.products && sub.products.length > 0 && (
//                                     <button
//                                       className="ml-2 text-gray-800 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
//                                       aria-label={`More info about ${sub.label}`}
//                                       onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(sub); }}
//                                     >
//                                       <FiInfo className="w-5 h-5" />
//                                     </button>
//                                   )}
//                                 </div>
//                               )}

//                               <div className={viewMode === "card" ? "" : "ml-10 space-y-3"}>
//                                 {filteredProducts.map((product) => (
//                                   <div
//                                     key={product.id}
//                                     className={`relative border rounded-xl p-5 shadow-sm transition-all duration-300 ease-in-out cursor-pointer group
//                                                 ${selectedItems.includes(product.id) ? "bg-green-50 border-green-200 shadow-lg ring-2 ring-green-300" : "bg-white border-gray-200 hover:shadow-md hover:border-blue-100"}`}
//                                     onClick={() => handleItemClickForRightBar(product)}
//                                   >
//                                     <div className="flex items-center justify-between mb-3">
//                                       <div className="flex items-center">
//                                         {product.icon && <span className="mr-3 text-orange-600-500 text-xl">{product.icon}</span>}
//                                         <h4 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600-700 transition-colors duration-200">
//                                           {product.label}
//                                         </h4>
//                                       </div>
//                                       <button
//                                         className="text-gray-800 hover:text-orange-600-600 transition-colors duration-200 p-1 rounded-full hover:bg-white-800"
//                                         aria-label={`More info about ${product.label}`}
//                                         onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(product); }}
//                                       >
//                                         <FiInfo className="w-5 h-5" />
//                                       </button>
//                                     </div>
//                                     {product.description && (
//                                       <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
//                                     )}
//                                     <div className="flex justify-end">
//                                       <input
//                                         type="checkbox"
//                                         checked={selectedItems.includes(product.id)}
//                                         onChange={(e) => { e.stopPropagation(); toggleSelection(product.id); }}
//                                         className="form-checkbox h-5 w-5 text-orange-600-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
//                                       />
//                                     </div>
//                                     {selectedItems.includes(product.id) && (
//                                       <FiCheckCircle className="absolute top-3 right-3 text-green-500 w-6 h-6 animate-fade-in" />
//                                     )}
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}

//                 {/* Industries and Company Sizes */}
//                 {(industriesData.length > 0 || companySizesData.length > 0) && (
//                   <div className="mt-10 p-6 bg-purple-50 rounded-xl shadow-inner border border-purple-100">
//                     {industriesData.length > 0 && (
//                       <>
//                         <h3 className="text-2xl font-bold text-purple-800 mb-6 border-b border-purple-200 pb-3">Industries We Serve</h3>
//                         <div className={`${viewMode === "card" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4 mb-8"}`}>
//                           {industriesData.map((industry) => (
//                             <div
//                               key={industry.id}
//                               className={`relative border rounded-xl p-5 shadow-sm transition-all duration-300 ease-in-out cursor-pointer group
//                                           ${selectedItems.includes(industry.id) ? "bg-white-800 border-blue-200 shadow-lg ring-2 ring-blue-300" : "bg-white border-gray-200 hover:shadow-md hover:border-blue-100"}`}
//                               onClick={() => handleItemClickForRightBar(industry)}
//                             >
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center">
//                                   {industry.icon && <span className={`mr-3 p-2 rounded-full text-white ${industry.color} shadow-md`}>{industry.icon}</span>}
//                                   <h4 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600-700 transition-colors duration-200">
//                                     {industry.label}
//                                   </h4>
//                                 </div>
//                                 <button
//                                   className="text-gray-800 hover:text-orange-600-600 transition-colors duration-200 p-1 rounded-full hover:bg-white-800"
//                                   aria-label={`More info about ${industry.label}`}
//                                   onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(industry); }}
//                                 >
//                                   <FiInfo className="w-5 h-5" />
//                                 </button>
//                               </div>
//                               {industry.description && (
//                                 <p className="text-sm text-gray-600 line-clamp-2 mb-4">{industry.description}</p>
//                               )}
//                               <div className="flex justify-end">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedItems.includes(industry.id)}
//                                   onChange={(e) => { e.stopPropagation(); toggleSelection(industry.id); }}
//                                   className="form-checkbox h-5 w-5 text-orange-600-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
//                                 />
//                               </div>
//                               {selectedItems.includes(industry.id) && (
//                                 <FiCheckCircle className="absolute top-3 right-3 text-green-500 w-6 h-6 animate-fade-in" />
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </>
//                     )}

//                     {companySizesData.length > 0 && (
//                       <>
//                         <h3 className="text-2xl font-bold text-purple-800 mb-6 border-b border-purple-200 pb-3 mt-8">Company Sizes</h3>
//                         <div className={`${viewMode === "card" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
//                           {companySizesData.map((size) => (
//                             <div
//                               key={size.id}
//                               className={`relative border rounded-xl p-5 shadow-sm transition-all duration-300 ease-in-out cursor-pointer group
//                                           ${selectedItems.includes(size.id) ? "bg-white-800 border-blue-200 shadow-lg ring-2 ring-blue-300" : "bg-white border-gray-200 hover:shadow-md hover:border-blue-100"}`}
//                               onClick={() => handleItemClickForRightBar(size)}
//                             >
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center">
//                                   {size.icon && <span className={`mr-3 p-2 rounded-full text-white ${size.color} shadow-md`}>{size.icon}</span>}
//                                   <h4 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600-700 transition-colors duration-200">
//                                     {size.label}
//                                   </h4>
//                                 </div>
//                                 <button
//                                   className="text-gray-800 hover:text-orange-600-600 transition-colors duration-200 p-1 rounded-full hover:bg-white-800"
//                                   aria-label={`More info about ${size.label}`}
//                                   onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(size); }}
//                                 >
//                                   <FiInfo className="w-5 h-5" />
//                                 </button>
//                               </div>
//                               {size.description && (
//                                 <p className="text-sm text-gray-600 line-clamp-2 mb-4">{size.description}</p>
//                               )}
//                               <div className="flex justify-end">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedItems.includes(size.id)}
//                                   onChange={(e) => { e.stopPropagation(); toggleSelection(size.id); }}
//                                   className="form-checkbox h-5 w-5 text-orange-600-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
//                                 />
//                               </div>
//                               {selectedItems.includes(size.id) && (
//                                 <FiCheckCircle className="absolute top-3 right-3 text-green-500 w-6 h-6 animate-fade-in" />
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>

//         {isRightBarOpen && (
//           <RightBarInfo item={selectedItemForRightBar} onClose={closeRightBar} />
//         )}
//       </div>
//     </div>
//   );
// }

//###################################### New Version #######################################""

// import { useState, useCallback, useMemo, Fragment } from "react";
// import {
//   FiRefreshCw,
//   FiChevronRight,
//   FiChevronDown,
//   FiGrid,
//   FiShoppingCart,
//   FiDollarSign,
//   FiX,
//   FiPackage,
//   FiLayers,
//   FiInfo,
//   FiBookmark,
//   FiBriefcase,
//   FiGlobe,
//   FiTrendingUp,
//   FiBox,
//   FiActivity,
//   FiTarget,
//   FiMapPin,
//   FiCpu,
//   FiPlus,
//   FiCheckCircle,
//   FiStar,
//   FiSearch, // Added for search functionality
//   FiSettings, // Example for header
//   FiUser,     // Example for header
//   FiCompass, // For a section icon
// } from "react-icons/fi";
// import { Dialog, Transition } from '@headlessui/react' // Using Headless UI for modal/dialog

// // Types (re-declared for completeness within the immersive block)
// type SubCategory = {
//   id: string;
//   label: string;
//   type: "product" | "subcategory";
//   products?: Item[];
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   type: "category";
//   subcategories?: SubCategory[];
//   description?: string;
// };

// type Item = {
//   id: string;
//   label: string;
//   icon?: React.ReactNode;
//   color?: string;
//   type: "industry" | "companySize" | "product";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type CombinedDataItem = CategoryItem | Item | SubCategory;

// // Data (re-declared for completeness within the immersive block)
// const allData: CombinedDataItem[] = [
//   // Portfolio Categories
//   { id: "excellence", label: "Excellencia S/Excellencia Cloud", type: "category", description: "Our flagship cloud offerings for comprehensive business solutions, designed for unparalleled performance and scalability." },
//   {
//     id: "ai", label: "Artificial Intelligence", info: true, type: "category",
//     description: "Leverage cutting-edge AI to transform your business operations, unlock deep insights, and automate complex tasks with intelligent systems.",
//     subcategories: [
//       {
//         id: "ai_platform", label: "AI Platform Services", type: "subcategory",
//         products: [
//           { id: "ai_core", label: "AI Core Engine", type: "product", description: "The foundational AI engine for developing and deploying sophisticated machine learning models, offering robust computational power." },
//           { id: "data_intelligence", label: "Data Intelligence Hub", type: "product", description: "A centralized hub for advanced data processing, real-time analysis, and predictive modeling, enabling smart, data-driven decisions." }
//         ]
//       },
//       {
//         id: "ml_solutions", label: "Machine Learning Solutions", type: "subcategory",
//         products: [
//           { id: "predictive_analytics", label: "Predictive Analytics Suite", type: "product", description: "Powerful tools for forecasting future trends, identifying opportunities, and mitigating risks across various business domains." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     type: "category",
//     description: "Innovate and integrate with our robust Business Technology Platform, providing a foundation for agile development and intelligent enterprise.",
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         type: "subcategory",
//         products: [
//           { id: "app_studio", label: "Excellencia App Studio", type: "product", description: "A comprehensive low-code/no-code platform for rapid application development and deployment, empowering citizen developers and IT." },
//           { id: "process_automation", label: "Process Automation Suite", type: "product", description: "Automate business processes end-to-end for increased efficiency, reduced manual effort, and improved operational agility." },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         type: "subcategory",
//         products: [
//           { id: "data_warehouse", label: "Excellencia Data Warehouse Cloud", type: "product", description: "Scalable cloud-based data warehousing solution for all your data needs, offering high performance and flexibility for analytics." },
//           { id: "analytics_cloud", label: "Excellencia Analytics Cloud", type: "product", description: "Integrated business intelligence, planning, and predictive analytics in the cloud, enabling informed decisions and strategic foresight." },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         type: "subcategory",
//         products: [
//           { id: "data_migration", label: "Excellencia Advanced Data Migration and Management by Syniti", type: "product", description: "Robust data migration and management tools ensuring data quality, consistency, and seamless transfer across systems." },
//           { id: "ariba_integration", label: "Ariba Cloud Integration", type: "product", description: "Seamless integration capabilities with Ariba cloud services for optimized procurement processes and enhanced supplier collaboration." },
//           { id: "integration_suite", label: "Excellencia Integration Suite", type: "product", description: "A comprehensive suite for enterprise integration, connecting diverse applications and processes across your IT landscape." },
//         ],
//       },
//     ],
//   },
//   {
//     id: "crm", label: "CRM and Customer Experience", info: true, type: "category",
//     description: "Optimize customer interactions and enhance their overall experience, building lasting relationships and driving loyalty.",
//     subcategories: [
//       { id: "sales_cloud", label: "Sales Cloud", type: "subcategory", products: [{ id: "crm_sales", label: "CRM Sales Automation", type: "product", description: "Automate sales processes, manage leads, and foster strong customer relationships with a powerful sales force automation solution." }] },
//       { id: "service_cloud", label: "Service Cloud", type: "subcategory", products: [{ id: "crm_service", label: "CRM Service Management", type: "product", description: "Deliver exceptional customer service and support operations with intelligent service management tools and omnichannel capabilities." }] },
//     ]
//   },
//   {
//     id: "erp", label: "Enterprise Resource Planning", info: true, type: "category",
//     description: "Streamline your core business processes with our comprehensive ERP solutions, integrating finance, logistics, and more for efficiency.",
//     subcategories: [
//       { id: "s4hana", label: "S/4HANA", type: "subcategory", products: [{ id: "erp_core", label: "ERP Core Functions", type: "product", description: "Next-generation ERP functionalities for finance, logistics, manufacturing, and more, leveraging in-memory computing for real-time insights." }] }
//     ]
//   },
//   {
//     id: "finance", label: "Financial Management", info: true, type: "category",
//     description: "Gain real-time financial insights and streamline your financial operations, ensuring compliance and strategic financial planning.",
//     subcategories: [
//       { id: "financial_planning", label: "Financial Planning", type: "subcategory", products: [{ id: "fp_suite", label: "Financial Planning Suite", type: "product", description: "Tools for budgeting, forecasting, and in-depth financial analysis to drive performance and achieve financial goals." }] }
//     ]
//   },
//   {
//     id: "hcm", label: "Human Capital Management", info: true, type: "category",
//     description: "Manage your workforce effectively from hire to retire, optimizing talent management and employee experience.",
//     subcategories: [
//       { id: "successfactors", label: "SuccessFactors", type: "subcategory", products: [{ id: "hcm_suite", label: "HCM Suite", type: "product", description: "Comprehensive human capital management solutions covering HR, payroll, talent management, and employee engagement." }] }
//     ]
//   },
//   {
//     id: "spend", label: "Spend Management", info: true, type: "category",
//     description: "Optimize spending, enhance compliance, and drive savings across your organization with integrated spend management solutions.",
//     subcategories: [
//       { id: "concur", label: "Concur", type: "subcategory", products: [{ id: "travel_expense", label: "Travel & Expense Management", type: "product", description: "Automate travel and expense reporting for greater control, visibility, and compliance." }] }
//     ]
//   },
//   {
//     id: "scm", label: "Supply Chain Management", info: true, type: "category",
//     description: "Transform your supply chain for resilience, efficiency, and sustainability, from planning to logistics.",
//     subcategories: [
//       { id: "ariba", label: "Ariba", type: "subcategory", products: [{ id: "procurement_suite", label: "Procurement Suite", type: "product", description: "Streamline procurement and supplier management processes for better collaboration and cost control." }] }
//     ]
//   },

//   // Industries
//   {
//     id: "aerospace", label: "Aerospace and Defense", icon: <FiTarget />, color: "bg-blue-600", type: "industry", description: "Solutions tailored for the unique demands of the aerospace and defense sectors, ensuring precision and reliability.",
//     details: [
//       { label: "Focus Areas", value: "Complex Manufacturing, Global Logistics, Regulatory Compliance, Project Management" },
//       { label: "Key Benefits", value: "Enhanced operational efficiency, Improved supply chain visibility, Accelerated innovation cycles, Risk mitigation" }
//     ]
//   },
//   {
//     id: "automotive", label: "Automotive", icon: <FiActivity />, color: "bg-red-600", type: "industry", description: "Drive innovation and efficiency across the automotive value chain, from design to after-sales service.",
//     details: [
//       { label: "Focus Areas", value: "Vehicle Production, R&D, Sales & Service, Supplier Collaboration" },
//       { label: "Key Benefits", value: "Accelerated time-to-market, Enhanced customer satisfaction, Optimized production processes" }
//     ]
//   },
//   {
//     id: "banking", label: "Banking", icon: <FiDollarSign />, color: "bg-green-600", type: "industry", description: "Secure and intelligent financial solutions for banking institutions, enabling digital transformation and customer-centricity.",
//     details: [
//       { label: "Focus Areas", value: "Digital Banking, Risk Management, Core Banking Transformation, Customer Engagement" },
//       { label: "Key Benefits", value: "Enhanced security and compliance, Improved customer experience, Operational efficiency, Fraud prevention" }
//     ]
//   },
//   {
//     id: "chemicals", label: "Chemicals", icon: <FiBox />, color: "bg-purple-600", type: "industry", description: "Specialized management systems for chemical industries, focusing on safety, compliance, and sustainable operations.",
//     details: [
//       { label: "Focus Areas", value: "Batch Production, Supply Chain Optimization, Environmental Health & Safety (EHS)" },
//       { label: "Key Benefits", value: "Optimized resource utilization, Strict regulatory compliance, Improved plant safety" }
//     ]
//   },
//   {
//     id: "consumer", label: "Consumer Products", icon: <FiShoppingCart />, color: "bg-yellow-600", type: "industry", description: "Solutions designed for consumer goods manufacturers to meet evolving customer demands and optimize market presence.",
//     details: [
//       { label: "Focus Areas", value: "Demand Planning, Brand Management, Retail Execution, E-commerce Integration" },
//       { label: "Key Benefits", value: "Faster time-to-market, Increased sales and brand loyalty, Efficient inventory management" }
//     ]
//   },
//   {
//     id: "defense", label: "Defense and Security", icon: <FiBookmark />, color: "bg-indigo-600", type: "industry", description: "Mission-critical software for defense and security organizations, ensuring readiness and operational excellence.",
//     details: [
//       { label: "Focus Areas", value: "Asset Management, Project Lifecycle Management, Cybersecurity, Logistics" },
//       { label: "Key Benefits", value: "Enhanced operational readiness, Optimized resource allocation, Secure data management" }
//     ]
//   },
//   {
//     id: "education", label: "Education and Research", icon: <FiBookmark />, color: "bg-pink-600", type: "industry", description: "Tools for educational institutions and research organizations to foster learning, collaboration, and administrative efficiency.",
//     details: [
//       { label: "Focus Areas", value: "Student Information Systems, Campus Operations, Research Grant Management, Alumni Relations" },
//       { label: "Key Benefits", value: "Improved student outcomes, Streamlined administrative processes, Enhanced research capabilities" }
//     ]
//   },
//   {
//     id: "engineering", label: "Engineering and Construction", icon: <FiGrid />, color: "bg-orange-600", type: "industry", description: "Software to manage complex engineering and construction projects, from planning and execution to asset lifecycle.",
//     details: [
//       { label: "Focus Areas", value: "Project Planning & Control, Asset Performance Management, Field Service Management" },
//       { label: "Key Benefits", value: "Reduced project delays and costs, Improved project visibility, Enhanced collaboration" }
//     ]
//   },
//   {
//     id: "healthcare", label: "Healthcare", icon: <FiActivity />, color: "bg-teal-600", type: "industry", description: "Healthcare-specific management and analytics solutions, supporting patient care, operational efficiency, and regulatory compliance.",
//     details: [
//       { label: "Focus Areas", value: "Patient Management, Clinical Trials, Supply Chain for Medical Devices/Pharma" },
//       { label: "Key Benefits", value: "Improved patient care outcomes, Streamlined administrative workflows, Enhanced data security" }
//     ]
//   },
//   {
//     id: "tech", label: "High Tech", icon: <FiCpu />, color: "bg-cyan-600", type: "industry", description: "Innovative solutions for high technology companies, enabling rapid product development and global market penetration.",
//     details: [
//       { label: "Focus Areas", value: "Product Lifecycle Management, Global Supply Chain, Research & Development" },
//       { label: "Key Benefits", value: "Faster innovation cycles, Optimized manufacturing processes, Stronger competitive edge" }
//     ]
//   },
//   {
//     id: "insurance", label: "Insurance", icon: <FiStar />, color: "bg-amber-600", type: "industry", description: "Robust software solutions for the insurance sector, enhancing policy management, claims processing, and customer engagement.",
//     details: [
//       { label: "Focus Areas", value: "Policy Administration, Claims Management, Customer Relationship Management" },
//       { label: "Key Benefits", value: "Reduced processing times, Enhanced customer satisfaction, Improved risk assessment" }
//     ]
//   },
//   {
//     id: "life", label: "Life Sciences", icon: <FiActivity />, color: "bg-lime-600", type: "industry", description: "Comprehensive solutions for pharmaceutical and biotechnology companies, supporting drug discovery to market.",
//     details: [
//       { label: "Focus Areas", value: "Research & Development, Clinical Trials Management, Manufacturing & Quality Control" },
//       { label: "Key Benefits", value: "Accelerated drug discovery, Compliance with GxP regulations, Improved patient safety" }
//     ]
//   },
//   {
//     id: "media", label: "Media", icon: <FiGlobe />, color: "bg-violet-600", type: "industry", description: "Systems for media and entertainment companies, enabling content creation, distribution, and monetization.",
//     details: [
//       { label: "Focus Areas", value: "Content Production, Rights Management, Audience Engagement, Digital Distribution" },
//       { label: "Key Benefits", value: "Increased revenue streams, Broader audience reach, Efficient content lifecycle management" }
//     ]
//   },
//   {
//     id: "mill", label: "Mill Products", icon: <FiBox />, color: "bg-rose-600", type: "industry", description: "Specialized software for mill products manufacturing, optimizing production, inventory, and supply chain.",
//     details: [
//       { label: "Focus Areas", value: "Production Planning, Quality Management, Inventory Optimization, Logistics" },
//       { label: "Key Benefits", value: "Reduced waste and scrap, Improved production efficiency, Better customer service" }
//     ]
//   },
//   {
//     id: "mining", label: "Mining", icon: <FiMapPin />, color: "bg-slate-600", type: "industry", description: "Integrated solutions for mining operations, focusing on resource management, safety, and environmental responsibility.",
//     details: [
//       { label: "Focus Areas", value: "Resource Planning, Safety Management, Equipment Maintenance, Environmental Compliance" },
//       { label: "Key Benefits", value: "Increased operational efficiency, Enhanced worker safety, Sustainable resource extraction" }
//     ]
//   },
//   {
//     id: "oil", label: "Oil, Gas, and Energy", icon: <FiActivity />, color: "bg-fuchsia-600", type: "industry", description: "Robust software for the energy sector, managing operations from exploration to distribution.",
//     details: [
//       { label: "Focus Areas", value: "Upstream, Midstream, Downstream Operations, Asset Performance Management" },
//       { label: "Key Benefits", value: "Optimized asset utilization, Enhanced safety protocols, Improved regulatory adherence" }
//     ]
//   },
//   {
//     id: "professional", label: "Professional Services", icon: <FiBriefcase />, color: "bg-blue-600", type: "industry", description: "Tools for professional service firms to manage projects, resources, and client relationships effectively.",
//     details: [
//       { label: "Focus Areas", value: "Project Profitability, Resource Utilization, Client Engagement, Billing & Invoicing" },
//       { label: "Key Benefits", value: "Improved project delivery success, Higher client satisfaction, Enhanced employee productivity" }
//     ]
//   },
//   {
//     id: "public", label: "Public Sector", icon: <FiGlobe />, color: "bg-emerald-600", type: "industry", description: "Solutions for government and public administration, driving efficiency, transparency, and citizen engagement.",
//     details: [
//       { label: "Focus Areas", value: "Citizen Services, Budget Management, Public Safety, Urban Planning" },
//       { label: "Key Benefits", value: "Enhanced public services, Greater operational transparency, Improved accountability" }
//     ]
//   },
//   {
//     id: "retail", label: "Retail", icon: <FiShoppingCart />, color: "bg-amber-600", type: "industry", description: "Transform retail operations with solutions that enhance customer experience, optimize inventory, and drive sales.",
//     details: [
//       { label: "Focus Areas", value: "Omnichannel Commerce, Inventory Optimization, Customer Loyalty Programs, Store Operations" },
//       { label: "Key Benefits", value: "Personalized shopping experience, Increased sales and profitability, Efficient supply chain" }
//     ]
//   },
//   {
//     id: "sports", label: "Sports and Entertainment", icon: <FiTarget />, color: "bg-red-600", type: "industry", description: "Management systems for sports and entertainment entities, enhancing fan engagement and event operations.",
//     details: [
//       { label: "Focus Areas", value: "Event Management, Fan Engagement, Venue Operations, Sponsorship Management" },
//       { label: "Key Benefits", value: "Enhanced fan experience, Optimized event revenue, Streamlined venue operations" }
//     ]
//   },
//   {
//     id: "telecom", label: "Telecommunications", icon: <FiActivity />, color: "bg-indigo-600", type: "industry", description: "Advanced solutions for telecommunications providers, supporting network management, billing, and customer services.",
//     details: [
//       { label: "Focus Areas", value: "Network Management, Customer Billing, Service Provisioning, Digital Transformation" },
//       { label: "Key Benefits", value: "Improved service quality, Faster network deployment, Enhanced customer loyalty" }
//     ]
//   },
//   {
//     id: "travel", label: "Travel and Transportation", icon: <FiMapPin />, color: "bg-green-600", type: "industry", description: "Software for travel and logistics businesses, optimizing operations and enhancing traveler experience.",
//     details: [
//       { label: "Focus Areas", value: "Passenger Experience, Logistics & Freight, Fleet Management, Route Optimization" },
//       { label: "Key Benefits", value: "Streamlined operations, Enhanced customer satisfaction, Reduced operational costs" }
//     ]
//   },
//   {
//     id: "utilities", label: "Utilities", icon: <FiActivity />, color: "bg-orange-600", type: "industry", description: "Comprehensive systems for utility companies, managing infrastructure, services, and customer relations.",
//     details: [
//       { label: "Focus Areas", value: "Smart Grid Management, Asset Management, Customer Billing, Field Service" },
//       { label: "Key Benefits", value: "Efficient resource management, Reliable service delivery, Improved regulatory compliance" }
//     ]
//   },
//   {
//     id: "wholesale", label: "Wholesale Distribution", icon: <FiTrendingUp />, color: "bg-purple-600", type: "industry", description: "Solutions for wholesale distribution businesses, enhancing inventory management, order fulfillment, and supplier relationships.",
//     details: [
//       { label: "Focus Areas", value: "Inventory Management, Order Fulfillment, Supplier Relationship Management, Warehouse Operations" },
//       { label: "Key Benefits", value: "Optimized inventory levels, Faster order processing, Improved customer service" }
//     ]
//   },

//   // Company Sizes
//   {
//     id: "small", label: "Small Businesses", icon: <FiInfo />, color: "bg-green-600", type: "companySize", description: "Tailored solutions designed for small businesses to grow efficiently and effectively.",
//     details: [
//       { label: "Typical Challenges", value: "Limited resources, Scalability, Market penetration, Digital presence" },
//       { label: "Our Approach", value: "Cost-effective, User-friendly, Quick implementation, Integrated solutions" }
//     ]
//   },
//   {
//     id: "midsize", label: "Midsize Companies", icon: <FiInfo />, color: "bg-yellow-600", type: "companySize", description: "Flexible and scalable solutions for growing midsize companies, supporting expansion and operational excellence.",
//     details: [
//       { label: "Typical Challenges", value: "Rapid growth management, Process optimization, Talent acquisition & retention, Data silos" },
//       { label: "Our Approach", value: "Modular and scalable, Industry-specific, Cloud-first, Data-driven insights" }
//     ]
//   },
//   {
//     id: "large", label: "Large Enterprise", icon: <FiInfo />, color: "bg-blue-600", type: "companySize", description: "Robust and comprehensive solutions for large-scale enterprises, enabling complex operations and global digital transformation.",
//     details: [
//       { label: "Typical Challenges", value: "Global operations, Complex integrations, Regulatory compliance, Legacy system modernization" },
//       { label: "Our Approach", value: "Comprehensive suites, Highly customizable, Secure and compliant, AI-powered automation" }
//     ]
//   },
// ];


// /**
//  * Renders the detail view for a selected item in a sliding right sidebar.
//  * Uses Headless UI's Dialog for accessibility and proper modal behavior.
//  */
// const RightBarInfo = ({ item, onClose, toggleSelection, isSelected }: { item: CombinedDataItem | null; onClose: () => void; toggleSelection: (id: string) => void; isSelected: boolean; }) => {
//   return (
//     <Transition.Root show={!!item} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-500"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-500"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-500 sm:duration-700"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-500 sm:duration-700"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
//                   <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                     <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                       <div className="flex items-start justify-between">
//                         <Dialog.Title className="text-xl font-bold text-gray-900">Details View</Dialog.Title>
//                         <div className="ml-3 flex h-7 items-center">
//                           <button
//                             type="button"
//                             className="relative -m-2 p-2 text-gray-800 hover:text-gray-500"
//                             onClick={onClose}
//                           >
//                             <span className="absolute -inset-0.5" />
//                             <span className="sr-only">Close panel</span>
//                             <FiX className="h-6 w-6" aria-hidden="true" />
//                           </button>
//                         </div>
//                       </div>

//                       {item && (
//                         <div className="mt-8">
//                           <div className="flow-root">
//                             <div className="flex items-center space-x-4 mb-4">
//                               {item.type !== "category" && 'icon' in item && item.icon && 'color' in item && item.color ? (
//                                 <div className={`p-3 rounded-xl ${item.color} text-white shadow-md`}>
//                                   {item.icon}
//                                 </div>
//                               ) : (
//                                 <FiLayers className="text-blue-500 w-10 h-10" />
//                               )}
//                               <h2 className="text-3xl font-bold text-gray-900 leading-tight">{item.label}</h2>
//                             </div>

//                             {'description' in item && item.description && (
//                               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                                 <p className="text-blue-800 text-lg">{item.description}</p>
//                               </div>
//                             )}

//                             {item.type === "category" && 'subcategories' in item && item.subcategories && item.subcategories.length > 0 && (
//                               <div className="mt-6">
//                                 <h4 className="font-bold text-gray-700 mb-4 text-xl">Category Breakdown:</h4>
//                                 <div className="space-y-4">
//                                   {item.subcategories.map(sub => (
//                                     <div key={sub.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
//                                       <p className="font-semibold text-gray-800 text-lg flex items-center">
//                                         <FiChevronRight className="mr-2 text-blue-600" /> {sub.label}
//                                       </p>
//                                       {sub.products && sub.products.length > 0 && (
//                                         <div className="ml-6 mt-3 space-y-2">
//                                           <h5 className="font-medium text-gray-600 text-md mb-2 border-b border-gray-200 pb-1">Associated Products:</h5>
//                                           <ul className="list-none space-y-2">
//                                             {sub.products.map(prod => (
//                                               <li key={prod.id} className="flex items-start text-gray-700 text-sm">
//                                                 <FiCheckCircle className="mr-2 mt-1 text-green-500 flex-shrink-0" />
//                                                 <div>
//                                                   <strong className="text-gray-900">{prod.label}:</strong> {prod.description || "Detailed product information forthcoming."}
//                                                 </div>
//                                               </li>
//                                             ))}
//                                           </ul>
//                                         </div>
//                                       )}
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}

//                             {item.type !== "category" && 'details' in item && item.details && item.details.length > 0 && (
//                               <div className="mt-6">
//                                 <h4 className="font-bold text-gray-700 mb-4 text-xl">Key Aspects:</h4>
//                                 <dl className="space-y-3">
//                                   {item.details.map((detail, index) => (
//                                     <div key={index} className="flex items-start">
//                                       <span className="font-semibold text-blue-600 mr-2 min-w-[100px]">{detail.label}:</span>
//                                       <dd className="text-gray-700 flex-1">{detail.value}</dd>
//                                     </div>
//                                   ))}
//                                 </dl>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         {/* Summary of what this item is selected for, or other actions related to it */}
//                       </div>
//                       <p className="mt-0.5 text-sm text-gray-500">Add or remove this item from your current selection.</p>
//                       <div className="mt-6">
//                         <button
//                           className={`flex items-center justify-center w-full px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-all duration-300 ease-in-out
//                             ${isSelected ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}
//                             transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300`}
//                           onClick={() => toggleSelection(item!.id)}
//                         >
//                           {isSelected ? (
//                             <>
//                               <FiX className="w-5 h-5 mr-2" /> Remove from Selections
//                             </>
//                           ) : (
//                             <>
//                               <FiPlus className="w-5 h-5 mr-2" /> Add to Selections
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };


// /**
//  * Main ERP Solution Interface Component.
//  * Provides a dynamic and visually engaging way to explore ERP offerings.
//  */
// export default function ExcellenciaERPSolution() {
//   // State management for selections, expansions, and right sidebar
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     btp: true, // Open the Business Technology Platform category by default
//     excellence: true, // Also open Excellencia category by default
//     ai: false,
//     crm: false,
//     erp: false,
//     finance: false,
//     hcm: false,
//     spend: false,
//     scm: false,
//   });
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
//     portfolio: true,
//     industries: true,
//     companySizes: true,
//   });
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [isRightBarOpen, setIsRightBarOpen] = useState(false);
//   const [selectedItemForRightBar, setSelectedItemForRightBar] = useState<CombinedDataItem | null>(null);

//   // Handlers for state updates
//   const toggleSelection = useCallback((itemId: string) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
//     );
//   }, []);

//   const toggleCategoryExpand = useCallback((categoryId: string) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   }, []);

//   const toggleSectionExpand = useCallback((sectionId: string) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [sectionId]: !prev[sectionId],
//     }));
//   }, []);

//   const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   }, []);

//   const removeSelectedItem = useCallback(
//     (item: string) => {
//       toggleSelection(item);
//       if (selectedItemForRightBar?.id === item) {
//         setSelectedItemForRightBar(null); // Close details if removed item was detailed
//       }
//     },
//     [toggleSelection, selectedItemForRightBar]
//   );

//   const resetAllSelections = useCallback(() => {
//     setSelectedItems([]);
//     setSelectedItemForRightBar(null);
//     setIsRightBarOpen(false);
//   }, []);

//   const handleItemClickForRightBar = useCallback((item: CombinedDataItem) => {
//     setSelectedItemForRightBar(item);
//     setIsRightBarOpen(true);
//   }, []);

//   const closeRightBar = useCallback(() => {
//     setIsRightBarOpen(false);
//     // Keep selectedItemForRightBar in state for potential re-opening,
//     // but clear it if the item was deselected.
//     if (selectedItemForRightBar && !selectedItems.includes(selectedItemForRightBar.id)) {
//         setSelectedItemForRightBar(null);
//     }
//   }, [selectedItemForRightBar, selectedItems]);


//   // Memoized data filtering for performance
//   const filteredData = useMemo(() => {
//     if (!searchTerm) return allData;
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     return allData.filter(item =>
//       item.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//       ('description' in item && item.description?.toLowerCase().includes(lowerCaseSearchTerm)) ||
//       (item.type === "category" && 'subcategories' in item && item.subcategories?.some(sub =>
//         sub.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//         sub.products?.some(prod =>
//           prod.label.toLowerCase().includes(lowerCaseSearchTerm) || prod.description?.toLowerCase().includes(lowerCaseSearchTerm)
//         )
//       ))
//     );
//   }, [searchTerm]);

//   const portfolioCategories = useMemo(() =>
//     filteredData.filter((item): item is CategoryItem => item.type === "category"),
//     [filteredData]
//   );
//   const industriesData = useMemo(() =>
//     filteredData.filter((item): item is Item => item.type === "industry"),
//     [filteredData]
//   );
//   const companySizesData = useMemo(() =>
//     filteredData.filter((item): item is Item => item.type === "companySize"),
//     [filteredData]
//   );

//   const selectedItemsDetails = useMemo(() => {
//     return selectedItems.map(id => allData.find(item => item.id === id)).filter(Boolean) as CombinedDataItem[];
//   }, [selectedItems]);


//   /**
//    * Reusable component for rendering a selectable item (product, industry, company size).
//    * Provides consistent styling and interaction.
//    */
//   const SelectableItemCard = ({ item, isSelected, onToggle, onInfoClick }: { item: Item | SubCategory | CategoryItem; isSelected: boolean; onToggle: (id: string) => void; onInfoClick?: (item: CombinedDataItem) => void; }) => {
//     const isCategory = item.type === "category";
//     const IconComponent = (item as Item).icon;
//     const itemColor = (item as Item).color;

//     return (
//       <div
//         className={`relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
//           ${isSelected ? "bg-blue-100 border-blue-500 shadow-md" : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm"}
//           border `}
//         onClick={() => onToggle(item.id)}
//       >
//         <div className="flex items-center flex-grow">
//           <input
//             type="checkbox"
//             id={`item-${item.id}`}
//             checked={isSelected}
//             onChange={(e) => { e.stopPropagation(); onToggle(item.id); }}
//             className="form-checkbox h-5 w-5 text-blue-600 rounded-md mr-3 border-gray-300 focus:ring-blue-500 transition-colors duration-200"
//           />
//           <label htmlFor={`item-${item.id}`} className="flex items-center text-gray-800 cursor-pointer flex-grow">
//             {IconComponent && !isCategory && (
//               <div className={`p-2 rounded-lg ${itemColor || 'bg-gray-200'} text-white mr-3 shadow-sm`}>
//                 {IconComponent}
//               </div>
//             )}
//             <span className={`font-semibold text-lg ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
//               {item.label}
//             </span>
//           </label>
//         </div>
//         {onInfoClick && (item as CategoryItem).info || item.type !== "category" ? (
//           <button
//             onClick={(e) => { e.stopPropagation(); onInfoClick(item); }}
//             className="ml-4 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
//             title="View Details"
//           >
//             <FiInfo className="w-5 h-5" />
//           </button>
//         ) : null}
//       </div>
//     );
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900">
//       {/* Header Section */}
//       <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-200">
//         <div className="flex items-center">
//           <FiLayers className="text-blue-600 w-8 h-8 mr-3" />
//           <h1 className="text-3xl font-extrabold text-gray-800">Excellencia ERP <span className="text-blue-600">Suite</span></h1>
//         </div>
//         <div className="relative flex-grow max-w-md mx-8">
//           <input
//             type="text"
//             placeholder="Search solutions, industries, or company sizes..."
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 shadow-sm"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"><FiSettings className="w-6 h-6" /></button>
//           <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"><FiUser className="w-6 h-6" /></button>
//           <button
//             onClick={() => setIsRightBarOpen(true)}
//             className="relative px-4 py-2 bg-blue-600 text-white rounded-full flex items-center shadow-md hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
//           >
//             <FiPackage className="mr-2" />
//             My Selections
//             {selectedItems.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
//                 {selectedItems.length}
//               </span>
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]"> {/* Adjusted min-h to account for header */}
//         {/* Left Sidebar for Navigation */}
//         <aside className="w-full md:w-1/4 bg-white p-6 border-r border-gray-200 shadow-lg md:min-h-[calc(100vh-80px)] overflow-y-auto">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Explore Solutions</h2>

//           {/* Portfolio Categories Section */}
//           <div className="mb-8">
//             <button
//               onClick={() => toggleSectionExpand("portfolio")}
//               className="flex items-center justify-between w-full py-3 px-4 bg-blue-50 rounded-lg text-blue-800 font-semibold text-lg shadow-sm hover:bg-blue-100 transition-colors duration-200"
//             >
//               <span className="flex items-center">
//                 <FiLayers className="mr-3 w-6 h-6" /> Portfolio Categories
//               </span>
//               {expandedSections.portfolio ? <FiChevronDown /> : <FiChevronRight />}
//             </button>
//             {expandedSections.portfolio && (
//               <div className="mt-4 space-y-3">
//                 {portfolioCategories.map((category) => (
//                   <div key={category.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
//                     <div
//                       className="flex items-center p-3 bg-gray-50 rounded-t-lg cursor-pointer"
//                       onClick={() => toggleCategoryExpand(category.id)}
//                     >
//                       <input
//                         type="checkbox"
//                         id={`category-${category.id}`}
//                         checked={selectedItems.includes(category.id)}
//                         onChange={(e) => { e.stopPropagation(); toggleSelection(category.id); }}
//                         className="form-checkbox h-5 w-5 text-blue-600 rounded-md mr-3 border-gray-300 focus:ring-blue-500"
//                       />
//                       <label htmlFor={`category-${category.id}`} className="font-semibold text-lg flex-grow text-gray-800 cursor-pointer">
//                         {category.label}
//                       </label>
//                       {category.info || category.subcategories ? (
//                           <button
//                             onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(category); }}
//                             className="ml-2 p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
//                             title="View Category Details"
//                           >
//                             <FiInfo className="w-5 h-5" />
//                           </button>
//                       ) : null}
//                       {category.subcategories && category.subcategories.length > 0 && (
//                         <span className="ml-2 text-gray-600">
//                           {expandedCategories[category.id] ? <FiChevronDown className="w-5 h-5 transition-transform duration-200" /> : <FiChevronRight className="w-5 h-5 transition-transform duration-200" />}
//                         </span>
//                       )}
//                     </div>

//                     {expandedCategories[category.id] && category.subcategories && category.subcategories.length > 0 && (
//                       <div className="px-5 py-3 bg-white border-t border-gray-100 space-y-3">
//                         {category.subcategories.map((sub) => (
//                           <div key={sub.id} className="border border-dashed border-gray-200 p-3 rounded-lg bg-white">
//                             <div
//                               className="flex items-center cursor-pointer"
//                               onClick={(e) => { e.stopPropagation(); toggleSelection(sub.id); }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 id={`subcategory-${sub.id}`}
//                                 checked={selectedItems.includes(sub.id)}
//                                 onChange={(e) => { e.stopPropagation(); toggleSelection(sub.id); }}
//                                 className="form-checkbox h-4 w-4 text-purple-600 rounded mr-2 border-gray-300 focus:ring-purple-500"
//                               />
//                               <label htmlFor={`subcategory-${sub.id}`} className="font-medium text-md text-gray-700 flex-grow cursor-pointer">
//                                 {sub.label}
//                               </label>
//                               <button
//                                 onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(sub); }}
//                                 className="ml-2 p-1 text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors duration-200"
//                                 title="View Subcategory Details"
//                               >
//                                 <FiInfo className="w-4 h-4" />
//                               </button>
//                             </div>
//                             {sub.products && sub.products.length > 0 && (
//                               <div className="ml-6 mt-2 space-y-2">
//                                 {sub.products.map(prod => (
//                                   <div key={prod.id}
//                                     className={`flex items-center p-2 rounded-md transition-all duration-200
//                                       ${selectedItems.includes(prod.id) ? 'bg-green-50' : 'hover:bg-gray-50'}`}
//                                     onClick={(e) => { e.stopPropagation(); toggleSelection(prod.id); }}
//                                   >
//                                     <input
//                                       type="checkbox"
//                                       id={`product-${prod.id}`}
//                                       checked={selectedItems.includes(prod.id)}
//                                       onChange={(e) => { e.stopPropagation(); toggleSelection(prod.id); }}
//                                       className="form-checkbox h-4 w-4 text-green-600 rounded mr-2 border-gray-300 focus:ring-green-500"
//                                     />
//                                     <label htmlFor={`product-${prod.id}`} className="text-sm text-gray-600 flex-grow cursor-pointer">
//                                       {prod.label}
//                                     </label>
//                                     <button
//                                       onClick={(e) => { e.stopPropagation(); handleItemClickForRightBar(prod); }}
//                                       className="ml-2 p-1 text-gray-800 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200"
//                                       title="View Product Details"
//                                     >
//                                       <FiInfo className="w-4 h-4" />
//                                     </button>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Industries Section */}
//           <div className="mb-8">
//             <button
//               onClick={() => toggleSectionExpand("industries")}
//               className="flex items-center justify-between w-full py-3 px-4 bg-purple-50 rounded-lg text-purple-800 font-semibold text-lg shadow-sm hover:bg-purple-100 transition-colors duration-200"
//             >
//               <span className="flex items-center">
//                 <FiGrid className="mr-3 w-6 h-6" /> Target Industries
//               </span>
//               {expandedSections.industries ? <FiChevronDown /> : <FiChevronRight />}
//             </button>
//             {expandedSections.industries && (
//               <div className="mt-4 space-y-3">
//                 {industriesData.map((industry) => (
//                   <SelectableItemCard
//                     key={industry.id}
//                     item={industry}
//                     isSelected={selectedItems.includes(industry.id)}
//                     onToggle={toggleSelection}
//                     onInfoClick={handleItemClickForRightBar}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Company Sizes Section */}
//           <div className="mb-8">
//             <button
//               onClick={() => toggleSectionExpand("companySizes")}
//               className="flex items-center justify-between w-full py-3 px-4 bg-teal-50 rounded-lg text-teal-800 font-semibold text-lg shadow-sm hover:bg-teal-100 transition-colors duration-200"
//             >
//               <span className="flex items-center">
//                 <FiBriefcase className="mr-3 w-6 h-6" /> Company Sizes
//               </span>
//               {expandedSections.companySizes ? <FiChevronDown /> : <FiChevronRight />}
//             </button>
//             {expandedSections.companySizes && (
//               <div className="mt-4 space-y-3">
//                 {companySizesData.map((size) => (
//                   <SelectableItemCard
//                     key={size.id}
//                     item={size}
//                     isSelected={selectedItems.includes(size.id)}
//                     onToggle={toggleSelection}
//                     onInfoClick={handleItemClickForRightBar}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </aside>

//         {/* Central Content / Dashboard */}
//         <main className="flex-1 p-8 overflow-y-auto">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
//             <FiCompass className="w-8 h-8 mr-3 text-blue-600" /> Discover Your Ideal ERP Path
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             {/* Example of high-level insights or featured solutions */}
//             <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 transform hover:scale-103 transition-transform duration-300">
//               <div className="flex items-center text-blue-600 mb-4">
//                 <FiTrendingUp className="w-8 h-8 mr-3" />
//                 <h3 className="text-xl font-bold">Accelerate Growth</h3>
//               </div>
//               <p className="text-gray-700">Explore solutions that are proven to drive significant business growth and market expansion.</p>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200 transform hover:scale-103 transition-transform duration-300">
//               <div className="flex items-center text-purple-600 mb-4">
//                 <FiCpu className="w-8 h-8 mr-3" />
//                 <h3 className="text-xl font-bold">Intelligent Automation</h3>
//               </div>
//               <p className="text-gray-700">Leverage AI and machine learning to automate complex tasks and streamline operations across departments.</p>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-200 transform hover:scale-103 transition-transform duration-300">
//               <div className="flex items-center text-teal-600 mb-4">
//                 <FiDollarSign className="w-8 h-8 mr-3" />
//                 <h3 className="text-xl font-bold">Optimize Costs</h3>
//               </div>
//               <p className="text-gray-700">Find solutions that help you gain financial control, reduce operational expenses, and boost profitability.</p>
//             </div>
//           </div>

//           {/* Display a message if no search results */}
//           {filteredData.length === 0 && searchTerm && (
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md mb-8" role="alert">
//               <p className="font-bold">No results found!</p>
//               <p>Your search for "<em>{searchTerm}</em>" did not match any solutions, industries, or company sizes. Please try a different query.</p>
//             </div>
//           )}

//           {/* Dynamic Content based on Selections or Default View */}
//           {selectedItems.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-dashed border-gray-300">
//               <FiPackage className="w-20 h-20 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-gray-700 mb-2">Start Building Your ERP Solution!</h3>
//               <p className="text-gray-500 max-w-lg mx-auto">
//                 Select categories, industries, or company sizes from the left sidebar to tailor your Excellencia ERP proposition.
//                 Click the <FiInfo className="inline w-4 h-4" /> icon for more details on each item.
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-200">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Your Selected ERP Elements</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {selectedItemsDetails.map((item) => (
//                   <div key={item.id} className="relative bg-blue-50 p-4 rounded-lg flex items-center justify-between shadow-sm border border-blue-200">
//                     <div className="flex items-center">
//                       {item.type !== "category" && 'icon' in item && item.icon ? (
//                         <div className={`p-2 rounded-full ${item.color || 'bg-blue-300'} text-white mr-3`}>
//                           {item.icon}
//                         </div>
//                       ) : (
//                         <FiCheckCircle className="text-blue-500 mr-3 w-6 h-6" />
//                       )}
//                       <span className="font-medium text-blue-800">{item.label}</span>
//                     </div>
//                     <button
//                       onClick={() => removeSelectedItem(item.id)}
//                       className="text-gray-800 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
//                       title="Remove"
//                     >
//                       <FiX className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-8 flex justify-end space-x-3">
//                 <button
//                   onClick={resetAllSelections}
//                   className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-md hover:bg-red-600 transition-colors duration-200 transform hover:scale-105 flex items-center"
//                 >
//                   <FiRefreshCw className="mr-2" /> Reset All Selections
//                 </button>
//                  <button
//                   onClick={() => setIsRightBarOpen(true)}
//                   className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow-md hover:bg-green-700 transition-colors duration-200 transform hover:scale-105 flex items-center"
//                 >
//                   <FiShoppingCart className="mr-2" /> Review My Proposition
//                 </button>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Right Sidebar for Selected Items and Details */}
//       <RightBarInfo
//         item={selectedItemForRightBar}
//         onClose={closeRightBar}
//         toggleSelection={toggleSelection}
//         isSelected={selectedItemForRightBar ? selectedItems.includes(selectedItemForRightBar.id) : false}
//       />
//     </div>
//   );
// }



// ################## New Second version #################################""


// import { useState, useCallback, useMemo, Fragment, useEffect } from "react";
// import { Dialog, Transition } from '@headlessui/react';

// // Define the types for our data structure
// type SubCategory = {
//   id: string;
//   label: string;
//   type: "product" | "subcategory";
//   products?: Item[];
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   type: "category";
//   subcategories?: SubCategory[];
//   description?: string;
//   policy?: string; // Added policy field for categories
// };

// type Item = {
//   id: string;
//   label: string;
//   icon?: React.ReactNode;
//   color?: string;
//   type: "industry" | "companySize" | "product";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
//   policy?: string; // Added policy field for items
// };

// type CombinedDataItem = CategoryItem | Item | SubCategory;

// // Centralized data for ERP elements, industries, and company sizes
// const allData: CombinedDataItem[] = [
//   // Portfolio Categories
//   {
//     id: "excellence", label: "Excellencia S/Excellencia Cloud", type: "category",
//     description: "Our flagship cloud offerings for comprehensive business solutions, designed for unparalleled performance and scalability.",
//     policy: "This solution adheres to ISO 27001 security standards and GDPR compliance. Data is encrypted at rest and in transit. Regular security audits are performed."
//   },
//   {
//     id: "ai", label: "Artificial Intelligence", info: true, type: "category",
//     description: "Leverage cutting-edge AI to transform your business operations, unlock deep insights, and automate complex tasks with intelligent systems.",
//     policy: "AI solutions are developed with an ethical AI framework, focusing on fairness, transparency, and accountability in decision-making processes.",
//     subcategories: [
//       {
//         id: "ai_platform", label: "AI Platform Services", type: "subcategory",
//         products: [
//           { id: "ai_core", label: "AI Core Engine", type: "product", description: "The foundational AI engine for developing and deploying sophisticated machine learning models, offering robust computational power.", policy: "AI Core Engine data processing complies with ethical AI guidelines, ensuring fairness, transparency, and accountability. Data privacy is maintained through anonymization and aggregation techniques." },
//           { id: "data_intelligence", label: "Data Intelligence Hub", type: "product", description: "A centralized hub for advanced data processing, real-time analysis, and predictive modeling, enabling smart, data-driven decisions.", policy: "Data Intelligence Hub ensures data integrity and security with robust encryption and access controls, aligning with industry best practices for data management." }
//         ]
//       },
//       {
//         id: "ml_solutions", label: "Machine Learning Solutions", type: "subcategory",
//         products: [
//           { id: "predictive_analytics", label: "Predictive Analytics Suite", type: "product", description: "Powerful tools for forecasting future trends, identifying opportunities, and mitigating risks across various business domains.", policy: "Predictive Analytics Suite models are regularly validated for accuracy and bias, ensuring responsible and reliable forecasting." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     type: "category",
//     description: "Innovate and integrate with our robust Business Technology Platform, providing a foundation for agile development and intelligent enterprise.",
//     policy: "The Business Technology Platform follows a 'security by design' principle, incorporating enterprise-grade security features and compliance with major regulatory frameworks like NIST and ISO 27001.",
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         type: "subcategory",
//         products: [
//           { id: "app_studio", label: "Excellencia App Studio", type: "product", description: "A comprehensive low-code/no-code platform for rapid application development and deployment, empowering citizen developers and IT.", policy: "App Studio ensures applications built adhere to secure coding guidelines and undergo regular vulnerability assessments." },
//           { id: "process_automation", label: "Process Automation Suite", type: "product", description: "Automate business processes end-to-end for increased efficiency, reduced manual effort, and improved operational agility.", policy: "Process Automation Suite guarantees data privacy and auditability for all automated workflows, maintaining detailed logs for compliance." },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         type: "subcategory",
//         products: [
//           { id: "data_warehouse", label: "Excellencia Data Warehouse Cloud", type: "product", description: "Scalable cloud-based data warehousing solution for all your data needs, offering high performance and flexibility for analytics.", policy: "Data Warehouse Cloud implements advanced data encryption, access controls, and regular backups to ensure data protection and availability." },
//           { id: "analytics_cloud", label: "Excellencia Analytics Cloud", type: "product", description: "Integrated business intelligence, planning, and predictive analytics in the cloud, enabling informed decisions and strategic foresight.", policy: "Analytics Cloud ensures secure data access and reporting, with robust authorization mechanisms to prevent unauthorized data exposure." },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         type: "subcategory",
//         products: [
//           { id: "data_migration", label: "Excellencia Advanced Data Migration and Management by Syniti", type: "product", description: "Robust data migration and management tools ensuring data quality, consistency, and seamless transfer across systems.", policy: "Data Migration services comply with stringent data integrity and transfer security protocols, minimizing data loss and corruption risks." },
//           { id: "ariba_integration", label: "Ariba Cloud Integration", type: "product", description: "Seamless integration capabilities with Ariba cloud services for optimized procurement processes and enhanced supplier collaboration.", policy: "Ariba Cloud Integration ensures secure API communication and data exchange, adhering to B2B integration best practices." },
//           { id: "integration_suite", label: "Excellencia Integration Suite", type: "product", description: "A comprehensive suite for enterprise integration, connecting diverse applications and processes across your IT landscape.", policy: "Integration Suite maintains strict data governance and security policies for all connected systems, ensuring data consistency and confidentiality." },
//         ],
//       },
//     ],
//   },
//   {
//     id: "crm", label: "CRM and Customer Experience", info: true, type: "category",
//     description: "Optimize customer interactions and enhance their overall experience, building lasting relationships and driving loyalty.",
//     policy: "Our CRM solutions prioritize customer data privacy and consent management, complying with regulations like CCPA and GDPR. All interactions are securely logged and audited.",
//     subcategories: [
//       { id: "sales_cloud", label: "Sales Cloud", type: "subcategory", products: [{ id: "crm_sales", label: "CRM Sales Automation", type: "product", description: "Automate sales processes, manage leads, and foster strong customer relationships with a powerful sales force automation solution.", policy: "Sales Cloud ensures confidential handling of prospect and customer data, with strict access controls for sales teams." }] },
//       { id: "service_cloud", label: "Service Cloud", type: "subcategory", products: [{ id: "crm_service", label: "CRM Service Management", type: "product", description: "Deliver exceptional customer service and support operations with intelligent service management tools and omnichannel capabilities.", policy: "Service Cloud provides robust case management and secure communication channels to protect customer interactions and data." }] },
//     ]
//   },
//   {
//     id: "erp", label: "Enterprise Resource Planning", info: true, type: "category",
//     description: "Streamline your core business processes with our comprehensive ERP solutions, integrating finance, logistics, and more for efficiency.",
//     policy: "Our ERP systems are designed with high availability and disaster recovery capabilities. Financial transactions are secured with industry-standard encryption and auditing trails are maintained for compliance.",
//     subcategories: [
//       { id: "s4hana", label: "S/4HANA", type: "subcategory", products: [{ id: "erp_core", label: "ERP Core Functions", type: "product", description: "Next-generation ERP functionalities for finance, logistics, manufacturing, and more, leveraging in-memory computing for real-time insights.", policy: "S/4HANA ensures real-time data consistency and compliance for all core business functions, with extensive audit logs and role-based access control." }] }
//     ]
//   },
//   {
//     id: "finance", label: "Financial Management", info: true, type: "category",
//     description: "Gain real-time financial insights and streamline your financial operations, ensuring compliance and strategic financial planning.",
//     policy: "Financial management solutions adhere to global accounting standards (e.g., IFRS, GAAP) and include built-in controls for fraud detection and regulatory compliance.",
//     subcategories: [
//       { id: "financial_planning", label: "Financial Planning", type: "subcategory", products: [{ id: "fp_suite", label: "Financial Planning Suite", type: "product", description: "Tools for budgeting, forecasting, and in-depth financial analysis to drive performance and achieve financial goals.", policy: "Financial Planning Suite maintains the confidentiality and integrity of sensitive financial forecasts and budget data." }] }
//     ]
//   },
//   {
//     id: "hcm", label: "Human Capital Management", info: true, type: "category",
//     description: "Manage your workforce effectively from hire to retire, optimizing talent management and employee experience.",
//     policy: "HCM systems comply with employment laws and data privacy regulations (e.g., GDPR, CCPA) concerning employee data. Robust access controls protect sensitive HR information.",
//     subcategories: [
//       { id: "successfactors", label: "SuccessFactors", type: "subcategory", products: [{ id: "hcm_suite", label: "HCM Suite", type: "product", description: "Comprehensive human capital management solutions covering HR, payroll, talent management, and employee engagement.", policy: "HCM Suite ensures secure handling of sensitive employee data, including payroll and personal information, with role-based access and encryption." }] }
//     ]
//   },
//   {
//     id: "spend", label: "Spend Management", info: true, type: "category",
//     description: "Optimize spending, enhance compliance, and drive savings across your organization with integrated spend management solutions.",
//     policy: "Spend management solutions provide transparency and auditability for all procurement and expense activities, helping enforce company policies and prevent unauthorized spending.",
//     subcategories: [
//       { id: "concur", label: "Concur", type: "subcategory", products: [{ id: "travel_expense", label: "Travel & Expense Management", type: "product", description: "Automate travel and expense reporting for greater control, visibility, and compliance.", policy: "Concur ensures compliance with travel and expense policies through automated checks and detailed audit trails." }] }
//     ]
//   },
//   {
//     id: "scm", label: "Supply Chain Management", info: true, type: "category",
//     description: "Transform your supply chain for resilience, efficiency, and sustainability, from planning to logistics.",
//     policy: "Supply chain solutions incorporate risk management and traceability features, ensuring ethical sourcing and compliance with global trade regulations. Data on supplier performance and inventory is secured.",
//     subcategories: [
//       { id: "ariba", label: "Ariba", type: "subcategory", products: [{ id: "procurement_suite", label: "Procurement Suite", type: "product", description: "Streamline procurement and supplier management processes for better collaboration and cost control.", policy: "Ariba Procurement Suite enforces procurement policies and ensures secure communication with suppliers for all purchasing activities." }] }
//     ]
//   },

//   // Industries
//   {
//     id: "aerospace", label: "Aerospace and Defense", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target">
//         <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
//       </svg>
//     ), color: "bg-blue-600", type: "industry", description: "Solutions tailored for the unique demands of the aerospace and defense sectors, ensuring precision and reliability.",
//     details: [
//       { label: "Focus Areas", value: "Complex Manufacturing, Global Logistics, Regulatory Compliance, Project Management" },
//       { label: "Key Benefits", value: "Enhanced operational efficiency, Improved supply chain visibility, Accelerated innovation cycles, Risk mitigation" }
//     ],
//     policy: "Solutions for Aerospace and Defense comply with strict industry regulations such as ITAR and EAR, ensuring data and operational security for critical defense projects."
//   },
//   {
//     id: "automotive", label: "Automotive", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//       </svg>
//     ), color: "bg-red-600", type: "industry", description: "Drive innovation and efficiency across the automotive value chain, from design to after-sales service.",
//     details: [
//       { label: "Focus Areas", value: "Vehicle Production, R&D, Sales & Service, Supplier Collaboration" },
//       { label: "Key Benefits", value: "Accelerated time-to-market, Enhanced customer satisfaction, Optimized production processes" }
//     ],
//     policy: "Automotive solutions incorporate robust data security measures to protect intellectual property and sensitive design specifications, adhering to industry standards like ISO 26262 for functional safety."
//   },
//   {
//     id: "banking", label: "Banking", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign">
//         <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//       </svg>
//     ), color: "bg-green-600", type: "industry", description: "Secure and intelligent financial solutions for banking institutions, enabling digital transformation and customer-centricity.",
//     details: [
//       { label: "Focus Areas", value: "Digital Banking, Risk Management, Core Banking Transformation, Customer Engagement" },
//       { label: "Key Benefits", value: "Enhanced security and compliance, Improved customer experience, Operational efficiency, Fraud prevention" }
//     ],
//     policy: "Banking solutions are compliant with financial regulations such as Basel III, Dodd-Frank, and PCI DSS. Data encryption, fraud detection, and audit trails are integral components."
//   },
//   {
//     id: "chemicals", label: "Chemicals", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box">
//         <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
//       </svg>
//     ), color: "bg-purple-600", type: "industry", description: "Specialized management systems for chemical industries, focusing on safety, compliance, and sustainable operations.",
//     details: [
//       { label: "Focus Areas", value: "Batch Production, Supply Chain Optimization, Environmental Health & Safety (EHS)" },
//       { label: "Key Benefits", value: "Optimized resource utilization, Strict regulatory compliance, Improved plant safety" }
//     ],
//     policy: "Chemical industry solutions prioritize safety and environmental compliance, including adherence to REACH and GHS regulations. Emergency protocols and chemical inventory management are integrated."
//   },
//   {
//     id: "consumer", label: "Consumer Products", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
//         <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//       </svg>
//     ), color: "bg-yellow-600", type: "industry", description: "Solutions designed for consumer goods manufacturers to meet evolving customer demands and optimize market presence.",
//     details: [
//       { label: "Focus Areas", value: "Demand Planning, Brand Management, Retail Execution, E-commerce Integration" },
//       { label: "Key Benefits", value: "Faster time-to-market, Increased sales and brand loyalty, Efficient inventory management" }
//     ],
//     policy: "Consumer product solutions ensure ethical sourcing, supply chain transparency, and product safety, complying with consumer protection laws and quality standards."
//   },
//   {
//     id: "defense", label: "Defense and Security", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
//         <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
//       </svg>
//     ), color: "bg-indigo-600", type: "industry", description: "Mission-critical software for defense and security organizations, ensuring readiness and operational excellence.",
//     details: [
//       { label: "Focus Areas", value: "Asset Management, Project Lifecycle Management, Cybersecurity, Logistics" },
//       { label: "Key Benefits", value: "Enhanced operational readiness, Optimized resource allocation, Secure data management" }
//     ],
//     policy: "Defense and Security solutions strictly adhere to governmental security classifications and regulatory frameworks (e.g., NIST, DFARS), with robust encryption and access control mechanisms."
//   },
//   {
//     id: "education", label: "Education and Research", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
//         <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
//       </svg>
//     ), color: "bg-pink-600", type: "industry", description: "Tools for educational institutions and research organizations to foster learning, collaboration, and administrative efficiency.",
//     details: [
//       { label: "Focus Areas", value: "Student Information Systems, Campus Operations, Research Grant Management, Alumni Relations" },
//       { label: "Key Benefits", value: "Improved student outcomes, Streamlined administrative processes, Enhanced research capabilities" }
//     ],
//     policy: "Education and Research solutions prioritize data privacy for students and research participants, complying with FERPA and relevant research ethics guidelines. Secure data archiving is also provided."
//   },
//   {
//     id: "engineering", label: "Engineering and Construction", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
//         <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
//       </svg>
//     ), color: "bg-orange-600", type: "industry", description: "Software to manage complex engineering and construction projects, from planning and execution to asset lifecycle.",
//     details: [
//       { label: "Focus Areas", value: "Project Planning & Control, Asset Performance Management, Field Service Management" },
//       { label: "Key Benefits", value: "Reduced project delays and costs, Improved project visibility, Enhanced collaboration" }
//     ],
//     policy: "Engineering and Construction solutions ensure project data integrity and version control for design documents, complying with industry safety standards and building codes."
//   },
//   {
//     id: "healthcare", label: "Healthcare", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//       </svg>
//     ), color: "bg-teal-600", type: "industry", description: "Healthcare-specific management and analytics solutions, supporting patient care, operational efficiency, and regulatory compliance.",
//     details: [
//       { label: "Focus Areas", value: "Patient Management, Clinical Trials, Supply Chain for Medical Devices/Pharma" },
//       { label: "Key Benefits", value: "Improved patient care outcomes, Streamlined administrative workflows, Enhanced data security" }
//     ],
//     policy: "Healthcare solutions are HIPAA compliant and adhere to regional data privacy regulations. Patient data security is paramount with multi-factor authentication and access controls."
//   },
//   {
//     id: "tech", label: "High Tech", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-cpu">
//         <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line>
//       </svg>
//     ), color: "bg-cyan-600", type: "industry", description: "Innovative solutions for high technology companies, enabling rapid product development and global market penetration.",
//     details: [
//       { label: "Focus Areas", value: "Product Lifecycle Management, Global Supply Chain, Research & Development" },
//       { label: "Key Benefits", value: "Faster innovation cycles, Optimized manufacturing processes, Stronger competitive edge" }
//     ],
//     policy: "High Tech solutions enforce intellectual property protection, secure R&D data, and ensure compliance with global export control regulations for technology components."
//   },
//   {
//     id: "insurance", label: "Insurance", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
//         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//       </svg>
//     ), color: "bg-amber-600", type: "industry", description: "Robust software solutions for the insurance sector, enhancing policy management, claims processing, and customer engagement.",
//     details: [
//       { label: "Focus Areas", value: "Policy Administration, Claims Management, Customer Relationship Management" },
//       { label: "Key Benefits", value: "Reduced processing times, Enhanced customer satisfaction, Improved risk assessment" }
//     ],
//     policy: "Insurance solutions comply with regulatory requirements such as Solvency II and NAIC standards. Data privacy for policyholders is guaranteed through strong encryption and secure data handling."
//   },
//   {
//     id: "life", label: "Life Sciences", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//       </svg>
//     ), color: "bg-lime-600", type: "industry", description: "Comprehensive solutions for pharmaceutical and biotechnology companies, supporting drug discovery to market.",
//     details: [
//       { label: "Focus Areas", value: "Research & Development, Clinical Trials Management, Manufacturing & Quality Control" },
//       { label: "Key Benefits", value: "Accelerated drug discovery, Compliance with GxP regulations, Improved patient safety" }
//     ],
//     policy: "Life Sciences solutions adhere to strict FDA regulations (e.g., 21 CFR Part 11) and GxP guidelines, ensuring data integrity and traceability for clinical trials and manufacturing."
//   },
//   {
//     id: "media", label: "Media", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe">
//         <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
//       </svg>
//     ), color: "bg-violet-600", type: "industry", description: "Systems for media and entertainment companies, enabling content creation, distribution, and monetization.",
//     details: [
//       { label: "Focus Areas", value: "Content Production, Rights Management, Audience Engagement, Digital Distribution" },
//       { label: "Key Benefits", value: "Increased revenue streams, Broader audience reach, Efficient content lifecycle management" }
//     ],
//     policy: "Media solutions include digital rights management (DRM) and content piracy prevention measures. Data on audience demographics and content consumption is handled with privacy in mind."
//   },
//   {
//     id: "mill", label: "Mill Products", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box">
//         <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
//       </svg>
//     ), color: "bg-rose-600", type: "industry", description: "Specialized software for mill products manufacturing, optimizing production, inventory, and supply chain.",
//     details: [
//       { label: "Focus Areas", value: "Production Planning, Quality Management, Inventory Optimization, Logistics" },
//       { label: "Key Benefits", value: "Reduced waste and scrap, Improved production efficiency, Better customer service" }
//     ],
//     policy: "Mill Products solutions integrate quality control systems to ensure product specifications are met and comply with environmental regulations regarding manufacturing byproducts."
//   },
//   {
//     id: "mining", label: "Mining", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
//         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
//       </svg>
//     ), color: "bg-slate-600", type: "industry", description: "Integrated solutions for mining operations, focusing on resource management, safety, and environmental responsibility.",
//     details: [
//       { label: "Focus Areas", value: "Resource Planning, Safety Management, Equipment Maintenance, Environmental Compliance" },
//       { label: "Key Benefits", value: "Increased operational efficiency, Enhanced worker safety, Sustainable resource extraction" }
//     ],
//     policy: "Mining solutions support compliance with environmental protection acts and occupational safety regulations, with features for hazard identification and risk mitigation."
//   },
//   {
//     id: "oil", label: "Oil, Gas, and Energy", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//       </svg>
//     ), color: "bg-fuchsia-600", type: "industry", description: "Robust software for the energy sector, managing operations from exploration to distribution.",
//     details: [
//       { label: "Focus Areas", value: "Upstream, Midstream, Downstream Operations, Asset Performance Management" },
//       { label: "Key Benefits", value: "Optimized asset utilization, Enhanced safety protocols, Improved regulatory adherence" }
//     ],
//     policy: "Oil, Gas, and Energy solutions comply with industry-specific safety standards (e.g., API, OSHA) and environmental regulations, providing tools for emissions monitoring and incident management."
//   },
//   {
//     id: "professional", label: "Professional Services", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase">
//         <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//       </svg>
//     ), color: "bg-blue-600", type: "industry", description: "Tools for professional service firms to manage projects, resources, and client relationships effectively.",
//     details: [
//       { label: "Focus Areas", value: "Project Profitability, Resource Utilization, Client Engagement, Billing & Invoicing" },
//       { label: "Key Benefits", value: "Improved project delivery success, Higher client satisfaction, Enhanced employee productivity" }
//     ],
//     policy: "Professional Services solutions ensure client confidentiality and data security for project-related information, complying with professional ethics and contractual agreements."
//   },
//   {
//     id: "public", label: "Public Sector", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe">
//         <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
//       </svg>
//     ), color: "bg-emerald-600", type: "industry", description: "Solutions for government and public administration, driving efficiency, transparency, and citizen engagement.",
//     details: [
//       { label: "Focus Areas", value: "Citizen Services, Budget Management, Public Safety, Urban Planning" },
//       { label: "Key Benefits", value: "Enhanced public services, Greater operational transparency, Improved accountability" }
//     ],
//     policy: "Public Sector solutions adhere to government regulations for data security and transparency, including FOIA and specific cybersecurity mandates. Citizen data privacy is protected."
//   },
//   {
//     id: "retail", label: "Retail", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
//         <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//       </svg>
//     ), color: "bg-amber-600", type: "industry", description: "Transform retail operations with solutions that enhance customer experience, optimize inventory, and drive sales.",
//     details: [
//       { label: "Focus Areas", value: "Omnichannel Commerce, Inventory Optimization, Customer Loyalty Programs, Store Operations" },
//       { label: "Key Benefits", value: "Personalized shopping experience, Increased sales and profitability, Efficient supply chain" }
//     ],
//     policy: "Retail solutions comply with PCI DSS for secure payment processing and consumer data privacy laws. Inventory management includes measures for loss prevention and ethical sourcing verification."
//   },
//   {
//     id: "sports", label: "Sports and Entertainment", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target">
//         <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
//       </svg>
//     ), color: "bg-red-600", type: "industry", description: "Management systems for sports and entertainment entities, enhancing fan engagement and event operations.",
//     details: [
//       { label: "Focus Areas", value: "Event Management, Fan Engagement, Venue Operations, Sponsorship Management" },
//       { label: "Key Benefits", value: "Enhanced fan experience, Optimized event revenue, Streamlined venue operations" }
//     ],
//     policy: "Sports and Entertainment solutions manage ticketing and fan data with strong privacy controls. Event safety and security protocols are integrated for venue operations."
//   },
//   {
//     id: "telecom", label: "Telecommunications", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//       </svg>
//     ), color: "bg-indigo-600", type: "industry", description: "Advanced solutions for telecommunications providers, supporting network management, billing, and customer services.",
//     details: [
//       { label: "Focus Areas", value: "Network Management, Customer Billing, Service Provisioning, Digital Transformation" },
//       { label: "Key Benefits", value: "Improved service quality, Faster network deployment, Enhanced customer loyalty" }
//     ],
//     policy: "Telecommunications solutions comply with telecommunications regulations (e.g., FCC, GDPR for communication data). Network security and billing accuracy are core features."
//   },
//   {
//     id: "travel", label: "Travel and Transportation", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
//         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
//       </svg>
//     ), color: "bg-green-600", type: "industry", description: "Software for travel and logistics businesses, optimizing operations and enhancing traveler experience.",
//     details: [
//       { label: "Focus Areas", value: "Passenger Experience, Logistics & Freight, Fleet Management, Route Optimization" },
//       { label: "Key Benefits", value: "Streamlined operations, Enhanced customer satisfaction, Reduced operational costs" }
//     ],
//     policy: "Travel and Transportation solutions adhere to passenger data privacy regulations (e.g., PNR data handling) and international shipping laws. Safety and security for cargo and passengers are paramount."
//   },
//   {
//     id: "utilities", label: "Utilities", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//       </svg>
//     ), color: "bg-orange-600", type: "industry", description: "Comprehensive systems for utility companies, managing infrastructure, services, and customer relations.",
//     details: [
//       { label: "Focus Areas", value: "Smart Grid Management, Asset Management, Customer Billing, Field Service" },
//       { label: "Key Benefits", value: "Efficient resource management, Reliable service delivery, Improved regulatory compliance" }
//     ],
//     policy: "Utilities solutions ensure compliance with critical infrastructure protection standards (e.g., NERC CIP) and environmental regulations. Secure management of grid data and customer information is provided."
//   },
//   {
//     id: "wholesale", label: "Wholesale Distribution", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trending-up">
//         <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
//       </svg>
//     ), color: "bg-purple-600", type: "industry", description: "Solutions for wholesale distribution businesses, enhancing inventory management, order fulfillment, and supplier relationships.",
//     details: [
//       { label: "Focus Areas", value: "Inventory Management, Order Fulfillment, Supplier Relationship Management, Warehouse Operations" },
//       { label: "Key Benefits", value: "Optimized inventory levels, Faster order processing, Improved customer service" }
//     ],
//     policy: "Wholesale Distribution solutions include robust inventory tracking and compliance with supply chain integrity standards. Data security for supplier contracts and customer orders is maintained."
//   },

//   // Company Sizes
//   {
//     id: "small", label: "Small Businesses", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info">
//         <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
//       </svg>
//     ), color: "bg-green-600", type: "companySize", description: "Tailored solutions designed for small businesses to grow efficiently and effectively.",
//     details: [
//       { label: "Typical Challenges", value: "Limited resources, Scalability, Market penetration, Digital presence" },
//       { label: "Our Approach", value: "Cost-effective, User-friendly, Quick implementation, Integrated solutions" }
//     ],
//     policy: "Solutions for Small Businesses focus on ease of use and affordability, while ensuring foundational data security and privacy practices are in place, aligning with basic regulatory requirements."
//   },
//   {
//     id: "midsize", label: "Midsize Companies", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info">
//         <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
//       </svg>
//     ), color: "bg-yellow-600", type: "companySize", description: "Flexible and scalable solutions for growing midsize companies, supporting expansion and operational excellence.",
//     details: [
//       { label: "Typical Challenges", value: "Rapid growth management, Process optimization, Talent acquisition & retention, Data silos" },
//       { label: "Our Approach", value: "Modular and scalable, Industry-specific, Cloud-first, Data-driven insights" }
//     ],
//     policy: "Midsize Company solutions offer scalable security features and compliance support for growing enterprises, including options for advanced data protection and audit capabilities."
//   },
//   {
//     id: "large", label: "Large Enterprise", icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info">
//         <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
//       </svg>
//     ), color: "bg-blue-600", type: "companySize", description: "Robust and comprehensive solutions for large-scale enterprises, enabling complex operations and global digital transformation.",
//     details: [
//       { label: "Typical Challenges", value: "Global operations, Complex integrations, Regulatory compliance, Legacy system modernization" },
//       { label: "Our Approach", value: "Comprehensive suites, Highly customizable, Secure and compliant, AI-powered automation" }
//     ],
//     policy: "Large Enterprise solutions provide enterprise-grade security, comprehensive compliance frameworks (e.g., SOC 2, HIPAA, GDPR), and advanced threat detection for global operations."
//   },
// ];

// /**
//  * Renders an inline SVG for the RefreshCw icon.
//  */
// const IconRefreshCw = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.5 7h18a2 2 0 0 1 0 4H1v-3.5a4 4 0 0 1 8-3.5"></path><path d="M20.5 17h-18a2 2 0 0 1 0-4h22v3.5a4 4 0 0 1-8 3.5"></path>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the ChevronRight icon.
//  */
// const IconChevronRight = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <polyline points="9 18 15 12 9 6"></polyline>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the ChevronDown icon.
//  */
// const IconChevronDown = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <polyline points="6 9 12 15 18 9"></polyline>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the X (Close) icon.
//  */
// const IconX = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Layers icon.
//  */
// const IconLayers = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Info icon.
//  */
// const IconInfo = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Plus icon.
//  */
// const IconPlus = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the CheckCircle icon.
//  */
// const IconCheckCircle = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-8.08"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Search icon.
//  */
// const IconSearch = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Settings icon.
//  */
// const IconSettings = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0 .33 1.82H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09z"></path>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the User icon.
//  */
// const IconUser = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Compass icon.
//  */
// const IconCompass = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Sun icon (Light Mode).
//  */
// const IconSun = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
//   </svg>
// );

// /**
//  * Renders an inline SVG for the Moon icon (Dark Mode).
//  */
// const IconMoon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
//   </svg>
// );

// // Temporary FiUsers icon as it's not directly from fi.
// // In a real project, you would import this from an appropriate icon library.
// const FiUsers = ({ className }: { className: string }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//         <circle cx="9" cy="7" r="4"></circle>
//         <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//         <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//     </svg>
// );


// /**
//  * Renders the detail view for a selected item in a sliding right sidebar.
//  * Uses Headless UI's Dialog for accessibility and proper modal behavior.
//  * Props:
//  * item: The CombinedDataItem to display details for (can be null if sidebar is closed).
//  * onClose: Callback function to close the sidebar.
//  * toggleSelection: Callback to add/remove the item from selection.
//  * isSelected: Boolean indicating if the item is currently selected.
//  * darkMode: Boolean indicating if dark mode is active.
//  */
// const RightBarInfo = ({ item, onClose, toggleSelection, isSelected, darkMode }: { item: CombinedDataItem | null; onClose: () => void; toggleSelection: (id: string) => void; isSelected: boolean; darkMode: boolean; }) => {
//   return (
//     <Transition.Root show={!!item} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* Backdrop for the sidebar */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-500"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-500"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               {/* Sliding panel for the sidebar */}
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-500 sm:duration-700"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-500 sm:duration-700"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="pointer-events-auto w-screen max-w-md rounded-l-xl">
//                   {/* Sidebar content container */}
//                   <div className={`flex h-full flex-col overflow-y-scroll shadow-xl rounded-l-xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
//                     <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                       <div className="flex items-start justify-between">
//                         <Dialog.Title className={`text-2xl font-extrabold ${darkMode ? 'text-gray-50' : 'text-gray-900'}`}>Details View</Dialog.Title>
//                         <div className="ml-3 flex h-7 items-center">
//                           <button
//                             type="button"
//                             className={`relative -m-2 p-2 ${darkMode ? 'text-gray-800 hover:text-gray-300' : 'text-gray-800 hover:text-gray-500'} rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-offset-gray-800 focus:ring-blue-500' : 'focus:ring-blue-500'}`}
//                             onClick={onClose}
//                           >
//                             <span className="absolute -inset-0.5" />
//                             <span className="sr-only">Close panel</span>
//                             <IconX className="h-6 w-6" aria-hidden="true" />
//                           </button>
//                         </div>
//                       </div>

//                       {item && (
//                         <div className="mt-8">
//                           <div className="flow-root">
//                             {/* Item Icon and Label */}
//                             <div className="flex items-center space-x-4 mb-6">
//                               {item.type !== "category" && 'icon' in item && item.icon && 'color' in item && item.color ? (
//                                 <div className={`p-4 rounded-full ${item.color} text-white shadow-lg`}>
//                                   {item.icon}
//                                 </div>
//                               ) : (
//                                 <IconLayers className={`w-12 h-12 p-2 rounded-full ${darkMode ? 'text-blue-400 bg-blue-900' : 'text-blue-600 bg-blue-100'}`} />
//                               )}
//                               <h2 className={`text-3xl font-bold leading-tight ${darkMode ? 'text-gray-50' : 'text-gray-900'}`}>{item.label}</h2>
//                             </div>

//                             {/* Item Description */}
//                             {'description' in item && item.description && (
//                               <div className={`p-5 rounded-xl border-l-4 ${darkMode ? 'bg-gray-700 border-blue-500 text-gray-200' : 'bg-blue-50 border-blue-200 text-blue-800'} shadow-sm mb-6`}>
//                                 <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Description:</h3>
//                                 <p className="text-md">{item.description}</p>
//                               </div>
//                             )}

//                             {/* Policy Information */}
//                             {'policy' in item && item.policy && (
//                               <div className={`mt-6 p-5 rounded-xl border-l-4 ${darkMode ? 'bg-gray-700 border-green-500 text-gray-200' : 'bg-green-50 border-green-200 text-green-800'} shadow-sm mb-6`}>
//                                 <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>Policy Information:</h3>
//                                 <p className="text-md">{item.policy}</p>
//                               </div>
//                             )}

//                             {/* Category Subcategories and Products */}
//                             {item.type === "category" && 'subcategories' in item && item.subcategories && item.subcategories.length > 0 && (
//                               <div className="mt-6">
//                                 <h4 className={`font-bold mb-4 text-xl ${darkMode ? 'text-gray-50' : 'text-gray-700'}`}>Category Breakdown:</h4>
//                                 <div className="space-y-4">
//                                   {item.subcategories.map(sub => (
//                                     <div key={sub.id} className={`p-4 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
//                                       <p className={`font-semibold text-lg flex items-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
//                                         <IconChevronRight className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} /> {sub.label}
//                                       </p>
//                                       {sub.products && sub.products.length > 0 && (
//                                         <div className="ml-6 mt-3 space-y-2">
//                                           <h5 className={`font-medium text-md mb-2 pb-1 border-b ${darkMode ? 'text-gray-300 border-gray-600' : 'text-gray-600 border-gray-200'}`}>Associated Products:</h5>
//                                           <ul className="list-none space-y-2">
//                                             {sub.products.map(prod => (
//                                               <li key={prod.id} className={`flex items-start text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                                                 <IconCheckCircle className={`mr-2 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
//                                                 <div>
//                                                   <strong className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{prod.label}:</strong> {prod.description || "Detailed product information forthcoming."}
//                                                   {'policy' in prod && prod.policy && (
//                                                     <span className={`block text-xs italic ${darkMode ? 'text-gray-800' : 'text-gray-600'}`}>Policy: {prod.policy}</span>
//                                                   )}
//                                                 </div>
//                                               </li>
//                                             ))}
//                                           </ul>
//                                         </div>
//                                       )}
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}

//                             {/* Item Specific Details */}
//                             {item.type !== "category" && 'details' in item && item.details && item.details.length > 0 && (
//                               <div className="mt-6">
//                                 <h4 className={`font-bold mb-4 text-xl ${darkMode ? 'text-gray-50' : 'text-gray-700'}`}>Key Aspects:</h4>
//                                 <dl className="space-y-3">
//                                   {item.details.map((detail, index) => (
//                                     <div key={index} className="flex items-start">
//                                       <span className={`font-semibold mr-2 min-w-[120px] ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{detail.label}:</span>
//                                       <dd className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} flex-1`}>{detail.value}</dd>
//                                     </div>
//                                   ))}
//                                 </dl>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Action button at the bottom of the sidebar */}
//                     <div className={`border-t px-4 py-6 sm:px-6 rounded-b-xl ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
//                       <p className={`mt-0.5 text-sm ${darkMode ? 'text-gray-800' : 'text-gray-500'}`}>Add or remove this item from your current selection.</p>
//                       <div className="mt-6">
//                         <button
//                           className={`flex items-center justify-center w-full px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-all duration-300 ease-in-out
//                             ${isSelected ? "bg-red-500 hover:bg-red-600 focus:ring-red-300" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"}
//                             transform hover:scale-105 focus:outline-none focus:ring-4`}
//                           onClick={() => toggleSelection(item!.id)}
//                         >
//                           {isSelected ? <IconX className="mr-2" /> : <IconPlus className="mr-2" />}
//                           {isSelected ? "Remove from Selection" : "Add to Selection"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };


// /**
//  * Main application component to display ERP elements, allow selection,
//  * and manage dark/light mode.
//  */
// const App: React.FC = () => {
//   // State for dark mode, initialized from local storage or system preference
//   const [darkMode, setDarkMode] = useState<boolean>(() => {
//     if (typeof window !== 'undefined') {
//       const savedMode = localStorage.getItem('theme');
//       if (savedMode) {
//         return savedMode === 'dark';
//       }
//       return window.matchMedia('(prefers-color-scheme: dark)').matches;
//     }
//     return false;
//   });

//   // Effect to apply dark mode class to HTML element and save preference
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   // Function to toggle dark mode
//   const toggleDarkMode = useCallback(() => {
//     setDarkMode(prevMode => !prevMode);
//   }, []);

//   // State for selected items (stores the actual item objects)
//   const [selectedItems, setSelectedItems] = useState<CombinedDataItem[]>([]);
//   // State for search query within selected items
//   const [selectedItemsFilter, setSelectedItemsFilter] = useState<string>('');
//   // State for expanded categories in the main selection panel
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
//   // State for showing/hiding the right sidebar detail view
//   const [showRightBar, setShowRightBar] = useState<boolean>(false);
//   // State for the item whose details are currently being shown in the sidebar
//   const [selectedDetailItem, setSelectedDetailItem] = useState<CombinedDataItem | null>(null);

//   // Helper function to find an item by ID from allData
//   const findItemById = useCallback((id: string): CombinedDataItem | undefined => {
//     // Check top-level categories and industries/company sizes
//     const found = allData.find(item => item.id === id);
//     if (found) return found;

//     // Check within subcategories and their products
//     for (const category of allData) {
//       if (category.type === "category" && "subcategories" in category && category.subcategories) {
//         for (const subcategory of category.subcategories) {
//           if (subcategory.id === id) return subcategory; // Found subcategory
//           if ("products" in subcategory && subcategory.products) {
//             const product = subcategory.products.find(prod => prod.id === id);
//             if (product) return product; // Found product within subcategory
//           }
//         }
//       }
//     }
//     return undefined;
//   }, []);

//   // Function to toggle selection of an item
//   const toggleSelection = useCallback((id: string) => {
//     setSelectedItems(prevSelected => {
//       const isCurrentlySelected = prevSelected.some(item => item.id === id);
//       if (isCurrentlySelected) {
//         return prevSelected.filter(item => item.id !== id);
//       } else {
//         const itemToAdd = findItemById(id);
//         if (itemToAdd) {
//           return [...prevSelected, itemToAdd];
//         }
//         return prevSelected;
//       }
//     });
//   }, [findItemById]);

//   // Function to clear all selected items
//   const clearAllSelections = useCallback(() => {
//     setSelectedItems([]);
//   }, []);

//   // Function to handle opening the detail view in the right sidebar
//   const handleInfoClick = useCallback((item: CombinedDataItem) => {
//     setSelectedDetailItem(item);
//     setShowRightBar(true);
//   }, []);

//   // Function to toggle expansion of a category
//   const toggleCategory = useCallback((categoryId: string) => {
//     setExpandedCategories(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(categoryId)) {
//         newSet.delete(categoryId);
//       } else {
//         newSet.add(categoryId);
//       }
//       return newSet;
//     });
//   }, []);

//   // Memoized filtered list of selected items based on search input
//   const filteredSelectedItems = useMemo(() => {
//     if (!selectedItemsFilter) {
//       return selectedItems;
//     }
//     const lowerCaseFilter = selectedItemsFilter.toLowerCase();
//     return selectedItems.filter(item =>
//       item.label.toLowerCase().includes(lowerCaseFilter) ||
//       (item.description && item.description.toLowerCase().includes(lowerCaseFilter)) ||
//       ('policy' in item && item.policy && item.policy.toLowerCase().includes(lowerCaseFilter))
//     );
//   }, [selectedItems, selectedItemsFilter]);

//   return (
//     // Main container with dynamic background and text color based on dark mode
//     <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
//       {/* Header */}
//       <header className={`py-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <h1 className={`text-3xl font-extrabold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>ERP Solution Configurator</h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? <IconSun className="w-5 h-5" /> : <IconMoon className="w-5 h-5" />}
//             </button>
//             <IconSettings className={`w-6 h-6 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`} />
//             <IconUser className={`w-6 h-6 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`} />
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Section: Categories, Industries, Company Sizes */}
//         <div className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           <h2 className={`text-2xl font-bold mb-6 pb-2 border-b ${darkMode ? 'border-gray-700 text-blue-300' : 'border-gray-200 text-blue-700'}`}>
//             Explore ERP Elements
//           </h2>

//           <div className="space-y-8">
//             {/* Render Portfolio Categories */}
//             <div>
//               <h3 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-50' : 'text-gray-800'}`}>
//                 <IconLayers className="mr-2 text-blue-500" /> Portfolio Categories
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {allData.filter(item => item.type === "category").map(category => (
//                   <div key={category.id} className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}>
//                     <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCategory(category.id)}>
//                       <h4 className={`font-semibold text-lg ${darkMode ? 'text-blue-300' : 'text-blue-700'} flex items-center`}>
//                         {category.label}
//                       </h4>
//                       <div className="flex items-center space-x-2">
//                         {category.info && (
//                           <button
//                             onClick={(e) => { e.stopPropagation(); handleInfoClick(category); }}
//                             className={`p-1 rounded-full ${darkMode ? 'bg-gray-600 text-blue-300 hover:bg-gray-500' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-all duration-200`}
//                             aria-label={`More info about ${category.label}`}
//                           >
//                             <IconInfo className="w-4 h-4" />
//                           </button>
//                         )}
//                         {expandedCategories.has(category.id) ? (
//                           <IconChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`} />
//                         ) : (
//                           <IconChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`} />
//                         )}
//                       </div>
//                     </div>
//                     {expandedCategories.has(category.id) && "subcategories" in category && category.subcategories && (
//                       <div className="mt-3 ml-2 space-y-2 border-l border-dashed border-gray-400 pl-4">
//                         {category.subcategories.map(sub => (
//                           <div key={sub.id} className="pt-2">
//                             <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{sub.label}</p>
//                             {sub.products && sub.products.length > 0 && (
//                               <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
//                                 {sub.products.map(product => (
//                                   <li key={product.id} className={`flex items-center justify-between py-1 px-2 rounded-md ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200`}>
//                                     <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{product.label}</span>
//                                     <div className="flex items-center space-x-2">
//                                       <button
//                                         onClick={(e) => { e.stopPropagation(); handleInfoClick(product); }}
//                                         className={`p-1 rounded-full ${darkMode ? 'bg-gray-500 text-blue-300 hover:bg-gray-400' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-all duration-200`}
//                                         aria-label={`More info about ${product.label}`}
//                                       >
//                                         <IconInfo className="w-4 h-4" />
//                                       </button>
//                                       <button
//                                         onClick={(e) => { e.stopPropagation(); toggleSelection(product.id); }}
//                                         className={`p-1 rounded-full ${selectedItems.some(item => item.id === product.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'} transition-all duration-200`}
//                                         aria-label={selectedItems.some(item => item.id === product.id) ? `Remove ${product.label}` : `Add ${product.label}`}
//                                       >
//                                         {selectedItems.some(item => item.id === product.id) ? <IconX className="w-4 h-4" /> : <IconPlus className="w-4 h-4" />}
//                                       </button>
//                                     </div>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Render Industries and Company Sizes */}
//             {[
//               { title: "Industries", type: "industry" as const, icon: <IconCompass /> },
//               { title: "Company Sizes", type: "companySize" as const, icon: <FiUsers className="w-5 h-5" /> }, // FiUsers remains as a custom component
//             ].map(section => (
//               <div key={section.type}>
//                 <h3 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-50' : 'text-gray-800'}`}>
//                   {section.icon} <span className="ml-2">{section.title}</span>
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {allData.filter(item => item.type === section.type).map(item => (
//                     <div
//                       key={item.id}
//                       className={`p-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-200
//                         ${selectedItems.some(s => s.id === item.id) ?
//                           (darkMode ? 'bg-blue-700 border-blue-500' : 'bg-blue-100 border-blue-400') :
//                           (darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200')
//                         }
//                         ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'}
//                         cursor-pointer`}
//                       onClick={() => toggleSelection(item.id)}
//                     >
//                       <div className="flex items-center">
//                         {item.type !== "category" && 'icon' in item && item.icon && 'color' in item && item.color ? (
//                           <div className={`p-2 rounded-full ${item.color} text-white mr-3 shadow-sm`}>
//                             {item.icon}
//                           </div>
//                         ) : null}
//                         <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{item.label}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleInfoClick(item); }}
//                           className={`p-1 rounded-full ${darkMode ? 'bg-gray-600 text-blue-300 hover:bg-gray-500' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-all duration-200`}
//                           aria-label={`More info about ${item.label}`}
//                         >
//                           <IconInfo className="w-4 h-4" />
//                         </button>
//                         {selectedItems.some(s => s.id === item.id) ? (
//                           <IconCheckCircle className="w-5 h-5 text-green-500" />
//                         ) : (
//                           <IconPlus className={`w-5 h-5 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`} />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Section: Your Selected ERP Elements */}
//         <div className={`lg:col-span-1 p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="flex justify-between items-center mb-6 pb-2 border-b">
//             <h2 className={`text-2xl font-bold ${darkMode ? 'border-gray-700 text-blue-300' : 'border-gray-200 text-blue-700'}`}>
//               Your Selected ERP Elements ({selectedItems.length})
//             </h2>
//             <button
//               onClick={clearAllSelections}
//               className={`flex items-center px-4 py-2 rounded-md font-semibold transition-colors duration-200
//                 ${selectedItems.length === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}
//                 ${darkMode ? 'dark:bg-red-700 dark:hover:bg-red-800' : ''}`}
//               disabled={selectedItems.length === 0}
//               aria-label="Clear all selections"
//             >
//               <IconRefreshCw className="mr-2" /> Clear All
//             </button>
//           </div>

//           {/* Search/Filter for Selected Items */}
//           <div className="mb-6 relative">
//             <input
//               type="text"
//               placeholder="Filter selected items by name, description, or policy..."
//               className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200
//                 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200'}`}
//               value={selectedItemsFilter}
//               onChange={(e) => setSelectedItemsFilter(e.target.value)}
//               aria-label="Filter selected ERP elements"
//             />
//             <IconSearch className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`} />
//           </div>

//           {/* List of Selected Items */}
//           {filteredSelectedItems.length > 0 ? (
//             <div className="space-y-4">
//               {filteredSelectedItems.map(item => (
//                 <div key={item.id} className={`p-4 rounded-lg shadow-sm ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}>
//                   <div className="flex items-center justify-between">
//                     <h3 className={`font-semibold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
//                       {item.label}
//                     </h3>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handleInfoClick(item)}
//                         className={`p-1 rounded-full ${darkMode ? 'bg-gray-600 text-blue-300 hover:bg-gray-500' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-all duration-200`}
//                         aria-label={`View details for ${item.label}`}
//                       >
//                         <IconInfo className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => toggleSelection(item.id)}
//                         className={`p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200`}
//                         aria-label={`Remove ${item.label} from selection`}
//                       >
//                         <IconX className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                   {item.description && (
//                     <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description.substring(0, 100)}...</p>
//                   )}
//                   {'policy' in item && item.policy && (
//                     <p className={`text-xs italic mt-1 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`}>Policy: {item.policy.substring(0, 70)}...</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className={`text-center py-8 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`}>
//               {selectedItems.length === 0 ? "No ERP elements selected yet. Select some from the left panel!" : "No matching selected elements found for your filter."}
//             </p>
//           )}
//         </div>
//       </main>

//       {/* Right sidebar for item details */}
//       <RightBarInfo
//         item={selectedDetailItem}
//         onClose={() => setShowRightBar(false)}
//         toggleSelection={toggleSelection}
//         isSelected={selectedDetailItem ? selectedItems.some(item => item.id === selectedDetailItem.id) : false}
//         darkMode={darkMode} // Pass dark mode state to the sidebar
//       />
//     </div>
//   );
// };

// export default App;



// src/components/ERPExplorer.tsx
// import React, { useState } from 'react';
// import {
//   FaIndustry,
//   FaBuilding,
//   FaTools,
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaFilter,
//   FaArrowRight,
// } from 'react-icons/fa'; // Importing various icons

// interface ERPElement {
//   id: string;
//   name: string;
//   description: string;
//   category: string; // e.g., 'Finance', 'HR', 'Supply Chain'
// }

// interface Industry {
//   id: string;
//   name: string;
//   description: string;
// }

// interface CompanySize {
//   id: string;
//   label: string;
//   minEmployees: number;
//   maxEmployees: number | null; // null for '5000+'
// }

// const erpElementsData: ERPElement[] = [
//   { id: 'erp-1', name: 'Financial Management', description: 'Manages all financial transactions, accounting, budgeting, and reporting.', category: 'Finance' },
//   { id: 'erp-2', name: 'Human Resources (HR)', description: 'Handles employee data, payroll, recruitment, training, and performance management.', category: 'HR' },
//   { id: 'erp-3', name: 'Supply Chain Management (SCM)', description: 'Optimizes the flow of goods and services, from raw materials to finished products.', category: 'Supply Chain' },
//   { id: 'erp-4', name: 'Customer Relationship Management (CRM)', description: 'Manages customer interactions, sales, marketing, and customer service.', category: 'Sales & Marketing' },
//   { id: 'erp-5', name: 'Manufacturing Operations', description: 'Controls production processes, planning, scheduling, and quality control.', category: 'Manufacturing' },
//   { id: 'erp-6', name: 'Inventory Management', description: 'Tracks and controls goods from purchase to sale, including warehousing.', category: 'Logistics' },
//   { id: 'erp-7', name: 'Project Management', description: 'Plans, executes, and monitors projects, managing tasks, resources, and deadlines.', category: 'Operations' },
//   { id: 'erp-8', name: 'Business Intelligence (BI)', description: 'Analyzes data to provide insights for better decision-making.', category: 'Analytics' },
// ];

// const industriesData: Industry[] = [
//   { id: 'ind-1', name: 'Manufacturing', description: 'Production of goods using labor, machines, tools, and chemical or biological processing or formulation.' },
//   { id: 'ind-2', name: 'Retail', description: 'Sale of goods to the public in relatively small quantities for use or consumption rather than for resale.' },
//   { id: 'ind-3', name: 'Healthcare', description: 'Maintenance or improvement of health via the prevention, diagnosis, treatment, amelioration, or cure of disease, illness, injury, and other physical and mental impairments in people.' },
//   { id: 'ind-4', name: 'Financial Services', description: 'Economic services provided by the finance industry, which encompasses a broad range of businesses that manage money.' },
//   { id: 'ind-5', name: 'Technology', description: 'Development, production, and distribution of technological goods and services.' },
//   { id: 'ind-6', name: 'Construction', description: 'The process of constructing a building or infrastructure.' },
// ];

// const companySizesData: CompanySize[] = [
//   { id: 'size-1', label: '1-50 Employees (Small Business)', minEmployees: 1, maxEmployees: 50 },
//   { id: 'size-2', label: '51-500 Employees (Medium Business)', minEmployees: 51, maxEmployees: 500 },
//   { id: 'size-3', label: '501-5000 Employees (Large Enterprise)', minEmployees: 501, maxEmployees: 5000 },
//   { id: 'size-4', label: '5000+ Employees (Global Corporation)', minEmployees: 5001, maxEmployees: null },
// ];

// const ERPExplorer: React.FC = () => {
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
//   const [selectedCompanySize, setSelectedCompanySize] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const toggleElement = (elementId: string) => {
//     setSelectedElements((prev) =>
//       prev.includes(elementId)
//         ? prev.filter((id) => id !== elementId)
//         : [...prev, elementId]
//     );
//   };

//   const handleIndustrySelect = (industryId: string) => {
//     setSelectedIndustry(industryId === selectedIndustry ? null : industryId);
//   };

//   const handleCompanySizeSelect = (sizeId: string) => {
//     setSelectedCompanySize(sizeId === selectedCompanySize ? null : sizeId);
//   };

//   const filteredERPElements = erpElementsData.filter((element) =>
//     element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     element.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSubmit = () => {
//     const selectedERPNames = erpElementsData
//       .filter((el) => selectedElements.includes(el.id))
//       .map((el) => el.name);
//     const industryName = industriesData.find((ind) => ind.id === selectedIndustry)?.name || 'N/A';
//     const companySizeLabel = companySizesData.find((size) => size.id === selectedCompanySize)?.label || 'N/A';

//     alert(
//       `Your ERP Selection:\n\nERP Elements: ${selectedERPNames.join(', ')}\nIndustry: ${industryName}\nCompany Size: ${companySizeLabel}\n\n(This is a simulated submission. In a real app, you'd send this data to a backend.)`
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
//       <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl p-10 transform transition-all duration-500 hover:scale-[1.005]">
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center tracking-tight leading-tight">
//           <FaTools className="inline-block mr-4 text-blue-600" />
//           ERP Explorer: Tailor Your Solution
//         </h1>
//         <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
//           Discover the perfect ERP elements, industries, and company sizes to match your business needs.
//           Select the modules that empower your operations.
//         </p>

//         {/* Search Bar */}
//         <div className="mb-12 flex items-center justify-center">
//           <div className="relative w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Search ERP elements..."
//               className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800 transition-all duration-300 shadow-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl" />
//           </div>
//         </div>

//         {/* ERP Elements Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaTools className="mr-3 text-blue-500" />
//             Select ERP Elements
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredERPElements.map((element) => (
//               <div
//                 key={element.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                   ${selectedElements.includes(element.id)
//                     ? 'border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-200'
//                     : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
//                   }`}
//                 onClick={() => toggleElement(element.id)}
//               >
//                 {selectedElements.includes(element.id) && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-blue-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                   {getERPCategoryIcon(element.category)}
//                   {element.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{element.description}</p>
//                 <span className="mt-3 inline-block text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
//                   {element.category}
//                 </span>
//               </div>
//             ))}
//             {filteredERPElements.length === 0 && (
//               <p className="col-span-full text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//             )}
//           </div>
//         </section>

//         {/* Industry Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaIndustry className="mr-3 text-green-500" />
//             Choose Your Industry
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {industriesData.map((industry) => (
//               <div
//                 key={industry.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                   ${selectedIndustry === industry.id
//                     ? 'border-green-500 bg-green-50 shadow-lg ring-4 ring-green-200'
//                     : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleIndustrySelect(industry.id)}
//               >
//                 {selectedIndustry === industry.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-green-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                   <FaIndustry className="mr-2 text-green-600" />
//                   {industry.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{industry.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Company Size Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaBuilding className="mr-3 text-purple-500" />
//             Define Company Size
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {companySizesData.map((size) => (
//               <div
//                 key={size.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center
//                   ${selectedCompanySize === size.id
//                     ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-200'
//                     : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleCompanySizeSelect(size.id)}
//               >
//                 {selectedCompanySize === size.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-purple-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {size.label}
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   {size.minEmployees}
//                   {size.maxEmployees ? ` - ${size.maxEmployees}` : '+'} Employees
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Summary and Call to Action */}
//         <div className="mt-16 pt-8 border-t-2 border-gray-100 flex flex-col items-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
//             Ready to Explore Your Ideal ERP?
//           </h2>
//           <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
//             Based on your selections, we can now provide more tailored recommendations.
//           </p>
//           <button
//             onClick={handleSubmit}
//             className="flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
//             disabled={selectedElements.length === 0 || !selectedIndustry || !selectedCompanySize}
//           >
//             Get My Tailored ERP Insights <FaArrowRight className="ml-3 text-2xl" />
//           </button>
//           <p className="text-sm text-gray-500 mt-4">
//             (Please select at least one ERP element, an industry, and a company size to proceed)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function to get specific icons for ERP categories
// const getERPCategoryIcon = (category: string) => {
//   switch (category) {
//     case 'Finance':
//       return <FaTools className="mr-2 text-yellow-500" />;
//     case 'HR':
//       return <FaBuilding className="mr-2 text-red-500" />;
//     case 'Supply Chain':
//       return <FaArrowRight className="mr-2 text-green-500" />;
//     case 'Sales & Marketing':
//       return <FaSearch className="mr-2 text-pink-500" />;
//     case 'Manufacturing':
//       return <FaIndustry className="mr-2 text-orange-500" />;
//     case 'Logistics':
//       return <FaFilter className="mr-2 text-teal-500" />;
//     case 'Operations':
//       return <FaCheckCircle className="mr-2 text-indigo-500" />;
//     case 'Analytics':
//       return <FaTools className="mr-2 text-gray-500" />;
//     default:
//       return <FaTools className="mr-2 text-gray-500" />;
//   }
// };

// export default ERPExplorer;








// src/components/ERPExplorer.tsx
// import React, { useState } from 'react';
// import {
//   FaIndustry,
//   FaBuilding,
//   FaTools,
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaFilter,
//   FaArrowRight,
//   FaList,           // New: List icon
//   FaThLarge,        // New: Card/Grid icon
//   FaSitemap,        // New: Tree icon
//   FaBars,           // New: Open sidebar icon
//   FaTimes,          // New: Close sidebar icon
//   FaChevronDown,    // New: Tree view toggle
//   FaChevronRight,   // New: Tree view toggle
// } from 'react-icons/fa'; // Importing various icons

// interface ERPElement {
//   id: string;
//   name: string;
//   description: string;
//   category: string; // e.g., 'Finance', 'HR', 'Supply Chain'
// }

// interface Industry {
//   id: string;
//   name: string;
//   description: string;
// }

// interface CompanySize {
//   id: string;
//   label: string;
//   minEmployees: number;
//   maxEmployees: number | null; // null for '5000+'
// }

// const erpElementsData: ERPElement[] = [
//   { id: 'erp-1', name: 'Financial Management', description: 'Manages all financial transactions, accounting, budgeting, and reporting.', category: 'Finance' },
//   { id: 'erp-2', name: 'Human Resources (HR)', description: 'Handles employee data, payroll, recruitment, training, and performance management.', category: 'HR' },
//   { id: 'erp-3', name: 'Supply Chain Management (SCM)', description: 'Optimizes the flow of goods and services, from raw materials to finished products.', category: 'Supply Chain' },
//   { id: 'erp-4', name: 'Customer Relationship Management (CRM)', description: 'Manages customer interactions, sales, marketing, and customer service.', category: 'Sales & Marketing' },
//   { id: 'erp-5', name: 'Manufacturing Operations', description: 'Controls production processes, planning, scheduling, and quality control.', category: 'Manufacturing' },
//   { id: 'erp-6', name: 'Inventory Management', description: 'Tracks and controls goods from purchase to sale, including warehousing.', category: 'Logistics' },
//   { id: 'erp-7', name: 'Project Management', description: 'Plans, executes, and monitors projects, managing tasks, resources, and deadlines.', category: 'Operations' },
//   { id: 'erp-8', name: 'Business Intelligence (BI)', description: 'Analyzes data to provide insights for better decision-making.', category: 'Analytics' },
//   { id: 'erp-9', name: 'Quality Management', description: 'Ensures products and services meet specified quality standards.', category: 'Manufacturing' },
//   { id: 'erp-10', name: 'Asset Management', description: 'Manages the lifecycle of physical assets, from acquisition to disposal.', category: 'Operations' },
// ];

// const industriesData: Industry[] = [
//   { id: 'ind-1', name: 'Manufacturing', description: 'Production of goods using labor, machines, tools, and chemical or biological processing or formulation.' },
//   { id: 'ind-2', name: 'Retail', description: 'Sale of goods to the public in relatively small quantities for use or consumption rather than for resale.' },
//   { id: 'ind-3', name: 'Healthcare', description: 'Maintenance or improvement of health via the prevention, diagnosis, treatment, amelioration, or cure of disease, illness, injury, and other physical and mental impairments in people.' },
//   { id: 'ind-4', name: 'Financial Services', description: 'Economic services provided by the finance industry, which encompasses a broad range of businesses that manage money.' },
//   { id: 'ind-5', name: 'Technology', description: 'Development, production, and distribution of technological goods and services.' },
//   { id: 'ind-6', name: 'Construction', description: 'The process of constructing a building or infrastructure.' },
// ];

// const companySizesData: CompanySize[] = [
//   { id: 'size-1', label: '1-50 Employees (Small Business)', minEmployees: 1, maxEmployees: 50 },
//   { id: 'size-2', label: '51-500 Employees (Medium Business)', minEmployees: 51, maxEmployees: 500 },
//   { id: 'size-3', label: '501-5000 Employees (Large Enterprise)', minEmployees: 501, maxEmployees: 5000 },
//   { id: 'size-4', label: '5000+ Employees (Global Corporation)', minEmployees: 5001, maxEmployees: null },
// ];

// type ViewMode = 'card' | 'list' | 'tree';

// const ERPExplorer: React.FC = () => {
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
//   const [selectedCompanySize, setSelectedCompanySize] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<ViewMode>('card'); // Default view
//   const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false);
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]); // For tree view

//   const toggleElement = (elementId: string) => {
//     setSelectedElements((prev) =>
//       prev.includes(elementId)
//         ? prev.filter((id) => id !== elementId)
//         : [...prev, elementId]
//     );
//   };

//   const handleIndustrySelect = (industryId: string) => {
//     setSelectedIndustry(industryId === selectedIndustry ? null : industryId);
//   };

//   const handleCompanySizeSelect = (sizeId: string) => {
//     setSelectedCompanySize(sizeId === selectedCompanySize ? null : sizeId);
//   };

//   const filteredERPElements = erpElementsData.filter((element) =>
//     element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     element.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSubmit = () => {
//     const selectedERPNames = erpElementsData
//       .filter((el) => selectedElements.includes(el.id))
//       .map((el) => el.name);
//     const industryName = industriesData.find((ind) => ind.id === selectedIndustry)?.name || 'N/A';
//     const companySizeLabel = companySizesData.find((size) => size.id === selectedCompanySize)?.label || 'N/A';

//     alert(
//       `Your ERP Selection:\n\nERP Elements: ${selectedERPNames.join(', ')}\nIndustry: ${industryName}\nCompany Size: ${companySizeLabel}\n\n(This is a simulated submission. In a real app, you'd send this data to a backend.)`
//     );
//   };

//   const toggleCategoryExpansion = (category: string) => {
//     setExpandedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   // Group ERP elements by category for tree view
//   const erpElementsByCategory = filteredERPElements.reduce((acc, element) => {
//     if (!acc[element.category]) {
//       acc[element.category] = [];
//     }
//     acc[element.category].push(element);
//     return acc;
//   }, {} as Record<string, ERPElement[]>);

//   const selectedERPNames = erpElementsData
//     .filter((el) => selectedElements.includes(el.id))
//     .map((el) => el.name);
//   const industryName = industriesData.find((ind) => ind.id === selectedIndustry)?.name || 'Not Selected';
//   const companySizeLabel = companySizesData.find((size) => size.id === selectedCompanySize)?.label || 'Not Selected';


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans flex w-full">
//       <div className="flex-1 max-w-7xl mx-auto bg-white shadow-2xl rounded-xl p-6 md:p-10 transform transition-all duration-500 hover:scale-[1.005] relative">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 text-center tracking-tight leading-tight">
//           <FaTools className="inline-block mr-2 md:mr-4 text-blue-600" />
//           ERP Explorer: Tailor Your Solution
//         </h1>
//         <p className="text-md md:text-xl text-gray-600 mb-8 md:mb-12 text-center max-w-3xl mx-auto">
//           Discover the perfect ERP elements, industries, and company sizes to match your business needs.
//           Select the modules that empower your operations.
//         </p>

//         {/* Search Bar and View Toggles */}
//         <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="relative w-full md:w-2/3 lg:w-1/2">
//             <input
//               type="text"
//               placeholder="Search ERP elements..."
//               className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800 transition-all duration-300 shadow-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl" />
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setViewMode('card')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'card' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="Card View"
//             >
//               <FaThLarge className="text-xl" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="List View"
//             >
//               <FaList className="text-xl" />
//             </button>
//             <button
//               onClick={() => setViewMode('tree')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'tree' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="Tree View"
//             >
//               <FaSitemap className="text-xl" />
//             </button>
//           </div>
//           <button
//             onClick={() => setIsRightBarOpen(!isRightBarOpen)}
//             className="p-3 rounded-full bg-blue-600 text-white shadow-lg md:hidden block" // Show on small screens
//             title={isRightBarOpen ? "Close Sidebar" : "Open Sidebar"}
//           >
//             {isRightBarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//           </button>
//         </div>

//         {/* ERP Elements Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaTools className="mr-3 text-blue-500" />
//             Select ERP Elements
//           </h2>

//           {viewMode === 'card' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredERPElements.map((element) => (
//                 <div
//                   key={element.id}
//                   className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                     ${selectedElements.includes(element.id)
//                       ? 'border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-200'
//                       : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
//                     }`}
//                   onClick={() => toggleElement(element.id)}
//                 >
//                   {selectedElements.includes(element.id) && (
//                     <FaCheckCircle className="absolute top-3 right-3 text-blue-600 text-2xl" />
//                   )}
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                     {getERPCategoryIcon(element.category)}
//                     {element.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm">{element.description}</p>
//                   <span className="mt-3 inline-block text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
//                     {element.category}
//                   </span>
//                 </div>
//               ))}
//               {filteredERPElements.length === 0 && (
//                 <p className="col-span-full text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}

//           {viewMode === 'list' && (
//             <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
//               {filteredERPElements.map((element) => (
//                 <div
//                   key={element.id}
//                   className={`flex items-center justify-between p-4 cursor-pointer transition-colors duration-200
//                     ${selectedElements.includes(element.id)
//                       ? 'bg-blue-50 border-l-4 border-blue-500'
//                       : 'hover:bg-gray-50'
//                     }`}
//                   onClick={() => toggleElement(element.id)}
//                 >
//                   <div className="flex items-center">
//                     {getERPCategoryIcon(element.category)}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">{element.name}</h3>
//                       <p className="text-gray-600 text-sm">{element.description}</p>
//                       <span className="inline-block text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full mt-1">
//                         {element.category}
//                       </span>
//                     </div>
//                   </div>
//                   {selectedElements.includes(element.id) && (
//                     <FaCheckCircle className="text-blue-600 text-xl ml-4" />
//                   )}
//                 </div>
//               ))}
//               {filteredERPElements.length === 0 && (
//                 <p className="p-4 text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}

//           {viewMode === 'tree' && (
//             <div className="border border-gray-200 rounded-lg p-4">
//               {Object.keys(erpElementsByCategory).length > 0 ? (
//                 Object.entries(erpElementsByCategory).map(([category, elements]) => (
//                   <div key={category} className="mb-4">
//                     <div
//                       className="flex items-center cursor-pointer mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
//                       onClick={() => toggleCategoryExpansion(category)}
//                     >
//                       {expandedCategories.includes(category) ? (
//                         <FaChevronDown className="mr-2 text-blue-500" />
//                       ) : (
//                         <FaChevronRight className="mr-2 text-blue-500" />
//                       )}
//                       {category} ({elements.length})
//                     </div>
//                     {expandedCategories.includes(category) && (
//                       <ul className="ml-6 border-l border-gray-200 pl-4">
//                         {elements.map((element) => (
//                           <li
//                             key={element.id}
//                             className={`flex items-center py-2 cursor-pointer transition-colors duration-200
//                               ${selectedElements.includes(element.id)
//                                 ? 'bg-blue-50 text-blue-800'
//                                 : 'hover:bg-gray-50'
//                               }`}
//                             onClick={() => toggleElement(element.id)}
//                           >
//                             {selectedElements.includes(element.id) ? (
//                               <FaCheckCircle className="text-blue-600 mr-2" />
//                             ) : (
//                               <span className="w-4 h-4 mr-2 border border-gray-400 rounded-sm"></span>
//                             )}
//                             <span className="text-gray-700">{element.name}</span>
//                             <span className="text-gray-500 text-sm ml-2">- {element.description}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="p-4 text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}
//         </section>

//         {/* Industry Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaIndustry className="mr-3 text-green-500" />
//             Choose Your Industry
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {industriesData.map((industry) => (
//               <div
//                 key={industry.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                   ${selectedIndustry === industry.id
//                     ? 'border-green-500 bg-green-50 shadow-lg ring-4 ring-green-200'
//                     : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleIndustrySelect(industry.id)}
//               >
//                 {selectedIndustry === industry.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-green-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                   <FaIndustry className="mr-2 text-green-600" />
//                   {industry.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{industry.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Company Size Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaBuilding className="mr-3 text-purple-500" />
//             Define Company Size
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {companySizesData.map((size) => (
//               <div
//                 key={size.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center
//                   ${selectedCompanySize === size.id
//                     ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-200'
//                     : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleCompanySizeSelect(size.id)}
//               >
//                 {selectedCompanySize === size.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-purple-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {size.label}
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   {size.minEmployees}
//                   {size.maxEmployees ? ` - ${size.maxEmployees}` : '+'} Employees
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Summary and Call to Action */}
//         <div className="mt-16 pt-8 border-t-2 border-gray-100 flex flex-col items-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
//             Ready to Explore Your Ideal ERP?
//           </h2>
//           <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
//             Based on your selections, we can now provide more tailored recommendations.
//           </p>
//           <button
//             onClick={handleSubmit}
//             className="flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
//             disabled={selectedElements.length === 0 || !selectedIndustry || !selectedCompanySize}
//           >
//             Get My Tailored ERP Insights <FaArrowRight className="ml-3 text-2xl" />
//           </button>
//           <p className="text-sm text-gray-500 mt-4">
//             (Please select at least one ERP element, an industry, and a company size to proceed)
//           </p>
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-80 p-6 shadow-lg z-50 transform transition-transform duration-300
//           ${isRightBarOpen ? 'translate-x-0' : 'translate-x-full'}
//           md:translate-x-0 md:static md:w-96 md:ml-8 md:bg-white md:text-gray-900 md:shadow-none md:p-0`}
//       >
//         <div className="flex justify-between items-center mb-6 md:hidden"> {/* Close button for mobile */}
//           <h2 className="text-2xl font-bold">Your Selections</h2>
//           <button onClick={() => setIsRightBarOpen(false)} className="text-gray-300 hover:text-white">
//             <FaTimes className="text-2xl" />
//           </button>
//         </div>
//         <div className="md:block"> {/* Content visible on desktop and when sidebar is open on mobile */}
//           <h2 className="text-2xl font-bold mb-4 md:text-gray-800">Your Selections</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-2">ERP Elements:</h3>
//               {selectedERPNames.length > 0 ? (
//                 <ul className="list-disc list-inside text-gray-300 md:text-gray-700">
//                   {selectedERPNames.map((name, index) => (
//                     <li key={index} className="flex items-center">
//                       <FaCheckCircle className="text-green-400 md:text-green-500 mr-2 text-sm" /> {name}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-800 md:text-gray-500 italic">No ERP elements selected.</p>
//               )}
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-2">Industry:</h3>
//               <p className="text-gray-300 md:text-gray-700">
//                 <FaIndustry className="inline-block mr-2 text-green-400 md:text-green-500" /> {industryName}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-2">Company Size:</h3>
//               <p className="text-gray-300 md:text-gray-700">
//                 <FaBuilding className="inline-block mr-2 text-purple-400 md:text-purple-500" /> {companySizeLabel}
//               </p>
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md transition-colors duration-300 md:bg-indigo-600 md:hover:bg-indigo-700"
//               disabled={selectedElements.length === 0 || !selectedIndustry || !selectedCompanySize}
//             >
//               Confirm Selection <FaArrowRight className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function to get specific icons for ERP categories
// const getERPCategoryIcon = (category: string) => {
//   switch (category) {
//     case 'Finance':
//       return <FaTools className="mr-2 text-yellow-500" />;
//     case 'HR':
//       return <FaBuilding className="mr-2 text-red-500" />;
//     case 'Supply Chain':
//       return <FaArrowRight className="mr-2 text-green-500" />;
//     case 'Sales & Marketing':
//       return <FaSearch className="mr-2 text-pink-500" />;
//     case 'Manufacturing':
//       return <FaIndustry className="mr-2 text-orange-500" />;
//     case 'Logistics':
//       return <FaFilter className="mr-2 text-teal-500" />;
//     case 'Operations':
//       return <FaCheckCircle className="mr-2 text-indigo-500" />;
//     case 'Analytics':
//       return <FaTools className="mr-2 text-gray-500" />;
//     default:
//       return <FaTools className="mr-2 text-gray-500" />;
//   }
// };

// export default ERPExplorer;

// import React, { useState } from 'react';
// import {
//   FaIndustry,
//   FaBuilding,
//   FaTools,
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaFilter,
//   FaArrowRight,
//   FaList,
//   FaThLarge,
//   FaSitemap,
//   FaBars,
//   FaTimes,
//   FaChevronDown,
//   FaChevronRight,
//   FaInfoCircle, // New: Info icon for policies
// } from 'react-icons/fa';

// interface ERPElement {
//   id: string;
//   name: string;
//   description: string;
//   category: string; // e.g., 'Finance', 'HR', 'Supply Chain'
//   policy?: string; // Added policy field
// }

// interface Industry {
//   id: string;
//   name: string;
//   description: string;
//   policy?: string; // Added policy field
// }

// interface CompanySize {
//   id: string;
//   label: string;
//   minEmployees: number;
//   maxEmployees: number | null; // null for '5000+'
//   policy?: string; // Added policy field
// }

// const erpElementsData: ERPElement[] = [
//   { id: 'erp-1', name: 'Financial Management', description: 'Manages all financial transactions, accounting, budgeting, and reporting.', category: 'Finance', policy: 'Ensures compliance with IFRS/GAAP standards. Provides real-time financial insights and automated reporting for robust decision-making and regulatory adherence.' },
//   { id: 'erp-2', name: 'Human Resources (HR)', description: 'Handles employee data, payroll, recruitment, training, and performance management.', category: 'HR', policy: 'Streamlines HR processes, from onboarding to offboarding. Guarantees data privacy and compliance with labor laws. Enhances employee experience through self-service portals.' },
//   { id: 'erp-3', name: 'Supply Chain Management (SCM)', description: 'Optimizes the flow of goods and services, from raw materials to finished products.', category: 'Supply Chain', policy: 'Maximizes supply chain efficiency and transparency. Minimizes stockouts and optimizes inventory levels through predictive analytics. Enhances supplier collaboration and risk management.' },
//   { id: 'erp-4', name: 'Customer Relationship Management (CRM)', description: 'Manages customer interactions, sales, marketing, and customer service.', category: 'Sales & Marketing', policy: 'Builds stronger customer relationships through personalized interactions. Automates sales pipelines and marketing campaigns. Provides 360-degree customer view for improved service and retention.' },
//   { id: 'erp-5', name: 'Manufacturing Operations', description: 'Controls production processes, planning, scheduling, and quality control.', category: 'Manufacturing', policy: 'Optimizes production planning and resource allocation. Reduces manufacturing lead times and improves product quality through real-time monitoring and automation. Supports various manufacturing modes (discrete, process, lean).' },
//   { id: 'erp-6', name: 'Inventory Management', description: 'Tracks and controls goods from purchase to sale, including warehousing.', category: 'Logistics', policy: 'Achieves optimal inventory levels, reducing carrying costs and waste. Provides accurate stock visibility across multiple locations. Automates reordering and demand forecasting for streamlined operations.' },
//   { id: 'erp-7', name: 'Project Management', description: 'Plans, executes, and monitors projects, managing tasks, resources, and deadlines.', category: 'Operations', policy: 'Enables effective planning, execution, and monitoring of complex projects. Ensures timely delivery and budget adherence through robust task tracking, resource allocation, and progress reporting.' },
//   { id: 'erp-8', name: 'Business Intelligence (BI)', description: 'Analyzes data to provide insights for better decision-making.', category: 'Analytics', policy: 'Transforms raw data into actionable insights through interactive dashboards and reports. Supports data-driven decision-making across all business functions. Integrates with various data sources for comprehensive analysis.' },
//   { id: 'erp-9', name: 'Quality Management', description: 'Ensures products and services meet specified quality standards.', category: 'Manufacturing', policy: 'Establishes and maintains high-quality standards across all production stages. Facilitates quality control checks, defect tracking, and corrective actions. Supports compliance with industry-specific quality regulations.' },
//   { id: 'erp-10', name: 'Asset Management', description: 'Manages the lifecycle of physical assets, from acquisition to disposal.', category: 'Operations', policy: 'Maximizes asset utilization and extends asset lifespan through proactive maintenance scheduling and performance tracking. Reduces operational costs and improves capital expenditure planning. Ensures regulatory compliance for asset management.' },
// ];

// const industriesData: Industry[] = [
//   { id: 'ind-1', name: 'Manufacturing', description: 'Production of goods using labor, machines, tools, and chemical or biological processing or formulation.', policy: 'ERP solutions tailored for manufacturing focus on production planning, inventory optimization, quality control, and supply chain integration to improve efficiency and reduce costs.' },
//   { id: 'ind-2', name: 'Retail', description: 'Sale of goods to the public in relatively small quantities for use or consumption rather than for resale.', policy: 'For retail, ERP emphasizes point-of-sale integration, inventory management across multiple channels, customer loyalty programs, and demand forecasting to enhance customer experience and sales.' },
//   { id: 'ind-3', name: 'Healthcare', description: 'Maintenance or improvement of health via the prevention, diagnosis, treatment, amelioration, or cure of disease, illness, injury, and other physical and mental impairments in people.', policy: 'Healthcare ERPs focus on patient management, billing, compliance with healthcare regulations (e.g., HIPAA), resource scheduling, and supply chain for medical supplies.' },
//   { id: 'ind-4', name: 'Financial Services', description: 'Economic services provided by the finance industry, which encompasses a broad range of businesses that manage money.', policy: 'Financial services ERPs prioritize robust financial accounting, risk management, regulatory compliance (e.g., GDPR, Basel III), fraud detection, and customer account management.' },
//   { id: 'ind-5', name: 'Technology', description: 'Development, production, and distribution of technological goods and services.', policy: 'Technology sector ERPs are designed for agile project management, intellectual property tracking, contract management, R&D expense management, and subscription billing.' },
//   { id: 'ind-6', name: 'Construction', description: 'The process of constructing a building or infrastructure.', policy: 'Construction ERPs provide tools for project costing, equipment management, field service management, bid management, and compliance with construction safety regulations.' },
// ];

// const companySizesData: CompanySize[] = [
//   { id: 'size-1', label: '1-50 Employees (Small Business)', minEmployees: 1, maxEmployees: 50, policy: 'Small businesses benefit from agile ERPs that offer core financial, inventory, and sales features without excessive complexity, focusing on ease of use and rapid implementation.' },
//   { id: 'size-2', label: '51-500 Employees (Medium Business)', minEmployees: 51, maxEmployees: 500, policy: 'Medium businesses require scalable ERPs that can integrate more departments like HR and supply chain, offering robust reporting and customization to support growth.' },
//   { id: 'size-3', label: '501-5000 Employees (Large Enterprise)', minEmployees: 501, maxEmployees: 5000, policy: 'Large enterprises need comprehensive ERPs with extensive modules, advanced analytics, global capabilities, and strong integration frameworks to manage complex operations and diverse business units.' },
//   { id: 'size-4', label: '5000+ Employees (Global Corporation)', minEmployees: 5001, maxEmployees: null, policy: 'Global corporations demand highly specialized ERPs with multi-country, multi-currency, and multi-language support, advanced security, and performance at scale for geographically dispersed operations.' },
// ];

// type ViewMode = 'card' | 'list' | 'tree';

// const ERPExplorer: React.FC = () => {
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
//   const [selectedCompanySize, setSelectedCompanySize] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<ViewMode>('card');
//   const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false); // Start closed on mobile
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
//   const [showSubmissionMessage, setShowSubmissionMessage] = useState<boolean>(false); // For custom alert

//   const toggleElement = (elementId: string) => {
//     setSelectedElements((prev) =>
//       prev.includes(elementId)
//         ? prev.filter((id) => id !== elementId)
//         : [...prev, elementId]
//     );
//   };

//   const handleIndustrySelect = (industryId: string) => {
//     setSelectedIndustry(industryId === selectedIndustry ? null : industryId);
//   };

//   const handleCompanySizeSelect = (sizeId: string) => {
//     setSelectedCompanySize(sizeId === selectedCompanySize ? null : sizeId);
//   };

//   const filteredERPElements = erpElementsData.filter((element) =>
//     element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     element.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSubmit = () => {
//     setShowSubmissionMessage(true);
//   };

//   const toggleCategoryExpansion = (category: string) => {
//     setExpandedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   // Group ERP elements by category for tree view
//   const erpElementsByCategory = filteredERPElements.reduce((acc, element) => {
//     if (!acc[element.category]) {
//       acc[element.category] = [];
//     }
//     acc[element.category].push(element);
//     return acc;
//   }, {} as Record<string, ERPElement[]>);

//   // Get selected ERP element details for the sidebar
//   const selectedERPElementDetails = erpElementsData.filter((el) =>
//     selectedElements.includes(el.id)
//   );

//   // Get selected Industry details for the sidebar
//   const selectedIndustryDetail = industriesData.find(
//     (ind) => ind.id === selectedIndustry
//   );

//   // Get selected Company Size details for the sidebar
//   const selectedCompanySizeDetail = companySizesData.find(
//     (size) => size.id === selectedCompanySize
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans flex flex-col md:flex-row w-full overflow-hidden">
//       {/* Main Content Area */}
//       <div className="flex-1 max-w-7xl mx-auto bg-white shadow-2xl rounded-xl p-6 md:p-10 transform transition-all duration-500 hover:scale-[1.005] relative z-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 text-center tracking-tight leading-tight">
//           <FaTools className="inline-block mr-2 md:mr-4 text-blue-600" />
//           ERP Explorer: Tailor Your Solution
//         </h1>
//         <p className="text-md md:text-xl text-gray-600 mb-8 md:mb-12 text-center max-w-3xl mx-auto">
//           Discover the perfect ERP elements, industries, and company sizes to match your business needs.
//           Select the modules that empower your operations.
//         </p>

//         {/* Search Bar and View Toggles */}
//         <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="relative w-full md:w-2/3 lg:w-1/2">
//             <input
//               type="text"
//               placeholder="Search ERP elements..."
//               className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800 transition-all duration-300 shadow-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl" />
//             {/* Optional: Add a filter icon here if more complex filtering is introduced beyond search */}
//             {/* <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-xl cursor-pointer hover:text-blue-500" /> */}
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setViewMode('card')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'card' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="Card View"
//             >
//               <FaThLarge className="text-xl" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="List View"
//             >
//               <FaList className="text-xl" />
//             </button>
//             <button
//               onClick={() => setViewMode('tree')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'tree' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="Tree View"
//             >
//               <FaSitemap className="text-xl" />
//             </button>
//           </div>
//           {/* Toggle button for right sidebar (mobile only) */}
//           <button
//             onClick={() => setIsRightBarOpen(!isRightBarOpen)}
//             className="p-3 rounded-full bg-blue-600 text-white shadow-lg md:hidden block"
//             title={isRightBarOpen ? "Close Sidebar" : "Open Sidebar"}
//           >
//             {isRightBarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//           </button>
//         </div>

//         {/* ERP Elements Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaTools className="mr-3 text-blue-500" />
//             Select ERP Elements
//           </h2>

//           {viewMode === 'card' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredERPElements.map((element) => (
//                 <div
//                   key={element.id}
//                   className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                     ${selectedElements.includes(element.id)
//                       ? 'border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-200'
//                       : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
//                     }`}
//                   onClick={() => toggleElement(element.id)}
//                 >
//                   {selectedElements.includes(element.id) && (
//                     <FaCheckCircle className="absolute top-3 right-3 text-blue-600 text-2xl" />
//                   )}
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                     {getERPCategoryIcon(element.category)}
//                     {element.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm">{element.description}</p>
//                   <span className="mt-3 inline-block text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
//                     {element.category}
//                   </span>
//                 </div>
//               ))}
//               {filteredERPElements.length === 0 && (
//                 <p className="col-span-full text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}

//           {viewMode === 'list' && (
//             <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
//               {filteredERPElements.map((element) => (
//                 <div
//                   key={element.id}
//                   className={`flex items-center justify-between p-4 cursor-pointer transition-colors duration-200
//                     ${selectedElements.includes(element.id)
//                       ? 'bg-blue-50 border-l-4 border-blue-500'
//                       : 'hover:bg-gray-50'
//                     }`}
//                   onClick={() => toggleElement(element.id)}
//                 >
//                   <div className="flex items-center">
//                     {getERPCategoryIcon(element.category)}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">{element.name}</h3>
//                       <p className="text-gray-600 text-sm">{element.description}</p>
//                       <span className="inline-block text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full mt-1">
//                         {element.category}
//                       </span>
//                     </div>
//                   </div>
//                   {selectedElements.includes(element.id) && (
//                     <FaCheckCircle className="text-blue-600 text-xl ml-4" />
//                   )}
//                 </div>
//               ))}
//               {filteredERPElements.length === 0 && (
//                 <p className="p-4 text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}

//           {viewMode === 'tree' && (
//             <div className="border border-gray-200 rounded-lg p-4">
//               {Object.keys(erpElementsByCategory).length > 0 ? (
//                 Object.entries(erpElementsByCategory).map(([category, elements]) => (
//                   <div key={category} className="mb-4">
//                     <div
//                       className="flex items-center cursor-pointer mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
//                       onClick={() => toggleCategoryExpansion(category)}
//                     >
//                       {expandedCategories.includes(category) ? (
//                         <FaChevronDown className="mr-2 text-blue-500" />
//                       ) : (
//                         <FaChevronRight className="mr-2 text-blue-500" />
//                       )}
//                       {category} ({elements.length})
//                     </div>
//                     {expandedCategories.includes(category) && (
//                       <ul className="ml-6 border-l border-gray-200 pl-4">
//                         {elements.map((element) => (
//                           <li
//                             key={element.id}
//                             className={`flex items-center py-2 cursor-pointer transition-colors duration-200
//                               ${selectedElements.includes(element.id)
//                                 ? 'bg-blue-50 text-blue-800'
//                                 : 'hover:bg-gray-50'
//                               }`}
//                             onClick={() => toggleElement(element.id)}
//                           >
//                             {selectedElements.includes(element.id) ? (
//                               <FaCheckCircle className="text-blue-600 mr-2" />
//                             ) : (
//                               <span className="w-4 h-4 mr-2 border border-gray-400 rounded-sm"></span>
//                             )}
//                             <span className="text-gray-700">{element.name}</span>
//                             <span className="text-gray-500 text-sm ml-2">- {element.description}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="p-4 text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}
//         </section>

//         {/* Industry Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaIndustry className="mr-3 text-green-500" />
//             Choose Your Industry
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {industriesData.map((industry) => (
//               <div
//                 key={industry.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                   ${selectedIndustry === industry.id
//                     ? 'border-green-500 bg-green-50 shadow-lg ring-4 ring-green-200'
//                     : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleIndustrySelect(industry.id)}
//               >
//                 {selectedIndustry === industry.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-green-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                   <FaIndustry className="mr-2 text-green-600" />
//                   {industry.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{industry.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Company Size Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaBuilding className="mr-3 text-purple-500" />
//             Define Company Size
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {companySizesData.map((size) => (
//               <div
//                 key={size.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center
//                   ${selectedCompanySize === size.id
//                     ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-200'
//                     : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleCompanySizeSelect(size.id)}
//               >
//                 {selectedCompanySize === size.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-purple-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {size.label}
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   {size.minEmployees}
//                   {size.maxEmployees ? ` - ${size.maxEmployees}` : '+'} Employees
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Summary and Call to Action */}
//         <div className="mt-16 pt-8 border-t-2 border-gray-100 flex flex-col items-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
//             Ready to Explore Your Ideal ERP?
//           </h2>
//           <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
//             Based on your selections, we can now provide more tailored recommendations.
//           </p>
//           <button
//             onClick={handleSubmit}
//             className="flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
//             disabled={selectedElements.length === 0 || !selectedIndustry || !selectedCompanySize}
//           >
//             Get My Tailored ERP Insights <FaArrowRight className="ml-3 text-2xl" />
//           </button>
//           <p className="text-sm text-gray-500 mt-4">
//             (Please select at least one ERP element, an industry, and a company size to proceed)
//           </p>
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       {/* Mobile: Fixed, slides in/out. Desktop: Static, always visible. */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-80 p-6 shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto
//           ${isRightBarOpen ? 'translate-x-0' : 'translate-x-full'}
//           md:translate-x-0 md:static md:w-96 md:ml-8 md:bg-white md:text-gray-900 md:shadow-none md:p-10`}
//       >
//         <div className="flex justify-between items-center mb-6 md:hidden"> {/* Close button for mobile */}
//           <h2 className="text-2xl font-bold">Your Selections</h2>
//           <button onClick={() => setIsRightBarOpen(false)} className="text-gray-300 hover:text-white">
//             <FaTimes className="text-2xl" />
//           </button>
//         </div>
//         <div className="md:block"> {/* Content visible on desktop and when sidebar is open on mobile */}
//           <h2 className="text-2xl font-bold mb-6 md:text-gray-800">Your Selections & Policies</h2>

//           <div className="space-y-6">
//             {/* Selected ERP Elements */}
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-3 flex items-center">
//                 <FaTools className="mr-2" /> Selected ERP Elements:
//               </h3>
//               {selectedERPElementDetails.length > 0 ? (
//                 <ul className="list-none space-y-3">
//                   {selectedERPElementDetails.map((element) => (
//                     <li key={element.id} className="bg-gray-700 md:bg-blue-50 p-3 rounded-md shadow-sm">
//                       <div className="flex items-center text-blue-100 md:text-blue-800 font-medium mb-1">
//                         <FaCheckCircle className="text-green-400 md:text-green-600 mr-2 text-sm" />
//                         {element.name}
//                       </div>
//                       <p className="text-gray-300 md:text-gray-700 text-sm">{element.description}</p>
//                       {element.policy && (
//                         <p className="text-gray-800 md:text-gray-600 text-xs mt-1 flex items-start">
//                           <FaInfoCircle className="mr-1 mt-0.5 text-blue-200 md:text-blue-500 flex-shrink-0" />
//                           <span className="font-semibold mr-1">Policy:</span> {element.policy}
//                         </p>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-800 md:text-gray-500 italic">No ERP elements selected.</p>
//               )}
//             </div>

//             {/* Selected Industry */}
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-3 flex items-center">
//                 <FaIndustry className="mr-2" /> Selected Industry:
//               </h3>
//               {selectedIndustryDetail ? (
//                 <div className="bg-gray-700 md:bg-green-50 p-3 rounded-md shadow-sm">
//                   <div className="flex items-center text-blue-100 md:text-green-800 font-medium mb-1">
//                     <FaIndustry className="text-green-400 md:text-green-600 mr-2 text-sm" />
//                     {selectedIndustryDetail.name}
//                   </div>
//                   <p className="text-gray-300 md:text-gray-700 text-sm">{selectedIndustryDetail.description}</p>
//                   {selectedIndustryDetail.policy && (
//                     <p className="text-gray-800 md:text-gray-600 text-xs mt-1 flex items-start">
//                       <FaInfoCircle className="mr-1 mt-0.5 text-blue-200 md:text-blue-500 flex-shrink-0" />
//                       <span className="font-semibold mr-1">Policy:</span> {selectedIndustryDetail.policy}
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-gray-800 md:text-gray-500 italic">No industry selected.</p>
//               )}
//             </div>

//             {/* Selected Company Size */}
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-3 flex items-center">
//                 <FaBuilding className="mr-2" /> Selected Company Size:
//               </h3>
//               {selectedCompanySizeDetail ? (
//                 <div className="bg-gray-700 md:bg-purple-50 p-3 rounded-md shadow-sm">
//                   <div className="flex items-center text-blue-100 md:text-purple-800 font-medium mb-1">
//                     <FaBuilding className="text-purple-400 md:text-purple-600 mr-2 text-sm" />
//                     {selectedCompanySizeDetail.label}
//                   </div>
//                   <p className="text-gray-300 md:text-gray-700 text-sm">
//                     {selectedCompanySizeDetail.minEmployees}
//                     {selectedCompanySizeDetail.maxEmployees ? ` - ${selectedCompanySizeDetail.maxEmployees}` : '+'} Employees
//                   </p>
//                   {selectedCompanySizeDetail.policy && (
//                     <p className="text-gray-800 md:text-gray-600 text-xs mt-1 flex items-start">
//                       <FaInfoCircle className="mr-1 mt-0.5 text-blue-200 md:text-blue-500 flex-shrink-0" />
//                       <span className="font-semibold mr-1">Policy:</span> {selectedCompanySizeDetail.policy}
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-gray-800 md:text-gray-500 italic">No company size selected.</p>
//               )}
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md transition-colors duration-300 md:bg-indigo-600 md:hover:bg-indigo-700"
//               disabled={selectedElements.length === 0 || !selectedIndustry || !selectedCompanySize}
//             >
//               Confirm Selection <FaArrowRight className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Custom Submission Message Modal */}
//       {showSubmissionMessage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-8 shadow-xl max-w-md w-full text-center relative">
//             <button
//               onClick={() => setShowSubmissionMessage(false)}
//               className="absolute top-3 right-3 text-gray-800 hover:text-gray-600 text-2xl"
//             >
//               <FaTimes />
//             </button>
//             <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">Submission Confirmed!</h2>
//             <p className="text-gray-700 mb-6">
//               Your ERP selections have been registered. Here's a summary:
//             </p>
//             <div className="text-left bg-gray-50 p-4 rounded-md mb-6 border border-gray-200 text-sm text-gray-800 max-h-48 overflow-y-auto">
//                 <p className="font-semibold mb-2 text-base">ERP Elements:</p>
//                 <ul className="list-disc list-inside ml-4">
//                     {selectedERPElementDetails.length > 0 ? (
//                         selectedERPElementDetails.map((el) => <li key={el.id}>{el.name}</li>)
//                     ) : (
//                         <li>None</li>
//                     )}
//                 </ul>
//                 <p className="font-semibold mt-3 mb-1 text-base">Industry:</p>
//                 <p className="ml-4">{selectedIndustryDetail?.name || 'Not Selected'}</p>
//                 <p className="font-semibold mt-3 mb-1 text-base">Company Size:</p>
//                 <p className="ml-4">{selectedCompanySizeDetail?.label || 'Not Selected'}</p>
//             </div>
//             <p className="text-sm text-gray-600 italic">
//               (This is a simulated submission. In a real application, this data would be processed by a backend service.)
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper function to get specific icons for ERP categories
// const getERPCategoryIcon = (category: string) => {
//   switch (category) {
//     case 'Finance':
//       return <FaTools className="mr-2 text-yellow-500" />;
//     case 'HR':
//       return <FaBuilding className="mr-2 text-red-500" />;
//     case 'Supply Chain':
//       return <FaArrowRight className="mr-2 text-green-500" />;
//     case 'Sales & Marketing':
//       return <FaSearch className="mr-2 text-pink-500" />;
//     case 'Manufacturing':
//       return <FaIndustry className="mr-2 text-orange-500" />;
//     case 'Logistics':
//       return <FaFilter className="mr-2 text-teal-500" />;
//     case 'Operations':
//       return <FaCheckCircle className="mr-2 text-indigo-500" />;
//     case 'Analytics':
//       return <FaTools className="mr-2 text-gray-500" />;
//     default:
//       return <FaTools className="mr-2 text-gray-500" />;
//   }
// };

// export default ERPExplorer;


// import React, { useState } from 'react';
// import {
//   FaIndustry,
//   FaBuilding,
//   FaTools,
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaFilter,
//   FaArrowRight,
//   FaList,
//   FaThLarge,
//   FaSitemap,
//   FaBars,
//   FaTimes,
//   FaChevronDown,
//   FaChevronRight,
//   FaInfoCircle,
//   FaDollarSign,
//   FaUsers,
//   FaClipboardList,
//   FaShoppingCart,
//   FaCogs,
//   FaChartLine,
//   FaBoxes,
//   FaProjectDiagram,
//   FaLightbulb, // For general operations/innovation
//   FaFileContract, // For compliance/policy
// } from 'react-icons/fa';

// interface ERPElement {
//   id: string;
//   name: string;
//   description: string;
//   category: string; // e.g., 'Finance', 'HR', 'Supply Chain'
//   policy?: string; // Added policy field
// }

// interface Industry {
//   id: string;
//   name: string;
//   description: string;
//   policy?: string; // Added policy field
// }

// interface CompanySize {
//   id: string;
//   label: string;
//   minEmployees: number;
//   maxEmployees: number | null; // null for '5000+'
//   policy?: string; // Added policy field
// }

// const erpElementsData: ERPElement[] = [
//   { id: 'erp-1', name: 'Financial Management', description: 'Manages all financial transactions, accounting, budgeting, and reporting.', category: 'Finance', policy: 'Ensures compliance with IFRS/GAAP standards. Provides real-time financial insights and automated reporting for robust decision-making and regulatory adherence.' },
//   { id: 'erp-2', name: 'Human Resources (HR)', description: 'Handles employee data, payroll, recruitment, training, and performance management.', category: 'HR', policy: 'Streamlines HR processes, from onboarding to offboarding. Guarantees data privacy and compliance with labor laws. Enhances employee experience through self-service portals.' },
//   { id: 'erp-3', name: 'Supply Chain Management (SCM)', description: 'Optimizes the flow of goods and services, from raw materials to finished products.', category: 'Supply Chain', policy: 'Maximizes supply chain efficiency and transparency. Minimizes stockouts and optimizes inventory levels through predictive analytics. Enhances supplier collaboration and risk management.' },
//   { id: 'erp-4', name: 'Customer Relationship Management (CRM)', description: 'Manages customer interactions, sales, marketing, and customer service.', category: 'Sales & Marketing', policy: 'Builds stronger customer relationships through personalized interactions. Automates sales pipelines and marketing campaigns. Provides 360-degree customer view for improved service and retention.' },
//   { id: 'erp-5', name: 'Manufacturing Operations', description: 'Controls production processes, planning, scheduling, and quality control.', category: 'Manufacturing', policy: 'Optimizes production planning and resource allocation. Reduces manufacturing lead times and improves product quality through real-time monitoring and automation. Supports various manufacturing modes (discrete, process, lean).' },
//   { id: 'erp-6', name: 'Inventory Management', description: 'Tracks and controls goods from purchase to sale, including warehousing.', category: 'Logistics', policy: 'Achieves optimal inventory levels, reducing carrying costs and waste. Provides accurate stock visibility across multiple locations. Automates reordering and demand forecasting for streamlined operations.' },
//   { id: 'erp-7', name: 'Project Management', description: 'Plans, executes, and monitors projects, managing tasks, resources, and deadlines.', category: 'Operations', policy: 'Enables effective planning, execution, and monitoring of complex projects. Ensures timely delivery and budget adherence through robust task tracking, resource allocation, and progress reporting.' },
//   { id: 'erp-8', name: 'Business Intelligence (BI)', description: 'Analyzes data to provide insights for better decision-making.', category: 'Analytics', policy: 'Transforms raw data into actionable insights through interactive dashboards and reports. Supports data-driven decision-making across all business functions. Integrates with various data sources for comprehensive analysis.' },
//   { id: 'erp-9', name: 'Quality Management', description: 'Ensures products and services meet specified quality standards.', category: 'Manufacturing', policy: 'Establishes and maintains high-quality standards across all production stages. Facilitates quality control checks, defect tracking, and corrective actions. Supports compliance with industry-specific quality regulations.' },
//   { id: 'erp-10', name: 'Asset Management', description: 'Manages the lifecycle of physical assets, from acquisition to disposal.', category: 'Operations', policy: 'Maximizes asset utilization and extends asset lifespan through proactive maintenance scheduling and performance tracking. Reduces operational costs and improves capital expenditure planning. Ensures regulatory compliance for asset management.' },
// ];

// const industriesData: Industry[] = [
//   { id: 'ind-1', name: 'Manufacturing', description: 'Production of goods using labor, machines, tools, and chemical or biological processing or formulation.', policy: 'ERP solutions tailored for manufacturing focus on production planning, inventory optimization, quality control, and supply chain integration to improve efficiency and reduce costs.' },
//   { id: 'ind-2', name: 'Retail', description: 'Sale of goods to the public in relatively small quantities for use or consumption rather than for resale.', policy: 'For retail, ERP emphasizes point-of-sale integration, inventory management across multiple channels, customer loyalty programs, and demand forecasting to enhance customer experience and sales.' },
//   { id: 'ind-3', name: 'Healthcare', description: 'Maintenance or improvement of health via the prevention, diagnosis, treatment, amelioration, or cure of disease, illness, injury, and other physical and mental impairments in people.', policy: 'Healthcare ERPs focus on patient management, billing, compliance with healthcare regulations (e.g., HIPAA), resource scheduling, and supply chain for medical supplies.' },
//   { id: 'ind-4', name: 'Financial Services', description: 'Economic services provided by the finance industry, which encompasses a broad range of businesses that manage money.', policy: 'Financial services ERPs prioritize robust financial accounting, risk management, regulatory compliance (e.g., GDPR, Basel III), fraud detection, and customer account management.' },
//   { id: 'ind-5', name: 'Technology', description: 'Development, production, and distribution of technological goods and services.', policy: 'Technology sector ERPs are designed for agile project management, intellectual property tracking, contract management, R&D expense management, and subscription billing.' },
//   { id: 'ind-6', name: 'Construction', description: 'The process of constructing a building or infrastructure.', policy: 'Construction ERPs provide tools for project costing, equipment management, field service management, bid management, and compliance with construction safety regulations.' },
// ];

// const companySizesData: CompanySize[] = [
//   { id: 'size-1', label: '1-50 Employees (Small Business)', minEmployees: 1, maxEmployees: 50, policy: 'Small businesses benefit from agile ERPs that offer core financial, inventory, and sales features without excessive complexity, focusing on ease of use and rapid implementation.' },
//   { id: 'size-2', label: '51-500 Employees (Medium Business)', minEmployees: 51, maxEmployees: 500, policy: 'Medium businesses require scalable ERPs that can integrate more departments like HR and supply chain, offering robust reporting and customization to support growth.' },
//   { id: 'size-3', label: '501-5000 Employees (Large Enterprise)', minEmployees: 501, maxEmployees: 5000, policy: 'Large enterprises need comprehensive ERPs with extensive modules, advanced analytics, global capabilities, and strong integration frameworks to manage complex operations and diverse business units.' },
//   { id: 'size-4', label: '5000+ Employees (Global Corporation)', minEmployees: 5001, maxEmployees: null, policy: 'Global corporations demand highly specialized ERPs with multi-country, multi-currency, and multi-language support, advanced security, and performance at scale for geographically dispersed operations.' },
// ];

// type ViewMode = 'card' | 'list' | 'tree';

// // Helper function to get ERP category icons
// const getERPCategoryIcon = (category: string) => {
//   switch (category) {
//     case 'Finance':
//       return <FaDollarSign className="mr-2 text-blue-500" />;
//     case 'HR':
//       return <FaUsers className="mr-2 text-red-500" />;
//     case 'Supply Chain':
//       return <FaClipboardList className="mr-2 text-green-500" />;
//     case 'Sales & Marketing':
//       return <FaShoppingCart className="mr-2 text-purple-500" />;
//     case 'Manufacturing':
//       return <FaCogs className="mr-2 text-yellow-600" />;
//     case 'Logistics':
//       return <FaBoxes className="mr-2 text-indigo-500" />;
//     case 'Operations':
//       return <FaProjectDiagram className="mr-2 text-pink-500" />;
//     case 'Analytics':
//       return <FaChartLine className="mr-2 text-teal-500" />;
//     case 'Quality Management': // Specific icon for this if needed, otherwise falls to Cogs
//       return <FaCheckCircle className="mr-2 text-cyan-500" />;
//     default:
//       return <FaTools className="mr-2 text-gray-500" />;
//   }
// };

// const ERPExplorer: React.FC = () => {
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
//   const [selectedCompanySize, setSelectedCompanySize] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<ViewMode>('card');
//   const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false); // Start closed on mobile
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
//   const [showSubmissionMessage, setShowSubmissionMessage] = useState<boolean>(false); // For custom alert
//   const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false); // For filter dropdown

//   const toggleElement = (elementId: string) => {
//     setSelectedElements((prev) =>
//       prev.includes(elementId)
//         ? prev.filter((id) => id !== elementId)
//         : [...prev, elementId]
//     );
//     // Open the right sidebar when an item is selected
//     if (!isRightBarOpen) {
//       setIsRightBarOpen(true);
//     }
//   };

//   const handleIndustrySelect = (industryId: string) => {
//     setSelectedIndustry(industryId === selectedIndustry ? null : industryId);
//     if (!isRightBarOpen) {
//       setIsRightBarOpen(true);
//     }
//   };

//   const handleCompanySizeSelect = (sizeId: string) => {
//     setSelectedCompanySize(sizeId === selectedCompanySize ? null : sizeId);
//     if (!isRightBarOpen) {
//       setIsRightBarOpen(true);
//     }
//   };

//   const filteredERPElements = erpElementsData.filter((element) => {
//     const matchesSearch =
//       element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       element.category.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesSearch;
//   });

//   const handleSubmit = () => {
//     setShowSubmissionMessage(true);
//     // Optionally, clear selections after submission or navigate
//     // setSelectedElements([]);
//     // setSelectedIndustry(null);
//     // setSelectedCompanySize(null);
//   };

//   const toggleCategoryExpansion = (category: string) => {
//     setExpandedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   // Group ERP elements by category for tree view
//   const erpElementsByCategory = filteredERPElements.reduce((acc, element) => {
//     if (!acc[element.category]) {
//       acc[element.category] = [];
//     }
//     acc[element.category].push(element);
//     return acc;
//   }, {} as Record<string, ERPElement[]>);

//   // Get selected ERP element details for the sidebar
//   const selectedERPElementDetails = erpElementsData.filter((el) =>
//     selectedElements.includes(el.id)
//   );

//   // Get selected Industry details for the sidebar
//   const selectedIndustryDetail = industriesData.find(
//     (ind) => ind.id === selectedIndustry
//   );

//   // Get selected Company Size details for the sidebar
//   const selectedCompanySizeDetail = companySizesData.find(
//     (size) => size.id === selectedCompanySize
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans flex flex-col md:flex-row w-full overflow-hidden">
//       {/* Main Content Area */}
//       <div className="flex-1 max-w-7xl mx-auto bg-white shadow-2xl rounded-xl p-6 md:p-10 transform transition-all duration-500 hover:scale-[1.005] relative z-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 text-center tracking-tight leading-tight">
//           <FaTools className="inline-block mr-2 md:mr-4 text-blue-600" />
//           ERP Explorer: Tailor Your Solution
//         </h1>
//         <p className="text-md md:text-xl text-gray-600 mb-8 md:mb-12 text-center max-w-3xl mx-auto">
//           Discover the perfect ERP elements, industries, and company sizes to match your business needs.
//           Select the modules that empower your operations.
//         </p>

//         {/* Search Bar, Filter, and View Toggles */}
//         <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="relative w-full md:w-2/3 lg:w-1/2">
//             <input
//               type="text"
//               placeholder="Search ERP elements..."
//               className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg text-gray-800 transition-all duration-300 shadow-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl" />
//             <button
//               onClick={() => setShowFilterOptions(!showFilterOptions)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-xl cursor-pointer hover:text-blue-500 p-2 rounded-full hover:bg-gray-100"
//               title="Filter Options"
//             >
//               <FaFilter />
//             </button>
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setViewMode('card')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'card' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="Card View"
//             >
//               <FaThLarge className="text-xl" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="List View"
//             >
//               <FaList className="text-xl" />
//             </button>
//             <button
//               onClick={() => setViewMode('tree')}
//               className={`p-3 rounded-full transition-all duration-200 ${viewMode === 'tree' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               title="Tree View"
//             >
//               <FaSitemap className="text-xl" />
//             </button>
//           </div>
//           {/* Toggle button for right sidebar (mobile only) */}
//           <button
//             onClick={() => setIsRightBarOpen(!isRightBarOpen)}
//             className="p-3 rounded-full bg-blue-600 text-white shadow-lg md:hidden block"
//             title={isRightBarOpen ? "Close Sidebar" : "Open Sidebar"}
//           >
//             {isRightBarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//           </button>
//         </div>

//         {/* Filter Options Dropdown */}
//         {showFilterOptions && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8 md:mb-12 transition-all duration-300 ease-in-out">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//               <FaFilter className="mr-2 text-blue-500" /> Advanced Filters
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Filter by Industry */}
//               <div>
//                 <label htmlFor="industry-filter" className="block text-gray-700 text-sm font-bold mb-2">
//                   Filter by Industry:
//                 </label>
//                 <select
//                   id="industry-filter"
//                   className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                   value={selectedIndustry || ''}
//                   onChange={(e) => handleIndustrySelect(e.target.value || null)}
//                 >
//                   <option value="">All Industries</option>
//                   {industriesData.map((industry) => (
//                     <option key={industry.id} value={industry.id}>
//                       {industry.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Filter by Company Size */}
//               <div>
//                 <label htmlFor="company-size-filter" className="block text-gray-700 text-sm font-bold mb-2">
//                   Filter by Company Size:
//                 </label>
//                 <select
//                   id="company-size-filter"
//                   className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                   value={selectedCompanySize || ''}
//                   onChange={(e) => handleCompanySizeSelect(e.target.value || null)}
//                 >
//                   <option value="">All Company Sizes</option>
//                   {companySizesData.map((size) => (
//                     <option key={size.id} value={size.id}>
//                       {size.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedIndustry(null);
//                 setSelectedCompanySize(null);
//                 setShowFilterOptions(false); // Close filter options after resetting
//               }}
//               className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-md"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//         {/* ERP Elements Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaTools className="mr-3 text-blue-500" />
//             Select ERP Elements
//           </h2>

//           {viewMode === 'card' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredERPElements.map((element) => (
//                 <div
//                   key={element.id}
//                   className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                     ${selectedElements.includes(element.id)
//                       ? 'border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-200'
//                       : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
//                     }`}
//                   onClick={() => toggleElement(element.id)}
//                 >
//                   {selectedElements.includes(element.id) && (
//                     <FaCheckCircle className="absolute top-3 right-3 text-blue-600 text-2xl" />
//                   )}
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                     {getERPCategoryIcon(element.category)}
//                     {element.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm">{element.description}</p>
//                   <span className="mt-3 inline-block text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
//                     {element.category}
//                   </span>
//                 </div>
//               ))}
//               {filteredERPElements.length === 0 && (
//                 <p className="col-span-full text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}

//           {viewMode === 'list' && (
//             <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
//               {filteredERPElements.map((element) => (
//                 <div
//                   key={element.id}
//                   className={`flex items-center justify-between p-4 cursor-pointer transition-colors duration-200
//                     ${selectedElements.includes(element.id)
//                       ? 'bg-blue-50 border-l-4 border-blue-500'
//                       : 'hover:bg-gray-50'
//                     }`}
//                   onClick={() => toggleElement(element.id)}
//                 >
//                   <div className="flex items-center">
//                     {getERPCategoryIcon(element.category)}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">{element.name}</h3>
//                       <p className="text-gray-600 text-sm">{element.description}</p>
//                       <span className="inline-block text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full mt-1">
//                         {element.category}
//                       </span>
//                     </div>
//                   </div>
//                   {selectedElements.includes(element.id) && (
//                     <FaCheckCircle className="text-blue-600 text-xl ml-4" />
//                   )}
//                 </div>
//               ))}
//               {filteredERPElements.length === 0 && (
//                 <p className="p-4 text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}

//           {viewMode === 'tree' && (
//             <div className="border border-gray-200 rounded-lg p-4 bg-white">
//               {Object.keys(erpElementsByCategory).length > 0 ? (
//                 Object.entries(erpElementsByCategory).map(([category, elements]) => (
//                   <div key={category} className="mb-4">
//                     <div
//                       className="flex items-center cursor-pointer mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors py-2"
//                       onClick={() => toggleCategoryExpansion(category)}
//                     >
//                       {expandedCategories.includes(category) ? (
//                         <FaChevronDown className="mr-2 text-blue-500" />
//                       ) : (
//                         <FaChevronRight className="mr-2 text-blue-500" />
//                       )}
//                       {getERPCategoryIcon(category)} {/* Icon for category in tree */}
//                       {category} ({elements.length})
//                     </div>
//                     {expandedCategories.includes(category) && (
//                       <ul className="ml-8 border-l-2 border-gray-200 pl-4 space-y-2">
//                         {elements.map((element) => (
//                           <li
//                             key={element.id}
//                             className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors duration-200
//                               ${selectedElements.includes(element.id)
//                                 ? 'bg-blue-50 text-blue-800'
//                                 : 'hover:bg-gray-50'
//                               }`}
//                             onClick={() => toggleElement(element.id)}
//                           >
//                             {selectedElements.includes(element.id) ? (
//                               <FaCheckCircle className="text-blue-600 mr-2 flex-shrink-0" />
//                             ) : (
//                               <span className="w-4 h-4 mr-2 border border-gray-400 rounded-sm flex-shrink-0"></span>
//                             )}
//                             <span className="text-gray-700 font-medium">{element.name}</span>
//                             <span className="text-gray-500 text-sm ml-2">- {element.description}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="p-4 text-center text-gray-500 text-lg">No ERP elements match your search.</p>
//               )}
//             </div>
//           )}
//         </section>

//         {/* Industry Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaIndustry className="mr-3 text-green-500" />
//             Choose Your Industry
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {industriesData.map((industry) => (
//               <div
//                 key={industry.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300
//                   ${selectedIndustry === industry.id
//                     ? 'border-green-500 bg-green-50 shadow-lg ring-4 ring-green-200'
//                     : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleIndustrySelect(industry.id)}
//               >
//                 {selectedIndustry === industry.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-green-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                   <FaIndustry className="mr-2 text-green-600" />
//                   {industry.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{industry.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Company Size Selection */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//             <FaBuilding className="mr-3 text-purple-500" />
//             Define Company Size
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {companySizesData.map((size) => (
//               <div
//                 key={size.id}
//                 className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center
//                   ${selectedCompanySize === size.id
//                     ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-200'
//                     : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
//                   }`}
//                 onClick={() => handleCompanySizeSelect(size.id)}
//               >
//                 {selectedCompanySize === size.id && (
//                   <FaCheckCircle className="absolute top-3 right-3 text-purple-600 text-2xl" />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {size.label}
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   {size.minEmployees}
//                   {size.maxEmployees ? ` - ${size.maxEmployees}` : '+'} Employees
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Summary and Call to Action */}
//         <div className="mt-16 pt-8 border-t-2 border-gray-100 flex flex-col items-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
//             Ready to Explore Your Ideal ERP?
//           </h2>
//           <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
//             Based on your selections, we can now provide more tailored recommendations.
//           </p>
//           <button
//             onClick={handleSubmit}
//             className="flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
//             disabled={selectedElements.length === 0 || !selectedIndustry || !selectedCompanySize}
//           >
//             Get My Tailored ERP Insights <FaArrowRight className="ml-3 text-2xl" />
//           </button>
//           <p className="text-sm text-gray-500 mt-4">
//             (Please select at least one ERP element, an industry, and a company size to proceed)
//           </p>
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-80 p-6 shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto
//           ${isRightBarOpen ? 'translate-x-0' : 'translate-x-full'}
//           md:translate-x-0 md:static md:w-96 md:ml-8 md:bg-white md:text-gray-900 md:shadow-none md:p-10`}
//       >
//         <div className="flex justify-between items-center mb-6 md:hidden"> {/* Close button for mobile */}
//           <h2 className="text-2xl font-bold">Your Selections</h2>
//           <button onClick={() => setIsRightBarOpen(false)} className="text-gray-300 hover:text-white">
//             <FaTimes className="text-2xl" />
//           </button>
//         </div>
//         <div className="md:block"> {/* Content visible on desktop and when sidebar is open on mobile */}
//           <h2 className="text-3xl font-bold mb-6 text-gray-100 md:text-gray-800 flex items-center">
//             <FaShoppingCart className="mr-3 text-blue-300 md:text-blue-600" /> Your ERP Panier
//           </h2>

//           <div className="space-y-8">
//             {/* Selected ERP Elements */}
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-3 flex items-center">
//                 <FaTools className="mr-2" /> Selected ERP Elements:
//               </h3>
//               {selectedERPElementDetails.length > 0 ? (
//                 <ul className="list-none space-y-3">
//                   {selectedERPElementDetails.map((element) => (
//                     <li key={element.id} className="bg-gray-700 md:bg-blue-50 p-3 rounded-md shadow-sm border border-transparent hover:border-blue-300 transition-all">
//                       <div className="flex items-center text-blue-100 md:text-blue-800 font-medium mb-1">
//                         {getERPCategoryIcon(element.category)} {/* Icon next to element name */}
//                         {element.name}
//                       </div>
//                       <p className="text-gray-300 md:text-gray-700 text-sm">{element.description}</p>
//                       {element.policy && (
//                         <p className="text-gray-800 md:text-gray-600 text-xs mt-1 flex items-start">
//                           <FaFileContract className="mr-1 mt-0.5 text-blue-200 md:text-blue-500 flex-shrink-0" />
//                           <span className="font-semibold mr-1">Policy:</span> {element.policy}
//                         </p>
//                       )}
//                       <button
//                         onClick={() => toggleElement(element.id)}
//                         className="mt-2 text-red-400 md:text-red-600 hover:text-red-500 md:hover:text-red-700 text-sm flex items-center"
//                       >
//                         <FaTimesCircle className="mr-1" /> Remove
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-800 md:text-gray-500 italic">No ERP elements selected yet.</p>
//               )}
//             </div>

//             {/* Selected Industry */}
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-3 flex items-center">
//                 <FaIndustry className="mr-2" /> Selected Industry:
//               </h3>
//               {selectedIndustryDetail ? (
//                 <div className="bg-gray-700 md:bg-green-50 p-3 rounded-md shadow-sm border border-transparent hover:border-green-300 transition-all">
//                   <div className="flex items-center text-blue-100 md:text-green-800 font-medium mb-1">
//                     <FaIndustry className="text-green-400 md:text-green-600 mr-2 text-sm" />
//                     {selectedIndustryDetail.name}
//                   </div>
//                   <p className="text-gray-300 md:text-gray-700 text-sm">{selectedIndustryDetail.description}</p>
//                   {selectedIndustryDetail.policy && (
//                     <p className="text-gray-800 md:text-gray-600 text-xs mt-1 flex items-start">
//                       <FaFileContract className="mr-1 mt-0.5 text-blue-200 md:text-blue-500 flex-shrink-0" />
//                       <span className="font-semibold mr-1">Policy:</span> {selectedIndustryDetail.policy}
//                     </p>
//                   )}
//                   <button
//                     onClick={() => handleIndustrySelect(selectedIndustryDetail.id)}
//                     className="mt-2 text-red-400 md:text-red-600 hover:text-red-500 md:hover:text-red-700 text-sm flex items-center"
//                   >
//                     <FaTimesCircle className="mr-1" /> Change
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-gray-800 md:text-gray-500 italic">No industry selected yet.</p>
//               )}
//             </div>

//             {/* Selected Company Size */}
//             <div>
//               <h3 className="text-lg font-semibold text-blue-300 md:text-blue-600 mb-3 flex items-center">
//                 <FaBuilding className="mr-2" /> Selected Company Size:
//               </h3>
//               {selectedCompanySizeDetail ? (
//                 <div className="bg-gray-700 md:bg-purple-50 p-3 rounded-md shadow-sm border border-transparent hover:border-purple-300 transition-all">
//                   <div className="flex items-center text-blue-100 md:text-purple-800 font-medium mb-1">
//                     <FaBuilding className="text-purple-400 md:text-purple-600 mr-2 text-sm" />
//                     {selectedCompanySizeDetail.label}
//                   </div>
//                   <p className="text-gray-300 md:text-gray-700 text-sm">
//                     {selectedCompanySizeDetail.minEmployees}
//                     {selectedCompanySizeDetail.maxEmployees ? ` - ${selectedCompanySizeDetail.maxEmployees}` : '+'} Employees
//                   </p>
//                   {selectedCompanySizeDetail.policy && (
//                     <p className="text-gray-800 md:text-gray-600 text-xs mt-1 flex items-start">
//                       <FaFileContract className="mr-1 mt-0.5 text-blue-200 md:text-blue-500 flex-shrink-0" />
//                       <span className="font-semibold mr-1">Policy:</span> {selectedCompanySizeDetail.policy}
//                     </p>
//                   )}
//                   <button
//                     onClick={() => handleCompanySizeSelect(selectedCompanySizeDetail.id)}
//                     className="mt-2 text-red-400 md:text-red-600 hover:text-red-500 md:hover:text-red-700 text-sm flex items-center"
//                   >
//                     <FaTimesCircle className="mr-1" /> Change
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-gray-800 md:text-gray-500 italic">No company size selected yet.</p>
//               )}
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md transition-colors duration-300 md:bg-indigo-600 md:hover:bg-indigo-700"
//               disabled={selectedElements.length === 0 || !selectedIndustry || !selectedCompanySize}
//             >
//               Confirm Selection <FaArrowRight className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Custom Submission Message Modal */}
//       {showSubmissionMessage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
//           <div className="bg-white rounded-lg p-8 shadow-xl max-w-md w-full text-center relative animate-scaleUp">
//             <button
//               onClick={() => setShowSubmissionMessage(false)}
//               className="absolute top-3 right-3 text-gray-800 hover:text-gray-600 text-2xl"
//               title="Close"
//             >
//               <FaTimes />
//             </button>
//             <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounceIn" />
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">Submission Confirmed!</h2>
//             <p className="text-gray-700 mb-6">
//               Your ERP selections have been registered. Here's a summary:
//             </p>
//             <div className="text-left bg-gray-50 p-4 rounded-md mb-6 border border-gray-200 text-sm text-gray-800 max-h-48 overflow-y-auto">
//               <p className="font-semibold mb-2 text-base flex items-center"><FaTools className="mr-2 text-blue-500" />ERP Elements:</p>
//               <ul className="list-disc list-inside ml-4">
//                 {selectedERPElementDetails.length > 0 ? (
//                   selectedERPElementDetails.map((el) => <li key={el.id}>{el.name}</li>)
//                 ) : (
//                   <li>None selected</li>
//                 )}
//               </ul>
//               <p className="font-semibold mt-3 mb-1 text-base flex items-center"><FaIndustry className="mr-2 text-green-500" />Industry:</p>
//               <p className="ml-4">{selectedIndustryDetail?.name || 'Not Selected'}</p>
//               <p className="font-semibold mt-3 mb-1 text-base flex items-center"><FaBuilding className="mr-2 text-purple-500" />Company Size:</p>
//               <p className="ml-4">{selectedCompanySizeDetail?.label || 'Not Selected'}</p>
//             </div>
//             <button
//               onClick={() => setShowSubmissionMessage(false)}
//               className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
//             >
//               Got It!
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ERPExplorer;

// import { useState, useCallback, useMemo } from "react";
// // Removed direct import from 'react-icons/fi' and replaced with inline SVG components
// // This ensures the code is self-contained and avoids external dependency resolution issues.

// // Inline SVG components for react-icons/fi replacements
// // These components mimic the behavior of react-icons by rendering SVG directly.
// const FiRefreshCw = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.5 7h19a2 2 0 0 1 0 4H1"></path><path d="M20.5 17H1a2 2 0 0 1 0-4h22"></path></svg>;
// const FiChevronRight = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>;
// const FiChevronDown = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
// const FiGrid = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
// const FiShoppingCart = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
// const FiDollarSign = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
// const FiX = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
// const FiPackage = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
// const FiLayers = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
// const FiSearch = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
// const FiInfo = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
// const FiBookmark = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;
// const FiBriefcase = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
// const FiGlobe = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
// const FiTrendingUp = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
// const FiBox = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.52a2 2 0 0 1-1.11 1.79l-8 4A2 2 0 0 1 12 22a2 2 0 0 1-.89-.22l-8-4A2 2 0 0 1 2 16.76V7.24a2 2 0 0 1 1.11-1.79l8-4A2 2 0 0 1 12 2zm0 1.95l-8 4-1.11.55V15.5L12 18l8-4v-9.52l-1.11-.55-8-4z"></path><polyline points="2.9 7 12 12 21.1 7"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
// const FiActivity = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
// const FiTarget = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
// const FiMapPin = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
// const FiCpu = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line></svg>;
// const FiList = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
// const FiPlus = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
// const FiCheckCircle = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-8.15"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
// const FiStar = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
// const FiFilter = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 9 12.46 9 19 15 22 15 12.46 22 3"></polygon></svg>;
// const FiCreditCard = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
// const FiShoppingBag = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
// const FiSettings = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82-.33H9a1.65 1.65 0 0 0 1.51-1V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09z"></path></svg>;
// const FiHardDrive = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>;
// const FiDatabase = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M21 19c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
// const FiEdit3 = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
// const FiZap = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
// const FiBarChart = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
// const FiCloud = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>;
// const FiUsers = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
// const FiTruck = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 3h15v16H1V3z"></path><path d="M16 8h4l3 3v5h-7V8z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
// const FiCompass = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>;
// const FiCar = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 12H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"></path><polyline points="7 12 9 7 15 7 17 12"></polyline><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>;
// const FiTool = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"></path></svg>;
// const FiHeart = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
// const FiMonitor = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
// const FiShield = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
// const FiBookOpen = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
// const FiFilm = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>;
// const FiWind = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 20 12H2"></path></svg>;
// const FiCodesandbox = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="16.5 19.79 16.5 14.6 21 12"></polyline><polyline points="12 12 12 22"></polyline><line x1="12" y1="12" x2="20.73" y2="6.96"></line><line x1="12" y1="12" x2="3.27" y2="6.96"></line></svg>;
// const FiAperture = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><path d="M14.31 8L20.05 17.94M9.69 8h4.62L12 22V8z"></path><path d="M2.05 17.94L7.79 8h7.33L21.95 17.94H2.05z"></path></svg>;
// const FiMail = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
// const FiFlag = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>;
// const FiHome = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
// const FiMinimize2 = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>;
// const FiMaximize2 = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>;
// const FiAlignJustify = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

// // CgMenuGridR is not used in the current version of the code, so it's not replaced.
// // If it were used, its SVG would need to be inlined similar to the Fi icons.


// // Define types for better type checking and readability
// type ItemIcon = React.ReactNode;

// type ProductItem = {
//   id: string;
//   label: string;
//   icon?: ItemIcon;
//   color?: string;
//   type: "product";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type SubCategory = {
//   id: string;
//   label: string;
//   type: "subcategory";
//   products?: ProductItem[];
//   icon?: ItemIcon; // Added icon for subcategories
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   type: "category";
//   subcategories?: SubCategory[];
//   description?: string;
//   icon?: ItemIcon; // Added icon for categories
// };

// type FilterableItem = {
//   id: string;
//   label: string;
//   icon?: ItemIcon;
//   color?: string;
//   type: "industry" | "companySize";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type CombinedDataItem = CategoryItem | FilterableItem | ProductItem | SubCategory;


// // Data (Extended with more specific icons)
// const allData: CombinedDataItem[] = [
//   // Portfolio Categories
//   { id: "excellence", label: "Excellencia S/Excellencia Cloud", type: "category", icon: <FiCloud />, description: "Our flagship cloud offerings for comprehensive business solutions, designed for unparalleled performance and scalability." },
//   {
//     id: "ai", label: "Artificial Intelligence", info: true, type: "category", icon: <FiCpu />,
//     description: "Leverage cutting-edge AI to transform your business operations, unlock deep insights, and automate complex tasks with intelligent systems.",
//     subcategories: [
//       {
//         id: "ai_platform", label: "AI Platform Services", type: "subcategory", icon: <FiHardDrive />,
//         products: [
//           { id: "ai_core", label: "AI Core Engine", type: "product", icon: <FiSettings />, description: "The foundational AI engine for developing and deploying sophisticated machine learning models, offering robust computational power." },
//           { id: "data_intelligence", label: "Data Intelligence Hub", type: "product", icon: <FiDatabase />, description: "A centralized hub for advanced data processing, real-time analysis, and predictive modeling, enabling smart, data-driven decisions." }
//         ]
//       },
//       {
//         id: "ml_solutions", label: "Machine Learning Solutions", type: "subcategory", icon: <FiTrendingUp />,
//         products: [
//           { id: "predictive_analytics", label: "Predictive Analytics Suite", type: "product", icon: <FiBarChart />, description: "Powerful tools for forecasting future trends, identifying opportunities, and mitigating risks across various business domains." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     type: "category",
//     icon: <FiPackage />,
//     description: "Innovate and integrate with our robust Business Technology Platform, providing a foundation for agile development and intelligent enterprise.",
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         type: "subcategory",
//         icon: <FiEdit3 />,
//         products: [
//           { id: "app_studio", label: "Excellencia App Studio", type: "product", icon: <FiCodesandbox />, description: "A comprehensive low-code/no-code platform for rapid application development and deployment, empowering citizen developers and IT." },
//           { id: "process_automation", label: "Process Automation Suite", type: "product", icon: <FiZap />, description: "Automate business processes end-to-end for increased efficiency, reduced manual effort, and improved operational agility." },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         type: "subcategory",
//         icon: <FiDatabase />,
//         products: [
//           { id: "data_warehouse", label: "Excellencia Data Warehouse Cloud", type: "product", icon: <FiHardDrive />, description: "Scalable cloud-based data warehousing solution for all your data needs, offering high performance and flexibility for analytics." },
//           { id: "analytics_cloud", label: "Excellencia Analytics Cloud", type: "product", icon: <FiBarChart />, description: "Integrated business intelligence, planning, and predictive analytics in the cloud, enabling informed decisions and strategic foresight." },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         type: "subcategory",
//         icon: <FiCloud />,
//         products: [
//           { id: "data_migration", label: "Excellencia Advanced Data Migration and Management by Syniti", type: "product", icon: <FiRefreshCw />, description: "Robust data migration and management tools ensuring data quality, consistency, and seamless transfer across systems." },
//           { id: "ariba_integration", label: "Ariba Cloud Integration", type: "product", icon: <FiShoppingCart />, description: "Seamless integration capabilities with Ariba cloud services for optimized procurement processes and enhanced supplier collaboration." },
//           { id: "integration_suite", label: "Excellencia Integration Suite", type: "product", icon: <FiLayers />, description: "A comprehensive suite for enterprise integration, connecting diverse applications and processes across your IT landscape." },
//         ],
//       },
//     ],
//   },
//   {
//     id: "crm", label: "CRM and Customer Experience", info: true, type: "category", icon: <FiUsers />,
//     description: "Optimize customer interactions and enhance their overall experience, building lasting relationships and driving loyalty.",
//     subcategories: [
//       { id: "sales_cloud", label: "Sales Cloud", type: "subcategory", icon: <FiDollarSign />, products: [{ id: "crm_sales", label: "CRM Sales Automation", type: "product", icon: <FiTrendingUp />, description: "Automate sales processes, manage leads, and foster strong customer relationships with a powerful sales force automation solution." }] },
//       { id: "service_cloud", label: "Service Cloud", type: "subcategory", icon: <FiInfo />, products: [{ id: "crm_service", label: "CRM Service Management", type: "product", icon: <FiWind />, description: "Deliver exceptional customer service and support operations with intelligent service management tools and omnichannel capabilities." }] },
//     ]
//   },
//   {
//     id: "erp", label: "Enterprise Resource Planning", info: true, type: "category", icon: <FiBriefcase />,
//     description: "Streamline your core business processes with our comprehensive ERP solutions, integrating finance, logistics, and more for efficiency.",
//     subcategories: [
//       { id: "s4hana", label: "S/4HANA", type: "subcategory", icon: <FiActivity />, products: [{ id: "erp_core", label: "ERP Core Functions", type: "product", icon: <FiGrid />, description: "Next-generation ERP functionalities for finance, logistics, manufacturing, and more, leveraging in-memory computing for real-time insights." }] }
//     ]
//   },
//   {
//     id: "finance", label: "Financial Management", info: true, type: "category", icon: <FiDollarSign />,
//     description: "Gain real-time financial insights and streamline your financial operations, ensuring compliance and strategic financial planning.",
//     subcategories: [
//       { id: "financial_planning", label: "Financial Planning", type: "subcategory", icon: <FiWind />, products: [{ id: "fp_suite", label: "Financial Planning Suite", type: "product", icon: <FiBarChart />, description: "Tools for budgeting, forecasting, and in-depth financial analysis to drive performance and achieve financial goals." }] }
//     ]
//   },
//   {
//     id: "hcm", label: "Human Capital Management", info: true, type: "category", icon: <FiUsers />,
//     description: "Manage your workforce effectively from hire to retire, optimizing talent management and employee experience.",
//     subcategories: [
//       { id: "successfactors", label: "SuccessFactors", type: "subcategory", icon: <FiUsers />, products: [{ id: "hcm_suite", label: "HCM Suite", type: "product", icon: <FiWind />, description: "Comprehensive human capital management solutions covering HR, payroll, talent management, and employee engagement." }] }
//     ]
//   },
//   {
//     id: "spend", label: "Spend Management", info: true, type: "category", icon: <FiCreditCard />,
//     description: "Optimize spending, enhance compliance, and drive savings across your organization with integrated spend management solutions.",
//     subcategories: [
//       { id: "concur", label: "Concur", type: "subcategory", icon: <FiTruck />, products: [{ id: "travel_expense", label: "Travel & Expense Management", type: "product", icon: <FiBriefcase />, description: "Automate travel and expense reporting for greater control, visibility, and compliance." }] }
//     ]
//   },
//   {
//     id: "scm", label: "Supply Chain Management", info: true, type: "category", icon: <FiPackage />,
//     description: "Transform your supply chain for resilience, efficiency, and sustainability, from planning to logistics.",
//     subcategories: [
//       { id: "ariba", label: "Ariba", type: "subcategory", icon: <FiShoppingBag />, products: [{ id: "procurement_suite", label: "Procurement Suite", type: "product", icon: <FiDollarSign />, description: "Streamline procurement and supplier management processes for better collaboration and cost control." }] }
//     ]
//   },

//   // Industries
//   {
//     id: "aerospace", label: "Aerospace and Defense", icon: <FiCompass />, color: "bg-blue-600", type: "industry", description: "Solutions tailored for the unique demands of the aerospace and defense sectors, ensuring precision and reliability.",
//     details: [
//       { label: "Focus Areas", value: "Complex Manufacturing, Global Logistics, Regulatory Compliance, Project Management" },
//       { label: "Key Benefits", value: "Enhanced operational efficiency, Improved supply chain visibility, Accelerated innovation cycles, Risk mitigation" }
//     ]
//   },
//   {
//     id: "automotive", label: "Automotive", icon: <FiCar />, color: "bg-red-600", type: "industry", description: "Drive innovation and efficiency across the automotive value chain, from design to after-sales service.",
//     details: [
//       { label: "Focus Areas", value: "Vehicle Production, R&D, Sales & Service, Supplier Collaboration" },
//       { label: "Key Benefits", value: "Accelerated time-to-market, Enhanced customer satisfaction, Optimized production processes" }
//     ]
//   },
//   {
//     id: "banking", label: "Banking", icon: <FiDollarSign />, color: "bg-green-600", type: "industry", description: "Secure and intelligent financial solutions for banking institutions, enabling digital transformation and customer-centricity.",
//     details: [
//       { label: "Focus Areas", value: "Digital Banking, Risk Management, Core Banking Transformation, Customer Engagement" },
//       { label: "Key Benefits", value: "Enhanced security and compliance, Improved customer experience, Operational efficiency, Fraud prevention" }
//     ]
//   },
//   {
//     id: "chemicals", label: "Chemicals", icon: <FiBox />, color: "bg-purple-600", type: "industry", description: "Specialized management systems for chemical industries, focusing on safety, compliance, and sustainable operations.",
//     details: [
//       { label: "Focus Areas", value: "Batch Production, Supply Chain Optimization, Environmental Health & Safety (EHS)" },
//       { label: "Key Benefits", value: "Optimized resource utilization, Strict regulatory compliance, Improved plant safety" }
//     ]
//   },
//   {
//     id: "consumer", label: "Consumer Products", icon: <FiShoppingCart />, color: "bg-yellow-600", type: "industry", description: "Solutions designed for consumer goods manufacturers to meet evolving customer demands and optimize market presence.",
//     details: [
//       { label: "Focus Areas", value: "Demand Planning, Brand Management, Retail Execution, E-commerce Integration" },
//       { label: "Key Benefits", value: "Faster time-to-market, Increased sales and brand loyalty, Efficient inventory management" }
//     ]
//   },
//   {
//     id: "defense", label: "Defense and Security", icon: <FiShield />, color: "bg-indigo-600", type: "industry", description: "Mission-critical software for defense and security organizations, ensuring readiness and operational excellence.",
//     details: [
//       { label: "Focus Areas", value: "Asset Management, Project Lifecycle Management, Cybersecurity, Logistics" },
//       { label: "Key Benefits", value: "Enhanced operational readiness, Optimized resource allocation, Secure data management" }
//     ]
//   },
//   {
//     id: "education", label: "Education and Research", icon: <FiBookOpen />, color: "bg-pink-600", type: "industry", description: "Tools for educational institutions and research organizations to foster learning, collaboration, and administrative efficiency.",
//     details: [
//       { label: "Focus Areas", value: "Student Information Systems, Campus Operations, Research Grant Management, Alumni Relations" },
//       { label: "Key Benefits", value: "Improved student outcomes, Streamlined administrative processes, Enhanced research capabilities" }
//     ]
//   },
//   {
//     id: "engineering", label: "Engineering and Construction", icon: <FiTool />, color: "bg-orange-600", type: "industry", description: "Software to manage complex engineering and construction projects, from planning and execution to asset lifecycle.",
//     details: [
//       { label: "Focus Areas", value: "Project Planning & Control, Asset Performance Management, Field Service Management" },
//       { label: "Key Benefits", value: "Reduced project delays and costs, Improved project visibility, Enhanced collaboration" }
//     ]
//   },
//   {
//     id: "healthcare", label: "Healthcare", icon: <FiHeart />, color: "bg-teal-600", type: "industry", description: "Healthcare-specific management and analytics solutions, supporting patient care, operational efficiency, and regulatory compliance.",
//     details: [
//       { label: "Focus Areas", value: "Patient Management, Clinical Trials, Supply Chain for Medical Devices/Pharma" },
//       { label: "Key Benefits", value: "Improved patient care outcomes, Streamlined administrative workflows, Enhanced data security" }
//     ]
//   },
//   {
//     id: "tech", label: "High Tech", icon: <FiMonitor />, color: "bg-cyan-600", type: "industry", description: "Innovative solutions for high technology companies, enabling rapid product development and global market penetration.",
//     details: [
//       { label: "Focus Areas", value: "Product Lifecycle Management, Global Supply Chain, Research & Development" },
//       { label: "Key Benefits", value: "Faster innovation cycles, Optimized manufacturing processes, Stronger competitive edge" }
//     ]
//   },
//   {
//     id: "insurance", label: "Insurance", icon: <FiShield />, color: "bg-amber-600", type: "industry", description: "Robust software solutions for the insurance sector, enhancing policy management, claims processing, and customer engagement.",
//     details: [
//       { label: "Focus Areas", value: "Policy Administration, Claims Management, Customer Relationship Management" },
//       { label: "Key Benefits", value: "Reduced processing times, Enhanced customer satisfaction, Improved risk assessment" }
//     ]
//   },
//   {
//     id: "life", label: "Life Sciences", icon: <FiActivity />, color: "bg-lime-600", type: "industry", description: "Comprehensive solutions for pharmaceutical and biotechnology companies, supporting drug discovery to market.",
//     details: [
//       { label: "Focus Areas", value: "Research & Development, Clinical Trials Management, Manufacturing & Quality Control" },
//       { label: "Key Benefits", value: "Accelerated drug discovery, Compliance with GxP regulations, Improved patient safety" }
//     ]
//   },
//   {
//     id: "media", label: "Media", icon: <FiFilm />, color: "bg-violet-600", type: "industry", description: "Systems for media and entertainment companies, enabling content creation, distribution, and monetization.",
//     details: [
//       { label: "Focus Areas", value: "Content Production, Rights Management, Audience Engagement, Digital Distribution" },
//       { label: "Key Benefits", value: "Increased revenue streams, Broader audience reach, Efficient content lifecycle management" }
//     ]
//   },
//   {
//     id: "mill", label: "Mill Products", icon: <FiCodesandbox />, color: "bg-rose-600", type: "industry", description: "Specialized software for mill products manufacturing, optimizing production, inventory, and supply chain.",
//     details: [
//       { label: "Focus Areas", value: "Production Planning, Quality Management, Inventory Optimization, Logistics" },
//       { label: "Key Benefits", value: "Reduced waste and scrap, Improved production efficiency, Better customer service" }
//     ]
//   },
//   {
//     id: "mining", label: "Mining", icon: <FiMapPin />, color: "bg-slate-600", type: "industry", description: "Integrated solutions for mining operations, focusing on resource management, safety, and environmental responsibility.",
//     details: [
//       { label: "Focus Areas", value: "Resource Planning, Safety Management, Equipment Maintenance, Environmental Compliance" },
//       { label: "Key Benefits", value: "Increased operational efficiency, Enhanced worker safety, Sustainable resource extraction" }
//     ]
//   },
//   {
//     id: "oil", label: "Oil, Gas, and Energy", icon: <FiAperture />, color: "bg-fuchsia-600", type: "industry", description: "Robust software for the energy sector, managing operations from exploration to distribution.",
//     details: [
//       { label: "Focus Areas", value: "Upstream, Midstream, Downstream Operations, Asset Performance Management" },
//       { label: "Key Benefits", value: "Optimized asset utilization, Enhanced safety protocols, Improved regulatory adherence" }
//     ]
//   },
//   {
//     id: "professional", label: "Professional Services", icon: <FiMail />, color: "bg-blue-600", type: "industry", description: "Tools for professional service firms to manage projects, resources, and client relationships effectively.",
//     details: [
//       { label: "Focus Areas", value: "Project Profitability, Resource Utilization, Client Engagement, Billing & Invoicing" },
//       { label: "Key Benefits", value: "Improved project delivery success, Higher client satisfaction, Enhanced employee productivity" }
//     ]
//   },
//   {
//     id: "public", label: "Public Sector", icon: <FiFlag />, color: "bg-emerald-600", type: "industry", description: "Solutions for government and public administration, driving efficiency, transparency, and citizen engagement.",
//     details: [
//       { label: "Focus Areas", value: "Citizen Services, Budget Management, Public Safety, Urban Planning" },
//       { label: "Key Benefits", value: "Enhanced public services, Greater operational transparency, Improved accountability" }
//     ]
//   },
//   {
//     id: "retail", label: "Retail", icon: <FiShoppingBag />, color: "bg-amber-600", type: "industry", description: "Transform retail operations with solutions that enhance customer experience, optimize inventory, and drive sales.",
//     details: [
//       { label: "Focus Areas", value: "Omnichannel Commerce, Inventory Optimization, Customer Loyalty Programs, Store Operations" },
//       { label: "Key Benefits", value: "Personalized shopping experience, Increased sales and profitability, Efficient supply chain" }
//     ]
//   },
//   {
//     id: "sports", label: "Sports and Entertainment", icon: <FiTarget />, color: "bg-red-600", type: "industry", description: "Management systems for sports and entertainment entities, enhancing fan engagement and event operations.",
//     details: [
//       { label: "Focus Areas", value: "Event Management, Fan Engagement, Venue Operations, Sponsorship Management" },
//       { label: "Key Benefits", value: "Enhanced fan experience, Optimized event revenue, Streamlined venue operations" }
//     ]
//   },
//   {
//     id: "telecom", label: "Telecommunications", icon: <FiWind />, color: "bg-indigo-600", type: "industry", description: "Advanced solutions for telecommunications providers, supporting network management, billing, and customer services.",
//     details: [
//       { label: "Focus Areas", value: "Network Management, Customer Billing, Service Provisioning, Digital Transformation" },
//       { label: "Key Benefits", value: "Improved service quality, Faster network deployment, Enhanced customer loyalty" }
//     ]
//   },
//   {
//     id: "travel", label: "Travel and Transportation", icon: <FiWind />, color: "bg-green-600", type: "industry", description: "Software for travel and logistics businesses, optimizing operations and enhancing traveler experience.",
//     details: [
//       { label: "Focus Areas", value: "Passenger Experience, Logistics & Freight, Fleet Management, Route Optimization" },
//       { label: "Key Benefits", value: "Streamlined operations, Enhanced customer satisfaction, Reduced operational costs" }
//     ]
//   },
//   {
//     id: "utilities", label: "Utilities", icon: <FiWind />, color: "bg-orange-600", type: "industry", description: "Comprehensive systems for utility companies, managing infrastructure, services, and customer relations.",
//     details: [
//       { label: "Focus Areas", value: "Smart Grid Management, Asset Management, Customer Billing, Field Service" },
//       { label: "Key Benefits", value: "Efficient resource management, Reliable service delivery, Improved regulatory compliance" }
//     ]
//   },
//   {
//     id: "wholesale", label: "Wholesale Distribution", icon: <FiTruck />, color: "bg-purple-600", type: "industry", description: "Solutions for wholesale distribution businesses, enhancing inventory management, order fulfillment, and supplier relationships.",
//     details: [
//       { label: "Focus Areas", value: "Inventory Management, Order Fulfillment, Supplier Relationship Management, Warehouse Operations" },
//       { label: "Key Benefits", value: "Optimized inventory levels, Faster order processing, Improved customer service" }
//     ]
//   },

//   // Company Sizes
//   {
//     id: "small", label: "Small Businesses", icon: <FiMinimize2 />, color: "bg-green-600", type: "companySize", description: "Tailored solutions designed for small businesses to grow efficiently and effectively.",
//     details: [
//       { label: "Typical Challenges", value: "Limited resources, Scalability, Market penetration, Digital presence" },
//       { label: "Our Approach", value: "Cost-effective, User-friendly, Quick implementation, Integrated solutions" }
//     ]
//   },
//   {
//     id: "midsize", label: "Midsize Companies", icon: <FiAlignJustify />, color: "bg-yellow-600", type: "companySize", description: "Flexible and scalable solutions for growing midsize companies, supporting expansion and operational excellence.",
//     details: [
//       { label: "Typical Challenges", value: "Rapid growth management, Process optimization, Talent acquisition & retention, Data silos" },
//       { label: "Our Approach", value: "Modular and scalable, Industry-specific, Cloud-first, Data-driven insights" }
//     ]
//   },
//   {
//     id: "large", label: "Large Enterprise", icon: <FiMaximize2 />, color: "bg-blue-600", type: "companySize", description: "Robust and comprehensive solutions for large-scale enterprises, enabling complex operations and global digital transformation.",
//     details: [
//       { label: "Typical Challenges", value: "Global operations, Complex integrations, Regulatory compliance, Legacy system modernization" },
//       { label: "Our Approach", value: "Comprehensive suites, Highly customizable, Secure and compliant, AI-powered automation" }
//     ]
//   },
// ];


// // Main App Component
// export default function App() {
//   // State for selections, UI toggles, and filters
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     btp: true, // Open BTP by default
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isRightBarOpen, setIsRightBarOpen] = useState(false);
//   const [selectedItemForRightBar, setSelectedItemForRightBar] = useState<CombinedDataItem | null>(null);
//   const [activeFilters, setActiveFilters] = useState<string[]>([]); // e.g., ["industry", "product"]

//   // Handlers for state changes
//   const toggleSelection = useCallback((itemId: string) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
//     );
//   }, []);

//   const toggleCategoryExpand = useCallback((categoryId: string) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   }, []);

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   const removeSelectedItem = useCallback(
//     (itemToRemoveId: string) => {
//       setSelectedItems((prev) => prev.filter((id) => id !== itemToRemoveId));
//       if (selectedItemForRightBar?.id === itemToRemoveId) {
//         setIsRightBarOpen(false);
//         setSelectedItemForRightBar(null);
//       }
//     },
//     [selectedItemForRightBar]
//   );

//   const resetAllSelections = useCallback(() => {
//     setSelectedItems([]);
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//     setSearchTerm("");
//     setActiveFilters([]);
//     setExpandedCategories({ btp: true }); // Reset expansions
//   }, []);

//   const handleItemClickForRightBar = useCallback((item: CombinedDataItem) => {
//     setSelectedItemForRightBar(item);
//     setIsRightBarOpen(true);
//   }, []);

//   const closeRightBar = useCallback(() => {
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//   }, []);

//   const toggleFilter = useCallback((filterType: string) => {
//     setActiveFilters((prev) =>
//       prev.includes(filterType) ? prev.filter((type) => type !== filterType) : [...prev, filterType]
//     );
//   }, []);

//   // Filtered data based on search and active filters
//   const filteredData = useMemo(() => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();

//     return allData.filter((item) => {
//       const matchesSearch = item.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//                             (item.description && item.description.toLowerCase().includes(lowerCaseSearchTerm));

//       // If activeFilters exist, check if the item's type is in activeFilters
//       const matchesFilterType = activeFilters.length === 0 || activeFilters.includes(item.type);

//       if (item.type === "category" && item.subcategories) {
//         // For categories, check if the category itself matches search/filter,
//         // or if any of its subcategories/products match.
//         const matchesSubcategoryOrProduct = item.subcategories.some(sub =>
//           (sub.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//            (sub.products && sub.products.some(prod => prod.label.toLowerCase().includes(lowerCaseSearchTerm))))
//         );
//         return (matchesSearch || matchesSubcategoryOrProduct) && matchesFilterType;
//       }
//       return matchesSearch && matchesFilterType;
//     });
//   }, [searchTerm, activeFilters]);

//   // Separate data for rendering convenience
//   const portfolioCategories = useMemo(() => filteredData.filter((item): item is CategoryItem => item.type === "category"), [filteredData]);
//   const industriesData = useMemo(() => filteredData.filter((item): item is FilterableItem => item.type === "industry"), [filteredData]);
//   const companySizesData = useMemo(() => filteredData.filter((item): item is FilterableItem => item.type === "companySize"), [filteredData]);

//   // Details for items currently in the cart/selected
//   const selectedItemsDetails = useMemo(() => {
//     return selectedItems.map(id => allData.find(item => item.id === id)).filter(Boolean) as CombinedDataItem[];
//   }, [selectedItems]);

//   // Component for Right Bar Info
//   const RightBarInfo = ({ item, onClose }: { item: CombinedDataItem | null; onClose: () => void }) => {
//     if (!item) return null;

//     const isSelected = selectedItems.includes(item.id);

//     return (
//       <div className="absolute right-0 top-0  bg-white border-l border-gray-100 shadow-xl p-8 overflow-y-auto transform transition-transform duration-300 ease-out z-20 rounded-l-xl">
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h3 className="text-2xl font-extrabold text-gray-800">Details View</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
//             aria-label="Close details"
//           >
//             <FiX className="w-7 h-7" />
//           </button>
//         </div>

//         <div className="space-y-6">
//           <div className="flex items-center space-x-4 mb-4">
//             {/* Display relevant icon for the item type */}
//             {item.type === "category" && 'icon' in item && item.icon ? (
//               <div className="p-3 rounded-xl bg-purple-600 text-white shadow-md">
//                 {item.icon}
//               </div>
//             ) : item.type === "subcategory" && 'icon' in item && item.icon ? (
//               <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-md">
//                 {item.icon}
//               </div>
//             ) : (item.type === "industry" || item.type === "companySize" || item.type === "product") && 'icon' in item && item.icon && 'color' in item && item.color ? (
//               <div className={`p-3 rounded-xl ${item.color} text-white shadow-md`}>
//                 {item.icon}
//               </div>
//             ) : ( // Fallback icon for any unhandled case
//               <FiLayers className="text-gray-500 w-10 h-10" />
//             )}
//             <h2 className="text-3xl font-bold text-gray-900 leading-tight">{item.label}</h2>
//           </div>

//           {'description' in item && item.description && (
//             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-inner">
//               <p className="text-gray-800 text-lg">{item.description}</p>
//             </div>
//           )}

//           {item.type === "category" && 'subcategories' in item && item.subcategories && item.subcategories.length > 0 && (
//             <div className="mt-6">
//               <h4 className="font-bold text-gray-700 mb-4 text-xl">Category Breakdown:</h4>
//               <div className="space-y-4">
//                 {item.subcategories.map(sub => (
//                   <div key={sub.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
//                     <p className="font-semibold text-gray-800 text-lg flex items-center">
//                       {sub.icon || <FiChevronRight className="mr-2 text-orange-600" />} {sub.label}
//                     </p>
//                     {sub.products && sub.products.length > 0 && (
//                       <div className="ml-6 mt-3 space-y-2">
//                         <h5 className="font-medium text-gray-600 text-md mb-2 border-b border-gray-200 pb-1">Associated Products:</h5>
//                         <ul className="list-none space-y-2">
//                           {sub.products.map(prod => (
//                             <li key={prod.id} className="flex items-start text-gray-700 text-sm">
//                               {prod.icon || <FiCheckCircle className="mr-2 mt-1 text-green-500 flex-shrink-0" />}
//                               <div>
//                                 <strong className="text-gray-900">{prod.label}:</strong> {prod.description || "Detailed product information forthcoming."}
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {(item.type === "industry" || item.type === "companySize" || item.type === "product") && 'details' in item && item.details && item.details.length > 0 && (
//             <div className="mt-6">
//               <h4 className="font-bold text-gray-700 mb-4 text-xl">Key Aspects:</h4>
//               <dl className="space-y-3">
//                 {item.details.map((detail, index) => (
//                   <div key={index} className="flex items-start">
//                     <span className="font-semibold text-blue-600 mr-2 min-w-[100px]">{detail.label}:</span>
//                     <dd className="text-gray-700 flex-1">{detail.value}</dd>
//                   </div>
//                 ))}
//               </dl>
//             </div>
//           )}

//           <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
//             <button
//               className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ease-in-out
//                 ${isSelected ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}
//                 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300`}
//               onClick={() => {
//                 toggleSelection(item.id);
//               }}
//             >
//               {isSelected ? "Remove from Selections" : "Add to Selections"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Helper component for rendering individual items in the tree
//   const TreeItem = ({ item, level = 0 }: { item: CombinedDataItem; level?: number }) => {
//     const isExpanded = 'type' in item && item.type === "category" ? expandedCategories[item.id] : undefined;
//     const isSelected = selectedItems.includes(item.id);
//     const hasSubcategories = 'type' in item && item.type === "category" && item.subcategories && item.subcategories.length > 0;
//     const hasProducts = 'type' in item && item.type === "subcategory" && item.products && item.products.length > 0;

//     const IconComponent = () => {
//       if ('icon' in item && item.icon) return item.icon;
//       if (item.type === "category") return <FiPackage />;
//       if (item.type === "subcategory") return <FiList />;
//       if (item.type === "product") return <FiBox />;
//       return <FiInfo />; // Fallback
//     };

//     return (
//       <div className={`flex flex-col border-l border-gray-200 ml-${level * 4} transition-all duration-200 ease-in-out`}>
//         <div className={`flex items-center group py-2 pl-4 -ml-px ${level > 0 ? 'border-t border-gray-100' : ''}`}>
//           {/* Collapse/Expand Toggle for Categories */}
//           {hasSubcategories && (
//             <button
//               onClick={(e) => { e.stopPropagation(); toggleCategoryExpand(item.id); }}
//               className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 mr-2 text-gray-500 focus:outline-none"
//               aria-expanded={isExpanded}
//               aria-controls={`collapse-${item.id}`}
//             >
//               {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
//             </button>
//           )}
//           {!hasSubcategories && <span className="w-6 h-6 mr-2"></span>} {/* Spacer for alignment */}

//           {/* Item Content Area */}
//           <div
//             className={`flex flex-grow items-center p-2 rounded-lg cursor-pointer transition-colors duration-200
//                         ${isSelected ? 'bg-blue-100 border-blue-300 shadow-inner' : 'hover:bg-gray-100'}
//                         ${selectedItemForRightBar?.id === item.id ? 'bg-blue-50 border-blue-200' : ''}
//                         border border-transparent`}
//             onClick={() => handleItemClickForRightBar(item)}
//           >
//             {/* Checkbox for Selection */}
//             <input
//               type="checkbox"
//               id={`item-${item.id}`}
//               checked={isSelected}
//               onChange={(e) => { e.stopPropagation(); toggleSelection(item.id); }}
//               className="form-checkbox h-5 w-5 text-blue-600 rounded-md mr-3 border-gray-300 focus:ring-blue-500 transition-colors duration-200"
//             />

//             {/* Icon */}
//             <div className={`p-2 rounded-lg mr-3 shadow-sm
//                             ${'color' in item && item.color ? item.color : 'bg-gray-200'}
//                             text-white transition-all duration-200 ease-in-out transform group-hover:scale-105`}>
//               <IconComponent />
//             </div>

//             {/* Label */}
//             <label htmlFor={`item-${item.id}`} className={`font-semibold text-lg flex-grow cursor-pointer ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>
//               {item.label}
//             </label>

//             {/* Selected Star Icon */}
//             {isSelected && <FiStar className="text-yellow-500 ml-2" title="Selected" />}
//           </div>
//         </div>

//         {/* Render Subcategories/Products if expanded */}
//         {hasSubcategories && isExpanded && (
//           <div id={`collapse-${item.id}`} className="flex flex-col transition-all duration-300 ease-out animate-fade-in-down">
//             {'subcategories' in item && item.subcategories?.map((sub) => (
//               <div key={sub.id} className={`flex flex-col border-l border-gray-200 ml-${(level + 1) * 4}`}>
//                 <div className="flex items-center group py-2 pl-4 -ml-px">
//                   <span className="w-6 h-6 mr-2"></span> {/* Spacer for alignment */}
//                   <div
//                     className={`flex flex-grow items-center p-2 rounded-lg cursor-pointer transition-colors duration-200
//                                 ${selectedItems.includes(sub.id) ? 'bg-blue-100 border-blue-300 shadow-inner' : 'hover:bg-gray-100'}
//                                 ${selectedItemForRightBar?.id === sub.id ? 'bg-blue-50 border-blue-200' : ''}
//                                 border border-transparent`}
//                     onClick={() => handleItemClickForRightBar(sub)}
//                   >
//                     <input
//                       type="checkbox"
//                       id={`item-${sub.id}`}
//                       checked={selectedItems.includes(sub.id)}
//                       onChange={(e) => { e.stopPropagation(); toggleSelection(sub.id); }}
//                       className="form-checkbox h-5 w-5 text-blue-600 rounded-md mr-3 border-gray-300 focus:ring-blue-500"
//                     />
//                     <div className="p-2 rounded-lg mr-3 bg-indigo-200 text-indigo-800 shadow-sm transition-all duration-200 ease-in-out transform group-hover:scale-105">
//                       {sub.icon || <FiList />}
//                     </div>
//                     <label htmlFor={`item-${sub.id}`} className={`font-medium text-base flex-grow cursor-pointer ${selectedItems.includes(sub.id) ? 'text-blue-700' : 'text-gray-600'}`}>
//                       {sub.label}
//                     </label>
//                     {selectedItems.includes(sub.id) && <FiStar className="text-yellow-500 ml-2"  />}
//                   </div>
//                 </div>
//                 {sub.products && sub.products.length > 0 && (
//                   <div className={`flex flex-col animate-fade-in-down`}>
//                     {sub.products.map((prod) => (
//                       <div key={prod.id} className={`flex items-center group py-2 pl-4 -ml-px ml-${(level + 2) * 4}`}>
//                         <span className="w-6 h-6 mr-2"></span> {/* Spacer for alignment */}
//                         <div
//                           className={`flex flex-grow items-center p-2 rounded-lg cursor-pointer transition-colors duration-200
//                                       ${selectedItems.includes(prod.id) ? 'bg-blue-100 border-blue-300 shadow-inner' : 'hover:bg-gray-100'}
//                                       ${selectedItemForRightBar?.id === prod.id ? 'bg-blue-50 border-blue-200' : ''}
//                                       border border-transparent`}
//                           onClick={() => handleItemClickForRightBar(prod)}
//                         >
//                           <input
//                             type="checkbox"
//                             id={`item-${prod.id}`}
//                             checked={selectedItems.includes(prod.id)}
//                             onChange={(e) => { e.stopPropagation(); toggleSelection(prod.id); }}
//                             className="form-checkbox h-5 w-5 text-blue-600 rounded-md mr-3 border-gray-300 focus:ring-blue-500"
//                           />
//                           <div className="p-2 rounded-lg mr-3 bg-green-200 text-green-800 shadow-sm transition-all duration-200 ease-in-out transform group-hover:scale-105">
//                             {prod.icon || <FiPackage />}
//                           </div>
//                           <label htmlFor={`item-${prod.id}`} className={`font-normal text-sm flex-grow cursor-pointer ${selectedItems.includes(prod.id) ? 'text-blue-600' : 'text-gray-500'}`}>
//                             {prod.label}
//                           </label>
//                           {selectedItems.includes(prod.id) && <FiStar className="text-yellow-500 ml-2" title="Selected" />}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };


//   return (
//     <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col items-center p-4">
//       <style>
//         {`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
//         body { font-family: 'Inter', sans-serif; }
//         .animate-fade-in-down {
//           animation: fadeInDown 0.3s ease-out;
//         }
//         @keyframes fadeInDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slide-in-right {
//           animation: slideInRight 0.3s ease-out;
//         }
//         @keyframes slideInRight {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
//         .animate-slide-out-right {
//           animation: slideOutRight 0.3s ease-in forwards;
//         }
//         @keyframes slideOutRight {
//           from { transform: translateX(0); }
//           to { transform: translateX(100%); }
//         }
//         `}
//       </style>

//       <div className="w-full max-w- bg-white rounded-2xl shadow-xl p-8 relative flex flex-col lg:flex-row min-h-[80vh]">

//         {/* Main Content Area */}
//         <div className={`flex-grow ${isRightBarOpen ? 'lg:w-2/3' : 'w-full'} transition-all duration-300 ease-in-out pr-8`}>
//           <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Excellencia Solutions Hub
//           </h1>

//           {/* Search and Global Actions */}
//           <div className="mb-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
//             <div className="relative flex-grow w-full md:w-auto">
//               <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search solutions, industries, or company sizes..."
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <button
//               onClick={resetAllSelections}
//               className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
//             >
//               <FiRefreshCw className="mr-2" /> Reset All
//             </button>
//           </div>

//           {/* Advanced Filter Section */}
//           <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-100">
//             <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-5">
//               <FiFilter className="mr-3 text-blue-600 w-7 h-7" /> Advanced Filters
//             </h3>
//             <div className="flex flex-wrap gap-4">
//               {['category', 'industry', 'companySize', 'product'].map(type => (
//                 <button
//                   key={type}
//                   onClick={() => toggleFilter(type)}
//                   className={`flex items-center px-5 py-2 rounded-full font-medium transition-all duration-300 ease-in-out shadow-sm
//                               ${activeFilters.includes(type)
//                                 ? 'bg-blue-600 text-white transform scale-105 ring-2 ring-blue-300'
//                                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
//                               }
//                               focus:outline-none focus:ring-2 focus:ring-blue-400`}
//                 >
//                   {type === "category" && <FiLayers className="mr-2" />}
//                   {type === "industry" && <FiBriefcase className="mr-2" />}
//                   {type === "companySize" && <FiInfo className="mr-2" />}
//                   {type === "product" && <FiPackage className="mr-2" />}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}s
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Content Sections */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//             {/* Portfolio Categories */}
//             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//               <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiGrid className="mr-3 text-purple-600 w-8 h-8" /> Portfolio Categories
//               </h2>
//               <div className="space-y-4">
//                 {portfolioCategories.length > 0 ? (
//                   portfolioCategories.map((category) => (
//                     <TreeItem key={category.id} item={category} level={0} />
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No categories match your search or filters.</p>
//                 )}
//               </div>
//             </div>

//             {/* Industries & Company Sizes */}
//             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//               <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiDollarSign className="mr-3 text-green-600 w-8 h-8" /> Industries & Company Sizes
//               </h2>
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
//                     <FiBriefcase className="mr-2 text-indigo-500" /> Industries
//                   </h3>
//                   <div className="space-y-3">
//                     {industriesData.length > 0 ? (
//                       industriesData.map((industry) => (
//                         <TreeItem key={industry.id} item={industry} level={0} />
//                       ))
//                     ) : (
//                       <p className="text-gray-500 text-sm">No industries match your search or filters.</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="pt-6 border-t border-gray-200">
//                   <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
//                     <FiHome className="mr-2 text-pink-500" /> Company Sizes
//                   </h3>
//                   <div className="space-y-3">
//                     {companySizesData.length > 0 ? (
//                       companySizesData.map((size) => (
//                         <TreeItem key={size.id} item={size} level={0} />
//                       ))
//                     ) : (
//                       <p className="text-gray-500 text-sm">No company sizes match your search or filters.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Information Bar (Closed/Opened) */}
//         <div className={`fixed right-0 top-0 h-full w-1/3 bg-white border-l border-gray-200 shadow-2xl p-8 overflow-y-auto transform transition-transform duration-300 ease-in-out z-50 rounded-l-xl
//                         ${isRightBarOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full animate-slide-out-right'}`}
//           style={{ display: isRightBarOpen ? 'block' : 'none' }}> {/* This style helps prevent flickering on initial render */}
//           <RightBarInfo item={selectedItemForRightBar} onClose={closeRightBar} />
//         </div>

//         {/* Fixed Checkout Panier */}
//         <div className={`fixed bottom-0 left-0 right-0 bg-blue-700 p-4 text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
//                         ${selectedItems.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
//           <div className="max-w-full mx-auto flex justify-between items-center">
//             <div className="flex items-center">
//               <FiShoppingBag className="w-8 h-8 mr-3 text-blue-200" />
//               <span className="text-2xl font-bold">{selectedItems.length}</span>
//               <span className="ml-2 text-lg">items selected</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex flex-wrap items-center gap-2">
//                 {selectedItemsDetails.slice(0, 3).map((item) => (
//                   <span key={item.id} className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center shadow-md">
//                     {item.label}
//                     <button
//                       onClick={() => removeSelectedItem(item.id)}
//                       className="ml-2 text-white hover:text-blue-200 transition-colors"
//                       aria-label={`Remove ${item.label}`}
//                     >
//                       <FiX className="w-4 h-4" />
//                     </button>
//                   </span>
//                 ))}
//                 {selectedItemsDetails.length > 3 && (
//                   <span className="text-blue-200 text-sm ml-1">+{selectedItemsDetails.length - 3} more</span>
//                 )}
//               </div>
//               <button
//                 onClick={() => { /* Implement checkout logic or open a checkout modal */ }}
//                 className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-xl hover:bg-blue-100 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white-300"
//               >
//                 <FiCreditCard className="inline-block mr-2" /> Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useCallback, useMemo } from "react";

// // Inline SVG components for react-icons/fi replacements
// const FiRefreshCw = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.5 7h19a2 2 0 0 1 0 4H1"></path><path d="M20.5 17H1a2 2 0 0 1 0-4h22"></path></svg>;
// const FiChevronRight = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>;
// const FiChevronDown = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
// const FiGrid = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
// const FiShoppingCart = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
// const FiDollarSign = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
// const FiX = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
// const FiPackage = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
// const FiLayers = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
// const FiSearch = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
// const FiInfo = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
// const FiBookmark = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;
// const FiBriefcase = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
// const FiGlobe = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
// const FiTrendingUp = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
// const FiBox = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.52a2 2 0 0 1-1.11 1.79l-8 4A2 2 0 0 1 12 22a2 2 0 0 1-.89-.22l-8-4A2 2 0 0 1 2 16.76V7.24a2 2 0 0 1 1.11-1.79l8-4A2 2 0 0 1 12 2zm0 1.95l-8 4-1.11.55V15.5L12 18l8-4v-9.52l-1.11-.55-8-4z"></path><polyline points="2.9 7 12 12 21.1 7"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
// const FiActivity = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
// const FiTarget = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
// const FiMapPin = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
// const FiCpu = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line></svg>;
// const FiList = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
// const FiPlus = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
// const FiCheckCircle = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-8.15"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
// const FiStar = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
// const FiFilter = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 9 12.46 9 19 15 22 15 12.46 22 3"></polygon></svg>;
// const FiCreditCard = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
// const FiShoppingBag = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
// const FiSettings = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82-.33H9a1.65 1.65 0 0 0 1.51-1V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09z"></path></svg>;
// const FiHardDrive = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>;
// const FiDatabase = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M21 19c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
// const FiEdit3 = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
// const FiZap = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
// const FiBarChart = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
// const FiCloud = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>;
// const FiUsers = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
// const FiTruck = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 3h15v16H1V3z"></path><path d="M16 8h4l3 3v5h-7V8z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
// const FiCompass = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>;
// const FiCar = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 12H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"></path><polyline points="7 12 9 7 15 7 17 12"></polyline><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>;
// const FiTool = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"></path></svg>;
// const FiHeart = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
// const FiMonitor = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
// const FiShield = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
// const FiBookOpen = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
// const FiFilm = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>;
// const FiWind = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 20 12H2"></path></svg>;
// const FiCodesandbox = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="16.5 19.79 16.5 14.6 21 12"></polyline><polyline points="12 12 12 22"></polyline><line x1="12" y1="12" x2="20.73" y2="6.96"></line><line x1="12" y1="12" x2="3.27" y2="6.96"></line></svg>;
// const FiAperture = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><path d="M14.31 8L20.05 17.94M9.69 8h4.62L12 22V8z"></path><path d="M2.05 17.94L7.79 8h7.33L21.95 17.94H2.05z"></path></svg>;
// const FiMail = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
// const FiFlag = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>;
// const FiHome = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
// const FiMinimize2 = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>;
// const FiMaximize2 = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>;
// const FiAlignJustify = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

// // Define types for better type checking and readability
// type ItemIcon = React.ReactNode;

// type ProductItem = {
//   id: string;
//   label: string;
//   icon?: ItemIcon;
//   color?: string;
//   type: "product";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type SubCategory = {
//   id: string;
//   label: string;
//   type: "subcategory";
//   products?: ProductItem[];
//   icon?: ItemIcon; // Added icon for subcategories
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   type: "category";
//   subcategories?: SubCategory[];
//   description?: string;
//   icon?: ItemIcon; // Added icon for categories
// };

// type FilterableItem = {
//   id: string;
//   label: string;
//   icon?: ItemIcon;
//   color?: string;
//   type: "industry" | "companySize";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type CombinedDataItem = CategoryItem | FilterableItem | ProductItem | SubCategory;

// // Data (Extended with more specific icons)
// const allData: CombinedDataItem[] = [
//   // Portfolio Categories
//   { id: "excellence", label: "Excellencia S/Excellencia Cloud", type: "category", icon: <FiCloud />, description: "Our flagship cloud offerings for comprehensive business solutions, designed for unparalleled performance and scalability." },
//   {
//     id: "ai", label: "Artificial Intelligence", info: true, type: "category", icon: <FiCpu />,
//     description: "Leverage cutting-edge AI to transform your business operations, unlock deep insights, and automate complex tasks with intelligent systems.",
//     subcategories: [
//       {
//         id: "ai_platform", label: "AI Platform Services", type: "subcategory", icon: <FiHardDrive />,
//         products: [
//           { id: "ai_core", label: "AI Core Engine", type: "product", icon: <FiSettings />, description: "The foundational AI engine for developing and deploying sophisticated machine learning models, offering robust computational power." },
//           { id: "data_intelligence", label: "Data Intelligence Hub", type: "product", icon: <FiDatabase />, description: "A centralized hub for advanced data processing, real-time analysis, and predictive modeling, enabling smart, data-driven decisions." }
//         ]
//       },
//       {
//         id: "ml_solutions", label: "Machine Learning Solutions", type: "subcategory", icon: <FiTrendingUp />,
//         products: [
//           { id: "predictive_analytics", label: "Predictive Analytics Suite", type: "product", icon: <FiBarChart />, description: "Powerful tools for forecasting future trends, identifying opportunities, and mitigating risks across various business domains." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     type: "category",
//     icon: <FiPackage />,
//     description: "Innovate and integrate with our robust Business Technology Platform, providing a foundation for agile development and intelligent enterprise.",
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         type: "subcategory",
//         icon: <FiEdit3 />,
//         products: [
//           { id: "app_studio", label: "Excellencia App Studio", type: "product", icon: <FiCodesandbox />, description: "A comprehensive low-code/no-code platform for rapid application development and deployment, empowering citizen developers and IT." },
//           { id: "process_automation", label: "Process Automation Suite", type: "product", icon: <FiZap />, description: "Automate business processes end-to-end for increased efficiency, reduced manual effort, and improved operational agility." },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         type: "subcategory",
//         icon: <FiDatabase />,
//         products: [
//           { id: "data_warehouse", label: "Excellencia Data Warehouse Cloud", type: "product", icon: <FiHardDrive />, description: "Scalable cloud-based data warehousing solution for all your data needs, offering high performance and flexibility for analytics." },
//           { id: "analytics_cloud", label: "Excellencia Analytics Cloud", type: "product", icon: <FiBarChart />, description: "Integrated business intelligence, planning, and predictive analytics in the cloud, enabling informed decisions and strategic foresight." },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         type: "subcategory",
//         icon: <FiCloud />,
//         products: [
//           { id: "data_migration", label: "Excellencia Advanced Data Migration and Management by Syniti", type: "product", icon: <FiRefreshCw />, description: "Robust data migration and management tools ensuring data quality, consistency, and seamless transfer across systems." },
//           { id: "ariba_integration", label: "Ariba Cloud Integration", type: "product", icon: <FiShoppingCart />, description: "Seamless integration capabilities with Ariba cloud services for optimized procurement processes and enhanced supplier collaboration." },
//           { id: "integration_suite", label: "Excellencia Integration Suite", type: "product", icon: <FiLayers />, description: "A comprehensive suite for enterprise integration, connecting diverse applications and processes across your IT landscape." },
//         ],
//       },
//     ],
//   },
//   {
//     id: "crm", label: "CRM and Customer Experience", info: true, type: "category", icon: <FiUsers />,
//     description: "Optimize customer interactions and enhance their overall experience, building lasting relationships and driving loyalty.",
//     subcategories: [
//       { id: "sales_cloud", label: "Sales Cloud", type: "subcategory", icon: <FiDollarSign />, products: [{ id: "crm_sales", label: "CRM Sales Automation", type: "product", icon: <FiTrendingUp />, description: "Automate sales processes, manage leads, and foster strong customer relationships with a powerful sales force automation solution." }] },
//       { id: "service_cloud", label: "Service Cloud", type: "subcategory", icon: <FiInfo />, products: [{ id: "crm_service", label: "CRM Service Management", type: "product", icon: <FiWind />, description: "Deliver exceptional customer service and support operations with intelligent service management tools and omnichannel capabilities." }] },
//     ]
//   },
//   {
//     id: "erp", label: "Enterprise Resource Planning", info: true, type: "category", icon: <FiBriefcase />,
//     description: "Streamline your core business processes with our comprehensive ERP solutions, integrating finance, logistics, and more for efficiency.",
//     subcategories: [
//       { id: "s4hana", label: "S/4HANA", type: "subcategory", icon: <FiActivity />, products: [{ id: "erp_core", label: "ERP Core Functions", type: "product", icon: <FiGrid />, description: "Next-generation ERP functionalities for finance, logistics, manufacturing, and more, leveraging in-memory computing for real-time insights." }] }
//     ]
//   },
//   {
//     id: "finance", label: "Financial Management", info: true, type: "category", icon: <FiDollarSign />,
//     description: "Gain real-time financial insights and streamline your financial operations, ensuring compliance and strategic financial planning.",
//     subcategories: [
//       { id: "financial_planning", label: "Financial Planning", type: "subcategory", icon: <FiWind />, products: [{ id: "fp_suite", label: "Financial Planning Suite", type: "product", icon: <FiBarChart />, description: "Tools for budgeting, forecasting, and in-depth financial analysis to drive performance and achieve financial goals." }] }
//     ]
//   },
//   {
//     id: "hcm", label: "Human Capital Management", info: true, type: "category", icon: <FiUsers />,
//     description: "Manage your workforce effectively from hire to retire, optimizing talent management and employee experience.",
//     subcategories: [
//       { id: "successfactors", label: "SuccessFactors", type: "subcategory", icon: <FiUsers />, products: [{ id: "hcm_suite", label: "HCM Suite", type: "product", icon: <FiWind />, description: "Comprehensive human capital management solutions covering HR, payroll, talent management, and employee engagement." }] }
//     ]
//   },
//   {
//     id: "spend", label: "Spend Management", info: true, type: "category", icon: <FiCreditCard />,
//     description: "Optimize your procurement, external workforce, and travel & expense processes for greater visibility and control over your spending.",
//     subcategories: [
//       { id: "ariba", label: "Ariba", type: "subcategory", icon: <FiShoppingBag />, products: [{ id: "procurement", label: "Procurement Solutions", type: "product", icon: <FiShoppingCart />, description: "End-to-end procurement solutions for managing all your spending categories, from sourcing to payment." }] },
//       { id: "fieldglass", label: "Fieldglass", type: "subcategory", icon: <FiBriefcase />, products: [{ id: "external_workforce", label: "External Workforce Management", type: "product", icon: <FiUsers />, description: "Manage contingent workers and service providers with comprehensive solutions for talent sourcing and compliance." }] }
//     ]
//   },
//   {
//     id: "supply_chain", label: "Supply Chain Management", info: true, type: "category", icon: <FiTruck />,
//     description: "Enhance the efficiency and resilience of your supply chain, from planning and logistics to manufacturing and asset management.",
//     subcategories: [
//       { id: "ariba_scm", label: "Ariba Supply Chain", type: "subcategory", icon: <FiShoppingBag />, products: [{ id: "supply_chain_collaboration", label: "Supply Chain Collaboration", type: "product", icon: <FiTruck />, description: "Collaborate effectively with suppliers and partners to optimize inventory, improve logistics, and ensure timely delivery." }] },
//       { id: "logistics", label: "Logistics", type: "subcategory", icon: <FiCompass />, products: [{ id: "warehouse_management", label: "Warehouse Management", type: "product", icon: <FiBox />, description: "Streamline warehouse operations, optimize inventory, and enhance fulfillment efficiency with advanced warehouse management capabilities." }] },
//       { id: "manufacturing", label: "Manufacturing", type: "subcategory", icon: <FiTool />, products: [{ id: "digital_manufacturing", label: "Digital Manufacturing", type: "product", icon: <FiMonitor />, description: "Integrate and optimize manufacturing processes with digital technologies for improved production efficiency and quality control." }] }
//     ]
//   },
//   {
//     id: "experience_management", label: "Experience Management", info: true, type: "category", icon: <FiHeart />,
//     description: "Gather and act on experience data to improve customer, employee, product, and brand experiences.",
//     subcategories: [
//       { id: "qualitrics", label: "Qualtrics", type: "subcategory", icon: <FiStar />, products: [{ id: "xm_platform", label: "XM Platform", type: "product", icon: <FiTarget />, description: "The leading experience management platform for understanding and improving the four core experiences of business: customer, employee, product, and brand." }] }
//     ]
//   },
//   // Filterable items (for example, industries or company sizes)
//   { id: "retail", label: "Retail", type: "industry", icon: <FiShoppingBag />, description: "Solutions tailored for the retail industry to enhance customer experience and streamline operations." },
//   { id: "automotive", label: "Automotive", type: "industry", icon: <FiCar />, description: "Innovative solutions for the automotive sector, from manufacturing to sales and service." },
//   { id: "finance_industry", label: "Financial Services", type: "industry", icon: <FiCreditCard />, description: "Specialized offerings for the financial services industry, focusing on compliance, security, and customer engagement." },
//   { id: "healthcare", label: "Healthcare", type: "industry", icon: <FiHeart />, description: "Solutions designed to improve patient care, operational efficiency, and regulatory compliance in healthcare." },
//   { id: "smb", label: "Small to Mid-sized Business", type: "companySize", icon: <FiBriefcase />, description: "Scalable and affordable solutions for small and mid-sized businesses looking to grow and optimize." },
//   { id: "enterprise", label: "Enterprise", type: "companySize", icon: <FiGlobe />, description: "Robust and comprehensive solutions for large enterprises with complex needs and global operations." },
// ];

// // Reusable components (for demonstration, these would typically be in separate files)

// // Notification Component
// interface NotificationProps {
//   message: string;
//   type: 'success' | 'error' | 'info' | 'warning';
//   onClose: () => void;
// }

// const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
//   const bgColor = useMemo(() => {
//     switch (type) {
//       case 'success': return 'bg-green-500';
//       case 'error': return 'bg-red-500';
//       case 'info': return 'bg-blue-500';
//       case 'warning': return 'bg-yellow-500';
//       default: return 'bg-gray-500';
//     }
//   }, [type]);

//   return (
//     <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50`}>
//       <span>{message}</span>
//       <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20">
//         <FiX className="h-4 w-4" />
//       </button>
//     </div>
//   );
// };

// // Right Bar Detail View Component
// interface RightBarDetailProps {
//   item: CombinedDataItem | null;
//   onClose: () => void;
// }

// const RightBarDetail: React.FC<RightBarDetailProps> = ({ item, onClose }) => {
//   if (!item) {
//     return null;
//   }

//   return (
//     <div className="w-1/3 bg-gray-50 p-4 border-l border-gray-200 shadow-lg overflow-y-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
//           {item.icon && <span className="mr-2 text-gray-600">{item.icon}</span>}
//           {item.label}
//         </h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           <FiX className="h-6 w-6" />
//         </button>
//       </div>
//       <p className="text-gray-700 mb-4">{item.description || "No description available."}</p>

//       {'details' in item && item.details && item.details.length > 0 && (
//         <div className="mb-4">
//           <h3 className="text-lg font-medium text-gray-700 mb-2">Details:</h3>
//           <ul className="list-disc list-inside text-gray-600">
//             {item.details.map((detail, index) => (
//               <li key={index} className="mb-1">
//                 <strong>{detail.label}:</strong> {detail.value}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {item.type === "category" && item.subcategories && item.subcategories.length > 0 && (
//         <div className="mb-4">
//           <h3 className="text-lg font-medium text-gray-700 mb-2">Subcategories:</h3>
//           <ul className="space-y-2">
//             {item.subcategories.map(sub => (
//               <li key={sub.id} className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
//                 <span className="font-semibold text-gray-800 flex items-center">
//                   {sub.icon && <span className="mr-2 text-gray-600">{sub.icon}</span>}
//                   {sub.label}
//                 </span>
//                 {sub.products && sub.products.length > 0 && (
//                   <ul className="ml-6 mt-2 space-y-1 text-sm text-gray-600">
//                     {sub.products.map(product => (
//                       <li key={product.id} className="flex items-center">
//                         {product.icon && <span className="mr-1 text-gray-500">{product.icon}</span>}
//                         {product.label}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {item.type === "subcategory" && item.products && item.products.length > 0 && (
//         <div className="mb-4">
//           <h3 className="text-lg font-medium text-gray-700 mb-2">Products:</h3>
//           <ul className="space-y-2">
//             {item.products.map(product => (
//               <li key={product.id} className="bg-white p-3 rounded-md shadow-sm border border-gray-200 flex items-center">
//                 {product.icon && <span className="mr-2 text-gray-600">{product.icon}</span>}
//                 <span className="font-semibold text-gray-800">{product.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };


// // Main Component - PortfolioBrowser
// const PortfolioBrowser: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [selectedItem, setSelectedItem] = useState<CombinedDataItem | null>(null);
//   const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false);
//   const [viewMode, setViewMode] = useState<'card' | 'list' | 'tree'>('card'); // Added 'tree' view
//   const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

//   const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   }, []);

//   const handleItemClick = useCallback((item: CombinedDataItem) => {
//     setSelectedItem(item);
//     setIsRightBarOpen(true);
//     setNotification({ message: `Viewing details for: ${item.label}`, type: 'info' });
//   }, []);

//   const closeRightBar = useCallback(() => {
//     setIsRightBarOpen(false);
//     setSelectedItem(null);
//   }, []);

//   const closeNotification = useCallback(() => {
//     setNotification(null);
//   }, []);

//   const toggleCategory = useCallback((categoryId: string) => {
//     setExpandedCategories(prev => {
//       const newExpanded = new Set(prev);
//       if (newExpanded.has(categoryId)) {
//         newExpanded.delete(categoryId);
//       } else {
//         newExpanded.add(categoryId);
//       }
//       return newExpanded;
//     });
//   }, []);

//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return allData;
//     }
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     return allData.filter(item =>
//       item.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//       (item.description && item.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
//       (item.type === "category" && item.subcategories?.some(sub =>
//         sub.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//         sub.products?.some(prod => prod.label.toLowerCase().includes(lowerCaseSearchTerm))
//       )) ||
//       (item.type === "subcategory" && item.products?.some(prod => prod.label.toLowerCase().includes(lowerCaseSearchTerm)))
//     );
//   }, [searchTerm]);

//   const renderItem = useCallback((item: CombinedDataItem, level: number = 0) => {
//     const isCategory = item.type === "category";
//     const isSubCategory = item.type === "subcategory";
//     const isProduct = item.type === "product";
//     const isExpanded = isCategory && expandedCategories.has(item.id);

//     const marginLeft = level * 20; // Indentation for tree view

//     return (
//       <div key={item.id} className="mb-2">
//         <div
//           className={`p-3 rounded-md cursor-pointer flex items-center justify-between transition-colors duration-200
//             ${isCategory ? 'bg-blue-100 hover:bg-blue-200 font-bold' : isSubCategory ? 'bg-purple-100 hover:bg-purple-200 ml-4' : 'bg-white hover:bg-gray-100 ml-8 shadow-sm border border-gray-200'}`}
//             style={{ marginLeft: `${marginLeft}px` }}
//           onClick={() => isCategory ? toggleCategory(item.id) : handleItemClick(item)}
//         >
//           <div className="flex items-center">
//             {item.icon && <span className="mr-2 text-gray-600">{item.icon}</span>}
//             <span>{item.label}</span>
//           </div>
//           {isCategory && (
//             <span className="text-gray-500">
//               {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
//             </span>
//           )}
//         </div>
//         {isCategory && isExpanded && item.subcategories && (
//           <div className="mt-2">
//             {item.subcategories.map(sub => renderItem(sub, level + 1))}
//           </div>
//         )}
//         {isSubCategory && isExpanded && item.products && ( // Assuming subcategories can be expanded in tree view
//           <div className="mt-2">
//             {item.products.map(product => renderItem(product, level + 2))}
//           </div>
//         )}
//         {/* For products in list/card view, clicking already shows details. No further nesting. */}
//       </div>
//     );
//   }, [handleItemClick, expandedCategories, toggleCategory]);


//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={closeNotification}
//         />
//       )}

//       {/* Top Bar / Header */}
//       <header className="bg-white shadow p-4 flex items-center justify-between z-10">
//         <h1 className="text-3xl font-bold text-gray-800">Excellencia Portfolio</h1>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setViewMode('card')}
//               className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition-colors`}
//               title="Card View"
//             >
//               <FiGrid className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition-colors`}
//               title="List View"
//             >
//               <FiList className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('tree')}
//               className={`p-2 rounded-md ${viewMode === 'tree' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition-colors`}
//               title="Tree View"
//             >
//               <FiAlignJustify className="h-5 w-5" /> {/* Using a suitable icon for tree view */}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Content - Filters & Main Display */}
//         <main className={`flex-1 p-6 overflow-y-auto ${isRightBarOpen ? 'w-2/3' : 'w-full'}`}>
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Offerings</h2>
//             <div className={viewMode === 'card' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
//               {filteredData.length > 0 ? (
//                 filteredData.map(item => {
//                   // Only render top-level categories and filterable items directly in card/list view
//                   if (item.type === "category" || item.type === "industry" || item.type === "companySize") {
//                     if (viewMode === 'card') {
//                       return (
//                         <div
//                           key={item.id}
//                           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
//                           onClick={() => handleItemClick(item)}
//                         >
//                           <div>
//                             <div className="flex items-center mb-3 text-blue-600">
//                               {item.icon && <span className="mr-3 text-3xl">{item.icon}</span>}
//                               <h3 className="text-xl font-semibold">{item.label}</h3>
//                             </div>
//                             <p className="text-gray-600 text-sm mb-4">{item.description}</p>
//                           </div>
//                           <div className="text-right text-sm text-gray-500">
//                             {item.type === 'category' ? 'Category' : item.type === 'industry' ? 'Industry' : 'Company Size'}
//                           </div>
//                         </div>
//                       );
//                     } else if (viewMode === 'list') {
//                       return (
//                         <div
//                           key={item.id}
//                           className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-between"
//                           onClick={() => handleItemClick(item)}
//                         >
//                           <div className="flex items-center">
//                             {item.icon && <span className="mr-3 text-xl text-blue-600">{item.icon}</span>}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-800">{item.label}</h3>
//                               <p className="text-gray-600 text-sm">{item.description}</p>
//                             </div>
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             {item.type === 'category' ? 'Category' : item.type === 'industry' ? 'Industry' : 'Company Size'}
//                           </span>
//                         </div>
//                       );
//                     }
//                   }
//                   return null;
//                 })
//               ) : (
//                 <p className="text-gray-600">No items found matching your search.</p>
//               )}
//             </div>

//             {viewMode === 'tree' && (
//               <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Tree View</h3>
//                 <div className="space-y-2">
//                   {allData
//                     .filter(item => item.type === "category" || item.type === "industry" || item.type === "companySize")
//                     .map(item => renderItem(item))}
//                 </div>
//               </div>
//             )}

//           </section>
//         </main>

//         {/* Right Bar */}
//         {isRightBarOpen && (
//           <RightBarDetail item={selectedItem} onClose={closeRightBar} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PortfolioBrowser;


// import { useState, useCallback, useMemo, useEffect } from "react";
// import {
//   FiRefreshCw,
//   FiChevronRight,
//   FiChevronDown,
//   FiGrid,
//   FiShoppingCart,
//   FiDollarSign,
//   FiX,
//   FiPackage,
//   FiLayers,
//   FiSearch,
//   FiInfo,
//   FiBookmark,
//   FiBriefcase,
//   FiGlobe,
//   FiTrendingUp,
//   FiBox,
//   FiActivity,
//   FiTarget,
//   FiMapPin,
//   FiCpu,
//   FiList,
//   FiPlus,
//   FiCheckCircle,
//   FiStar, // New icon for selected state
//   FiSun, // Icon for light mode
//   FiMoon,
//   FiChevronUp, // Icon for dark mode
// } from "react-icons/fi";
// import { CgMenuGridR } from "react-icons/cg";

// // Types
// type SubCategory = {
//   id: string;
//   label: string;
//   type: "product" | "subcategory";
//   products?: Item[];
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   type: "category";
//   subcategories?: SubCategory[];
//   description?: string;
// };

// type Item = {
//   id: string;
//   label: string;
//   icon?: React.ReactNode;
//   color?: string;
//   type: "industry" | "companySize" | "product";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type CombinedDataItem = CategoryItem | Item | SubCategory;

// // Data (Keeping your extended data, adding more descriptions for depth)
// const allData: CombinedDataItem[] = [
//   // Portfolio Categories
//   {
//     id: "excellence",
//     label: "Excellencia S/Excellencia Cloud",
//     type: "category",
//     description:
//       "Our flagship cloud offerings for comprehensive business solutions, designed for unparalleled performance and scalability.",
//   },
//   {
//     id: "ai",
//     label: "Artificial Intelligence",
//     info: true,
//     type: "category",
//     description:
//       "Leverage cutting-edge AI to transform your business operations, unlock deep insights, and automate complex tasks with intelligent systems.",
//     subcategories: [
//       {
//         id: "ai_platform",
//         label: "AI Platform Services",
//         type: "subcategory",
//         products: [
//           {
//             id: "ai_core",
//             label: "AI Core Engine",
//             type: "product",
//             description:
//               "The foundational AI engine for developing and deploying sophisticated machine learning models, offering robust computational power.",
//           },
//           {
//             id: "data_intelligence",
//             label: "Data Intelligence Hub",
//             type: "product",
//             description:
//               "A centralized hub for advanced data processing, real-time analysis, and predictive modeling, enabling smart, data-driven decisions.",
//           },
//         ],
//       },
//       {
//         id: "ml_solutions",
//         label: "Machine Learning Solutions",
//         type: "subcategory",
//         products: [
//           {
//             id: "predictive_analytics",
//             label: "Predictive Analytics Suite",
//             type: "product",
//             description:
//               "Powerful tools for forecasting future trends, identifying opportunities, and mitigating risks across various business domains.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     type: "category",
//     description:
//       "Innovate and integrate with our robust Business Technology Platform, providing a foundation for agile development and intelligent enterprise.",
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         type: "subcategory",
//         products: [
//           {
//             id: "app_studio",
//             label: "Excellencia App Studio",
//             type: "product",
//             description:
//               "A comprehensive low-code/no-code platform for rapid application development and deployment, empowering citizen developers and IT.",
//           },
//           {
//             id: "process_automation",
//             label: "Process Automation Suite",
//             type: "product",
//             description:
//               "Automate business processes end-to-end for increased efficiency, reduced manual effort, and improved operational agility.",
//           },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         type: "subcategory",
//         products: [
//           {
//             id: "data_warehouse",
//             label: "Excellencia Data Warehouse Cloud",
//             type: "product",
//             description:
//               "Scalable cloud-based data warehousing solution for all your data needs, offering high performance and flexibility for analytics.",
//           },
//           {
//             id: "analytics_cloud",
//             label: "Excellencia Analytics Cloud",
//             type: "product",
//             description:
//               "Integrated business intelligence, planning, and predictive analytics in the cloud, enabling informed decisions and strategic foresight.",
//           },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         type: "subcategory",
//         products: [
//           {
//             id: "data_migration",
//             label: "Excellencia Advanced Data Migration and Management by Syniti",
//             type: "product",
//             description:
//               "Robust data migration and management tools ensuring data quality, consistency, and seamless transfer across systems.",
//           },
//           {
//             id: "ariba_integration",
//             label: "Ariba Cloud Integration",
//             type: "product",
//             description:
//               "Seamless integration capabilities with Ariba cloud services for optimized procurement processes and enhanced supplier collaboration.",
//           },
//           {
//             id: "integration_suite",
//             label: "Excellencia Integration Suite",
//             type: "product",
//             description:
//               "A comprehensive suite for enterprise integration, connecting diverse applications and processes across your IT landscape.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "crm",
//     label: "CRM and Customer Experience",
//     info: true,
//     type: "category",
//     description:
//       "Optimize customer interactions and enhance their overall experience, building lasting relationships and driving loyalty.",
//     subcategories: [
//       {
//         id: "sales_cloud",
//         label: "Sales Cloud",
//         type: "subcategory",
//         products: [
//           {
//             id: "crm_sales",
//             label: "CRM Sales Automation",
//             type: "product",
//             description:
//               "Automate sales processes, manage leads, and foster strong customer relationships with a powerful sales force automation solution.",
//           },
//         ],
//       },
//       {
//         id: "service_cloud",
//         label: "Service Cloud",
//         type: "subcategory",
//         products: [
//           {
//             id: "crm_service",
//             label: "CRM Service Management",
//             type: "product",
//             description:
//               "Deliver exceptional customer service and support operations with intelligent service management tools and omnichannel capabilities.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "erp",
//     label: "Enterprise Resource Planning",
//     info: true,
//     type: "category",
//     description:
//       "Streamline your core business processes with our comprehensive ERP solutions, integrating finance, logistics, and more for efficiency.",
//     subcategories: [
//       {
//         id: "s4hana",
//         label: "S/4HANA",
//         type: "subcategory",
//         products: [
//           {
//             id: "erp_core",
//             label: "ERP Core Functions",
//             type: "product",
//             description:
//               "Next-generation ERP functionalities for finance, logistics, manufacturing, and more, leveraging in-memory computing for real-time insights.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "finance",
//     label: "Financial Management",
//     info: true,
//     type: "category",
//     description:
//       "Gain real-time financial insights and streamline your financial operations, ensuring compliance and strategic financial planning.",
//     subcategories: [
//       {
//         id: "financial_planning",
//         label: "Financial Planning",
//         type: "subcategory",
//         products: [
//           {
//             id: "fp_suite",
//             label: "Financial Planning Suite",
//             type: "product",
//             description:
//               "Tools for budgeting, forecasting, and in-depth financial analysis to drive performance and achieve financial goals.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "hcm",
//     label: "Human Capital Management",
//     info: true,
//     type: "category",
//     description:
//       "Manage your workforce effectively from hire to retire, optimizing talent management and employee experience.",
//     subcategories: [
//       {
//         id: "successfactors",
//         label: "SuccessFactors",
//         type: "subcategory",
//         products: [
//           {
//             id: "hcm_suite",
//             label: "HCM Suite",
//             type: "product",
//             description:
//               "Comprehensive human capital management solutions covering HR, payroll, talent management, and employee engagement.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "spend",
//     label: "Spend Management",
//     info: true,
//     type: "category",
//     description:
//       "Optimize spending, enhance compliance, and drive savings across your organization with integrated spend management solutions.",
//     subcategories: [
//       {
//         id: "concur",
//         label: "Concur",
//         type: "subcategory",
//         products: [
//           {
//             id: "travel_expense",
//             label: "Travel & Expense Management",
//             type: "product",
//             description:
//               "Automate travel and expense reporting for greater control, visibility, and compliance.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "scm",
//     label: "Supply Chain Management",
//     info: true,
//     type: "category",
//     description:
//       "Transform your supply chain for resilience, efficiency, and sustainability, from planning to logistics.",
//     subcategories: [
//       {
//         id: "ariba",
//         label: "Ariba",
//         type: "subcategory",
//         products: [
//           {
//             id: "procurement_suite",
//             label: "Procurement Suite",
//             type: "product",
//             description:
//               "Streamline procurement and supplier management processes for better collaboration and cost control.",
//           },
//         ],
//       },
//     ],
//   },

//   // Industries
//   {
//     id: "aerospace",
//     label: "Aerospace and Defense",
//     icon: <FiTarget />,
//     color: "bg-orange-600",
//     type: "industry",
//     description:
//       "Solutions tailored for the unique demands of the aerospace and defense sectors, ensuring precision and reliability.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Complex Manufacturing, Global Logistics, Regulatory Compliance, Project Management",
//       },
//       {
//         label: "Key Benefits",
//         value:
//           "Enhanced operational efficiency, Improved supply chain visibility, Accelerated innovation cycles, Risk mitigation",
//       },
//     ],
//   },
//   {
//     id: "automotive",
//     label: "Automotive",
//     icon: <FiActivity />,
//     color: "bg-red-600",
//     type: "industry",
//     description:
//       "Drive innovation and efficiency across the automotive value chain, from design to after-sales service.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Vehicle Production, R&D, Sales & Service, Supplier Collaboration",
//       },
//       {
//         label: "Key Benefits",
//         value: "Accelerated time-to-market, Enhanced customer satisfaction, Optimized production processes",
//       },
//     ],
//   },
//   {
//     id: "banking",
//     label: "Banking",
//     icon: <FiDollarSign />,
//     color: "bg-green-600",
//     type: "industry",
//     description:
//       "Secure and intelligent financial solutions for banking institutions, enabling digital transformation and customer-centricity.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Digital Banking, Risk Management, Core Banking Transformation, Customer Engagement",
//       },
//       {
//         label: "Key Benefits",
//         value: "Enhanced security and compliance, Improved customer experience, Operational efficiency, Fraud prevention",
//       },
//     ],
//   },
//   {
//     id: "chemicals",
//     label: "Chemicals",
//     icon: <FiBox />,
//     color: "bg-purple-600",
//     type: "industry",
//     description:
//       "Specialized management systems for chemical industries, focusing on safety, compliance, and sustainable operations.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Batch Production, Supply Chain Optimization, Environmental Health & Safety (EHS)",
//       },
//       {
//         label: "Key Benefits",
//         value: "Optimized resource utilization, Strict regulatory compliance, Improved plant safety",
//       },
//     ],
//   },
//   {
//     id: "consumer",
//     label: "Consumer Products",
//     icon: <FiShoppingCart />,
//     color: "bg-yellow-600",
//     type: "industry",
//     description:
//       "Solutions designed for consumer goods manufacturers to meet evolving customer demands and optimize market presence.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Demand Planning, Brand Management, Retail Execution, E-commerce Integration",
//       },
//       {
//         label: "Key Benefits",
//         value: "Faster time-to-market, Increased sales and brand loyalty, Efficient inventory management",
//       },
//     ],
//   },
//   {
//     id: "defense",
//     label: "Defense and Security",
//     icon: <FiBookmark />,
//     color: "bg-orange-600",
//     type: "industry",
//     description:
//       "Mission-critical software for defense and security organizations, ensuring readiness and operational excellence.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Asset Management, Project Lifecycle Management, Cybersecurity, Logistics",
//       },
//       {
//         label: "Key Benefits",
//         value: "Enhanced operational readiness, Optimized resource allocation, Secure data management",
//       },
//     ],
//   },
//   {
//     id: "education",
//     label: "Education and Research",
//     icon: <FiBookmark />,
//     color: "bg-pink-600",
//     type: "industry",
//     description:
//       "Tools for educational institutions and research organizations to foster learning, collaboration, and administrative efficiency.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Student Information Systems, Campus Operations, Research Grant Management, Alumni Relations",
//       },
//       {
//         label: "Key Benefits",
//         value: "Improved student outcomes, Streamlined administrative processes, Enhanced research capabilities",
//       },
//     ],
//   },
//   {
//     id: "engineering",
//     label: "Engineering and Construction",
//     icon: <FiGrid />,
//     color: "bg-orange-600",
//     type: "industry",
//     description:
//       "Software to manage complex engineering and construction projects, from planning and execution to asset lifecycle.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Project Planning & Control, Asset Performance Management, Field Service Management",
//       },
//       {
//         label: "Key Benefits",
//         value: "Reduced project delays and costs, Improved project visibility, Enhanced collaboration",
//       },
//     ],
//   },
//   {
//     id: "healthcare",
//     label: "Healthcare",
//     icon: <FiActivity />,
//     color: "bg-teal-600",
//     type: "industry",
//     description:
//       "Healthcare-specific management and analytics solutions, supporting patient care, operational efficiency, and regulatory compliance.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Patient Management, Clinical Trials, Supply Chain for Medical Devices/Pharma",
//       },
//       {
//         label: "Key Benefits",
//         value: "Improved patient care outcomes, Streamlined administrative workflows, Enhanced data security",
//       },
//     ],
//   },
//   {
//     id: "tech",
//     label: "High Tech",
//     icon: <FiCpu />,
//     color: "bg-cyan-600",
//     type: "industry",
//     description:
//       "Innovative solutions for high technology companies, enabling rapid product development and global market penetration.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Product Lifecycle Management, Global Supply Chain, Research & Development",
//       },
//       {
//         label: "Key Benefits",
//         value: "Faster innovation cycles, Optimized manufacturing processes, Stronger competitive edge",
//       },
//     ],
//   },
//   {
//     id: "insurance",
//     label: "Insurance",
//     icon: <FiStar />,
//     color: "bg-amber-600",
//     type: "industry",
//     description:
//       "Robust software solutions for the insurance sector, enhancing policy management, claims processing, and customer engagement.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Policy Administration, Claims Management, Customer Relationship Management",
//       },
//       {
//         label: "Key Benefits",
//         value: "Reduced processing times, Enhanced customer satisfaction, Improved risk assessment",
//       },
//     ],
//   },
//   {
//     id: "life",
//     label: "Life Sciences",
//     icon: <FiActivity />,
//     color: "bg-lime-600",
//     type: "industry",
//     description:
//       "Comprehensive solutions for pharmaceutical and biotechnology companies, supporting drug discovery to market.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Research & Development, Clinical Trials Management, Manufacturing & Quality Control",
//       },
//       {
//         label: "Key Benefits",
//         value: "Accelerated drug discovery, Compliance with GxP regulations, Improved patient safety",
//       },
//     ],
//   },
//   {
//     id: "media",
//     label: "Media",
//     icon: <FiGlobe />,
//     color: "bg-violet-600",
//     type: "industry",
//     description:
//       "Systems for media and entertainment companies, enabling content creation, distribution, and monetization.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Content Production, Rights Management, Audience Engagement, Digital Distribution",
//       },
//       {
//         label: "Key Benefits",
//         value: "Increased revenue streams, Broader audience reach, Efficient content lifecycle management",
//       },
//     ],
//   },
//   {
//     id: "mill",
//     label: "Mill Products",
//     icon: <FiBox />,
//     color: "bg-rose-600",
//     type: "industry",
//     description:
//       "Specialized software for mill products manufacturing, optimizing production, inventory, and supply chain.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Production Planning, Quality Management, Inventory Optimization, Logistics",
//       },
//       {
//         label: "Key Benefits",
//         value: "Reduced waste and scrap, Improved production efficiency, Better customer service",
//       },
//     ],
//   },
//   {
//     id: "mining",
//     label: "Mining",
//     icon: <FiMapPin />,
//     color: "bg-slate-600",
//     type: "industry",
//     description:
//       "Integrated solutions for mining operations, focusing on resource management, safety, and environmental responsibility.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Resource Planning, Safety Management, Equipment Maintenance, Environmental Compliance",
//       },
//       {
//         label: "Key Benefits",
//         value: "Increased operational efficiency, Enhanced worker safety, Sustainable resource extraction",
//       },
//     ],
//   },
//   {
//     id: "oil",
//     label: "Oil, Gas, and Energy",
//     icon: <FiActivity />,
//     color: "bg-fuchsia-600",
//     type: "industry",
//     description:
//       "Robust software for the energy sector, managing operations from exploration to distribution.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Upstream, Midstream, Downstream Operations, Asset Performance Management",
//       },
//       {
//         label: "Key Benefits",
//         value: "Optimized asset utilization, Enhanced safety protocols, Improved regulatory adherence",
//       },
//     ],
//   },
//   {
//     id: "professional",
//     label: "Professional Services",
//     icon: <FiBriefcase />,
//     color: "bg-orange-600",
//     type: "industry",
//     description:
//       "Tools for professional service firms to manage projects, resources, and client relationships effectively.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Project Profitability, Resource Utilization, Client Engagement, Billing & Invoicing",
//       },
//       {
//         label: "Key Benefits",
//         value: "Improved project delivery success, Higher client satisfaction, Enhanced employee productivity",
//       },
//     ],
//   },
//   {
//     id: "public",
//     label: "Public Sector",
//     icon: <FiGlobe />,
//     color: "bg-emerald-600",
//     type: "industry",
//     description:
//       "Solutions for government and public administration, driving efficiency, transparency, and citizen engagement.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Citizen Services, Budget Management, Public Safety, Urban Planning",
//       },
//       {
//         label: "Key Benefits",
//         value: "Enhanced public services, Greater operational transparency, Improved accountability",
//       },
//     ],
//   },
//   {
//     id: "retail",
//     label: "Retail",
//     icon: <FiShoppingCart />,
//     color: "bg-amber-600",
//     type: "industry",
//     description:
//       "Transform retail operations with solutions that enhance customer experience, optimize inventory, and drive sales.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Omnichannel Commerce, Inventory Optimization, Customer Loyalty Programs, Store Operations",
//       },
//       {
//         label: "Key Benefits",
//         value: "Personalized shopping experience, Increased sales and profitability, Efficient supply chain",
//       },
//     ],
//   },
//   {
//     id: "sports",
//     label: "Sports and Entertainment",
//     icon: <FiTarget />,
//     color: "bg-red-600",
//     type: "industry",
//     description:
//       "Management systems for sports and entertainment entities, enhancing fan engagement and event operations.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Event Management, Fan Engagement, Venue Operations, Sponsorship Management",
//       },
//       {
//         label: "Key Benefits",
//         value: "Enhanced fan experience, Optimized event revenue, Streamlined venue operations",
//       },
//     ],
//   },
//   {
//     id: "telecom",
//     label: "Telecommunications",
//     icon: <FiActivity />,
//     color: "bg-orange-600",
//     type: "industry",
//     description:
//       "Advanced solutions for telecommunications providers, supporting network management, billing, and customer services.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Network Management, Customer Billing, Service Provisioning, Digital Transformation",
//       },
//       {
//         label: "Key Benefits",
//         value: "Improved service quality, Faster network deployment, Enhanced customer loyalty",
//       },
//     ],
//   },
//   {
//     id: "travel",
//     label: "Travel and Transportation",
//     icon: <FiMapPin />,
//     color: "bg-green-600",
//     type: "industry",
//     description:
//       "Software for travel and logistics businesses, optimizing operations and enhancing traveler experience.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Passenger Experience, Logistics & Freight, Fleet Management, Route Optimization",
//       },
//       {
//         label: "Key Benefits",
//         value: "Streamlined operations, Enhanced customer satisfaction, Reduced operational costs",
//       },
//     ],
//   },
//   {
//     id: "utilities",
//     label: "Utilities",
//     icon: <FiActivity />,
//     color: "bg-orange-600",
//     type: "industry",
//     description:
//       "Comprehensive systems for utility companies, managing infrastructure, services, and customer relations.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Smart Grid Management, Asset Management, Customer Billing, Field Service",
//       },
//       {
//         label: "Key Benefits",
//         value: "Efficient resource management, Reliable service delivery, Improved regulatory compliance",
//       },
//     ],
//   },
//   {
//     id: "wholesale",
//     label: "Wholesale Distribution",
//     icon: <FiTrendingUp />,
//     color: "bg-purple-600",
//     type: "industry",
//     description:
//       "Solutions for wholesale distribution businesses, enhancing inventory management, order fulfillment, and supplier relationships.",
//     details: [
//       {
//         label: "Focus Areas",
//         value: "Inventory Management, Order Fulfillment, Supplier Relationship Management, Warehouse Operations",
//       },
//       {
//         label: "Key Benefits",
//         value: "Optimized inventory levels, Faster order processing, Improved customer service",
//       },
//     ],
//   },

//   // Company Sizes
//   {
//     id: "small",
//     label: "Small Businesses",
//     icon: <FiInfo />,
//     color: "bg-green-600",
//     type: "companySize",
//     description:
//       "Tailored solutions designed for small businesses to grow efficiently and effectively.",
//     details: [
//       {
//         label: "Typical Challenges",
//         value: "Limited resources, Scalability, Market penetration, Digital presence",
//       },
//       {
//         label: "Our Approach",
//         value: "Cost-effective, User-friendly, Quick implementation, Integrated solutions",
//       },
//     ],
//   },
//   {
//     id: "midsize",
//     label: "Midsize Companies",
//     icon: <FiInfo />,
//     color: "bg-yellow-600",
//     type: "companySize",
//     description:
//       "Flexible and scalable solutions for growing midsize companies, supporting expansion and operational excellence.",
//     details: [
//       {
//         label: "Typical Challenges",
//         value: "Rapid growth management, Process optimization, Talent acquisition & retention, Data silos",
//       },
//       {
//         label: "Our Approach",
//         value: "Modular and scalable, Industry-specific, Cloud-first, Data-driven insights",
//       },
//     ],
//   },
//   {
//     id: "large",
//     label: "Large Enterprise",
//     icon: <FiInfo />,
//     color: "bg-orange-600",
//     type: "companySize",
//     description:
//       "Robust and comprehensive solutions for large-scale enterprises, enabling complex operations and global digital transformation.",
//     details: [
//       {
//         label: "Typical Challenges",
//         value: "Global operations, Complex integrations, Regulatory compliance, Legacy system modernization",
//       },
//       {
//         label: "Our Approach",
//         value: "Comprehensive suites, Highly customizable, Secure and compliant, AI-powered automation",
//       },
//     ],
//   },
// ];

// export default function Candybox() {
//   // State
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<
//     Record<string, boolean>
//   >({
//     btp: true, // Open the Business Technology Platform category by default
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState<"list" | "card">("card"); // 'list' or 'card'
//   const [isRightBarOpen, setIsRightBarOpen] = useState(false);
//   const [selectedItemForRightBar, setSelectedItemForRightBar] =
//     useState<CombinedDataItem | null>(null);
//   const [theme, setTheme] = useState<"light" | "dark">("light"); // Theme state

//   // Effect to apply theme to body
//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//   }, [theme]);

//   // Handlers
//   const toggleSelection = useCallback((itemId: string) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
//     );
//   }, []);

//   const toggleCategoryExpand = useCallback((categoryId: string) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   }, []);

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   const removeSelectedItem = useCallback(
//     (item: string) => {
//       toggleSelection(item);
//       if (selectedItemForRightBar?.id === item) {
//         setIsRightBarOpen(false);
//         setSelectedItemForRightBar(null);
//       }
//     },
//     [toggleSelection, selectedItemForRightBar],
//   );

//   const resetAllSelections = useCallback(() => {
//     setSelectedItems([]);
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//   }, []);

//   const handleItemClickForRightBar = useCallback((item: CombinedDataItem) => {
//     setSelectedItemForRightBar(item);
//     setIsRightBarOpen(true);
//   }, []);

//   const closeRightBar = useCallback(() => {
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//   }, []);

//   const toggleTheme = useCallback(() => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   }, []);

//   // Filtered data based on search and selections
//   const filteredData = useMemo(() => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     return allData.filter((item) => {
//       const matchesSearch = item.label.toLowerCase().includes(lowerCaseSearchTerm);

//       if (item.type === "category" && item.subcategories) {
//         const matchesSubcategoryOrProduct = item.subcategories.some(
//           (sub) =>
//             sub.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//             (sub.products &&
//               sub.products.some((prod) =>
//                 prod.label.toLowerCase().includes(lowerCaseSearchTerm),
//               )),
//         );
//         return matchesSearch || matchesSubcategoryOrProduct;
//       }
//       return matchesSearch;
//     });
//   }, [searchTerm]);

//   const portfolioCategories = useMemo(
//     () => filteredData.filter((item): item is CategoryItem => item.type === "category"),
//     [filteredData],
//   );
//   const industriesData = useMemo(
//     () => filteredData.filter((item): item is Item => item.type === "industry"),
//     [filteredData],
//   );
//   const companySizesData = useMemo(
//     () => filteredData.filter((item): item is Item => item.type === "companySize"),
//     [filteredData],
//   );

//   const selectedItemsDetails = useMemo(() => {
//     return selectedItems
//       .map((id) => allData.find((item) => item.id === id))
//       .filter(Boolean) as CombinedDataItem[];
//   }, [selectedItems]);

//   // Determine theme-dependent classes
//   const getThemeClasses = (
//     lightClass: string,
//     darkClass: string,
//     baseClass: string = "",
//   ) => {
//     return `${baseClass} ${theme === "light" ? lightClass : darkClass}`;
//   };

//   // Component for Right Bar Info
//   const RightBarInfo = ({
//     item,
//     onClose,
//   }: {
//     item: CombinedDataItem | null;
//     onClose: () => void;
//   }) => {
//     if (!item) return null;

//     const isSelected = selectedItems.includes(item.id);

//     return (
//       <div
//         className={getThemeClasses(
//           "bg-white border-gray-100 shadow-xl",
//           "bg-gray-800 border-gray-700 shadow-xl-dark",
//           "absolute right-0 top-0 h-full w-1/3 border-l p-8 overflow-y-auto transform transition-transform duration-300 ease-out z-20",
//         )}
//       >
//         <div
//           className={getThemeClasses(
//             "border-b-gray-200",
//             "border-b-gray-700",
//             "flex justify-between items-center mb-6 pb-4 border-b",
//           )}
//         >
//           <h3 className={getThemeClasses("text-gray-800", "text-white", "text-2xl font-extrabold")}>
//             Details View
//           </h3>
//           <button
//             onClick={onClose}
//             className={getThemeClasses(
//               "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
//               "text-gray-800 hover:text-white hover:bg-gray-700",
//               "p-2 rounded-full transition-colors duration-200",
//             )}
//             aria-label="Close details"
//           >
//             <FiX className="w-7 h-7" />
//           </button>
//         </div>

//         <div className="space-y-6">
//           <div className="flex items-center space-x-4 mb-4">
//             {item.type !== "category" &&
//             "icon" in item &&
//             item.icon &&
//             "color" in item &&
//             item.color ? (
//               <div className={`p-3 rounded-xl ${item.color} text-white shadow-md`}>
//                 {item.icon}
//               </div>
//             ) : (
//               <FiLayers className="text-orange-500 w-10 h-10" />
//             )}
//             <h2 className={getThemeClasses("text-gray-900", "text-white", "text-3xl font-bold leading-tight")}>
//               {item.label}
//             </h2>
//           </div>

//           {"description" in item && item.description && (
//             <div
//               className={getThemeClasses(
//                 "bg-gray-50 border-gray-100",
//                 "bg-gray-700 border-gray-600",
//                 "p-4 rounded-lg border",
//               )}
//             >
//               <p className={getThemeClasses("text-gray-800", "text-gray-200", "text-lg")}>
//                 {item.description}
//               </p>
//             </div>
//           )}

//           {item.type === "category" &&
//             "subcategories" in item &&
//             item.subcategories &&
//             item.subcategories.length > 0 && (
//               <div className="mt-6">
//                 <h4 className={getThemeClasses("text-gray-700", "text-gray-200", "font-bold mb-4 text-xl")}>
//                   Category Breakdown:
//                 </h4>
//                 <div className="space-y-4">
//                   {item.subcategories.map((sub) => (
//                     <div
//                       key={sub.id}
//                       className={getThemeClasses(
//                         "bg-gray-50 shadow-sm border-gray-200",
//                         "bg-gray-700 shadow-sm-dark border-gray-600",
//                         "p-4 rounded-lg border",
//                       )}
//                     >
//                       <p className={getThemeClasses("text-gray-800", "text-gray-100", "font-semibold text-lg flex items-center")}>
//                         <FiChevronRight className="mr-2 text-orange-500" /> {sub.label}
//                       </p>
//                       {sub.products && sub.products.length > 0 && (
//                         <div className="ml-6 mt-3 space-y-2">
//                           <h5 className={getThemeClasses("text-gray-600 border-gray-200", "text-gray-300 border-gray-600", "font-medium text-md mb-2 border-b pb-1")}>
//                             Associated Products:
//                           </h5>
//                           <ul className="list-none space-y-2">
//                             {sub.products.map((prod) => (
//                               <li key={prod.id} className={getThemeClasses("text-gray-700", "text-gray-300", "flex items-start text-sm")}>
//                                 <FiCheckCircle className="mr-2 mt-1 text-green-500 flex-shrink-0" />
//                                 <div>
//                                   <strong className={getThemeClasses("text-gray-900", "text-white")}>
//                                     {prod.label}:
//                                   </strong>{" "}
//                                   {prod.description ||
//                                     "Detailed product information forthcoming."}
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           {item.type !== "category" &&
//             "details" in item &&
//             item.details &&
//             item.details.length > 0 && (
//               <div className="mt-6">
//                 <h4 className={getThemeClasses("text-gray-700", "text-gray-200", "font-bold mb-4 text-xl")}>
//                   Key Aspects:
//                 </h4>
//                 <dl className="space-y-3">
//                   {item.details.map((detail, index) => (
//                     <div key={index} className="flex items-start">
//                       <span className="font-semibold text-orange-500 mr-2 min-w-[100px]">
//                         {detail.label}:
//                       </span>
//                       <dd className={getThemeClasses("text-gray-700", "text-gray-300", "flex-1")}>
//                         {detail.value}
//                       </dd>
//                     </div>
//                   ))}
//                 </dl>
//               </div>
//             )}

//           <div
//             className={getThemeClasses(
//               "border-t-gray-200",
//               "border-t-gray-700",
//               "mt-8 pt-6 border-t flex justify-end",
//             )}
//           >
//             <button
//               className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ease-in-out
//                 ${
//                   isSelected
//                     ? "bg-red-500 hover:bg-red-600 focus:ring-red-300"
//                     : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-300"
//                 }
//                 transform hover:scale-105 focus:outline-none focus:ring-4`}
//               onClick={() => {
//                 toggleSelection(item.id);
//                 // Optionally keep the bar open or close it
//                 // onClose();
//               }}
//             >
//               {isSelected ? "Remove from Selections" : "Add to Selections"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // BTP Category view component - integrated directly for simplicity given its static nature
//   const BTPCategoryView = () => (
//     <div
//       className={getThemeClasses(
//         "border-gray-200 bg-gray-50",
//         "border-gray-700 bg-gray-900",
//         "rounded-xl mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200",
//       )}
//     >
//       <div
//         className={getThemeClasses(
//           "bg-amber-50",
//           "bg-gray-800",
//           "flex items-center p-4 rounded-t-xl cursor-pointer",
//         )}
//         onClick={() => toggleCategoryExpand("btp")}
//       >
//         <div className="flex items-center flex-grow">
//           <input
//             type="checkbox"
//             id="category-btp"
//             checked={selectedItems.includes("btp")}
//             onChange={(e) => {
//               e.stopPropagation();
//               toggleSelection("btp");
//             }}
//             className="form-checkbox h-5 w-5 text-orange-600 rounded-md mr-3 border-gray-300 focus:ring-orange-500"
//           />
//           <label
//             htmlFor="category-btp"
//             className={getThemeClasses("text-gray-800", "text-white", "font-extrabold text-lg flex items-center cursor-pointer")}
//           >
//             <FiPackage className="text-amber-600 mr-2 w-6 h-6" />
//             Business Technology Platform
//           </label>
//         </div>
//         <div className={getThemeClasses("text-gray-600", "text-gray-800", "flex items-center text-sm")}>
//           <span className="mr-2">Subcategories & Products</span>
//           {expandedCategories["btp"] ? (
//             <FiChevronDown className="w-5 h-5 transition-transform duration-200 transform rotate-180" />
//           ) : (
//             <FiChevronRight className="w-5 h-5 transition-transform duration-200" />
//           )}
//         </div>
//       </div>

//       {expandedCategories["btp"] && (
//         <div
//           className={getThemeClasses(
//             "border-t-gray-200",
//             "border-t-gray-700",
//             "p-4 border-t",
//           )}
//         >
//           {allData
//             .find((item) => item.id === "btp")
//             ?.["subcategories"]?.map(
//               (subcategory) =>
//                 subcategory.type === "subcategory" && (
//                   <div key={subcategory.id} className="mb-4 last:mb-0">
//                     <h4 className={getThemeClasses("text-gray-700", "text-gray-200", "font-semibold text-md mb-2 flex items-center")}>
//                       <FiChevronRight className="mr-2 text-orange-500" />
//                       {subcategory.label}
//                     </h4>
//                     {subcategory.products && (
//                       <ul className="list-disc list-inside ml-6 space-y-1">
//                         {subcategory.products.map((product) => (
//                           <li key={product.id} className={getThemeClasses("text-gray-600", "text-gray-300", "text-sm")}>
//                             {product.label}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ),
//             )}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div
//       className={getThemeClasses(
//         "bg-gray-100 text-gray-900",
//         "bg-gray-900 text-gray-100",
//         "min-h-screen font-sans antialiased flex",
//       )}
//     >
//       {/* Left Sidebar */}
//       <div
//         className={getThemeClasses(
//           "bg-white border-r border-gray-100",
//           "bg-gray-800 border-r border-gray-700",
//           "w-64 p-6 flex flex-col shadow-lg",
//         )}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-orange-600">Candybox</h1>
//           <button
//             onClick={toggleTheme}
//             className={getThemeClasses(
//               "text-gray-600 hover:text-gray-900",
//               "text-gray-800 hover:text-white",
//               "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
//             )}
//             title="Toggle Theme"
//           >
//             {theme === "light" ? (
//               <FiMoon className="w-6 h-6" />
//             ) : (
//               <FiSun className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6 relative">
//           <input
//             type="text"
//             placeholder="Search all items..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className={getThemeClasses(
//               "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500",
//               "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400",
//               "w-full p-3 pl-10 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all",
//             )}
//           />
//           <FiSearch
//             className={getThemeClasses(
//               "text-gray-800",
//               "text-gray-300",
//               "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5",
//             )}
//           />
//         </div>

//         {/* Selected Items */}
//         <div
//           className={getThemeClasses(
//             "border-gray-200 bg-gray-50",
//             "border-gray-700 bg-gray-900",
//             "rounded-lg p-4 mb-6 shadow-inner overflow-y-auto max-h-[200px]",
//           )}
//         >
//           <div className="flex justify-between items-center mb-3">
//             <h3 className={getThemeClasses("text-gray-700", "text-gray-200", "font-bold text-md")}>
//               Your Selections ({selectedItems.length})
//             </h3>
//             <button
//               onClick={resetAllSelections}
//               className={getThemeClasses("text-orange-600 hover:text-orange-800", "text-orange-400 hover:text-orange-200", "text-sm flex items-center transition-colors")}
//               disabled={selectedItems.length === 0}
//             >
//               <FiRefreshCw className="mr-1 w-4 h-4" /> Reset
//             </button>
//           </div>
//           {selectedItems.length === 0 ? (
//             <p className={getThemeClasses("text-gray-500", "text-gray-800", "text-sm italic")}>
//               No items selected yet.
//             </p>
//           ) : (
//             <ul className="space-y-2">
//               {selectedItemsDetails.map((item) => (
//                 <li
//                   key={item.id}
//                   className={getThemeClasses("bg-white border-gray-200", "bg-gray-800 border-gray-700", "flex justify-between items-center p-2 rounded-md shadow-sm text-sm border")}
//                 >
//                   <span className={getThemeClasses("text-gray-800", "text-gray-200")}>
//                     {item.label}
//                   </span>
//                   <button
//                     onClick={() => removeSelectedItem(item.id)}
//                     className={getThemeClasses("text-red-500 hover:text-red-700", "text-red-400 hover:text-red-600", "ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors")}
//                     aria-label={`Remove ${item.label}`}
//                   >
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 p-8 overflow-y-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className={getThemeClasses("text-gray-800", "text-white", "text-3xl font-extrabold")}>
//             Explore Our Offerings
//           </h2>
//           <div className="flex space-x-3">
//             <button
//               onClick={() => setViewMode("card")}
//               className={`${getThemeClasses(
//                 "bg-white border-gray-300 text-gray-700 hover:bg-gray-100",
//                 "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600",
//                 "p-3 rounded-xl shadow-md transition-colors",
//               )} ${viewMode === "card" ? "ring-2 ring-orange-500 border-transparent" : ""}`}
//               title="Card View"
//             >
//               <CgMenuGridR className="w-6 h-6" />
//             </button>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`${getThemeClasses(
//                 "bg-white border-gray-300 text-gray-700 hover:bg-gray-100",
//                 "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600",
//                 "p-3 rounded-xl shadow-md transition-colors",
//               )} ${viewMode === "list" ? "ring-2 ring-orange-500 border-transparent" : ""}`}
//               title="List View"
//             >
//               <FiList className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Portfolio Categories */}
//         <h3 className={getThemeClasses("text-gray-800", "text-white", "text-2xl font-bold mb-5")}>
//           Portfolio Categories
//         </h3>
//         {/* Render the specific BTP category outside the general map if it's always special */}
//         {searchTerm === "" && <BTPCategoryView />}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           {portfolioCategories.map(
//             (category) =>
//               category.id !== "btp" && ( // Exclude BTP from this general rendering
//                 <div
//                   key={category.id}
//                   className={getThemeClasses(
//                     "bg-white border-gray-200",
//                     "bg-gray-800 border-gray-700",
//                     `rounded-xl p-5 shadow-lg flex flex-col cursor-pointer transition-all duration-200 ease-in-out
//                       ${selectedItems.includes(category.id) ? "ring-2 ring-orange-500 border-transparent" : "hover:shadow-xl hover:scale-[1.02]"}`,
//                   )}
//                   onClick={() => handleItemClickForRightBar(category)}
//                 >
//                   <div className="flex items-center mb-3">
//                     <input
//                       type="checkbox"
//                       id={`category-${category.id}`}
//                       checked={selectedItems.includes(category.id)}
//                       onChange={(e) => {
//                         e.stopPropagation();
//                         toggleSelection(category.id);
//                       }}
//                       className="form-checkbox h-5 w-5 text-orange-600 rounded-md mr-3 border-gray-300 focus:ring-orange-500"
//                     />
//                     <label
//                       htmlFor={`category-${category.id}`}
//                       className={getThemeClasses("text-gray-900", "text-white", "text-xl font-extrabold cursor-pointer")}
//                     >
//                       {category.label}
//                     </label>
//                   </div>
//                   <p className={getThemeClasses("text-gray-600", "text-gray-300", "text-sm mb-4")}>
//                     {category.description}
//                   </p>
//                   <div className="mt-auto flex justify-between items-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleCategoryExpand(category.id);
//                       }}
//                       className={getThemeClasses("text-orange-600 hover:text-orange-800", "text-orange-400 hover:text-orange-200", "text-sm font-medium flex items-center transition-colors")}
//                     >
//                       {expandedCategories[category.id] ? (
//                         <>
//                           Hide Subcategories <FiChevronUp className="ml-1 w-4 h-4" />
//                         </>
//                       ) : (
//                         <>
//                           View Subcategories <FiChevronDown className="ml-1 w-4 h-4" />
//                         </>
//                       )}
//                     </button>
//                     {category.info && (
//                       <FiInfo
//                         className={getThemeClasses("text-gray-800 hover:text-gray-600", "text-gray-500 hover:text-gray-300", "w-5 h-5 cursor-pointer")}
//                         title="Click for more info"
//                       />
//                     )}
//                   </div>
//                   {expandedCategories[category.id] && category.subcategories && (
//                     <div
//                       className={getThemeClasses(
//                         "mt-4 pt-4 border-t border-gray-200",
//                         "mt-4 pt-4 border-t border-gray-700",
//                       )}
//                     >
//                       <h4 className={getThemeClasses("text-gray-700", "text-gray-200", "font-semibold mb-2")}>
//                         Subcategories:
//                       </h4>
//                       <ul className="space-y-1">
//                         {category.subcategories.map((sub) => (
//                           <li key={sub.id} className={getThemeClasses("text-gray-600", "text-gray-300", "text-sm flex items-center")}>
//                             <FiChevronRight className="mr-1 text-orange-400" /> {sub.label}
//                             {sub.products && sub.products.length > 0 && (
//                               <span className={getThemeClasses("text-gray-500", "text-gray-800", "ml-2")}>
//                                 ({sub.products.length} products)
//                               </span>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               ),
//           )}
//         </div>

//         {/* Industries */}
//         <h3 className={getThemeClasses("text-gray-800", "text-white", "text-2xl font-bold mb-5")}>
//           Industries
//         </h3>
//         <div
//           className={
//             viewMode === "card"
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               : "space-y-4"
//           }
//         >
//           {industriesData.map((item) => (
//             <div
//               key={item.id}
//               className={getThemeClasses(
//                 "bg-white border-gray-200",
//                 "bg-gray-800 border-gray-700",
//                 `rounded-xl p-5 shadow-lg flex cursor-pointer transition-all duration-200 ease-in-out
//                 ${selectedItems.includes(item.id) ? "ring-2 ring-orange-500 border-transparent" : "hover:shadow-xl hover:scale-[1.02]"}
//                 ${viewMode === "list" ? "flex-row items-center space-x-4" : "flex-col"}`,
//               )}
//               onClick={() => handleItemClickForRightBar(item)}
//             >
//               <input
//                 type="checkbox"
//                 id={`item-${item.id}`}
//                 checked={selectedItems.includes(item.id)}
//                 onChange={(e) => {
//                   e.stopPropagation();
//                   toggleSelection(item.id);
//                 }}
//                 className="form-checkbox h-5 w-5 text-orange-600 rounded-md mr-3 border-gray-300 focus:ring-orange-500"
//               />
//               <div className="flex-shrink-0">
//                 {item.icon && item.color && (
//                   <div className={`p-3 rounded-lg ${item.color} text-white shadow-md`}>
//                     {item.icon}
//                   </div>
//                 )}
//               </div>
//               <div className={`${viewMode === "list" ? "flex-grow" : "mt-4"}`}>
//                 <label
//                   htmlFor={`item-${item.id}`}
//                   className={getThemeClasses("text-gray-900", "text-white", "text-xl font-bold cursor-pointer block mb-2")}
//                 >
//                   {item.label}
//                 </label>
//                 {"description" in item && (
//                   <p className={getThemeClasses("text-gray-600", "text-gray-300", "text-sm")}>
//                     {item.description}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Company Sizes */}
//         <h3 className={getThemeClasses("text-gray-800", "text-white", "text-2xl font-bold mt-10 mb-5")}>
//           Company Sizes
//         </h3>
//         <div
//           className={
//             viewMode === "card"
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               : "space-y-4"
//           }
//         >
//           {companySizesData.map((item) => (
//             <div
//               key={item.id}
//               className={getThemeClasses(
//                 "bg-white border-gray-200",
//                 "bg-gray-800 border-gray-700",
//                 `rounded-xl p-5 shadow-lg flex cursor-pointer transition-all duration-200 ease-in-out
//                 ${selectedItems.includes(item.id) ? "ring-2 ring-orange-500 border-transparent" : "hover:shadow-xl hover:scale-[1.02]"}
//                 ${viewMode === "list" ? "flex-row items-center space-x-4" : "flex-col"}`,
//               )}
//               onClick={() => handleItemClickForRightBar(item)}
//             >
//               <input
//                 type="checkbox"
//                 id={`item-${item.id}`}
//                 checked={selectedItems.includes(item.id)}
//                 onChange={(e) => {
//                   e.stopPropagation();
//                   toggleSelection(item.id);
//                 }}
//                 className="form-checkbox h-5 w-5 text-orange-600 rounded-md mr-3 border-gray-300 focus:ring-orange-500"
//               />
//               <div className="flex-shrink-0">
//                 {item.icon && item.color && (
//                   <div className={`p-3 rounded-lg ${item.color} text-white shadow-md`}>
//                     {item.icon}
//                   </div>
//                 )}
//               </div>
//               <div className={`${viewMode === "list" ? "flex-grow" : "mt-4"}`}>
//                 <label
//                   htmlFor={`item-${item.id}`}
//                   className={getThemeClasses("text-gray-900", "text-white", "text-xl font-bold cursor-pointer block mb-2")}
//                 >
//                   {item.label}
//                 </label>
//                 {"description" in item && (
//                   <p className={getThemeClasses("text-gray-600", "text-gray-300", "text-sm")}>
//                     {item.description}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Sidebar for Details */}
//       {isRightBarOpen && (
//         <RightBarInfo item={selectedItemForRightBar} onClose={closeRightBar} />
//       )}
//     </div>
//   );
// }


// import { useState, useCallback, useMemo, useEffect } from "react";
// import {
//   FiRefreshCw,
//   FiChevronRight,
//   FiChevronDown,
//   FiGrid,
//   FiShoppingCart,
//   FiDollarSign,
//   FiX,
//   FiPackage,
//   FiLayers,
//   FiSearch,
//   FiInfo,
//   FiBookmark,
//   FiBriefcase,
//   FiGlobe,
//   FiTrendingUp,
//   FiBox,
//   FiActivity,
//   FiTarget,
//   FiMapPin,
//   FiCpu,

//   FiCheckCircle,
//   FiStar,
//   FiSun, // Icon for light mode
//   FiMoon, // Icon for dark mode
//   FiColumns, // Icon for Card View
//   FiLayout, // Icon for List View
//   FiGitBranch, // Icon for Tree View
// } from "react-icons/fi";


// // Types
// type SubCategory = {
//   id: string;
//   label: string;
//   type: "product" | "subcategory";
//   products?: Item[];
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   type: "category";
//   subcategories?: SubCategory[];
//   description?: string;
// };

// type Item = {
//   id: string;
//   label: string;
//   icon?: React.ReactNode;
//   color?: string;
//   type: "industry" | "companySize" | "product";
//   description?: string;
//   details?: { label: string; value: string | React.ReactNode }[];
// };

// type CombinedDataItem = CategoryItem | Item | SubCategory;

// // Data (Keeping your extended data, adding more descriptions for depth)
// const allData: CombinedDataItem[] = [
//   // Portfolio Categories
//   { id: "excellence", label: "Excellencia S/Excellencia Cloud", type: "category", description: "Our flagship cloud offerings for comprehensive business solutions, designed for unparalleled performance and scalability." },
//   {
//     id: "ai", label: "Artificial Intelligence", info: true, type: "category",
//     description: "Leverage cutting-edge AI to transform your business operations, unlock deep insights, and automate complex tasks with intelligent systems.",
//     subcategories: [
//       {
//         id: "ai_platform", label: "AI Platform Services", type: "subcategory",
//         products: [
//           { id: "ai_core", label: "AI Core Engine", type: "product", description: "The foundational AI engine for developing and deploying sophisticated machine learning models, offering robust computational power." },
//           { id: "data_intelligence", label: "Data Intelligence Hub", type: "product", description: "A centralized hub for advanced data processing, real-time analysis, and predictive modeling, enabling smart, data-driven decisions." }
//         ]
//       },
//       {
//         id: "ml_solutions", label: "Machine Learning Solutions", type: "subcategory",
//         products: [
//           { id: "predictive_analytics", label: "Predictive Analytics Suite", type: "product", description: "Powerful tools for forecasting future trends, identifying opportunities, and mitigating risks across various business domains." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     type: "category",
//     description: "Innovate and integrate with our robust Business Technology Platform, providing a foundation for agile development and intelligent enterprise.",
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         type: "subcategory",
//         products: [
//           { id: "app_studio", label: "Excellencia App Studio", type: "product", description: "A comprehensive low-code/no-code platform for rapid application development and deployment, empowering citizen developers and IT." },
//           { id: "process_automation", label: "Process Automation Suite", type: "product", description: "Automate business processes end-to-end for increased efficiency, reduced manual effort, and improved operational agility." },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         type: "subcategory",
//         products: [
//           { id: "data_warehouse", label: "Excellencia Data Warehouse Cloud", type: "product", description: "Scalable cloud-based data warehousing solution for all your data needs, offering high performance and flexibility for analytics." },
//           { id: "analytics_cloud", label: "Excellencia Analytics Cloud", type: "product", description: "Integrated business intelligence, planning, and predictive analytics in the cloud, enabling informed decisions and strategic foresight." },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         type: "subcategory",
//         products: [
//           { id: "data_migration", label: "Excellencia Advanced Data Migration and Management by Syniti", type: "product", description: "Robust data migration and management tools ensuring data quality, consistency, and seamless transfer across systems." },
//           { id: "ariba_integration", label: "Ariba Cloud Integration", type: "product", description: "Seamless integration capabilities with Ariba cloud services for optimized procurement processes and enhanced supplier collaboration." },
//           { id: "integration_suite", label: "Excellencia Integration Suite", type: "product", description: "A comprehensive suite for enterprise integration, connecting diverse applications and processes across your IT landscape." },
//         ],
//       },
//     ],
//   },
//   {
//     id: "crm", label: "CRM and Customer Experience", info: true, type: "category",
//     description: "Optimize customer interactions and enhance their overall experience, building lasting relationships and driving loyalty.",
//     subcategories: [
//       { id: "sales_cloud", label: "Sales Cloud", type: "subcategory", products: [{ id: "crm_sales", label: "CRM Sales Automation", type: "product", description: "Automate sales processes, manage leads, and foster strong customer relationships with a powerful sales force automation solution." }] },
//       { id: "service_cloud", label: "Service Cloud", type: "subcategory", products: [{ id: "crm_service", label: "CRM Service Management", type: "product", description: "Deliver exceptional customer service and support operations with intelligent service management tools and omnichannel capabilities." }] },
//     ]
//   },
//   {
//     id: "erp", label: "Enterprise Resource Planning", info: true, type: "category",
//     description: "Streamline your core business processes with our comprehensive ERP solutions, integrating finance, logistics, and more for efficiency.",
//     subcategories: [
//       { id: "s4hana", label: "S/4HANA", type: "subcategory", products: [{ id: "erp_core", label: "ERP Core Functions", type: "product", description: "Next-generation ERP functionalities for finance, logistics, manufacturing, and more, leveraging in-memory computing for real-time insights." }] }
//     ]
//   },
//   {
//     id: "finance", label: "Financial Management", info: true, type: "category",
//     description: "Gain real-time financial insights and streamline your financial operations, ensuring compliance and strategic financial planning.",
//     subcategories: [
//       { id: "financial_planning", label: "Financial Planning", type: "subcategory", products: [{ id: "fp_suite", label: "Financial Planning Suite", type: "product", description: "Tools for budgeting, forecasting, and in-depth financial analysis to drive performance and achieve financial goals." }] }
//     ]
//   },
//   {
//     id: "hcm", label: "Human Capital Management", info: true, type: "category",
//     description: "Manage your workforce effectively from hire to retire, optimizing talent management and employee experience.",
//     subcategories: [
//       { id: "successfactors", label: "SuccessFactors", type: "subcategory", products: [{ id: "hcm_suite", label: "HCM Suite", type: "product", description: "Comprehensive human capital management solutions covering HR, payroll, talent management, and employee engagement." }] }
//     ]
//   },
//   {
//     id: "spend", label: "Spend Management", info: true, type: "category",
//     description: "Optimize spending, enhance compliance, and drive savings across your organization with integrated spend management solutions.",
//     subcategories: [
//       { id: "concur", label: "Concur", type: "subcategory", products: [{ id: "travel_expense", label: "Travel & Expense Management", type: "product", description: "Automate travel and expense reporting for greater control, visibility, and compliance." }] }
//     ]
//   },
//   {
//     id: "scm", label: "Supply Chain Management", info: true, type: "category",
//     description: "Transform your supply chain for resilience, efficiency, and sustainability, from planning to logistics.",
//     subcategories: [
//       { id: "ariba", label: "Ariba", type: "subcategory", products: [{ id: "procurement_suite", label: "Procurement Suite", type: "product", description: "Streamline procurement and supplier management processes for better collaboration and cost control." }] }
//     ]
//   },

//   // Industries
//   {
//     id: "aerospace", label: "Aerospace and Defense", icon: <FiTarget />, color: "bg-blue-600", type: "industry", description: "Solutions tailored for the unique demands of the aerospace and defense sectors, ensuring precision and reliability.",
//     details: [
//       { label: "Focus Areas", value: "Complex Manufacturing, Global Logistics, Regulatory Compliance, Project Management" },
//       { label: "Key Benefits", value: "Enhanced operational efficiency, Improved supply chain visibility, Accelerated innovation cycles, Risk mitigation" }
//     ]
//   },
//   {
//     id: "automotive", label: "Automotive", icon: <FiActivity />, color: "bg-red-600", type: "industry", description: "Drive innovation and efficiency across the automotive value chain, from design to after-sales service.",
//     details: [
//       { label: "Focus Areas", value: "Vehicle Production, R&D, Sales & Service, Supplier Collaboration" },
//       { label: "Key Benefits", value: "Accelerated time-to-market, Enhanced customer satisfaction, Optimized production processes" }
//     ]
//   },
//   {
//     id: "banking", label: "Banking", icon: <FiDollarSign />, color: "bg-green-600", type: "industry", description: "Secure and intelligent financial solutions for banking institutions, enabling digital transformation and customer-centricity.",
//     details: [
//       { label: "Focus Areas", value: "Digital Banking, Risk Management, Core Banking Transformation, Customer Engagement" },
//       { label: "Key Benefits", value: "Enhanced security and compliance, Improved customer experience, Operational efficiency, Fraud prevention" }
//     ]
//   },
//   {
//     id: "chemicals", label: "Chemicals", icon: <FiBox />, color: "bg-purple-600", type: "industry", description: "Specialized management systems for chemical industries, focusing on safety, compliance, and sustainable operations.",
//     details: [
//       { label: "Focus Areas", value: "Batch Production, Supply Chain Optimization, Environmental Health & Safety (EHS)" },
//       { label: "Key Benefits", value: "Optimized resource utilization, Strict regulatory compliance, Improved plant safety" }
//     ]
//   },
//   {
//     id: "consumer", label: "Consumer Products", icon: <FiShoppingCart />, color: "bg-yellow-600", type: "industry", description: "Solutions designed for consumer goods manufacturers to meet evolving customer demands and optimize market presence.",
//     details: [
//       { label: "Focus Areas", value: "Demand Planning, Brand Management, Retail Execution, E-commerce Integration" },
//       { label: "Key Benefits", value: "Faster time-to-market, Increased sales and brand loyalty, Efficient inventory management" }
//     ]
//   },
//   {
//     id: "defense", label: "Defense and Security", icon: <FiBookmark />, color: "bg-indigo-600", type: "industry", description: "Mission-critical software for defense and security organizations, ensuring readiness and operational excellence.",
//     details: [
//       { label: "Focus Areas", value: "Asset Management, Project Lifecycle Management, Cybersecurity, Logistics" },
//       { label: "Key Benefits", value: "Enhanced operational readiness, Optimized resource allocation, Secure data management" }
//     ]
//   },
//   {
//     id: "education", label: "Education and Research", icon: <FiBookmark />, color: "bg-pink-600", type: "industry", description: "Tools for educational institutions and research organizations to foster learning, collaboration, and administrative efficiency.",
//     details: [
//       { label: "Focus Areas", value: "Student Information Systems, Campus Operations, Research Grant Management, Alumni Relations" },
//       { label: "Key Benefits", value: "Improved student outcomes, Streamlined administrative processes, Enhanced research capabilities" }
//     ]
//   },
//   {
//     id: "engineering", label: "Engineering and Construction", icon: <FiGrid />, color: "bg-orange-600", type: "industry", description: "Software to manage complex engineering and construction projects, from planning and execution to asset lifecycle.",
//     details: [
//       { label: "Focus Areas", value: "Project Planning & Control, Asset Performance Management, Field Service Management" },
//       { label: "Key Benefits", value: "Reduced project delays and costs, Improved project visibility, Enhanced collaboration" }
//     ]
//   },
//   {
//     id: "healthcare", label: "Healthcare", icon: <FiActivity />, color: "bg-teal-600", type: "industry", description: "Healthcare-specific management and analytics solutions, supporting patient care, operational efficiency, and regulatory compliance.",
//     details: [
//       { label: "Focus Areas", value: "Patient Management, Clinical Trials, Supply Chain for Medical Devices/Pharma" },
//       { label: "Key Benefits", value: "Improved patient care outcomes, Streamlined administrative workflows, Enhanced data security" }
//     ]
//   },
//   {
//     id: "tech", label: "High Tech", icon: <FiCpu />, color: "bg-cyan-600", type: "industry", description: "Innovative solutions for high technology companies, enabling rapid product development and global market penetration.",
//     details: [
//       { label: "Focus Areas", value: "Product Lifecycle Management, Global Supply Chain, Research & Development" },
//       { label: "Key Benefits", value: "Faster innovation cycles, Optimized manufacturing processes, Stronger competitive edge" }
//     ]
//   },
//   {
//     id: "insurance", label: "Insurance", icon: <FiStar />, color: "bg-amber-600", type: "industry", description: "Robust software solutions for the insurance sector, enhancing policy management, claims processing, and customer engagement.",
//     details: [
//       { label: "Focus Areas", value: "Policy Administration, Claims Management, Customer Relationship Management" },
//       { label: "Key Benefits", value: "Reduced processing times, Enhanced customer satisfaction, Improved risk assessment" }
//     ]
//   },
//   {
//     id: "life", label: "Life Sciences", icon: <FiActivity />, color: "bg-lime-600", type: "industry", description: "Comprehensive solutions for pharmaceutical and biotechnology companies, supporting drug discovery to market.",
//     details: [
//       { label: "Focus Areas", value: "Research & Development, Clinical Trials Management, Manufacturing & Quality Control" },
//       { label: "Key Benefits", value: "Accelerated drug discovery, Compliance with GxP regulations, Improved patient safety" }
//     ]
//   },
//   {
//     id: "media", label: "Media", icon: <FiGlobe />, color: "bg-violet-600", type: "industry", description: "Systems for media and entertainment companies, enabling content creation, distribution, and monetization.",
//     details: [
//       { label: "Focus Areas", value: "Content Production, Rights Management, Audience Engagement, Digital Distribution" },
//       { label: "Key Benefits", value: "Increased revenue streams, Broader audience reach, Efficient content lifecycle management" }
//     ]
//   },
//   {
//     id: "mill", label: "Mill Products", icon: <FiBox />, color: "bg-rose-600", type: "industry", description: "Specialized software for mill products manufacturing, optimizing production, inventory, and supply chain.",
//     details: [
//       { label: "Focus Areas", value: "Production Planning, Quality Management, Inventory Optimization, Logistics" },
//       { label: "Key Benefits", value: "Reduced waste and scrap, Improved production efficiency, Better customer service" }
//     ]
//   },
//   {
//     id: "mining", label: "Mining", icon: <FiMapPin />, color: "bg-slate-600", type: "industry", description: "Integrated solutions for mining operations, focusing on resource management, safety, and environmental responsibility.",
//     details: [
//       { label: "Focus Areas", value: "Resource Planning, Safety Management, Equipment Maintenance, Environmental Compliance" },
//       { label: "Key Benefits", value: "Increased operational efficiency, Enhanced worker safety, Sustainable resource extraction" }
//     ]
//   },
//   {
//     id: "oil", label: "Oil, Gas, and Energy", icon: <FiActivity />, color: "bg-fuchsia-600", type: "industry", description: "Robust software for the energy sector, managing operations from exploration to distribution.",
//     details: [
//       { label: "Focus Areas", value: "Upstream, Midstream, Downstream Operations, Asset Performance Management" },
//       { label: "Key Benefits", value: "Optimized asset utilization, Enhanced safety protocols, Improved regulatory adherence" }
//     ]
//   },
//   {
//     id: "professional", label: "Professional Services", icon: <FiBriefcase />, color: "bg-blue-600", type: "industry", description: "Tools for professional service firms to manage projects, resources, and client relationships effectively.",
//     details: [
//       { label: "Focus Areas", value: "Project Profitability, Resource Utilization, Client Engagement, Billing & Invoicing" },
//       { label: "Key Benefits", value: "Improved project delivery success, Higher client satisfaction, Enhanced employee productivity" }
//     ]
//   },
//   {
//     id: "public", label: "Public Sector", icon: <FiGlobe />, color: "bg-emerald-600", type: "industry", description: "Solutions for government and public administration, driving efficiency, transparency, and citizen engagement.",
//     details: [
//       { label: "Focus Areas", value: "Citizen Services, Budget Management, Public Safety, Urban Planning" },
//       { label: "Key Benefits", value: "Enhanced public services, Greater operational transparency, Improved accountability" }
//     ]
//   },
//   {
//     id: "retail", label: "Retail", icon: <FiShoppingCart />, color: "bg-amber-600", type: "industry", description: "Transform retail operations with solutions that enhance customer experience, optimize inventory, and drive sales.",
//     details: [
//       { label: "Focus Areas", value: "Omnichannel Commerce, Inventory Optimization, Customer Loyalty Programs, Store Operations" },
//       { label: "Key Benefits", value: "Personalized shopping experience, Increased sales and profitability, Efficient supply chain" }
//     ]
//   },
//   {
//     id: "sports", label: "Sports and Entertainment", icon: <FiTarget />, color: "bg-red-600", type: "industry", description: "Management systems for sports and entertainment entities, enhancing fan engagement and event operations.",
//     details: [
//       { label: "Focus Areas", value: "Event Management, Fan Engagement, Venue Operations, Sponsorship Management" },
//       { label: "Key Benefits", value: "Enhanced fan experience, Optimized event revenue, Streamlined venue operations" }
//     ]
//   },
//   {
//     id: "telecom", label: "Telecommunications", icon: <FiActivity />, color: "bg-indigo-600", type: "industry", description: "Advanced solutions for telecommunications providers, supporting network management, billing, and customer services.",
//     details: [
//       { label: "Focus Areas", value: "Network Management, Customer Billing, Service Provisioning, Digital Transformation" },
//       { label: "Key Benefits", value: "Improved service quality, Faster network deployment, Enhanced customer loyalty" }
//     ]
//   },
//   {
//     id: "travel", label: "Travel and Transportation", icon: <FiMapPin />, color: "bg-green-600", type: "industry", description: "Software for travel and logistics businesses, optimizing operations and enhancing traveler experience.",
//     details: [
//       { label: "Focus Areas", value: "Passenger Experience, Logistics & Freight, Fleet Management, Route Optimization" },
//       { label: "Key Benefits", value: "Streamlined operations, Enhanced customer satisfaction, Reduced operational costs" }
//     ]
//   },
//   {
//     id: "utilities", label: "Utilities", icon: <FiActivity />, color: "bg-orange-600", type: "industry", description: "Comprehensive systems for utility companies, managing infrastructure, services, and customer relations.",
//     details: [
//       { label: "Focus Areas", value: "Smart Grid Management, Asset Management, Customer Billing, Field Service" },
//       { label: "Key Benefits", value: "Efficient resource management, Reliable service delivery, Improved regulatory compliance" }
//     ]
//   },
//   {
//     id: "wholesale", label: "Wholesale Distribution", icon: <FiTrendingUp />, color: "bg-purple-600", type: "industry", description: "Solutions for wholesale distribution businesses, enhancing inventory management, order fulfillment, and supplier relationships.",
//     details: [
//       { label: "Focus Areas", value: "Inventory Management, Order Fulfillment, Supplier Relationship Management, Warehouse Operations" },
//       { label: "Key Benefits", value: "Optimized inventory levels, Faster order processing, Improved customer service" }
//     ]
//   },

//   // Company Sizes
//   {
//     id: "small", label: "Small Businesses", icon: <FiInfo />, color: "bg-green-600", type: "companySize", description: "Tailored solutions designed for small businesses to grow efficiently and effectively.",
//     details: [
//       { label: "Typical Challenges", value: "Limited resources, Scalability, Market penetration, Digital presence" },
//       { label: "Our Approach", value: "Cost-effective, User-friendly, Quick implementation, Integrated solutions" }
//     ]
//   },
//   {
//     id: "midsize", label: "Midsize Companies", icon: <FiInfo />, color: "bg-yellow-600", type: "companySize", description: "Flexible and scalable solutions for growing midsize companies, supporting expansion and operational excellence.",
//     details: [
//       { label: "Typical Challenges", value: "Rapid growth management, Process optimization, Talent acquisition & retention, Data silos" },
//       { label: "Our Approach", value: "Modular and scalable, Industry-specific, Cloud-first, Data-driven insights" }
//     ]
//   },
//   {
//     id: "large", label: "Large Enterprise", icon: <FiInfo />, color: "bg-blue-600", type: "companySize", description: "Robust and comprehensive solutions for large-scale enterprises, enabling complex operations and global digital transformation.",
//     details: [
//       { label: "Typical Challenges", value: "Global operations, Complex integrations, Regulatory compliance, Legacy system modernization" },
//       { label: "Our Approach", value: "Comprehensive suites, Highly customizable, Secure and compliant, AI-powered automation" }
//     ]
//   },
// ];

// export default function Candybox() {
//   // State
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     excellence: false,
//     ai: false,
//     btp: true, // Open the Business Technology Platform category by default
//     crm: false,
//     erp: false,
//     finance: false,
//     hcm: false,
//     spend: false,
//     scm: false,
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState<"list" | "card" | "tree">("card"); // Added 'tree' view mode
//   const [isRightBarOpen, setIsRightBarOpen] = useState(false);
//   const [selectedItemForRightBar, setSelectedItemForRightBar] = useState<CombinedDataItem | null>(null);
//   const [darkMode, setDarkMode] = useState<boolean>(() => {
//     // Initialize dark mode from local storage or system preference
//     if (typeof window !== 'undefined') {
//       const savedMode = localStorage.getItem('theme');
//       if (savedMode) {
//         return savedMode === 'dark';
//       }
//       return window.matchMedia('(prefers-color-scheme: dark)').matches;
//     }
//     return false;
//   });

//   // Apply dark mode class to HTML on mount and theme change
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);


//   // Handlers
//   const toggleSelection = useCallback((itemId: string) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
//     );
//   }, []);

//   const toggleCategoryExpand = useCallback((categoryId: string) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   }, []);

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   const removeSelectedItem = useCallback(
//     (item: string) => {
//       toggleSelection(item);
//       if (selectedItemForRightBar?.id === item) {
//         setIsRightBarOpen(false);
//         setSelectedItemForRightBar(null);
//       }
//     },
//     [toggleSelection, selectedItemForRightBar]
//   );

//   const resetAllSelections = useCallback(() => {
//     setSelectedItems([]);
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//     setSearchTerm(""); // Reset search term as well
//     setExpandedCategories({ // Reset expanded categories to default
//       excellence: false,
//       ai: false,
//       btp: true,
//       crm: false,
//       erp: false,
//       finance: false,
//       hcm: false,
//       spend: false,
//       scm: false,
//     });
//   }, []);

//   const handleItemClickForRightBar = useCallback((item: CombinedDataItem) => {
//     setSelectedItemForRightBar(item);
//     setIsRightBarOpen(true);
//   }, []);

//   const closeRightBar = useCallback(() => {
//     setIsRightBarOpen(false);
//     setSelectedItemForRightBar(null);
//   }, []);

//   const toggleDarkMode = useCallback(() => {
//     setDarkMode(prevMode => !prevMode);
//   }, []);

//   // Powerful and Complete Filter Logic
//   const filteredData = useMemo(() => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();

//     // Flatten all items including subcategories and products for a comprehensive search
//     const flatData: CombinedDataItem[] = [];

//     allData.forEach(item => {
//       flatData.push(item);
//       if (item.type === "category" && item.subcategories) {
//         item.subcategories.forEach(sub => {
//           flatData.push(sub);
//           if (sub.type === "subcategory" && sub.products) {
//             sub.products.forEach(prod => flatData.push(prod));
//           }
//         });
//       }
//     });

//     const results = flatData.filter((item) => {
//       const matchesLabel = item.label.toLowerCase().includes(lowerCaseSearchTerm);
//       const matchesDescription = 'description' in item && item.description?.toLowerCase().includes(lowerCaseSearchTerm);

//       let matchesDetails = false;
//       if ('details' in item && item.details) {
//         matchesDetails = item.details.some(detail =>
//           detail.label.toLowerCase().includes(lowerCaseSearchTerm) ||
//           (typeof detail.value === 'string' && detail.value.toLowerCase().includes(lowerCaseSearchTerm))
//         );
//       }
//       return matchesLabel || matchesDescription || matchesDetails;
//     });

//     // Deduplicate results and reconstruct categories
//     const uniqueResults = Array.from(new Set(results.map(item => item.id)))
//       .map(id => flatData.find(item => item.id === id))
//       .filter(Boolean) as CombinedDataItem[];

//     // When searching, we want to show the full path to the found item
//     // This involves finding parent categories and subcategories
//     if (searchTerm) {
//       const categorizedResults: CombinedDataItem[] = [];
//       const addedIds = new Set<string>(); // To prevent duplicates in the final display

//       uniqueResults.forEach(foundItem => {
//         if (!foundItem) return;

//         // If found item is a category, add it and its children
//         if (foundItem.type === "category") {
//           if (!addedIds.has(foundItem.id)) {
//             categorizedResults.push(foundItem);
//             addedIds.add(foundItem.id);
//           }
//           return;
//         }

//         // Find parent category and subcategory
//         let currentParent: CategoryItem | undefined;
//         let currentSubcategory: SubCategory | undefined;

//         for (const category of allData.filter((d): d is CategoryItem => d.type === "category")) {
//           if (category.id === foundItem.id) { // If the found item is a top-level industry or companySize
//             if (!addedIds.has(foundItem.id)) {
//               categorizedResults.push(foundItem);
//               addedIds.add(foundItem.id);
//             }
//             return;
//           }
//           if (category.subcategories) {
//             for (const sub of category.subcategories) {
//               if (sub.id === foundItem.id) {
//                 currentParent = category;
//                 currentSubcategory = sub;
//                 break;
//               }
//               if (sub.products) {
//                 for (const prod of sub.products) {
//                   if (prod.id === foundItem.id) {
//                     currentParent = category;
//                     currentSubcategory = sub;
//                     break;
//                   }
//                 }
//               }
//               if (currentParent) break;
//             }
//           }
//           if (currentParent) break;
//         }

//         // Add parent category if not already added
//         if (currentParent && !addedIds.has(currentParent.id)) {
//           categorizedResults.push({
//             ...currentParent,
//             subcategories: currentParent.subcategories?.map(sub => ({
//               ...sub,
//               products: sub.products?.filter(prod => prod.id === foundItem.id || sub.id === foundItem.id)
//             })).filter(sub => sub.products?.length || sub.id === foundItem.id) // Filter subcategories to only include relevant ones
//           });
//           addedIds.add(currentParent.id);
//         } else if (currentParent) {
//           // If parent already added, ensure the specific subcategory/product is visible
//           const existingCategory = categorizedResults.find(c => c.id === currentParent?.id) as CategoryItem;
//           if (existingCategory && currentSubcategory && !existingCategory.subcategories?.find(s => s.id === currentSubcategory?.id)) {
//             existingCategory.subcategories = existingCategory.subcategories || [];
//             existingCategory.subcategories.push({
//               ...currentSubcategory,
//               products: currentSubcategory.products?.filter(prod => prod.id === foundItem.id) || []
//             });
//           }
//         }

//         // Add the found item itself if it's not a category, and ensure it's displayed within its context
//         if (foundItem.type !== "category" && !addedIds.has(foundItem.id)) {
//           // If it's a product or subcategory, it's handled by its parent category's reconstruction.
//           // If it's an industry or company size, it's added directly above.
//           if (foundItem.type !== "product" && foundItem.type !== "subcategory") {
//             categorizedResults.push(foundItem);
//             addedIds.add(foundItem.id);
//           }
//         }
//       });
//       // Sort to ensure categories come first, then industries, then company sizes
//       categorizedResults.sort((a, b) => {
//         if (a.type === "category" && b.type !== "category") return -1;
//         if (a.type !== "category" && b.type === "category") return 1;
//         if (a.type === "industry" && b.type === "companySize") return -1;
//         if (a.type === "companySize" && b.type === "industry") return 1;
//         return a.label.localeCompare(b.label);
//       });
//       return categorizedResults;
//     }

//     // Default view when no search term
//     return allData;
//   }, [searchTerm]);


//   const portfolioCategories = useMemo(() => filteredData.filter((item): item is CategoryItem => item.type === "category"), [filteredData]);
//   const industriesData = useMemo(() => filteredData.filter((item): item is Item => item.type === "industry"), [filteredData]);
//   const companySizesData = useMemo(() => filteredData.filter((item): item is Item => item.type === "companySize"), [filteredData]);

//   const selectedItemsDetails = useMemo(() => {
//     return selectedItems.map(id => allData.find(item => item.id === id)).filter(Boolean) as CombinedDataItem[];
//   }, [selectedItems]);

//   // Component for Right Bar Info
//   const RightBarInfo = ({ item, onClose }: { item: CombinedDataItem | null; onClose: () => void }) => {
//     if (!item) return null;

//     const isSelected = selectedItems.includes(item.id);

//     return (
//       <div className={`absolute right-0 top-0 h-full w-1/3 border-l shadow-xl p-8 overflow-y-auto transform transition-transform duration-300 ease-out z-20 ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
//         <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-700">
//           <h3 className={`text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Details View</h3>
//           <button
//             onClick={onClose}
//             className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-gray-800 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
//             aria-label="Close details"
//           >
//             <FiX className="w-7 h-7" />
//           </button>
//         </div>

//         <div className="space-y-6">
//           <div className="flex items-center space-x-4 mb-4">
//             {item.type !== "category" && 'icon' in item && item.icon && 'color' in item && item.color ? (
//               <div className={`p-3 rounded-xl ${item.color} text-white shadow-md`}>
//                 {item.icon}
//               </div>
//             ) : (
//               <FiLayers className="text-orange-500 w-10 h-10" />
//             )}
//             <h2 className={`text-3xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</h2>
//           </div>

//           {'description' in item && item.description && (
//             <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-orange-100'}`}>
//               <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} text-lg`}>{item.description}</p>
//             </div>
//           )}

//           {item.type === "category" && 'subcategories' in item && item.subcategories && item.subcategories.length > 0 && (
//             <div className="mt-6">
//               <h4 className={`font-bold mb-4 text-xl ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Category Breakdown:</h4>
//               <div className="space-y-4">
//                 {item.subcategories.map(sub => (
//                   <div key={sub.id} className={`p-4 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
//                     <p className={`font-semibold text-lg flex items-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
//                       <FiChevronRight className="mr-2 text-orange-500" /> {sub.label}
//                     </p>
//                     {sub.products && sub.products.length > 0 && (
//                       <div className="ml-6 mt-3 space-y-2">
//                         <h5 className={`font-medium text-md mb-2 pb-1 border-b ${darkMode ? 'text-gray-800 border-gray-600' : 'text-gray-600 border-gray-200'}`}>Associated Products:</h5>
//                         <ul className="list-none space-y-2">
//                           {sub.products.map(prod => (
//                             <li key={prod.id} className="flex items-start text-sm">
//                               <FiCheckCircle className="mr-2 mt-1 text-orange-500 flex-shrink-0" />
//                               <div>
//                                 <strong className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{prod.label}:</strong> <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{prod.description || "Detailed product information forthcoming."}</span>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {item.type !== "category" && 'details' in item && item.details && item.details.length > 0 && (
//             <div className="mt-6">
//               <h4 className={`font-bold mb-4 text-xl ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Key Aspects:</h4>
//               <dl className="space-y-3">
//                 {item.details.map((detail, index) => (
//                   <div key={index} className="flex items-start">
//                     <span className="font-semibold text-orange-500 mr-2 min-w-[100px]">{detail.label}:</span>
//                     <dd className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} flex-1`}>{detail.value}</dd>
//                   </div>
//                 ))}
//               </dl>
//             </div>
//           )}

//           <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
//             <button
//               className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ease-in-out
//                 ${isSelected ? "bg-gray-800 hover:bg-gray-700 dark:bg-orange-600 dark:hover:bg-orange-700" : "bg-orange-600 hover:bg-orange-700 dark:bg-gray-800 dark:hover:bg-gray-700"}
//                 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-gray-600`}
//               onClick={() => {
//                 toggleSelection(item.id);
//               }}
//             >
//               {isSelected ? "Remove from Selections" : "Add to Selections"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderCategory = (category: CategoryItem, isExpanded: boolean, level: number = 0) => {
//     const isCategorySelected = selectedItems.includes(category.id);
//     const hasVisibleChildren = category.subcategories?.some(sub => {
//       const subCategoryMatches = sub.label.toLowerCase().includes(searchTerm.toLowerCase());
//       const productMatches = sub.products?.some(prod => prod.label.toLowerCase().includes(searchTerm.toLowerCase()));
//       return subCategoryMatches || productMatches;
//     });

//     const displayCategory = searchTerm === "" ||
//       category.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       hasVisibleChildren;

//     if (!displayCategory) return null;

//     return (
//       <div key={category.id} className={`${level > 0 ? 'ml-4' : ''} mb-2`}>
//         <div className={`flex items-center p-2 rounded-lg cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleCategoryExpand(category.id);
//             }}
//             className={`mr-2 ${darkMode ? 'text-gray-800' : 'text-gray-600'}`}
//           >
//             {isExpanded && category.subcategories && category.subcategories.length > 0 ? <FiChevronDown /> : <FiChevronRight />}
//           </button>
//           <input
//             type="checkbox"
//             id={`category-${category.id}`}
//             checked={isCategorySelected}
//             onChange={(e) => { e.stopPropagation(); toggleSelection(category.id); }}
//             className="form-checkbox h-4 w-4 text-orange-500 rounded-md mr-2 border-gray-300 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-orange-500"
//           />
//           <label
//             htmlFor={`category-${category.id}`}
//             className={`font-semibold text-lg flex items-center flex-grow cursor-pointer ${darkMode ? 'text-white' : 'text-gray-800'}`}
//             onClick={() => handleItemClickForRightBar(category)}
//           >
//             <FiPackage className="text-orange-500 mr-2 w-5 h-5" />
//             {category.label}
//             {category.info && <FiInfo className="ml-2 text-gray-800 dark:text-gray-500" title={category.description} />}
//           </label>
//         </div>

//         {isExpanded && category.subcategories && (
//           <div className="ml-8 mt-2 space-y-1">
//             {category.subcategories.map(sub => {
//               const isSubCategorySelected = selectedItems.includes(sub.id);
//               const displaySubCategory = searchTerm === "" ||
//                 sub.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 (sub.products && sub.products.some(prod => prod.label.toLowerCase().includes(searchTerm.toLowerCase())));

//               if (!displaySubCategory) return null;

//               return (
//                 <div key={sub.id}>
//                   <div className={`flex items-center p-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//                     <input
//                       type="checkbox"
//                       id={`subcategory-${sub.id}`}
//                       checked={isSubCategorySelected}
//                       onChange={(e) => { e.stopPropagation(); toggleSelection(sub.id); }}
//                       className="form-checkbox h-4 w-4 text-orange-500 rounded-md mr-2 border-gray-300 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-orange-500"
//                     />
//                     <label
//                       htmlFor={`subcategory-${sub.id}`}
//                       className={`text-base flex items-center flex-grow cursor-pointer ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
//                       onClick={() => handleItemClickForRightBar(sub)}
//                     >
//                       <FiChevronRight className="mr-2 text-gray-500" /> {sub.label}
//                     </label>
//                   </div>
//                   {sub.products && sub.products.length > 0 && (
//                     <div className="ml-6 mt-1 space-y-0.5">
//                       {sub.products.map(product => {
//                         const isProductSelected = selectedItems.includes(product.id);
//                         const displayProduct = searchTerm === "" || product.label.toLowerCase().includes(searchTerm.toLowerCase());
//                         if (!displayProduct) return null;
//                         return (
//                           <div key={product.id} className={`flex items-center p-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//                             <input
//                               type="checkbox"
//                               id={`product-${product.id}`}
//                               checked={isProductSelected}
//                               onChange={(e) => { e.stopPropagation(); toggleSelection(product.id); }}
//                               className="form-checkbox h-4 w-4 text-orange-500 rounded-md mr-2 border-gray-300 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-orange-500"
//                             />
//                             <label
//                               htmlFor={`product-${product.id}`}
//                               className={`text-sm flex items-center flex-grow cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                               onClick={() => handleItemClickForRightBar(product)}
//                             >
//                               <FiCheckCircle className="mr-2 text-gray-800" /> {product.label}
//                             </label>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   };


//   return (
//     <div className={`w-full font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
//       <div className=" w-full ">
//         {/* Header */}
//         {/* <div className={`mb-8 p-6 rounded-2xl shadow-lg flex justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           <h1 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Excellencia Solutions</h1>
       
//         </div> */}

//         {/* Main Content Area */}
//         <div className="flex gap-3 w-full">
          
//           {/* Left Sidebar - Filter and Selections */}
//           <div className={`w-1/3 p-6  shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <h2 className={`text-3xl font-bold mb-6 border-b pb-4 ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
//               Filter Options
//             </h2>

//             {/* Search Input */}
//             <div className="mb-6">
//               <div className="relative">
//                 <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-800' : 'text-gray-500'}`} />
//                 <input
//                   type="text"
//                   placeholder="Search solutions..."
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'}`}
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white"
//                     aria-label="Clear search"
//                   >
//                     <FiX />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* View Mode Toggle */}
//             <div className={`mb-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//               <h3 className={`font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>View Mode:</h3>
//               <div className="flex justify-around gap-2">
//                 <button
//                   onClick={() => setViewMode("card")}
//                   className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${viewMode === "card" ? 'bg-orange-500 text-white shadow-md' : (darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
//                 >
//                   <FiColumns className="mr-2" /> Card
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${viewMode === "list" ? 'bg-orange-500 text-white shadow-md' : (darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
//                 >
//                   <FiLayout className="mr-2" /> List
//                 </button>
//                 <button
//                   onClick={() => setViewMode("tree")}
//                   className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${viewMode === "tree" ? 'bg-orange-500 text-white shadow-md' : (darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
//                 >
//                   <FiGitBranch className="mr-2" /> Tree
//                 </button>
//               </div>
//             </div>

//             {/* Filter Sections */}
//             <div className="space-y-6">
//               {/* Portfolio Categories Filter */}
//               <div>
//                 <h3 className={`font-bold text-xl mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                   Portfolio Categories
//                 </h3>
//                 <div className={`space-y-3 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   {viewMode === "tree" ? (
//                     portfolioCategories.map((category) => renderCategory(category, expandedCategories[category.id] || false, 0))
//                   ) : (
//                     portfolioCategories.map((category) => {
//                       const isCategorySelected = selectedItems.includes(category.id);
//                       const displayCategory = searchTerm === "" ||
//                         category.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         category.description?.toLowerCase().includes(searchTerm.toLowerCase());

//                       if (!displayCategory) return null;

//                       return (
//                         <div
//                           key={category.id}
//                           className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
//                         >
//                           <input
//                             type="checkbox"
//                             id={`filter-category-${category.id}`}
//                             checked={isCategorySelected}
//                             onChange={() => toggleSelection(category.id)}
//                             className="form-checkbox h-5 w-5 text-orange-500 rounded-md mr-3 border-gray-300 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-orange-500"
//                           />
//                           <label
//                             htmlFor={`filter-category-${category.id}`}
//                             className={`flex items-center flex-grow text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}
//                             onClick={() => handleItemClickForRightBar(category)}
//                           >
//                             <FiPackage className="text-orange-500 mr-2" /> {category.label}
//                             {category.info && <FiInfo className="ml-2 text-gray-800 dark:text-gray-500" title={category.description} />}
//                           </label>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </div>

//               {/* Industries Filter */}
//               <div>
//                 <h3 className={`font-bold text-xl mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Industries</h3>
//                 <div className={`space-y-3 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   {industriesData.map((industry) => {
//                     const isIndustrySelected = selectedItems.includes(industry.id);
//                     const displayIndustry = searchTerm === "" ||
//                       industry.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                       industry.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                       industry.details?.some(d => d.label.toLowerCase().includes(searchTerm.toLowerCase()) || (typeof d.value === 'string' && d.value.toLowerCase().includes(searchTerm.toLowerCase())));

//                     if (!displayIndustry) return null;

//                     return (
//                       <div
//                         key={industry.id}
//                         className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
//                       >
//                         <input
//                           type="checkbox"
//                           id={`filter-industry-${industry.id}`}
//                           checked={isIndustrySelected}
//                           onChange={() => toggleSelection(industry.id)}
//                           className="form-checkbox h-5 w-5 text-orange-500 rounded-md mr-3 border-gray-300 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-orange-500"
//                         />
//                         <label
//                           htmlFor={`filter-industry-${industry.id}`}
//                           className={`flex items-center flex-grow text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}
//                           onClick={() => handleItemClickForRightBar(industry)}
//                         >
//                           {industry.icon && <span className="mr-2 text-orange-500">{industry.icon}</span>}
//                           {industry.label}
//                         </label>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Company Sizes Filter */}
//               <div>
//                 <h3 className={`font-bold text-xl mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Company Size</h3>
//                 <div className={`space-y-3 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   {companySizesData.map((size) => {
//                     const isSizeSelected = selectedItems.includes(size.id);
//                     const displaySize = searchTerm === "" ||
//                       size.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                       size.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                       size.details?.some(d => d.label.toLowerCase().includes(searchTerm.toLowerCase()) || (typeof d.value === 'string' && d.value.toLowerCase().includes(searchTerm.toLowerCase())));

//                     if (!displaySize) return null;

//                     return (
//                       <div
//                         key={size.id}
//                         className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
//                       >
//                         <input
//                           type="checkbox"
//                           id={`filter-size-${size.id}`}
//                           checked={isSizeSelected}
//                           onChange={() => toggleSelection(size.id)}
//                           className="form-checkbox h-5 w-5 text-orange-500 rounded-md mr-3 border-gray-300 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-orange-500"
//                         />
//                         <label
//                           htmlFor={`filter-size-${size.id}`}
//                           className={`flex items-center flex-grow text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}
//                           onClick={() => handleItemClickForRightBar(size)}
//                         >
//                           {size.icon && <span className="mr-2 text-orange-500">{size.icon}</span>}
//                           {size.label}
//                         </label>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Content Area - Selected Items & Details */}
//           <div className={`flex-1 w-full p-6  shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="flex justify-end items-center space-x-4">
//   <button
//     onClick={toggleDarkMode}
//     className={`p-3 rounded-full transition-colors duration-200 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//     aria-label="Toggle dark mode"
//   >
//     {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
//   </button>
//   <button
//     onClick={resetAllSelections}
//     className={`flex items-center px-5 py-2 rounded-full font-semibold transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//   >
//     <FiRefreshCw className="mr-2" /> Reset All
//   </button>
// </div>
//             <h2 className={`text-3xl font-bold mb-6 border-b pb-4 ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
//               Your Selections ({selectedItems.length})
//             </h2>
            

//             {selectedItems.length === 0 ? (
//               <p className={`${darkMode ? 'text-gray-800' : 'text-gray-600'} text-lg italic`}>No items selected yet. Use the filters to explore!</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {selectedItemsDetails.map((item) => (
//                   <div
//                     key={item.id}
//                     className={`relative p-5 rounded-xl shadow-md cursor-pointer group transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' : 'bg-orange-50 hover:bg-orange-100 border border-orange-200'}`}
//                     onClick={() => handleItemClickForRightBar(item)}
//                   >
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeSelectedItem(item.id);
//                       }}
//                       className={`absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-white text-gray-700 hover:bg-gray-800'}`}
//                       aria-label={`Remove ${item.label}`}
//                     >
//                       <FiX className="w-5 h-5" />
//                     </button>
//                     <div className="flex items-center mb-3">
//                       {item.type !== "category" && 'icon' in item && item.icon ? (
//                         <div className={`p-2 rounded-lg text-white mr-3 ${item.color || 'bg-orange-500'}`}>
//                           {item.icon}
//                         </div>
//                       ) : (
//                         <FiLayers className="text-orange-500 w-6 h-6 mr-3" />
//                       )}
//                       <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.label}</h3>
//                     </div>
//                     {'description' in item && item.description && (
//                       <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
//                         {item.description}
//                       </p>
//                     )}
//                     <span className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-orange-200 text-orange-800'}`}>
//                       {item.type === 'product' ? 'Product' : item.type === 'subcategory' ? 'Subcategory' : item.type === 'category' ? 'Category' : item.type === 'industry' ? 'Industry' : 'Company Size'}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Bar for Item Details */}
//         {isRightBarOpen && (
//           <RightBarInfo item={selectedItemForRightBar} onClose={closeRightBar} />
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import {
//   FiRefreshCw,
//   FiHome,
//   FiChevronRight,
//   FiChevronDown,
//   FiGrid,
//   FiSettings,
//   FiUsers,
//   FiDatabase,
//   FiServer,
//   FiShoppingCart,
//   FiDollarSign,
//   FiMenu,
//   FiX,
//   FiPackage,
//   FiLayers,
//   FiSearch,
//   FiInfo,
//   FiBookmark,
//   FiBriefcase,
//   FiGlobe,
//   FiTrendingUp,
//   FiBox,
//   FiActivity,
//   FiTarget,
//   FiMapPin,
//   FiCpu,
//   FiPieChart,
//   FiBell,
//   FiStar,
//   FiSun,
//   FiMoon,
// } from "react-icons/fi";
// import { CgMenuGridR } from "react-icons/cg";

// // Types
// type SubCategoryItem = {
//   id: string;
//   label: string;
//   products?: { id: string; label: string }[];
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   subcategories?: SubCategoryItem[];
// };

// type IndustryItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
// };

// type CompanySizeItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
// };

// // Data
// const portfolioCategories: CategoryItem[] = [
//   { id: "ai", label: "Artificial Intelligence", info: true },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         products: [
//           { id: "product1", label: "Product A for App Dev" },
//           { id: "product2", label: "Product B for App Dev" },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         products: [
//           { id: "product3", label: "Product C for Data & Analytics" },
//           { id: "product4", label: "Product D for Data & Analytics" },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         products: [
//           { id: "excel-migration", label: "Excellencia Advanced Data Migration and Management by Syniti" },
//           { id: "ariba-cloud", label: "Ariba Cloud Integration" },
//           { id: "excel-integration", label: "Excellencia Integration Suite" },
//         ],
//       },
//     ],
//   },
//   { id: "crm", label: "CRM and Customer Experience", info: true },
//   { id: "erp", label: "Enterprise Resource Planning", info: true },
//   { id: "finance", label: "Financial Management", info: true },
//   { id: "hcm", label: "Human Capital Management", info: true },
//   { id: "spend", label: "Spend Management", info: true },
//   { id: "scm", label: "Supply Chain Management", info: true },
// ];

// const industriesData: IndustryItem[] = [
//   { id: "aerospace", label: "Aerospace and Defense", icon: <FiTarget /> },
//   { id: "automotive", label: "Automotive", icon: <FiActivity /> },
//   { id: "banking", label: "Banking", icon: <FiDollarSign /> },
//   { id: "chemicals", label: "Chemicals", icon: <FiBox /> },
//   { id: "consumer", label: "Consumer Products", icon: <FiShoppingCart /> },
//   { id: "defense", label: "Defense and Security", icon: <FiBookmark /> },
//   { id: "education", label: "Education and Research", icon: <FiBookmark /> },
//   { id: "engineering", label: "Engineering and Construction", icon: <FiGrid /> },
//   { id: "healthcare", label: "Healthcare", icon: <FiActivity /> },
//   { id: "tech", label: "High Tech", icon: <FiCpu /> },
//   { id: "insurance", label: "Insurance", icon: <FiStar /> },
//   { id: "life", label: "Life Sciences", icon: <FiActivity /> },
//   { id: "media", label: "Media", icon: <FiGlobe /> },
//   { id: "mill", label: "Mill Products", icon: <FiBox /> },
//   { id: "mining", label: "Mining", icon: <FiMapPin /> },
//   { id: "oil", label: "Oil, Gas, and Energy", icon: <FiActivity /> },
//   { id: "professional", label: "Professional Services", icon: <FiBriefcase /> },
//   { id: "public", label: "Public Sector", icon: <FiGlobe /> },
//   { id: "retail", label: "Retail", icon: <FiShoppingCart /> },
//   { id: "sports", label: "Sports and Entertainment", icon: <FiTarget /> },
//   { id: "telecom", label: "Telecommunications", icon: <FiActivity /> },
//   { id: "travel", label: "Travel and Transportation", icon: <FiMapPin /> },
//   { id: "utilities", label: "Utilities", icon: <FiActivity /> },
//   { id: "wholesale", label: "Wholesale Distribution", icon: <FiTrendingUp /> },
// ];

// const companySizesData: CompanySizeItem[] = [
//   { id: "small", label: "Small Businesses", icon: <FiInfo /> },
//   { id: "midsize", label: "Midsize Companies", icon: <FiInfo /> },
//   { id: "large", label: "Large Enterprise", icon: <FiInfo /> },
// ];

// export default function Candybox() {
//   // State
//   const [selectedItems, setSelectedItems] = useState<string[]>([
//     "Excellencia S/Excellencia Cloud",
//     "Artificial Intelligence",
//     "Business Technology Platform",
//     "CRM and Customer Experience",
//     "Enterprise Resource Planning",
//   ]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     btp: true, // Open the Business Technology Platform category by default
//   });
//   const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [theme, setTheme] = useState<"light" | "dark">("light"); // Default theme is light

//   // Handlers
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   const toggleSelection = (itemLabel: string) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemLabel) ? prev.filter((id) => id !== itemLabel) : [...prev, itemLabel]
//     );
//   };

//   const toggleCategoryExpand = (categoryId: string) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   };

//   const toggleSubcategoryExpand = (subcategoryId: string) => {
//     setExpandedSubcategories((prev) => ({
//       ...prev,
//       [subcategoryId]: !prev[subcategoryId],
//     }));
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const removeSelectedItem = (item: string) => {
//     setSelectedItems((prev) => prev.filter((id) => id !== item));
//   };

//   const resetAllSelections = () => {
//     setSelectedItems([]);
//     setExpandedCategories({ btp: true }); // Reset BTP to expanded
//     setExpandedSubcategories({});
//   };

//   // Dynamically set dark mode class on body
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   // Filtered data based on search
//   const filterData = (data: (CategoryItem | IndustryItem | CompanySizeItem)[], term: string) => {
//     if (!term) return data;
//     const lowercasedTerm = term.toLowerCase();
//     return data.filter((item) => {
//       if ("label" in item) {
//         return item.label.toLowerCase().includes(lowercasedTerm);
//       }
//       return false;
//     });
//   };

//   const filteredPortfolioCategories = filterData(portfolioCategories, searchTerm) as CategoryItem[];
//   const filteredIndustries = filterData(industriesData, searchTerm) as IndustryItem[];
//   const filteredCompanySizes = filterData(companySizesData, searchTerm) as CompanySizeItem[];

//   // Determine theme-based colors
//   const textColor = theme === "dark" ? "text-white" : "text-gray-800";
//   const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
//   const panelBgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-800";
//   const panelTextColor = "text-white";
//   const orangeText = "text-orange-500";
//   const orangeBg = "bg-orange-500";
//   const lightOrangeBg = "bg-orange-100";
//   const grayLightBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";
//   const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
//   const selectedBorderColor = "border-orange-500";
//   const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50";

//   // Category and Subcategory Rendering (Tree View)
//   const renderCategories = (categories: CategoryItem[]) => {
//     return categories.map((category) => (
//       <div key={category.id} className={`pb-2 ${borderColor}`}>
//         <div className="flex justify-between items-center mb-2">
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id={category.id}
//               checked={selectedItems.includes(category.label)}
//               onChange={() => toggleSelection(category.label)}
//               className={`mr-2 h-4 w-4 ${
//                 theme === "dark" ? "form-checkbox-dark" : "form-checkbox-light"
//               } `}
//             />
//             <label htmlFor={category.id} className={`flex items-center ${textColor}`}>
//               <FiPackage className={`mr-2 ${orangeText}`} />
//               <span className="font-medium">{category.label}</span>
//             </label>
//             {category.info && (
//               <button className={`ml-2 text-gray-500 hover:${orangeText}`}>
//                 <FiInfo />
//               </button>
//             )}
//           </div>
//           {category.subcategories && (
//             <button
//               onClick={() => toggleCategoryExpand(category.id)}
//               className={`flex items-center ${orangeText} hover:${textColor} transition-colors`}
//             >
//               <span className="mr-2">Portfolio subcategory</span>
//               {expandedCategories[category.id] ? <FiChevronDown /> : <FiChevronRight />}
//             </button>
//           )}
//         </div>

//         {category.subcategories && expandedCategories[category.id] && (
//           <div className="ml-6 space-y-2 border-l pl-4">
//             {category.subcategories.map((sub) => (
//               <div key={sub.id} className="flex justify-between items-center py-1">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={sub.id}
//                     checked={selectedItems.includes(sub.label)}
//                     onChange={() => toggleSelection(sub.label)}
//                     className={`mr-2 h-4 w-4 ${
//                       theme === "dark" ? "form-checkbox-dark" : "form-checkbox-light"
//                     }`}
//                   />
//                   <label htmlFor={sub.id} className={`${textColor}`}>
//                     {sub.label}
//                   </label>
//                   {sub.products && (
//                     <button className={`ml-2 text-gray-500 hover:${orangeText}`}>
//                       <FiInfo />
//                     </button>
//                   )}
//                 </div>
//                 {sub.products && (
//                   <button
//                     onClick={() => toggleSubcategoryExpand(sub.id)}
//                     className={`flex items-center ${orangeText} hover:${textColor} transition-colors`}
//                   >
//                     <span className="mr-2">Products</span>
//                     {expandedSubcategories[sub.id] ? <FiChevronDown /> : <FiChevronRight />}
//                   </button>
//                 )}
//               </div>
//             ))}

//             {/* Products within subcategories */}
//             {category.subcategories.map(
//               (sub) =>
//                 sub.products &&
//                 expandedSubcategories[sub.id] && (
//                   <div key={`${sub.id}-products`} className="ml-6 space-y-2 border-l pl-4">
//                     {sub.products.map((product) => (
//                       <div key={product.id} className="flex items-center py-1">
//                         <input
//                           type="checkbox"
//                           id={product.id}
//                           checked={selectedItems.includes(product.label)}
//                           onChange={() => toggleSelection(product.label)}
//                           className={`mr-2 h-4 w-4 ${
//                             theme === "dark" ? "form-checkbox-dark" : "form-checkbox-light"
//                           }`}
//                         />
//                         <label htmlFor={product.id} className={`${textColor}`}>
//                           {product.label}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )
//             )}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className={`${bgColor} ${textColor} min-h-screen p-8`}>
//       {/* Theme Toggle Button */}
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={toggleTheme}
//           className={`p-2 rounded-full ${
//             theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
//           } focus:outline-none`}
//         >
//           {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
//         </button>
//       </div>

//       <div
//         className={`${bgColor} rounded-md w-full max-w-6xl mx-auto flex overflow-hidden shadow-lg`}
//       >
//         {/* Left Panel */}
//         <div className={`w-1/3 ${panelBgColor} ${panelTextColor} flex flex-col p-8`}>
//           <div className="flex justify-center mb-8">
//             <div className="relative">
//               <div
//                 className={`h-32 w-32 rounded-full border-4 ${
//                   theme === "dark" ? "border-gray-600" : "border-gray-200"
//                 } flex items-center justify-center`}
//               >
//                 <CgMenuGridR size={48} className={orangeText} />
//               </div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div
//                   className={`${orangeBg} rounded-full p-2 w-20 h-20 flex items-center justify-center`}
//                 >
//                   <svg viewBox="0 0 50 50" className="w-10 h-10 text-white">
//                     <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
//                     <circle cx="25" cy="15" r="5" fill="currentColor" />
//                     <path d="M15,25 A10,10 0 0,1 35,25" fill="none" stroke="currentColor" strokeWidth="2" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <h2 className="text-2xl font-bold text-center mb-4">What are your interests?</h2>
//           <p className="text-center mb-8 text-gray-300">
//             Select the topics that interest you to personalize your Excellencia experience.
//           </p>

//           <div className="space-y-4 mb-8">
//             <div className="flex items-center">
//               <div className={`${lightOrangeBg} p-1 rounded mr-2`}>
//                 <span className={`${orangeText} font-bold`}>📁</span>
//               </div>
//               <span>Portfolio category</span>
//             </div>
//             <div className="flex items-center">
//               <div className={`${grayLightBg} p-1 rounded mr-2`}>
//                 <span className={`${textColor} font-bold`}>📋</span>
//               </div>
//               <span>Portfolio subcategory</span>
//             </div>
//             <div className="flex items-center">
//               <div className={`${orangeBg} p-1 rounded mr-2`}>
//                 <span className="text-white font-bold">🛒</span>
//               </div>
//               <span>Product</span>
//             </div>
//           </div>

//           {/* Preview of Selected Items */}
//           <div className="mt-auto">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-medium">Selected items: {selectedItems.length}</h3>
//               {selectedItems.length > 0 && (
//                 <button
//                   onClick={resetAllSelections}
//                   className="flex items-center text-md text-white hover:text-orange-400 transition-colors"
//                 >
//                   <FiRefreshCw size={14} className="mr-1" />
//                   Reset Selection
//                 </button>
//               )}
//             </div>

//             <div
//               className={`max-h-64 overflow-y-auto ${
//                 theme === "dark" ? "bg-gray-700" : "bg-gray-700"
//               } p-3 rounded-md`}
//             >
//               {selectedItems.slice(0, 5).map((item) => (
//                 <div
//                   key={item}
//                   className={`${orangeBg} rounded-md p-2 mb-2 flex items-center justify-between`}
//                 >
//                   <span className="text-sm text-white">{item}</span>
//                   <button
//                     onClick={() => removeSelectedItem(item)}
//                     className="text-white hover:text-gray-200"
//                   >
//                     <FiX size={16} />
//                   </button>
//                 </div>
//               ))}
//               {selectedItems.length > 5 && (
//                 <div className="text-center text-orange-200 mt-2">
//                   +{selectedItems.length - 5} more
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Content */}
//         <div className={`w-2/3 overflow-y-auto relative ${bgColor} p-6`}>
//           <h2 className={`text-xl font-bold mb-4 ${textColor}`}>
//             Select from the portfolio categories, subcategories or products
//           </h2>

//           <div className="mb-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className={`w-full p-3 pr-10 border rounded-full ${
//                   theme === "dark"
//                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
//                 } focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               <FiSearch className={`absolute right-3 top-3.5 ${textColor}`} />
//             </div>
//           </div>

//           {/* Portfolio Categories (Tree View) */}
//           <div className={`space-y-4 ${textColor}`}>
//             {renderCategories(filteredPortfolioCategories)}
//           </div>

//           {/* Industries Section - Card View */}
//           <div className="mt-8">
//             <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Industries</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {filteredIndustries.map((industry) => (
//                 <div
//                   key={industry.id}
//                   className={`rounded-lg p-4 border transition-all cursor-pointer ${
//                     selectedItems.includes(industry.label) ? selectedBorderColor : borderColor
//                   } ${hoverBgColor} ${
//                     selectedItems.includes(industry.label) ? "shadow-md" : "hover:shadow-sm"
//                   }`}
//                   onClick={() => toggleSelection(industry.label)}
//                 >
//                   <div className="flex items-center">
//                     <div className={`${orangeBg} text-white p-2 rounded-full mr-3`}>
//                       {industry.icon}
//                     </div>
//                     <div>
//                       <div className={`font-medium text-sm ${textColor}`}>{industry.label}</div>
//                       {selectedItems.includes(industry.label) && (
//                         <div className={`text-xs ${orangeText} mt-1`}>Selected</div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Company Size Section - Card View */}
//           <div className="mt-8">
//             <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Company size</h3>
//             <div className="grid grid-cols-3 gap-4">
//               {filteredCompanySizes.map((size) => (
//                 <div
//                   key={size.id}
//                   className={`rounded-lg p-4 border transition-all cursor-pointer flex flex-col items-center ${
//                     selectedItems.includes(size.label) ? selectedBorderColor : borderColor
//                   } ${hoverBgColor} ${
//                     selectedItems.includes(size.label) ? "shadow-md" : "hover:shadow-sm"
//                   }`}
//                   onClick={() => toggleSelection(size.label)}
//                 >
//                   <div className={`${orangeBg} text-white p-3 rounded-full mb-2`}>
//                     {size.icon}
//                   </div>
//                   <div className={`font-medium text-center ${textColor}`}>{size.label}</div>
//                   {selectedItems.includes(size.label) && (
//                     <div className={`text-xs ${orangeText} mt-1`}>Selected</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="mt-8 flex justify-center">
//             <button
//               className={`${orangeBg} text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors`}
//             >
//               Save and Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import {
//   FiRefreshCw,
//   FiHome,
//   FiChevronRight,
//   FiChevronDown,
//   FiGrid,
//   FiSettings,
//   FiUsers,
//   FiDatabase,
//   FiServer,
//   FiShoppingCart,
//   FiDollarSign,
//   FiMenu,
//   FiX,
//   FiPackage,
//   FiLayers,
//   FiSearch,
//   FiInfo,
//   FiBookmark,
//   FiBriefcase,
//   FiGlobe,
//   FiTrendingUp,
//   FiBox,
//   FiActivity,
//   FiTarget,
//   FiMapPin,
//   FiCpu,
//   FiPieChart,
//   FiBell,
//   FiStar,
//   FiSun,
//   FiMoon,
//   FiList,
//   FiHardDrive, // Icon for Tree View
// } from "react-icons/fi";
// import { CgMenuGridR } from "react-icons/cg";

// // Types
// type SubCategoryItem = {
//   id: string;
//   label: string;
//   products?: { id: string; label: string }[];
// };

// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   subcategories?: SubCategoryItem[];
// };

// type IndustryItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   color: string;
//   description?: string; // Added for right bar information
// };

// type CompanySizeItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   color: string;
//   description?: string; // Added for right bar information
// };

// type SelectedItemInfo = {
//   type: 'category' | 'subcategory' | 'product' | 'industry' | 'companySize';
//   id: string;
//   label: string;
//   description?: string;
//   parent?: string; // To link subcategories/products to their parent category
// };

// // Data
// const portfolioCategories: CategoryItem[] = [
//   { id: "ai", label: "Artificial Intelligence", info: true },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     subcategories: [
//       {
//         id: "appdev",
//         label: "Application Development and Automation",
//         products: [
//           { id: "product-a", label: "Excellencia Cloud Application Studio" },
//           { id: "product-b", label: "Excellencia Intelligent RPA" },
//         ],
//       },
//       {
//         id: "data",
//         label: "Data and Analytics",
//         products: [
//           { id: "product-c", label: "Excellencia Data Warehouse Cloud" },
//           { id: "product-d", label: "Excellencia Analytics Cloud" },
//         ],
//       },
//       {
//         id: "integration",
//         label: "Integration",
//         products: [
//           { id: "product-e", label: "Excellencia Advanced Data Migration and Management by Syniti" },
//           { id: "product-f", label: "Ariba Cloud Integration" },
//           { id: "product-g", label: "Excellencia Integration Suite" },
//         ],
//       },
//     ],
//   },
//   { id: "crm", label: "CRM and Customer Experience", info: true },
//   { id: "erp", label: "Enterprise Resource Planning", info: true },
//   { id: "finance", label: "Financial Management", info: true },
//   { id: "hcm", label: "Human Capital Management", info: true },
//   { id: "spend", label: "Spend Management", info: true },
//   { id: "scm", label: "Supply Chain Management", info: true },
// ];

// const industriesData: IndustryItem[] = [
//   { id: "aerospace", label: "Aerospace and Defense", icon: <FiTarget />, color: "bg-orange-600", description: "Solutions for aerospace and defense industries." },
//   { id: "automotive", label: "Automotive", icon: <FiActivity />, color: "bg-orange-600", description: "Innovative solutions for the automotive sector." },
//   { id: "banking", label: "Banking", icon: <FiDollarSign />, color: "bg-orange-600", description: "Financial management and banking solutions." },
//   { id: "chemicals", label: "Chemicals", icon: <FiBox />, color: "bg-orange-600", description: "Streamlining operations in the chemical industry." },
//   { id: "consumer", label: "Consumer Products", icon: <FiShoppingCart />, color: "bg-orange-600", description: "Enhancing consumer product delivery and experience." },
//   { id: "defense", label: "Defense and Security", icon: <FiBookmark />, color: "bg-orange-600", description: "Secure and robust solutions for defense." },
//   { id: "education", label: "Education and Research", icon: <FiBookmark />, color: "bg-orange-600", description: "Tools for educational institutions and research." },
//   { id: "engineering", label: "Engineering and Construction", icon: <FiGrid />, color: "bg-orange-600", description: "Software for engineering and construction projects." },
//   { id: "healthcare", label: "Healthcare", icon: <FiActivity />, color: "bg-orange-600", description: "Digital solutions for healthcare providers." },
//   { id: "tech", label: "High Tech", icon: <FiCpu />, color: "bg-orange-600", description: "Cutting-edge solutions for high-tech companies." },
//   { id: "insurance", label: "Insurance", icon: <FiStar />, color: "bg-orange-600", description: "Managing policies and claims in the insurance sector." },
//   { id: "life", label: "Life Sciences", icon: <FiActivity />, color: "bg-orange-600", description: "Supporting innovation in life sciences." },
//   { id: "media", label: "Media", icon: <FiGlobe />, color: "bg-orange-600", description: "Solutions for media and entertainment companies." },
//   { id: "mill", label: "Mill Products", icon: <FiBox />, color: "bg-orange-600", description: "Optimizing production for mill products." },
//   { id: "mining", label: "Mining", icon: <FiMapPin />, color: "bg-orange-600", description: "Geological and operational tools for mining." },
//   { id: "oil", label: "Oil, Gas, and Energy", icon: <FiActivity />, color: "bg-orange-600", description: "Energy sector solutions for efficiency and sustainability." },
//   { id: "professional", label: "Professional Services", icon: <FiBriefcase />, color: "bg-orange-600", description: "Tools for consulting and professional service firms." },
//   { id: "public", label: "Public Sector", icon: <FiGlobe />, color: "bg-orange-600", description: "Government and public administration solutions." },
//   { id: "retail", label: "Retail", icon: <FiShoppingCart />, color: "bg-orange-600", description: "Improving retail operations and customer experience." },
//   { id: "sports", label: "Sports and Entertainment", icon: <FiTarget />, color: "bg-orange-600", description: "Engagement and management tools for sports and entertainment." },
//   { id: "telecom", label: "Telecommunications", icon: <FiActivity />, color: "bg-orange-600", description: "Infrastructure and service management for telecom." },
//   { id: "travel", label: "Travel and Transportation", icon: <FiMapPin />, color: "bg-orange-600", description: "Logistics and travel planning solutions." },
//   { id: "utilities", label: "Utilities", icon: <FiActivity />, color: "bg-orange-600", description: "Management systems for utility providers." },
//   { id: "wholesale", label: "Wholesale Distribution", icon: <FiTrendingUp />, color: "bg-orange-600", description: "Optimizing wholesale distribution channels." },
// ];

// const companySizesData: CompanySizeItem[] = [
//   { id: "small", label: "Small Businesses", icon: <FiInfo />, color: "bg-orange-600", description: "Tailored solutions for small business needs." },
//   { id: "midsize", label: "Midsize Companies", icon: <FiInfo />, color: "bg-orange-600", description: "Scalable solutions for growing midsize companies." },
//   { id: "large", label: "Large Enterprise", icon: <FiInfo />, color: "bg-orange-600", description: "Comprehensive platforms for large enterprises." },
// ];

// export default function Candybox() {
//   // State
//   const [selectedItems, setSelectedItems] = useState<SelectedItemInfo[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     btp: true, // Open the Business Technology Platform category by default
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [theme, setTheme] = useState("light"); // 'light' or 'dark'
//   const [viewMode, setViewMode] = useState<"tree" | "card" | "list">("tree"); // 'tree', 'card', 'list'
//   const [selectedInfo, setSelectedInfo] = useState<SelectedItemInfo | null>(null);

//   // Handlers
//   const toggleTheme = () => {
//     setTheme(prev => (prev === "light" ? "dark" : "light"));
//   };

//   const handleToggleSelection = (item: SelectedItemInfo) => {
//     setSelectedItems(prev => {
//       const isSelected = prev.some(
//         (selected) => selected.id === item.id && selected.type === item.type
//       );
//       if (isSelected) {
//         return prev.filter(
//           (selected) => !(selected.id === item.id && selected.type === item.type)
//         );
//       } else {
//         return [...prev, item];
//       }
//     });
//     setSelectedInfo(item); // Display info for the newly selected item
//   };

//   const removeSelectedItem = (itemToRemove: SelectedItemInfo) => {
//     setSelectedItems(prev =>
//       prev.filter(
//         (item) => !(item.id === itemToRemove.id && item.type === itemToRemove.type)
//       )
//     );
//     if (selectedInfo?.id === itemToRemove.id && selectedInfo?.type === itemToRemove.type) {
//       setSelectedInfo(null);
//     }
//   };

//   const resetAllSelections = () => {
//     setSelectedItems([]);
//     setSearchTerm("");
//     setExpandedCategories({ btp: true }); // Reset BTP to expanded
//     setSelectedInfo(null);
//   };

//   const toggleCategoryExpand = (categoryId: string) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filtered data based on search term
//   const filterData = <T extends { label: string }>(data: T[], term: string) => {
//     return data.filter((item) =>
//       item.label.toLowerCase().includes(term.toLowerCase())
//     );
//   };

//   const filteredPortfolioCategories = filterData(portfolioCategories, searchTerm);
//   const filteredIndustries = filterData(industriesData, searchTerm);
//   const filteredCompanySizes = filterData(companySizesData, searchTerm);

//   // Determine text and background colors based on theme
//   const textColor = theme === "dark" ? "dark:text-white text-gray-800" : "text-gray-800";
//   const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
//   const primaryButtonBg = "bg-orange-600 hover:bg-orange-700";
//   const secondaryBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";
//   const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-200";

//   const isItemSelected = (item: SelectedItemInfo) =>
//     selectedItems.some(
//       (selected) => selected.id === item.id && selected.type === item.type
//     );

//   // Components for different views
//   const TreeView = () => (
//     <div className={`space-y-4 ${textColor}`}>
//       {filteredPortfolioCategories.map(category => (
//         <div key={category.id} className={`border rounded-md ${borderColor} ${secondaryBg}`}>
//           <div className="flex items-center p-3 cursor-pointer" onClick={() => toggleCategoryExpand(category.id)}>
//             <input
//               type="checkbox"
//               id={category.id}
//               checked={isItemSelected({ type: 'category', id: category.id, label: category.label })}
//               onChange={(e) => {
//                 e.stopPropagation(); // Prevent toggling expand when checking checkbox
//                 handleToggleSelection({ type: 'category', id: category.id, label: category.label, description: `Category: ${category.label}` });
//               }}
//               className="mr-2 accent-orange-600"
//             />
//             {expandedCategories[category.id] ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
//             <FiPackage className="text-orange-600 mr-2" />
//             <label htmlFor={category.id} className="font-medium flex-1 cursor-pointer">
//               {category.label}
//             </label>
//             {category.info && (
//               <button onClick={(e) => { e.stopPropagation(); setSelectedInfo({ type: 'category', id: category.id, label: category.label, description: `More info about ${category.label}.` }); }} className="ml-2 text-gray-500 hover:text-orange-600">
//                 <FiInfo />
//               </button>
//             )}
//           </div>

//           {expandedCategories[category.id] && category.subcategories && (
//             <div className="pl-8 py-2">
//               {category.subcategories.map(sub => (
//                 <div key={sub.id} className={`border-l-2 ${borderColor} ml-2 mb-2`}>
//                   <div className="flex items-center p-2 cursor-pointer" onClick={() => toggleCategoryExpand(sub.id)}>
//                     <input
//                       type="checkbox"
//                       id={sub.id}
//                       checked={isItemSelected({ type: 'subcategory', id: sub.id, label: sub.label, parent: category.label })}
//                       onChange={(e) => {
//                         e.stopPropagation();
//                         handleToggleSelection({ type: 'subcategory', id: sub.id, label: sub.label, parent: category.label, description: `Subcategory of ${category.label}: ${sub.label}` });
//                       }}
//                       className="mr-2 accent-orange-600"
//                     />
//                     {expandedCategories[sub.id] ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
//                     <FiLayers className="text-orange-500 mr-2" />
//                     <label htmlFor={sub.id} className="flex-1 cursor-pointer">
//                       {sub.label}
//                     </label>
//                     <button onClick={(e) => { e.stopPropagation(); setSelectedInfo({ type: 'subcategory', id: sub.id, label: sub.label, description: `More info about ${sub.label}.` }); }} className="ml-2 text-gray-500 hover:text-orange-600">
//                       <FiInfo />
//                     </button>
//                   </div>
//                   {expandedCategories[sub.id] && sub.products && (
//                     <div className="pl-8 py-2">
//                       {sub.products.map(product => (
//                         <div key={product.id} className={`flex items-center p-2 border-l-2 ${borderColor} ml-2 mb-2`}>
//                           <input
//                             type="checkbox"
//                             id={product.id}
//                             checked={isItemSelected({ type: 'product', id: product.id, label: product.label, parent: sub.label })}
//                             onChange={() => handleToggleSelection({ type: 'product', id: product.id, label: product.label, parent: sub.label, description: `Product under ${sub.label}: ${product.label}` })}
//                             className="mr-2 accent-orange-600"
//                           />
//                           <FiShoppingCart className="text-orange-400 mr-2" />
//                           <label htmlFor={product.id} className="flex-1">
//                             {product.label}
//                           </label>
//                           <button onClick={() => setSelectedInfo({ type: 'product', id: product.id, label: product.label, description: `More info about ${product.label}.` })} className="ml-2 text-gray-500 hover:text-orange-600">
//                             <FiInfo />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   const CardView = ({ data, type }: { data: (IndustryItem | CompanySizeItem)[], type: 'industry' | 'companySize' }) => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {data.map(item => (
//         <div
//           key={item.id}
//           className={`rounded-lg p-4 border transition-all cursor-pointer ${borderColor} ${isItemSelected({ type: type, id: item.id, label: item.label })
//             ? "border-orange-600 shadow-lg " + (theme === "dark" ? "bg-gray-700" : "bg-orange-50")
//             : (theme === "dark" ? "bg-gray-900 hover:bg-gray-700" : "bg-white hover:shadow-sm")} ${textColor}`}
//           onClick={() => handleToggleSelection({ type: type, id: item.id, label: item.label, description: item.description })}
//         >
//           <div className="flex items-center mb-2">
//             <div className={`text-white p-2 rounded-full mr-3 ${item.color}`}>
//               {item.icon}
//             </div>
//             <div className="font-medium text-lg">{item.label}</div>
//           </div>
//           <p className="text-sm dark:text-white text-gray-600 line-clamp-2">{item.description}</p>
//           {isItemSelected({ type: type, id: item.id, label: item.label }) && (
//             <div className="text-xs text-orange-600 mt-2 flex items-center">
//               <FiCheckCircle className="mr-1" /> Selected
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   const ListView = ({ data, type }: { data: (CategoryItem | IndustryItem | CompanySizeItem)[], type: 'category' | 'industry' | 'companySize' }) => (
//     <div className="space-y-2">
//       {data.map(item => (
//         <div
//           key={item.id}
//           className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${borderColor} ${isItemSelected({ type: type, id: item.id, label: item.label })
//             ? "border-orange-600 " + (theme === "dark" ? "bg-gray-700" : "bg-orange-50")
//             : (theme === "dark" ? "bg-gray-900 hover:bg-gray-700" : "bg-white hover:shadow-sm")} ${textColor}`}
//           onClick={() => handleToggleSelection({ type: type, id: item.id, label: item.label, description: (item as any).description || `Item: ${item.label}` })}
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id={item.id}
//               checked={isItemSelected({ type: type, id: item.id, label: item.label })}
//               onChange={(e) => {
//                 e.stopPropagation();
//                 handleToggleSelection({ type: type, id: item.id, label: item.label, description: (item as any).description || `Item: ${item.label}` });
//               }}
//               className="mr-3 accent-orange-600"
//             />
//             {(item as IndustryItem).icon ? <div className={`p-1 rounded-full mr-2 ${(item as IndustryItem).color}`}>{((item as IndustryItem).icon)}</div> : <FiLayers className="mr-2 text-gray-500" />}
//             <label htmlFor={item.id} className="flex-1 font-medium">
//               {item.label}
//             </label>
//           </div>
//           <button onClick={(e) => { e.stopPropagation(); setSelectedInfo({ type: type, id: item.id, label: item.label, description: (item as any).description || `More info about ${item.label}.` }); }} className="ml-2 text-gray-500 hover:text-orange-600">
//             <FiInfo />
//           </button>
//         </div>
//       ))}
//     </div>
//   );


//   return (
//     <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
//       <div className="flex h-screen">
//         {/* Left Panel */}
//         <div className={`w-1/4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-800"} text-white flex flex-col p-8 shadow-lg`}>
//           <div className="flex justify-center mb-8">
//             <div className="relative">
//               <div className="h-32 w-32 rounded-full border-4 border-white flex items-center justify-center">
//                 <CgMenuGridR size={48} className="text-orange-400" />
//               </div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className={`rounded-full p-2 w-20 h-20 flex items-center justify-center ${primaryButtonBg}`}>
//                   <FiGrid className="w-10 h-10 text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <h2 className="text-3xl font-bold text-center mb-4">What are your interests?</h2>
//           <p className="text-center mb-8 text-gray-300">
//             Select the topics that interest you to personalize your Excellencia experience.
//           </p>

//           <div className="space-y-4 mb-8">
//             <div className="flex items-center">
//               <div className="bg-orange-600 p-1 rounded mr-2">
//                 <FiPackage className="text-white font-bold" />
//               </div>
//               <span>Portfolio Category</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-orange-500 p-1 rounded mr-2">
//                 <FiLayers className="text-white font-bold" />
//               </div>
//               <span>Portfolio Subcategory</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-orange-400 p-1 rounded mr-2">
//                 <FiShoppingCart className="text-white font-bold" />
//               </div>
//               <span>Product</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-orange-300 p-1 rounded mr-2">
//                 <FiBriefcase className="text-white font-bold" />
//               </div>
//               <span>Industry</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-orange-200 p-1 rounded mr-2">
//                 <FiUsers className="text-white font-bold" />
//               </div>
//               <span>Company Size</span>
//             </div>
//           </div>

//           <div className="mt-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-xl">Selected items ({selectedItems.length})</h3>
//               {selectedItems.length > 0 && (
//                 <button
//                   onClick={resetAllSelections}
//                   className="flex items-center text-sm text-orange-400 hover:text-orange-200 transition-colors"
//                 >
//                   <FiRefreshCw size={14} className="mr-1" />
//                   Reset
//                 </button>
//               )}
//             </div>

//             <div className={`max-h-64 overflow-y-auto ${theme === "dark" ? "bg-gray-700" : "bg-blue-800"} p-3 rounded-md`}>
//               {selectedItems.length === 0 ? (
//                 <p className="text-gray-800 text-sm">No items selected yet.</p>
//               ) : (
//                 selectedItems.map(item => (
//                   <div key={`${item.type}-${item.id}`} className={`${theme === "dark" ? "bg-gray-600" : "bg-blue-600"} rounded-md p-2 mb-2 flex items-center justify-between`}>
//                     <span className="text-sm text-white">{item.label}</span>
//                     <button
//                       onClick={() => removeSelectedItem(item)}
//                       className="text-white hover:text-gray-200"
//                     >
//                       <FiX size={16} />
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Content */}
//         <div className={`flex-1 overflow-y-auto relative flex ${bgColor} ${textColor}`}>
//           {/* Main content area */}
//           <div className="flex-1 p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Explore Excellencia Offerings</h2>
//               <div className="flex items-center space-x-4">
//                 {/* Dark/Light Mode Toggle */}
//                 <button
//                   onClick={toggleTheme}
//                   className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"} hover:shadow-md transition-all`}
//                   title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
//                 >
//                   {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
//                 </button>

//                 {/* View Mode Buttons */}
//                 <div className={`flex rounded-full p-1 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
//                   <button
//                     onClick={() => setViewMode("tree")}
//                     className={`p-2 rounded-full ${viewMode === "tree" ? primaryButtonBg + " text-white" : "text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
//                     title="Tree View"
//                   >
//                     <FiHardDrive size={20} />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("card")}
//                     className={`p-2 rounded-full ${viewMode === "card" ? primaryButtonBg + " text-white" : "text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
//                     title="Card View"
//                   >
//                     <FiGrid size={20} />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`p-2 rounded-full ${viewMode === "list" ? primaryButtonBg + " text-white" : "text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
//                     title="List View"
//                   >
//                     <FiList size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>


//             <div className="mb-6 relative">
//               <input
//                 type="text"
//                 placeholder="Search categories, industries, or company sizes..."
//                 className={`w-full p-3 pl-10 rounded-full ${borderColor} border ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"} focus:outline-none focus:ring-2 focus:ring-orange-600`}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ${theme === "dark" ? "text-gray-800" : ""}`} />
//             </div>

//             {/* Render based on viewMode */}
//             {viewMode === "tree" && (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">Portfolio Categories (Tree View)</h3>
//                 <TreeView />
//               </>
//             )}

//             {viewMode === "card" && (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">Industries (Card View)</h3>
//                 <CardView data={filteredIndustries} type="industry" />

//                 <h3 className="text-xl font-semibold mt-8 mb-4">Company Sizes (Card View)</h3>
//                 <CardView data={filteredCompanySizes} type="companySize" />
//               </>
//             )}

//             {viewMode === "list" && (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">All Items (List View)</h3>
//                 <ListView data={filteredPortfolioCategories} type="category" />
//                 <ListView data={filteredIndustries} type="industry" />
//                 <ListView data={filteredCompanySizes} type="companySize" />
//               </>
//             )}


//             <div className="mt-8 flex justify-center">
//               <button
//                 className={`${primaryButtonBg} text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg`}
//               >
//                 Save and Continue
//               </button>
//             </div>
//           </div>

//           {/* Right Bar Information */}
//           <div className={`w-1/4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} ${borderColor} border-l p-6 overflow-y-auto shadow-inner`}>
//             <h3 className="text-xl font-bold mb-4">Information Panel</h3>
//             {selectedInfo ? (
//               <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} p-4 rounded-md shadow-md`}>
//                 <h4 className="text-lg font-semibold text-orange-600 mb-2">{selectedInfo.label}</h4>
//                 <p className="text-sm mb-2">
//                   <span className="font-medium">Type:</span> {selectedInfo.type.charAt(0).toUpperCase() + selectedInfo.type.slice(1)}
//                 </p>
//                 {selectedInfo.parent && (
//                   <p className="text-sm mb-2">
//                     <span className="font-medium">Parent:</span> {selectedInfo.parent}
//                   </p>
//                 )}
//                 <p className="text-sm text-gray-700 dark:text-white">
//                   {selectedInfo.description || "No detailed description available for this item."}
//                 </p>
//                 <button
//                   onClick={() => setSelectedInfo(null)}
//                   className="mt-4 text-sm text-orange-600 hover:text-orange-800 flex items-center"
//                 >
//                   <FiX size={14} className="mr-1" /> Close Info
//                 </button>
//               </div>
//             ) : (
//               <div className="text-gray-500 dark:text-white text-center py-10">
//                 <FiInfo size={40} className="mx-auto mb-3" />
//                 <p>Click on an item to see more information here.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// // Placeholder icons (replacing react-icons due to compilation issue)
// // You can replace these with more elaborate SVGs if needed, or re-introduce react-icons if the environment supports it.
// const IconRefreshCw = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.5 9a11.95 11.95 0 0 1 0-2c.7-3.9 4-7 9-7 5.16 0 9 3.82 9 8.5 0 3.03-2.14 5.82-5.44 7.07M20.94 17.5l-2.43 2.43"></path></svg>;
// const IconChevronRight = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
// const IconChevronDown = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
// const IconGrid = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
// const IconMenu = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
// const IconX = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
// const IconPackage = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0-3.5 3.5V19h14V8.5A3.5 3.5 0 0 0 17 5z"></path></svg>;
// const IconLayers = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
// const IconSearch = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
// const IconInfo = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
// const IconSun = ({ size = 20, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
// const IconMoon = ({ size = 20, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
// const IconFolder = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
// const IconFolderOpen = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M6 13L21 13"></path></svg>;

// // Specific icons that were used for industries and company sizes
// // Replaced with simple textual representation or generic icon.
// const IndustryIcon = ({ icon, color }) => <span className={`${color} text-white p-1 rounded-full`}>{icon}</span>;
// const CompanySizeIcon = ({ icon, color }) => <span className={`${color} text-white p-2 rounded-full`}>{icon}</span>;
// const MainGridIcon = ({ size = 48, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;


// // Types
// type CategoryItem = {
//   id: string;
//   label: string;
//   info?: boolean;
//   description?: string; // Added for sidebar info
//   subcategories?: { id: string; label: string; description?: string; products?: string[] }[]; // Added description and products
// };

// type IndustryItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   color: string;
//   description?: string; // Added for sidebar info
// };

// type CompanySizeItem = {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   color: string;
//   description?: string; // Added for sidebar info
// };

// // Data (Enhanced with descriptions for the sidebar)
// const portfolioCategories: CategoryItem[] = [
//   { id: "ai", label: "Artificial Intelligence", info: true, description: "Leverage AI to automate processes, gain insights, and drive innovation across your business." },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     description: "The Business Technology Platform integrates data and analytics, application development, and automation.",
//     subcategories: [
//       { id: "appdev", label: "Application Development and Automation", description: "Build and extend applications with low-code and pro-code tools, automate processes, and innovate faster.", products: ["Excellencia Process Automation", "Excellencia Business Application Studio"] },
//       { id: "data", label: "Data and Analytics", description: "Manage, analyze, and visualize your data to make informed decisions and discover new opportunities.", products: ["Excellencia Data Warehouse Cloud", "Excellencia Analytics Cloud"] },
//       { id: "integration", label: "Integration", description: "Connect systems, applications, and data sources to streamline operations and ensure seamless data flow.", products: ["Excellencia Integration Suite", "Ariba Cloud Integration", "Excellencia Advanced Data Migration and Management by Syniti"] }
//     ]
//   },
//   { id: "crm", label: "CRM and Customer Experience", info: true, description: "Deliver exceptional customer experiences and build lasting relationships with comprehensive CRM solutions." },
//   { id: "erp", label: "Enterprise Resource Planning", info: true, description: "Streamline core business processes, from finance to supply chain, with integrated ERP software." },
//   { id: "finance", label: "Financial Management", info: true, description: "Optimize financial operations, ensure compliance, and gain real-time financial insights." },
//   { id: "hcm", label: "Human Capital Management", info: true, description: "Manage your workforce effectively with solutions for HR, payroll, talent management, and more." },
//   { id: "spend", label: "Spend Management", info: true, description: "Control and optimize all aspects of your company's spending, from procurement to travel expenses." },
//   { id: "scm", label: "Supply Chain Management", info: true, description: "Build a resilient and efficient supply chain, from planning and sourcing to delivery and returns." }
// ];

// const industriesData: IndustryItem[] = [
//   { id: "aerospace", label: "Aerospace and Defense", icon: "🚀", color: "bg-indigo-500", description: "Solutions for managing complex projects and supply chains in aerospace and defense." },
//   { id: "automotive", label: "Automotive", icon: "🚗", color: "bg-red-500", description: "Drive innovation and efficiency in automotive manufacturing and supply." },
//   { id: "banking", label: "Banking", icon: "💰", color: "bg-green-500", description: "Modern banking solutions for retail, commercial, and investment banking." },
//   { id: "chemicals", label: "Chemicals", icon: "🧪", color: "bg-purple-500", description: "Manage chemical production, logistics, and regulatory compliance." },
//   { id: "consumer", label: "Consumer Products", icon: "🛒", color: "bg-yellow-500", description: "Connect with consumers, manage brands, and optimize supply chains for consumer goods." },
//   { id: "defense", label: "Defense and Security", icon: "🛡️", color: "bg-gray-700", description: "Specialized solutions for defense and security operations and logistics." },
//   { id: "education", label: "Education and Research", icon: "📚", color: "bg-pink-500", description: "Empower educational institutions with modern management and learning tools." },
//   { id: "engineering", label: "Engineering and Construction", icon: "🏗️", color: "bg-orange-500", description: "Project management, asset lifecycle management, and finance solutions for engineering and construction." },
//   { id: "healthcare", label: "Healthcare", icon: "🏥", color: "bg-teal-500", description: "Improve patient outcomes and operational efficiency in healthcare organizations." },
//   { id: "tech", label: "High Tech", icon: "💻", color: "bg-cyan-500", description: "Accelerate innovation and time-to-market for high-tech companies." },
//   { id: "insurance", label: "Insurance", icon: "☔", color: "bg-amber-500", description: "Transform insurance operations with solutions for policy, claims, and customer management." },
//   { id: "life", label: "Life Sciences", icon: "🧬", color: "bg-lime-500", description: "Support R&D, clinical trials, manufacturing, and compliance in life sciences." },
//   { id: "media", label: "Media", icon: "📺", color: "bg-violet-500", description: "Manage content, advertising, and distribution for media companies." },
//   { id: "mill", label: "Mill Products", icon: "🏭", color: "bg-rose-500", description: "Optimize production and supply chain for mill products like paper, wood, and metals." },
//   { id: "mining", label: "Mining", icon: "⛏️", color: "bg-slate-500", description: "Solutions for efficient and sustainable mining operations." },
//   { id: "oil", label: "Oil, Gas, and Energy", icon: "⛽", color: "bg-fuchsia-500", description: "Optimize energy production, distribution, and asset management." },
//   { id: "professional", label: "Professional Services", icon: "👔", color: "bg-sky-500", description: "Boost productivity and project profitability for professional services firms." },
//   { id: "public", label: "Public Sector", icon: "🏛️", color: "bg-emerald-500", description: "Digital transformation solutions for government and public administration." },
//   { id: "retail", label: "Retail", icon: "🛍️", color: "bg-orange-400", description: "Engage customers, manage inventory, and optimize retail operations." },
//   { id: "sports", label: "Sports and Entertainment", icon: "🏆", color: "bg-red-400", description: "Enhance fan experience and streamline operations for sports and entertainment venues." },
//   { id: "telecom", label: "Telecommunications", icon: "📞", color: "bg-indigo-400", description: "Manage services, networks, and customer relationships in telecommunications." },
//   { id: "travel", label: "Travel and Transportation", icon: "✈️", color: "bg-green-400", description: "Optimize travel services, logistics, and passenger experience." },
//   { id: "utilities", label: "Utilities", icon: "💡", color: "bg-orange-300", description: "Manage utility operations, infrastructure, and customer services." },
//   { id: "wholesale", label: "Wholesale Distribution", icon: "📦", color: "bg-purple-400", description: "Improve efficiency and profitability in wholesale distribution." }
// ];

// const companySizesData: CompanySizeItem[] = [
//   { id: "small", label: "Small Businesses", icon: "🏢", color: "bg-green-500", description: "Solutions tailored for the unique needs of small businesses." },
//   { id: "midsize", label: "Midsize Companies", icon: "🏭", color: "bg-yellow-500", description: "Scalable solutions designed for growing midsize companies." },
//   { id: "large", label: "Large Enterprise", icon: "🏛️", color: "bg-gray-700", description: "Comprehensive enterprise solutions for large, complex organizations." }
// ];

// // Helper function to get the current theme class
// const getThemeClass = (isDarkMode: boolean) =>
//   isDarkMode ? "dark" : "";

// export default function Candybox() {
//   // State
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
//     btp: true // Open the Business Technology Platform category by default in Tree View
//   });
//   const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
//   const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [darkMode, setDarkMode] = useState(false); // Dark Mode state
//   const [currentViewMode, setCurrentViewMode] = useState<"tree" | "card" | "list">("tree"); // View mode state
//   const [showRightSidebar, setShowRightSidebar] = useState(false); // Right sidebar visibility
//   const [rightSidebarInfo, setRightSidebarInfo] = useState<{
//     title: string;
//     description: string;
//     type: string;
//     products?: string[];
//   } | null>(null); // Content for right sidebar
//   const [expandedCardListItems, setExpandedCardListItems] = useState<Record<string, boolean>>({}); // To expand/collapse items in Card/List view

//   // Initialize selected categories based on provided initial state in prompt
//   useEffect(() => {
//     setSelectedCategories([
//       "Excellencia S/Excellencia Cloud",
//       "Artificial Intelligence",
//       "Business Technology Platform",
//       "CRM and Customer Experience",
//       "Enterprise Resource Planning"
//     ]);
//   }, []);

//   // Handlers
//   const toggleSelection = (itemLabel: string, type: "category" | "industry" | "companySize") => {
//     switch (type) {
//       case "category":
//         setSelectedCategories(prev =>
//           prev.includes(itemLabel) ? prev.filter(id => id !== itemLabel) : [...prev, itemLabel]
//         );
//         break;
//       case "industry":
//         setSelectedIndustries(prev =>
//           prev.includes(itemLabel) ? prev.filter(id => id !== itemLabel) : [...prev, itemLabel]
//         );
//         break;
//       case "companySize":
//         setSelectedCompanySizes(prev =>
//           prev.includes(itemLabel) ? prev.filter(id => id !== itemLabel) : [...prev, itemLabel]
//         );
//         break;
//       default:
//         break;
//     }
//   };

//   const toggleCategoryExpand = (categoryId: string) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [categoryId]: !prev[categoryId]
//     }));
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const removeSelectedItem = (item: string) => {
//     setSelectedCategories(prev => prev.filter(id => id !== item));
//     setSelectedIndustries(prev => prev.filter(id => id !== item));
//     setSelectedCompanySizes(prev => prev.filter(id => id !== item));
//   };

//   const resetAllSelections = () => {
//     setSelectedCategories([]);
//     setSelectedIndustries([]);
//     setSelectedCompanySizes([]);
//     setSearchTerm("");
//     setExpandedCategories({ btp: true }); // Reset BTP expansion
//     setShowRightSidebar(false);
//     setRightSidebarInfo(null);
//     setExpandedCardListItems({}); // Reset expanded cards/list items
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(prev => !prev);
//   };

//   const handleItemClickForSidebar = (
//     title: string,
//     description: string,
//     type: string,
//     products?: string[]
//   ) => {
//     setRightSidebarInfo({ title, description, type, products });
//     setShowRightSidebar(true);
//     // For Card/List view, also toggle expansion
//     setExpandedCardListItems(prev => ({
//       ...prev,
//       [title]: !prev[title]
//     }));
//   };

//   // Filtered data based on search
//   const filterData = <T extends { label: string }>(data: T[]) => {
//     if (!searchTerm) return data;
//     return data.filter(item =>
//       item.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const filteredPortfolioCategories = filterData(portfolioCategories);
//   const filteredIndustries = filterData(industriesData);
//   const filteredCompanySizes = filterData(companySizesData);

//   // --- Components for View Modes ---

//   // Category Tree Item Component (Recursive for subcategories)
//   const CategoryTreeItem: React.FC<{
//     category: CategoryItem;
//     level?: number;
//   }> = ({ category, level = 0 }) => {
//     const isExpanded = expandedCategories[category.id];
//     const hasSubcategories = category.subcategories && category.subcategories.length > 0;
//     const isSelected = selectedCategories.includes(category.label);

//     return (
//       <div className={`transition-all duration-300 ${level > 0 ? "pl-6" : ""}`}>
//         <div
//           className={`flex justify-between items-center py-2 rounded-md cursor-pointer
//             ${isSelected
//               ? "bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100"
//               : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
//             }
//           `}
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id={`cat-${category.id}`}
//               checked={isSelected}
//               onChange={() => toggleSelection(category.label, "category")}
//               className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
//             />
//             <label
//               htmlFor={`cat-${category.id}`}
//               className="flex items-center font-medium"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent label click from expanding/collapsing
//                 handleItemClickForSidebar(
//                   category.label,
//                   category.description || "No description available.",
//                   "Category",
//                   category.subcategories?.flatMap(sub => sub.products || [])
//                 );
//               }}
//             >
//               {hasSubcategories ? (isExpanded ? <IconFolderOpen className="mr-1 text-orange-500" /> : <IconFolder className="mr-1 text-orange-500" />) : <IconPackage className="mr-1 text-gray-600 dark:text-white" />}
//               {category.label}
//             </label>
//             {category.info && (
//               <button
//                 className="ml-2 text-gray-500 hover:text-orange-500 dark:text-white dark:hover:text-orange-300 transition-colors"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleItemClickForSidebar(
//                     category.label,
//                     category.description || "No description available.",
//                     "Category",
//                     category.subcategories?.flatMap(sub => sub.products || [])
//                   );
//                 }}
//               >
//                 <IconInfo size={16} />
//               </button>
//             )}
//           </div>
//           {hasSubcategories && (
//             <button
//               onClick={() => toggleCategoryExpand(category.id)}
//               className="flex items-center text-orange-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
//             >
//               <span className="mr-1 text-sm font-normal">
//                 {isExpanded ? "Hide Subcategories" : "Show Subcategories"}
//               </span>
//               {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
//             </button>
//           )}
//         </div>

//         {hasSubcategories && isExpanded && (
//           <div className="border-l border-gray-200 dark:border-gray-600 ml-3 mt-2 pb-2">
//             {category.subcategories?.map(sub => (
//               <div key={sub.id} className="flex justify-between items-center pl-6 py-2 rounded-md cursor-pointer
//                 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`sub-${sub.id}`}
//                     checked={selectedCategories.includes(sub.label)}
//                     onChange={() => toggleSelection(sub.label, "category")}
//                     className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
//                   />
//                   <label
//                     htmlFor={`sub-${sub.id}`}
//                     className="flex items-center"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleItemClickForSidebar(
//                         sub.label,
//                         sub.description || "No description available.",
//                         "Subcategory",
//                         sub.products
//                       );
//                     }}
//                   >
//                     <IconLayers className="mr-1 text-blue-500" /> {sub.label}
//                   </label>
//                 </div>
//                 {sub.products && sub.products.length > 0 && (
//                   <button
//                     className="flex items-center text-orange-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleItemClickForSidebar(
//                         sub.label,
//                         sub.description || "No description available.",
//                         "Subcategory",
//                         sub.products
//                       );
//                     }}
//                   >
//                     <span className="mr-1 text-sm font-normal">Products</span>
//                     <IconChevronRight size={16} />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Generic Card View Item
//   const CardViewItem: React.FC<{
//     item: CategoryItem | IndustryItem | CompanySizeItem;
//     type: "category" | "industry" | "companySize";
//   }> = ({ item, type }) => {
//     const isSelected =
//       (type === "category" && selectedCategories.includes(item.label)) ||
//       (type === "industry" && selectedIndustries.includes(item.label)) ||
//       (type === "companySize" && selectedCompanySizes.includes(item.label));

//     const isExpanded = expandedCardListItems[item.label];

//     const itemIcon =
//       (item as IndustryItem).icon || (item as CompanySizeItem).icon || "📦"; // Fallback to emoji
//     const itemColor =
//       (item as IndustryItem).color || (item as CompanySizeItem).color || "bg-gray-500";

//     const description = (item as CategoryItem).description || (item as IndustryItem).description || (item as CompanySizeItem).description || "No description available.";
//     const products = (item as CategoryItem).subcategories?.flatMap(sub => sub.products || []);

//     return (
//       <div
//         className={`rounded-lg p-6 border transition-all duration-300 cursor-pointer shadow-md
//           ${isSelected
//             ? "border-orange-500 bg-orange-50 text-white dark:bg-orange-400 p-2"
//             : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text:white hover:shadow-lg"
//           }
//           text-gray-800 dark:text-white`}
//         onClick={() => {
//           toggleSelection(item.label, type);
//           handleItemClickForSidebar(item.label, description, type, products);
//         }}
//       >
//         <div className="flex items-center mb-2">
//           <div className={`${itemColor} text-white p-2 rounded-full mr-3`}>
//             {itemIcon}
//           </div>
//           <div className="font-medium text-lg flex-grow">{item.label}</div>
//           {isSelected && (
//             <span className="text-orange-500 text-sm font-semibold ml-2">Selected</span>
//           )}
//         </div>
//         {isExpanded && (
//           <div className="mt-2 text-sm text-gray-600 dark:text-white">
//             {description}
//             {products && products.length > 0 && (
//               <div className="mt-2">
//                 <h4 className="font-semibold">Products:</h4>
//                 <ul className="list-disc list-inside">
//                   {products.map((product, idx) => (
//                     <li key={idx}>{product}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Generic List View Item
//   const ListViewItem: React.FC<{
//     item: CategoryItem | IndustryItem | CompanySizeItem;
//     type: "category" | "industry" | "companySize";
//   }> = ({ item, type }) => {
//     const isSelected =
//       (type === "category" && selectedCategories.includes(item.label)) ||
//       (type === "industry" && selectedIndustries.includes(item.label)) ||
//       (type === "companySize" && selectedCompanySizes.includes(item.label));
//     const isExpanded = expandedCardListItems[item.label];

//     const itemIcon =
//       (item as IndustryItem).icon || (item as CompanySizeItem).icon || "📦"; // Fallback to emoji

//     const description = (item as CategoryItem).description || (item as IndustryItem).description || (item as CompanySizeItem).description || "No description available.";
//     const products = (item as CategoryItem).subcategories?.flatMap(sub => sub.products || []);

//     return (
//       <div
//         className={`border-b border-gray-200 dark:border-gray-700 py-3 cursor-pointer transition-all duration-300
//           ${isSelected
//             ? "bg-orange-50 dark:bg-orange-500"
//             : "hover:bg-gray-50 dark:hover:bg-gray-700"
//           }
//           text-gray-800 dark:text-white`}
//         onClick={() => {
//           toggleSelection(item.label, type);
//           handleItemClickForSidebar(item.label, description, type, products);
//         }}
//       >
//         <div className="flex items-center justify-between">
//           <div className="flex items-center ml-3">
//             <input
//               type="checkbox"
//               id={`list-${item.id}`}
//               checked={isSelected}
//               onChange={() => toggleSelection(item.label, type)}
//               className="mr-3 rounded-md text-orange-500 focus:ring-orange-500"
//             />
//             <label htmlFor={`list-${item.id}`} className="flex items-center font-medium">
//               {itemIcon && <span className="mr-2 text-gray-800 dark:text-white">{itemIcon}</span>}
//               {item.label}
//             </label>
//           </div>
//           {isExpanded ? (
//             <IconChevronDown size={18} className="text-gray-500 dark:text-white" />
//           ) : (
//             <IconChevronRight size={18} className="text-gray-500 dark:text-white" />
//           )}
//         </div>
//         {isExpanded && (
//           <div className="pl-9 mt-2 text-sm text-gray-600 dark:text-white">
//             {description}
//             {products && products.length > 0 && (
//               <div className="mt-2">
//                 <h4 className="font-semibold">Products:</h4>
//                 <ul className="list-disc list-inside">
//                   {products.map((product, idx) => (
//                     <li key={idx}>{product}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className={`font-inter min-h-screen ${getThemeClass(darkMode)}`}>
//       <div className={`flex flex-col md:flex-row min-h-screen
//         ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
//       >
//         {/* Left Panel */}
//         <div className={`w-full md:w-2/6 p-8 flex flex-col  shadow-xl
//           ${darkMode ? "bg-gray-800" : "bg-gray-800 text-gray-800"}`}
//         >
 

//           <div className="flex justify-center mb-8">
//             <div className="relative">
//               <div className={`h-32 w-32 rounded-full border-4 flex items-center justify-center
//                 ${darkMode ? "border-gray-600" : "border-white"}`}
//               >
//                 <MainGridIcon size={48} className={darkMode ? "text-gray-800" : "text-white"} />
//               </div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="bg-orange-500 rounded-full p-2 w-20 h-20 flex items-center justify-center shadow-lg">
//                   <svg viewBox="0 0 50 50" className="w-10 h-10 text-white">
//                     <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
//                     <circle cx="25" cy="15" r="5" fill="currentColor" />
//                     <path d="M15,25 A10,10 0 0,1 35,25" fill="none" stroke="currentColor" strokeWidth="2" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <h2 className="text-2xl font-bold text-center mb-4">What are your interests?</h2>
//           <p className="text-center mb-8 text-gray-300">
//             Select the topics that interest you to personalize your Excellencia experience.
//           </p>

//           <div className="space-y-4 mb-8">
//             <div className="flex items-center">
//               <div className="bg-orange-500 p-1 rounded mr-2">
//                 <span className="text-white font-bold">📁</span>
//               </div>
//               <span>Portfolio category</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-blue-500 p-1 rounded mr-2">
//                 <span className="text-white font-bold">📋</span>
//               </div>
//               <span>Portfolio subcategory</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-orange-500 p-1 rounded mr-2">
//                 <span className="text-white font-bold">🛒</span>
//               </div>
//               <span>Product</span>
//             </div>
//           </div>

//           <div className="mt-auto"> {/* Aligns to bottom */}
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-medium text-lg">Selected items: {selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length}</h3>
//               {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 0 && (
//                 <button
//                   onClick={resetAllSelections}
//                   className="flex items-center text-sm text-orange-300 hover:text-orange-100 transition-colors duration-200"
//                 >
//                   <IconRefreshCw size={14} className="mr-1" />
//                   Reset Selection
//                 </button>
//               )}
//             </div>

//             <div className={`max-h-64 overflow-y-auto p-3 rounded-md shadow-inner
//               ${darkMode ? "bg-gray-700" : "bg-gray-700"}`}
//             >
//               {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].slice(0, 5).map(item => (
//                 <div key={item} className={`rounded-md p-2 mb-2 flex items-center justify-between shadow-sm
//                   ${darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-600 text-gray-100"}`}
//                 >
//                   <span className="text-sm">{item}</span>
//                   <button
//                     onClick={() => removeSelectedItem(item)}
//                     className="text-orange-200 hover:text-white transition-colors duration-200"
//                   >
//                     <IconX size={16} />
//                   </button>
//                 </div>
//               ))}
//               {(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) > 5 && (
//                 <div className="text-center text-orange-200 mt-2">
//                   +{(selectedCategories.length + selectedIndustries.length + selectedCompanySizes.length) - 5} more
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Content */}
//         <div className={`w-full md:w-2/3 p-6 overflow-y-auto relative transition-colors duration-300
//           ${darkMode ? "bg-gray-900" : "bg-white"}`}
//         >
//           <h2 className={`text-xl font-bold mb-4
//             ${darkMode ? "text-white" : "text-gray-800"}`}
//           >
//             Select from the portfolio categories, subcategories or products
//           </h2>

//           <div className="mb-4 relative">
//             <input
//               type="text"
//               placeholder="Search items..."
//               className={`w-full p-3 pr-10 border rounded-full shadow-sm
//                 ${darkMode
//                   ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
//                   : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
//                 }`}
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <IconSearch className={`absolute right-3 top-3.5
//               ${darkMode ? "text-gray-800" : "text-gray-500"}`}
//             />
//           </div>

//           {/* View Mode Buttons */}
//           <div className="flex justify-start gap-3 mb-6">
//             <button
//               onClick={() => setCurrentViewMode("tree")}
//               className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 shadow-sm
//                 ${currentViewMode === "tree"
//                   ? "bg-orange-500 text-white hover:bg-orange-600"
//                   : `border ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`
//                 }`}
//             >
//               <IconLayers className="mr-2" /> Tree View
//             </button>
//             <button
//               onClick={() => setCurrentViewMode("card")}
//               className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 shadow-sm
//                 ${currentViewMode === "card"
//                   ? "bg-orange-500 text-white hover:bg-orange-600"
//                   : `border ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`
//                 }`}
//             >
//               <IconGrid className="mr-2" /> Card View
//             </button>
//             <button
//               onClick={() => setCurrentViewMode("list")}
//               className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 shadow-sm
//                 ${currentViewMode === "list"
//                   ? "bg-orange-500 text-white hover:bg-orange-600"
//                   : `border ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`
//                 }`}
//             >
//               <IconMenu className="mr-2" /> List View
//             </button>
//           </div>

//           {/* Render content based on currentViewMode */}
//           {currentViewMode === "tree" && (
//             <div className={`space-y-4 p-4 rounded-lg shadow-md
//               ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <h3 className={`text-lg font-semibold mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Portfolio Categories (Tree View)
//               </h3>
//               {filteredPortfolioCategories.map(category => (
//                 <CategoryTreeItem key={category.id} category={category} />
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Industries (Tree View - Basic List)
//               </h3>
//               {filteredIndustries.map(industry => (
//                  <div
//                  key={industry.id}
//                  className={`flex items-center py-2 rounded-md cursor-pointer ${
//                    selectedIndustries.includes(industry.label)
//                      ? "bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100"
//                      : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
//                  }`}
//                  onClick={() => {
//                    toggleSelection(industry.label, "industry");
//                    handleItemClickForSidebar(industry.label, industry.description || "No description available.", "Industry");
//                  }}
//                >
//                  <input
//                    type="checkbox"
//                    id={`ind-${industry.id}`}
//                    checked={selectedIndustries.includes(industry.label)}
//                    onChange={() => toggleSelection(industry.label, "industry")}
//                    className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
//                  />
//                  <label htmlFor={`ind-${industry.id}`} className="flex items-center font-medium">
//                    <span className={`mr-2 ${industry.color} p-1 rounded-full text-white`}>{industry.icon}</span>
//                    {industry.label}
//                  </label>
//                </div>
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Company Sizes (Tree View - Basic List)
//               </h3>
//               {filteredCompanySizes.map(size => (
//                 <div
//                 key={size.id}
//                 className={`flex items-center py-2 rounded-md cursor-pointer ${
//                   selectedCompanySizes.includes(size.label)
//                     ? "bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100"
//                     : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
//                 }`}
//                 onClick={() => {
//                   toggleSelection(size.label, "companySize");
//                   handleItemClickForSidebar(size.label, size.description || "No description available.", "Company Size");
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   id={`size-${size.id}`}
//                   checked={selectedCompanySizes.includes(size.label)}
//                   onChange={() => toggleSelection(size.label, "companySize")}
//                   className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
//                 />
//                 <label htmlFor={`size-${size.id}`} className="flex items-center font-medium">
//                   <span className={`mr-2 ${size.color} p-1 rounded-full text-white`}>{size.icon}</span>
//                   {size.label}
//                 </label>
//               </div>
//               ))}
//             </div>
//           )}

//           {currentViewMode === "card" && (
//             <div className={`space-y-6 p-4 rounded-lg shadow-md
//               ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <h3 className={`text-lg font-semibold mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Portfolio Categories (Card View)
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredPortfolioCategories.map(category => (
//                   <CardViewItem key={category.id} item={category} type="category" />
//                 ))}
//               </div>

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Industries (Card View)
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredIndustries.map(industry => (
//                   <CardViewItem key={industry.id} item={industry} type="industry" />
//                 ))}
//               </div>

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Company Sizes (Card View)
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredCompanySizes.map(size => (
//                   <CardViewItem key={size.id} item={size} type="companySize" />
//                 ))}
//               </div>
//             </div>
//           )}

//           {currentViewMode === "list" && (
//             <div className={`space-y-2 p-4 rounded-lg shadow-md
//               ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <h3 className={`text-lg font-semibold mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Portfolio Categories (List View)
//               </h3>
//               {filteredPortfolioCategories.map(category => (
//                 <ListViewItem key={category.id} item={category} type="category" />
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Industries (List View)
//               </h3>
//               {filteredIndustries.map(industry => (
//                 <ListViewItem key={industry.id} item={industry} type="industry" />
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Company Sizes (List View)
//               </h3>
//               {filteredCompanySizes.map(size => (
//                 <ListViewItem key={size.id} item={size} type="companySize" />
//               ))}
//             </div>
//           )} 
 
//           {currentViewMode === "tree" && (
//             <div className={`space-y-4 p-4 rounded-lg shadow-md
//               ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <h3 className={`text-lg font-semibold mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Portfolio Categories (Tree View)
//               </h3>
//               {filteredPortfolioCategories.map(category => (
//                 <CategoryTreeItem key={category.id} category={category} />
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Industries (Tree View - Basic List)
//               </h3>
//               {filteredIndustries.map(industry => (
//                  <div
//                  key={industry.id}
//                  className={`flex items-center py-2 rounded-md cursor-pointer ${
//                    selectedIndustries.includes(industry.label)
//                      ? "bg-orange-300 text-white dark:bg-orange-300 dark:text-white"
//                      : "bg-white text-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
//                  }`}
//                  onClick={() => {
//                    toggleSelection(industry.label, "industry");
//                    handleItemClickForSidebar(industry.label, industry.description || "No description available.", "Industry");
//                  }}
//                >
//                  <input
//                    type="checkbox"
//                    id={`ind-${industry.id}`}
//                    checked={selectedIndustries.includes(industry.label)}
//                    onChange={() => toggleSelection(industry.label, "industry")}
//                    className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
//                  />
//                  <label htmlFor={`ind-${industry.id}`} className="flex items-center font-medium">
//                    <span className={`mr-2 ${industry.color} p-1 rounded-full text-white`}>{industry.icon}</span>
//                    {industry.label}
//                  </label>
//                </div>
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Company Sizes (Tree View - Basic List)
//               </h3>
//               {filteredCompanySizes.map(size => (
//                 <div
//                 key={size.id}
//                 className={`flex items-center py-2 rounded-md cursor-pointer ${
//                   selectedCompanySizes.includes(size.label)
//                     ? "bg-orange-300 text-white dark:bg-orange-300 dark:text-white"
//                     : "bg-white text-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
//                 }`}
//                 onClick={() => {
//                   toggleSelection(size.label, "companySize");
//                   handleItemClickForSidebar(size.label, size.description || "No description available.", "Company Size");
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   id={`size-${size.id}`}
//                   checked={selectedCompanySizes.includes(size.label)}
//                   onChange={() => toggleSelection(size.label, "companySize")}
//                   className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
//                 />
//                 <label htmlFor={`size-${size.id}`} className="flex items-center font-medium">
//                   <span className={`mr-2 ${size.color} p-1 rounded-full text-white`}>{size.icon}</span>
//                   {size.label}
//                 </label>
//               </div>
//               ))}
//             </div>
//           )}

//           {currentViewMode === "card" && (
//             <div className={`space-y-6 p-4 rounded-lg shadow-md
//               ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <h3 className={`text-lg font-semibold mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Portfolio Categories (Card View)
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredPortfolioCategories.map(category => (
//                   <CardViewItem key={category.id} item={category} type="category" />
//                 ))}
//               </div>

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Industries (Card View)
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredIndustries.map(industry => (
//                   <CardViewItem key={industry.id} item={industry} type="industry" />
//                 ))}
//               </div>

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-white" : "text-gray-800"}`}>
//                 Company Sizes (Card View)
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredCompanySizes.map(size => (
//                   <CardViewItem key={size.id} item={size} type="companySize" />
//                 ))}
//               </div>
//             </div>
//           )}

//           {currentViewMode === "list" && (
//             <div className={`space-y-2 p-4 rounded-lg shadow-md
//               ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <h3 className={`text-lg font-semibold mb-4
//                 ${darkMode ? "text-gray-800" : "text-gray-800"}`}>
//                 Portfolio Categories (List View)
//               </h3>
//               {filteredPortfolioCategories.map(category => (
//                 <ListViewItem key={category.id} item={category} type="category" />
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-gray-800" : "text-gray-800"}`}>
//                 Industries (List View)
//               </h3>
//               {filteredIndustries.map(industry => (
//                 <ListViewItem key={industry.id} item={industry} type="industry" />
//               ))}

//               <h3 className={`text-lg font-semibold mt-8 mb-4
//                 ${darkMode ? "text-gray-800" : "text-gray-800"}`}>
//                 Company Sizes (List View)
//               </h3>
//               {filteredCompanySizes.map(size => (
//                 <ListViewItem key={size.id} item={size} type="companySize" />
//               ))}
//             </div>
//           )}

//           {/* Right Sidebar Information Panel */}
//           <div
//             className={`fixed top-0 right-0 h-full w-full md:w-1/3 lg:w-1/4 shadow-xl p-6 transform transition-transform duration-500 ease-in-out z-50
//               ${showRightSidebar ? "translate-x-0" : "translate-x-full"}
//               ${darkMode ? "bg-gray-700 text-gray-800" : "bg-white text-gray-800"}`}
//           >
//             <button
//               onClick={() => setShowRightSidebar(false)}
//               className={`absolute top-4 right-4 p-2 rounded-full
//                 ${darkMode ? "bg-gray-600 text-gray-800 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
//             >
//               <IconX size={24} />
//             </button>
//             {rightSidebarInfo ? (
//               <div className="pt-10"> {/* Adjusted padding for close button */}
//                 <h3 className={`text-2xl font-bold mb-4
//                   ${darkMode ? "text-orange-300" : "text-orange-600"}`}>
//                   {rightSidebarInfo.title}
//                 </h3>
//                 <p className={`text-sm mb-4 font-semibold
//                   ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
//                   Type: {rightSidebarInfo.type}
//                 </p>
//                 <p className={`text-base leading-relaxed
//                   ${darkMode ? "text-gray-100" : "text-gray-700"}`}>
//                   {rightSidebarInfo.description}
//                 </p>
//                 {rightSidebarInfo.products && rightSidebarInfo.products.length > 0 && (
//                   <div className="mt-6">
//                     <h4 className={`text-lg font-semibold mb-2
//                       ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
//                       Related Products:
//                     </h4>
//                     <ul className="list-disc list-inside space-y-1">
//                       {rightSidebarInfo.products.map((product, idx) => (
//                         <li key={idx} className={`${darkMode ? "text-gray-100" : "text-gray-700"}`}>{product}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className={`flex items-center justify-center h-full text-center
//                 ${darkMode ? "text-gray-800" : "text-gray-500"}`}>
//                 <p>Click on an item to see its details here.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";

// Placeholder icons (replacing react-icons due to compilation issue)
// You can replace these with more elaborate SVGs if needed, or re-introduce react-icons if the environment supports it.
const IconRefreshCw = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.5 9a11.95 11.95 0 0 1 0-2c.7-3.9 4-7 9-7 5.16 0 9 3.82 9 8.5 0 3.03-2.14 5.82-5.44 7.07M20.94 17.5l-2.43 2.43"></path></svg>;
const IconChevronRight = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const IconChevronDown = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconGrid = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconMenu = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconX = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconPackage = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0-3.5 3.5V19h14V8.5A3.5 3.5 0 0 0 17 5z"></path></svg>;
const IconLayers = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
const IconSearch = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconInfo = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const IconSun = ({ size = 20, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const IconMoon = ({ size = 20, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const IconFolder = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
const IconFolderOpen = ({ size = 16, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M6 13L21 13"></path></svg>;

// Specific icons that were used for industries and company sizes
// Replaced with simple textual representation or generic icon.
const IndustryIcon = ({ icon, color }) => <span className={`${color} text-white p-1 rounded-full`}>{icon}</span>;
const CompanySizeIcon = ({ icon, color }) => <span className={`${color} text-white p-2 rounded-full`}>{icon}</span>;
const MainGridIcon = ({ size = 48, className = "" }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;


// Types
type CategoryItem = {
  id: string;
  label: string;
  info?: boolean;
  description?: string; // Added for sidebar info
  subcategories?: { id: string; label: string; description?: string; products?: string[] }[]; // Added description and products
};

type IndustryItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description?: string; // Added for sidebar info
};

type CompanySizeItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description?: string; // Added for sidebar info
};

// // Data (Enhanced with descriptions for the sidebar)
// const portfolioCategories: CategoryItem[] = [
//   { id: "ai", label: "Artificial Intelligence", info: true, description: "Leverage AI to automate processes, gain insights, and drive innovation across your business." },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     description: "The Business Technology Platform integrates data and analytics, application development, and automation.",
//     subcategories: [
//       { id: "appdev", label: "Application Development and Automation", description: "Build and extend applications with low-code and pro-code tools, automate processes, and innovate faster.", products: ["Excellencia Process Automation", "Excellencia Business Application Studio"] },
//       { id: "data", label: "Data and Analytics", description: "Manage, analyze, and visualize your data to make informed decisions and discover new opportunities.", products: ["Excellencia Data Warehouse Cloud", "Excellencia Analytics Cloud"] },
//       { id: "integration", label: "Integration", description: "Connect systems, applications, and data sources to streamline operations and ensure seamless data flow.", products: ["Excellencia Integration Suite", "Ariba Cloud Integration", "Excellencia Advanced Data Migration and Management by Syniti"] }
//     ]
//   },
//   { id: "crm", label: "CRM and Customer Experience", info: true, description: "Deliver exceptional customer experiences and build lasting relationships with comprehensive CRM solutions." },
//   { id: "erp", label: "Enterprise Resource Planning", info: true, description: "Streamline core business processes, from finance to supply chain, with integrated ERP software." },
//   { id: "finance", label: "Financial Management", info: true, description: "Optimize financial operations, ensure compliance, and gain real-time financial insights." },
//   { id: "hcm", label: "Human Capital Management", info: true, description: "Manage your workforce effectively with solutions for HR, payroll, talent management, and more." },
//   { id: "spend", label: "Spend Management", info: true, description: "Control and optimize all aspects of your company's spending, from procurement to travel expenses." },
//   { id: "scm", label: "Supply Chain Management", info: true, description: "Build a resilient and efficient supply chain, from planning and sourcing to delivery and returns." }
// ];

// const industriesData: IndustryItem[] = [
//   { id: "aerospace", label: "Aerospace and Defense", icon: "🚀", color: "bg-indigo-500", description: "Solutions for managing complex projects and supply chains in aerospace and defense." },
//   { id: "automotive", label: "Automotive", icon: "🚗", color: "bg-red-500", description: "Drive innovation and efficiency in automotive manufacturing and supply." },
//   { id: "banking", label: "Banking", icon: "💰", color: "bg-green-500", description: "Modern banking solutions for retail, commercial, and investment banking." },
//   { id: "chemicals", label: "Chemicals", icon: "🧪", color: "bg-purple-500", description: "Manage chemical production, logistics, and regulatory compliance." },
//   { id: "consumer", label: "Consumer Products", icon: "🛒", color: "bg-yellow-500", description: "Connect with consumers, manage brands, and optimize supply chains for consumer goods." },
//   { id: "defense", label: "Defense and Security", icon: "🛡️", color: "bg-gray-700", description: "Specialized solutions for defense and security operations and logistics." },
//   { id: "education", label: "Education and Research", icon: "📚", color: "bg-pink-500", description: "Empower educational institutions with modern management and learning tools." },
//   { id: "engineering", label: "Engineering and Construction", icon: "🏗️", color: "bg-orange-500", description: "Project management, asset lifecycle management, and finance solutions for engineering and construction." },
//   { id: "healthcare", label: "Healthcare", icon: "🏥", color: "bg-teal-500", description: "Improve patient outcomes and operational efficiency in healthcare organizations." },
//   { id: "tech", label: "High Tech", icon: "💻", color: "bg-cyan-500", description: "Accelerate innovation and time-to-market for high-tech companies." },
//   { id: "insurance", label: "Insurance", icon: "☔", color: "bg-amber-500", description: "Transform insurance operations with solutions for policy, claims, and customer management." },
//   { id: "life", label: "Life Sciences", icon: "🧬", color: "bg-lime-500", description: "Support R&D, clinical trials, manufacturing, and compliance in life sciences." },
//   { id: "media", label: "Media", icon: "📺", color: "bg-violet-500", description: "Manage content, advertising, and distribution for media companies." },
//   { id: "mill", label: "Mill Products", icon: "🏭", color: "bg-rose-500", description: "Optimize production and supply chain for mill products like paper, wood, and metals." },
//   { id: "mining", label: "Mining", icon: "⛏️", color: "bg-slate-500", description: "Solutions for efficient and sustainable mining operations." },
//   { id: "oil", label: "Oil, Gas, and Energy", icon: "⛽", color: "bg-fuchsia-500", description: "Optimize energy production, distribution, and asset management." },
//   { id: "professional", label: "Professional Services", icon: "👔", color: "bg-sky-500", description: "Boost productivity and project profitability for professional services firms." },
//   { id: "public", label: "Public Sector", icon: "🏛️", color: "bg-emerald-500", description: "Digital transformation solutions for government and public administration." },
//   { id: "retail", label: "Retail", icon: "🛍️", color: "bg-orange-400", description: "Engage customers, manage inventory, and optimize retail operations." },
//   { id: "sports", label: "Sports and Entertainment", icon: "🏆", color: "bg-red-400", description: "Enhance fan experience and streamline operations for sports and entertainment venues." },
//   { id: "telecom", label: "Telecommunications", icon: "📞", color: "bg-indigo-400", description: "Manage services, networks, and customer relationships in telecommunications." },
//   { id: "travel", label: "Travel and Transportation", icon: "✈️", color: "bg-green-400", description: "Optimize travel services, logistics, and passenger experience." },
//   { id: "utilities", label: "Utilities", icon: "💡", color: "bg-orange-300", description: "Manage utility operations, infrastructure, and customer services." },
//   { id: "wholesale", label: "Wholesale Distribution", icon: "📦", color: "bg-purple-400", description: "Improve efficiency and profitability in wholesale distribution." }
// ];

// const companySizesData: CompanySizeItem[] = [
//   { id: "small", label: "Small Businesses", icon: "🏢", color: "bg-green-500", description: "Solutions tailored for the unique needs of small businesses." },
//   { id: "midsize", label: "Midsize Companies", icon: "🏭", color: "bg-yellow-500", description: "Scalable solutions designed for growing midsize companies." },
//   { id: "large", label: "Large Enterprise", icon: "🏛️", color: "bg-gray-700", description: "Comprehensive enterprise solutions for large, complex organizations." }
// ];

// // Data (Enhanced with descriptions for the sidebar)
// const portfolioCategories: CategoryItem[] = [
//   { id: "ai", label: "Artificial Intelligence", info: true, description: "Leverage AI to automate processes, gain insights, and drive innovation across your business." },
//   {
//     id: "btp",
//     label: "Business Technology Platform",
//     info: true,
//     description: "The Business Technology Platform integrates data and analytics, application development, and automation.",
//     subcategories: [
//       { id: "appdev", label: "Application Development and Automation", description: "Build and extend applications with low-code and pro-code tools, automate processes, and innovate faster.", products: ["Excellencia Process Automation", "Excellencia Business Application Studio"] },
//       { id: "data", label: "Data and Analytics", description: "Manage, analyze, and visualize your data to make informed decisions and discover new opportunities.", products: ["Excellencia Data Warehouse Cloud", "Excellencia Analytics Cloud"] },
//       { id: "integration", label: "Integration", description: "Connect systems, applications, and data sources to streamline operations and ensure seamless data flow.", products: ["Excellencia Integration Suite", "Ariba Cloud Integration", "Excellencia Advanced Data Migration and Management by Syniti"] }
//     ]
//   },
//   {
//     id: "crm",
//     label: "CRM and Customer Experience",
//     info: true,
//     description: "Deliver exceptional customer experiences and build lasting relationships with comprehensive CRM solutions.",
//     subcategories: [
//       { id: "sales", label: "Sales Cloud", description: "Manage your sales processes, from lead to cash, and empower your sales team." },
//       { id: "service", label: "Service Cloud", description: "Deliver exceptional customer service across all channels." },
//       { id: "marketing", label: "Marketing Cloud", description: "Personalize customer engagement and optimize marketing campaigns." },
//       { id: "commerce", label: "Commerce Cloud", description: "Deliver seamless omnichannel commerce experiences." },
//       { id: "customer-data", label: "Customer Data Cloud", description: "Build unified customer profiles and manage consent." }
//     ]
//   },
//   {
//     id: "erp",
//     label: "Enterprise Resource Planning",
//     info: true,
//     description: "Streamline core business processes, from finance to supply chain, with integrated ERP software.",
//     subcategories: [
//       { id: "s4hana", label: "Excellencia S/4HANA", description: "The intelligent ERP for the digital age, running on the Excellencia HANA database." },
//       { id: "business-one", label: "Excellencia Business One", description: "Affordable, easy-to-use ERP for small and midsize businesses." },
//       { id: "bydesign", label: "Excellencia Business ByDesign", description: "Complete cloud ERP for fast-growing midmarket companies." }
//     ]
//   },
//   {
//     id: "finance",
//     label: "Financial Management",
//     info: true,
//     description: "Optimize financial operations, ensure compliance, and gain real-time financial insights.",
//     subcategories: [
//       { id: "accounting", label: "Financial Accounting", description: "Manage general ledger, accounts payable, and accounts receivable." },
//       { id: "controlling", label: "Controlling", description: "Monitor and optimize internal costs and profitability." },
//       { id: "treasury", label: "Treasury Management", description: "Manage cash, liquidity, and financial risks." },
//       { id: "grc", label: "Governance, Risk, and Compliance", description: "Ensure compliance and mitigate risks across your organization." }
//     ]
//   },
//   {
//     id: "hr",
//     label: "HR Management",
//     info: true,
//     description: "Streamline human resources processes from recruitment to talent development and payroll.",
//     subcategories: [
//       { id: "core-hr", label: "Core HR and Payroll", description: "Manage employee data, payroll, and benefits." },
//       { id: "talent", label: "Talent Management", description: "Attract, develop, and retain top talent." }
//     ]
//   },
//   {
//     id: "hcm",
//     label: "Human Capital Management",
//     info: true,
//     description: "Manage your workforce effectively with solutions for HR, payroll, talent management, and more.",
//     subcategories: [
//       { id: "successfactors", label: "Excellencia SuccessFactors", description: "Comprehensive cloud HCM suite for all your HR needs." },
//       { id: "fieldglass", label: "Excellencia Fieldglass", description: "Manage external workforce and services procurement." }
//     ]
//   },
//   {
//     id: "production",
//     label: "Production Management",
//     info: true,
//     description: "Optimize manufacturing processes, from planning and scheduling to quality control and execution.",
//     subcategories: [
//       { id: "planning-scheduling", label: "Production Planning and Scheduling", description: "Optimize production plans and schedules." },
//       { id: "execution", label: "Manufacturing Execution", description: "Monitor and control manufacturing operations in real-time." },
//       { id: "quality", label: "Quality Management", description: "Ensure product quality throughout the manufacturing process." }
//     ]
//   },
//   {
//     id: "project",
//     label: "Project Management",
//     info: true,
//     description: "Plan, execute, and monitor projects efficiently with tools for task management, collaboration, and resource allocation.",
//     subcategories: [
//       { id: "portfolio-project", label: "Portfolio and Project Management", description: "Manage project portfolios and individual projects effectively." },
//       { id: "resource-time", label: "Resource and Time Management", description: "Optimize resource utilization and track project time." }
//     ]
//   },
//   {
//     id: "spend",
//     label: "Spend Management",
//     info: true,
//     description: "Control and optimize all aspects of your company's spending, from procurement to travel expenses.",
//     subcategories: [
//       { id: "ariba", label: "Excellencia Ariba", description: "Streamline procurement and source-to-pay processes." },
//       { id: "concur", label: "Excellencia Concur", description: "Automate travel, expense, and invoice management." },
//       { id: "fieldglass-spend", label: "Excellencia Fieldglass (for Spend)", description: "Manage external workforce and services procurement." }
//     ]
//   },
//   {
//     id: "scm",
//     label: "Supply Chain Management",
//     info: true,
//     description: "Build a resilient and efficient supply chain, from planning and sourcing to delivery and returns.",
//     subcategories: [
//       { id: "planning", label: "Supply Chain Planning", description: "Optimize demand, supply, and inventory planning." },
//       { id: "logistics", label: "Logistics and Transportation", description: "Manage transportation, warehousing, and logistics." },
//       { id: "sourcing", label: "Sourcing and Procurement", description: "Strategically source goods and services." },
//       { id: "manufacturing", label: "Manufacturing and Production", description: "Streamline production processes and manage shop floor operations." },
//       { id: "asset-management", label: "Enterprise Asset Management", description: "Optimize asset performance and maintenance." }
//     ]
//   }
// ];

// const industriesData: IndustryItem[] = [
//   { id: "aerospace", label: "Aerospace and Defense", icon: "🚀", color: "bg-indigo-500", description: "Solutions for managing complex projects and supply chains in aerospace and defense." },
//   { id: "automotive", label: "Automotive", icon: "🚗", color: "bg-red-500", description: "Drive innovation and efficiency in automotive manufacturing and supply." },
//   { id: "banking", label: "Banking", icon: "💰", color: "bg-green-500", description: "Modern banking solutions for retail, commercial, and investment banking." },
//   { id: "chemicals", label: "Chemicals", icon: "🧪", color: "bg-purple-500", description: "Manage chemical production, logistics, and regulatory compliance." },
//   { id: "consumer", label: "Consumer Products", icon: "🛒", color: "bg-yellow-500", description: "Connect with consumers, manage brands, and optimize supply chains for consumer goods." },
//   { id: "defense", label: "Defense and Security", icon: "🛡️", color: "bg-gray-700", description: "Specialized solutions for defense and security operations and logistics." },
//   { id: "education", label: "Education and Research", icon: "📚", color: "bg-pink-500", description: "Empower educational institutions with modern management and learning tools." },
//   { id: "engineering", label: "Engineering and Construction", icon: "🏗️", color: "bg-orange-500", description: "Project management, asset lifecycle management, and finance solutions for engineering and construction." },
//   { id: "healthcare", label: "Healthcare", icon: "🏥", color: "bg-teal-500", description: "Improve patient outcomes and operational efficiency in healthcare organizations." },
//   { id: "tech", label: "High Tech", icon: "💻", color: "bg-cyan-500", description: "Accelerate innovation and time-to-market for high-tech companies." },
//   { id: "insurance", label: "Insurance", icon: "☔", color: "bg-amber-500", description: "Transform insurance operations with solutions for policy, claims, and customer management." },
//   { id: "life", label: "Life Sciences", icon: "🧬", color: "bg-lime-500", description: "Support R&D, clinical trials, manufacturing, and compliance in life sciences." },
//   { id: "media", label: "Media", icon: "📺", color: "bg-violet-500", description: "Manage content, advertising, and distribution for media companies." },
//   { id: "mill", label: "Mill Products", icon: "🏭", color: "bg-rose-500", description: "Optimize production and supply chain for mill products like paper, wood, and metals." },
//   { id: "mining", label: "Mining", icon: "⛏️", color: "bg-slate-500", description: "Solutions for efficient and sustainable mining operations." },
//   { id: "oil", label: "Oil, Gas, and Energy", icon: "⛽", color: "bg-fuchsia-500", description: "Optimize energy production, distribution, and asset management." },
//   { id: "professional", label: "Professional Services", icon: "👔", color: "bg-sky-500", description: "Boost productivity and project profitability for professional services firms." },
//   { id: "public", label: "Public Sector", icon: "🏛️", color: "bg-emerald-500", description: "Digital transformation solutions for government and public administration." },
//   { id: "retail", label: "Retail", icon: "🛍️", color: "bg-orange-400", description: "Engage customers, manage inventory, and optimize retail operations." },
//   { id: "sports", label: "Sports and Entertainment", icon: "🏆", color: "bg-red-400", description: "Enhance fan experience and streamline operations for sports and entertainment venues." },
//   { id: "telecom", label: "Telecommunications", icon: "📞", color: "bg-indigo-400", description: "Manage services, networks, and customer relationships in telecommunications." },
//   { id: "travel", label: "Travel and Transportation", icon: "✈️", color: "bg-green-400", description: "Optimize travel services, logistics, and passenger experience." },
//   { id: "utilities", label: "Utilities", icon: "💡", color: "bg-orange-300", description: "Manage utility operations, infrastructure, and customer services." },
//   { id: "wholesale", label: "Wholesale Distribution", icon: "📦", color: "bg-purple-400", description: "Improve efficiency and profitability in wholesale distribution." }
// ];

// const companySizesData: CompanySizeItem[] = [
//   { id: "small", label: "Small Businesses", icon: "🏢", color: "bg-green-500", description: "Solutions tailored for the unique needs of small businesses." },
//   { id: "midsize", label: "Midsize Companies", icon: "🏭", color: "bg-yellow-500", description: "Scalable solutions designed for growing midsize companies." },
//   { id: "large", label: "Large Enterprise", icon: "🏛️", color: "bg-gray-700", description: "Comprehensive enterprise solutions for large, complex organizations." }
// ];


// Data (Enhanced with descriptions for the sidebar and new domains from the image)
const portfolioCategories: CategoryItem[] = [
  { id: "ai", label: "Artificial Intelligence", info: true, description: "Leverage AI to automate processes, gain insights, and drive innovation across your business." },
  {
    id: "administration",
    label: "Administration",
    info: true,
    description: "Comprehensive administration solutions for identity, asset, and security management.",
    subcategories: [
      { id: "iam", label: "IAM (Identity and Access Management)", description: "Manage user identities, access rights, and authentication across your organization." },
      { id: "tsm", label: "TSM (Task and Service Management)", description: "Streamline task management and service delivery processes." },
      { id: "asset-management-admin", label: "Asset Management", description: "Track and manage organizational assets, equipment, and resources." },
      { id: "security", label: "Security", description: "Implement comprehensive security measures and protocols." }
    ]
  },
  {
    id: "administration-dashboard",
    label: "Administration Dashboard",
    info: true,
    description: "Centralized dashboards providing real-time insights across all business functions.",
    subcategories: [
      { id: "iam-dashboard", label: "IAM Dashboard", description: "Monitor and manage identity and access management metrics." },
      { id: "admin-dashboard", label: "Administration Dashboard", description: "Central administrative control panel for system management." },
      { id: "finance-dashboard", label: "Finance Dashboard", description: "Real-time financial metrics and performance indicators." },
      { id: "commercial-dashboard", label: "Commercial Dashboard", description: "Sales and marketing performance visualization." },
      { id: "production-dashboard", label: "Production Dashboard", description: "Manufacturing and production KPIs and metrics." },
      { id: "hr-dashboard", label: "Resources Humaines Dashboard", description: "Human resources metrics and workforce analytics." },
      { id: "training-dashboard", label: "Formation & Développement Professionnels Dashboard", description: "Training and professional development tracking." },
      { id: "ta-dashboard", label: "TA Dashboard", description: "Technical architecture and system monitoring." },
      { id: "support-dashboard", label: "Support Dashboard", description: "Customer support and service metrics." },
      { id: "supply-chain-dashboard", label: "Supply Chain Dashboard", description: "Supply chain performance and logistics tracking." },
      { id: "analytics-dashboard", label: "Analytique Dashboard", description: "Business intelligence and data analytics visualization." },
      { id: "it-infrastructure-dashboard", label: "IT et Infrastructure Dashboard", description: "IT infrastructure monitoring and performance metrics." }
    ]
  },
  {
    id: "btp",
    label: "Business Technology Platform",
    info: true,
    description: "The Business Technology Platform integrates data and analytics, application development, and automation.",
    subcategories: [
      { id: "appdev", label: "Application Development and Automation", description: "Build and extend applications with low-code and pro-code tools, automate processes, and innovate faster.", products: ["Excellencia Process Automation", "Excellencia Business Application Studio"] },
      { id: "data", label: "Data and Analytics", description: "Manage, analyze, and visualize your data to make informed decisions and discover new opportunities.", products: ["Excellencia Data Warehouse Cloud", "Excellencia Analytics Cloud"] },
      { id: "integration", label: "Integration", description: "Connect systems, applications, and data sources to streamline operations and ensure seamless data flow.", products: ["Excellencia Integration Suite", "Ariba Cloud Integration", "Excellencia Advanced Data Migration and Management by Syniti"] }
    ]
  },
  {
    id: "crm",
    label: "CRM and Customer Experience",
    info: true,
    description: "Deliver exceptional customer experiences and build lasting relationships with comprehensive CRM solutions.",
    subcategories: [
      { id: "sales", label: "Sales Cloud", description: "Manage your sales processes, from lead to cash, and empower your sales team." },
      { id: "service", label: "Service Cloud", description: "Deliver exceptional customer service across all channels." },
      { id: "marketing", label: "Marketing Cloud", description: "Personalize customer engagement and optimize marketing campaigns." },
      { id: "commerce", label: "Commerce Cloud", description: "Deliver seamless omnichannel commerce experiences." },
      { id: "customer-data", label: "Customer Data Cloud", description: "Build unified customer profiles and manage consent." }
    ]
  },
  {
    id: "commercial",
    label: "Commercial",
    info: true,
    description: "Comprehensive commercial solutions covering sales, marketing, and customer relationship management.",
    subcategories: [
      { id: "pre-sales", label: "Pré-Sales", description: "Pre-sales activities, lead qualification, and opportunity management." },
      { id: "sales-commercial", label: "Sales", description: "Sales process management, pipeline tracking, and revenue optimization." },
      { id: "crm-commercial", label: "CRM", description: "Customer relationship management and client interaction tracking." },
      { id: "marketing-commercial", label: "Marketing", description: "Marketing campaigns, lead generation, and customer engagement." },
      { id: "postsale", label: "Postsale", description: "Post-sales support, customer success, and account management." },
      { id: "promotion-management", label: "Gestion des promotions", description: "Promotional campaign management and pricing strategies." },
      { id: "prospect-tracking", label: "Suivi des prospects", description: "Prospect tracking and lead nurturing processes." },
      { id: "market-analysis", label: "Analyse de marché", description: "Market research, competitive analysis, and business intelligence." }
    ]
  },
  {
    id: "erp",
    label: "Enterprise Resource Planning",
    info: true,
    description: "Streamline core business processes, from finance to supply chain, with integrated ERP software.",
    subcategories: [
      { id: "s4hana", label: "Excellencia S/4HANA", description: "The intelligent ERP for the digital age, running on the Excellencia HANA database." },
      { id: "business-one", label: "Excellencia Business One", description: "Affordable, easy-to-use ERP for small and midsize businesses." },
      { id: "bydesign", label: "Excellencia Business ByDesign", description: "Complete cloud ERP for fast-growing midmarket companies." }
    ]
  },
  {
    id: "finance",
    label: "Financial Management",
    info: true,
    description: "Optimize financial operations, ensure compliance, and gain real-time financial insights.",
    subcategories: [
      { id: "accounting", label: "Financial Accounting", description: "Manage general ledger, accounts payable, and accounts receivable." },
      { id: "controlling", label: "Controlling", description: "Monitor and optimize internal costs and profitability." },
      { id: "treasury", label: "Treasury Management", description: "Manage cash, liquidity, and financial risks." },
      { id: "grc", label: "Governance, Risk, and Compliance", description: "Ensure compliance and mitigate risks across your organization." },
      { id: "finance-general", label: "Finance", description: "General financial management and accounting operations." },
      { id: "payroll", label: "Payroll", description: "Payroll processing, salary management, and compensation administration." },
      { id: "billing", label: "Facturation", description: "Invoice generation, billing management, and revenue recognition." },
      { id: "treasury-finance", label: "Trésorerie", description: "Cash management, liquidity planning, and treasury operations." }
    ]
  },
  {
    id: "hr",
    label: "HR Management",
    info: true,
    description: "Streamline human resources processes from recruitment to talent development and payroll.",
    subcategories: [
      { id: "core-hr", label: "Core HR and Payroll", description: "Manage employee data, payroll, and benefits." },
      { id: "talent", label: "Talent Management", description: "Attract, develop, and retain top talent." },
      { id: "personnel-data-service", label: "Personnel Data Service", description: "Employee data management and personnel information systems." },
      { id: "recruitment-service", label: "Recruitment Service", description: "Recruitment processes, candidate management, and hiring workflows." },
      { id: "compensation-management", label: "Compensation Management Service", description: "Salary administration, benefits management, and compensation planning." },
      { id: "expat-management", label: "Expatriation Management Service", description: "International assignment management and expatriate support." },
      { id: "insurance-management", label: "Insurance Management Service", description: "Employee insurance programs and benefits administration." },
      { id: "talent-management-service", label: "Talent Management Service", description: "Talent development, performance management, and career planning." }
    ]
  },
  {
    id: "hcm",
    label: "Human Capital Management",
    info: true,
    description: "Manage your workforce effectively with solutions for HR, payroll, talent management, and more.",
    subcategories: [
      { id: "successfactors", label: "Excellencia SuccessFactors", description: "Comprehensive cloud HCM suite for all your HR needs." },
      { id: "fieldglass", label: "Excellencia Fieldglass", description: "Manage external workforce and services procurement." }
    ]
  },

  {
    id: "formation-developpement",
    label: "Formation & Développement Professionnels",
    info: true,
    description: "Professional development and training solutions for workforce skill enhancement.",
    subcategories: [
      { id: "professional-development", label: "Professional Development Service", description: "Career development programs and professional growth initiatives." },
      { id: "training-coordination", label: "Training Coordination Service", description: "Training program coordination and learning management." },
      { id: "skills-assessment", label: "Skills Assessment Service", description: "Competency evaluation and skills gap analysis." },
      { id: "time-absence-management", label: "Gestions de Temps & Absences", description: "Time tracking, attendance management, and absence administration." }
    ]
  },
  {
    id: "ta",
    label: "TA (Technical Architecture)",
    info: true,
    description: "Technical architecture and system management solutions.",
    subcategories: [
      { id: "activity-management", label: "Gestions des activités", description: "Activity management and workflow coordination." },
      { id: "charge-plan-management", label: "Gestion de plan de charge", description: "Workload planning and resource allocation management." },
      { id: "affection-management", label: "Gestion d'affection", description: "Assignment management and resource affection tracking." }
    ]
  },
  {
    id: "production",
    label: "Production Management",
    info: true,
    description: "Optimize manufacturing processes, from planning and scheduling to quality control and execution.",
    subcategories: [
      { id: "planning-scheduling", label: "Production Planning and Scheduling", description: "Optimize production plans and schedules." },
      { id: "execution", label: "Manufacturing Execution", description: "Monitor and control manufacturing operations in real-time." },
      { id: "quality", label: "Quality Management", description: "Ensure product quality throughout the manufacturing process." },
      { id: "planning-production", label: "Planning", description: "Production planning and resource scheduling." },
      { id: "project-production", label: "Projet", description: "Project management within production environments." },
      { id: "bom", label: "BOM (Bill of Materials)", description: "Bill of materials management and product structure definition." },
      { id: "production-execution", label: "Production", description: "Production execution and manufacturing operations." },
      { id: "quality-production", label: "Quality", description: "Quality control and assurance in production processes." }
    ]
  },
  {
    id: "project",
    label: "Project Management",
    info: true,
    description: "Plan, execute, and monitor projects efficiently with tools for task management, collaboration, and resource allocation.",
    subcategories: [
      { id: "portfolio-project", label: "Portfolio and Project Management", description: "Manage project portfolios and individual projects effectively." },
      { id: "resource-time", label: "Resource and Time Management", description: "Optimize resource utilization and track project time." }
    ]
  },
  {
    id: "support",
    label: "Support",
    info: true,
    description: "Comprehensive support services and maintenance management.",
    subcategories: [
      { id: "maintenance", label: "Maintenance", description: "Equipment maintenance and asset upkeep management." },
      { id: "follow-up", label: "Follow-Up", description: "Service follow-up and issue tracking." },
      { id: "service-client", label: "Service Client", description: "Customer service and client support operations." },
      { id: "user-integration", label: "Intégration des utilisateurs", description: "User onboarding and system integration support." },
      { id: "knowledge-management", label: "Gestion des connaissances", description: "Knowledge base management and information sharing." }
    ]
  },
  {
    id: "spend",
    label: "Spend Management",
    info: true,
    description: "Control and optimize all aspects of your company's spending, from procurement to travel expenses.",
    subcategories: [
      { id: "ariba", label: "Excellencia Ariba", description: "Streamline procurement and source-to-pay processes." },
      { id: "concur", label: "Excellencia Concur", description: "Automate travel, expense, and invoice management." },
      { id: "fieldglass-spend", label: "Excellencia Fieldglass (for Spend)", description: "Manage external workforce and services procurement." }
    ]
  },
  {
    id: "scm",
    label: "Supply Chain Management",
    info: true,
    description: "Build a resilient and efficient supply chain, from planning and sourcing to delivery and returns.",
    subcategories: [
      { id: "planning", label: "Supply Chain Planning", description: "Optimize demand, supply, and inventory planning." },
      { id: "logistics", label: "Logistics and Transportation", description: "Manage transportation, warehousing, and logistics." },
      { id: "sourcing", label: "Sourcing and Procurement", description: "Strategically source goods and services." },
      { id: "manufacturing", label: "Manufacturing and Production", description: "Streamline production processes and manage shop floor operations." },
      { id: "asset-management", label: "Enterprise Asset Management", description: "Optimize asset performance and maintenance." },
      { id: "purchase", label: "Purchase", description: "Purchase order management and procurement processes." },
      { id: "stock", label: "Stock", description: "Inventory management and stock control." },
      { id: "logistics-scm", label: "Logistique", description: "Logistics coordination and supply chain operations." },
      { id: "supply", label: "Approvisionnement", description: "Supply management and vendor coordination." }
    ]
  },
  {
    id: "analytique",
    label: "Analytique (Business Intelligence)",
    info: true,
    description: "Advanced analytics and business intelligence solutions for data-driven decision making.",
    subcategories: [
      { id: "business-intelligence", label: "Business Intelligence", description: "Business intelligence tools and data visualization." },
      { id: "reporting", label: "Reporting", description: "Advanced reporting and data analysis capabilities." },
      { id: "kpi", label: "KPI (Key Performance Indicators)", description: "Key performance indicator tracking and monitoring." },
      { id: "data-mining", label: "Data Mining", description: "Data mining and predictive analytics." },
      { id: "advanced-analytics", label: "Prévisions et analyses avancées", description: "Advanced forecasting and predictive analytics." },
      { id: "incident-management", label: "Gestion des incidents", description: "Incident tracking and resolution management." }
    ]
  },
  {
    id: "it-infrastructure",
    label: "IT et Infrastructure",
    info: true,
    description: "IT infrastructure management and information security solutions.",
    subcategories: [
      { id: "configuration-management", label: "Gestion de la configuration", description: "Configuration management and system setup." },
      { id: "information-security", label: "Sécurité Informatique", description: "Information security and cybersecurity management." },
      { id: "backup-recovery", label: "Sauvegarde et récupération des données", description: "Data backup and disaster recovery solutions." }
    ]
  }
];

const industriesData: IndustryItem[] = [
  { id: "aerospace", label: "Aerospace and Defense", icon: "🚀", color: "bg-indigo-500", description: "Solutions for managing complex projects and supply chains in aerospace and defense." },
  { id: "automotive", label: "Automotive", icon: "🚗", color: "bg-red-500", description: "Drive innovation and efficiency in automotive manufacturing and supply." },
  { id: "banking", label: "Banking", icon: "💰", color: "bg-green-500", description: "Modern banking solutions for retail, commercial, and investment banking." },
  { id: "chemicals", label: "Chemicals", icon: "🧪", color: "bg-purple-500", description: "Manage chemical production, logistics, and regulatory compliance." },
  { id: "consumer", label: "Consumer Products", icon: "🛒", color: "bg-yellow-500", description: "Connect with consumers, manage brands, and optimize supply chains for consumer goods." },
  { id: "defense", label: "Defense and Security", icon: "🛡️", color: "bg-gray-700", description: "Specialized solutions for defense and security operations and logistics." },
  { id: "education", label: "Education and Research", icon: "📚", color: "bg-pink-500", description: "Empower educational institutions with modern management and learning tools." },
  { id: "engineering", label: "Engineering and Construction", icon: "🏗️", color: "bg-orange-500", description: "Project management, asset lifecycle management, and finance solutions for engineering and construction." },
  { id: "healthcare", label: "Healthcare", icon: "🏥", color: "bg-teal-500", description: "Improve patient outcomes and operational efficiency in healthcare organizations." },
  { id: "tech", label: "High Tech", icon: "💻", color: "bg-cyan-500", description: "Accelerate innovation and time-to-market for high-tech companies." },
  { id: "insurance", label: "Insurance", icon: "☔", color: "bg-amber-500", description: "Transform insurance operations with solutions for policy, claims, and customer management." },
  { id: "life", label: "Life Sciences", icon: "🧬", color: "bg-lime-500", description: "Support R&D, clinical trials, manufacturing, and compliance in life sciences." },
  { id: "media", label: "Media", icon: "📺", color: "bg-violet-500", description: "Manage content, advertising, and distribution for media companies." },
  { id: "mill", label: "Mill Products", icon: "🏭", color: "bg-rose-500", description: "Optimize production and supply chain for mill products like paper, wood, and metals." },
  { id: "mining", label: "Mining", icon: "⛏️", color: "bg-slate-500", description: "Solutions for efficient and sustainable mining operations." },
  { id: "oil", label: "Oil, Gas, and Energy", icon: "⛽", color: "bg-fuchsia-500", description: "Optimize energy production, distribution, and asset management." },
  { id: "professional", label: "Professional Services", icon: "👔", color: "bg-sky-500", description: "Boost productivity and project profitability for professional services firms." },
  { id: "public", label: "Public Sector", icon: "🏛️", color: "bg-emerald-500", description: "Digital transformation solutions for government and public administration." },
  { id: "retail", label: "Retail", icon: "🛍️", color: "bg-orange-400", description: "Engage customers, manage inventory, and optimize retail operations." },
  { id: "sports", label: "Sports and Entertainment", icon: "🏆", color: "bg-red-400", description: "Enhance fan experience and streamline operations for sports and entertainment venues." },
  { id: "telecom", label: "Telecommunications", icon: "📞", color: "bg-indigo-400", description: "Manage services, networks, and customer relationships in telecommunications." },
  { id: "travel", label: "Travel and Transportation", icon: "✈️", color: "bg-green-400", description: "Optimize travel services, logistics, and passenger experience." },
  { id: "utilities", label: "Utilities", icon: "💡", color: "bg-orange-300", description: "Manage utility operations, infrastructure, and customer services." },
  { id: "wholesale", label: "Wholesale Distribution", icon: "📦", color: "bg-purple-400", description: "Improve efficiency and profitability in wholesale distribution." }
];

const companySizesData: CompanySizeItem[] = [
  { id: "small", label: "Small Businesses", icon: "🏢", color: "bg-green-500", description: "Solutions tailored for the unique needs of small businesses." },
  { id: "midsize", label: "Midsize Companies", icon: "🏭", color: "bg-yellow-500", description: "Scalable solutions designed for growing midsize companies." },
  { id: "large", label: "Large Enterprise", icon: "🏛️", color: "bg-gray-700", description: "Comprehensive enterprise solutions for large, complex organizations." }
];

export default function Candybox() {
  // State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    btp: true // Open the Business Technology Platform category by default in Tree View
  });
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentViewMode, setCurrentViewMode] = useState<"tree" | "card" | "list">("tree"); // View mode state
  const [showRightSidebar, setShowRightSidebar] = useState(false); // Right sidebar visibility
  const [rightSidebarInfo, setRightSidebarInfo] = useState<{
    title: string;
    description: string;
    type: string;
    products?: string[];
  } | null>(null); // Content for right sidebar
  const [expandedCardListItems, setExpandedCardListItems] = useState<Record<string, boolean>>({}); // To expand/collapse items in Card/List view

  // Initialize selected categories based on provided initial state in prompt
  useEffect(() => {
    setSelectedCategories([
      "Excellencia S/Excellencia Cloud",
      "Artificial Intelligence",
      "Business Technology Platform",
      "CRM and Customer Experience",
      "Enterprise Resource Planning"
    ]);
  }, []);

  // Handlers
  const toggleSelection = (itemLabel: string, type: "category" | "industry" | "companySize") => {
    switch (type) {
      case "category":
        setSelectedCategories(prev =>
          prev.includes(itemLabel) ? prev.filter(id => id !== itemLabel) : [...prev, itemLabel]
        );
        break;
      case "industry":
        setSelectedIndustries(prev =>
          prev.includes(itemLabel) ? prev.filter(id => id !== itemLabel) : [...prev, itemLabel]
        );
        break;
      case "companySize":
        setSelectedCompanySizes(prev =>
          prev.includes(itemLabel) ? prev.filter(id => id !== itemLabel) : [...prev, itemLabel]
        );
        break;
      default:
        break;
    }
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const removeSelectedItem = (item: string) => {
    setSelectedCategories(prev => prev.filter(id => id !== item));
    setSelectedIndustries(prev => prev.filter(id => id !== item));
    setSelectedCompanySizes(prev => prev.filter(id => id !== item));
  };

  const resetAllSelections = () => {
    setSelectedCategories([]);
    setSelectedIndustries([]);
    setSelectedCompanySizes([]);
    setSearchTerm("");
    setExpandedCategories({ btp: true }); // Reset BTP expansion
    setShowRightSidebar(false);
    setRightSidebarInfo(null);
    setExpandedCardListItems({}); // Reset expanded cards/list items
  };

  const handleItemClickForSidebar = (
    title: string,
    description: string,
    type: string,
    products?: string[]
  ) => {
    setRightSidebarInfo({ title, description, type, products });
    setShowRightSidebar(true);
    // For Card/List view, also toggle expansion
    setExpandedCardListItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Filtered data based on search
  const filterData = <T extends { label: string }>(data: T[]) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPortfolioCategories = filterData(portfolioCategories);
  const filteredIndustries = filterData(industriesData);
  const filteredCompanySizes = filterData(companySizesData);

  // --- Components for View Modes ---

  // Category Tree Item Component (Recursive for subcategories)
  const CategoryTreeItem: React.FC<{
    category: CategoryItem;
    level?: number;
  }> = ({ category, level = 0 }) => {
    const isExpanded = expandedCategories[category.id];
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;
    const isSelected = selectedCategories.includes(category.label);

    return (
      <div className={`transition-all duration-300 ${level > 0 ? "pl-6" : ""}`}>
        <div
          className={`flex justify-between items-center py-2 rounded-md cursor-pointer
            ${isSelected
              ? "bg-orange-100 text-orange-800"
              : "hover:bg-gray-50 text-gray-800"
            }
          `}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`cat-${category.id}`}
              checked={isSelected}
              onChange={() => toggleSelection(category.label, "category")}
              className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
            />
            <label
              htmlFor={`cat-${category.id}`}
              className="flex items-center font-medium"
              onClick={(e) => {
                e.stopPropagation(); // Prevent label click from expanding/collapsing
                handleItemClickForSidebar(
                  category.label,
                  category.description || "No description available.",
                  "Category",
                  category.subcategories?.flatMap(sub => sub.products || [])
                );
              }}
            >
              {hasSubcategories ? (isExpanded ? <IconFolderOpen className="mr-1 text-orange-500" /> : <IconFolder className="mr-1 text-orange-500" />) : <IconPackage className="mr-1 text-gray-600" />}
              {category.label}
            </label>
            {category.info && (
              <button
                className="ml-2 text-gray-500 hover:text-orange-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClickForSidebar(
                    category.label,
                    category.description || "No description available.",
                    "Category",
                    category.subcategories?.flatMap(sub => sub.products || [])
                  );
                }}
              >
                <IconInfo size={16} />
              </button>
            )}
          </div>
          {hasSubcategories && (
            <button
              onClick={() => toggleCategoryExpand(category.id)}
              className="flex items-center text-orange-500 hover:text-gray-800 transition-colors"
            >
              <span className="mr-1 text-sm font-normal">
                {isExpanded ? "Hide Subcategories" : "Show Subcategories"}
              </span>
              {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
            </button>
          )}
        </div>

        {hasSubcategories && isExpanded && (
          <div className="border-l border-gray-200 ml-3 mt-2 pb-2">
            {category.subcategories?.map(sub => (
              <div key={sub.id} className="flex justify-between items-center pl-6 py-2 rounded-md cursor-pointer
                hover:bg-gray-50 text-gray-800"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`sub-${sub.id}`}
                    checked={selectedCategories.includes(sub.label)}
                    onChange={() => toggleSelection(sub.label, "category")}
                    className="mr-2 rounded-md text-orange-500 focus:ring-orange-500"
                  />
                  <label
                    htmlFor={`sub-${sub.id}`}
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClickForSidebar(
                        sub.label,
                        sub.description || "No description available.",
                        "Subcategory",
                        sub.products
                      );
                    }}
                  >
                    <IconLayers className="mr-1 text-blue-500" /> {sub.label}
                  </label>
                </div>
                {sub.products && sub.products.length > 0 && (
                  <button
                    className="flex items-center text-orange-500 hover:text-gray-800 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClickForSidebar(
                        sub.label,
                        sub.description || "No description available.",
                        "Subcategory",
                        sub.products
                      );
                    }}
                  >
                    <span className="mr-1 text-sm font-normal">Products</span>
                    <IconChevronRight size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Generic Card View Item
  const CardViewItem: React.FC<{
    item: CategoryItem | IndustryItem | CompanySizeItem;
    type: "category" | "industry" | "companySize";
  }> = ({ item, type }) => {
    const isSelected =
      (type === "category" && selectedCategories.includes(item.label)) ||
      (type === "industry" && selectedIndustries.includes(item.label)) ||
      (type === "companySize" && selectedCompanySizes.includes(item.label));

    const isExpanded = expandedCardListItems[item.label];

    const itemIcon =
      (item as IndustryItem).icon || (item as CompanySizeItem).icon || "📦"; // Fallback to emoji
    const itemColor =
      (item as IndustryItem).color || (item as CompanySizeItem).color || "bg-gray-500";

    const description = (item as CategoryItem).description || (item as IndustryItem).description || (item as CompanySizeItem).description || "No description available.";
    const products = (item as CategoryItem).subcategories?.flatMap(sub => sub.products || []);

    return (
      <div
        className={`rounded-lg p-6 border transition-all duration-300 cursor-pointer shadow-md
          ${isSelected
            ? "border-orange-500 bg-orange-50 p-2"
            : "border-gray-200 bg-white hover:shadow-lg"
          }
          text-gray-800`}
        onClick={() => {
          toggleSelection(item.label, type);
          handleItemClickForSidebar(item.label, description, type, products);
        }}
      >
        <div className="flex items-center mb-2">
          <div className={`${itemColor} text-white p-2 rounded-full mr-3`}>
            {itemIcon}
          </div>
          <div className="font-medium text-lg flex-grow">{item.label}</div>
          {isSelected && (
            <span className="text-orange-500 text-sm font-semibold ml-2">Selected</span>
          )}
        </div>
        {isExpanded && (
          <div className="mt-2 text-sm text-gray-600">
            {description}
            {products && products.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold">Products:</h4>
                <ul className="list-disc list-inside">
                  {products.map((product, idx) => (
                    <li key={idx}>{product}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Generic List View Item
  const ListViewItem: React.FC<{
    item: CategoryItem | IndustryItem | CompanySizeItem;
    type: "category" | "industry" | "companySize";
  }> = ({ item, type }) => {
    const isSelected =
      (type === "category" && selectedCategories.includes(item.label)) ||
      (type === "industry" && selectedIndustries.includes(item.label)) ||
      (type === "companySize" && selectedCompanySizes.includes(item.label));
    const isExpanded = expandedCardListItems[item.label];

    const itemIcon =
      (item as IndustryItem).icon || (item as CompanySizeItem).icon || "📦"; // Fallback to emoji

    const description = (item as CategoryItem).description || (item as IndustryItem).description || (item as CompanySizeItem).description || "No description available.";
    const products = (item as CategoryItem).subcategories?.flatMap(sub => sub.products || []);

    return (
      <div
        className={`border-b border-gray-200 py-3 cursor-pointer transition-all duration-300
          ${isSelected
            ? "bg-orange-50"
            : "hover:bg-gray-50"
          }
          text-gray-800`}
        onClick={() => {
          toggleSelection(item.label, type);
          handleItemClickForSidebar(item.label, description, type, products);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-3">
            <input
              type="checkbox"
              id={`list-${item.id}`}
              checked={isSelected}
              onChange={() => toggleSelection(item.label, type)}
              className="mr-3 rounded-md text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor={`list-${item.id}`} className="flex items-center font-medium">
              {itemIcon && <span className="mr-2">{itemIcon}</span>}
              {item.label}
            </label>
          </div>
          {isExpanded ? (
            <IconChevronDown size={18} className="text-gray-500" />
          ) : (
            <IconChevronRight size={18} className="text-gray-500" />
          )}
        </div>
        {isExpanded && (
          <div className="pl-9 mt-2 text-sm text-gray-600">
            {description}
            {products && products.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold">Products:</h4>
                <ul className="list-disc list-inside">
                  {products.map((product, idx) => (
                    <li key={idx}>{product}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`font-inter min-h-screen bg-gray-100 text-gray-800`}>
      <div className={`flex flex-col  `}>
        {/* Main Content Area */}
        <div className="flex-1  p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Excellencia Portfolio</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={resetAllSelections}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <IconRefreshCw size={18} className="mr-2" /> Reset All
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentViewMode("tree")}
                  className={`p-2 rounded-lg transition-colors ${currentViewMode === "tree" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  title="Tree View"
                >
                  <IconMenu size={20} />
                </button>
                <button
                  onClick={() => setCurrentViewMode("card")}
                  className={`p-2 rounded-lg transition-colors ${currentViewMode === "card" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  title="Card View"
                >
                  <IconGrid size={20} />
                </button>
                <button
                  onClick={() => setCurrentViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${currentViewMode === "list" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  title="List View"
                >
                  <IconLayers size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Selected Items */}
          {(selectedCategories.length > 0 ||
            selectedIndustries.length > 0 ||
            selectedCompanySizes.length > 0) && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Your Selections:</h3>
                <div className="flex flex-wrap gap-2">
                  {[...selectedCategories, ...selectedIndustries, ...selectedCompanySizes].map(
                    (item, index) => (
                      <span
                        key={index}
                        className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {item}
                        <button
                          onClick={() => removeSelectedItem(item)}
                          className="ml-2 text-orange-600 hover:text-orange-800"
                        >
                          <IconX size={14} />
                        </button>
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Content based on View Mode */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {currentViewMode === "tree" && (
              <>
                <h2 className="text-2xl font-bold mb-4">Portfolio Categories</h2>
                <div className="space-y-1">
                  {filteredPortfolioCategories.map(category => (
                    <CategoryTreeItem key={category.id} category={category} />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Industries</h2>
                <div className="space-y-1">
                  {filteredIndustries.map(industry => (
                    <div
                      key={industry.id}
                      className={`flex items-center py-2 rounded-md cursor-pointer
                        ${selectedIndustries.includes(industry.label)
                          ? "bg-orange-100 text-orange-800"
                          : "hover:bg-gray-50 text-gray-800"
                        }`}
                      onClick={() => toggleSelection(industry.label, "industry")}
                    >
                      <input
                        type="checkbox"
                        id={`industry-${industry.id}`}
                        checked={selectedIndustries.includes(industry.label)}
                        onChange={() => toggleSelection(industry.label, "industry")}
                        className="mr-2 ml-3 rounded-md text-orange-500 focus:ring-orange-500"
                      />
                      <label htmlFor={`industry-${industry.id}`} className="flex items-center font-medium">
                        <IndustryIcon icon={industry.icon} color={industry.color} />
                        <span className="ml-2">{industry.label}</span>
                      </label>
                      <button
                        className="ml-auto mr-3 text-gray-500 hover:text-orange-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClickForSidebar(
                            industry.label,
                            industry.description || "No description available.",
                            "Industry"
                          );
                        }}
                      >
                        <IconInfo size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Company Sizes</h2>
                <div className="space-y-1">
                  {filteredCompanySizes.map(size => (
                    <div
                      key={size.id}
                      className={`flex items-center py-2 rounded-md cursor-pointer
                        ${selectedCompanySizes.includes(size.label)
                          ? "bg-orange-100 text-orange-800"
                          : "hover:bg-gray-50 text-gray-800"
                        }`}
                      onClick={() => toggleSelection(size.label, "companySize")}
                    >
                      <input
                        type="checkbox"
                        id={`size-${size.id}`}
                        checked={selectedCompanySizes.includes(size.label)}
                        onChange={() => toggleSelection(size.label, "companySize")}
                        className="mr-2 ml-3 rounded-md text-orange-500 focus:ring-orange-500"
                      />
                      <label htmlFor={`size-${size.id}`} className="flex items-center font-medium">
                        <CompanySizeIcon icon={size.icon} color={size.color} />
                        <span className="ml-2">{size.label}</span>
                      </label>
                      <button
                        className="ml-auto mr-3 text-gray-500 hover:text-orange-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClickForSidebar(
                            size.label,
                            size.description || "No description available.",
                            "Company Size"
                          );
                        }}
                      >
                        <IconInfo size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {currentViewMode === "card" && (
              <>
                <h2 className="text-2xl font-bold mb-4">Portfolio Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPortfolioCategories.map(category => (
                    <CardViewItem key={category.id} item={category} type="category" />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Industries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredIndustries.map(industry => (
                    <CardViewItem key={industry.id} item={industry} type="industry" />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Company Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCompanySizes.map(size => (
                    <CardViewItem key={size.id} item={size} type="companySize" />
                  ))}
                </div>
              </>
            )}

            {currentViewMode === "list" && (
              <>
                <h2 className="text-2xl font-bold mb-4">Portfolio Categories</h2>
                <div className="divide-y divide-gray-200">
                  {filteredPortfolioCategories.map(category => (
                    <ListViewItem key={category.id} item={category} type="category" />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Industries</h2>
                <div className="divide-y divide-gray-200">
                  {filteredIndustries.map(industry => (
                    <ListViewItem key={industry.id} item={industry} type="industry" />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Company Sizes</h2>
                <div className="divide-y divide-gray-200">
                  {filteredCompanySizes.map(size => (
                    <ListViewItem key={size.id} item={size} type="companySize" />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          className={`w-full md:w-1/3 bg-white p-8 border-l border-gray-200 shadow-lg overflow-y-auto transition-all duration-300 ease-in-out
            ${showRightSidebar ? "translate-x-0" : "translate-x-full absolute md:relative"}
            fixed inset-y-0 right-0 z-50 md:z-auto`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Details</h2>
            <button
              onClick={() => setShowRightSidebar(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <IconX size={24} />
            </button>
          </div>
          {rightSidebarInfo ? (
            <div>
              <h3 className="text-xl font-semibold mb-2">{rightSidebarInfo.title}</h3>
              <p className="text-gray-600 mb-4">{rightSidebarInfo.description}</p>
              {rightSidebarInfo.products && rightSidebarInfo.products.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2">Associated Products:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {rightSidebarInfo.products.map((product, idx) => (
                      <li key={idx} className="text-gray-700">{product}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">Select an item to see its details.</p>
          )}
        </div>
      </div>
    </div>
  );
}