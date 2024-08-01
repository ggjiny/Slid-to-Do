import { LinkIcon } from '@assets';
import LinkModal from '@components/LinkModal';
import { useState } from 'react';

function LinkButton() {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const handleClickLinkIcon = () => {
    setIsLinkModalOpen(true);
  };

  const handleUploadLink = () => {
    // 링크 업로드 로직
  };

  return (
    <>
      <LinkIcon
        className="cursor-pointer fill-slate-200 stroke-slate-700"
        onClick={handleClickLinkIcon}
      />
      {isLinkModalOpen && (
        <LinkModal
          onConfirm={handleUploadLink}
          onCancel={() => setIsLinkModalOpen(false)}
          fullscreen
        />
      )}
    </>
  );
}

export default LinkButton;
