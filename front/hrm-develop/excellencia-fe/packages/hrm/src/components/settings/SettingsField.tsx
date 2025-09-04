// src/components/settings/SettingsField.tsx

import React from 'react';
import { SettingsFieldProps } from '../../types/types';


const SettingsField: React.FC<SettingsFieldProps> = ({
  label,
  description,
  id,
  value,
  onChange,
  type,
  options,
  placeholder,
  min,
  max,
  radioOptions,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let newValue: any;
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      newValue = parseFloat(e.target.value);
    } else if (type === 'file') {
      newValue = (e.target as HTMLInputElement).files?.[0] || null;
    }
    else {
      newValue = e.target.value;
    }
    onChange(newValue);
  };

  const renderInputField = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            id={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            id={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            min={min}
            max={max}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        );
      case 'select':
        return (
          <select
            id={id}
            value={value}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={id}
            checked={value}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        );
      case 'radio':
        return (
          <div className="mt-2 space-y-2">
            {radioOptions?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`${id}-${option.value}`}
                  name={id}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={`${id}-${option.value}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case 'toggle':
        return (
          <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id={id}
              checked={value}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
          </label>
        );
      case 'file':
        return (
          <input
            type="file"
            id={id}
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-4 border-b border-gray-200 dark:border-gray-600">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      <div className="mt-2">
        {renderInputField()}
      </div>
    </div>
  );
};

export default SettingsField;