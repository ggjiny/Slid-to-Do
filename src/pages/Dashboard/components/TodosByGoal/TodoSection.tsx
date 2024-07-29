import { Todo } from '@/types/interface';
import TodoList from '@components/TodoList';

interface TodoSectionProps {
  title: string;
  placeholder: string;
  todos: Todo[] | null;
  handleToggleDone: (id: number) => void;
  handleTodoClick: (todo: Todo) => void;
}

function TodoSection({
  title,
  placeholder,
  todos,
  handleToggleDone,
  handleTodoClick,
}: TodoSectionProps) {
  return (
    <div className="tablet:min-w-0 tablet:flex-1">
      <div className="font-semibold">{title}</div>
      <div className="mt-3">
        {todos && todos.length > 0 ? (
          <TodoList
            todos={todos}
            showIcons
            onToggleDone={handleToggleDone}
            onTodoClick={handleTodoClick}
          />
        ) : (
          <div className="flex h-[120px] items-center justify-center">
            <p className="text-sm font-normal text-slate-500">{placeholder}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoSection;
