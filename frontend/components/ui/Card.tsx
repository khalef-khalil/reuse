import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  footer?: React.ReactNode;
}

export default function Card({
  children,
  title,
  footer,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-3 bg-neutral-light dark:bg-neutral-dark border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
} 