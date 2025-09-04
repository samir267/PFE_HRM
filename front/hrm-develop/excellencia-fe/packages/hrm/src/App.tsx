

import './App.css';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Core components
import Loading from './components/common/Loading.tsx';
import PrivateRoute from './components/PrivateRoute/index.ts';
import Login from './pages/auth/Login/Login.tsx';
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword.tsx';
import Register from './pages/auth/Register/Register.tsx';
import Dashboard from './pages/dashboard/index.tsx';
import Onboarding from './pages/onboarding/Onboarding.tsx';



// Other existing components
import EmployeeProfileManager from './pages/employee/EmployeeProfileManager.tsx';
import DepartmentsManagement from './pages/departmentsmanagement/DepartmentsManagement.tsx';
import GeneralSettings from './pages/administration/system-settings/GeneralSettings.tsx';

{/* New routes from sidebarData.txt - pointing to Dashboard as HRM */}

import CancelExit from './pages/individual-file/transfer-exit/CancelExit.tsx';
import CancelTransfert from './pages/individual-file/transfer-exit/CancelTransfer.tsx';
import CloseFile from './pages/individual-file/transfer-exit/CloseFile.tsx';
import TransferEmployee from './pages/individual-file/transfer-exit/TransferEmployee.tsx';
import ContractData from './pages/contract/ContractData.tsx';
import BenefitsManagement from './pages/contract/BenefitsManagement.tsx';
import ConsultPayrollRecords from './pages/contract/ConsultPayrollRecords.tsx';
import ModifyAssignment from './pages/contract/ModifyAssignment.tsx';
import RemunerationDetails from './pages/contract/RemunerationDetails.tsx';
import Sanctions from './pages/contract/Sanctions.tsx';
import UpdateContractData from './pages/contract/UpdateContractData.tsx';
import TrackMedicalVisit from './pages/contract/TrackMedicalVisit.tsx';
import CreateContract from './pages/contract/CreateContract.tsx';
import CorrectEntry from './pages/recruitment-and-entry/hiring/CorrectEntry.tsx';
import HireCandidate from './pages/recruitment-and-entry/hiring/HireCandidate.tsx';
import HireEmploye from './pages/recruitment-and-entry/hiring/HireEmploye.tsx';
import QuickHire from './pages/recruitment-and-entry/hiring/QuickHire.tsx';
import ReHireEmploye from './pages/recruitment-and-entry/hiring/ReHireEmploye.tsx';
import DescribeRequests from './pages/recruitment-and-entry/staffing-requests/DescribeRequests.tsx';
import RecruitmentProcess from './pages/recruitment-and-entry/staffing-requests/RecruitmentProcess.tsx';
import ManageStatuses from './pages/recruitment-and-entry/staffing-requests/ManageStatuses.tsx';

import DescribeRequestsByRoles from './pages/recruitment-and-entry/staffing-requests/DescribeRequestsByRoles.tsx';
import PersonalInformation from './pages/personal-data/personal-information/PersonalInformation.tsx';
import Adresse from './pages/personal-data/personal-information/Adresse.tsx';
import PhoneFax from './pages/personal-data/personal-information/PhoneFax.tsx';
import AdresseElectronique from './pages/personal-data/personal-information/AdresseElectronique.tsx';
import BankDetailsPayment from './pages/personal-data/personal-information/BankDetailsPayment.tsx';
import GymChildcare from './pages/personal-data/personal-information/GymChildcare.tsx';
import DocumentsManagementSystem from './pages/personal-data/DocumentsManagementSystem.tsx';
import VehicleManagement from './pages/personal-data/personal-information/VehicleManagement.tsx';
import PhysicalCharacteristics from './pages/personal-data/personal-information/PhysicalCharacteristics.tsx';
import ReviewHours from './pages/theoretical-hours-management/ReviewHours.tsx';
import AssignTheoreticalHours from './pages/theoretical-hours-management/AssignTheoreticalHours.tsx';
import IndividualFile from './pages/personal-data/file-details/IndividualDataPayrollManager.tsx';
import IndividualDataPayrollManager from './pages/personal-data/file-details/IndividualDataPayrollManager.tsx';
import IndividualDataHRProfessional from './pages/personal-data/file-details/IndividualDataHRProfessional.tsx';
import EquipmentUniformPayrollManager from './pages/personal-data/file-details/EquipmentUniformPayrollManager.tsx';
import EquipmentUniformHRProfessional from './pages/personal-data/file-details/EquipmentUniformHRProfessional.tsx';
import CareerPathPayrollManager from './pages/personal-data/file-details/CareerPathPayrollManager.tsx';
import CareerPathHRProfessional from './pages/personal-data/file-details/CareerPathHRProfessional.tsx';
import EnterUnionizationRateHR from './pages/personal-data/file-details/EnterUnionizationRateHR.tsx';
import EnterUnionizationRate from './pages/personal-data/file-details/EnterUnionizationRate.tsx';
import MedicalExpenses from './pages/personal-data/file-details/MedicalExpenses.tsx';
import EmployeeDocuments from './pages/personal-data/file-details/EmployeeDocuments.tsx';
import EmergencyContacts from './pages/personal-data/file-details/EmergencyContacts.tsx';
import RehireEmploye from './pages/recruitment-and-entry/hiring/ReHireEmploye.tsx';
import OnboardingJourney from './pages/recruitment-and-entry/onboarding/OnboardingJourney.tsx';
import ProbationPeriodMonitoring from './pages/recruitment-and-entry/onboarding/ProbationPeriodMonitoring.tsx';
import EquipmentUniform from './pages/personal-data/personal-information/Equipment-Uniform.tsx';



const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);



  return (
    // Wrap the entire application with ThemeProvider
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <Routes>
           

            {/* Onboarding Route */}
            <Route
              path="/onboarding"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Onboarding onComplete={() => setIsOnboarded(true)} />
                </PrivateRoute>
              }
            />

            {/* Protected Application Routes */}
            <Route
              element={
                <PrivateRoute isAuthenticated={isAuthenticated && isOnboarded}>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employee/EmployeeProfileManager" element={<EmployeeProfileManager />} />
              {/* Removed darkMode prop as theme is globally managed */}
              <Route path="/departmentsmanagement/DepartmentsManagement" element={<DepartmentsManagement darkMode={false} />} />

              {/* Existing Leaves routes */}

              <Route path="/administration/system-settings/GeneralSettings" element={<GeneralSettings />} />


              {/* New routes from sidebarData.txt - pointing to Dashboard as HRM */}
            
              <Route path="/recruitment-and-entry/hire-candidate" element={<HireCandidate />} />
              <Route path="/recruitment-and-entry/quick-hire" element={<QuickHire />} />
              <Route path="/recruitment-and-entry/hire-employee" element={<HireEmploye />} />
              <Route path="/recruitment-and-entry/rehire-employee" element={<RehireEmploye />} />
              <Route path="/recruitment-and-entry/correct-entries" element={<CorrectEntry />} />

     

              <Route path="/recruitment-and-entry/onboarding/onboarding-journey" element={<OnboardingJourney />} />
              <Route path="/recruitment-and-entry/onboarding/probation-period-monitoring" element={<ProbationPeriodMonitoring />} />

         
           
              <Route path="/individual-file/transfer-exit/transfer-employee" element={<TransferEmployee />} />
              <Route path="/individual-file/transfer-exit/cancel-transfer" element={<CancelTransfert />} />
              <Route path="/individual-file/transfer-exit/close-file" element={<CloseFile />} />
              <Route path="/individual-file/transfer-exit/cancel-exit" element={<CancelExit />} />

              <Route path="/individual-file/file-details/individual-data-payroll-admin" element={<IndividualDataPayrollManager />} />
              <Route path="/individual-file/file-details/individual-data-hr" element={<IndividualDataHRProfessional />} />

              <Route path="/individual-file/file-details/equipment-uniform-payroll-admin" element={<EquipmentUniformPayrollManager />} />
              <Route path="/individual-file/file-details/equipment-uniform-hr" element={<EquipmentUniformHRProfessional />} />

              <Route path="/individual-file/file-details/describe-career-payroll-admin" element={<CareerPathPayrollManager />} />
              <Route path="/individual-file/file-details/describe-career-hr" element={<CareerPathHRProfessional />} />

              <Route path="/individual-file/file-details/enter-unionization-rate-payroll-admin" element={<EnterUnionizationRate />} />
              <Route path="/individual-file/file-details/enter-unionization-rate-hr" element={<EnterUnionizationRateHR />} />

              <Route path="/individual-file/file-details/medical-expenses" element={<MedicalExpenses />} />

              <Route path="/individual-file/file-details/employee-documents" element={<EmployeeDocuments />} />
              <Route path="/individual-file/file-details/emergency-contacts" element={<EmergencyContacts />} />

              <Route path="/individual-file/contract/create-contract" element={<CreateContract />} />
              <Route path="/individual-file/contract/contract-data" element={<ContractData />} />
              <Route path="/individual-file/contract/update-contractual-data" element={<UpdateContractData />} />
              <Route path="/individual-file/contract/modify-assignment" element={<ModifyAssignment onSave={function (assignment: Assignment): void {
                throw new Error('Function not implemented.');
              } } onCancel={function (): void {
                throw new Error('Function not implemented.');
              } } />} />
              <Route path="/individual-file/contract/consult-payroll-records" element={<ConsultPayrollRecords />} />
             
              <Route path="/individual-file/contract/track-medical-visit" element={<TrackMedicalVisit />} />
              <Route path="/individual-file/contract/remuneration-details" element={<RemunerationDetails />} />

               <Route path="/theoretical-hours-management/assign-theoretical-hours" element={<AssignTheoreticalHours />} />
                <Route path="/theoretical-hours-management/review-hours" element={<ReviewHours />} />


              <Route path="/personal-data/personal-information" element={<PersonalInformation />} />
              <Route path="/personal-data/adresse" element={<Adresse />} />
              <Route path="/personal-data/phone-fax" element={<PhoneFax />} />
              <Route path="/personal-data/adresse-electronique" element={<AdresseElectronique />} />
              <Route path="/personal-data/bank-details-payment" element={<BankDetailsPayment />} />
              <Route path="/personal-data/gymchildcare" element={<GymChildcare />} />
              <Route path="/personal-data/documents-management-system" element={<DocumentsManagementSystem />} />
              <Route path="/personal-data/vehicle-management" element={<VehicleManagement />} />
              <Route path="/personal-data/physical-characteristics" element={<PhysicalCharacteristics />} />
              <Route path="/personal-data/Equipment-Uniform" element={<EquipmentUniform />} />

      
              <Route path="/recruitment-and-entry/staffing-requests/describe-requests" element={<DescribeRequests />} />
              <Route path="/recruitment-and-entry/staffing-requests/describe-requests-by-roles" element={<DescribeRequestsByRoles />} />
              
              <Route path="/recruitment-and-entry/staffing-requests/recruitment-process" element={<RecruitmentProcess />} />
              <Route path="/recruitment-and-entry/staffing-requests/manage-statuses" element={<ManageStatuses />} />


             

      

            </Route>

            {/* Redirect based on authentication state */}
            <Route path="/" element={
              isAuthenticated
                ? (isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />)
                : <Navigate to="/login" />
            } />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
