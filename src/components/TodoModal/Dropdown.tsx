import { Goal, Todo } from '@/types/interface';
import { ArrowDropdownIcon } from '@assets';

interface DropdownProps {
  options: Goal[];
  selectedOption: Todo['goal'] | null;
  onSelect: (goal: Todo['goal'] | null) => void;
  placeholder: string;
  isDropdownOpen: boolean;
  onToggle: () => void;
}

function Dropdown({
  options,
  selectedOption,
  onSelect,
  placeholder,
  isDropdownOpen,
  onToggle,
}: DropdownProps) {
  return (
    <div className="relative flex h-6 w-full cursor-pointer items-center justify-center self-stretch">
      <button
        type="button"
        className="flex w-full justify-between self-stretch bg-slate-50 px-5"
        onClick={onToggle}
      >
        <div className="text-start">
          {selectedOption !== null ? selectedOption.title : placeholder}
        </div>
        <ArrowDropdownIcon className="p-[3px]" />
      </button>
      {isDropdownOpen && (
        <div className="absolute top-10 z-10 w-full overflow-hidden rounded-xl bg-white shadow-md">
          {options.length > 0 ? (
            <div className="max-h-32 overflow-y-auto">
              <div className="flex flex-col items-start justify-start">
                <div
                  className="w-full cursor-pointer px-5 py-2 hover:bg-slate-100"
                  onClick={() => {
                    onSelect(null);
                    onToggle();
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
                      onToggle();
                    }}
                  >
                    {option.title}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center">
              등록한 목표가 없어요
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
