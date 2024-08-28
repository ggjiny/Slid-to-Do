import { Todo } from '@/types/interface';
import { CheckIcon, DeleteIcon, NoteViewIcon, NoteWriteIcon } from '@assets';
import routes from '@constants/routes';
import useGetTodos from '@hooks/api/todosAPI/useGetTodos';
import useOutsideClick from '@hooks/useOutsideClick';
import useVisibility from '@hooks/useVisibility';
import cn from '@utils/cn';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

interface TodoItemProps {
  todo: Todo;
  onClick: () => void;
}

interface TodoListModalProps {
  goalId: number;
  onClose: () => void;
}

function TodoItem({ todo, onClick }: TodoItemProps) {
  return (
    <div
      key={todo.id}
      className="mt-2 flex cursor-pointer items-center justify-between rounded-xl px-3 py-1 hover:bg-blue-50"
      onClick={onClick}
    >
      <div className="mr-2 flex gap-2">
        <CheckIcon />
        {todo.title}
      </div>
      {todo.noteId ? (
        <div title="수정">
          <NoteViewIcon />
        </div>
      ) : (
        <div title="작성">
          <NoteWriteIcon />
        </div>
      )}
    </div>
  );
}

function TodoListModal({ goalId, onClose }: TodoListModalProps) {
  const { ref: intersectionRef, inView } = useInView();
  const [selectedSection, setSelectedSection] = useState<'todo' | 'done'>(
    'todo',
  );
  const navigate = useNavigate();

  const {
    data: todosData,
    fetchNextPage: fetchTodosNextPage,
    hasNextPage: hasTodosNextPage,
  } = useGetTodos({
    goalId,
    size: 5,
    done: false,
  });

  const {
    data: donesData,
    fetchNextPage: fetchDonesNextPage,
    hasNextPage: hasDonesNextPage,
  } = useGetTodos({
    goalId,
    size: 5,
    done: true,
  });

  useEffect(() => {
    if (inView) {
      if (selectedSection === 'todo' && hasTodosNextPage) {
        fetchTodosNextPage();
      } else if (selectedSection === 'done' && hasDonesNextPage) {
        fetchDonesNextPage();
      }
    }
  }, [
    inView,
    selectedSection,
    hasTodosNextPage,
    hasDonesNextPage,
    fetchTodosNextPage,
    fetchDonesNextPage,
  ]);

  const todos =
    selectedSection === 'todo'
      ? todosData?.pages.flatMap((page) => page.data.todos) || []
      : donesData?.pages.flatMap((page) => page.data.todos) || [];

  const { isVisible: isOpen, handleClose } = useVisibility(onClose);
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => handleClose());

  const handleClickTodo = (todo: Todo) => {
    navigate(`${routes.newNote}/${todo.goal?.id}`, {
      state: { todo, isEditing: !!todo.noteId },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={modalRef}
        className={`flex h-auto w-[311px] transform flex-col items-start justify-start gap-2.5 rounded-xl bg-white p-6 transition-transform duration-300 tablet:w-[520px] tablet:overflow-auto ${isOpen ? 'translate-y-0' : '-translate-y-10'}`}
      >
        <div className="inline-flex w-full items-center justify-between gap-4">
          <div className="text-lg font-bold leading-7 text-slate-800">
            노트 작성 및 수정
          </div>
          <div
            className="inline-flex h-6 w-6 cursor-pointer items-center justify-center"
            onClick={handleClose}
          >
            <DeleteIcon />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className={cn(
              `rounded-2xl border border-blue-100 px-3 py-1 font-medium text-slate-800 hover:bg-blue-50`,
              { 'bg-blue-100': selectedSection === 'todo' },
            )}
            onClick={() => setSelectedSection('todo')}
          >
            Todo
          </button>
          <button
            type="button"
            className={cn(
              `rounded-2xl border border-blue-100 px-3 py-1 font-medium text-slate-800 hover:bg-blue-50`,
              { 'bg-blue-100': selectedSection === 'done' },
            )}
            onClick={() => setSelectedSection('done')}
          >
            Done
          </button>
        </div>
        <div
          className={cn('h-[250px] w-full overflow-auto', {
            'flex items-center justify-center': todos.length === 0,
          })}
        >
          {todos.length > 0 ? (
            <>
              {todos.map((todo: Todo) => (
                <TodoItem todo={todo} onClick={() => handleClickTodo(todo)} />
              ))}
            </>
          ) : (
            <p className="text-slate-500">
              {selectedSection === 'todo'
                ? '할 일이 없습니다'
                : '완료한 일이 없습니다'}
            </p>
          )}
          <div ref={intersectionRef} />
        </div>
      </div>
    </div>
  );
}

export default TodoListModal;
