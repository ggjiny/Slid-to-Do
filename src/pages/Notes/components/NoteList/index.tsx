import LoadingAnimation from '@components/LoadingAnimation';
import useGetNotes from '@hooks/api/notesAPI/useGetNotes';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NoteItem from './NoteItem';

interface NoteListProps {
  goalId: number;
}

function NoteList({ goalId }: NoteListProps) {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetNotes(goalId);
  const { ref: intersectionRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // 인피니트 쿼리로 받은 데이터를 플랫하게 펼치기
  const notes = data?.pages.flatMap((page) => page.data.notes);

  if (isLoading) {
    return (
      <div className="mt-60 flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      {notes && notes.length > 0 ? (
        <div className="flex flex-col gap-4">
          {notes.map((item) => (
            <NoteItem key={item.id} noteData={item} />
          ))}
          <div ref={intersectionRef} />
        </div>
      ) : (
        <div className="mt-[30vh] flex max-w-[792px] items-center justify-center text-lg leading-5 text-slate-500">
          아직 등록된 노트가 없어요
        </div>
      )}
    </>
  );
}

export default NoteList;
