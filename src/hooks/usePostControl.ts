import usePostGoal from '@hooks/api/goalsAPI/usePostGoal';
import useOutsideClick from '@hooks/useOutsideClick';
import { RefObject, useEffect, useState } from 'react';

const usePostControl = (inputRef: RefObject<HTMLInputElement>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const { mutate: postMutate, isPending } = usePostGoal();
  useOutsideClick(inputRef, () => setIsEditing(false));

  const handleAddGoalBtn = () => {
    setTimeout(() => setIsEditing(true), 0);
  };
  const handleAddPostGoal = () => {
    setIsEditing(false);
    postMutate(newGoal);
    setNewGoal('');
  };
  const handleGoalState = (v: string) => {
    setNewGoal(v);
  };

  useEffect(() => {
    if (isEditing && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return {
    handleAddGoalBtn,
    handleAddPostGoal,
    isEditing,
    newGoal,
    handleGoalState,
    isPending,
  };
};

export default usePostControl;
