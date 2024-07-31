import { Todo } from '@/types/interface';
import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from '@assets';
import useWindowWidth from '@hooks/useWindowWidth';
import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';
import { mockTodosData } from '../mockData';
import TodoSection from './TodoSection';

interface TodosByGoalProps {
  title: string;
}

function TodosByGoalBox({ title }: TodosByGoalProps) {
  const [progress, setProgress] = useState(0);
  const windowWidth = useWindowWidth();
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [dones, setDones] = useState<Todo[] | null>(null);
  const [isTodosMoreThanFive, setIsTodosMoreThanFive] = useState(false);
  const [isDonesMoreThanFive, setIsDonesMoreThanFive] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  useEffect(() => {
    const todosData = mockTodosData.filter((todo) => !todo.done);
    if (todosData.length > 5) {
      setIsTodosMoreThanFive(true);
      if (isToggleOpen) {
        setTodos(todosData);
      } else {
        setTodos(todosData.slice(0, 4));
      }
    }

    const donesData = mockTodosData.filter((todo) => todo.done);
    if (donesData.length > 5) {
      setIsDonesMoreThanFive(true);
      if (isToggleOpen) {
        setDones(donesData);
      }
    } else {
      setDones(donesData.slice(0, 4));
    }
  }, [isToggleOpen]);

  useEffect(() => {
    setProgress(25);
  });

  let height = 300;
  let expandedHeight = 0;
  if (todos && dones) {
    if (windowWidth < 744) {
      height = 220 + Math.min(todos.length + dones.length, 8) * 30;
      expandedHeight = 220 + (todos.length + dones.length) * 30;
    } else {
      expandedHeight = 300 + (Math.max(todos.length, dones.length) - 4) * 30;
    }
  }

  const handleToggleDone = (id: number) => id;

  const handleTodoClick = (todo: Todo) => todo;
  return (
    <div
      className="transition-height mt-4 flex w-full flex-col rounded-[32px] bg-blue-50 p-6 duration-300 ease-in-out first:mt-0"
      style={{ height: isToggleOpen ? `${expandedHeight}px` : `${height}px` }}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold leading-7 text-slate-800">
          {title}
        </div>
        <button
          type="button"
          className="flex items-center text-sm font-semibold text-blue-500"
        >
          <PlusIcon width={16} height={16} className="mr-1 stroke-blue-500" />
          <div className="leading-5">할일 추가</div>
        </button>
      </div>
      <div className="mt-2 flex h-5 w-full items-center justify-between gap-2 rounded-[13px] bg-white px-[9px] py-[2px]">
        <div className="h-1 grow rounded-md bg-slate-100">
          <ProgressBar
            completed={progress}
            bgColor="#0F172A"
            isLabelVisible={false}
            baseBgColor="transparent"
            transitionDuration="500ms"
            height="100%"
          />
        </div>
        <div className="text-xs font-semibold leading-4">{progress}%</div>
      </div>
      <div className="mt-4 flex flex-col text-sm text-slate-800 tablet:flex-row tablet:gap-4 desktop:gap-6">
        <TodoSection
          title="To do"
          placeholder="아직 해야할 일이 없어요"
          todos={todos}
          handleToggleDone={handleToggleDone}
          handleTodoClick={handleTodoClick}
        />
        <TodoSection
          title="Done"
          placeholder="아직 다 한 일이 없어요"
          todos={dones}
          handleToggleDone={handleToggleDone}
          handleTodoClick={handleTodoClick}
        />
      </div>
      {(isTodosMoreThanFive || isDonesMoreThanFive) && (
        <button
          type="button"
          onClick={() => setIsToggleOpen((prev) => !prev)}
          className="mt-3 flex w-full justify-center"
        >
          <div className="flex h-8 w-[120px] items-center rounded-2xl bg-white">
            {isToggleOpen ? (
              <>
                <div className="ml-10 text-sm font-semibold leading-5 text-slate-700">
                  닫기
                </div>
                <ArrowUpIcon />
              </>
            ) : (
              <>
                <div className="ml-8 text-sm font-semibold leading-5 text-slate-700">
                  더보기
                </div>
                <ArrowDownIcon />
              </>
            )}
          </div>
        </button>
      )}
    </div>
  );
}

export default TodosByGoalBox;
