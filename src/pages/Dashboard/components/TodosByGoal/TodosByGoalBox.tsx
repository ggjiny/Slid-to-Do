import { ArrowRightIcon, PlusIcon } from '@assets';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import routes from '@constants/routes';
import useGetProgress from '@hooks/api/todosAPI/useGetProgress';
import useGetTodos from '@hooks/api/todosAPI/useGetTodos';
import useWindowWidth from '@hooks/useWindowWidth';
import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TodoSection from './TodoSection';
import ToggleButton from './ToggleButton';

interface TodosByGoalProps {
  goalId: number;
  title: string;
}

function TodosByGoalBox({ goalId, title }: TodosByGoalProps) {
  const windowWidth = useWindowWidth();
  const [isTodosMoreThanFive, setIsTodosMoreThanFive] = useState(false);
  const [isDonesMoreThanFive, setIsDonesMoreThanFive] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: progressData } = useGetProgress(goalId);
  const progress = progressData?.data.progress || 0;

  const {
    data: todosInfo,
    fetchNextPage: fetchNextTodosPage,
    hasNextPage: hasTodosNextPage,
  } = useGetTodos({
    goalId,
    done: false,
  });
  const {
    data: donesInfo,
    fetchNextPage: fetchNextDonesPage,
    hasNextPage: hasDonesNextPage,
  } = useGetTodos({
    goalId,
    done: true,
  });

  const todosTotalCount: number = todosInfo?.pages[0]?.data.totalCount ?? 0;
  const donesTotalCount: number = donesInfo?.pages[0]?.data.totalCount ?? 0;

  useEffect(() => {
    setIsTodosMoreThanFive(todosTotalCount >= 5);
    setIsDonesMoreThanFive(donesTotalCount >= 5);
  }, [todosTotalCount, donesTotalCount]);

  const height = windowWidth >= 744 ? 300 : 450;
  const expandedHeight =
    windowWidth >= 744
      ? Math.min(600, 190 + Math.max(todosTotalCount, donesTotalCount) * 29)
      : 600;

  return (
    <>
      {isModalOpen && (
        <TodoCreateModal
          initialGoal={{ id: goalId, title }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div id="goal-box" className="relative mt-4">
        <div
          className={`transition-height flex w-full flex-col overflow-y-auto rounded-[32px] bg-blue-50 p-6 duration-300 ease-in-out first:mt-0 ${(isDonesMoreThanFive || isTodosMoreThanFive) && 'pb-12'}`}
          style={{
            height: isToggleOpen ? `${expandedHeight}px` : `${height}px`,
          }}
        >
          <div className="flex items-center justify-between">
            <Link
              to={`${routes.goalDetail}/${goalId}`}
              className="flex items-center gap-[2px]"
            >
              <div className="text-lg font-bold leading-7 text-slate-800">
                {title}
              </div>
              <ArrowRightIcon />
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="flex items-center text-sm font-semibold text-blue-500"
            >
              <PlusIcon
                width={16}
                height={16}
                className="mr-1 stroke-blue-500"
              />
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
          <div className="mt-4 flex flex-grow flex-col text-sm text-slate-800 tablet:flex-row tablet:gap-4 desktop:gap-6">
            <TodoSection
              title="To do"
              goalId={goalId}
              placeholder="아직 해야할 일이 없어요"
              fetchNextPage={fetchNextTodosPage}
              hasNextPage={hasTodosNextPage}
              isToggleOpen={isToggleOpen}
              todos={todosInfo}
              totalCount={todosTotalCount}
            />
            <div className="hidden h-4/5 w-[1px] self-center bg-blue-100 tablet:block" />
            <TodoSection
              title="Done"
              goalId={goalId}
              placeholder="아직 다 한 일이 없어요"
              fetchNextPage={fetchNextDonesPage}
              hasNextPage={hasDonesNextPage}
              isToggleOpen={isToggleOpen}
              todos={donesInfo}
              totalCount={donesTotalCount}
            />
          </div>
        </div>
        {(isTodosMoreThanFive || isDonesMoreThanFive) && (
          <ToggleButton
            isToggleOpen={isToggleOpen}
            onToggleOpen={(v) => setIsToggleOpen(v)}
          />
        )}
      </div>
    </>
  );
}

export default TodosByGoalBox;
