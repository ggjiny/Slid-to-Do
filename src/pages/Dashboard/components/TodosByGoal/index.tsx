import useGetGoals from '@hooks/api/goalsAPI/useGetGoals';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { Goal } from '@/types/interface';
import { PlusIcon } from '@assets';

import CreateGoalModal from '@components/CreateGoalModal';
import FlagBoxIcon from '@components/FlagBoxIcon';
import LoadingAnimation from '@components/LoadingAnimation';
import TodosByGoalBox from './TodosByGoalBox';

function TodosByGoal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: goalsInfo,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetGoals(3);
  const goalsData = goalsInfo?.pages || [];
  const totalCount = goalsData[0]?.data?.totalCount ?? 0;
  let content;

  const handleLoadMore = () => {
    fetchNextPage();
  };

  if (isLoading) {
    content = (
      <div className="my-10 flex w-full items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  } else if (totalCount > 0) {
    content = (
      <InfiniteScroll loadMore={handleLoadMore} hasMore={hasNextPage}>
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
    <>
      {isModalOpen && <CreateGoalModal onClose={() => setIsModalOpen(false)} />}
      <div className="mt-4 w-full rounded-xl bg-white px-6 pb-6 pt-4 tablet:mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FlagBoxIcon color="orange" additionalClass="mr-2" />
            <div className="text-lg font-semibold leading-7 text-slate-800">
              목표별 할 일
            </div>
          </div>
          <button
            id="add-goal-button-dashboard"
            type="button"
            className="flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon width={24} height={24} className="mr-1 stroke-blue-500" />
            <span className="mr-1 text-base font-semibold text-blue-500 desktop:text-lg">
              새 목표
            </span>
          </button>
        </div>
        {content}
      </div>
    </>
  );
}

export default TodosByGoal;
