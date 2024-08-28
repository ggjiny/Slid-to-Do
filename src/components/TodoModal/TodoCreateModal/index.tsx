import { Goal } from '@/types/interface';
import { DeleteIcon } from '@assets';
import Button from '@components/Button';
import CreateGoalModal from '@components/CreateGoalModal';
import LinkModal from '@components/LinkModal';
import Popup from '@components/Popup';
import { showErrorToast } from '@components/Toast';
import usePostFile from '@hooks/api/filesAPI/usePostFile';
import usePostTodo from '@hooks/api/todosAPI/usePostTodo';
import useOutsideClick from '@hooks/useOutsideClick';
import useVisibility from '@hooks/useVisibility';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import FileLinkSection from '../FileLinkSection';
import GoalSection from '../GoalSection';
import TitleSection from '../TitleSection';

interface TodoCreateModalProps {
  onClose: () => void;
  initialGoal?: Goal;
}

function TodoCreateModal({ onClose, initialGoal }: TodoCreateModalProps) {
  const { isVisible: isOpen, handleClose } = useVisibility(onClose);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState<Goal | null>(initialGoal || null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState<string | null>(null);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [isUnsavedChangesPopupVisible, setIsUnsavedChangesPopupVisible] =
    useState(false);

  const { mutate: uploadFile } = usePostFile();
  const { mutate: addTodo } = usePostTodo(goal?.id);

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGoalChange = (selectedOption: Goal | null) => {
    setGoal(selectedOption);
  };

  const handleGoalModalOpen = () => {
    setIsGoalModalVisible(true);
  };

  const handleGoalCreate = (newGoal: Goal) => {
    setGoal(newGoal);
    setIsGoalModalVisible(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      const fileType = uploadedFile.type;
      const validFileTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/quicktime',
      ];

      if (!validFileTypes.includes(fileType)) {
        showErrorToast('이미지, PDF, 영상만 업로드 가능합니다.');
        return;
      }

      uploadFile(uploadedFile, {
        onSuccess: (response: AxiosResponse) => {
          const uploadedFileUrl = response.data.url;
          setFileUrl(uploadedFileUrl);
        },
      });
    }
  };

  const handleLinkModalOpen = () => {
    setIsLinkModalVisible(true);
  };

  const handleLinkChange = (newLink: string) => {
    setLinkUrl(newLink);
  };

  const handleFileDelete = () => {
    setFileUrl(null);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleLinkDelete = () => {
    setLinkUrl(null);
  };

  const handleSave = () => {
    addTodo({
      title,
      goalId: goal?.id || undefined,
      fileUrl: fileUrl || undefined,
      linkUrl: linkUrl || undefined,
    });
    handleClose();
  };

  const handleConfirmClose = () => {
    if (!isOpen) return;

    if (title || fileUrl || linkUrl) {
      setIsUnsavedChangesPopupVisible(true);
    } else {
      handleClose();
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => handleConfirmClose());

  const isTitleValid = title.length <= 30;
  const canSave = isTitleValid && title.length > 0;

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
              할 일 생성
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
            <TitleSection
              title={title}
              onTitleChange={handleTitleChange}
              isTitleValid={isTitleValid}
              inputRef={titleInputRef}
            />
            <GoalSection
              goal={goal}
              onGoalChange={handleGoalChange}
              onGoalModalOpen={handleGoalModalOpen}
            />
            <FileLinkSection
              fileUrl={fileUrl}
              linkUrl={linkUrl}
              onFileChange={handleFileChange}
              onFileDelete={handleFileDelete}
              onLinkDelete={handleLinkDelete}
              onLinkModalOpen={handleLinkModalOpen}
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
      {isGoalModalVisible && (
        <CreateGoalModal
          onClose={() => setIsGoalModalVisible(false)}
          onSave={(newGoal: Goal) => {
            handleGoalCreate(newGoal);
            setIsGoalModalVisible(false);
          }}
          fullscreen={false}
        />
      )}
      {isLinkModalVisible && (
        <LinkModal
          onCancel={() => setIsLinkModalVisible(false)}
          onConfirm={(link: string) => {
            handleLinkChange(link);
            setIsLinkModalVisible(false);
          }}
        />
      )}
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

export default TodoCreateModal;
