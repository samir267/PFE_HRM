// src/components/settings/SettingsContent.tsx

import React from 'react';
import { PageSetting } from '../../types/types';

interface SettingsContentProps {
  activePage: PageSetting | null;
  onSaveSettings: (settings: Record<string, any>) => void;
  initialPageSettings: Record<string, any>;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ activePage, onSaveSettings, initialPageSettings }) => {
  if (!activePage) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-lg">
        Select a settings page from the sidebar.
      </div>
    );
  }

  const PageComponent = activePage.component;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <PageComponent onSave={onSaveSettings} initialSettings={initialPageSettings} />
    </div>
  );
};

export default SettingsContent;