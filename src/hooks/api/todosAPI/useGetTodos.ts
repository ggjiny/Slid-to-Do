import todosAPI from '@/api/todosAPI';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetTodos = (goalId?: number, done?: boolean, size = 20) =>
  useInfiniteQuery({
    queryKey: ['todos', goalId, done, size],
    queryFn: ({ pageParam }) =>
      todosAPI.getTodos(goalId, done, pageParam, size),
    getNextPageParam: (lastPage) =>
      lastPage.data.nextCursor !== null ? lastPage.data.nextCursor : undefined,
    initialPageParam: undefined,
  });

export default useGetTodos;
