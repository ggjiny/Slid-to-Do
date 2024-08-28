import todosAPI from '@/api/todosAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeleteTodo(goalId?: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoId: number) => todosAPI.deleteTodo(todoId),
    onSuccess: () => {
      showToast('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['recentTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', goalId] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

export default useDeleteTodo;
