import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TAG_REGEX } from '@constants/regex';
import useGetNote from '@hooks/api/notesAPI/useGetNote';
import usePatchNote from '@hooks/api/notesAPI/usePatchNote';
import usePostNote from '@hooks/api/notesAPI/usePostNote';

import Popup from '@components/Popup';
import useDraft from '@hooks/useDraft';
import countHtmlCharacters from '@utils/countHtmlCharacters';
import DraftNotification from './components/DraftNotification';
import DraftSavedToast from './components/DraftSavedToast';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import LinkDisplay from './components/LinkDisplay';
import LinkEmbed from './components/LinkEmbed';
import TextEditor from './components/TextEditor';
import TitleInput from './components/TitleInput';

const TITLE_MAX_LENGTH = 30;
const AUTO_SAVE_INTERVAL = 1000 * 60 * 5;

function NewNotePage() {
  const location = useLocation();
  const { todo, isEditing } = location.state;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const [contentWithSpaces, setContentWithSpaces] = useState(0);
  const [contentWithoutSpaces, setContentWithoutSpaces] = useState(0);

  const contentText = content.replace(TAG_REGEX, '');

  const isSubmitEnabled = title.trim().length > 0 && contentText.length > 0;

  const { data: noteData } = useGetNote(todo.noteId, isEditing);

  useEffect(() => {
    if (isEditing && noteData) {
      const prevTitle = noteData?.data.title;
      const prevContent = noteData?.data.content;
      const prevLinkUrl = noteData?.data.linkUrl;
      const { withSpaces, withoutSpaces } = countHtmlCharacters(prevContent);

      setTitle(prevTitle);
      setContent(prevContent);
      setLinkUrl(prevLinkUrl);
      setContentWithSpaces(withSpaces);
      setContentWithoutSpaces(withoutSpaces);
    }
  }, [isEditing, noteData]);

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isLinkEmbedOpen, setIsLinkEmbedOpen] = useState(false);

  const {
    draftTitle,
    isDraftExist,
    closeDraftNotification,
    saveDraft,
    getDraft,
    deleteDraft,
  } = useDraft(todo.id);

  const { mutate: createNoteMutate } = usePostNote();
  const { mutate: editNoteMutate } = usePatchNote();
  const navigate = useNavigate();

  const noteRef = useRef({
    title: '',
    content: '',
    linkUrl: '',
    contentWithSpaces: 0,
    contentWithoutSpaces: 0,
  });

  useEffect(() => {
    noteRef.current = {
      title,
      content,
      linkUrl,
      contentWithSpaces,
      contentWithoutSpaces,
    };
  }, [title, content, linkUrl]);

  const handleChangeLink = (newLink: string) => {
    setLinkUrl(newLink);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: newTitle } = e.target;
    if (newTitle.length <= TITLE_MAX_LENGTH) {
      setTitle(newTitle);
    }
  };

  const handleChangeContent = (text: string, newContent: string) => {
    setContent(newContent);
    setContentWithSpaces(text.length);
    setContentWithoutSpaces(text.replace(/\s/g, '').length);
  };

  const handleSaveDraft = () => {
    const note = { todoId: todo.id, ...noteRef.current };

    saveDraft(note);

    setIsDraftSaved(true);
  };

  const handleGetDraft = () => {
    const currentDraft = getDraft();

    if (currentDraft) {
      setTitle(currentDraft.title);
      setContent(currentDraft.content);
      setLinkUrl(currentDraft.linkUrl);
      setContentWithSpaces(currentDraft.contentWithSpaces);
      setContentWithoutSpaces(currentDraft.contentWithoutSpaces);
    }
  };

  const handleDeleteDraft = () => {
    deleteDraft();
  };

  const handleOpenDraftModal = (value: boolean) => {
    setIsDraftModalOpen(value);
  };

  const handleClickSaveButton = () => {
    createNoteMutate(
      {
        todoId: todo.id,
        note: {
          title,
          content,
          linkUrl: linkUrl || undefined,
        },
      },
      {
        onSuccess: () => {
          handleDeleteDraft();
          navigate(-1);
        },
      },
    );
  };

  const handleClickEditButton = () => {
    editNoteMutate(
      {
        noteId: todo.noteId,
        note: {
          title,
          content,
          linkUrl: linkUrl || undefined,
        },
      },
      {
        onSuccess: () => {
          handleDeleteDraft();
          navigate(-1);
        },
      },
    );
  };

  useEffect(() => {
    // 5분마다 저장하기 위함
    const interval = setInterval(() => {
      handleSaveDraft();
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`flex flex-col items-center px-4 desktop:flex-row desktop:justify-normal ${isLinkEmbedOpen && 'h-screen desktop:h-auto'}`}
      >
        {isLinkEmbedOpen && (
          <LinkEmbed link={linkUrl} onClose={() => setIsLinkEmbedOpen(false)} />
        )}
        <div
          className={`flex w-full max-w-[792px] flex-col bg-white ${isLinkEmbedOpen ? 'flex-1 overflow-auto desktop:ml-8 desktop:h-screen' : 'h-screen desktop:ml-[360px]'} `}
        >
          <Header
            title={title}
            isEditing={isEditing}
            isSubmitEnabled={isSubmitEnabled}
            onClickDraftButton={handleSaveDraft}
            onClickSaveButton={
              isEditing ? handleClickEditButton : handleClickSaveButton
            }
          />
          <div className="tablet:overflow-y-auto">
            {isDraftExist && (
              <DraftNotification
                onCloseDraftNotification={closeDraftNotification}
                onOpenDraftModal={handleOpenDraftModal}
              />
            )}
            <InfoSection
              title={todo.title}
              goalTitle={todo.goal?.title}
              done={todo.done}
            />
            <TitleInput
              title={title}
              onChange={handleChangeTitle}
              maxLength={TITLE_MAX_LENGTH}
            />
            <div className="mb-2 mt-3 text-xs font-medium text-slate-800">
              공백 포함 : 총 {contentWithSpaces}자 | 공백 제외: 총{' '}
              {contentWithoutSpaces}자
            </div>
            {linkUrl && (
              <LinkDisplay
                link={linkUrl}
                onDelete={() => {
                  setLinkUrl('');
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
          </div>
          {isDraftSaved && (
            <DraftSavedToast
              isVisible={isDraftSaved}
              onHide={() => setIsDraftSaved(false)}
            />
          )}
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
            closeDraftNotification();
          }}
        />
      )}
    </>
  );
}

export default NewNotePage;
