import notesAPI from '@app/api/notesAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: number) => notesAPI.deleteNote(noteId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export default useDeleteNote;
