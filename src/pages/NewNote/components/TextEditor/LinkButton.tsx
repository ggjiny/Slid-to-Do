import { LinkIcon } from '@assets';
import Tooltip from '@components/Tooltip';

interface LinkButtonProps {
  setIsLinkModalOpen: (isOpen: boolean) => void;
}

function LinkButton({ setIsLinkModalOpen }: LinkButtonProps) {
  const handleClickLinkIcon = () => {
    setIsLinkModalOpen(true);
  };

  return (
    <>
      <Tooltip text="링크 추가" position="top">
        <LinkIcon
          className="cursor-pointer fill-slate-200 stroke-slate-700"
          onClick={handleClickLinkIcon}
        />
      </Tooltip>
    </>
  );
}

export default LinkButton;
