import { PlusIcon } from '@assets';
import Button from '@components/Button';
import routes from '@constants/routes';
import useWindowWidth from '@hooks/useWindowWidth';
import { Ref } from 'react';
import { useNavigate } from 'react-router-dom';

interface GoalListProps {
  isEditing: boolean;
  inputRef: Ref<HTMLInputElement>;
  newGoal: string;
  onGoalState: (v: string) => void;
  onAddPostGoal: () => void;
  isPending: boolean;
  goalData: { title: string; id: number }[];
  toggleSideBar: () => void;
  onShowDeletePopup: (goalId: number) => void;
}

function GoalList({
  isEditing,
  inputRef,
  newGoal,
  onGoalState,
  onAddPostGoal,
  isPending,
  goalData,
  toggleSideBar,
  onShowDeletePopup,
}: GoalListProps) {
  const navigate = useNavigate();
  const width = useWindowWidth();
  return (
    <ul id="goal-list">
      {isEditing && (
        <li className="flex items-center p-2 text-sm font-medium text-slate-700">
          <span>•</span>
          <input
            ref={inputRef}
            className="ml-1 h-6 w-max flex-grow rounded-md border border-gray-300 p-2 text-sm"
            placeholder="새 목표를 입력해주세요"
            value={newGoal}
            onChange={(e) => onGoalState(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddPostGoal();
              }
            }}
          />
          <Button
            shape="solid"
            size="xs"
            onClick={onAddPostGoal}
            additionalClass="w-max h-max ml-2"
          >
            <PlusIcon width={16} height={16} className="stroke-white" />
          </Button>
        </li>
      )}
      {isPending && (
        <li className="p-2 text-sm font-medium text-slate-700">• {newGoal}</li>
      )}
      {goalData.map((item) => (
        <div
          onClick={() => {
            navigate(`${routes.goalDetail}/${item.id}`);
            if (width < 1920) toggleSideBar();
          }}
          key={item.id}
        >
          <li className="flex cursor-pointer flex-row items-center justify-between p-2 text-sm font-medium text-slate-700">
            <div>• {item.title}</div>
            <PlusIcon
              id="delete-goal-button"
              width={15}
              height={15}
              className="rotate-45 stroke-slate-400"
              onClick={(e) => {
                e.stopPropagation();
                onShowDeletePopup(item.id);
              }}
            />
          </li>
        </div>
      ))}
    </ul>
  );
}

export default GoalList;
