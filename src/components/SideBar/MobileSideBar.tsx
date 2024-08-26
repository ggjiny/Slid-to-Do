import { FoldIcon, HamburgerIcon } from '@assets';
import Popup from '@components/Popup';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import useDeleteGoal from '@hooks/api/goalsAPI/useDeleteGoal';
import { useState } from 'react';
import MobileSideBarContents from './MobileSideBarContents';

interface MobileSideBarProps {
  isOpen: boolean;
  toggleSideBar: () => void;
  userData: { name: string; email: string };
  goalData: { title: string; id: number }[];
}

function MobileSideBar({
  isOpen,
  toggleSideBar,
  userData,
  goalData,
}: MobileSideBarProps) {
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
  return (
    <>
      <div className="h-12 w-full bg-white">
        <button
          type="button"
          aria-label="hamburger button"
          onClick={toggleSideBar}
          className="ml-4 mt-3"
        >
          <HamburgerIcon />
        </button>
      </div>
      <div
        // 프리티어 설정이랑 린트 설정이랑 안맞는지 scrollbar-hide 위치때문에 린트 에러가 나서 주석처리 했습니다.
        // eslint-disable-next-line
        className={`fixed left-0 top-0 z-50 h-dvh w-full overflow-y-scroll px-6 py-4 scrollbar-hide ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white transition-transform duration-300 ease-in-out`}
      >
        <button
          type="button"
          aria-label="expend button"
          onClick={toggleSideBar}
          className="fixed right-6 top-5"
        >
          <FoldIcon />
        </button>
        {isOpen && (
          <MobileSideBarContents
            userData={userData}
            goalData={goalData}
            toggleSideBar={toggleSideBar}
            onShowTodoModal={onShowTodoModal}
            onShowDeletePopup={onShowDeletePopup}
          />
        )}
      </div>
      {showTodoModal && (
        <TodoCreateModal
          onClose={() => {
            setShowTodoModal(false);
            toggleSideBar();
          }}
        />
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

export default MobileSideBar;
