import routes from '@constants/routes';
import useDeleteGoal from '@hooks/api/goalsAPI/useDeleteGoal';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useModalControl = () => {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [goalId, setGoalId] = useState<number>(0);
  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const handleShowTodoModal = () => setShowTodoModal(true);
  const handleShowDeletePopup = (id: number) => {
    setIsDeletePopupVisible(true);
    setGoalId(id);
  };
  const handleCloseTodoModal = () => setShowTodoModal(false);
  const handleCloseDeletePopup = () => setIsDeletePopupVisible(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleDelete = () => {
    deleteGoalMutate(goalId, {
      onSuccess: () => {
        setIsDeletePopupVisible(false);
        if (
          location.pathname === `${routes.goalDetail}/${goalId}` ||
          location.pathname === `${routes.notes}/${goalId}` ||
          location.pathname === `${routes.newNote}/${goalId}`
        ) {
          navigate(`${routes.dashboard}`);
        }
        setGoalId(0);
      },
    });
  };

  return {
    showTodoModal,
    isDeletePopupVisible,
    handleShowTodoModal,
    handleShowDeletePopup,
    handleDelete,
    handleCloseTodoModal,
    handleCloseDeletePopup,
  };
};

export default useModalControl;
