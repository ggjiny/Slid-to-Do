import { Todo } from '@/types/interface';
import { ArrowRightIcon, TodoRecentlyIcon } from '@assets';
import LoadingAnimation from '@components/LoadingAnimation';
import TodoItem from '@components/TodoItem';
import useGetRecentTodos from '@hooks/api/todosAPI/useGetRecentTodos';
import { Link } from 'react-router-dom';

function RecentTodos() {
  const { data, isLoading } = useGetRecentTodos();
  const todosData = data?.data;

  let content;
  if (isLoading) {
    content = (
      <div className="mt-14 flex w-full items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  } else if (todosData && todosData.totalCount > 0) {
    content = todosData.todos.map((todo: Todo) => (
      <TodoItem key={todo.id} todo={todo} goalId={todo.goal?.id} showGoals />
    ));
  } else {
    content = (
      <div className="mt-16 flex w-full justify-center text-sm font-normal text-slate-500">
        최근에 등록한 할 일이 없어요
      </div>
    );
  }

  return (
    <div className="h-[250px] rounded-xl bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TodoRecentlyIcon className="mr-2" />
          <div className="text-lg font-semibold leading-7 text-slate-800">
            최근 등록한 할 일
          </div>
        </div>
        <Link to="/todos" className="flex items-center">
          <div className="text-sm font-medium leading-5 text-slate-600">
            모두보기
          </div>
          <ArrowRightIcon />
        </Link>
      </div>
      <div className="mt-4 h-[159px] overflow-y-auto">{content}</div>
    </div>
  );
}

export default RecentTodos;
