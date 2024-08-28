import todosAPI, { CreateTodo } from '@/api/todosAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function usePostTodo(goalId?: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: CreateTodo) => todosAPI.postTodo(todo),
    onSuccess: () => {
      showToast('할 일이 추가되었습니다');
      queryClient.invalidateQueries({ queryKey: ['recentTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', goalId] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

export default usePostTodo;
