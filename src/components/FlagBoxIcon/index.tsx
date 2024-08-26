import { FlagIcon } from '@assets';
import cn from '@utils/cn';

interface FlagBoxIconProps {
  isSmall?: boolean;
  color?: 'slate' | 'orange';
  additionalClass?: string;
}

function FlagBoxIcon({
  isSmall,
  color = 'slate',
  additionalClass,
}: FlagBoxIconProps) {
  const sizeClasses = isSmall
    ? { box: 'h-6 w-6 rounded-lg', icon: 'h-[14.4px] w-[14.4px]' }
    : { box: 'h-10 w-10 rounded-[15px]', icon: 'w-6 h-6' };

  const colorClasses = {
    slate: 'bg-slate-800',
    orange: 'bg-orange-500',
  };

  return (
    <div
      className={cn(
        `flex items-center justify-center`,
        colorClasses[color],
        sizeClasses.box,
        additionalClass,
      )}
      aria-label="Flag icon"
    >
      <FlagIcon className={cn(`fill-white`, sizeClasses.icon)} />
    </div>
  );
}

export default FlagBoxIcon;
