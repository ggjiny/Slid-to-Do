import { showErrorToast } from '@components/Toast';
import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorResponse {
  message: string;
}

const useApiError = () => {
  const navigate = useNavigate();
  const handleError = useCallback(
    (error: Error) => {
      if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
        navigate('/sign-in');
        showErrorToast('로그인이 필요합니다.');
        return;
      }
      if (axios.isAxiosError(error) && error.code === 'ERR_BAD_RESPONSE') {
        showErrorToast('서버 에러가 발생했습니다.');
        return;
      }
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data as ErrorResponse;

        if (message) {
          if (message === 'Unauthorized') {
            showErrorToast('로그인이 필요합니다.');
            navigate('/sign-in');
          } else {
            showErrorToast(message);
          }
          return;
        }
      }

      showErrorToast('알 수 없는 에러가 발생했습니다.');
    },
    [navigate],
  );

  return { handleError };
};

export default useApiError;
