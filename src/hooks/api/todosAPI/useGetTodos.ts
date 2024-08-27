import todosAPI from '@/api/todosAPI';
import { useInfiniteQuery } from '@tanstack/react-query';

interface useGetTodoProps {
  goalId?: number;
  done?: boolean;
  size?: number;
}
const useGetTodos = ({ goalId, done, size }: useGetTodoProps) =>
  useInfiniteQuery({
    queryKey: ['todos', goalId, done, size],
    queryFn: ({ pageParam }) =>
      todosAPI.getTodos({ goalId, done, cursor: pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.data.nextCursor !== null ? lastPage.data.nextCursor : undefined,
    initialPageParam: undefined,
  });

export default useGetTodos;
