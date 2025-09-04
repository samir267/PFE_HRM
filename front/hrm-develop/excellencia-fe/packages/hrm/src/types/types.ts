// src/types.ts

import { IconType } from 'react-icons';

export interface PageSetting {
  id: string;
  label: string;
  component: React.FC<SettingsPageProps>;
}

export interface Group {
  id: string;
  label: string;
  icon: IconType;
  pages: (PageSetting | Group)[]; // A group can contain pages or other groups
}

export interface SettingsPageProps {
  onSave: (settings: Record<string, any>) => void;
  initialSettings: Record<string, any>;
}

export interface SettingsFieldProps {
  label: string;
  description?: string;
  id: string;
  value: any;
  onChange: (value: any) => void;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'radio' | 'toggle' | 'file';
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  radioOptions?: { value: string; label: string }[];
}