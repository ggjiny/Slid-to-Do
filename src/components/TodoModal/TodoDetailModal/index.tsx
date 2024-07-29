import { Goal, Todo } from '@/types/interface';
import { DeleteIcon, GrayDelete } from '@assets';
import LinkModal from '@components/LinkModal';
import Popup from '@components/Popup';
import { ChangeEvent, useState } from 'react';
import FilePreview from '../FilePreview';
import FileUploadButton from '../FileUploadButton';
import GoalSection from '../GoalSection';
import LinkCard from '../LinkCard';
import LinkUploadButton from '../LinkUploadButton';
import StatusSection from '../StatusSection';
import TitleSection from '../TitleSection';
import useTodoDetail from './useTodoDetail';

const mockGoals: Goal[] = [
  {
    id: 1,
    title: 'Goal 1',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Goal 2',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 3,
    title: 'Goal 3',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 4,
    title: 'Goal 4',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 5,
    title: 'Goal 5',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

export interface TodoDetailModalProps {
  todo: Todo;
  onClose: () => void;
}

function TodoDetailModal({ todo, onClose }: TodoDetailModalProps) {
  const {
    done,
    title,
    goal,
    fileUrl,
    fileType,
    fileName,
    linkUrl,
    isModified,
    setDone,
    setTitle,
    setGoal,
    setFileUrl,
    setFileType,
    setFileName,
    setLinkUrl,
  } = useTodoDetail(todo);

  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isUnsavedChangesPopupVisible, setIsUnsavedChangesPopupVisible] =
    useState(false);

  const [goals, setGoals] = useState<Goal[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGoalChange = (
    selectedOption: { id: number; title: string } | null,
  ) => {
    if (selectedOption) {
      const option = goals.find((g) => g.id === selectedOption.id);
      setGoal(option || null);
    } else {
      setGoal(null);
    }
  };

  const handleDropdownToggle = () => {
    if (!isDropdownOpen) {
      // GET
      setGoals(mockGoals);
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // POST
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileType(file.type);
      setFileName(file.name);
    }
  };

  const handleLinkChange = (newLink: string) => {
    setLinkUrl(newLink);
  };

  const handleFileDelete = () => {
    setFileUrl(null);
    setFileType(null);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleLinkDelete = () => {
    setLinkUrl(null);
  };

  const handleSave = () => {
    // PATCH
    onClose();
  };

  const handleDelete = () => {
    // DELETE
    onClose();
  };

  const toggleDone = () => {
    setDone(!done);
  };

  const handleConfirmClose = () => {
    if (isModified) {
      setIsUnsavedChangesPopupVisible(true);
    } else {
      onClose();
    }
  };

  const isTitleValid = title.length <= 30;
  const canSave = isModified && isTitleValid && title.length > 0;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative flex h-full w-full flex-col gap-2.5 bg-white p-6 tablet:h-auto tablet:w-[520px] tablet:overflow-visible tablet:rounded-xl">
          <div className="fixed left-0 right-0 top-0 z-10 flex w-full items-center justify-between bg-white p-6 tablet:static tablet:p-0">
            <div className="text-lg font-bold leading-7 text-slate-800">
              할 일
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

          <div className="mt-6 flex grow flex-col items-center justify-start gap-y-6 overflow-auto pb-20 pt-6 tablet:mt-0 tablet:justify-between tablet:overflow-visible tablet:pb-0 tablet:pt-0">
            <StatusSection done={done} toggleDone={toggleDone} />
            <TitleSection
              title={title}
              onTitleChange={handleTitleChange}
              isTitleValid={isTitleValid}
            />
            <GoalSection
              goals={goals}
              goal={goal}
              onGoalChange={handleGoalChange}
              isDropdownOpen={isDropdownOpen}
              handleDropdownToggle={handleDropdownToggle}
            />
            <div className="flex flex-col items-start justify-start gap-3 self-stretch">
              <div className="text-base font-semibold leading-normal text-slate-800">
                파일 및 링크
              </div>
              <div className="flex items-start justify-start gap-3">
                <FileUploadButton
                  fileUrl={fileUrl}
                  handleFileChange={handleFileChange}
                />
                <LinkUploadButton
                  linkUrl={linkUrl}
                  setIsLinkModalVisible={setIsLinkModalVisible}
                />
              </div>
              {fileUrl !== null && fileType && (
                <div className="relative mx-auto mt-2 flex h-[184px] w-full items-center justify-center rounded-[20px] bg-slate-200 p-6">
                  <FilePreview
                    fileType={fileType}
                    fileUrl={fileUrl}
                    fileName={fileName}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-slate-200"
                    onClick={handleFileDelete}
                    aria-label="File Delete"
                  >
                    <GrayDelete width={18} height={18} />
                  </button>
                </div>
              )}
              {linkUrl && (
                <LinkCard
                  linkUrl={linkUrl}
                  handleLinkDelete={handleLinkDelete}
                />
              )}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full justify-center gap-x-2 bg-white px-6 py-3 tablet:static tablet:mt-8 tablet:p-0">
            <button
              type="button"
              className="flex-grow rounded-xl border border-blue-500 bg-white px-6 py-3 text-base font-semibold leading-normal text-blue-500"
              onClick={() => setIsDeletePopupVisible(true)}
            >
              삭제
            </button>
            <button
              type="button"
              className={`flex-grow rounded-xl px-6 py-3 text-base font-semibold leading-normal text-white ${canSave ? 'bg-blue-500' : 'bg-slate-400'}`}
              disabled={!canSave}
              onClick={handleSave}
            >
              수정
            </button>
          </div>
        </div>
      </div>
      {isLinkModalVisible && (
        <LinkModal
          onCancel={() => setIsLinkModalVisible(false)}
          onConfirm={(link: string) => {
            handleLinkChange(link);
            setIsLinkModalVisible(false);
          }}
        />
      )}
      {isDeletePopupVisible && (
        <Popup
          message="삭제하시겠습니까?"
          confirmMessage="삭제"
          onConfirm={handleDelete}
          onCancel={() => setIsDeletePopupVisible(false)}
        />
      )}
      {isUnsavedChangesPopupVisible && (
        <Popup
          message={`정말 나가시겠어요?\n변경사항이 저장되지 않습니다.`}
          confirmMessage="저장안함"
          onConfirm={onClose}
          onCancel={() => setIsUnsavedChangesPopupVisible(false)}
        />
      )}
    </>
  );
}

export default TodoDetailModal;
