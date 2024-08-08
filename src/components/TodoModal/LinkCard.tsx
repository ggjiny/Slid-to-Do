import { GrayDelete } from '@assets';

interface LinkCardProps {
  linkUrl: string;
  onLinkDelete: () => void;
}

function LinkCard({ linkUrl, onLinkDelete }: LinkCardProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex h-8 w-1/2 flex-col items-start justify-start gap-2.5 rounded-[20px] bg-slate-200 py-1 pl-4 pr-1.5"
    >
      <div className="inline-flex items-start justify-between self-stretch">
        <div className="flex w-[90%] items-start justify-start gap-2 truncate">
          <div className="truncate text-base font-normal leading-normal text-slate-800">
            {linkUrl}
          </div>
        </div>
        <button
          type="button"
          className="relative h-6 w-6"
          onClick={(e) => {
            e.preventDefault();
            onLinkDelete();
          }}
          aria-label="Link Delete"
        >
          <GrayDelete width={18} height={18} />
        </button>
      </div>
    </a>
  );
}

export default LinkCard;
