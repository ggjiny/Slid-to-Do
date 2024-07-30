import { Todo } from '@/types/interface';
import { PlusIcon } from '@assets';
import TodoList from '@components/TodoList';

interface TodoBoxProps {
  title: 'To do' | 'Done';
  placeholder: string;
  todos: Todo[];
  onToggleDone: (id: number) => void;
  onTodoClick: (todo: Todo) => void;
}

function TodoBox({
  title,
  placeholder,
  todos,
  onToggleDone,
  onTodoClick,
}: TodoBoxProps) {
  return (
    <div
      className={`min-h-[221px] rounded-xl desktop:min-w-0 desktop:flex-1 ${title === 'To do' ? 'bg-white' : 'bg-slate-200'} flex flex-col px-6 py-4`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-bold leading-7">{title}</div>
        <button
          type="button"
          className="flex items-center text-sm font-semibold text-blue-500"
        >
          <PlusIcon width={16} height={16} className="mr-1 stroke-blue-500" />
          <div className="leading-5">할일 추가</div>
        </button>
      </div>
      {todos && todos.length > 0 ? (
        <TodoList
          todos={todos}
          showIcons
          onToggleDone={onToggleDone}
          onTodoClick={onTodoClick}
        />
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-sm font-normal text-slate-500">{placeholder}</p>
        </div>
      )}
    </div>
  );
}

export default TodoBox;
