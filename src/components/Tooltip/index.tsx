import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'bottom right';
}

function Tooltip({ children, text, position = 'bottom' }: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    'bottom right': 'top-full left-0 mt-2',
  };

  return (
    <div className="group relative">
      {children}
      <div
        className={`absolute z-[200] hidden text-nowrap rounded-xl bg-slate-600 px-2 py-1 text-sm text-white opacity-80 shadow-sm group-hover:block ${positionClasses[position]}`}
      >
        {text}
      </div>
    </div>
  );
}

export default Tooltip;
