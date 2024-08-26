import { DeleteIcon } from '@assets';
import Button from '@components/Button';
import Popup from '@components/Popup';
import usePostGoal from '@hooks/api/goalsAPI/usePostGoal';
import useOutsideClick from '@hooks/useOutsideClick';
import useVisibility from '@hooks/useVisibility';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import GoalTitleSection from './GoalTitleSection';

interface CreateGoalModalProps {
  onClose: () => void;
}

function CreateGoalModal({ onClose }: CreateGoalModalProps) {
  const { isVisible: isOpen, handleClose } = useVisibility(onClose);
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUnsavedChangesPopupVisible, setIsUnsavedChangesPopupVisible] =
    useState(false);

  const { mutate: createGoal } = usePostGoal();

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    if (isSaving) return;

    setIsSaving(true);
    createGoal(title);
    handleClose();
    setTimeout(() => {
      setIsSaving(false);
    }, 300);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSave();
    }
  };

  const handleConfirmClose = () => {
    if (!isOpen) return;

    if (title) {
      setIsUnsavedChangesPopupVisible(true);
    } else {
      handleClose();
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => handleConfirmClose());

  const canSave = title.length > 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          ref={modalRef}
          className={`relative flex h-full w-full transform flex-col gap-2.5 bg-white p-6 transition-transform duration-300 tablet:h-auto tablet:w-[520px] tablet:overflow-visible tablet:rounded-xl ${isOpen ? 'translate-y-0' : '-translate-y-10'}`}
        >
          <div className="fixed left-0 right-0 top-0 z-10 flex w-full items-center justify-between bg-white p-6 tablet:static tablet:p-0">
            <div className="text-lg font-bold leading-7 text-slate-800">
              새 목표 추가
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center justify-center"
                onClick={handleConfirmClose}
                aria-label="Close"
              >
                <DeleteIcon width={24} height={24} />
              </button>
            </div>
          </div>
          <div className="mt-6 flex grow flex-col items-center justify-start gap-y-6 overflow-auto pb-20 pt-6 tablet:mt-0 tablet:justify-between tablet:overflow-visible tablet:py-0">
            <GoalTitleSection
              title={title}
              onTitleChange={handleTitleChange}
              inputRef={titleInputRef}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full justify-center gap-x-2 bg-white px-6 py-3 tablet:static tablet:mt-8 tablet:p-0">
            <Button
              shape="solid"
              size="lg"
              onClick={handleSave}
              additionalClass="flex-grow px-6 py-3 text-base leading-normal"
              disabled={!canSave}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
      {isUnsavedChangesPopupVisible && (
        <Popup
          message={`정말 나가시겠어요?\n저장되지 않습니다.`}
          confirmMessage="저장안함"
          onConfirm={handleClose}
          onCancel={() => setIsUnsavedChangesPopupVisible(false)}
        />
      )}
    </>
  );
}

export default CreateGoalModal;
