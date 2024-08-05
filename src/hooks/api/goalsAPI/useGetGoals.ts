import goalsAPI from '@/api/goalsAPI';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetGoals = (size = 20) =>
  useInfiniteQuery({
    queryKey: ['goals', size],
    queryFn: ({ pageParam }) => goalsAPI.getGoals(pageParam, size),
    getNextPageParam: (lastPage) =>
      lastPage.data.nextCursor !== null ? lastPage.data.nextCursor : undefined,
    initialPageParam: undefined,
  });

export default useGetGoals;
