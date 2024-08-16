import { LinkIcon } from '@assets';

interface LinkButtonProps {
  setIsLinkModalOpen: (isOpen: boolean) => void;
}

function LinkButton({ setIsLinkModalOpen }: LinkButtonProps) {
  const handleClickLinkIcon = () => {
    setIsLinkModalOpen(true);
  };

  return (
    <>
      <LinkIcon
        className="cursor-pointer fill-slate-200 stroke-slate-700"
        onClick={handleClickLinkIcon}
      />
    </>
  );
}

export default LinkButton;
