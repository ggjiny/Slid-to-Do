import axiosInstance from './axiosInstance';

const postFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance({
    url: '/files',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export default postFile;
