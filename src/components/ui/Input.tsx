import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  fullWidth = false,
  icon,
  className = '',
  ...props
}: InputProps) {
  const widthClass = fullWidth ? 'w-full' : '';
  const hasError = !!error;

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#000000] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3
            bg-white
            border rounded-lg
            text-[#000000]
            placeholder-[#A3A3A3]
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-[#F5F5F5] disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${hasError
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]'
              : 'border-[#E5E5E5] focus:border-black focus:ring-black'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#EF4444]">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-[#737373]">{helperText}</p>
      )}
    </div>
  );
}
