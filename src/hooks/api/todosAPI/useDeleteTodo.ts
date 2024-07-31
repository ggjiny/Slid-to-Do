import todosAPI from '@/api/todosAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoId: number) => todosAPI.deleteTodo(todoId),
    onSuccess: () => {
      showToast('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export default useDeleteTodo;
