import goalsAPI from '@app/api/goalsAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGoal: string) => goalsAPI.postGoal(newGoal),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  });
};

export default usePostGoal;
