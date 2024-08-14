import { UpdateNote } from '@/types/interface';
import notesAPI from '@app/api/notesAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ noteId, note }: { noteId: number; note: UpdateNote }) =>
      notesAPI.patchNote(noteId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      showToast('노트 수정이 완료되었습니다');
    },
  });
};

export default usePatchNote;
