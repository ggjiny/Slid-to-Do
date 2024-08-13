import { Todo } from '@/types/interface';
import {
  ActiveBlue,
  FileIcon,
  GoalIcon,
  Inactive,
  LinkIcon,
  NoteViewIcon,
  NoteWriteIcon,
} from '@assets';
import NoteDetail from '@components/NoteDetail';
import TodoDetailModal from '@components/TodoModal/TodoDetailModal';
import usePatchDone from '@hooks/api/todosAPI/usePatchDone';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface TodoItemProps {
  todo: Todo;
  showGoals?: boolean;
  showIcons?: boolean;
  hoverBgColor?: string;
}

interface IconButtonsProps {
  todo: Todo;
  setIsNoteDetailOpen: (open: boolean) => void;
}

function IconButtons({ todo, setIsNoteDetailOpen }: IconButtonsProps) {
  return (
    <div className="flex flex-shrink-0 items-center space-x-2">
      {todo.fileUrl !== null && (
        <Link
          to={todo.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 tablet:flex"
          onClick={(e) => e.stopPropagation()}
          aria-label="Open file"
        >
          <FileIcon width={24} height={24} />
        </Link>
      )}
      {todo.linkUrl !== null && (
        <Link
          to={todo.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-full tablet:flex"
          onClick={(e) => e.stopPropagation()}
          aria-label="Open link"
        >
          <LinkIcon className="cursor-pointer fill-blue-100 stroke-blue-400" />
        </Link>
      )}
      {todo.noteId !== null ? (
        <button
          type="button"
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50"
          onClick={(e) => {
            e.stopPropagation();
            setIsNoteDetailOpen(true);
          }}
          aria-label="View note"
        >
          <NoteViewIcon width={24} height={24} />
        </button>
      ) : (
        <Link
          to="/notes/new"
          state={{ todo }}
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <NoteWriteIcon width={24} height={24} />
        </Link>
      )}
    </div>
  );
}

function TodoItem({
  todo,
  showGoals = false,
  showIcons = false,
  hoverBgColor = 'hover:bg-slate-100',
}: TodoItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoteDetailOpen, setIsNoteDetailOpen] = useState(false);
  const { mutate: toggleDone } = usePatchDone();

  return (
    <>
      <div
        key={todo.id}
        className={`group relative flex cursor-pointer items-center justify-between rounded-lg px-1 py-[2px] transition-all duration-200 ${hoverBgColor}`}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={() => setIsModalOpen(true)}
      >
        <div className="flex w-full items-start space-x-2 overflow-hidden">
          <button
            type="button"
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              toggleDone(todo);
            }}
            aria-label={todo.done ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {todo.done ? (
              <ActiveBlue width={24} height={24} />
            ) : (
              <Inactive width={24} height={24} />
            )}
          </button>
          <div className="min-w-0 flex-1 items-center overflow-hidden">
            <div
              className={`pt-[1px] text-sm font-normal leading-6 text-slate-800 ${todo.done ? 'line-through' : ''} truncate whitespace-nowrap`}
            >
              {todo.title}
            </div>
            {showGoals && todo.goal !== null && (
              <div className="flex items-center overflow-hidden">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50">
                  <GoalIcon width={24} height={24} />
                </div>
                <div className="ml-2 truncate text-sm font-normal text-slate-700">
                  {todo.goal.title}
                </div>
              </div>
            )}
          </div>
        </div>
        {showIcons && (
          <IconButtons todo={todo} setIsNoteDetailOpen={setIsNoteDetailOpen} />
        )}
      </div>
      {isModalOpen && (
        <TodoDetailModal todo={todo} onClose={() => setIsModalOpen(false)} />
      )}
      {isNoteDetailOpen && (
        <NoteDetail
          onClose={() => setIsNoteDetailOpen(false)}
          // 예외처리 필요합니당.
          noteId={todo.noteId ? todo.noteId : 0}
        /> // 노트 상세 보기 prop 변경 예정
      )}
    </>
  );
}

export default TodoItem;
