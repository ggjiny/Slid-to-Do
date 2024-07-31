import axiosInstance from './axiosInstance';

export interface Todo {
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  fileUrl: string | null;
  title: string;
  id: number;
  goal: {
    id: number;
    title: string;
  } | null;
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export interface CreateTodo {
  title: string;
  fileUrl?: string;
  linkUrl?: string;
  goalId?: number;
}

export interface UpdateTodo {
  title?: string;
  fileUrl?: string | null;
  linkUrl?: string | null;
  goalId?: number | null;
  done?: boolean;
}

const getTodos = async (
  goalId?: number,
  done?: boolean,
  cursor?: number,
  size = 20,
) => {
  const response = await axiosInstance({
    url: '/todos',
    method: 'get',
    params: { goalId, done, cursor, size },
  });
  return response;
};

const postTodo = async (todo: CreateTodo) => {
  const response = await axiosInstance({
    url: '/todos',
    method: 'post',
    data: todo,
  });
  return response;
};

const patchTodo = async (todoId: number, todo: UpdateTodo) => {
  const response = await axiosInstance({
    url: `/todos/${todoId}`,
    method: 'patch',
    data: todo,
  });
  return response;
};

const deleteTodo = async (todoId: number) => {
  const response = await axiosInstance({
    url: `/todos/${todoId}`,
    method: 'delete',
  });
  return response;
};

const getProgress = async (goalId?: number) => {
  const response = await axiosInstance({
    url: '/todos/progress',
    method: 'get',
    params: { goalId },
  });
  return response;
};

export default { getTodos, postTodo, patchTodo, deleteTodo, getProgress };
