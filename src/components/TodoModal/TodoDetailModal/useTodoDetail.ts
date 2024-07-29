import { Todo } from '@/types/interface';
import { useEffect, useState } from 'react';

function useTodoDetail(todo: Todo) {
  const [done, setDone] = useState(todo.done);
  const [title, setTitle] = useState(todo.title);
  const [goal, setGoal] = useState(todo.goal);
  const [fileUrl, setFileUrl] = useState(todo.fileUrl);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState(todo.linkUrl);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const isTitleChanged = title !== todo.title;
    const isGoalChanged = goal?.id !== todo.goal?.id;
    const isFileUrlChanged = fileUrl !== todo.fileUrl;
    const isLinkUrlChanged = linkUrl !== todo.linkUrl;
    const isDoneChanged = done !== todo.done;

    setIsModified(
      isTitleChanged ||
        isGoalChanged ||
        isFileUrlChanged ||
        isLinkUrlChanged ||
        isDoneChanged,
    );
  }, [title, goal, fileUrl, linkUrl, done, todo]);

  return {
    done,
    title,
    goal,
    fileUrl,
    fileType,
    fileName,
    linkUrl,
    isModified,
    setDone,
    setTitle,
    setGoal,
    setFileUrl,
    setFileType,
    setFileName,
    setLinkUrl,
  };
}

export default useTodoDetail;
