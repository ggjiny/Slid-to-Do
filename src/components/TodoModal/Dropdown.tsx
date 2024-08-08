import { Goal } from '@/types/interface';
import { ArrowDropdownIcon } from '@assets';
import useGetGoals from '@hooks/api/goalsAPI/useGetGoals';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface DropdownProps {
  selectedOption: { id: number; title: string } | null;
  onSelect: (goal: { id: number; title: string } | null) => void;
  placeholder: string;
}

function Dropdown({ selectedOption, onSelect, placeholder }: DropdownProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetGoals();
  const options =
    data?.pages.flatMap((page) =>
      page.data.goals.map(({ id, title }: Pick<Goal, 'id' | 'title'>) => ({
        id,
        title,
      })),
    ) || [];
  const { ref: intersectionRef, inView } = useInView();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    if ((inView || isOpen) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (isOpen) {
      const dropdown = animationRef.current;
      if (dropdown) {
        dropdown.style.display = 'block';
        setTimeout(() => {
          dropdown.style.opacity = '1';
          dropdown.style.transform = 'translateY(0)';
        }, 0);
      }
      if (dropdownRef.current) {
        dropdownRef.current.scrollTop = 0; // 드롭다운 열릴 때 스크롤 위치 초기화
      }
    } else {
      const dropdown = animationRef.current;
      if (dropdown) {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          dropdown.style.display = 'none';
        }, 300);
      }
    }
  }, [isOpen]);

  const renderDropdownContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-32 items-center justify-center">
          불러오는 중...
        </div>
      );
    }

    if (options.length === 0) {
      return (
        <div className="flex h-32 items-center justify-center">
          등록한 목표가 없어요
        </div>
      );
    }

    return (
      <div ref={dropdownRef} className="max-h-32 overflow-y-auto">
        <div className="flex flex-col items-start justify-start">
          <div
            className="w-full cursor-pointer px-5 py-2 hover:bg-slate-100"
            onClick={() => {
              onSelect(null);
              handleToggleDropdown();
            }}
          >
            {placeholder}
          </div>
          {options.map((option) => (
            <div
              key={option.id}
              className="w-full cursor-pointer px-5 py-2 hover:bg-slate-100"
              onClick={() => {
                onSelect(option);
                handleToggleDropdown();
              }}
            >
              {option.title}
            </div>
          ))}
          {isFetchingNextPage && (
            <div className="w-full px-5 py-2 text-center text-slate-400">
              불러오는 중...
            </div>
          )}
          <div ref={intersectionRef} />
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex h-6 w-full cursor-pointer items-center justify-center self-stretch">
      <button
        type="button"
        className="flex w-full justify-between self-stretch bg-slate-50 px-5"
        onClick={handleToggleDropdown}
      >
        <div className="text-start">
          {selectedOption ? selectedOption.title : placeholder}
        </div>
        <ArrowDropdownIcon className="p-[3px]" />
      </button>
      <div
        ref={animationRef}
        className="absolute top-10 z-10 w-full transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 ease-out"
      >
        {renderDropdownContent()}
      </div>
    </div>
  );
}

export default Dropdown;
