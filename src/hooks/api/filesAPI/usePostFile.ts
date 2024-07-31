import postFile from '@/api/filesAPI';
import { showToast } from '@components/Toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

function usePostFile(onSuccess?: (data: AxiosResponse) => void) {
  return useMutation({
    mutationFn: (file: File) => postFile(file),

    onSuccess: (data) => {
      showToast('파일 업로드 완료');
      if (onSuccess) onSuccess(data);
    },
  });
}

export default usePostFile;
