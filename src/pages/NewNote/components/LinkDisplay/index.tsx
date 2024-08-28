import { CircleDeleteIcon, EmbedIcon } from '@assets';
import Tooltip from '@components/Tooltip';

interface LinkDisplayProps {
  link: string;
  onClickEmbed: () => void;
  onDelete: () => void;
}

function LinkDisplay({ link, onClickEmbed, onDelete }: LinkDisplayProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between rounded-[20px] bg-slate-200 px-[6px] py-1">
      <div className="flex min-w-0 items-center gap-2">
        <Tooltip text="링크 미리보기" position="bottom right">
          <EmbedIcon
            className="flex-shrink-0 cursor-pointer"
            onClick={onClickEmbed}
          />
        </Tooltip>
        <span className="truncate text-slate-800">{link}</span>
      </div>
      <CircleDeleteIcon
        className="ml-2 flex-shrink-0 cursor-pointer fill-slate-500"
        onClick={onDelete}
      />
    </div>
  );
}

export default LinkDisplay;
