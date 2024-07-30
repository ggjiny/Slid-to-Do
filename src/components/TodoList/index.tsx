import { Todo } from '@/types/interface';
import TodoItem from './TodoItem';

export interface TodoListProps {
  todos: Todo[];
  onToggleDone: (id: number) => void;
  showGoals?: boolean;
  showIcons?: boolean;
  hoverBgColor?: string;
  onTodoClick: (todo: Todo) => void;
  onOpenNoteDetail?: (noteId: number | null) => void;
}

function TodoList({
  todos,
  onToggleDone,
  showGoals = false,
  showIcons = false,
  hoverBgColor = 'hover:bg-slate-100',
  onTodoClick,
  onOpenNoteDetail,
}: TodoListProps) {
  return (
    <div className="w-full flex-col overflow-hidden">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={onToggleDone}
          showGoals={showGoals}
          showIcons={showIcons}
          hoverBgColor={hoverBgColor}
          onTodoClick={onTodoClick}
          onOpenNoteDetail={onOpenNoteDetail}
        />
      ))}
    </div>
  );
}

export default TodoList;
