import { PlusBlueIcon } from '@assets';
import TodoItem from '@components/TodoItem';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import useGetTodos from '@hooks/api/todosAPI/useGetTodos';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { useInView } from 'react-intersection-observer';
import FilterButtons from './components/FilterButtons';
import useLayoutStyles from './useLayoutStyles';

function TodosPage() {
  const { containerClass, style, entireContainerClass, entireContainerStyle } =
    useLayoutStyles();

  const totalCount = useGetTodos({ size: 1 }).data?.pages[0].data.totalCount;

  const [isTodoCreateModalVisible, setIsTodoCreateModalVisible] =
    useState(false);
  const [filter, setFilter] = useState<'All' | 'Todo' | 'Done'>('All');

  const filterMessages = {
    All: '등록한 할 일이 없어요',
    Todo: '해야할 일이 아직 없어요',
    Done: '다 한 일이 아직 없어요',
  };

  const getFilterValue = (selectedFilter: 'All' | 'Todo' | 'Done') => {
    if (selectedFilter === 'Done') return true;
    if (selectedFilter === 'Todo') return false;
    return undefined;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetTodos({ done: getFilterValue(filter), size: 40 });

  const message = isLoading
    ? '할 일을 불러오는 중입니다...'
    : filterMessages[filter] || '';

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const todos = data?.pages.flatMap((page) => page.data.todos) || [];

  const addTodoClicked = () => {
    const addTodoClickedArgs = {
      dataLayer: {
        event: 'click_add_todo',
      },
    };

    TagManager.dataLayer(addTodoClickedArgs);
  };

  return (
    <div className={entireContainerClass} style={entireContainerStyle}>
      <div className="flex w-full items-center justify-between">
        <div className="text-base font-semibold leading-normal text-slate-900 tablet:text-lg tablet:leading-7">
          모든 할 일 ({totalCount})
        </div>
        <div
          className="inline-flex cursor-pointer items-center justify-start gap-1 self-stretch"
          onClick={() => {
            setIsTodoCreateModalVisible(true);
            addTodoClicked();
          }}
        >
          <PlusBlueIcon className="relative h-4 w-4" />
          <div className="text-sm font-semibold leading-tight text-blue-500">
            할일 추가
          </div>
        </div>
      </div>
      <div className="box-border inline-flex h-full w-full flex-grow flex-col items-start justify-start gap-4 self-stretch rounded-xl border border-slate-100 bg-white p-6">
        <FilterButtons selectedFilter={filter} onFilterChange={setFilter} />
        <div className={containerClass} style={style}>
          {todos.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center">
              {message && (
                <p className="text-sm leading-tight text-slate-500">
                  {message}
                </p>
              )}
            </div>
          ) : (
            <div className="w-full flex-col overflow-clip">
              {todos.map((todo, index) => {
                const isAnimated = index >= 40;
                return isAnimated ? (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <TodoItem
                      todo={todo}
                      showGoals
                      showIcons
                      hoverBgColor="hover:bg-slate-100"
                    />
                  </motion.div>
                ) : (
                  <div key={todo.id}>
                    <TodoItem
                      todo={todo}
                      showGoals
                      showIcons
                      hoverBgColor="hover:bg-slate-100"
                    />
                  </div>
                );
              })}
              {isFetchingNextPage && (
                <div className="pt-[1px] text-center text-sm font-normal leading-6 text-slate-400">
                  다음 할 일을 불러오는 중입니다...
                </div>
              )}
              <div ref={ref} />
            </div>
          )}
        </div>
      </div>
      {isTodoCreateModalVisible && (
        <TodoCreateModal
          onClose={() => {
            setIsTodoCreateModalVisible(false);
          }}
        />
      )}
    </div>
  );
}

export default TodosPage;
