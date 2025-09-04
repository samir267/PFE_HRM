// src/components/settings/SettingsPage.tsx

import React, { useState, useEffect } from 'react';
import SettingsSidebar from './SettingsSidebar';
import SettingsContent from './SettingsContent';

import {
  MdDashboard, MdOutlinePermContactCalendar, MdOutlineAdminPanelSettings, MdAccessTime,
  MdOutlineAccessAlarm, MdOutlineAnalytics, MdCalendarMonth, MdWork, MdIntegrationInstructions,
  MdOutlineAccountCircle, MdOutlineHolidayVillage, MdOutlineCorporateFare, MdMenu, MdClose,
} from 'react-icons/md';
import DashboardSettings from './PageComponents/DashboardSettings';
import { Group, PageSetting } from '../../types/types';

// Import all page components

// import LeaveManagementSettings from './PageComponents/LeaveManagementSettings';
// import NewRequestSettings from './PageComponents/NewRequestSettings';
// import MyLeaveBalanceSettings from './PageComponents/MyLeaveBalanceSettings';
// import ApprovalsSettings from './PageComponents/ApprovalsSettings';
// import PendingApprovalsSettings from './PageComponents/PendingApprovalsSettings';
// import ApprovalsDashboardSettings from './PageComponents/ApprovalsDashboardSettings';
// import ApprovalsHistorySettings from './PageComponents/ApprovalsHistorySettings';
// import MyRequestsSettings from './PageComponents/MyRequestsSettings';
// import AllMyRequestsSettings from './PageComponents/AllMyRequestsSettings';
// import DetailedListSettings from './PageComponents/DetailedListSettings';
// import ConfigurationSettings from './PageComponents/ConfigurationSettings';
// import LeaveTypesSettings from './PageComponents/LeaveTypesSettings';
// import SearchFiltersSettings from './PageComponents/SearchFiltersSettings';
// import PlanningCalendarSettings from './PageComponents/PlanningCalendarSettings';
// import MyPlanningSettings from './PageComponents/MyPlanningSettings';
// import MyCalendarSettings from './PageComponents/MyCalendarSettings';
// import MyPlanningDetailedSettings from './PageComponents/MyPlanningDetailedSettings';
// import TeleworkSettings from './PageComponents/TeleworkSettings';
// import TeamSettings from './PageComponents/TeamSettings';
// import TeamCalendarSettings from './PageComponents/TeamCalendarSettings';
// import TeamPlanningSettings from './PageComponents/TeamPlanningSettings';
// import AnnualCalendarSettings from './PageComponents/AnnualCalendarSettings';
// import MyProfileSettings from './PageComponents/MyProfileSettings';
// import AdministrationSettings from './PageComponents/AdministrationSettings';
// import UserManagementSettings from './PageComponents/UserManagementSettings';
// import UsersSettings from './PageComponents/UsersSettings';
// import GroupsSettings from './PageComponents/GroupsSettings';
// import TeamsSettings from './PageComponents/TeamsSettings';
// import DepartmentsSettings from './PageComponents/DepartmentsSettings';
// import SystemSettings from './PageComponents/SystemSettings';
// import GeneralSettingsSettings from './PageComponents/GeneralSettingsSettings';
// import AuditLogsSettings from './PageComponents/AuditLogsSettings';
// import ReportingAnalyticsSettings from './PageComponents/ReportingAnalyticsSettings';
// import ReportsSettings from './PageComponents/ReportsSettings';
// import CustomReportsSettings from './PageComponents/CustomReportsSettings';
// import DataExportsSettings from './PageComponents/DataExportsSettings';
// import TimeTrackingSettings from './PageComponents/TimeTrackingSettings';
// import DailyTimesheetSettings from './PageComponents/DailyTimesheetSettings';
// import WeeklyTimesheetSettings from './PageComponents/WeeklyTimesheetSettings';
// import ProjectTimesheetSettings from './PageComponents/ProjectTimesheetSettings';
// import TimesheetApprovalsSettings from './PageComponents/TimesheetApprovalsSettings';
// import TimeReportsSettings from './PageComponents/TimeReportsSettings';
// import AttendanceManagementSettings from './PageComponents/AttendanceManagementSettings';
// import ClockInOutSettings from './PageComponents/ClockInOutSettings';
// import AttendanceRecordsSettings from './PageComponents/AttendanceRecordsSettings';
// import AttendanceReportsSettings from './PageComponents/AttendanceReportsSettings';
// import AttendanceExceptionsSettings from './PageComponents/AttendanceExceptionsSettings';
// import OvertimeManagementSettings from './PageComponents/OvertimeManagementSettings';
// import OvertimeRequestsSettings from './PageComponents/OvertimeRequestsSettings';
// import OvertimeApprovalsSettings from './PageComponents/OvertimeApprovalsSettings';
// import OvertimeHistorySettings from './PageComponents/OvertimeHistorySettings';
// import ReportsAnalyticsGeneralSettings from './PageComponents/ReportsAnalyticsGeneralSettings';
// import SummaryReportsSettings from './PageComponents/SummaryReportsSettings';
// import DetailedReportsSettings from './PageComponents/DetailedReportsSettings';
// import CustomReportsGeneralSettings from './PageComponents/CustomReportsGeneralSettings';
// import HolidayManagementSettings from './PageComponents/HolidayManagementSettings';
// import PublicHolidaysSettings from './PageComponents/PublicHolidaysSettings';
// import CompanyHolidaysSettings from './PageComponents/CompanyHolidaysSettings';
// import HolidayRequestsSettings from './PageComponents/HolidayRequestsSettings';
// import WorkflowManagementSettings from './PageComponents/WorkflowManagementSettings';
// import ApprovalWorkflowsSettings from './PageComponents/ApprovalWorkflowsSettings';
// import NotificationSettingsSettings from './PageComponents/NotificationSettingsSettings';
// import IntegrationsSettings from './PageComponents/IntegrationsSettings';


// Define your settings structure
const SETTINGS_GROUPS: Group[] = [
  {
    id: 'main_navigation',
    label: 'Main Navigation',
    icon: MdDashboard,
    pages: [
      { id: 'dashboard_settings', label: 'Dashboard', component: DashboardSettings },
    ],
  },
//   {
//     id: 'leave_management',
//     label: 'Leave Management',
//     icon: MdOutlinePermContactCalendar,
//     pages: [
//       { id: 'leave_management_general', label: 'Leave Management', component: LeaveManagementSettings },
//       { id: 'new_request', label: 'New Request', component: NewRequestSettings },
//       { id: 'my_leave_balance', label: 'My Leave Balance', component: MyLeaveBalanceSettings },
//       {
//         id: 'approvals',
//         label: 'Approvals',
//         icon: MdOutlinePermContactCalendar, // Reusing icon for nested group
//         pages: [
//           { id: 'approvals_general', label: 'Approvals General', component: ApprovalsSettings },
//           { id: 'pending_approvals', label: 'Pending Approvals', component: PendingApprovalsSettings },
//           { id: 'approvals_dashboard', label: 'Approvals Dashboard', component: ApprovalsDashboardSettings },
//           { id: 'approvals_history', label: 'Approvals History', component: ApprovalsHistorySettings },
//         ],
//       },
//       {
//         id: 'my_requests',
//         label: 'My Requests',
//         icon: MdOutlinePermContactCalendar, // Reusing icon for nested group
//         pages: [
//           { id: 'my_requests_general', label: 'My Requests General', component: MyRequestsSettings },
//           { id: 'all_my_requests', label: 'All My Requests', component: AllMyRequestsSettings },
//           { id: 'detailed_list', label: 'Detailed List', component: DetailedListSettings },
//         ],
//       },
//       {
//         id: 'configuration',
//         label: 'Configuration',
//         icon: MdOutlinePermContactCalendar, // Reusing icon for nested group
//         pages: [
//           { id: 'configuration_general', label: 'Leave Configuration', component: ConfigurationSettings },
//           { id: 'leave_types', label: 'Leave Types', component: LeaveTypesSettings },
//           { id: 'search_filters', label: 'Search Filters', component: SearchFiltersSettings },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'planning_calendar',
//     label: 'Planning & Calendar',
//     icon: MdCalendarMonth,
//     pages: [
//       { id: 'planning_calendar_general', label: 'Planning & Calendar', component: PlanningCalendarSettings },
//       {
//         id: 'my_planning',
//         label: 'My Planning',
//         icon: MdCalendarMonth,
//         pages: [
//           { id: 'my_planning_general', label: 'My Planning General', component: MyPlanningSettings },
//           { id: 'my_calendar', label: 'My Calendar', component: MyCalendarSettings },
//           { id: 'my_planning_detailed', label: 'My Planning (Detailed)', component: MyPlanningDetailedSettings },
//           { id: 'telework', label: 'Telework', component: TeleworkSettings },
//         ],
//       },
//       {
//         id: 'team_planning',
//         label: 'Team',
//         icon: MdCalendarMonth,
//         pages: [
//           { id: 'team_general', label: 'Team Planning General', component: TeamSettings },
//           { id: 'team_calendar', label: 'Team Calendar', component: TeamCalendarSettings },
//           { id: 'team_planning_display', label: 'Team Planning Display', component: TeamPlanningSettings },
//           { id: 'annual_calendar', label: 'Annual Calendar', component: AnnualCalendarSettings },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'user_profile',
//     label: 'User Profile',
//     icon: MdOutlineAccountCircle,
//     pages: [
//       { id: 'my_profile', label: 'My Profile', component: MyProfileSettings },
//     ],
//   },
//   {
//     id: 'administration',
//     label: 'Administration',
//     icon: MdOutlineAdminPanelSettings,
//     pages: [
//       { id: 'administration_general', label: 'Administration', component: AdministrationSettings },
//       {
//         id: 'user_management',
//         label: 'User Management',
//         icon: MdOutlineAdminPanelSettings,
//         pages: [
//           { id: 'user_management_general', label: 'User Management', component: UserManagementSettings },
//           { id: 'users', label: 'Users', component: UsersSettings },
//           { id: 'groups', label: 'Groups', component: GroupsSettings },
//           { id: 'teams', label: 'Teams', component: TeamsSettings },
//           { id: 'departments', label: 'Departments', component: DepartmentsSettings },
//         ],
//       },
//       {
//         id: 'system_settings',
//         label: 'System Settings',
//         icon: MdOutlineAdminPanelSettings,
//         pages: [
//           { id: 'system_general', label: 'System Settings', component: SystemSettings },
//           { id: 'general_system_settings', label: 'General System Settings', component: GeneralSettingsSettings },
//           { id: 'audit_logs', label: 'Audit Logs', component: AuditLogsSettings },
//         ],
//       },
//       {
//         id: 'reporting_analytics_admin',
//         label: 'Reporting & Analytics',
//         icon: MdOutlineAdminPanelSettings,
//         pages: [
//           { id: 'reporting_analytics_general_admin', label: 'Reporting & Analytics', component: ReportingAnalyticsSettings },
//           { id: 'reports_admin', label: 'Standard Reports', component: ReportsSettings },
//           { id: 'custom_reports_admin', label: 'Custom Reports', component: CustomReportsSettings },
//           { id: 'data_exports_admin', label: 'Data Exports', component: DataExportsSettings },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'time_tracking',
//     label: 'Time Tracking',
//     icon: MdAccessTime,
//     pages: [
//       { id: 'time_tracking_general', label: 'Time Tracking', component: TimeTrackingSettings },
//       { id: 'daily_timesheet', label: 'Daily Timesheet', component: DailyTimesheetSettings },
//       { id: 'weekly_timesheet', label: 'Weekly Timesheet', component: WeeklyTimesheetSettings },
//       { id: 'project_timesheet', label: 'Project Timesheet', component: ProjectTimesheetSettings },
//       { id: 'timesheet_approvals', label: 'Timesheet Approvals', component: TimesheetApprovalsSettings },
//       { id: 'time_reports', label: 'Time Reports', component: TimeReportsSettings },
//     ],
//   },
//   {
//     id: 'attendance_management',
//     label: 'Attendance Management',
//     icon: MdOutlineAccessAlarm,
//     pages: [
//       { id: 'attendance_management_general', label: 'Attendance Management', component: AttendanceManagementSettings },
//       { id: 'clock_in_out', label: 'Clock In/Out', component: ClockInOutSettings },
//       { id: 'attendance_records', label: 'Attendance Records', component: AttendanceRecordsSettings },
//       { id: 'attendance_reports', label: 'Attendance Reports', component: AttendanceReportsSettings },
//       { id: 'attendance_exceptions', label: 'Attendance Exceptions', component: AttendanceExceptionsSettings },
//     ],
//   },
//   {
//     id: 'overtime_management',
//     label: 'Overtime Management',
//     icon: MdWork,
//     pages: [
//       { id: 'overtime_management_general', label: 'Overtime Management', component: OvertimeManagementSettings },
//       { id: 'overtime_requests', label: 'Overtime Requests', component: OvertimeRequestsSettings },
//       { id: 'overtime_approvals', label: 'Overtime Approvals', component: OvertimeApprovalsSettings },
//       { id: 'overtime_history', label: 'Overtime History', component: OvertimeHistorySettings },
//     ],
//   },
//   {
//     id: 'reports_analytics_general',
//     label: 'Reports & Analytics',
//     icon: MdOutlineAnalytics,
//     pages: [
//       { id: 'reports_analytics_general_overall', label: 'Reports & Analytics', component: ReportsAnalyticsGeneralSettings },
//       { id: 'summary_reports', label: 'Summary Reports', component: SummaryReportsSettings },
//       { id: 'detailed_reports', label: 'Detailed Reports', component: DetailedReportsSettings },
//       { id: 'custom_reports_general', label: 'Custom Reports', component: CustomReportsGeneralSettings },
//     ],
//   },
//   {
//     id: 'holiday_management',
//     label: 'Holiday Management',
//     icon: MdOutlineHolidayVillage,
//     pages: [
//       { id: 'holiday_management_general', label: 'Holiday Management', component: HolidayManagementSettings },
//       { id: 'public_holidays', label: 'Public Holidays', component: PublicHolidaysSettings },
//       { id: 'company_holidays', label: 'Company Holidays', component: CompanyHolidaysSettings },
//       { id: 'holiday_requests', label: 'Holiday Requests', component: HolidayRequestsSettings },
//     ],
//   },
//   {
//     id: 'workflow_management',
//     label: 'Workflow Management',
//     icon: MdOutlineCorporateFare,
//     pages: [
//       { id: 'workflow_management_general', label: 'Workflow Management', component: WorkflowManagementSettings },
//       { id: 'approval_workflows', label: 'Approval Workflows', component: ApprovalWorkflowsSettings },
//       { id: 'notification_settings', label: 'Notification Settings', component: NotificationSettingsSettings },
//     ],
//   },
//   {
//     id: 'integrations',
//     label: 'Integrations',
//     icon: MdIntegrationInstructions,
//     pages: [
//       { id: 'integrations_general', label: 'Integrations', component: IntegrationsSettings },
//     ],
//   },
];

// Helper function to find a page by its IDs
const findPage = (groups: Group[], groupId: string | null, pageId: string | null): PageSetting | null => {
  if (!groupId || !pageId) return null;

  for (const group of groups) {
    if (group.id === groupId) {
      for (const item of group.pages) {
        if ('pages' in item) { // It's a nested group
          const found = findPage([item], groupId, pageId); // Recursively search in nested group
          if (found) return found;
        } else if (item.id === pageId) {
          return item;
        }
      }
    } else { // Check if the page is in a nested group of a different parent
      const found = findPage(group.pages as Group[], groupId, pageId);
      if (found) return found;
    }
  }
  return null;
};


// Initial settings state (in a real app, this would come from an API)
const initialGlobalSettings: Record<string, Record<string, any>> = {
  dashboard_settings: {
    defaultView: 'Daily',
    showQuickLinks: true,
    dashboardWidgets: ['Upcoming Leaves', 'Pending Approvals'],
    refreshInterval: 5,
  },
  leave_management_general: {
    enableLeaveRequests: true,
    defaultApprovalFlow: 'Single Approver',
    notificationPreferences: ['Email'],
    minimumNoticePeriod: 1,
  },
  my_profile: {
    profilePictureUpload: true,
    contactInformationVisibility: 'Team Only',
    notificationPreferences: ['Email', 'In-app'],
    twoFactorAuthentication: false,
  },
  // ... add initial settings for all other pages
};

const SettingsPage: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<string | null>('main_navigation');
  const [activePageId, setActivePageId] = useState<string | null>('dashboard_settings');
  const [settingsData, setSettingsData] = useState<Record<string, Record<string, any>>>(initialGlobalSettings);
  const [isRightBarOpen, setIsRightBarOpen] = useState(false); // State for the right bar

  useEffect(() => {
    // Set initial active page to the first one in the list
    if (SETTINGS_GROUPS.length > 0 && SETTINGS_GROUPS[0].pages.length > 0) {
      const firstPage = SETTINGS_GROUPS[0].pages[0];
      if (!('pages' in firstPage)) { // Ensure it's a leaf page
        setActiveGroupId(SETTINGS_GROUPS[0].id);
        setActivePageId(firstPage.id);
      }
    }
  }, []);

  const handleSelectPage = (groupId: string, pageId: string) => {
    setActiveGroupId(groupId);
    setActivePageId(pageId);
    // Optionally close the right bar when a new page is selected
    setIsRightBarOpen(false);
  };

  const handleSaveSettings = (updatedSettings: Record<string, any>) => {
    if (activePageId) {
      setSettingsData((prev) => ({
        ...prev,
        [activePageId]: updatedSettings,
      }));
      console.log(`Settings for ${activePageId} saved:`, updatedSettings);
      alert('Settings saved successfully!');
    }
  };

  const activePage = findPage(SETTINGS_GROUPS, activeGroupId, activePageId);
  const initialPageSettings = activePageId ? settingsData[activePageId] || {} : {};

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[280px] p-4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <SettingsSidebar
          groups={SETTINGS_GROUPS}
          onSelectPage={handleSelectPage}
          activeGroupId={activeGroupId}
          activePageId={activePageId}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto relative">
        <SettingsContent
          activePage={activePage}
          onSaveSettings={handleSaveSettings}
          initialPageSettings={initialPageSettings}
        />

        {/* Right Bar Toggle Button */}
        <button
          onClick={() => setIsRightBarOpen(!isRightBarOpen)}
          className="absolute top-4 right-4 p-2 rounded-full bg-indigo-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50"
        >
          {isRightBarOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
        </button>

        {/* Right Bar Information */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-gray-50 dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out p-6 border-l border-gray-200 dark:border-gray-700 z-40
            ${isRightBarOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Page Information</h3>
            <button
              onClick={() => setIsRightBarOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <MdClose className="h-6 w-6" />
            </button>
          </div>
          {activePage ? (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <span className="font-semibold">Current Page:</span> {activePage.label}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <span className="font-semibold">Description:</span>{' '}
                {activePage.component.displayName || activePage.label} provides the specific configurations for this section.
              </p>
              {/* You can add more dynamic info here based on activePage.id or other criteria */}
              <div className="mt-8 p-4 bg-gray-200 dark:bg-gray-700 rounded-md">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Help & Documentation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For detailed information about the settings on this page, please refer to our{' '}
                  <a href="#" className="text-indigo-600 hover:underline">documentation</a> or contact support.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No page selected to display information.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;