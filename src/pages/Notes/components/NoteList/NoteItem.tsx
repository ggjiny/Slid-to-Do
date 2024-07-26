import { Note } from '@/types/interface';
import { NoteListIcon } from '@assets';
import Kebab from '@components/Kebab';

interface NoteItemProps {
  noteData: Note;
}

function NoteItem({ noteData }: NoteItemProps) {
  const handleClickNote = () => {
    // 노트를 클릭했을 때 상세 창 뜨게
  };

  const handleEditNote = () => {
    // 노트 아이디를 통해 수정
  };

  const handleDeleteNote = () => {
    // 노트 아이디를 통해 식제
  };

  return (
    <div
      className="flex max-w-[792px] cursor-pointer flex-col rounded-xl bg-white p-6"
      onClick={handleClickNote}
    >
      <div className="mb-4 flex items-center justify-between">
        <NoteListIcon />
        <Kebab onEdit={handleEditNote} onDelete={handleDeleteNote} isSmall />
      </div>
      <div className="mb-3 border-b-[1px] border-slate-200 pb-3">
        <h3 className="text-lg font-medium leading-7 text-slate-800">
          {noteData.title}
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
          <span className="text-xs font-medium leading-4 text-slate-700">
            {noteData.todo.done ? 'Done' : 'To do'}
          </span>
        </div>
        <p className="text-xs leading-4 text-slate-700">
          {noteData.todo.title}
        </p>
      </div>
    </div>
  );
}

export default NoteItem;
