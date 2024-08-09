import { CircleDeleteIcon, EmbedIcon } from '@assets';

interface LinkDisplayProps {
  link: string;
  onClickEmbed: () => void;
  onDelete: () => void;
}

function LinkDisplay({ link, onClickEmbed, onDelete }: LinkDisplayProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between rounded-[20px] bg-slate-200 px-[6px] py-1">
      <div className="flex min-w-0 items-center gap-2">
        <EmbedIcon
          className="flex-shrink-0 cursor-pointer"
          onClick={onClickEmbed}
        />
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
