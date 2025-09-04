// src/components/settings/SettingsSidebar.tsx

import React, { useState } from 'react';

import { MdOutlineChevronRight } from 'react-icons/md';
import { Group } from '../../types/types';

interface SettingsSidebarProps {
  groups: Group[];
  onSelectPage: (groupId: string, pageId: string) => void;
  activeGroupId: string | null;
  activePageId: string | null;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  groups,
  onSelectPage,
  activeGroupId,
  activePageId,
}) => {
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const renderGroup = (group: Group, level: number = 0) => (
    <div key={group.id} className="mb-2">
      <button
        onClick={() => toggleGroup(group.id)}
        className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-200
          ${activeGroupId === group.id && level === 0 ? 'bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}
        `}
        style={{ paddingLeft: `${1.25 + level * 0.75}rem` }}
      >
        <div className="flex items-center">
          <group.icon className="h-5 w-5 mr-3" />
          <span className="font-medium text-base">{group.label}</span>
        </div>
        <MdOutlineChevronRight
          className={`h-5 w-5 transition-transform duration-200 ${openGroups.includes(group.id) ? 'rotate-90' : ''}`}
        />
      </button>
      {openGroups.includes(group.id) && (
        <div className="pl-4 border-l border-gray-200 dark:border-gray-600 ml-4 mt-2">
          {group.pages.map((item) => {
            if ('pages' in item) {
              return renderGroup(item, level + 1); // Nested group
            } else {
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectPage(group.id, item.id)}
                  className={`flex items-center w-full p-2 rounded-md text-sm transition-colors duration-200
                    ${activePageId === item.id && activeGroupId === group.id
                      ? 'bg-indigo-500 text-white dark:bg-indigo-600'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }
                    mb-1
                  `}
                  style={{ paddingLeft: `${1.25 + (level + 1) * 0.75}rem` }}
                >
                  {item.label}
                </button>
              );
            }
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner overflow-y-auto">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Settings Categories</h3>
      <div className="space-y-1">
        {groups.map((group) => renderGroup(group))}
      </div>
    </div>
  );
};

export default SettingsSidebar;