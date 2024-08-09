import { ArrowDownIcon, ArrowUpIcon } from '@assets';

interface ToggleButtonProps {
  isToggleOpen: boolean;
  onToggleOpen: (v: boolean) => void;
}

function ToggleButton({ isToggleOpen, onToggleOpen }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onToggleOpen(!isToggleOpen)}
      className="absolute bottom-3 mt-3 flex w-full justify-center"
    >
      <div className="flex h-8 w-[120px] items-center rounded-2xl bg-white">
        {isToggleOpen ? (
          <>
            <div className="ml-10 text-sm font-semibold leading-5 text-slate-700">
              닫기
            </div>
            <ArrowUpIcon />
          </>
        ) : (
          <>
            <div className="ml-8 text-sm font-semibold leading-5 text-slate-700">
              더보기
            </div>
            <ArrowDownIcon />
          </>
        )}
      </div>
    </button>
  );
}

export default ToggleButton;
