import { FoldIcon, LogoIcon } from '@assets';
import Popup from '@components/Popup';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import { useNavigate } from 'react-router-dom';
import useModalControl from '../../hooks/useModalControl';
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
  const {
    showTodoModal,
    isDeletePopupVisible,
    handleShowTodoModal,
    handleShowDeletePopup,
    handleDelete,
    handleCloseTodoModal,
    handleCloseDeletePopup,
  } = useModalControl();
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
            aria-label="expand button"
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
            onShowTodoModal={handleShowTodoModal}
            onShowDeletePopup={handleShowDeletePopup}
            width={width}
          />
        )}
      </div>
      {showTodoModal && <TodoCreateModal onClose={handleCloseTodoModal} />}
      {isDeletePopupVisible && (
        <Popup
          message="정말 삭제하시겠어요?"
          onCancel={handleCloseDeletePopup}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default DesktopSideBar;
