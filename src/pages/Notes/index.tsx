import FlagBoxIcon from '@components/FlagBoxIcon';
import routes from '@constants/routes';
import useGetGoal from '@hooks/api/goalsAPI/useGetGoal';
import { useNavigate, useParams } from 'react-router-dom';
import NewNoteButton from './components/NewNoteButton';
import NoteList from './components/NoteList';

function NotesPage() {
  const { goalId } = useParams();
  const { data: goalData } = useGetGoal(Number(goalId));
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center desktop:block">
      <div className="mx-4 w-full max-w-[792px] desktop:ml-[360px]">
        <div className="flex items-center justify-between">
          <h1 className="mb-4 pt-6 text-lg font-semibold leading-7 text-slate-900">
            노트 모아보기
          </h1>
          <NewNoteButton goalId={Number(goalId)} />
        </div>
        <div
          className="mb-4 flex max-w-[792px] cursor-pointer items-center gap-2 rounded-xl bg-white py-[14px] pl-6"
          onClick={() => navigate(`${routes.goalDetail}/${goalId}`)}
        >
          <FlagBoxIcon isSmall />
          <h2 className="text-sm font-semibold leading-5 text-slate-800">
            {goalData?.data.title}
          </h2>
        </div>
        <NoteList goalId={Number(goalId)} />
      </div>
    </div>
  );
}

export default NotesPage;
