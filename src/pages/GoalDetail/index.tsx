import { ArrowRightIcon, NoteIcon } from '@assets';
import useGetGoal from '@hooks/api/goalsAPI/useGetGoal';
import useGetTodos from '@hooks/api/todosAPI/useGetTodos';
import { Link, useParams } from 'react-router-dom';
import GoalBox from './components/GoalBox';
import TodoBox from './components/TodoBox';

function GoalDetailPage() {
  const params = useParams();
  const goalId = Number(params.id) || 0;
  const { data: goalData } = useGetGoal(goalId);
  const {
    data: todosInfo,
    isFetching: todoIsFetching,
    fetchNextPage: fetchNextTodosPage,
    hasNextPage: hasTodosNextPage,
  } = useGetTodos({
    goalId,
    done: false,
  });
  const {
    data: donesInfo,
    isFetching: doneIsFetching,
    fetchNextPage: fetchNextDonesPage,
    hasNextPage: hasDonesNextPage,
  } = useGetTodos({
    goalId,
    done: true,
  });
  const goal = { id: goalId, title: goalData?.data.title };

  const todosTotalCount: number = todosInfo?.pages[0]?.data.totalCount ?? 0;
  const donesTotalCount: number = donesInfo?.pages[0]?.data.totalCount ?? 0;

  return (
    <div className="flex min-h-screen justify-center bg-slate-100 desktop:min-w-[1920px]">
      <div className="flex w-[375px] flex-col pb-16 text-slate-800 tablet:w-[637px] desktop:w-[1200px]">
        <h1 className="mt-6 hidden text-lg font-semibold leading-7 text-slate-900 tablet:block">
          목표
        </h1>
        <div className="mt-4 flex flex-col gap-4 tablet:gap-6">
          <GoalBox goal={goal} />
          <Link
            to={`/notes/${goalId}`}
            className="flex items-center justify-between rounded-xl border-[1px] border-slate-100 bg-blue-100 px-6 py-4"
          >
            <div className="flex items-center gap-2 text-lg font-bold">
              <NoteIcon />
              <div>노트 모아보기</div>
            </div>
            <ArrowRightIcon />
          </Link>
          <div className="flex flex-col gap-4 tablet:gap-6 desktop:flex-row">
            <TodoBox
              title="To do"
              goal={goal}
              placeholder="아직 해야할 일이 없어요"
              fetchNextPage={fetchNextTodosPage}
              hasNextPage={hasTodosNextPage}
              isFetching={todoIsFetching}
              todos={todosInfo}
              totalCount={todosTotalCount}
            />
            <TodoBox
              title="Done"
              goal={goal}
              placeholder="아직 다 한 일이 없어요"
              fetchNextPage={fetchNextDonesPage}
              hasNextPage={hasDonesNextPage}
              isFetching={doneIsFetching}
              todos={donesInfo}
              totalCount={donesTotalCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalDetailPage;
