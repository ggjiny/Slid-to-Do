import { Goal } from '@/types/interface';
import { FlagIcon } from '@assets';
import LoadingAnimation from '@components/LoadingAnimation';
import useGetGoals from '@hooks/api/goalsAPI/useGetGoals';
import InfiniteScroll from 'react-infinite-scroller';
import TodosByGoalBox from './TodosByGoalBox';

function TodosByGoal() {
  const {
    data: goalsInfo,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetGoals();
  const goalsData = goalsInfo?.pages || [];
  const totalCount = goalsData[0]?.data?.totalCount ?? 0;
  let content;

  if (isLoading) {
    content = (
      <div className="my-10 flex w-full items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  } else if (totalCount > 0) {
    content = (
      <InfiniteScroll loadMore={() => fetchNextPage} hasMore={hasNextPage}>
        <div className="mt-4">
          {goalsData.map((page) =>
            page.data.goals.map((goal: Goal) => (
              <TodosByGoalBox key={goal.id} id={goal.id} title={goal.title} />
            )),
          )}
        </div>
      </InfiniteScroll>
    );
  } else {
    content = (
      <div className="flex min-h-[200px] items-center justify-center text-sm font-normal text-slate-500 tablet:min-h-[616px]">
        등록한 목표가 없어요
      </div>
    );
  }

  return (
    <div className="mt-4 w-full rounded-xl bg-white px-6 pb-6 pt-4 tablet:mt-6">
      <div className="flex items-center">
        <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-[15px] bg-[#F97316]">
          <FlagIcon fill="white" width={24} height={24} />
        </div>
        <div className="text-lg font-semibold leading-7 text-slate-800">
          목표별 할 일
        </div>
      </div>
      {content}
    </div>
  );
}

export default TodosByGoal;
