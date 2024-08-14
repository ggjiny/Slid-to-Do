import notesAPI from '@/api/notesAPI';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetNotes = (goalId?: number, size = 5) =>
  useInfiniteQuery({
    queryKey: ['notes', goalId, size],
    queryFn: ({ pageParam }) => notesAPI.getNotes(goalId, pageParam, size),
    getNextPageParam: (lastPage) =>
      lastPage.data.nextCursor !== null ? lastPage.data.nextCursor : undefined,
    initialPageParam: undefined,
  });

export default useGetNotes;
