// components/shell.tsx
import React from 'react';
import { useAppSelector } from '../store/hooks';

interface ShellProps {
  moduleName?: string;
  children?: React.ReactNode;
}

/**
 * Shell component to be exposed to other micro-frontends
 * This component provides shared functionality and UI elements
 */
const Shell: React.FC<ShellProps> = ({ moduleName, children }) => {
  const user = useAppSelector(state => state.auth.user);
  const { theme } = useAppSelector(state => state.ui);
  
  return (
    <div className={`shell-container theme-${theme}`}>
      {moduleName && (
        <div className="module-header">
          <h2>{moduleName}</h2>
        </div>
      )}
      
      <div className="shell-content">
        {children}
      </div>
      
      {/* Any shared UI elements can be added here */}
    </div>
  );
};

export default Shell;