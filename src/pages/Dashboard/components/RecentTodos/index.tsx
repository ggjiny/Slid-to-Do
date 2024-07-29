import { Todo } from '@/types/interface';
import { ArrowRightIcon, TodoRecentlyIcon } from '@assets';
import TodoList from '@components/TodoList';
import { useState } from 'react';
import { mockTodosData } from '../mockData';

function RecentTodos() {
  const todosData = mockTodosData
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    })
    .slice(0, 4);
  const [todosState, setTodosState] = useState(todosData);

  const handleToggleDone = (id: number) => {
    setTodosState(
      todosState.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const handleTodoClick = (todo: Todo) => todo;

  return (
    <div className="h-[250px] rounded-xl bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TodoRecentlyIcon className="mr-2" />
          <div className="text-lg font-semibold leading-7 text-slate-800">
            최근 등록한 할 일
          </div>
        </div>
        <button type="button" className="flex items-center">
          <div className="text-sm font-medium leading-5 text-slate-600">
            모두보기
          </div>
          <ArrowRightIcon />
        </button>
      </div>
      <div className="mt-4 h-[159px] overflow-y-auto">
        {todosData && todosData.length > 0 ? (
          <TodoList
            todos={todosState}
            onToggleDone={handleToggleDone}
            showGoals
            onTodoClick={handleTodoClick}
          />
        ) : (
          <div className="mt-16 flex w-full justify-center text-sm font-normal text-slate-500">
            최근에 등록한 할 일이 없어요
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentTodos;
