import { NoteDraft } from '@/types/interface';
import { FlagIcon } from '@assets';
import Popup from '@components/Popup';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import DraftNotification from './components/DraftNotification';
import DraftSavedToast from './components/DraftSavedToast';
import Header from './components/Header';
import LinkDisplay from './components/LinkDisplay';
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
const AUTO_SAVE_INTERVAL = 1000 * 60 * 5;

function NewNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [titleCount, setTitleCount] = useState(0);
  const [contentWithSpaces, setContentWithSpaces] = useState(0);
  const [contentWithoutSpaces, setContentWithoutSpaces] = useState(0);

  const [isDraftExist, setIsDraftExist] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isLinkEmbedOpen, setIsLinkEmbedOpen] = useState(false);

  const noteRef = useRef({
    title: '',
    content: '',
    link: '',
    contentWithSpaces: 0,
    contentWithoutSpaces: 0,
  });

  useEffect(() => {
    noteRef.current = {
      title,
      content,
      link,
      contentWithSpaces,
      contentWithoutSpaces,
    };
    setIsSubmitEnabled(title.trim().length > 0 && content.trim().length > 0);
  }, [title, content, link]);

  const handleChangeLink = (newLink: string) => {
    setLink(newLink);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= TITLE_MAX_LENGTH) {
      setTitle(value);
      setTitleCount(value.length);
    }
  };

  const handleChangeContent = (text: string, newContent: string) => {
    setContent(newContent);
    setContentWithSpaces(text.length);
    setContentWithoutSpaces(text.replace(/\s/g, '').length);
  };

  const handleSaveDraft = () => {
    const note = { todo: MOCK_TODO, ...noteRef.current };

    const prevDrafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');

    const newDrafts = [
      note,
      ...prevDrafts.filter(
        (draft: NoteDraft) => draft.todo.id !== MOCK_TODO.id,
      ),
    ];
    localStorage.setItem('draft-notes', JSON.stringify(newDrafts));

    setIsDraftSaved(true);
  };

  const handleGetDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');
    const currentDraft = drafts.find(
      (draft: NoteDraft) => draft.todo.id === MOCK_TODO.id,
    );

    if (currentDraft) {
      setTitle(currentDraft.title);
      setContent(currentDraft.content);
      setLink(currentDraft.link);
      setTitleCount(currentDraft.title.length);
      setContentWithSpaces(currentDraft.contentWithSpaces);
      setContentWithoutSpaces(currentDraft.contentWithoutSpaces);
    }
  };

  const handleCloseDraftNotification = () => {
    setIsDraftExist(false);
  };

  const handleOpenDraftModal = (value: boolean) => {
    setIsDraftModalOpen(value);
  };

  useEffect(() => {
    const drafts = localStorage.getItem('draft-notes');

    // 임시 저장 불러올 때 제목을 보여주기 위함
    if (drafts) {
      const currentDraft = JSON.parse(drafts).find(
        (draft: NoteDraft) => draft.todo.id === MOCK_TODO.id,
      );
      if (currentDraft) {
        setIsDraftExist(true);
        setDraftTitle(currentDraft.title);
      }
    }

    // 5분마다 저장하기 위함
    const interval = setInterval(() => {
      handleSaveDraft();
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex h-screen items-center justify-center desktop:block">
        {isLinkEmbedOpen && <iframe src={link} title="link embed" />}
        <div className="mx-4 h-screen w-full max-w-[792px] desktop:ml-[360px]">
          <div className="flex h-screen flex-col bg-white">
            <Header
              isSubmitEnabled={isSubmitEnabled}
              onDraftSave={handleSaveDraft}
            />
            {isDraftExist && (
              <DraftNotification
                onCloseDraftNotification={handleCloseDraftNotification}
                onOpenDraftModal={handleOpenDraftModal}
              />
            )}

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
                value={title}
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
            {link && (
              <LinkDisplay
                link={link}
                onDelete={() => {
                  setLink('');
                  setIsLinkEmbedOpen(false);
                }}
                onClickEmbed={() => setIsLinkEmbedOpen((prev) => !prev)}
              />
            )}
            <TextEditor
              prevContent={content}
              onChangeContent={handleChangeContent}
              onChangeLink={handleChangeLink}
            />
            {isDraftSaved && (
              <DraftSavedToast
                isVisible={isDraftSaved}
                onHide={() => setIsDraftSaved(false)}
              />
            )}
          </div>
        </div>
      </div>

      {isDraftModalOpen && (
        <Popup
          message={`'${draftTitle || '제목 없음'}'\n 제목의 노트를 불러오시겠어요?`}
          confirmMessage="불러오기"
          onCancel={() => handleOpenDraftModal(false)}
          onConfirm={() => {
            handleGetDraft();
            handleOpenDraftModal(false);
            handleCloseDraftNotification();
          }}
        />
      )}
    </>
  );
}

export default NewNotePage;
