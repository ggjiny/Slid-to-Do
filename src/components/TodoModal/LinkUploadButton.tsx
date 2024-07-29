import { ActiveWhite, Inactive } from '@assets';

interface LinkUploadButtonProps {
  linkUrl: string | null;
  setIsLinkModalVisible: (isVisible: boolean) => void;
}

function LinkUploadButton({
  linkUrl,
  setIsLinkModalVisible,
}: LinkUploadButtonProps) {
  return (
    <button
      type="button"
      className={`flex flex-col items-start justify-start gap-2.5 rounded-lg border ${
        linkUrl ? 'bg-slate-900' : 'bg-slate-100'
      } w-1/2 py-2 pl-2 pr-3`}
      onClick={!linkUrl ? () => setIsLinkModalVisible(true) : undefined}
    >
      <div className="flex items-center justify-center gap-0.5">
        <div className="relative h-6 w-6 pt-[3px]">
          {linkUrl ? (
            <ActiveWhite width={18} height={18} />
          ) : (
            <Inactive width={18} height={18} />
          )}
        </div>
        <div
          className={`text-base font-medium leading-normal ${linkUrl ? 'text-white' : 'text-slate-800'}`}
        >
          링크 첨부
        </div>
      </div>
    </button>
  );
}

export default LinkUploadButton;
