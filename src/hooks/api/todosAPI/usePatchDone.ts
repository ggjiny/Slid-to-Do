import todosAPI, { Todo } from '@/api/todosAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function usePatchDone(goalId?: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) =>
      todosAPI.patchTodo(todo.id, { done: !todo.done }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', goalId] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

export default usePatchDone;
