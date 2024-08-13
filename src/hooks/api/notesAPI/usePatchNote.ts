import { UpdateNote } from '@/types/interface';
import notesAPI from '@app/api/notesAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ noteId, note }: { noteId: number; note: UpdateNote }) =>
      notesAPI.patchNote(noteId, note),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
};

export default usePatchNote;
