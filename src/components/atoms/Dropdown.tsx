import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value?: string | number;
  label: string;
}

interface DropdownProps {
  label: string;
  value: string | number | undefined;
  options: DropdownOption[];
  onChange: (value?: string | number) => void;
  defaultLabel?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  defaultLabel = "All",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        className="flex items-center rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>
          {label}: {selectedOption ? selectedOption.label : defaultLabel}
        </span>
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 max-h-96 w-56 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="flex flex-col p-2 gap-1">
            {options.map((option) => (
              <button
                key={`${option.value} ${option.label}`}
                className={`w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 ${
                  value === option.value
                    ? "bg-blue-50 font-medium text-blue-700"
                    : ""
                }`}
                onClick={() => {
                  onChange(option?.value || undefined);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;