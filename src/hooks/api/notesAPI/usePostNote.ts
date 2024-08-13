import { CreateNote } from '@/types/interface';
import notesAPI from '@app/api/notesAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ todoId, note }: { todoId: number; note: CreateNote }) =>
      notesAPI.postNote(todoId, note),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
};

export default usePostNote;
