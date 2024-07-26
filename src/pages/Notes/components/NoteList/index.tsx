import NoteItem from './NoteItem';

const MOCK_NOTE = [
  {
    todo: {
      done: true,
      title: '자바스크립트 기초1 듣기',
      id: 0,
    },
    updatedAt: '2024-07-25T05:01:17.918Z',
    createdAt: '2024-07-25T05:01:17.918Z',
    title: '자바스크립트 시작 전 준비물',
    id: 0,
    goal: {
      title: '자바스크립트로 웹 사이트 만들기',
      id: 0,
    },
  },
  {
    todo: {
      done: false,
      title: '자바스크립트 기초2 듣기',
      id: 0,
    },
    updatedAt: '2024-07-25T05:01:17.918Z',
    createdAt: '2024-07-25T05:01:17.918Z',
    title: '자바스크립트',
    id: 1,
    goal: {
      title: '자바스크립트로 웹 사이트 만들기',
      id: 0,
    },
  },
];

function NoteList() {
  return (
    <>
      {MOCK_NOTE.length > 0 ? (
        <div className="flex flex-col gap-4">
          {MOCK_NOTE.map((item) => (
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
