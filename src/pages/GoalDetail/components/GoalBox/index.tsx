import { FlagIcon } from '@assets';
import Kebab from '@components/Kebab';

function GoalBox() {
  const progress = 25;
  const handleEdit = () => {
    //
  };
  const handleDelete = () => {
    //
  };
  return (
    <div className="flex flex-col rounded-xl border-[1px] border-slate-100 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-[15px] bg-slate-800">
            <FlagIcon width={24} height={24} fill="white" />
          </div>
          <div className="font-semibold leading-6 tablet:text-lg tablet:leading-7">
            자바스크립트로 웹 서비스 만들기
          </div>
        </div>
        <Kebab onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <div className="mt-6 text-xs font-semibold text-slate-900">Progress</div>
      <div className="mt-2 flex h-4 w-full items-center justify-between gap-2 bg-white">
        <div className="relative h-1 grow rounded-md bg-slate-50">
          <div
            className="absolute left-0 top-0 h-full rounded-md bg-slate-900"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs font-semibold leading-4 text-slate-900">
          {progress}%
        </div>
      </div>
    </div>
  );
}

export default GoalBox;
