/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo } from '@/types/interface';
import TodoItem from '@components/TodoItem';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
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
interface TodoSectionProps {
  title: string;
  placeholder: string;
  todos: any;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  isToggleOpen: boolean;
  totalCount: number;
}

function TodoSection({
  title,
  placeholder,
  todos,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isToggleOpen,
  totalCount,
}: TodoSectionProps) {
  const todosData = todos?.pages || [];
  let content;

  if (!isFetching) {
    if (totalCount === 0) {
      content = (
        <div className="flex h-[120px] items-center justify-center">
          <p className="text-sm font-normal text-slate-500">{placeholder}</p>
        </div>
      );
    } else if (!isToggleOpen) {
      content = (
        <div>
          {todosData[0].data.todos.slice(0, 4).map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} showIcons />
          ))}
        </div>
      );
    } else {
      content = (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          {todosData.map((pageData: Page) =>
            pageData.data.todos.map((todo: Todo) => (
              <TodoItem key={todo.id} todo={todo} showIcons />
            )),
          )}
        </InfiniteScroll>
      );
    }
  }

  return (
    <div className="tablet:min-w-0 tablet:flex-1">
      <div className="font-semibold">{title}</div>
      <div className="mt-3">{content}</div>
    </div>
  );
}

export default TodoSection;
