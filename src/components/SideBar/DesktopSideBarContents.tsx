import { FlagIcon, HomeIcon, PlusIcon } from '@assets';
import Button from '@components/Button';
import routes from '@constants/routes';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostControl from '../../hooks/usePostControl';
import GoalList from './GoalList';
import Header from './Header';

interface DesktopSideBarContentsProps {
  width: number;
  userData: { name: string; email: string };
  goalData: { title: string; id: number }[];
  toggleSideBar: () => void;
  onShowTodoModal: () => void;
  onShowDeletePopup: (goalId: number) => void;
}

function DesktopSideBarContents({
  userData,
  goalData,
  toggleSideBar,
  onShowTodoModal,
  width,
  onShowDeletePopup,
}: DesktopSideBarContentsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    handleAddGoalBtn,
    handleAddPostGoal,
    isEditing,
    newGoal,
    handleGoalState,
    isPending,
  } = usePostControl(inputRef);

  return (
    <>
      <div className="flex-col">
        <Header userData={userData} toggleSideBar={toggleSideBar} />
        <div className="my-6 flex justify-center">
          <Button
            shape="solid"
            size="sm"
            additionalClass="w-full"
            onClick={onShowTodoModal}
          >
            <PlusIcon width={24} height={24} className="mr-2 stroke-white" />
            <span className="mr-2 text-base font-semibold">새 할 일</span>
          </Button>
        </div>
        <div className="absolute left-0 w-full border-b-[1px]"> </div>
        <div
          className="my-4 mt-10 flex h-8 cursor-pointer flex-row items-center"
          onClick={() => {
            navigate(`${routes.dashboard}`);
            if (width < 1920) toggleSideBar();
          }}
        >
          <HomeIcon width={24} height={24} />
          <div className="ml-2 text-lg font-medium text-slate-800">
            대시보드
          </div>
        </div>
        <div className="absolute left-0 w-full border-b-[1px]"> </div>
        <div className="my-4 mt-8 flex h-8 flex-row items-center justify-between">
          <div className="flex flex-row">
            <FlagIcon width={24} height={24} fill="#1E293B" />
            <div className="ml-2 text-lg font-medium text-slate-800">목표</div>
          </div>
          <Button
            id="add-goal-button-sideBar"
            shape="outlined"
            size="xs"
            onClick={handleAddGoalBtn}
            disabled={isEditing}
          >
            <PlusIcon
              width={20}
              height={20}
              className={`${isEditing ? 'stroke-slate-400' : 'stroke-blue-500'}`}
            />
            <span className="mr-2 text-sm font-semibold">새 목표</span>
          </Button>
        </div>
        <GoalList
          isEditing={isEditing}
          inputRef={inputRef}
          newGoal={newGoal}
          onGoalState={handleGoalState}
          onAddPostGoal={handleAddPostGoal}
          isPending={isPending}
          goalData={goalData}
          toggleSideBar={toggleSideBar}
          onShowDeletePopup={onShowDeletePopup}
        />
      </div>
    </>
  );
}

export default DesktopSideBarContents;
