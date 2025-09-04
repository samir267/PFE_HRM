import { ReactNode } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  priority?: number;
  href?: string;
  subItems?: SidebarItem[];
}