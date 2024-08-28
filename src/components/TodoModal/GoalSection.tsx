import { Goal } from '@/types/interface';
import { PlusIcon } from '@assets';
import Dropdown from './Dropdown';

interface GoalSectionProps {
  goal: Goal | null;
  onGoalChange: (selectedOption: Goal | null) => void;
  onGoalModalOpen: () => void;
}

function GoalSection({
  goal,
  onGoalChange,
  onGoalModalOpen,
}: GoalSectionProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-3 self-stretch">
      <div className="flex w-full items-center justify-between">
        <div className="text-base font-semibold leading-normal text-slate-800">
          목표
        </div>
        <div
          className="inline-flex cursor-pointer items-center gap-1 text-gray-500"
          onClick={onGoalModalOpen}
        >
          <PlusIcon className="h-4 w-4 stroke-gray-500" />
          <span className="mt-0.5 text-sm font-semibold">새 목표</span>
        </div>
      </div>
      <div className="flex h-12 w-full items-center justify-center self-stretch rounded-xl bg-slate-50 py-3">
        <Dropdown
          selectedOption={goal}
          onSelect={onGoalChange}
          placeholder="목표를 선택해주세요 (선택 안함)"
        />
      </div>
    </div>
  );
}

export default GoalSection;
