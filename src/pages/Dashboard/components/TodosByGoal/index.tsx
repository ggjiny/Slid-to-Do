import { Goal } from '@/types/interface';
import { FlagIcon } from '@assets';
import { mockGoalsData } from '../mockData';
import TodosByGoalBox from './TodosByGoalBox';

function TodosByGoal() {
  return (
    <div className="mt-4 w-full rounded-xl bg-white px-6 pb-6 pt-4 tablet:mt-6">
      <div className="flex items-center">
        <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-[15px] bg-[#F97316]">
          <FlagIcon fill="white" width={24} height={24} />
        </div>
        <div className="text-lg font-semibold leading-7 text-slate-800">
          목표별 할 일
        </div>
      </div>
      {mockGoalsData.goals && mockGoalsData.goals.length > 0 ? (
        <div className="mt-4">
          {mockGoalsData.goals.map((goal: Goal) => (
            <TodosByGoalBox key={goal.id} title={goal.title} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center text-sm font-normal text-slate-500 tablet:min-h-[616px]">
          등록한 목표가 없어요
        </div>
      )}
    </div>
  );
}

export default TodosByGoal;
