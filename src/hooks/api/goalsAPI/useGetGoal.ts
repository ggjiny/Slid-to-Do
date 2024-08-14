import goalsAPI from '@app/api/goalsAPI';
import { useQuery } from '@tanstack/react-query';

const useGetGoal = (goalId: number) =>
  useQuery({
    queryKey: ['goal', goalId],
    queryFn: () => goalsAPI.getGoal(goalId),
  });

export default useGetGoal;
