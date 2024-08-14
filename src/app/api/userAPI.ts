import authInstance from './authInstance';
import axiosInstance from './axiosInstance';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const register = async (registerData: RegisterData) => {
  const response = await authInstance({
    url: '/user',
    method: 'post',
    data: registerData,
  });
  return response;
};

const getUser = async () => {
  const response = await axiosInstance({
    url: '/user',
    method: 'get',
  });
  return response;
};
export default { register, getUser };
