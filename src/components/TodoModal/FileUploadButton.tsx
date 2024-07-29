import { ActiveWhite, Inactive } from '@assets';
import { ChangeEvent } from 'react';

interface FileUploadButtonProps {
  fileUrl: string | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileUploadButton({
  fileUrl,
  handleFileChange,
}: FileUploadButtonProps) {
  return (
    <button
      type="button"
      className={`flex flex-col items-start justify-start gap-2.5 rounded-lg border ${
        fileUrl ? 'bg-slate-900' : 'bg-slate-100'
      } w-1/2 py-2 pl-2 pr-3`}
      onClick={
        !fileUrl
          ? () => document.getElementById('fileInput')?.click()
          : undefined
      }
    >
      <div className="flex items-center justify-center gap-0.5">
        <div className="relative h-6 w-6 pt-[3px]">
          {fileUrl ? (
            <ActiveWhite width={18} height={18} />
          ) : (
            <Inactive width={18} height={18} />
          )}
        </div>
        <div
          className={`text-base font-medium leading-normal ${fileUrl ? 'text-white' : 'text-slate-800'}`}
        >
          파일 첨부
        </div>
      </div>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />
    </button>
  );
}

export default FileUploadButton;
