import { FiUser, FiFileText, FiUsers, FiBarChart2, FiClipboard, FiCalendar, FiList, FiPieChart, FiSettings, FiHome, FiBell, FiAlertCircle, FiCheckCircle, FiClock, FiPlusCircle, FiRepeat, FiBriefcase, FiEdit, FiTrash2, FiArchive } from "react-icons/fi";

interface SidebarItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  priority: number;
  href?: string;
  subItems?: SidebarItem[];
  group?: string;
}

const sidebarData: SidebarItem[] = [
  // GROUP 1: MAIN NAVIGATION (Priority 1)
  {
    id: "dashboard",
    label: "Admin Dashboard",
    icon: <FiHome size={18} />,
    href: "/",
    priority: 1,
    group: "main"
  },
 
   {
    id: "recruitment-and-entry",
    label: "Recruitment & Entry",
    icon: <FiUsers size={18} />, // Using FiUsers for Recruitment and Entry
    priority: 1,
    subItems: [
    
      // Sub-items from original "Recruitment"
      {
        id: "staffing-requests",
        label: "Staffing Requests",
        priority: 1,
        subItems: [
          // { id: "describe-requests", label: "Describe Requests", priority: 1, href: "/recruitment-and-entry/staffing-requests/describe-requests" },
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

          // { id: "quick-hire", label: "Quick Hire", priority: 2, href: "/recruitment-and-entry/quick-hire" },
          { id: "hire-candidate", label: "Hire a Candidate", priority: 1, href: "/recruitment-and-entry/hire-candidate" },
          // { id: "hire-employee", label: "Hire an Employee", priority: 2, href: "/recruitment-and-entry/hire-employee" },
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
    icon: <FiUser size={18} />,
    priority: 1,
    subItems: [
        {
        id: "employee-details",
        label: "Employee Details",
        priority: 1,
        subItems: [
          { id: "personal-informations", label: "Personal informations ", priority: 1, href: "/personal-data/personal-information" },
          { id: "adresse", label: "Adresse ", priority: 1, href: "/personal-data/adresse" },
          { id: "phone-fax", label: "Phone Fax ", priority: 1, href: "/personal-data/phone-fax" },
          { id: "adresse-electronique", label: "Adresse Electronique ", priority: 1, href: "/personal-data/adresse-electronique" },
          { id: "bank-details-payment", label: "  Bank Details Payment ", priority: 1, href: "/personal-data/bank-details-payment" },
          { id: "gymchildcare", label: "  Gym Childcare Management ", priority: 1, href: "/personal-data/gymchildcare" },
          { id: "documents-management-system", label: "  Documents Management System ", priority: 1, href: "/personal-data/documents-management-system" },
          { id: "vehicle-management", label: " Vehicle Management ", priority: 1, href: "/personal-data/vehicle-management" },
          { id: " physical-characteristics", label: "Physical Characteristics ", priority: 1, href: "/personal-data/physical-characteristics" },
          { id: " Equipment-Uniform", label: "Equipment-Uniform", priority: 1, href: "/personal-data/Equipment-Uniform" },

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
    icon: <FiList size={18} />,
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
    icon: <FiClock size={18} />,
    priority: 1,
    subItems: [
      { id: "assign-theoretical-hours", label: "Assign Theoretical Hours", priority: 2, href: "/theoretical-hours-management/assign-theoretical-hours" },
      { id: "review-hours", label: "Review Hours", priority: 2, href: "/theoretical-hours-management/review" },
    ],
  },


];

export default sidebarData;