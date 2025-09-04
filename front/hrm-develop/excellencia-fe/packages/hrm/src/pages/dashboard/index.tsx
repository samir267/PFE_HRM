import React, { useState, useEffect } from 'react';

// --- Icon Definitions (as inline SVG) ---
const HomeIcon = ({ size = 20, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const UsersIcon = ({ size = 20, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const UserIcon = ({ size = 20, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const ListIcon = ({ size = 20, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
const ClockIcon = ({ size = 20, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const MoonIcon = ({ size = 20, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>);
const SunIcon = ({ size = 20, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>);
const SearchIcon = ({ size = 18, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const ArrowLeftIcon = ({ size = 18, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>);
const ArrowRightIcon = ({ size = 18, color = "currentColor" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);

// --- Type Definitions ---
interface SidebarItem {
    id: string;
    label: string;
    icon?: JSX.Element;
    priority: number;
    href?: string;
    subItems?: SidebarItem[];
    group?: string;
}

interface DashboardCard {
    id: string;
    name: string;
    icon: JSX.Element;
    description: string;
    href?: string;
    keywords: string[];
    mainId: string;
}

// --- Sidebar Data ---
const sidebarData: SidebarItem[] = [
    // GROUP 1: MAIN NAVIGATION (Priority 1)
    {
        id: "dashboard",
        label: "Admin Dashboard",
        icon: <HomeIcon size={20} />,
        href: "/",
        priority: 1,
        group: "main"
    },
    {
        id: "recruitment-and-entry",
        label: "Recruitment & Entry",
        icon: <UsersIcon size={20} />,
        priority: 1,
        subItems: [
            {
                id: "staffing-requests",
                label: "Staffing Requests",
                priority: 1,
                subItems: [
                    { id: "describe-requests", label: "Describe Requests", priority: 1, href: "/recruitment-and-entry/staffing-requests/describe-requests" },
                    { id: "describe-requests-by-roles", label: "Describe Requests By Roles", priority: 1, href: "/recruitment-and-entry/staffing-requests/describe-requests-by-roles" },
                    { id: "recruitment-process", label: "Recruitment Process", priority: 2, href: "/recruitment-and-entry/staffing-requests/recruitment-process" },
                    { id: "manage-statuses", label: "Manage Statuses", priority: 2, href: "/recruitment-and-entry/staffing-requests/manage-statuses" },
                ],
            },
            {
                id: "hiring",
                label: "Hiring",
                priority: 1,
                subItems: [
                    { id: "quick-hire", label: "Quick Hire", priority: 2, href: "/recruitment-and-entry/quick-hire" },
                    { id: "hire-candidate", label: "Hire a Candidate", priority: 1, href: "/recruitment-and-entry/hire-candidate" },
                    { id: "hire-employee", label: "Hire an Employee", priority: 2, href: "/recruitment-and-entry/hire-employee" },
                    { id: "rehire-employee", label: "Rehire an Employee", priority: 2, href: "/recruitment-and-entry/rehire-employee" },
                    { id: "correct-entries", label: "Correct Entries", priority: 2, href: "/recruitment-and-entry/correct-entries" },
                ],
            },
            {
                id: "recruitment-onboarding",
                label: "Onboarding",
                priority: 1,
                subItems: [
                    { id: "onboarding-journey", label: "Onboarding Journey", priority: 1, href: "/recruitment-and-entry/onboarding/onboarding-journey" },
                    { id: "probation-period-monitoring", label: "Probation Period Monitoring", priority: 2, href: "/recruitment-and-entry/onboarding/probation-period-monitoring" },
                ],
            },
        ],
    },
    {
        id: "individual-file",
        label: "Personal Data",
        icon: <UserIcon size={20} />,
        priority: 1,
        subItems: [
            {
                id: "employee-details",
                label: "Employee Details",
                priority: 1,
                subItems: [
                    { id: "personal-informations", label: "Personal informations", priority: 1, href: "/personal-data/personal-information" },
                    { id: "adresse", label: "Adresse", priority: 1, href: "/personal-data/adresse" },
                    { id: "phone-fax", label: "Phone Fax", priority: 1, href: "/personal-data/phone-fax" },
                    { id: "adresse-electronique", label: "Adresse Electronique", priority: 1, href: "/personal-data/adresse-electronique" },
                    { id: "bank-details-payment", label: "Bank Details Payment", priority: 1, href: "/personal-data/bank-details-payment" },
                    { id: "gymchildcare", label: "Gym Childcare Management", priority: 1, href: "/personal-data/gymchildcare" },
                    { id: "documents-management-system", label: "Documents Management System", priority: 1, href: "/personal-data/documents-management-system" },
                    { id: "vehicle-management", label: "Vehicle Management", priority: 1, href: "/personal-data/vehicle-management" },
                    { id: "physical-characteristics", label: "Physical Characteristics", priority: 1, href: "/personal-data/physical-characteristics" },
                ],
            },
            {
                id: "file-details",
                label: "File Details",
                priority: 1,
                subItems: [
                    { id: "individual-data-payroll-admin", label: "Individual Data (Payroll Manager & Admin Tools)", priority: 1, href: "/individual-file/file-details/individual-data-payroll-admin" },
                    { id: "individual-data-hr", label: "Individual Data (HR Professional - By Location)", priority: 2, href: "/individual-file/file-details/individual-data-hr" },
                    { id: "equipment-uniform-payroll-admin", label: "Equipment and Uniform (Payroll Manager & Admin Tools)", priority: 2, href: "/individual-file/file-details/equipment-uniform-payroll-admin" },
                    { id: "equipment-uniform-hr", label: "Equipment and Uniform (HR Professional - By Location)", priority: 2, href: "/individual-file/file-details/equipment-uniform-hr" },
                    { id: "describe-career-payroll-admin", label: "Describe Career Path (Payroll Manager & Admin Tools)", priority: 2, href: "/individual-file/file-details/describe-career-payroll-admin" },
                    { id: "describe-career-hr", label: "Describe Career Path (HR Professional - By Location)", priority: 2, href: "/individual-file/file-details/describe-career-hr" },
                    { id: "enter-unionization-rate-payroll-admin", label: "Enter Unionization Rate (Payroll Manager & Admin Tools)", priority: 2, href: "/individual-file/file-details/enter-unionization-rate-payroll-admin" },
                    { id: "enter-unionization-rate-hr", label: "Enter Unionization Rate (HR Professional - By Location)", priority: 2, href: "/individual-file/file-details/enter-unionization-rate-hr" },
                    { id: "medical-expenses", label: "Medical Expenses", priority: 2, href: "/individual-file/file-details/medical-expenses" },
                    { id: "employee-documents", label: "Employee Documents", priority: 2, href: "/individual-file/file-details/employee-documents" },
                    { id: "emergency-contacts", label: "Emergency Contacts", priority: 2, href: "/individual-file/file-details/emergency-contacts" },
                ],
            },
            {
                id: "transfer-exit",
                label: "Transfer & Exit",
                priority: 1,
                subItems: [
                    { id: "transfer-employee", label: "Transfer an Employee", priority: 1, href: "/individual-file/transfer-exit/transfer-employee" },
                    { id: "cancel-transfer", label: "Cancel Transfer", priority: 2, href: "/individual-file/transfer-exit/cancel-transfer" },
                    { id: "close-file", label: "Close File", priority: 2, href: "/individual-file/transfer-exit/close-file" },
                    { id: "cancel-exit", label: "Cancel Exit", priority: 2, href: "/individual-file/transfer-exit/cancel-exit" },
                ],
            },
        ],
    },
    {
        id: "contract",
        label: "Contract Management",
        icon: <ListIcon size={20} />,
        priority: 1,
        subItems: [
            { id: "create-contract", label: "Create Contract", priority: 1, href: "/individual-file/contract/create-contract" },
            { id: "contract-data", label: "Contract Data", priority: 1, href: "/individual-file/contract/contract-data" },
            { id: "update-contractual-data", label: "Update Contractual Data", priority: 1, href: "/individual-file/contract/update-contractual-data" },
            { id: "modify-assignment", label: "Modify Assignment", priority: 2, href: "/individual-file/contract/modify-assignment" },
            { id: "consult-payroll-records", label: "Consult Payroll Records", priority: 2, href: "/individual-file/contract/consult-payroll-records" },
            { id: "track-medical-visit", label: "Track Medical Visit", priority: 2, href: "/individual-file/contract/track-medical-visit" },
            { id: "remuneration-details", label: "Remuneration Details", priority: 2, href: "/individual-file/contract/remuneration-details" },
        ],
    },
    {
        id: "theoretical-hours-management",
        label: "THM",
        icon: <ClockIcon size={20} />,
        priority: 1,
        subItems: [
            { id: "assign-theoretical-hours", label: "Assign Theoretical Hours", priority: 2, href: "/theoretical-hours-management/assign-theoretical-hours" },
            { id: "review-hours", label: "Review Hours", priority: 2, href: "/theoretical-hours-management/review" },
        ],
    },
];

// --- Dashboard Cards Data ---
const dashboardCardsData: DashboardCard[] = [
    {
        id: "recruitment-and-entry-card",
        name: "Recruitment & Entry",
        icon: <UsersIcon size={32} />,
        description: "Manage staffing requests, candidate hiring, and new employee onboarding.",
        href: "/recruitment-and-entry",
        keywords: ["recruitment", "entry", "hiring", "staffing", "onboarding", "candidate", "employee", "process", "request", "management"],
        mainId: "recruitment-and-entry",
    },
    {
        id: "personal-data-card",
        name: "Personal Data",
        icon: <UserIcon size={32} />,
        description: "Access and manage detailed employee information, files, and documents.",
        href: "/personal-data",
        keywords: ["personal", "data", "file", "employee", "information", "documents", "details", "contact", "transfer", "exit"],
        mainId: "individual-file",
    },
    {
        id: "contract-management-card",
        name: "Contract Management",
        icon: <ListIcon size={32} />,
        description: "Create, update, and manage employee contracts and contractual data.",
        href: "/contract",
        keywords: ["contract", "management", "create", "update", "data", "payroll", "remuneration", "assignment", "records"],
        mainId: "contract",
    },
    {
        id: "thm-card",
        name: "THM",
        icon: <ClockIcon size={32} />,
        description: "Assign and review theoretical hours for employees and teams.",
        href: "/thm",
        keywords: ["theoretical", "hours", "thm", "review", "assign", "time", "management"],
        mainId: "theoretical-hours-management",
    },
];

// --- Sub-Navigation Drawer Component ---
interface SubNavDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    items: SidebarItem[];
    darkMode: boolean;
}

const SubNavDrawer: React.FC<SubNavDrawerProps> = ({ isOpen, onClose, title, items, darkMode }) => {
    const renderItems = (items: SidebarItem[], depth = 0) => {
        return items.map(item => (
            <div key={item.id} className="mb-4">
                {item.subItems ? (
                    <>
                        <h3 className={`font-semibold ${depth === 0 ? 'text-lg text-orange-500' : 'text-md text-gray-500'} mb-2`}>{item.label}</h3>
                        <div className={`border-l-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'} ml-4 pl-4`}>
                            {renderItems(item.subItems, depth + 1)}
                        </div>
                    </>
                ) : (
                    <a
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700 text-gray-300 hover:text-white' : 'hover:bg-gray-200 text-gray-800 hover:text-gray-900'}`}
                    >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.label}</span>
                    </a>
                )}
            </div>
        ));
    };

    return (
        <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>
            <div
                className={`absolute right-0 top-0 h-full w-full max-w-sm p-8 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
                    darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                } ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                    >
                        <ArrowLeftIcon />
                    </button>
                </div>
                {items.length > 0 ? (
                    renderItems(items)
                ) : (
                    <p className="text-center text-sm text-gray-400">No sub-items found.</p>
                )}
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCard, setSelectedCard] = useState<DashboardCard | null>(null);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Find the selected main item from the sidebar data
    const selectedMainItem = selectedCard ? sidebarData.find(item => item.id === selectedCard.mainId) : null;

    // Function to flatten the nested sidebar data for search
    const flattenSidebar = (items: SidebarItem[]): SidebarItem[] => {
        let flattened: SidebarItem[] = [];
        items.forEach(item => {
            flattened.push(item);
            if (item.subItems) {
                flattened = flattened.concat(flattenSidebar(item.subItems));
            }
        });
        return flattened;
    };

    const allSidebarItems = flattenSidebar(sidebarData);
    
    // A "powerful" filter function that searches across multiple fields.
    const filterCards = () => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        // If the search term is empty, return all cards.
        if (!lowercasedSearchTerm) {
            return dashboardCardsData;
        }

        const matchedSidebarItems = allSidebarItems
            .filter(item => 
                (item.label?.toLowerCase().includes(lowercasedSearchTerm) ||
                 item.id?.toLowerCase().includes(lowercasedSearchTerm))
            );

        const matchedCardIds = new Set(
            matchedSidebarItems
                .map(item => {
                    // Find the top-level parent ID for each matched sub-item
                    const topLevelParent = allSidebarItems.find(parent => 
                        item.href?.startsWith(parent.href || '') && parent.subItems
                    );
                    return topLevelParent ? topLevelParent.id : item.id;
                })
        );

        return dashboardCardsData.filter(card => 
            matchedCardIds.has(card.mainId) ||
            card.name.toLowerCase().includes(lowercasedSearchTerm) ||
            card.description.toLowerCase().includes(lowercasedSearchTerm) ||
            card.keywords.some(keyword => keyword.toLowerCase().includes(lowercasedSearchTerm))
        );
    };

    const filteredCards = filterCards();

    return (
        <div className={`min-h-screen flex flex-col items-center p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            
            {/* Header with Dark/Light Mode Toggle and Onboarding Button */}
            <div className="fixed top-20 right-10 z-50 flex items-center space-x-2">
                {/* Onboarding Button */}
                <a 
                    href="http://localhost:3002/onboarding"
                    className={`py-2 px-4 rounded-full shadow-lg transition-colors duration-300 ease-in-out font-medium
                               ${darkMode ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                >
                    Go to onboarding
                </a>
                
                {/* Dark/Light Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className={`p-3 rounded-full shadow-lg transition duration-300 ease-in-out ${
                        darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-200'
                    }`}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                </button>
            </div>

            <div className="w-full max-w-7xl">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight text-orange-500">Excellencia HRM Dashboard</h1>
                    <p className="mt-4 text-xl font-light">Your central hub for human resources management.</p>
                </header>

                {/* Search Input */}
                <div className={`mb-12 relative w-full max-w-2xl mx-auto ${darkMode ? 'text-gray-900' : ''}`}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <SearchIcon color={darkMode ? 'gray-400' : 'gray-500'} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search functionalities, modules, and more..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full p-4 pl-12 rounded-full shadow-inner transition-all duration-300 text-lg ${
                            darkMode ? 'bg-gray-800 text-white placeholder-gray-500 focus:bg-gray-700 focus:outline-none' : 'bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-500'
                        }`}
                    />
                </div>
                
                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCards.map(card => (
                        <div
                            key={card.id}
                            onClick={() => setSelectedCard(card)}
                            className={`p-8 rounded-3xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border-t-4 border-l-4 ${
                                darkMode ? 'bg-gray-800 hover:bg-gray-700 border-orange-600' : 'bg-white hover:bg-gray-200 border-orange-500'
                            }`}
                        >
                            <div className={`p-4 rounded-full w-fit mb-6 ${darkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white'}`}>
                                {card.icon}
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
                            <p className={`text-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
                
                {/* No results message */}
                {filteredCards.length === 0 && (
                    <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p className="text-xl font-medium">No results found for "{searchTerm}".</p>
                        <p className="text-md mt-2">Try a different search term or check your spelling.</p>
                    </div>
                )}
            </div>

            {/* Sub-Navigation Drawer */}
            {selectedCard && selectedMainItem && (
                <SubNavDrawer
                    isOpen={!!selectedCard}
                    onClose={() => setSelectedCard(null)}
                    title={selectedMainItem.label}
                    items={selectedMainItem.subItems || []}
                    darkMode={darkMode}
                />
            )}
        </div>
    );
};

export default Dashboard;