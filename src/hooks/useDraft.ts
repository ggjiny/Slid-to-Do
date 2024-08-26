import { NoteDraft } from '@/types/interface';
import { useEffect, useState } from 'react';

const useDraft = (todoId: number) => {
  const [draftTitle, setDraftTitle] = useState('');
  const [isDraftExist, setIsDraftExist] = useState(false);

  const saveDraft = (note: NoteDraft) => {
    const prevDrafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');

    const newDrafts = [
      note,
      ...prevDrafts.filter((draft: NoteDraft) => draft.todoId !== todoId),
    ];
    localStorage.setItem('draft-notes', JSON.stringify(newDrafts));
  };

  const getDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');
    return drafts.find((draft: NoteDraft) => draft.todoId === todoId);
  };

  const deleteDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('draft-notes') || '[]');
    const newDrafts = drafts.filter(
      (draft: NoteDraft) => draft.todoId !== todoId,
    );
    localStorage.setItem('draft-notes', JSON.stringify(newDrafts));
  };

  const closeDraftNotification = () => {
    setIsDraftExist(false);
  };

  useEffect(() => {
    const currentDraft = getDraft();
    if (currentDraft) {
      setIsDraftExist(true);
      setDraftTitle(currentDraft.title);
    }
  }, []);

  return {
    draftTitle,
    isDraftExist,
    closeDraftNotification,
    saveDraft,
    getDraft,
    deleteDraft,
  };
};

export default useDraft;
