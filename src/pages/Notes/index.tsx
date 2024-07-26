import { FlagIcon } from '@assets';
import NoteList from './components/NoteList';

function NotesPage() {
  return (
    <div className="px-4 tablet:pl-[360px]">
      <h1 className="mb-4 pt-6 text-lg font-semibold leading-7 text-slate-900">
        노트 모아보기
      </h1>
      <div className="mb-4 flex max-w-[792px] items-center gap-2 rounded-xl bg-white py-[14px] pl-6">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800">
          <FlagIcon className="h-[14.4px] w-[14.4px] fill-white" />
        </div>
        <h2 className="text-sm font-semibold leading-5 text-slate-800">
          자바스크립트로 웹 서비스 만들기
        </h2>
      </div>
      <NoteList />
    </div>
  );
}

export default NotesPage;
