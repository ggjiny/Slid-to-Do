import { Goal } from '@/types/interface';
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
  onSave?: (newGoal: Goal) => void;
  fullscreen?: boolean;
}

function CreateGoalModal({
  onClose,
  onSave,
  fullscreen = true,
}: CreateGoalModalProps) {
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

    createGoal(title, {
      onSuccess: (response) => {
        const { title: newTitle, id: newId } = response.data;
        if (onSave) {
          onSave({ title: newTitle, id: newId });
        }
      },
    });

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

    if (title && fullscreen) {
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
        onClick={(e) => {
          if (!fullscreen) {
            e.stopPropagation();
          }
        }}
      >
        <div
          ref={modalRef}
          className={`flex h-auto flex-col items-start justify-start gap-2.5 rounded-xl bg-white p-6 transition-transform duration-300 ${
            fullscreen
              ? 'tablet:w-[520px] tablet:overflow-auto'
              : 'tablet:w-[450px]'
          } w-[311px] transform ${isOpen ? 'translate-y-0' : '-translate-y-10'}`}
        >
          <div className="flex flex-col items-start justify-start gap-6 self-stretch">
            <div className="inline-flex w-full items-center justify-between gap-4">
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
            <GoalTitleSection
              title={title}
              onTitleChange={handleTitleChange}
              inputRef={titleInputRef}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="invisible flex-grow">grow</div>
          <Button
            shape="solid"
            size="lg"
            onClick={handleSave}
            additionalClass="inline-flex self-stretch py-3 w-full"
            disabled={!canSave}
          >
            확인
          </Button>
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
