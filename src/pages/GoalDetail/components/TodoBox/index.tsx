import { Goal, Todo } from '@/types/interface';
import { PlusIcon } from '@assets';
import TodoItem from '@components/TodoItem';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

type PageData = {
  nextCursor: number | null;
  todos: Todo[];
  totalCount: number;
};

type Page = {
  config: AxiosRequestConfig;
  data: PageData;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};
interface TodoBoxProps {
  title: 'To do' | 'Done';
  goal: Goal;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  todos: any;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  totalCount: number;
}

function TodoBox({
  title,
  goal,
  placeholder,
  todos,
  fetchNextPage,
  hasNextPage,
  isFetching,
  totalCount,
}: TodoBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let content;

  if (!isFetching) {
    if (totalCount === 0) {
      content = (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-sm font-normal text-slate-500">{placeholder}</p>
        </div>
      );
    } else {
      content = (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          {todos.pages.map((pageData: Page) =>
            pageData.data.todos.map((todo: Todo) => (
              <TodoItem key={todo.id} todo={todo} showIcons />
            )),
          )}
        </InfiniteScroll>
      );
    }
  }

  return (
    <>
      {isModalOpen && (
        <TodoCreateModal
          initialGoal={goal}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div
        className={`min-h-[221px] rounded-xl desktop:min-w-0 desktop:flex-1 ${title === 'To do' ? 'bg-white' : 'bg-slate-200'} flex flex-col px-6 py-4`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-bold leading-7">{title}</div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-sm font-semibold text-blue-500"
          >
            <PlusIcon width={16} height={16} className="mr-1 stroke-blue-500" />
            <div className="leading-5">할일 추가</div>
          </button>
        </div>
        {content}
      </div>
    </>
  );
}

export default TodoBox;
