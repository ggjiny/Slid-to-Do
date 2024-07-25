import { KebabIcon } from '@assets';
import useOutsideClick from '@utils/useOutsideClick';
import { MouseEvent, useRef, useState } from 'react';

interface KebabProps {
  onEdit: () => void;
  onDelete: () => void;
  isSmall?: boolean;
}

function Kebab({ onEdit, onDelete, isSmall = false }: KebabProps) {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const popOverRef = useRef<HTMLDivElement>(null);

  const handleClickKebabIcon = (e: MouseEvent) => {
    e.stopPropagation();
    setIsPopOverOpen((prev) => !prev);
  };

  useOutsideClick(popOverRef, () => setIsPopOverOpen(false));

  const handleEditClick = () => {
    onEdit();
    setIsPopOverOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setIsPopOverOpen(false);
  };

  const sizeClasses = isSmall
    ? {
        icon: 'w-[14px] h-[14px]',
        circle: 'w-6 h-6',
        box: 'shadow-sm',
        button: 'text-sm px-4',
      }
    : {
        icon: 'w-6 h-6',
        circle: 'w-8 h-8',
        box: 'shadow-sm tablet:shadow-lg',
        button: 'text-sm tablet:text-lg px-4 tablet:px-5',
      };

  return (
    <div className="relative flex flex-col items-end">
      <div
        className="group relative inline-block cursor-pointer"
        onClick={handleClickKebabIcon}
      >
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${sizeClasses.circle}`}
        />
        <KebabIcon className={`relative z-10 ${sizeClasses.icon}`} />
      </div>
      {isPopOverOpen && (
        <div
          className={`absolute right-0 top-full z-20 -mr-1 mt-3 flex flex-col rounded-lg bg-white leading-5 text-slate-700 tablet:leading-7 ${sizeClasses.box}`}
          ref={popOverRef}
        >
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 border-slate-50 pb-[6px] pt-2 ${sizeClasses.button}`}
            onClick={handleEditClick}
          >
            수정하기
          </button>
          <button
            type="button"
            className={`whitespace-nowrap pb-2 pt-[6px] ${sizeClasses.button}`}
            onClick={handleDeleteClick}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default Kebab;
