import { DeleteIcon, FlagIcon, GrayDelete } from '@assets';
import Kebab from '@components/Kebab';
import formatDate from '@utils/formatDate';

import { useEffect, useState } from 'react';

const MOCK_NOTE_DETAIL = {
  todo: {
    done: true,
    fileUrl: 'string',
    linkUrl: 'string',
    title: '자바스크립트 기초 챕터 1 듣기',
    id: 0,
  },
  linkUrl: 'https://',
  content:
    '자바는 어떤 배경에서 처음 만들어 졌는지, 또한 시대의 흐름에 따라 어떻게 변화해 왔는지, 어떤 요구사항들로 인해 새로운 기술들이 개발되었는지 살펴보는 것은 자바를 보다 잘 이해하는데 도움이 됩니다.',
  updatedAt: '2024-07-30T08:19:41.533Z',
  createdAt: '2024-07-29T08:19:41.533Z',
  title: '프로그래밍과 데이터 in JavaScript',
  id: 1,
  goal: {
    title: '자바스크립트로 웹 서비스 만들기',
    id: 0,
  },
  userId: 0,
  teamId: 'string',
};

interface NoteDetailProps {
  onClose: () => void;
}

function NoteDetail({ onClose }: NoteDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // 애니메이션이 끝난 후 onClose 호출
  };

  const handleEditNote = () => {
    //
  };

  const handleDeleteNote = () => {
    //
  };

  return (
    <>
      {isOpen && (
        <div
          className="absolute left-0 top-0 z-20 h-dvh w-dvw opacity-50 tablet:bg-black"
          onClick={handleClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 z-30 h-screen bg-white p-6 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} tablet:w-[512px] desktop:w-[800px]`}
      >
        <DeleteIcon className="mb-4 cursor-pointer" onClick={handleClose} />
        <div className="flex flex-col gap-3 border-b-[1px] border-slate-200 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-[6px]">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800">
                <FlagIcon className="h-[14.4px] w-[14.4px] fill-white" />
              </div>
              <h3 className="font-medium leading-6 text-slate-800">
                {MOCK_NOTE_DETAIL.goal.title}
              </h3>
            </div>
            <Kebab
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              isSmall
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
                <span className="text-xs font-medium leading-4 text-slate-700">
                  {MOCK_NOTE_DETAIL.todo.done ? 'Done' : 'To do'}
                </span>
              </div>
              <p className="text-sm leading-5 text-slate-700">
                {MOCK_NOTE_DETAIL.todo.title}
              </p>
            </div>
            <p className="text-xs leading-4 text-slate-500">
              {formatDate(MOCK_NOTE_DETAIL.createdAt)} 작성
              {MOCK_NOTE_DETAIL.createdAt !== MOCK_NOTE_DETAIL.updatedAt
                ? ` | ${formatDate(MOCK_NOTE_DETAIL.updatedAt)} 수정`
                : ''}
            </p>
          </div>
        </div>
        <div className="border-b-[1px] border-slate-200 py-3">
          <h2 className="text-lg font-medium leading-7 text-slate-800">
            {MOCK_NOTE_DETAIL.title}
          </h2>
        </div>
        <div
          className={`leading-6 text-slate-700 ${MOCK_NOTE_DETAIL.linkUrl ? 'pt-3' : 'pt-4'}`}
        >
          {MOCK_NOTE_DETAIL.linkUrl ? (
            <div className="mb-4 flex justify-between rounded-[20px] bg-slate-200 py-1 pl-4 pr-[6px]">
              {MOCK_NOTE_DETAIL.linkUrl}
              <GrayDelete className="cursor-pointer" />
            </div>
          ) : (
            <div className="pt-1" />
          )}
          {MOCK_NOTE_DETAIL.content}
        </div>
      </div>
    </>
  );
}

export default NoteDetail;
