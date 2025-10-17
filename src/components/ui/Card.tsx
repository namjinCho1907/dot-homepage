import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const baseStyles = `
    bg-white
    rounded-lg
    border border-[#E5E5E5]
    transition-all
    ${hover ? 'hover:shadow-md cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  return (
    <div
      className={`${baseStyles} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
