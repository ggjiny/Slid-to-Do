import { PlusIcon } from '@assets';
import { useState } from 'react';
import TodoListModal from './TodoListModal';

interface NewNoteButtonProps {
  goalId: number;
}

function NewNoteButton({ goalId }: NewNoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="text-md esktop:text-lg mb-4 flex items-center gap-1 pt-6 font-semibold text-blue-500"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon width={24} height={24} className="stroke-blue-500" />
        노트 작성
      </button>
      {isOpen && <TodoListModal goalId={goalId} onClose={handleCloseModal} />}
    </>
  );
}

export default NewNoteButton;
