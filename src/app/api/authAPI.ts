import authInstance from './authInstance';

interface LoginData {
  email: string;
  password: string;
}

const login = async (loginData: LoginData) => {
  const response = await authInstance({
    url: '/auth/login',
    method: 'post',
    data: loginData,
  });
  return response;
};

const getTokens = async (refreshToken: string) => {
  const response = await authInstance({
    url: '/auth/tokens',
    method: 'post',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response;
};

export default { login, getTokens };
