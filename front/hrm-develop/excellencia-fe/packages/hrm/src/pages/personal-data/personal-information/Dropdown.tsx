import React, { useState, useRef, useEffect, FC } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
  error?: string;
}

const Dropdown: FC<DropdownProps> = ({ label, options, value, onChange, name, className, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  // Logic to dynamically position the dropdown list
  const getDropdownListStyle = () => {
    if (!dropdownRef.current || !optionsRef.current) return {};

    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const listHeight = optionsRef.current.offsetHeight;

    // Check if there is enough space below the select input
    if (rect.bottom + listHeight > viewportHeight) {
      // If not, position it above
      return { top: 'auto', bottom: '100%', marginTop: '4px' };
    }
    // Otherwise, position it below
    return { top: '100%', bottom: 'auto', marginTop: '4px' };
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`mt-2 flex justify-between items-center w-full rounded-lg border shadow-sm px-4 py-2 cursor-pointer ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        onClick={handleToggle}
      >
        <span className="text-gray-900">{value || `Select`}</span>
        <FiChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <ul
          ref={optionsRef}
          className="absolute z-10 w-full max-h-60 overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow-lg"
          style={getDropdownListStyle()}
        >
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Dropdown;