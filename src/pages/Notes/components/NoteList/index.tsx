import useGetNotes from '@hooks/api/notesAPI/useGetNotes';
import NoteItem from './NoteItem';

function NoteList() {
  // 나중에 goalId를 동적으로 받아올 수 있도록 수정
  const goalId = 250;
  const { data } = useGetNotes(goalId);
  // 인피니트 쿼리로 받은 데이터를 플랫하게 펼치기
  const notes = data?.pages.flatMap((page) => page.data.notes);

  return (
    <>
      {notes && notes.length > 0 ? (
        <div className="flex flex-col gap-4">
          {notes.map((item) => (
            <NoteItem key={item.id} noteData={item} />
          ))}
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
