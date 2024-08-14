import { CreateNote } from '@/types/interface';
import notesAPI from '@app/api/notesAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ todoId, note }: { todoId: number; note: CreateNote }) =>
      notesAPI.postNote(todoId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      showToast('노트 작성이 완료되었습니다');
    },
  });
};

export default usePostNote;
