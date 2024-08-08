import getFileType from '@utils/getFileType';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface FilePreviewProps {
  fileUrl: string;
}

function FilePreview({ fileUrl }: FilePreviewProps) {
  const fileType = getFileType(fileUrl);

  if (fileType === 'pdf') {
    return (
      <Document
        file={`https://corsproxy.io/?${fileUrl}`} // 나중에 도메인 연결하면 CORS 수정 요청 드릴 생각입니다
        loading="PDF 미리보기 로딩 중..."
      >
        <Page
          pageNumber={1}
          height={160}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    );
  }

  if (fileType === 'image') {
    return (
      <img
        src={fileUrl}
        alt="첨부파일"
        className="max-h-full max-w-full rounded-[20px] object-contain"
      />
    );
  }

  if (fileType === 'video') {
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

  return null;
}

export default FilePreview;
