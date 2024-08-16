import { CircleDeleteIcon } from '@assets';
import { ChangeEvent } from 'react';
import FilePreview from './FilePreview';
import FileUploadButton from './FileUploadButton';
import LinkCard from './LinkCard';
import LinkUploadButton from './LinkUploadButton';

interface FileLinkSectionProps {
  fileUrl: string | null;
  linkUrl: string | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: () => void;
  onLinkDelete: () => void;
  setIsLinkModalVisible: (visible: boolean) => void;
}

function FileLinkSection({
  fileUrl,
  linkUrl,
  onFileChange,
  onFileDelete,
  onLinkDelete,
  setIsLinkModalVisible,
}: FileLinkSectionProps) {
  return (
    <div
      className="flex flex-col items-start justify-start gap-3 self-stretch"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-base font-semibold leading-normal text-slate-800">
        파일 및 링크
      </div>
      <div className="flex items-start justify-start gap-3">
        <FileUploadButton fileUrl={fileUrl} onFileChange={onFileChange} />
        <LinkUploadButton
          linkUrl={linkUrl}
          setIsLinkModalVisible={setIsLinkModalVisible}
        />
      </div>
      {fileUrl && (
        <div className="relative mx-auto mt-2 flex h-[184px] w-full items-center justify-center rounded-[20px] bg-slate-200 p-6">
          <FilePreview fileUrl={fileUrl} />
          <button
            type="button"
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-slate-200"
            onClick={onFileDelete}
            aria-label="File Delete"
          >
            <CircleDeleteIcon
              width={18}
              height={18}
              className="fill-slate-500"
            />
          </button>
        </div>
      )}
      {linkUrl && <LinkCard linkUrl={linkUrl} onLinkDelete={onLinkDelete} />}
    </div>
  );
}

export default FileLinkSection;
