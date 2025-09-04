// import { useState } from "react";
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
//   FiX
// } from "react-icons/fi";
// import { CgMenuGridR } from "react-icons/cg";
// import { Link } from 'react-router-dom';

// // Types
// type SidebarItem = {
//   id: string;
//   label: string;
//   icon?: React.ReactNode;
//   subItems?: SidebarItem[];
//   href?: string;
// };

// type SidebarProps = {
//   onOpenCandybox?: () => void;
//   isExpanded: boolean
// };

// // Sidebar data
// const sidebarData: SidebarItem[] = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     icon: <FiHome />,
//     href: "/"
//   },
//   {
//     id: "business",
//     label: "Business Suite",
//     icon: <FiGrid />,
//     subItems: [
//       {
//         id: "financial",
//         label: "Financial Management",
//         icon: <FiDollarSign />,
//         href: "dashboard/finacc"
//       },
//       {
//         id: "inventory",
//         label: "Inventory Management",
//         icon: <FiShoppingCart />,
//         href: "dashboard/ims"
//       }
//     ]
//   },
//   {
//     id: "technology",
//     label: "Technology Platform",
//     icon: <FiServer />,
//     subItems: [
//       {
//         id: "database",
//         label: "Database Systems",
//         icon: <FiDatabase />,
//         href: "dashboard/customerdba"
//       },
//       {
//         id: "integrations",
//         label: "Integrations",
//         icon: <FiSettings />,
//         subItems: [
//           {
//             id: "api",
//             label: "API Connections",
//             href: "api-integrations"
//           },
//           {
//             id: "webhooks",
//             label: "Webhook Setup",
//             href: "#"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: "users",
//     label: "User Management",
//     icon: <FiUsers />,
//     href: "#"
//   }
// ];

// export default function Sidebar({ onOpenCandybox, isExpanded }: SidebarProps) {
//   //const [isExpanded, setIsExpanded] = useState(true);
//   const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

//   const toggleItem = (itemId: string) => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [itemId]: !prev[itemId]
//     }));
//   };

//   const renderItem = (item: SidebarItem, depth = 0) => {
//     const hasChildren = item.subItems && item.subItems.length > 0;
//     const isItemExpanded = expandedItems[item.id];

//     return (
//       <div key={item.id} className="w-full">
//         <a
//           href={item.href || '#'}
//           className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors
//             ${depth > 0 ? 'pl-8' : ''}
//             ${isItemExpanded && hasChildren ? 'bg-gray-700' : ''}
//           `}
//           onClick={(e) => {
//             if (hasChildren) {
//               e.preventDefault();
//               toggleItem(item.id);
//             }
//           }}
//         >
//           <div className="flex items-center space-x-3 min-w-[24px]">
//             {item.icon && <span className="text-gray-300">{item.icon}</span>}
//             {isExpanded && <span className="whitespace-nowrap">{item.label}</span>}
//           </div>

//           {isExpanded && hasChildren && (
//             <span className="ml-auto text-gray-400">
//               {isItemExpanded ? <FiChevronDown /> : <FiChevronRight />}
//             </span>
//           )}
//         </a>

//         {isExpanded && hasChildren && isItemExpanded && (
//           <div className="ml-2 border-l border-gray-700">
//             {item.subItems?.map(subItem => renderItem(subItem, depth + 1))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className={`h-full bg-gray-800 text-white flex flex-col border-r border-gray-700
//       ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}
//     >
//       {/* Sidebar Header - now just contains the toggle button
//       <div className="p-4 border-b border-gray-700 flex items-center justify-end h-16">
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className={`text-gray-400 hover:text-white ${!isExpanded ? 'mx-auto' : ''}`}
//         >
//           {isExpanded ? <FiMenu /> : <FiX />}
//         </button>
//       </div> */}

//       {/* Sidebar Content */}
//       <div className="flex-1 overflow-y-auto p-2">
//         {sidebarData.map(item => renderItem(item))}
//       </div>

//       {/* Candybox Button with CgMenuGridR icon */}
//       <div className="border-t border-gray-700 py-2">
//         <div className="flex items-center"> 
//             <Link to="dashboard/candybox" className="flex flex-row items-center justify-between ml-2">
//               <CgMenuGridR size={40} className="text-white hover:bg-orange-600" />
//               <p className={isExpanded ? `block px-3` : `hidden`}>Explore Excellencia</p>
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
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
  FiBriefcase, // Icon for Core Business Domains
  FiTruck, // Icon for Supply Chain & Operations
  FiCpu, // Icon for Technology & Infrastructure
  FiClipboard, // Icon for Project & Resource Management
  FiStar, // Icon for Specialized Modules
  FiLayers // Icon for Supporting Infrastructure
} from "react-icons/fi";
import { CgMenuGridR } from "react-icons/cg";
import { Link } from 'react-router-dom';

// Types
type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  subItems?: SidebarItem[];
  href?: string;
};

type SidebarProps = {
  onOpenCandybox?: () => void;
  isExpanded: boolean;
};

// Sidebar data - Refactored to ERP Frontend Modules Structure
const sidebarData: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FiHome />,
    href: "/",
  },
  {
    id: "coreBusinessDomains",
    label: "Core Business Domains",
    icon: <FiBriefcase />, // Icon for general business domains
    subItems: [
      {
        id: "financialManagement",
        label: "Financial Management",
        icon: <FiDollarSign />,
        subItems: [
          { id: "financeCore", label: "Finance Core", href: "dashboard/finacc" }, // Existing link
          { id: "accountsPayable", label: "Accounts Payable", href: "#" },
          { id: "accountsReceivable", label: "Accounts Receivable", href: "#" },
          { id: "assetManagement", label: "Asset Management", href: "#" },
          { id: "budgetPlanning", label: "Budget & Planning", href: "#" },
          { id: "taxManagement", label: "Tax Management", href: "#" },
          { id: "treasury", label: "Treasury", href: "#" },
        ],
      },
      // Add other Core Business Domains as needed based on your ERP structure
    ],
  },
  {
    id: "supplyChainOperations",
    label: "Supply Chain & Operations",
    icon: <FiTruck />, // Icon for supply chain
    subItems: [
      { id: "procurement", label: "Procurement", href: "#" },
      { id: "sourcingTendering", label: "Sourcing & Tendering", href: "#" },
      { id: "vendorPortal", label: "Vendor Portal", href: "#" },
      {
        id: "inventoryManagement",
        label: "Inventory Management",
        icon: <FiShoppingCart />, // Reusing icon for inventory
        subItems: [
          { id: "warehouseManagement", label: "Warehouse Management", href: "dashboard/ims" }, // Existing link
          { id: "inventoryPlanning", label: "Inventory Planning", href: "#" },
          { id: "materialsManagement", label: "Materials Management", href: "#" },
        ],
      },
      { id: "supplyChain", label: "Logistics Management", href: "#" },
      { id: "demandPlanningSC", label: "Demand Planning", href: "#" },
      { id: "supplierManagement", label: "Supplier Management", href: "#" },
    ],
  },
  {
    id: "manufacturingProduction",
    label: "Manufacturing & Production",
    icon: <FiShoppingCart />, // Icon for manufacturing
    subItems: [
      { id: "productionPlanning", label: "Production Planning", href: "#" },
      { id: "materialRequirementsPlanning", label: "Material Requirements Planning", href: "#" },
      { id: "shopFloorControl", label: "Shop Floor Control", href: "#" },
      { id: "manufacturingExecution", label: "Manufacturing Execution", href: "#" },
      { id: "qualityManagement", label: "Quality Management", href: "#" },
      { id: "maintenanceManagement", label: "Maintenance Management", href: "#" },
    ],
  },
  {
    id: "salesCustomerManagement",
    label: "Sales & Customer Management",
    icon: <FiDollarSign />, // Reusing FiDollarSign for sales
    subItems: [
      { id: "salesManagement", label: "Sales Management", href: "#" },
      { id: "quoteManagement", label: "Quote Management", href: "#" },
      { id: "salesAnalytics", label: "Sales Analytics", href: "#" },
      { id: "customerRelationship", label: "CRM Core", href: "#" },
      { id: "customerService", label: "Customer Service", href: "#" },
      { id: "marketingAutomation", label: "Marketing Automation", href: "#" },
      { id: "channelManagement", label: "Channel Management", href: "#" },
      { id: "distributionManagement", label: "Distribution Management", href: "#" },
    ],
  },
  {
    id: "humanResources",
    label: "Human Resources",
    icon: <FiUsers />, // Reusing FiUsers for HR
    subItems: [
      {
        id: "humanCapitalManagement",
        label: "Human Capital Management",
        subItems: [
          { id: "employeeManagement", label: "Employee Management", href: "#" },
          { id: "recruitmentOnboarding", label: "Recruitment & Onboarding", href: "#" },
          { id: "performanceManagement", label: "Performance Management", href: "#" },
        ],
      },
      { id: "payrollBenefits", label: "Payroll & Benefits", href: "#" },
      { id: "timeAttendance", label: "Time & Attendance", href: "#" },
      { id: "talentManagement", label: "Talent Management", href: "#" },
      { id: "successionPlanning", label: "Succession Planning", href: "#" },
    ],
  },
  {
    id: "technologyInfrastructure",
    label: "Technology & Infrastructure",
    icon: <FiCpu />, // Icon for technology
    subItems: [
      {
        id: "systemAdministration",
        label: "System Administration",
        subItems: [
          { id: "userManagement", label: "User Management", icon: <FiUsers />, href: "#" }, // Existing link
          { id: "configurationManagement", label: "Configuration Management", href: "#" },
        ],
      },
      {
        id: "integrationHub",
        label: "Integration Hub",
        icon: <FiSettings />, // Reusing icon for settings/integrations
        subItems: [
          { id: "apiManagement", label: "API Connections", href: "api-integrations" }, // Existing link
          { id: "webhookSetup", label: "Webhook Setup", href: "#" }, // Existing link
        ],
      },
      {
        id: "analyticsIntelligence",
        label: "Analytics & Intelligence",
        subItems: [
          { id: "businessIntelligence", label: "Business Intelligence", href: "#" },
          { id: "dataManagement", label: "Data Management", icon: <FiDatabase />, href: "dashboard/customerdba" }, // Existing link
          { id: "advancedAnalytics", label: "Advanced Analytics", href: "#" },
        ],
      },
      { id: "complianceSecurity", label: "Compliance & Security", href: "#" },
      { id: "documentManagement", label: "Document Management", href: "#" },
      { id: "securityManagement", label: "Security Management", href: "#" },
    ],
  },
  {
    id: "projectResourceManagement",
    label: "Project & Resource Management",
    icon: <FiClipboard />, // Icon for project management
    subItems: [
      { id: "projectManagement", label: "Project Management", href: "#" },
      { id: "portfolioManagement", label: "Portfolio Management", href: "#" },
      { id: "timeExpense", label: "Time & Expense", href: "#" },
      { id: "resourceManagement", label: "Resource Management", href: "#" },
      { id: "assetUtilization", label: "Asset Utilization", href: "#" },
    ],
  },
  {
    id: "specializedModules",
    label: "Specialized Modules",
    icon: <FiStar />, // Icon for specialized modules
    subItems: [
      { id: "industrySpecific", label: "Industry Specific", href: "#" },
      { id: "advancedFeatures", label: "Advanced Features", href: "#" },
      { id: "mobileApplications", label: "Mobile Applications", href: "#" },
      { id: "iotIntegration", label: "IoT Integration", href: "#" },
      { id: "aiMlServices", label: "AI/ML Services", href: "#" },
    ],
  },
  {
    id: "supportingInfrastructure",
    label: "Supporting Infrastructure",
    icon: <FiLayers />, // Icon for infrastructure
    subItems: [
      { id: "corePlatform", label: "Core Platform", href: "#" },
      { id: "notificationSystem", label: "Notification System", href: "#" },
      { id: "workflowEngine", label: "Workflow Engine", href: "#" },
      { id: "reportingEngine", label: "Reporting Engine", href: "#" },
      { id: "apiGateway", label: "API Gateway", href: "#" },
    ],
  },
];

export default function Sidebar({ onOpenCandybox, isExpanded }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Function to toggle the expansion state of a sidebar item
  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId] // Toggle the boolean value for the given itemId
    }));
  };

  // Recursive function to render sidebar items and their sub-items
  const renderItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.subItems && item.subItems.length > 0;
    const isItemExpanded = expandedItems[item.id];

    return (
      <div key={item.id} className="w-full">
        {/* Main link/button for the sidebar item */}
        <a
          href={item.href || '#'} // Use href if available, otherwise a dummy '#'
          className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors
            ${depth > 0 ? `pl-${4 + depth * 4}` : 'pl-3'} {/* Dynamic padding for nested items */}
            ${isItemExpanded && hasChildren ? 'bg-gray-700' : ''}
          `}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault(); // Prevent default link behavior if it has sub-items
              toggleItem(item.id); // Toggle expansion for items with children
            }
            // If it's a leaf node (no children) and has an href, the default link behavior will occur
          }}
        >
          <div className="flex items-center space-x-3 min-w-[24px]">
            {item.icon && <span className="text-gray-300">{item.icon}</span>}
            {/* Only show label if sidebar is expanded */}
            {isExpanded && <span className="whitespace-nowrap text-sm">{item.label}</span>}
          </div>

          {/* Show chevron icon only if sidebar is expanded and item has children */}
          {isExpanded && hasChildren && (
            <span className="ml-auto text-gray-400">
              {isItemExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          )}
        </a>

        {/* Render sub-items if expanded and has children */}
        {isExpanded && hasChildren && isItemExpanded && (
          <div className="ml-2 border-l border-gray-700">
            {item.subItems?.map(subItem => renderItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`h-full bg-gray-800 text-white flex flex-col border-r border-gray-700
      ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar Content - Scrollable area for menu items */}
      <div className="flex-1 overflow-y-auto p-2">
        {sidebarData.map(item => renderItem(item))}
      </div>

      {/* Candybox Button with CgMenuGridR icon */}
      <div className="border-t border-gray-700 py-2">
        <div className="flex items-center">
          {/* Using Link for internal navigation to the Candybox dashboard */}
          <Link to="dashboard/candybox" className="flex flex-row items-center justify-between ml-2 p-2 rounded-lg hover:bg-orange-600 transition-colors">
            <CgMenuGridR size={40} className="text-white" />
            {/* Only show text if sidebar is expanded */}
            <p className={isExpanded ? `block px-3 text-sm` : `hidden`}>Explore Excellencia</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
