import Button from '@components/Button';

interface HeaderProps {
  isSubmitEnabled: boolean;
  onDraftSave: () => void;
}

function Header({ isSubmitEnabled, onDraftSave }: HeaderProps) {
  return (
    <div className="mb-4 mt-[17px] flex items-center justify-between tablet:mt-6">
      <h1 className="text-lg font-semibold leading-7 text-slate-900">
        노트 작성
      </h1>
      <div className="flex gap-2">
        <Button
          shape="outlined"
          size="xs"
          additionalClass="border-none tablet:w-[96px] tablet:h-[44px]"
          onClick={onDraftSave}
        >
          임시 저장
        </Button>
        <Button
          shape="solid"
          size="xs"
          additionalClass="border-none tablet:w-[96px] tablet:h-[44px]"
          disabled={!isSubmitEnabled}
        >
          작성 완료
        </Button>
      </div>
    </div>
  );
}

export default Header;
