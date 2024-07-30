interface FilePreviewProps {
  fileUrl: string;
  file: File;
}

function FilePreview({ fileUrl, file }: FilePreviewProps) {
  if (file.type === 'application/pdf') {
    return (
      <embed
        src={fileUrl}
        type="application/pdf"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '20px',
          objectFit: 'contain',
        }}
        aria-label="PDF Document"
      />
    );
  }

  if (file.type.startsWith('image/')) {
    return (
      <img
        src={fileUrl}
        alt="첨부파일"
        className="max-h-full max-w-full rounded-[20px] object-contain"
      />
    );
  }

  if (file.type === 'video/mp4' || file.type === 'video/quicktime') {
    return (
      <video
        src={fileUrl}
        controls
        className="max-h-full max-w-full rounded-[20px] object-contain"
      >
        <track kind="captions" />
      </video>
    );
  }

  return (
    <div className="max-h-full max-w-full rounded-[20px] text-center text-xs text-slate-400 tablet:text-base">
      미리보기가 지원되지 않는 파일 형식입니다.
      <br />
      {file.name}
    </div>
  );
}

export default FilePreview;
