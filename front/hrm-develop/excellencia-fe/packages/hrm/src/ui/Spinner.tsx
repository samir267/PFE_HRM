// src/components/ui/Spinner.tsx
import React from 'react';
import { ImSpinner2 } from 'react-icons/im'; // A more professional spinner icon

export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <ImSpinner2 className="animate-spin h-8 w-8 text-blue-500" />
    </div>
  );
};