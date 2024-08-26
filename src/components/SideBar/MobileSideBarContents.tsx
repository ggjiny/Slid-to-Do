import {
  FlagIcon,
  HomeIcon,
  PlusIcon,
  ProfileIcon,
  TextLogoIcon,
} from '@assets';
import Button from '@components/Button';
import routes from '@constants/routes';
import usePostGoal from '@hooks/api/goalsAPI/usePostGoal';
import useOutsideClick from '@hooks/useOutsideClick';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileSideBarContentsProps {
  userData: { name: string; email: string };
  goalData: { title: string; id: number }[];
  toggleSideBar: () => void;
  onShowTodoModal: () => void;
  onShowDeletePopup: (goalId: number) => void;
}

function MobileSideBarContents({
  userData,
  goalData,
  toggleSideBar,
  onShowTodoModal,
  onShowDeletePopup,
}: MobileSideBarContentsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  useOutsideClick(inputRef, () => setIsEditing(false));
  const { mutate: postMutate, isPending } = usePostGoal();

  const handleAddGoalBtn = () => {
    setTimeout(() => setIsEditing(true), 0);
  };

  const handleAddPostGoal = () => {
    setIsEditing(false);
    postMutate(newGoal);
    setNewGoal('');
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex-col">
      <TextLogoIcon
        className="cursor-pointer"
        onClick={() => {
          navigate(`${routes.dashboard}`);
          toggleSideBar();
        }}
      />
      <div className="mb-6 mt-4 flex flex-row justify-between">
        <div className="flex flex-row">
          <ProfileIcon width={32} height={32} />
          <div className="ml-3 flex flex-col items-start justify-between">
            <div className="h-4 text-xs font-semibold leading-5 text-slate-800">
              {userData.name}
            </div>
            <div className="h-4 text-xs font-medium leading-5 text-slate-600">
              {userData.email}
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              navigate(`${routes.signIn}`);
            }}
          >
            <span className="text-xs font-normal leading-4 text-slate-400">
              로그아웃
            </span>
          </button>
        </div>
      </div>

      <div className="absolute left-0 w-full border-b-[1px]" />

      <div className="my-3 mt-9 flex h-8 flex-row items-center justify-between">
        <div
          className="flex cursor-pointer flex-row"
          onClick={() => {
            navigate(`${routes.dashboard}`);
            toggleSideBar();
          }}
        >
          <HomeIcon width={24} height={24} />
          <div className="ml-2 text-lg font-medium text-slate-800">
            대시보드
          </div>
        </div>
        <Button shape="solid" size="xs" onClick={onShowTodoModal}>
          <PlusIcon width={16} height={16} className="stroke-white" />
          <span className="ml-0.5 text-sm font-semibold">새 할 일</span>
        </Button>
      </div>

      <div className="absolute left-0 w-full border-b-[1px]" />

      <div className="my-4 mt-8 flex h-8 flex-row items-center justify-between">
        <div className="flex flex-row">
          <FlagIcon width={24} height={24} fill="#1E293B" />
          <div className="ml-2 text-lg font-medium text-slate-800">목표</div>
        </div>
        <Button
          shape="outlined"
          size="xs"
          onClick={handleAddGoalBtn}
          disabled={isEditing}
        >
          <PlusIcon
            width={16}
            height={16}
            className={` ${isEditing ? 'stroke-slate-400' : 'stroke-blue-500'}`}
          />
          <span className="ml-0.5 text-sm font-semibold">새 목표</span>
        </Button>
      </div>
      <ul>
        {isEditing && (
          <li className="flex items-center p-2 text-sm font-medium text-slate-700">
            <span>•</span>
            <input
              ref={inputRef}
              className="ml-1 h-8 w-max flex-grow rounded-md border border-gray-300 p-2 text-sm"
              placeholder="새 목표를 입력해주세요"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddPostGoal();
                }
              }}
            />

            <Button
              shape="solid"
              size="xs"
              onClick={handleAddPostGoal}
              additionalClass="w-6 h-6 ml-2"
            >
              <PlusIcon width={16} height={16} className="stroke-white" />
            </Button>
          </li>
        )}
        {isPending && (
          <li className="p-2 text-sm font-medium text-slate-700">
            • {newGoal}
          </li>
        )}
        {goalData.map((item) => (
          <div
            onClick={() => {
              navigate(`${routes.goalDetail}/${item.id}`);
              toggleSideBar();
            }}
            key={item.id}
          >
            <li className="flex cursor-pointer flex-row justify-between p-2 text-sm font-medium text-slate-700">
              <div>• {item.title}</div>
              <PlusIcon
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
    </div>
  );
}

export default MobileSideBarContents;
