import goalsAPI from '@app/api/goalsAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function usePatchGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, title }: { goalId: number; title: string }) =>
      goalsAPI.patchGoal(goalId, title),
    onSuccess: () => {
      showToast('수정되었습니다');
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export default usePatchGoal;
