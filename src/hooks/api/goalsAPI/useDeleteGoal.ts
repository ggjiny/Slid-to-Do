import goalsAPI from '@app/api/goalsAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goalId: number) => goalsAPI.deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showToast('삭제되었습니다');
    },
  });
};

export default useDeleteGoal;
