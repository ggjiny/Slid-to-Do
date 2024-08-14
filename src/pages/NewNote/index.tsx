import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NoteDraft } from '@/types/interface';
import useGetNote from '@hooks/api/notesAPI/useGetNote';
import usePatchNote from '@hooks/api/notesAPI/usePatchNote';
import usePostNote from '@hooks/api/notesAPI/usePostNote';

import Popup from '@components/Popup';
import DraftNotification from './components/DraftNotification';
import DraftSavedToast from './components/DraftSavedToast';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import LinkDisplay from './components/LinkDisplay';
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
  const [titleCount, setTitleCount] = useState(0);
  const [contentWithSpaces, setContentWithSpaces] = useState(0);
  const [contentWithoutSpaces, setContentWithoutSpaces] = useState(0);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const { data: noteData } = useGetNote(todo.noteId, isEditing);

  useEffect(() => {
    if (isEditing && noteData) {
      const prevTitle = noteData?.data.title;
      const prevContent = noteData?.data.content;
      const prevLinkUrl = noteData?.data.linkUrl;

      setTitle(prevTitle);
      setContent(prevContent);
      setLinkUrl(prevLinkUrl);
      setTitleCount(prevTitle.length);
      setContentWithSpaces(prevContent.length);
      setContentWithoutSpaces(prevContent.replace(/\s/g, '').length);
    }
  }, [isEditing, noteData]);

  const [isDraftExist, setIsDraftExist] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isLinkEmbedOpen, setIsLinkEmbedOpen] = useState(false);

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
    setIsSubmitEnabled(title.trim().length > 0 && content.trim().length > 0);
  }, [title, content, linkUrl]);

  const handleChangeLink = (newLink: string) => {
    setLinkUrl(newLink);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: newTitle } = e.target;
    if (newTitle.length <= TITLE_MAX_LENGTH) {
      setTitle(newTitle);
      setTitleCount(newTitle.length);
    }
  };

  const handleChangeContent = (text: string, newContent: string) => {
    setContent(newContent);
    setContentWithSpaces(text.length);
    setContentWithoutSpaces(text.replace(/\s/g, '').length);
  };

  const handleSaveDraft = () => {
    const note = { todoId: todo.id, ...noteRef.current };

    const prevDrafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');

    const newDrafts = [
      note,
      ...prevDrafts.filter((draft: NoteDraft) => draft.todoId !== todo.id),
    ];
    localStorage.setItem('draft-notes', JSON.stringify(newDrafts));

    setIsDraftSaved(true);
  };

  const handleGetDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');
    const currentDraft = drafts.find(
      (draft: NoteDraft) => draft.todoId === todo.id,
    );

    if (currentDraft) {
      setTitle(currentDraft.title);
      setContent(currentDraft.content);
      setLinkUrl(currentDraft.linkUrl);
      setTitleCount(currentDraft.title.length);
      setContentWithSpaces(currentDraft.contentWithSpaces);
      setContentWithoutSpaces(currentDraft.contentWithoutSpaces);
    }
  };

  const handleDeleteDraft = (deleteId: number) => {
    const drafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');
    const newDrafts = drafts.filter(
      (draft: NoteDraft) => draft.todoId !== deleteId,
    );
    localStorage.setItem('draft-notes', JSON.stringify(newDrafts));
  };

  const handleCloseDraftNotification = () => {
    setIsDraftExist(false);
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
          handleDeleteDraft(todo.id);
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
          handleDeleteDraft(todo.id);
          navigate(-1);
        },
      },
    );
  };

  useEffect(() => {
    const drafts = localStorage.getItem('draft-notes');

    // 임시 저장 불러올 때 제목을 보여주기 위함
    if (drafts) {
      const currentDraft = JSON.parse(drafts).find(
        (draft: NoteDraft) => draft.todoId === todo.id,
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
        {isLinkEmbedOpen && <iframe src={linkUrl} title="link embed" />}
        <div className="mx-4 h-screen w-full max-w-[792px] desktop:ml-[360px]">
          <div className="flex h-screen flex-col bg-white">
            <Header
              isEditing={isEditing}
              isSubmitEnabled={isSubmitEnabled}
              onClickDraftButton={handleSaveDraft}
              onClickSaveButton={
                isEditing ? handleClickEditButton : handleClickSaveButton
              }
            />
            {isDraftExist && (
              <DraftNotification
                onCloseDraftNotification={handleCloseDraftNotification}
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
              titleCount={titleCount}
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
