import axiosInstance from './axiosInstance';

const postFile = async (file: File) => {
  const response = await axiosInstance({
    url: '/files',
    method: 'post',
    data: file,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export default postFile;
