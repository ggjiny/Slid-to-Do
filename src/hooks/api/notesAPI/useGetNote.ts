import notesAPI from '@/api/notesAPI';
import { useQuery } from '@tanstack/react-query';

const useGetNote = (noteId: number, isEditing = false) =>
  useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesAPI.getNote(noteId),
    enabled: isEditing !== undefined && typeof noteId === 'number',
  });

export default useGetNote;
