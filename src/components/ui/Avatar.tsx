interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeConfig = {
  sm: {
    container: 'w-8 h-8',
    icon: 'w-4 h-4',
  },
  md: {
    container: 'w-10 h-10',
    icon: 'w-5 h-5',
  },
  lg: {
    container: 'w-12 h-12',
    icon: 'w-6 h-6',
  },
  xl: {
    container: 'w-16 h-16',
    icon: 'w-8 h-8',
  },
};

export default function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  const config = sizeConfig[size];

  return (
    <div className={`${config.container} rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-300 bg-gray-100 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <svg
          className={`${config.icon} text-gray-500`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}
    </div>
  );
}
