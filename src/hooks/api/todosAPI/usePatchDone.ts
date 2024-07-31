import todosAPI, { Todo } from '@/api/todosAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function usePatchDone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) =>
      todosAPI.patchTodo(todo.id, { done: !todo.done }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export default usePatchDone;
