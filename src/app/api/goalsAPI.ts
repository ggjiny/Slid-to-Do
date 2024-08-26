import axiosInstance from './axiosInstance';

const getGoals = async (cursor?: number, size = 20, sortOrder = 'oldest') => {
  const response = await axiosInstance({
    url: '/goals',
    method: 'get',
    params: { cursor, size, sortOrder },
  });
  return response;
};

const postGoal = async (title: string) => {
  const response = await axiosInstance({
    url: '/goals',
    method: 'post',
    data: { title },
  });
  return response;
};

const getGoal = async (goalId: number) => {
  const response = await axiosInstance({
    url: `/goals/${goalId}`,
    method: 'get',
  });
  return response;
};

const patchGoal = async (goalId: number, title: string) => {
  const response = await axiosInstance({
    url: `/goals/${goalId}`,
    method: 'patch',
    data: { title },
  });
  return response;
};

const deleteGoal = async (goalId: number) => {
  const response = await axiosInstance({
    url: `/goals/${goalId}`,
    method: 'delete',
  });
  return response;
};

export default { getGoals, postGoal, getGoal, patchGoal, deleteGoal };
