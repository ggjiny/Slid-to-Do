import { FlagIcon } from '@assets';
import Kebab from '@components/Kebab';
import Popup from '@components/Popup';
import routes from '@constants/routes';
import useDeleteGoal from '@hooks/api/goalsAPI/useDeleteGoal';
import useGetGoal from '@hooks/api/goalsAPI/useGetGoal';
import usePatchGoal from '@hooks/api/goalsAPI/usePatchGoal';
import useGetProgress from '@hooks/api/todosAPI/useGetProgress';
import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GoalBoxProps {
  goalId: number;
}

function GoalBox({ goalId }: GoalBoxProps) {
  const navigate = useNavigate();
  const { data: progressData } = useGetProgress(goalId);
  const { data: goalData } = useGetGoal(goalId);
  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const { mutate: patchGoalMutate } = usePatchGoal();
  const progress = progressData?.data.progress || 0;
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  useEffect(() => {
    if (goalData?.data.title) {
      setTitle(goalData.data.title);
    }
  }, [goalData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    patchGoalMutate(
      { goalId, title },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteGoalMutate(goalId, {
      onSuccess: () => {
        navigate(routes.dashboard);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <>
      {isDeletePopupVisible && (
        <Popup
          message="정말 삭제하시겠어요?"
          onCancel={() => setIsDeletePopupVisible(false)}
          onConfirm={handleDelete}
        />
      )}
      <div className="flex flex-col rounded-xl border-[1px] border-slate-100 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-[15px] bg-slate-800">
              <FlagIcon width={24} height={24} fill="white" />
            </div>
            {isEditing ? (
              <input
                className="rounded-md border border-slate-300 px-2 py-1 font-semibold leading-6 tablet:text-lg tablet:leading-7"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <div className="font-semibold leading-6 tablet:text-lg tablet:leading-7">
                {title}
              </div>
            )}
          </div>
          <Kebab
            onEdit={isEditing ? handleSave : handleEdit}
            onDelete={() => setIsDeletePopupVisible(true)}
          />
        </div>
        <div className="mt-6 text-xs font-semibold text-slate-900">
          Progress
        </div>
        <div className="mt-2 flex h-4 w-full items-center justify-between gap-2 bg-white">
          <div className="relative h-1 grow rounded-md bg-slate-50">
            <ProgressBar
              completed={progress}
              bgColor="#0F172A"
              isLabelVisible={false}
              baseBgColor="transparent"
              transitionDuration="500ms"
              height="100%"
            />
          </div>
          <div className="text-xs font-semibold leading-4 text-slate-900">
            {progress}%
          </div>
        </div>
      </div>
    </>
  );
}

export default GoalBox;
