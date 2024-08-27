import todosAPI from '@/api/todosAPI';
import { useQuery } from '@tanstack/react-query';

const useGetProgress = (goalId?: number) =>
  useQuery({
    queryKey: ['progress', goalId],
    queryFn: () => todosAPI.getProgress(goalId),
  });

export default useGetProgress;
