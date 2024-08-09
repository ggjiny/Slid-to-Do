import { Todo } from '@/types/interface';
import { ArrowRightIcon, NoteIcon } from '@assets';
import { Link } from 'react-router-dom';
import GoalBox from './components/GoalBox';
import TodoBox from './components/TodoBox';
import mockTodosData from './mockData';

function GoalDetailPage() {
  const todos = mockTodosData.filter((todo: Todo) => !todo.done);
  const dones = mockTodosData.filter((todo: Todo) => todo.done);

  return (
    <div className="flex min-h-screen justify-center bg-slate-100 desktop:min-w-[1920px]">
      <div className="flex w-[375px] flex-col pb-16 text-slate-800 tablet:w-[637px] desktop:w-[1200px]">
        <h1 className="mt-6 hidden text-lg font-semibold leading-7 text-slate-900 tablet:block">
          목표
        </h1>
        <div className="mt-4 flex flex-col gap-4 tablet:gap-6">
          <GoalBox />
          <Link
            to="/notes"
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
              placeholder="아직 해야할 일이 없어요"
              todos={todos}
            />
            <TodoBox
              title="Done"
              placeholder="아직 다 한 일이 없어요"
              todos={dones}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalDetailPage;
