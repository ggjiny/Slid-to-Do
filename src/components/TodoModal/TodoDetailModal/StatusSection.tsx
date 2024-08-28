import { ActiveBlue, Inactive } from '@assets';

interface StatusSectionProps {
  done: boolean;
  toggleDone: () => void;
}

function StatusSection({ done, toggleDone }: StatusSectionProps) {
  return (
    <div
      className="flex flex-col items-start justify-start gap-2 self-stretch"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-start gap-0.5">
        <div className="flex h-6 grow items-start justify-start gap-0.5">
          <button
            type="button"
            aria-label="Toggle Status"
            className="flex h-6 w-6 items-center justify-center p-[3px]"
            onClick={toggleDone}
          >
            {done ? (
              <ActiveBlue width={24} height={24} />
            ) : (
              <Inactive width={24} height={24} />
            )}
          </button>
          <div className="text-base font-semibold leading-normal text-slate-600">
            {done ? 'Done' : 'Todo'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusSection;
