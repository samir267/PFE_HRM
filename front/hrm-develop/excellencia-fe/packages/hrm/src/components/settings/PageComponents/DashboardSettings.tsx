// src/components/settings/PageComponents/DashboardSettings.tsx

import React, { useState, useEffect } from 'react';
import { SettingsPageProps } from '../../../types/types';
import SettingsField from '../SettingsField';


const DashboardSettings: React.FC<SettingsPageProps> = ({ onSave, initialSettings }) => {
  const [settings, setSettings] = useState({
    defaultView: initialSettings.defaultView || 'Daily',
    showQuickLinks: initialSettings.showQuickLinks || true,
    dashboardWidgets: initialSettings.dashboardWidgets || [],
    refreshInterval: initialSettings.refreshInterval || 5,
  });

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key: string, value: string, isChecked: boolean) => {
    setSettings((prev) => {
      const currentWidgets = prev.dashboardWidgets;
      if (isChecked) {
        return { ...prev, [key]: [...currentWidgets, value] };
      } else {
        return { ...prev, [key]: currentWidgets.filter((widget: string) => widget !== value) };
      }
    });
  };

  const handleSave = () => {
    console.log('Saving Dashboard Settings:', settings);
    onSave(settings);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Dashboard Settings</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Configure what information is displayed on the user dashboard.</p>

      <SettingsField
        label="Default View"
        id="defaultView"
        type="select"
        value={settings.defaultView}
        onChange={(val) => handleChange('defaultView', val)}
        options={[
          { value: 'Daily', label: 'Daily' },
          { value: 'Weekly', label: 'Weekly' },
          { value: 'Monthly', label: 'Monthly' },
        ]}
      />

      <SettingsField
        label="Show Quick Links"
        id="showQuickLinks"
        type="toggle"
        value={settings.showQuickLinks}
        onChange={(val) => handleChange('showQuickLinks', val)}
        description="Enable/Disable quick access links on the dashboard."
      />

      <div className="py-4 border-b border-gray-200 dark:border-gray-600">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Dashboard Widgets</label>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-2">Select customizable widgets to display.</p>
        <div className="space-y-2">
          {['Upcoming Leaves', 'Pending Approvals', 'Team Availability', 'Recent Activities'].map((widget) => (
            <div key={widget} className="flex items-center">
              <input
                type="checkbox"
                id={`widget-${widget}`}
                checked={settings.dashboardWidgets.includes(widget)}
                onChange={(e) => handleCheckboxChange('dashboardWidgets', widget, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={`widget-${widget}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {widget}
              </label>
            </div>
          ))}
        </div>
      </div>

      <SettingsField
        label="Refresh Interval (minutes)"
        id="refreshInterval"
        type="number"
        value={settings.refreshInterval}
        onChange={(val) => handleChange('refreshInterval', val)}
        description="How often data on the dashboard refreshes (e.g., in minutes)."
        min={1}
      />

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => setSettings(initialSettings)}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DashboardSettings;