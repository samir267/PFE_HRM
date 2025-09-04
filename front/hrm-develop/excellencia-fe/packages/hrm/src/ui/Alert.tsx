// src/components/ui/Alert.tsx
import React from 'react';
import { MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message, className }) => {
  const baseClasses = "p-3 rounded-md flex items-center space-x-2";
  let typeClasses = "";
  let Icon;

  switch (type) {
    case 'success':
      typeClasses = "bg-green-100 text-green-800";
      Icon = MdCheckCircle;
      break;
    case 'error':
      typeClasses = "bg-red-100 text-red-800";
      Icon = MdError;
      break;
    case 'info':
      typeClasses = "bg-blue-100 text-blue-800";
      Icon = MdInfo;
      break;
    case 'warning':
      typeClasses = "bg-yellow-100 text-yellow-800";
      Icon = MdWarning;
      break;
    default:
      typeClasses = "bg-gray-100 text-gray-800";
      Icon = MdInfo;
  }

  return (
    <div className={`${baseClasses} ${typeClasses} ${className}`}>
      {Icon && <Icon className="h-5 w-5" />}
      <span>{message}</span>
    </div>
  );
};
