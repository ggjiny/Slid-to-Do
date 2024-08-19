import Button from '@components/Button';

interface HeaderProps {
  title: string;
  isEditing: boolean;
  isSubmitEnabled: boolean;
  onClickDraftButton: () => void;
  onClickSaveButton: () => void;
}

function Header({
  title,
  isEditing,
  isSubmitEnabled,
  onClickDraftButton,
  onClickSaveButton,
}: HeaderProps) {
  return (
    <div className="mb-4 mt-[17px] flex items-center justify-between tablet:mt-6">
      <h1 className="text-lg font-semibold leading-7 text-slate-900">
        노트 작성
        <span className="ml-4 text-blue-400">{title}</span>
      </h1>
      <div className="flex gap-2">
        <Button
          shape="outlined"
          size="xs"
          additionalClass="border-none tablet:w-[96px] tablet:h-[44px]"
          onClick={onClickDraftButton}
        >
          임시 저장
        </Button>
        <Button
          shape="solid"
          size="xs"
          additionalClass="border-none tablet:w-[96px] tablet:h-[44px]"
          disabled={!isSubmitEnabled}
          onClick={onClickSaveButton}
        >
          {isEditing ? '수정 완료' : '작성 완료'}
        </Button>
      </div>
    </div>
  );
}

export default Header;
