import authAPI from '@app/api/authAPI';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

function useGetTokens(
  onSuccess: (res: AxiosResponse) => void,
  onError: (err: Error) => void,
) {
  return useMutation({
    mutationFn: (refreshToken: string) => authAPI.getTokens(refreshToken),
    onSuccess: (res) => onSuccess(res),
    onError: (err) => onError(err),
  });
}

export default useGetTokens;
