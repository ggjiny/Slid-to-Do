import { Goal } from '@/types/interface';
import Dropdown from './Dropdown';

interface GoalSectionProps {
  goal: Goal | null;
  onGoalChange: (selectedOption: Goal | null) => void;
}

function GoalSection({ goal, onGoalChange }: GoalSectionProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-3 self-stretch">
      <div className="text-base font-semibold leading-normal text-slate-800">
        목표
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
