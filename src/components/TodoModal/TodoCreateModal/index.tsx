import { Goal } from '@/types/interface';
import { DeleteIcon, GrayDelete } from '@assets';
import Button from '@components/Button';
import LinkModal from '@components/LinkModal';
import Popup from '@components/Popup';
import { ChangeEvent, useState } from 'react';
import FilePreview from '../FilePreview';
import FileUploadButton from '../FileUploadButton';
import GoalSection from '../GoalSection';
import LinkCard from '../LinkCard';
import LinkUploadButton from '../LinkUploadButton';
import TitleSection from '../TitleSection';

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

interface TodoCreateModalProps {
  onClose: () => void;
  initialGoal?: Goal;
}

function TodoCreateModal({ onClose, initialGoal }: TodoCreateModalProps) {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState<Goal | null>(initialGoal || null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState<string | null>(null);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
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
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setFileUrl(url);
      setFile(uploadedFile);
    }
  };

  const handleLinkChange = (newLink: string) => {
    setLinkUrl(newLink);
  };

  const handleFileDelete = () => {
    setFileUrl(null);
    setFile(null);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleLinkDelete = () => {
    setLinkUrl(null);
  };

  const handleSave = () => {
    // POST
    onClose();
  };

  const handleConfirmClose = () => {
    if (title || goal || fileUrl || linkUrl) {
      setIsUnsavedChangesPopupVisible(true);
    } else {
      onClose();
    }
  };

  const isTitleValid = title.length <= 30;
  const canSave = isTitleValid && title.length > 0;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative flex h-full w-full flex-col gap-2.5 bg-white p-6 tablet:h-auto tablet:w-[520px] tablet:overflow-visible tablet:rounded-xl">
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
              {fileUrl && file && (
                <div className="relative mx-auto mt-2 flex h-[184px] w-full items-center justify-center rounded-[20px] bg-slate-200 p-6">
                  <FilePreview file={file} fileUrl={fileUrl} />
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
          onConfirm={onClose}
          onCancel={() => setIsUnsavedChangesPopupVisible(false)}
        />
      )}
    </>
  );
}

export default TodoCreateModal;
