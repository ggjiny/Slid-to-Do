import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import authAPI from './authAPI';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const unauthorizedResponse: AxiosResponse = {
  data: { message: 'Unauthorized' },
  status: 401,
  statusText: 'Unauthorized',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  } as InternalAxiosRequestConfig,
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    const token = localStorage.getItem('accessToken');

    if (token) {
      newConfig.headers = newConfig.headers || {};
      (newConfig.headers as AxiosRequestHeaders).Authorization =
        `Bearer ${token}`;
    } else {
      const source = axios.CancelToken.source();
      newConfig.cancelToken = source.token;
      source.cancel(
        JSON.stringify({
          response: unauthorizedResponse,
        }),
      );
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const refreshToken = localStorage.getItem('refreshToken');
    const originalRequest = error.config as AxiosRequestConfig;
    if (refreshToken) {
      return authAPI
        .getTokens(refreshToken)
        .then(async (res) => {
          // 실패한 호출 재실행
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          const retry = await axiosInstance(originalRequest);
          return retry;
        })
        .catch(() => Promise.reject(error));
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
