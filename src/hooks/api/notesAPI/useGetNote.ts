import notesAPI from '@/api/notesAPI';
import { useQuery } from '@tanstack/react-query';

const useGetNote = (noteId: number) =>
  useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesAPI.getNote(noteId),
  });

export default useGetNote;
