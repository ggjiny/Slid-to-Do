import axiosInstance from './axiosInstance';

export interface UpdateNote {
  title?: string;
  content?: string;
  linkUrl?: string | null;
}

const getNotes = async (goalId?: number, cursor?: number, size = 20) => {
  const response = await axiosInstance({
    url: '/notes',
    method: 'get',
    params: { goalId, cursor, size },
  });
  return response;
};

const postNote = async (
  todoId: number,
  title: string,
  content: string,
  linkUrl?: string,
) => {
  const response = await axiosInstance({
    url: '/notes',
    method: 'post',
    data: { todoId, title, content, linkUrl },
  });
  return response;
};

const getNote = async (noteId: number) => {
  const response = await axiosInstance({
    url: `/notes/${noteId}`,
    method: 'get',
  });
  return response;
};

const patchNote = async (noteId: number, note: UpdateNote) => {
  const response = await axiosInstance({
    url: `/notes/${noteId}`,
    method: 'patch',
    data: note,
  });
  return response;
};

const deleteNote = async (noteId: number) => {
  const response = await axiosInstance({
    url: `/notes/${noteId}`,
    method: 'delete',
  });
  return response;
};

export default { getNotes, postNote, getNote, patchNote, deleteNote };
