import authAPI from '@app/api/authAPI';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface LoginData {
  email: string;
  password: string;
}

function useLogin(
  onSuccess: (res: AxiosResponse) => void,
  onError: (err: Error) => void,
) {
  return useMutation({
    mutationFn: (loginData: LoginData) => authAPI.login(loginData),
    onSuccess: (res) => onSuccess(res),
    onError: (err) => onError(err),
  });
}

export default useLogin;
