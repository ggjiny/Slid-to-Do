import { FlagIcon } from '@assets';
import Button from '@components/Button';
import { ChangeEvent, useState } from 'react';
import TextEditor from './components/TextEditor';

const MOCK_TODO = {
  noteId: 0,
  done: true,
  linkUrl: 'string',
  fileUrl: 'string',
  title: '투두입니당',
  id: 0,
  goal: {
    id: 0,
    title: '목표입니다',
  },
  userId: 0,
  teamId: 'string',
  updatedAt: '2024-08-01T05:23:51.630Z',
  createdAt: '2024-08-01T05:23:51.630Z',
};

const TITLE_MAX_LENGTH = 30;

function NewNotePage() {
  const [titleCount, setTitleCount] = useState(0);
  const [contentWithSpaces, setContentWithSpaces] = useState(0);
  const [contentWithoutSpaces, setContentWithoutSpaces] = useState(0);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= TITLE_MAX_LENGTH) {
      setNoteTitle(value);
      setTitleCount(value.length);
    }
  };

  const handleContentChange = (text: string, content: string) => {
    setNoteContent(content);
    setContentWithSpaces(text.length);
    setContentWithoutSpaces(text.replace(/\s/g, '').length);

    // 아직 쓰이는 곳이 없어서 임시로 해둡니다
    /* eslint-disable no-console */
    console.log(noteContent);
  };

  return (
    <div className="flex h-screen items-center justify-center desktop:block">
      <div className="mx-4 h-screen w-full max-w-[792px] desktop:ml-[360px]">
        <div className="flex h-screen flex-col bg-white">
          <div className="mb-4 mt-[17px] flex items-center justify-between tablet:mt-6">
            <h1 className="text-lg font-semibold leading-7 text-slate-900">
              노트 작성
            </h1>
            <div className="flex gap-2">
              <Button
                shape="outlined"
                size="xs"
                additionalClass="border-none tablet:w-[96px] tablet:h-[44px]"
              >
                임시 저장
              </Button>
              <Button
                shape="solid"
                size="xs"
                additionalClass="border-none tablet:w-[96px] tablet:h-[44px]"
              >
                작성 완료
              </Button>
            </div>
          </div>

          <div className="mb-3 flex gap-[6px]">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800">
              <FlagIcon className="h-[14.4px] w-[14.4px] fill-white" />
            </div>
            <h3 className="font-medium leading-6 text-slate-800">
              {MOCK_TODO.goal.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 border-b border-b-slate-200 pb-6">
            <div className="flex rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              <span className="text-xs font-medium leading-4 text-slate-700">
                {MOCK_TODO.done ? 'Done' : 'To do'}
              </span>
            </div>
            <p className="text-sm leading-5 text-slate-700">
              {MOCK_TODO.title}
            </p>
          </div>
          <div className="flex w-full items-center justify-between border-b border-b-slate-200 px-1 py-[2px]">
            <input
              placeholder="노트의 제목을 입력해주세요"
              className="w-full py-3 text-lg font-medium leading-7 text-slate-800 outline-none"
              value={noteTitle}
              onChange={handleChangeInput}
              maxLength={TITLE_MAX_LENGTH}
            />
            <div className="text-xs font-medium text-slate-800">
              <span
                className={`${
                  titleCount === TITLE_MAX_LENGTH
                    ? 'text-red-500'
                    : 'text-blue-500'
                }`}
              >
                {titleCount}
              </span>
              /{TITLE_MAX_LENGTH}
            </div>
          </div>
          <div className="mb-2 mt-3 text-xs font-medium text-slate-800">
            공백 포함 : 총 {contentWithSpaces}자 | 공백 제외: 총{' '}
            {contentWithoutSpaces}자
          </div>
          <TextEditor onContentChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
}

export default NewNotePage;
