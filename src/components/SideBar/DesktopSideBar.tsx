import { FoldIcon, LogoIcon } from '@assets';
import Popup from '@components/Popup';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import useDeleteGoal from '@hooks/api/goalsAPI/useDeleteGoal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSideBarContents from './DesktopSideBarContents';

interface SideBarProps {
  isOpen: boolean;
  width: number;
  toggleSideBar: () => void;
  userData: {
    name: string;
    email: string;
  };
  goalData: {
    title: string;
    id: number;
  }[];
}

function DesktopSideBar({
  isOpen,
  width,
  toggleSideBar,
  userData,
  goalData,
}: SideBarProps) {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [goalId, setGoalId] = useState<number>(0);
  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const onShowTodoModal = () => setShowTodoModal(true);
  const onShowDeletePopup = (id: number) => {
    setIsDeletePopupVisible(true);
    setGoalId(id);
  };
  const handleDelete = () => {
    deleteGoalMutate(goalId, {
      onSuccess: () => {
        setIsDeletePopupVisible(false);
        setGoalId(0);
      },
    });
  };
  const navigate = useNavigate();
  return (
    <>
      {isOpen && width < 1920 && (
        <div
          className="fixed left-0 top-0 z-40 h-dvh w-dvw bg-black opacity-50"
          onClick={toggleSideBar}
        />
      )}
      <div
        className={`fixed left-0 top-0 z-50 h-dvh w-[280px] overflow-y-scroll px-6 py-4 scrollbar-hide ${isOpen ? 'translate-x-0' : '-translate-x-[220px]'} border-r-[1px] bg-white transition-transform duration-300 ease-in-out`}
      >
        <div
          className={`fixed ${isOpen ? 'right-6' : 'right-[18px]'} top-5 h-5 w-6`}
        >
          {!isOpen && (
            <LogoIcon
              width={23}
              height={23}
              className="mb-4 cursor-pointer"
              onClick={() => {
                navigate('/dashboard');
              }}
            />
          )}
          <button
            type="button"
            aria-label="expend button"
            onClick={toggleSideBar}
          >
            <FoldIcon className={`${isOpen ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
        {isOpen && (
          <DesktopSideBarContents
            userData={userData}
            goalData={goalData}
            toggleSideBar={toggleSideBar}
            onShowTodoModal={onShowTodoModal}
            onShowDeletePopup={onShowDeletePopup}
            width={width}
          />
        )}
      </div>
      {showTodoModal && (
        <TodoCreateModal onClose={() => setShowTodoModal(false)} />
      )}
      {isDeletePopupVisible && (
        <Popup
          message="정말 삭제하시겠어요?"
          onCancel={() => setIsDeletePopupVisible(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default DesktopSideBar;
