const getFileType = (fileUrl: string) => {
  const extension = fileUrl.split('.').pop()?.toLowerCase();
  if (!extension) return 'unknown';

  if (extension === 'pdf') return 'pdf';
  if (['jpeg', 'jpg', 'png', 'gif'].includes(extension)) return 'image';
  if (['mp4', 'avi'].includes(extension)) return 'video';

  return 'unknown';
};

export default getFileType;
