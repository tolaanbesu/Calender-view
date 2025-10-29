import React, { memo } from "react";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

// Wrapped in memo for performance
export const Select: React.FC<SelectProps> = memo(({ options, className, ...props }) => (
  <select
    className={`w-full border border-neutral-300 rounded-lg px-3 py-2 text-base shadow-sm
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors
    disabled:bg-neutral-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
));

Select.displayName = "Select";
