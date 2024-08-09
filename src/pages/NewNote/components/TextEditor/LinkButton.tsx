import { LinkIcon } from '@assets';
import LinkModal from '@components/LinkModal';
import { useState } from 'react';

interface LinkButtonProps {
  onChangeLink: (link: string) => void;
}

function LinkButton({ onChangeLink }: LinkButtonProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const handleClickLinkIcon = () => {
    setIsLinkModalOpen(true);
  };

  return (
    <>
      <LinkIcon
        className="cursor-pointer fill-slate-200 stroke-slate-700"
        onClick={handleClickLinkIcon}
      />
      {isLinkModalOpen && (
        <LinkModal
          onConfirm={(link: string) => {
            onChangeLink(link);
            setIsLinkModalOpen(false);
          }}
          onCancel={() => setIsLinkModalOpen(false)}
          fullscreen
        />
      )}
    </>
  );
}

export default LinkButton;
