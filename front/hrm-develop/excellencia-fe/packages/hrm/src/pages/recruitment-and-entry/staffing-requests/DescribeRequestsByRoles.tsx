import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";  

import {
  FiBriefcase,
  FiFileText,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiSave,
  FiAlertCircle,
  FiInfo,
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiPaperclip,
  FiBell,
  FiCheckSquare,
  FiChevronRight,
  FiHome,
  FiX,
  FiEye, // For edit mode
} from 'react-icons/fi';
import staffingRequestService from '../../../services/staffingRequest.service';

// Interface for a Staffing Request
interface StaffingRequest {
  id: string;
  requestTitle: string;
  department: string;
  position: string;
  numberOfVacancies: number;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  expectedStartDate: string;
  requiredSkills: string[]; // Changed to array for multi-select
  experienceLevel: string;
  justification: string;
  hiringManager: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';
  // --- New Fields Added ---
  jobObjectives: string;
  mainResponsibilities: string;
  workLocation: string;
  remoteWorkOptions: 'No' | 'Partial' | 'Full';
  salaryRange: string;
  budget: number;
  budgetApproval: boolean;
  reportingStructure: string;
  // --- For attachments (simulated) ---
  attachedDocuments: string[];
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const allSkills = {
  // Technology & Software Development
  programming: [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
    'Kotlin', 'TypeScript', 'Scala', 'R', 'MATLAB', 'Perl', 'Dart', 'Elixir', 'Haskell', 'Lua'
  ],
  webDevelopment: [
    'React', 'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js', 'Express.js', 'Django',
    'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'Node.js', 'HTML5',
    'CSS3', 'SASS', 'LESS', 'Bootstrap', 'Tailwind CSS', 'Material-UI', 'Webpack', 'Vite'
  ],
  mobileDevelopment: [
    'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Swift (iOS)', 'Objective-C',
    'Android Development', 'Kotlin', 'Cordova', 'PhoneGap', 'Unity Mobile'
  ],
  databases: [
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'DynamoDB', 'Oracle',
    'SQL Server', 'SQLite', 'MariaDB', 'Elasticsearch', 'Neo4j', 'CouchDB', 'Firebase'
  ],
  cloudPlatforms: [
    'AWS', 'Microsoft Azure', 'Google Cloud Platform', 'IBM Cloud', 'DigitalOcean',
    'Heroku', 'Vercel', 'Netlify', 'CloudFlare', 'Oracle Cloud'
  ],
  devOps: [
    'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'Terraform',
    'Ansible', 'Chef', 'Puppet', 'Vagrant', 'Apache', 'Nginx', 'Linux', 'Bash Scripting'
  ],
  dataScience: [
    'Machine Learning', 'Deep Learning', 'Data Analysis', 'Data Visualization',
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib',
    'Seaborn', 'Tableau', 'Power BI', 'Apache Spark', 'Hadoop', 'Jupyter',
    'Statistics', 'Predictive Modeling', 'Natural Language Processing', 'Computer Vision'
  ],
  cybersecurity: [
    'Penetration Testing', 'Ethical Hacking', 'Network Security', 'Cryptography',
    'CISSP', 'CEH', 'CompTIA Security+', 'Incident Response', 'Vulnerability Assessment',
    'Risk Management', 'ISO 27001', 'GDPR Compliance', 'Firewall Management'
  ],
  // Business & Management
  projectManagement: [
    'Agile', 'Scrum', 'Kanban', 'Waterfall', 'Lean', 'Six Sigma', 'PMP', 'PRINCE2',
    'Jira', 'Trello', 'Asana', 'Monday.com', 'MS Project', 'Risk Management',
    'Stakeholder Management', 'Budget Management', 'Resource Planning'
  ],
  businessAnalysis: [
    'Requirements Gathering', 'Process Modeling', 'Business Process Improvement',
    'Stakeholder Analysis', 'SWOT Analysis', 'Gap Analysis', 'User Story Writing',
    'Wireframing', 'Prototyping', 'Business Intelligence', 'KPI Development'
  ],
  leadership: [
    'Team Leadership', 'Strategic Planning', 'Decision Making', 'Conflict Resolution',
    'Performance Management', 'Coaching', 'Mentoring', 'Change Management',
    'Vision Setting', 'Cross-functional Collaboration', 'Delegation'
  ],
  sales: [
    'Lead Generation', 'Cold Calling', 'Relationship Building', 'Negotiation',
    'CRM Management', 'Salesforce', 'HubSpot', 'Pipeline Management',
    'Account Management', 'B2B Sales', 'B2C Sales', 'Consultative Selling'
  ],
  marketing: [
    'Digital Marketing', 'Content Marketing', 'Social Media Marketing', 'SEO', 'SEM',
    'Google Analytics', 'Facebook Ads', 'Google Ads', 'Email Marketing', 'Mailchimp',
    'Marketing Automation', 'Brand Management', 'Market Research', 'A/B Testing',
    'Copywriting', 'Graphic Design', 'Video Marketing', 'Influencer Marketing'
  ],
  // Finance & Accounting
  finance: [
    'Financial Analysis', 'Financial Modeling', 'Budgeting', 'Forecasting',
    'Excel Advanced', 'Bloomberg Terminal', 'QuickBooks', 'SAP', 'Oracle Financials',
    'Risk Assessment', 'Investment Analysis', 'Portfolio Management', 'Trading',
    'Derivatives', 'Fixed Income', 'Equity Research', 'M&A Analysis'
  ],
  accounting: [
    'GAAP', 'IFRS', 'Tax Preparation', 'Audit', 'Bookkeeping', 'Payroll',
    'Cost Accounting', 'Management Accounting', 'Financial Reporting',
    'Reconciliation', 'Accounts Payable', 'Accounts Receivable', 'CPA'
  ],
  // Healthcare & Medical
  healthcare: [
    'Patient Care', 'Medical Terminology', 'HIPAA Compliance', 'Electronic Health Records',
    'Epic', 'Cerner', 'Clinical Research', 'Pharmacology', 'Anatomy', 'Physiology',
    'Medical Coding', 'ICD-10', 'CPT', 'Telemedicine', 'Quality Assurance'
  ],
  nursing: [
    'Patient Assessment', 'Medication Administration', 'IV Therapy', 'Wound Care',
    'Emergency Care', 'Critical Care', 'Pediatric Care', 'Geriatric Care',
    'Documentation', 'Patient Education', 'Infection Control'
  ],
  // Education & Training
  education: [
    'Curriculum Development', 'Lesson Planning', 'Classroom Management',
    'Educational Technology', 'Assessment Design', 'Learning Management Systems',
    'Moodle', 'Canvas', 'Blackboard', 'Online Teaching', 'Student Engagement',
    'Differentiated Instruction', 'Special Education', 'Multicultural Education'
  ],
  training: [
    'Adult Learning', 'Training Design', 'E-learning Development', 'Articulate Storyline',
    'Captivate', 'Learning Objectives', 'Training Evaluation', 'Facilitation',
    'Public Speaking', 'Workshop Design', 'Needs Assessment'
  ],
  // Creative & Design
  design: [
    'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'InDesign', 'After Effects',
    'Premiere Pro', 'Figma', 'Sketch', 'Adobe XD', 'UI/UX Design', 'Typography',
    'Color Theory', 'Brand Identity', 'Logo Design', 'Print Design', 'Web Design',
    'User Research', 'Wireframing', 'Prototyping', '3D Modeling', 'Animation'
  ],
  creative: [
    'Creative Writing', 'Copywriting', 'Content Creation', 'Storytelling',
    'Video Production', 'Photography', 'Audio Production', 'Social Media Content',
    'Blog Writing', 'Technical Writing', 'Grant Writing', 'Screenwriting'
  ],
  // Operations & Manufacturing
  operations: [
    'Supply Chain Management', 'Inventory Management', 'Quality Control',
    'Process Optimization', 'Lean Manufacturing', 'Six Sigma', 'Kaizen',
    'Logistics', 'Vendor Management', 'Cost Reduction', 'Safety Management',
    'Continuous Improvement', 'ERP Systems', 'Warehouse Management'
  ],
  manufacturing: [
    'Production Planning', 'Quality Assurance', 'ISO Standards', 'CAD/CAM',
    'AutoCAD', 'SolidWorks', 'Manufacturing Processes', 'Equipment Maintenance',
    'Root Cause Analysis', 'Statistical Process Control', 'Industrial Engineering'
  ],
  // Human Resources
  humanResources: [
    'Recruitment', 'Talent Acquisition', 'Employee Relations', 'Performance Management',
    'Compensation & Benefits', 'HR Information Systems', 'Payroll Systems',
    'Employee Development', 'Training & Development', 'Diversity & Inclusion',
    'Labor Relations', 'HR Analytics', 'Onboarding', 'Exit Interviews'
  ],
  // Legal
  legal: [
    'Contract Law', 'Corporate Law', 'Intellectual Property', 'Litigation',
    'Legal Research', 'Legal Writing', 'Compliance', 'Regulatory Affairs',
    'Due Diligence', 'Negotiation', 'Mediation', 'Arbitration', 'Legal Technology'
  ],
  // Languages
  languages: [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
    'Chinese (Mandarin)', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch',
    'Swedish', 'Norwegian', 'Turkish', 'Polish', 'Hebrew', 'Thai', 'Vietnamese'
  ],
  // Soft Skills
  softSkills: [
    'Communication', 'Problem Solving', 'Critical Thinking', 'Analytical Thinking',
    'Creativity', 'Adaptability', 'Time Management', 'Organization', 'Attention to Detail',
    'Customer Service', 'Teamwork', 'Collaboration', 'Active Listening',
    'Emotional Intelligence', 'Stress Management', 'Multitasking', 'Initiative',
    'Reliability', 'Work Ethic', 'Flexibility', 'Patience', 'Empathy'
  ],
  // Industry-Specific Skills
  retail: [
    'Point of Sale Systems', 'Inventory Management', 'Visual Merchandising',
    'Customer Service', 'Loss Prevention', 'Product Knowledge', 'Cash Handling',
    'Upselling', 'Cross-selling', 'Store Operations', 'Team Management'
  ],
  hospitality: [
    'Customer Service', 'Food Service', 'Event Planning', 'Reservation Systems',
    'Hotel Management', 'Restaurant Management', 'Hospitality Software',
    'Concierge Services', 'Housekeeping', 'Food Safety', 'Wine Knowledge'
  ],
  construction: [
    'Project Management', 'Blueprint Reading', 'Construction Safety', 'Building Codes',
    'Cost Estimation', 'Scheduling', 'Quality Control', 'Heavy Equipment Operation',
    'Welding', 'Electrical Work', 'Plumbing', 'Carpentry', 'Masonry'
  ],
  transportation: [
    'Logistics', 'Route Planning', 'Fleet Management', 'DOT Regulations',
    'Supply Chain', 'Warehouse Operations', 'Freight Management',
    'Transportation Management Systems', 'Safety Compliance', 'Driver Management'
  ]
};


const DescribeRequestsByRoles: React.FC = () => {
  const [requestForm, setRequestForm] = useState<StaffingRequest>({
    id: `REQ-${Date.now()}`,
    requestTitle: '',
    department: '',
    position: '',
    numberOfVacancies: 1,
    employmentType: 'Full-time',
    expectedStartDate: '',
    requiredSkills: [], // Initialize as empty array
    experienceLevel: '',
    justification: '',
    hiringManager: '',
    status: 'Draft',
    // --- New Fields Initialized ---
    jobObjectives: '',
    mainResponsibilities: '',
    workLocation: '',
    remoteWorkOptions: 'No',
    salaryRange: '',
    budget: 0,
    budgetApproval: false,
    reportingStructure: '',
    attachedDocuments: [],
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false); // State for skills dropdown
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>(''); // State for selected skill category

  const [roles] = useState(['Manager', 'Admin']);
  const [activeRole, setActiveRole] = useState('HR'); // Default active role
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
const handleSubmit2 = async () => {

  setIsSubmitting(true);
  try {
    // Préparer les données
    const requestData = {
      requestTitle: requestForm.requestTitle,
      department: requestForm.department,
      position: requestForm.position,
      numberOfVacancies: requestForm.numberOfVacancies,
      employmentType: requestForm.employmentType,
      expectedStartDate: requestForm.expectedStartDate,
      requiredSkills: requestForm.requiredSkills,
      experienceLevel: requestForm.experienceLevel,
      justification: requestForm.justification,
      hiringManager: requestForm.hiringManager,
      status: 'Pending Approval' as const,
      jobObjectives: requestForm.jobObjectives,
      mainResponsibilities: requestForm.mainResponsibilities,
      workLocation: requestForm.workLocation,
      remoteWorkOptions: requestForm.remoteWorkOptions,
      salaryRange: requestForm.salaryRange,
      budget: requestForm.budget,
      budgetApproval: requestForm.budgetApproval,
      reportingStructure: requestForm.reportingStructure,
      attachedDocuments: requestForm.attachedDocuments
    };
    console.log('Request Data:', requestData);

    // Appel à l'API
    const response = await staffingRequestService.createRequest(requestData);
   

    if (!response.success) {
      console.error("Staffing request failed", {
        message: response.message,
        error: response.error,
        data: response.data,
        status: response.status
      });
      throw new Error(response.message || response.error || "Unknown API error");
    }

    // Succès
    console.log('Staffing Request submitted successfully:', response.data);
    addNotification('Staffing Request submitted successfully!', 'success');

    const updatedRequest = { ...response.data, status: 'Pending Approval' };
    setRequestForm(updatedRequest);
    setAllRequests(prev => [...prev, updatedRequest]);
    setShowModal(false);
    setTimeout(() => {
        navigate("/recruitment-and-entry/staffing-requests/recruitment-process");
      }, 3000);


  } catch (error: any) {
    console.error('Error submitting staffing request:', error);
    addNotification(
      `Error submitting request: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'error'
    );
  } finally {
    setIsSubmitting(false);
  }
};


  // Simulate storing/fetching requests for Admin/HR to view
  const [allRequests, setAllRequests] = useState<StaffingRequest[]>([
    {
      id: 'REQ-001',
      requestTitle: 'Senior Software Engineer',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      numberOfVacancies: 1,
      employmentType: 'Full-time',
      expectedStartDate: '2025-09-01',
      requiredSkills: ['React', 'Node.js', 'AWS', 'Problem Solving'],
      experienceLevel: 'Senior',
      justification: 'Increasing project load requires an experienced engineer to lead new initiatives and mentor junior staff.',
      hiringManager: 'Alice Johnson',
      status: 'Pending Approval',
      jobObjectives: 'Design, develop, and deploy high-quality software solutions. Lead technical discussions and contribute to architectural decisions.',
      mainResponsibilities: 'Develop backend APIs, integrate with front-end applications, conduct code reviews, and optimize application performance.',
      workLocation: 'Paris Office',
      remoteWorkOptions: 'Partial',
      salaryRange: '70,000 - 90,000 EUR/year',
      budget: 85000,
      budgetApproval: false,
      reportingStructure: 'Reports to Head of Engineering',
      attachedDocuments: ['Job_Description_SWE_Senior.pdf'],
    },
    {
      id: 'REQ-002',
      requestTitle: 'Marketing Specialist',
      department: 'Marketing',
      position: 'Digital Marketing Specialist',
      numberOfVacancies: 1,
      employmentType: 'Full-time',
      expectedStartDate: '2025-08-15',
      requiredSkills: ['Digital Marketing', 'SEO', 'Content Marketing'],
      experienceLevel: 'Mid',
      justification: 'To expand our online presence and drive lead generation through digital channels.',
      hiringManager: 'Bob Williams',
      status: 'Approved',
      jobObjectives: 'Execute digital marketing campaigns and analyze their effectiveness to improve ROI.',
      mainResponsibilities: 'Manage social media accounts, create engaging content, perform SEO audits, and report on campaign performance.',
      workLocation: 'Remote',
      remoteWorkOptions: 'Full',
      salaryRange: '45,000 - 60,000 EUR/year',
      budget: 55000,
      budgetApproval: true,
      reportingStructure: 'Reports to Marketing Director',
      attachedDocuments: ['Marketing_Specialist_JD.docx'],
    },
    {
      id: 'REQ-003',
      requestTitle: 'HR Business Partner',
      department: 'HR',
      position: 'HR Business Partner',
      numberOfVacancies: 1,
      employmentType: 'Full-time',
      expectedStartDate: '2025-10-01',
      requiredSkills: ['Employee Relations', 'Recruitment', 'Performance Management'],
      experienceLevel: 'Senior',
      justification: 'To support growing employee base and ensure effective HR policies and practices.',
      hiringManager: 'Alice Johnson', // Example for Manager view
      status: 'Draft',
      jobObjectives: 'Provide strategic HR support to assigned business units and ensure HR initiatives align with business goals.',
      mainResponsibilities: 'Advise on employee relations, manage recruitment cycles, facilitate performance reviews, and support organizational development.',
      workLocation: 'Lyon Office',
      remoteWorkOptions: 'No',
      salaryRange: '60,000 - 75,000 EUR/year',
      budget: 70000,
      budgetApproval: false,
      reportingStructure: 'Reports to Head of HR',
      attachedDocuments: [],
    },
  ]);
  const [selectedRequest, setSelectedRequest] = useState<StaffingRequest | null>(null);

  const addNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (activeRole === 'Admin') return; // Admin view is read-only for form fields

    // For checkbox (budgetApproval)
    if (type === 'checkbox') {
      setRequestForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setRequestForm((prev) => ({
        ...prev,
        [name]: name === 'numberOfVacancies' || name === 'budget' ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSkillChange = (skill: string) => {
    if (activeRole === 'Admin') return;
    setRequestForm((prev) => {
      const currentSkills = prev.requiredSkills;
      if (currentSkills.includes(skill)) {
        return {
          ...prev,
          requiredSkills: currentSkills.filter((s) => s !== skill),
        };
      } else {
        return {
          ...prev,
          requiredSkills: [...currentSkills, skill],
        };
      }
    });
  };

  const handleDocumentAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeRole === 'Admin') return;
    const files = e.target.files;
    if (files) {
      const newDocuments = Array.from(files).map(file => file.name);
      setRequestForm(prev => ({
        ...prev,
        attachedDocuments: [...prev.attachedDocuments, ...newDocuments]
      }));
      addNotification(`${files.length} document(s) attached.`, 'info');
    }
  };

  const openConfirmationModal = (actionType: string) => {
    let content = '';
    let action: (() => void) | null = null;

    switch (actionType) {
      case 'submitRequest':
        content = 'Are you sure you want to submit this staffing request for approval?';
        action = handleSubmit2;
        break;
      case 'saveDraft':
        content = 'Are you sure you want to save this request as a draft?';
        action = handleSaveDraft;
        break;
      case 'clearForm':
        content = 'Are you sure you want to clear all the information in the form? This action cannot be undone.';
        action = handleClearForm;
        break;
      case 'approveRequest':
        content = 'Are you sure you want to approve this staffing request?';
        action = handleApproveRequest;
        break;
      case 'rejectRequest':
        content = 'Are you sure you want to reject this staffing request?';
        action = handleRejectRequest;
        break;
      default:
        content = 'Are you sure you want to proceed with this action?';
        action = null;
    }

    setModalContent(content);
    setModalAction(() => action);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalAction) {
      modalAction();
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalContent('');
    setModalAction(null);
    addNotification('Action cancelled from modal.', 'info');
  };

  const handleSubmit = () => {
    console.log('Submitting Staffing Request:', requestForm);
    addNotification('Staffing Request submitted successfully!', 'success');
    const updatedRequest = { ...requestForm, status: 'Pending Approval' };
    setRequestForm(updatedRequest);
    setAllRequests(prev => [...prev, updatedRequest]); // Add to all requests for Admin/HR view
    setShowModal(false);
  };

  const handleSaveDraft = () => {
    console.log('Saving Staffing Request as Draft:', requestForm);
    addNotification('Staffing Request saved as draft!', 'info');
    const updatedRequest = { ...requestForm, status: 'Draft' };
    setRequestForm(updatedRequest);
    // In a real app, you'd update an existing draft or add a new one
    setAllRequests(prev => {
      const existingIndex = prev.findIndex(req => req.id === updatedRequest.id);
      if (existingIndex > -1) {
        const newRequests = [...prev];
        newRequests[existingIndex] = updatedRequest;
        return newRequests;
      }
      return [...prev, updatedRequest];
    });
    setShowModal(false);
  };

  const handleClearForm = () => {
    setRequestForm({
      id: `REQ-${Date.now()}`,
      requestTitle: '',
      department: '',
      position: '',
      numberOfVacancies: 1,
      employmentType: 'Full-time',
      expectedStartDate: '',
      requiredSkills: [],
      experienceLevel: '',
      justification: '',
      hiringManager: '',
      status: 'Draft',
      jobObjectives: '',
      mainResponsibilities: '',
      workLocation: '',
      remoteWorkOptions: 'No',
      salaryRange: '',
      budget: 0,
      budgetApproval: false,
      reportingStructure: '',
      attachedDocuments: [],
    });
    addNotification('Form cleared.', 'warning');
    setShowModal(false);
  };

  const handleApproveRequest = () => {
    if (selectedRequest) {
      const updatedRequest = { ...selectedRequest, status: 'Approved' };
      setAllRequests(prev => prev.map(req => req.id === updatedRequest.id ? updatedRequest : req));
      setSelectedRequest(updatedRequest);
      addNotification(`Request ${updatedRequest.id} approved!`, 'success');
      setShowModal(false);
    }
  };

  const handleRejectRequest = () => {
    if (selectedRequest) {
      const updatedRequest = { ...selectedRequest, status: 'Rejected' };
      setAllRequests(prev => prev.map(req => req.id === updatedRequest.id ? updatedRequest : req));
      setSelectedRequest(updatedRequest);
      addNotification(`Request ${updatedRequest.id} rejected!`, 'error');
      setShowModal(false);
    }
  };

  const renderFormFields = (isReadOnly: boolean = false) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
      <div>
        <label htmlFor="requestTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Request Title
        </label>
        <input
          type="text"
          id="requestTitle"
          name="requestTitle"
          value={requestForm.requestTitle}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., Senior Software Engineer Hire"
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
          Department
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={requestForm.department}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., Engineering, Marketing, HR"
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
          Position / Role
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={requestForm.position}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., Software Engineer, Project Manager"
        />
      </div>

      <div>
        <label htmlFor="numberOfVacancies" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Vacancies
        </label>
        <input
          type="number"
          id="numberOfVacancies"
          name="numberOfVacancies"
          value={requestForm.numberOfVacancies}
          onChange={handleChange}
          min="1"
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
        />
      </div>

      <div>
        <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
          Employment Type
        </label>
        <select
          id="employmentType"
          name="employmentType"
          value={requestForm.employmentType}
          onChange={handleChange}
          disabled={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white ${isReadOnly ? 'bg-gray-100' : ''}`}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div>

      <div>
        <label htmlFor="expectedStartDate" className="block text-sm font-medium text-gray-700 mb-1">
          Expected Start Date
        </label>
        <input
          type="date"
          id="expectedStartDate"
          name="expectedStartDate"
          value={requestForm.expectedStartDate}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
        />
      </div>

      <div className="md:col-span-3">
        <label htmlFor="jobObjectives" className="block text-sm font-medium text-gray-700 mb-1">
          Job Objectives (Finality and Goals of the Position)
        </label>
        <textarea
          id="jobObjectives"
          name="jobObjectives"
          value={requestForm.jobObjectives}
          onChange={handleChange}
          rows={3}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="Describe the main purpose and objectives of this position..."
        />
      </div>

      <div className="md:col-span-3">
        <label htmlFor="mainResponsibilities" className="block text-sm font-medium text-gray-700 mb-1">
          Main Responsibilities (Detailed Tasks and Missions)
        </label>
        <textarea
          id="mainResponsibilities"
          name="mainResponsibilities"
          value={requestForm.mainResponsibilities}
          onChange={handleChange}
          rows={5}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="List the key tasks and duties associated with this role..."
        />
      </div>

      <div className="relative md:col-span-2">
        <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700 mb-1">
          Required Skills / Qualifications
        </label>
        <div className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white ${isReadOnly ? 'bg-gray-100' : ''}`}>
          <select
            id="skillCategory"
            name="skillCategory"
            value={selectedSkillCategory}
            onChange={(e) => setSelectedSkillCategory(e.target.value)}
            disabled={isReadOnly}
            className={`w-full border-b border-gray-300 pb-2 mb-2 focus:ring-orange-500 focus:border-orange-500 bg-white ${isReadOnly ? 'bg-gray-100' : ''}`}
          >
            <option value="">Select a skill category</option>
            {Object.keys(allSkills).map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
              </option>
            ))}
          </select>

          <div
            className={`w-full min-h-[38px] ${isReadOnly ? 'bg-gray-100' : 'cursor-pointer'}`}
            onClick={() => !isReadOnly && setShowSkillsDropdown(!showSkillsDropdown)}
          >
            {requestForm.requiredSkills.length > 0
              ? requestForm.requiredSkills.join(', ')
              : 'Selected skills will appear here...'}
          </div>

          {showSkillsDropdown && !isReadOnly && selectedSkillCategory && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
              {(allSkills as any)[selectedSkillCategory]?.map((skill: string) => (
                <label key={skill} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-orange-600 rounded"
                    checked={requestForm.requiredSkills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                  <span className="ml-2 text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {!isReadOnly && <p className="text-xs text-gray-500 mt-1">Select a category, then choose applicable skills.</p>}
      </div>

      <div>
        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level
        </label>
        <input
          type="text"
          id="experienceLevel"
          name="experienceLevel"
          value={requestForm.experienceLevel}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., Junior, Mid, Senior, Lead"
        />
      </div>

      <div>
        <label htmlFor="workLocation" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiMapPin className="mr-2 text-gray-500" /> Work Location
        </label>
        <input
          type="text"
          id="workLocation"
          name="workLocation"
          value={requestForm.workLocation}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., Paris Office, Remote, Hybrid"
        />
      </div>

      <div>
        <label htmlFor="remoteWorkOptions" className="block text-sm font-medium text-gray-700 mb-1">
          Remote Work Options
        </label>
        <select
          id="remoteWorkOptions"
          name="remoteWorkOptions"
          value={requestForm.remoteWorkOptions}
          onChange={handleChange}
          disabled={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white ${isReadOnly ? 'bg-gray-100' : ''}`}
        >
          <option value="No">No Remote Work</option>
          <option value="Partial">Partial Remote (Hybrid)</option>
          <option value="Full">Full Remote</option>
        </select>
      </div>

      <div>
        <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiDollarSign className="mr-2 text-gray-500" /> Salary Range
        </label>
        <input
          type="text"
          id="salaryRange"
          name="salaryRange"
          value={requestForm.salaryRange}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., 50,000 - 70,000 EUR/year"
        />
      </div>

      {activeRole !== 'Manager' && ( // Budget fields visible for HR and Admin
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FiDollarSign className="mr-2 text-gray-500" /> Allocated Budget
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={requestForm.budget}
            onChange={handleChange}
            min="0"
            readOnly={activeRole === 'Admin'} // Admin can view but not edit budget directly
            className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${activeRole === 'Admin' ? 'bg-gray-100' : ''}`}
            placeholder="e.g., 75000"
          />
        </div>
      )}

      {activeRole !== 'Manager' && ( // Budget approval only for HR and Admin
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="budgetApproval"
            name="budgetApproval"
            checked={requestForm.budgetApproval}
            onChange={handleChange}
            disabled={activeRole === 'Admin'} // Only HR can set budget approval, Admin can only view
            className={`form-checkbox h-4 w-4 text-orange-600 rounded ${activeRole === 'Admin' ? 'bg-gray-100' : ''}`}
          />
          <label htmlFor="budgetApproval" className="ml-2 block text-sm font-medium text-gray-700">
            Budget Approved
          </label>
        </div>
      )}

      <div className="md:col-span-2">
        <label htmlFor="reportingStructure" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiLayers className="mr-2 text-gray-500" /> Reporting Structure
        </label>
        <textarea
          id="reportingStructure"
          name="reportingStructure"
          value={requestForm.reportingStructure}
          onChange={handleChange}
          rows={3}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., Reports to Head of Engineering, Manages 2 Junior Engineers"
        />
      </div>

      <div className="md:col-span-3">
        <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">
          Justification / Business Need
        </label>
        <textarea
          id="justification"
          name="justification"
          value={requestForm.justification}
          onChange={handleChange}
          rows={5}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="Provide a detailed explanation for this staffing request..."
        />
      </div>

      <div>
        <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">
          Hiring Manager
        </label>
        <input
          type="text"
          id="hiringManager"
          name="hiringManager"
          value={requestForm.hiringManager}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 ${isReadOnly ? 'bg-gray-100' : ''}`}
          placeholder="e.g., Jane Doe (HR Manager)"
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="attachedDocuments" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiPaperclip className="mr-2 text-gray-500" /> Attach Documents
        </label>
        {!isReadOnly && (
          <input
            type="file"
            id="attachedDocuments"
            name="attachedDocuments"
            onChange={handleDocumentAttach}
            multiple
            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
        )}
        {requestForm.attachedDocuments.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Attached Files:</p>
            <ul className="list-disc list-inside">
              {requestForm.attachedDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
        )}
        {requestForm.attachedDocuments.length === 0 && isReadOnly && (
          <p className="text-sm text-gray-500">No documents attached.</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Current Status
        </label>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            requestForm.status === 'Draft'
              ? 'bg-blue-100 text-blue-800'
              : requestForm.status === 'Pending Approval'
                ? 'bg-yellow-100 text-yellow-800'
                : requestForm.status === 'Approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
          }`}
        >
          {requestForm.status}
        </span>
        {!isReadOnly && <p className="text-xs text-gray-500 mt-1">Status updates automatically on submission or draft save.</p>}
      </div>
    </div>
  );

  const renderHRInterface = () => (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FiBriefcase className="mr-3 text-orange-500" /> Describe New Staffing Request
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiFileText className="mr-3 text-orange-500" /> Request Details
          </h3>
          {renderFormFields(false)} {/* HR can edit all fields */}

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => openConfirmationModal('clearForm')}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
            >
              <FiXCircle className="mr-2" /> Clear Form
            </button>
            <button
              onClick={() => openConfirmationModal('saveDraft')}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <FiSave className="mr-2" /> Save as Draft
            </button>
            <button
              onClick={() => openConfirmationModal('submitRequest')}
              className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
            >
              <FiCheckCircle className="mr-2" /> Submit Request
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderManagerInterface = () => (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FiBriefcase className="mr-3 text-orange-500" /> Create New Staffing Request (Manager)
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiFileText className="mr-3 text-orange-500" /> Request Details
          </h3>
          {renderFormFields(false)} {/* Manager can edit all fields */}

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => openConfirmationModal('clearForm')}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
            >
              <FiXCircle className="mr-2" /> Clear Form
            </button>
            <button
              onClick={() => openConfirmationModal('saveDraft')}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <FiSave className="mr-2" /> Save as Draft
            </button>
            <button
              onClick={() => openConfirmationModal('submitRequest')}
              className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
            >
              <FiCheckCircle className="mr-2" /> Submit Request for HR Approval
            </button>
          </div>
        </div>

        {/* Manager's submitted requests view */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiFileText className="mr-3 text-orange-500" /> My Submitted Requests
          </h3>
          {allRequests.filter(req => req.hiringManager === requestForm.hiringManager).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allRequests.filter(req => req.hiringManager === requestForm.hiringManager).map((req) => (
                    <tr key={req.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.requestTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            req.status === 'Draft'
                              ? 'bg-blue-100 text-blue-800'
                              : req.status === 'Pending Approval'
                                ? 'bg-yellow-100 text-yellow-800'
                                : req.status === 'Approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="text-orange-600 hover:text-orange-900 mr-3 flex items-center"
                        >
                          <FiEye className="mr-1" /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No requests submitted yet.</p>
          )}
        </div>
      </div>
    </>
  );

  const renderAdminInterface = () => (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FiUsers className="mr-3 text-orange-500" /> Admin: Manage Staffing Requests
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiFileText className="mr-3 text-orange-500" /> All Staffing Requests
          </h3>

          {allRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.requestTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            req.status === 'Draft'
                              ? 'bg-blue-100 text-blue-800'
                              : req.status === 'Pending Approval'
                                ? 'bg-yellow-100 text-yellow-800'
                                : req.status === 'Approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="text-orange-600 hover:text-orange-900 flex items-center"
                        >
                          <FiEye className="mr-1" /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No staffing requests available for review.</p>
          )}
        </div>

        {selectedRequest && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
              <FiInfo className="mr-3 text-orange-500" /> Details for Request: {selectedRequest.id}
              <button
                onClick={() => setSelectedRequest(null)}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </h3>
            {/* Display selected request details (read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title</label>
                <p className="text-sm text-gray-900">{selectedRequest.requestTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <p className="text-sm text-gray-900">{selectedRequest.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <p className="text-sm text-gray-900">{selectedRequest.position}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Vacancies</label>
                <p className="text-sm text-gray-900">{selectedRequest.numberOfVacancies}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <p className="text-sm text-gray-900">{selectedRequest.employmentType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Start Date</label>
                <p className="text-sm text-gray-900">{selectedRequest.expectedStartDate}</p>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Objectives</label>
                <p className="text-sm text-gray-900">{selectedRequest.jobObjectives}</p>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Responsibilities</label>
                <p className="text-sm text-gray-900">{selectedRequest.mainResponsibilities}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                <p className="text-sm text-gray-900">{selectedRequest.requiredSkills.join(', ') || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <p className="text-sm text-gray-900">{selectedRequest.experienceLevel}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
                <p className="text-sm text-gray-900">{selectedRequest.workLocation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remote Work Options</label>
                <p className="text-sm text-gray-900">{selectedRequest.remoteWorkOptions}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <p className="text-sm text-gray-900">{selectedRequest.salaryRange}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allocated Budget</label>
                <p className="text-sm text-gray-900">{selectedRequest.budget.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</p>
              </div>
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700">Budget Approved:</label>
                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedRequest.budgetApproval ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {selectedRequest.budgetApproval ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Structure</label>
                <p className="text-sm text-gray-900">{selectedRequest.reportingStructure}</p>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Justification / Business Need</label>
                <p className="text-sm text-gray-900">{selectedRequest.justification}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
                <p className="text-sm text-gray-900">{selectedRequest.hiringManager}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Attached Documents</label>
                {selectedRequest.attachedDocuments.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-900">
                    {selectedRequest.attachedDocuments.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No documents attached.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    selectedRequest.status === 'Draft'
                      ? 'bg-blue-100 text-blue-800'
                      : selectedRequest.status === 'Pending Approval'
                        ? 'bg-yellow-100 text-yellow-800'
                        : selectedRequest.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              {selectedRequest.status === 'Pending Approval' && (
                <>
                  <button
                    onClick={() => openConfirmationModal('rejectRequest')}
                    className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                  >
                    <FiXCircle className="mr-2" /> Reject Request
                  </button>
                  <button
                    onClick={() => openConfirmationModal('approveRequest')}
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <FiCheckCircle className="mr-2" /> Approve Request
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center p-3 rounded-lg shadow-md text-white
              ${notif.type === 'success'
                ? 'bg-green-500'
                : notif.type === 'error'
                  ? 'bg-red-500'
                  : notif.type === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
              }`}
          >
            {notif.type === 'success' && <FiCheckSquare className="w-5 h-5 mr-2" />}
            {notif.type === 'error' && <FiAlertCircle className="w-5 h-5 mr-2" />}
            {notif.type === 'warning' && <FiAlertCircle className="w-5 h-5 mr-2" />}
            {notif.type === 'info' && <FiInfo className="w-5 h-5 mr-2" />}
            <span>{notif.message}</span>
            <button onClick={() => removeNotification(notif.id)} className="ml-4 text-white hover:text-gray-200">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-orange-600 text-white p-2 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Welcome</span>
          <span> Manager</span>
          <div className="flex space-x-2">
            {roles.map((role) => (
              <button
                key={role}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  activeRole === role ? 'bg-orange-700 shadow-inner' : 'bg-orange-500 hover:bg-orange-600'
                }`}
                onClick={() => {
                  setActiveRole(role);
                  setSelectedRequest(null); // Clear selected request when changing role
                  if (role === 'HR' || role === 'Manager') {
                    // Reset form when switching to HR/Manager view to ensure new request creation
                    handleClearForm();
                  }
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-white text-black px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
            <option>Fluxeruim - Bank</option>
          </select>
          <button className="text-white hover:text-orange-200 p-1 rounded-full hover:bg-orange-700 transition-colors">
            <FiInfo className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-orange-200 p-1 rounded-full hover:bg-orange-700 transition-colors">
            <FiBell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 text-white p-2 flex items-center space-x-2 text-sm shadow-inner">
        <FiHome className="w-4 h-4" />
        <span>Home</span>
        <FiChevronRight className="w-4 h-4" />
        <span>Staffing Request</span>
        <FiChevronRight className="w-4 h-4" />
        <span className="text-orange-300">
          {activeRole === 'HR' && 'Describe Staffing Request (HR)'}
          {activeRole === 'Manager' && 'Create/View Staffing Request (Manager)'}
          {activeRole === 'Admin' && 'Manage Staffing Requests (Admin)'}
        </span>
      </div>

      {activeRole === 'HR' && renderHRInterface()}
      {activeRole === 'Manager' && renderManagerInterface()}
      {activeRole === 'Admin' && renderAdminInterface()}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertCircle className="mr-2 text-orange-500" /> Confirmation
            </h3>
            <p className="text-gray-700 mb-6">{modalContent}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                onClick={handleModalConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescribeRequestsByRoles;